import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ArtworkGallery from "@/components/ArtworkGallery";
import AppShowcase from "@/components/AppShowcase";
import SocialLinks from "@/components/SocialLinks"; 
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between bg-slate-950 text-slate-100">
        <Hero />

        <section id="artworks" className="w-full max-w-6xl px-6 py-16 animate-fadeIn">
          <h2 className="text-2xl font-bold mb-8 text-white text-center">Artworks / Illustrations</h2>
          <ArtworkGallery />
        </section>

        <section id="projects" className="w-full max-w-6xl px-6 py-16 bg-slate-900/50 rounded-2xl my-8 border border-slate-800/80 animate-fadeIn">
          <h2 className="text-2xl font-bold mb-8 text-white text-center">Development Projects</h2>
          <AppShowcase />
        </section>

        {/* ✨ 2. SNS & リンク セクションを配置 */}
        <SocialLinks />

        {/* コンタクトセクション */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}