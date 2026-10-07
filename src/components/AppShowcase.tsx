"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SoundLink from "@/components/SoundLink";

const projects = [
  {
    id: "watermark-studio",
    title: "AI Asset Watermark Studio",
    description: (
      <>
        ブラウザ上で安全にイラストへウォーターマークを焼き込み、一括保護するクライアントサイドツール。
        <br className="hidden sm:inline" />
        <span className="text-slate-400 text-xs sm:text-sm mt-1 block">
          Browser-based secure watermarking and asset protection studio.
        </span>
      </>
    ),
    tags: ["Next.js", "TypeScript", "Canvas API", "Tailwind CSS"],
    link: "/watermark",
    isInternal: true, // 内部リンク用のフラグ 
  },
  {
    id: "ai-protection-cloud",
    title: "AI Protection Pro Studio",
    description: (
      <>
        AIによるスクレイピングやプロンプトインジェクションからアセットを守るための保護スタジオアプリ。
        <br className="hidden sm:inline" />
        <span className="text-slate-400 text-xs sm:text-sm mt-1 block">
          A Protection Studio app designed to safeguard assets from AI-powered scraping and prompt injection.
        </span>
      </>
    ),
    tags: ["Python", "Streamlit"],
    link: "https://ai-protection-studio.streamlit.app/",
    isInternal: false,
  },
  {
    id: "ai-protection-desktop",
    title: "AI Protection Pro (Desktop)",
    description: (
      <>
        AIによるスクレイピングやプロンプトインジェクションからアセットを守るための保護スタジオアプリ。
        <br className="hidden sm:inline" />
        <span className="text-slate-400 text-xs sm:text-sm mt-1 block">
          A Protection Studio app designed to safeguard assets from AI-powered scraping and prompt injection.
        </span>
      </>
    ),
    tags: ["Python"],
    link: "https://github.com/HisnameisSky/ai-protection-pro-v7/",
    isInternal: false,
  },
];

export default function AppShowcase() {
  return (
    <section id="projects" className="w-full max-w-6xl mx-auto px-4 py-12 flex flex-col items-center animate-fadeIn">
      <motion.h2 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl font-bold text-white mb-8 tracking-tight text-center"
      >
        Featured Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center justify-between hover:border-indigo-500/40 transition-all duration-300 w-full"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <div className="text-slate-400 text-sm leading-relaxed mb-6">{project.description}</div>
            </div>

            <div className="w-full">
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-inner"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-center">
                {project.isInternal ? (
                  <Link 
                    href={project.link}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all duration-300 group/link"
                  >
                    <span>スタジオを開く ｜ Open Studio</span>
                    <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                ) : (
                  <SoundLink 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-indigo-600 text-slate-100 hover:text-white text-sm font-medium border border-slate-700/80 transition-all duration-300 shadow-md group/link"
                  >
                    <span>プロジェクトを見る ｜ Access project</span>
                    <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1 text-indigo-400 group-hover/link:text-white">
                      &rarr;
                    </span>
                  </SoundLink>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}