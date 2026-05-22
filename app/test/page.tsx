import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/Hero";
import SiteplanSection from "@/components/SiteplanSection";
import UnitOptionsSection from "@/components/UnitOptionsSection";
import VideoSection from "@/components/VideoSection";
import ContactSection from "@/components/ContactSection";
import GallerySection from "@/components/GallerySection";

export default function TestPage() {
  if (process.env.NODE_ENV === "production") {
    redirect("/");
  }

  return (
    <div className="flex-1 flex flex-col items-center w-full bg-background min-h-screen">
      <Navbar />
      <main className="w-full pt-20">
        <section id="hero">
          <Hero />
        </section>
        <SiteplanSection />
        <UnitOptionsSection />
        <VideoSection />
        <ContactSection />
        <GallerySection />
      </main>
    </div>
  );
}
