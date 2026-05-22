import Link from "next/link";
import Image from "next/image";
import gerbang from "@/public/images/gerbang.png";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Hero(){

    return(
        <section className="relative w-screen min-h-screen flex items-center justify-center">
        {/* Full Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={gerbang}
            alt="Bumi Pasanggrahan" 
            fill 
            className="object-cover object-center"
            priority
            quality={100}
            sizes="100vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/30 to-black/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full mt-10 md:mt-0">
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 w-fit shadow-lg">
              <span className="text-xs font-semibold uppercase tracking-wider">Bumi Pasanggrahan</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-white drop-shadow-lg">
              Hunian Asri untuk Masa Depan <span className="text-[#92F7C3] italic">Berkualitas.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl drop-shadow-md">
              Wujudkan impian memiliki rumah dengan konsep nature-living yang terjangkau. DP ringan, cicilan mulai Rp 1 juta-an/bulan.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <WhatsAppButton
                label="Tanya WhatsApp"
                message="Halo Bumi Pasanggrahan, saya tertarik dengan informasi perumahan. Bisa minta info brosur dan KPR?"
                className="!text-lg px-8 py-4"
              />
              <Link 
                href="#tipe-rumah"
                className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all shadow-lg"
              >
                Lihat Tipe Rumah
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
}