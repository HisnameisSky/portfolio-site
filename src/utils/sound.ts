// export const playSound = (type: "hover" | "click") => {
//   if (typeof window === "undefined") return;

//   try {
//     const audioPath = type === "hover" ? "/audio/hover.mp3" : "/audio/click.mp3";
//     const audio = new Audio(audioPath);
//     audio.volume = type === "hover" ? 0.15 : 0.25; // ホバーは控えめ、クリックはしっかり
    
//     // 再生を試みる（ブロックされた場合は静かにキャッチ）
//     audio.play().catch(() => {
//       // ユーザーがまだ画面をインタラクトしていない場合の自動再生ブロック
//     });
//   } catch (e) {
//     // エラー時のフォールバック
//   }
// };

//

// Web Audio APIを用いた軽量なサウンドエフェクト生成ユーティリティ

let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
};

// ★ ボタンクリックやリンク遷移時の「ピピッ」という上品な効果音
export const playClickSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  // 高めの周波数からスッと下げることで、電子的な心地よいアクセントに
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.03, ctx.currentTime); // 音量を極めて小さく（うるさくないように）
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.08);
};

// ★ ボタンにマウスを乗せたときの極小の「カチッ」音
export const playHoverSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(300, ctx.currentTime);

  gain.gain.setValueAtTime(0.01, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.03);
};