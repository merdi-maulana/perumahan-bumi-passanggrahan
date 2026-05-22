import WhatsAppButton from "@/components/WhatsAppButton";

export default function ContactSection() {
  return (
    <section id="kontak" className="w-full py-24 px-4 bg-white flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full text-center flex flex-col items-center gap-8 bg-surface-low/60 rounded-[3rem] p-10 md:p-16 border border-outline-variant/10 shadow-[0_20px_40px_rgba(26,26,26,0.01)]">
        
        {/* Label badge */}
        <span className="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
          Hubungi Kami
        </span>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-display font-bold text-primary max-w-2xl leading-tight">
          Ingin Berkonsultasi <br className="hidden md:block"/>
          atau Survei Lokasi?
        </h2>

        {/* Description */}
        <p className="text-foreground/80 font-body text-base max-w-xl leading-relaxed">
          Tim marketing konsultan kami siap melayani Anda 24/7. Hubungi kami secara instan via WhatsApp untuk berdiskusi mengenai ketersediaan unit, simulasi cicilan KPR, atau jadwal survei lokasi perumahan.
        </p>

        {/* WhatsApp Call to Action Button with Glow Shadow */}
        <div className="w-full flex justify-center mt-4">
          <WhatsAppButton
            label="Hubungi Konsultan Kami"
            message="Halo Bumi Pasanggrahan, saya ingin berkonsultasi mengenai pemesanan unit rumah dan info simulasi cicilannya."
            className="!px-10 !py-5 text-lg"
          />
        </div>

        {/* Subtext info */}
        <span className="text-xs text-foreground/50 font-medium">
          Layanan Gratis • Respon Cepat KPR • Jadwal Survei Bebas
        </span>

      </div>
    </section>
  );
}
