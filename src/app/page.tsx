import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ArtworkGallery from "@/components/ArtworkGallery";
import AppShowcase from "@/components/AppShowcase";
import SocialLinks from "@/components/SocialLinks"; 
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DynamicBackground from "@/components/DynamicBackground"; // ★これで正しく読み込まれます

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* 動的背景コンポーネント */}
      <DynamicBackground />

      <Header />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-between">
        <Hero />

        <section id="artworks" className="w-full max-w-6xl px-6 py-16 animate-fadeIn">
          <h2 className="text-2xl font-bold mb-8 text-white text-center">Artworks / Illustrations</h2>
          <ArtworkGallery />
        </section>

        <section id="projects" className="w-full max-w-6xl px-6 py-16 bg-slate-900/50 rounded-2xl my-8 border border-slate-800/80 backdrop-blur-sm animate-fadeIn">
          <h2 className="text-2xl font-bold mb-8 text-white text-center">Development Projects</h2>
          <AppShowcase />
        </section>

        <SocialLinks />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}