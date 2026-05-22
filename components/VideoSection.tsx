"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once it's visible and playing, we might want to stop observing
            // if we only want it to autoplay the first time it's seen
            if (sectionElement) {
              observer.unobserve(sectionElement);
            }
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, []);

  // Base URL from the user
  const baseUrl = "https://www.youtube.com/embed/bHXtGoGVHgo?si=SziCqLLDAgq5nx8g";
  // Append autoplay and mute if visible. Mute is usually required by modern browsers for autoplay.
  const videoSrc = isVisible ? `${baseUrl}&autoplay=1&mute=1` : baseUrl;

  return (
    <section 
      id="video-preview" 
      ref={sectionRef}
      className="w-full py-24 px-4 flex flex-col items-center justify-center bg-surface-low"
    >
      <div className="max-w-4xl w-full text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Preview Perumahan</h2>
        <p className="text-foreground/80 font-body">
          Lihat lebih dekat lingkungan dan fasilitas yang kami tawarkan melalui video berikut.
        </p>
      </div>
      
      <div className="w-full max-w-4xl aspect-video rounded-[3rem] overflow-hidden shadow-[0_20px_40px_rgba(26,26,26,0.06)] relative bg-black/5 border border-outline-variant/15">
        <iframe 
          className="absolute top-0 left-0 w-full h-full"
          src={videoSrc} 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
