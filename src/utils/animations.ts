import gsap from "gsap";

// 要素がふわっと浮き上がる共通アニメーション
export const fadeInElement = (element: HTMLElement | null, delay: number = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, delay, ease: "power2.out" }
  );
};