import Link from "next/link";

interface WhatsAppButtonProps {
  message?: string;
  label?: string;
  variant?: "button" | "floating" | "inline";
  className?: string;
}

export default function WhatsAppButton({
  message = "Halo Bumi Pasanggrahan, saya ingin bertanya info lebih lanjut mengenai unit perumahan.",
  label = "Hubungi Kami via WhatsApp",
  variant = "button",
  className = "",
}: WhatsAppButtonProps) {
  const phone = "6282218778178"; // Nomor WhatsApp baru dari pengguna (082218778178)
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

  const iconSvg = (
    <svg
      className="w-6 h-6 fill-current"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.22h.005c5.505 0 9.99-4.478 9.99-9.985C22.007 6.478 17.518 2 12.012 2zm6.009 13.985c-.247.696-1.236 1.272-1.745 1.353-.464.073-1.07.135-1.716-.073a10.222 10.222 0 0 1-3.76-2.316 11.23 11.23 0 0 1-2.585-3.212c-.378-.65-.606-1.385-.606-2.146 0-1.636.852-2.434 1.162-2.738.247-.243.65-.365.989-.365.11 0 .208.005.293.01.248.01.417.022.6.438.228.52.78 1.9.847 2.04.066.136.094.298.006.475-.088.177-.133.282-.266.437-.133.156-.28.35-.4.498-.133.164-.27.34-.117.61a7.07 7.07 0 0 0 1.295 1.609c.642.57 1.18.94 1.848 1.22.27.113.43.08.59-.098.156-.176.674-.78.852-1.047.18-.266.35-.221.6-.13l1.58.74c.248.12.417.18.473.27.056.1.056.57-.19 1.267z" />
    </svg>
  );

  if (variant === "floating") {
    return (
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] md:bottom-8 right-6 md:right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group focus:outline-none hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] ${className}`}
        aria-label="Hubungi kami melalui WhatsApp"
      >
        {/* Pulsing glow effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping group-hover:animate-none opacity-75"></span>
        <span className="relative z-10">{iconSvg}</span>
      </Link>
    );
  }

  if (variant === "inline") {
    return (
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 text-whatsapp hover:text-[#20ba59] font-semibold text-sm transition-all focus:outline-none ${className}`}
      >
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.22h.005c5.505 0 9.99-4.478 9.99-9.985C22.007 6.478 17.518 2 12.012 2zm6.009 13.985c-.247.696-1.236 1.272-1.745 1.353-.464.073-1.07.135-1.716-.073a10.222 10.222 0 0 1-3.76-2.316 11.23 11.23 0 0 1-2.585-3.212c-.378-.65-.606-1.385-.606-2.146 0-1.636.852-2.434 1.162-2.738.247-.243.65-.365.989-.365.11 0 .208.005.293.01.248.01.417.022.6.438.228.52.78 1.9.847 2.04.066.136.094.298.006.475-.088.177-.133.282-.266.437-.133.156-.28.35-.4.498-.133.164-.27.34-.117.61a7.07 7.07 0 0 0 1.295 1.609c.642.57 1.18.94 1.848 1.22.27.113.43.08.59-.098.156-.176.674-.78.852-1.047.18-.266.35-.221.6-.13l1.58.74c.248.12.417.18.473.27.056.1.056.57-.19 1.267z" />
        </svg>
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`bg-whatsapp hover:bg-[#20ba59] text-white py-4 px-8 rounded-2xl font-bold text-center transition-all hover:scale-102 hover:shadow-[0_10px_25px_rgba(37,211,102,0.35)] active:scale-98 flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(37,211,102,0.15)] ${className}`}
    >
      {iconSvg}
      {label}
    </Link>
  );
}
