export const playSound = (type: "hover" | "click") => {
  if (typeof window === "undefined") return;

  try {
    const audioPath = type === "hover" ? "/audio/hover.mp3" : "/audio/click.mp3";
    const audio = new Audio(audioPath);
    audio.volume = type === "hover" ? 0.15 : 0.25; // ホバーは控えめ、クリックはしっかり
    
    // 再生を試みる（ブロックされた場合は静かにキャッチ）
    audio.play().catch(() => {
      // ユーザーがまだ画面をインタラクトしていない場合の自動再生ブロック
    });
  } catch (e) {
    // エラー時のフォールバック
  }
};