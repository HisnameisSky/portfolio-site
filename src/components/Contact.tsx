"use client";

import React, { useState } from "react";
import SoundLink from "@/components/SoundLink";
import SectionHeader from "@/components/SectionHeader";
import { ContactForm } from "@/components/ContactForm";

export default function Contact() {
  // フォームの表示状態管理
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="contact" className="w-full max-w-4xl mx-auto px-4 py-16 animate-fadeIn">
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-12 shadow-2xl flex flex-col items-center text-center relative overflow-hidden group">
        
        {/* 背景の光のアクセント */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:bg-indigo-500/25" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:bg-purple-500/25" />

        <SectionHeader 
          label="[ 03 ] Connect // Inquiries" 
          title="創作と開発のご相談・お問い合わせ" 
        />

        <p className="text-slate-300 text-sm sm:text-base max-w-xl mb-8 leading-relaxed">
          ご質問、お問い合わせ、リクエストに際して、電子メールまたは各種プラットフォームよりご連絡ください。
          <br />
           If you have any questions, inquiries, or requests, please contact us via email or through one of our various platforms.
        </p>

        {/* 外部リンク・アクセスボタンエリア */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {/* ✨ ContactForm 表示切り替えボタン */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
          >
            <span>{showForm ? "フォームをたたむ" : "✉️ Webフォームで相談する"}</span>
          </button>

          <SoundLink 
            href="https://ko-fi.com/c/2c104782f4" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-500/20 flex items-center gap-2"
          >
            <span>✨ Ko-fi でリクエスト・依頼する</span>
          </SoundLink>
        </div>

        {/* ✨ ボタン押下時に ContactForm を展開 */}
        {showForm && (
          <div className="w-full mt-4 text-left animate-fadeIn">
            <ContactForm />
          </div>
        )}

      </div>
    </section>
  );
}