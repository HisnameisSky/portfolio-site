export interface WorkItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export const worksData: WorkItem[] = [
  {
    id: "ai-protection-studio",
    title: "AI Protection Pro Studio",
    description: "デジタルアセットをAIスクレイピングやプロンプトインジェクションから保護するためのセキュリティ＆ユーティリティスタジオ。",
    tags: ["Next.js", "TypeScript", "FastAPI", "Python", "Streamlit"],
    link: "https://ai-protection-studio.streamlit.app/",
  },
  //continue
];