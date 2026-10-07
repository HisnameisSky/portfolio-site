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
    tags: ["Python", "Streamlit"],
    link: "https://ai-protection-studio.streamlit.app/",
  },
  {
    id: "ai-protection-studio",
    title: "AI Protection Pro (Desktop)",
    description: "デジタルアセットをAIスクレイピングやプロンプトインジェクションから保護するためのセキュリティ＆ユーティリティスタジオ。",
    tags: ["Python"],
    link: "https://github.com/HisnameisSky/ai-protection-pro-v7/",
  },
  //continue
];