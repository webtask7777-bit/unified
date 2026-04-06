export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function formatArticleHtml(text: string): string {
  let html = escapeHtml(text);
  // Bold: **text**
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Headers: # text, ## text, ### text
  html = html.replace(/^### (.+)$/gm, '<h4 style="font-size:15px;margin:16px 0 6px;color:var(--t1)">$1</h4>');
  html = html.replace(/^## (.+)$/gm, '<h3 style="font-size:17px;margin:20px 0 8px;color:var(--t1);font-family:var(--font-dm-serif),serif">$1</h3>');
  html = html.replace(/^# (.+)$/gm, '<h2 style="font-size:20px;margin:0 0 12px;color:var(--t1);font-family:var(--font-dm-serif),serif">$1</h2>');
  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr style="border:none;border-top:1px solid var(--bd);margin:12px 0"/>');
  // Table rows (basic)
  html = html.replace(/^\|(.+)\|$/gm, (_match: string, content: string) => {
    const cells = content.split('|').map((c: string) => c.trim());
    const row = cells.map((c: string) => `<td style="padding:4px 8px;border-bottom:1px solid var(--bd)">${c}</td>`).join('');
    return `<tr>${row}</tr>`;
  });
  return html;
}
