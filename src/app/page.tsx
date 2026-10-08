import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ArtworkGallery from "@/components/ArtworkGallery";
import AppShowcase from "@/components/AppShowcase";
import SocialLinks from "@/components/SocialLinks"; 
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { ChokaiBackgroundCanvas } from "@/components/ChokaiBackgroundCanvas"; 
import LiveDemoBadge from "@/components/LiveDemoBadge"; 

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* 水の波紋＆光粒子キャンバス背景 */}
      <ChokaiBackgroundCanvas />

      <Header />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-between">
        <Hero />

        {/* 1. Artwork Gallery */}
        <section id="artworks" className="w-full max-w-6xl px-4 py-12 animate-fadeIn">
          <ArtworkGallery />
        </section>

        {/* 2. Development Projects */}
        <section id="projects" className="w-full max-w-6xl px-4 py-12 animate-fadeIn">
          <AppShowcase />
          
          {/* AI Protection ライブデモウィジェット（独立カード表示） */}
          <div className="mt-12 flex flex-col items-center justify-center p-8 bg-slate-900/60 rounded-3xl border border-slate-800/80 backdrop-blur-md">
            <p className="text-xs font-mono text-cyan-400 mb-4 tracking-widest uppercase">
              // Interactive Security Demo
            </p>
            <LiveDemoBadge />
          </div>
        </section>

        <SocialLinks />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}