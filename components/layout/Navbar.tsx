"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="w-full fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Branding & Logo */}
        <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
          <div className="relative w-10 h-10 overflow-hidden flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Bumi Pasanggrahan Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-display font-bold text-xl text-primary tracking-tight transition-colors group-hover:text-primary-light">
            Bumi Pasanggrahan
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#keunggulan" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
            Keunggulan
          </Link>
          <Link href="#pilihan-unit" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
            Pilihan Unit
          </Link>
          <Link href="#site-plan" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
            Site Plan
          </Link>
          <Link href="#galeri" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
            Galeri
          </Link>
          <Link href="#faq" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
            FAQ
          </Link>
        </div>

        {/* Desktop Call to Action Button */}
        <div className="hidden md:block">
          <WhatsAppButton
            label="Hubungi Kami"
            message="Halo Bumi Pasanggrahan, saya tertarik dengan unit perumahan. Bisa minta info lebih lanjut?"
            className="!py-2.5 !px-6 text-sm bg-gradient-to-br from-primary-light to-primary shadow-none hover:shadow-[0_10px_20px_rgba(9,97,56,0.2)]"
          />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center p-2 rounded-xl bg-surface-low border border-outline-variant/10 text-primary transition-all hover:bg-surface-highest focus:outline-none"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
        >
          <svg
            className="h-6 w-6 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Slide-down Menu Drawer */}
      <div
        className={`md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-zinc-100 shadow-xl transition-all duration-300 ease-in-out origin-top z-40 ${
          isOpen ? "opacity-100 scale-y-100 h-auto py-6" : "opacity-0 scale-y-0 h-0 overflow-hidden pointer-events-none"
        }`}
      >
        <div className="px-4 flex flex-col gap-5">
          <Link
            href="#keunggulan"
            onClick={closeMenu}
            className="text-foreground hover:text-primary transition-colors text-base font-semibold py-2 border-b border-zinc-50"
          >
            Keunggulan
          </Link>
          <Link
            href="#pilihan-unit"
            onClick={closeMenu}
            className="text-foreground hover:text-primary transition-colors text-base font-semibold py-2 border-b border-zinc-50"
          >
            Pilihan Unit
          </Link>
          <Link
            href="#site-plan"
            onClick={closeMenu}
            className="text-foreground hover:text-primary transition-colors text-base font-semibold py-2 border-b border-zinc-50"
          >
            Site Plan
          </Link>
          <Link
            href="#galeri"
            onClick={closeMenu}
            className="text-foreground hover:text-primary transition-colors text-base font-semibold py-2 border-b border-zinc-50"
          >
            Galeri
          </Link>
          <Link
            href="#faq"
            onClick={closeMenu}
            className="text-foreground hover:text-primary transition-colors text-base font-semibold py-2 border-b border-zinc-50"
          >
            FAQ
          </Link>

          <WhatsAppButton
            label="Hubungi Kami"
            message="Halo Bumi Pasanggrahan, saya tertarik dengan unit perumahan. Bisa minta info lebih lanjut?"
            className="w-full !py-3.5 mt-2"
            variant="button"
          />
        </div>
      </div>
    </nav>
  );
}