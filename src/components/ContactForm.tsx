'use client';

import React, { useState } from 'react';
import { CyberPolygonButton } from './CyberPolygonButton';
import { Send, MailCheck } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [category, setCategory] = useState('イラスト制作依頼');
  const [budget, setBudget] = useState('応相談');
  const [details, setDetails] = useState('');

  // 自動挿入されるMailto URLの動的構築
  const generateMailtoLink = () => {
    const subject = encodeURIComponent(`【お問合せ】${category}について（澄界 ポートフォリオ経由）`);
    const body = encodeURIComponent(
      `■ ご相談種別: ${category}\n` +
      `■ ご予算感: ${budget}\n\n` +
      `■ 概要・ご要望:\n${details}\n\n` +
      `-----------------------------------\n` +
      `送信元: 澄界 - Hisnameissky Portfolio Contact`
    );
    return `mailto:HisnameisskyX@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-md">
      <div className="mb-6">
        <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">// Contact & Inquiries</span>
        <h3 className="text-2xl font-chokai-title text-slate-100 mt-1">制作・開発のご相談</h3>
      </div>

      <div className="space-y-5">
        {/* 種別選択 */}
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2">依頼種別 / Category</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {['イラスト制作依頼', 'Webフロントエンド開発', 'AI保護ツール連携', 'その他'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`py-2 px-3 text-xs rounded-lg border transition-all ${
                  category === cat
                    ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200'
                    : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 予算感 */}
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2">想定ご予算 / Budget</label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="応相談">応相談 / 未定</option>
            <option value="5万円〜10万円">5万円 〜 10万円</option>
            <option value="10万円〜30万円">10万円 〜 30万円</option>
            <option value="30万円以上">30万円以上</option>
          </select>
        </div>

        {/* 概要本文 */}
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2">詳細・ご要望 / Message</label>
          <textarea
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="制作内容、納期希望などを自由にご記入ください..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* アクションボタン */}
        <div className="pt-2 flex justify-end">
          <a href={generateMailtoLink()} className="inline-block">
            <CyberPolygonButton icon={Send} variant="cyan">
              メーラーを起動して送信
            </CyberPolygonButton>
          </a>
        </div>
      </div>
    </div>
  );
};