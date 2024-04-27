import { marked } from "marked";

// Convert Markdown to HTML
export const markdownToHtml = (markdown: string) => {
  return marked(markdown);
};
