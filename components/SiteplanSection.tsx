"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type PdfJsPage = {
  getViewport: (params: { scale: number }) => {
    width: number;
    height: number;
  };
  render: (renderContext: {
    canvasContext: CanvasRenderingContext2D;
    viewport: { width: number; height: number };
  }) => {
    promise: Promise<void>;
  };
};

type PdfJsDocument = {
  promise: Promise<PdfJsPdf>;
};

type PdfJsPdf = {
  getPage: (pageNumber: number) => PdfJsPage;
};

type PdfJsLib = {
  GlobalWorkerOptions: {
    workerSrc: string;
  };
  getDocument: (src: string) => PdfJsDocument;
};

// Tipe global agar TypeScript tidak error saat mengakses window.pdfjsLib
declare global {
  interface Window {
    pdfjsLib?: PdfJsLib;
  }
}

export default function SiteplanSection() {
  const [pdfjsLoaded, setPdfjsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // State untuk kontrol zoom & pan di modal
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // State untuk loading & error
  const [loadingPreview, setLoadingPreview] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // References untuk canvas
  const canvasRefPreview = useRef<HTMLCanvasElement>(null);
  const canvasRefModal = useRef<HTMLCanvasElement>(null);
  const containerRefModal = useRef<HTMLDivElement>(null);

  const pdfPath = "/pdf/siteplana6.pdf";

  // 1. Load PDF.js Script dari CDN secara dinamis
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.pdfjsLib) {
      Promise.resolve().then(() => setPdfjsLoaded(true));
      return;
    }

    // Periksa apakah script sedang di-load oleh komponen/render lain
    const existingScript = document.querySelector('script[src*="pdf.min.js"]') as HTMLScriptElement;
    
    if (existingScript) {
      const handleLoad = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          setPdfjsLoaded(true);
        }
      };
      existingScript.addEventListener("load", handleLoad);
      return () => {
        existingScript.removeEventListener("load", handleLoad);
      };
    }

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.async = true;
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        setPdfjsLoaded(true);
      }
    };
    script.onerror = () => {
      setError("Gagal memuat sistem pembaca PDF. Silakan unduh langsung file PDF di bawah.");
      setLoadingPreview(false);
    };
    document.head.appendChild(script);
  }, []);

  // 2. Render Halaman Pertama PDF untuk Preview Statis
  useEffect(() => {
    if (!pdfjsLoaded || !canvasRefPreview.current) return;

    let isMounted = true;
    setLoadingPreview(true);

    const renderPreview = async () => {
      try {
        const pdfjsLib = window.pdfjsLib;
        if (!pdfjsLib) {
          setError("Gagal memuat sistem pembaca PDF. Silakan unduh langsung file PDF di bawah.");
          setLoadingPreview(false);
          return;
        }
        const loadingTask = pdfjsLib.getDocument(pdfPath);
        const pdf = await loadingTask.promise;
        
        if (!isMounted) return;

        const page = await pdf.getPage(1);
        if (!isMounted) return;

        const canvas = canvasRefPreview.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        // Render dengan scale secukupnya untuk preview statis agar hemat memori
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        
        if (isMounted) {
          setLoadingPreview(false);
        }
      } catch (err) {
        console.error("Error rendering preview PDF:", err);
        if (isMounted) {
          setError("Gagal memuat gambar preview siteplan.");
          setLoadingPreview(false);
        }
      }
    };

    renderPreview();

    return () => {
      isMounted = false;
    };
  }, [pdfjsLoaded]);

  // 3. Render PDF Resolusi Tinggi untuk Modal Fullscreen saat dibuka
  useEffect(() => {
    if (!isOpen || !pdfjsLoaded || !canvasRefModal.current) return;

    let isMounted = true;
    setLoadingModal(true);

    const renderModalCanvas = async () => {
      try {
        const pdfjsLib = window.pdfjsLib;
        if (!pdfjsLib) {
          setLoadingModal(false);
          return;
        }
        const loadingTask = pdfjsLib.getDocument(pdfPath);
        const pdf = await loadingTask.promise;

        if (!isMounted) return;

        const page = await pdf.getPage(1);
        if (!isMounted) return;

        const canvas = canvasRefModal.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        // Render resolusi tinggi (scale 3.0) agar tajam saat di-zoom
        const viewport = page.getViewport({ scale: 3.0 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        if (isMounted) {
          setLoadingModal(false);
        }
      } catch (err) {
        console.error("Error rendering modal PDF:", err);
        if (isMounted) {
          setLoadingModal(false);
        }
      }
    };

    renderModalCanvas();

    return () => {
      isMounted = false;
    };
  }, [isOpen, pdfjsLoaded]);

  // 4. Kontrol Zoom & Pan
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.3, 5));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const nextScale = Math.max(prev - 0.3, 0.5);
      // Reset posisi jika zoom out ke paling kecil agar tidak keluar layar
      if (nextScale <= 1) {
        setPosition({ x: 0, y: 0 });
      }
      return nextScale;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // 5. Penanganan Drag-to-Pan (Mouse & Touch)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return; // Geser hanya aktif saat di-zoom
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale <= 1) return;
    if (e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Keyboard Close (ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleCloseModal]);

  return (
    <section id="site-plan" className="w-full py-24 px-4 flex flex-col items-center justify-center bg-surface-low">
      {/* Header Section */}
      <div className="max-w-4xl w-full text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Site Plan Interaktif</h2>
        <p className="text-foreground/80 max-w-2xl mx-auto font-body">
          Temukan posisi unit impian Anda, fasilitas sosial, ruang terbuka hijau, dan tata letak kawasan perumahan Bumi Pasanggrahan dengan mudah.
        </p>
      </div>

      {/* Preview Card */}
      <div className="w-full max-w-4xl aspect-[1.4/1] rounded-[3rem] overflow-hidden shadow-[0_20px_40px_rgba(26,26,26,0.04)] bg-white relative group border border-outline-variant/15">
        {loadingPreview && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-low/50 backdrop-blur-sm z-10">
            <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-3"></div>
            <span className="text-gray-500 text-sm">Menyiapkan preview siteplan...</span>
          </div>
        )}

        {error && !loadingPreview && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-surface-low/50 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-red-600 font-medium text-sm mb-4">{error}</p>
            <a href={pdfPath} download className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow">
              Unduh PDF Site Plan
            </a>
          </div>
        )}

        {/* Canvas untuk me-render PDF di Halaman Utama */}
        <canvas
          ref={canvasRefPreview}
          className="w-full h-full object-contain cursor-pointer transition-transform duration-500 group-hover:scale-102"
          onClick={handleOpenModal}
        />

        {/* Hover Overlay */}
        {!loadingPreview && !error && (
          <div 
            onClick={handleOpenModal}
            className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center cursor-pointer z-10"
          >
            <div className="bg-white/20 backdrop-blur-md border border-white/40 p-4 rounded-full text-white shadow-lg mb-3 transform scale-90 group-hover:scale-100 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </div>
            <span className="text-white font-semibold text-lg drop-shadow-md">Klik untuk Membuka & Zoom</span>
          </div>
        )}
      </div>

      {/* Fullscreen Interactive Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
          {/* Close Area */}
          <div className="absolute inset-0" onClick={handleCloseModal}></div>

          {/* Floating Top Nav (Title and Close Button) */}
          <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 z-20 flex justify-between items-center bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
            <div className="text-white">
              <h3 className="text-lg sm:text-xl font-bold">Site Plan Bumi Pasanggrahan</h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light hidden sm:block">Seret gambar untuk menggeser ketika diperbesar</p>
            </div>
            <button
              onClick={handleCloseModal}
              className="pointer-events-auto bg-white/10 hover:bg-white/20 border border-white/20 p-3 rounded-full text-white transition-all shadow-lg focus:outline-none hover:scale-105"
              title="Tutup (Esc)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Canvas Viewport (Pannable Container) */}
          <div 
            ref={containerRefModal}
            className="w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center overflow-hidden rounded-2xl relative z-10 select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {loadingModal && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-20">
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-3"></div>
                <span className="text-white text-sm">Memuat dokumen detail...</span>
              </div>
            )}

            <canvas
              ref={canvasRefModal}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "center center",
                transition: isDragging ? "none" : "transform 0.15s ease-out",
                cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
              }}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Floating Bottom Control Bar */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 bg-zinc-900/80 backdrop-blur-lg border border-zinc-800 px-6 py-3.5 rounded-2xl flex items-center gap-6 shadow-2xl">
            {/* Zoom Out Button */}
            <button
              onClick={handleZoomOut}
              disabled={scale <= 0.5}
              className="text-white hover:text-emerald-400 disabled:opacity-40 transition-colors p-1"
              title="Zoom Out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>

            {/* Scale indicator */}
            <span className="text-white font-mono text-sm font-semibold min-w-[50px] text-center">
              {Math.round(scale * 100)}%
            </span>

            {/* Zoom In Button */}
            <button
              onClick={handleZoomIn}
              disabled={scale >= 5}
              className="text-white hover:text-emerald-400 disabled:opacity-40 transition-colors p-1"
              title="Zoom In"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            {/* Divider */}
            <div className="w-[1px] h-6 bg-zinc-800"></div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="text-white hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"
              title="Reset Zoom"
            >
              Reset
            </button>

            {/* Download Button */}
            <a
              href={pdfPath}
              download
              className="text-white hover:text-emerald-400 transition-colors"
              title="Unduh PDF"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
