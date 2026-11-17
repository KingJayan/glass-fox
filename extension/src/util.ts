export function greet(hour: number): string {
  if (hour < 5) return "Good night.";
  if (hour < 12) return "Good morning.";
  if (hour < 17) return "Good afternoon.";
  return "Good evening.";
}

export function toUrl(raw: string): string | null {
  const text = raw.trim();
  if (!text || /\s/.test(text)) return null;
  if (/^[a-z][a-z\d+.-]*:\/\//i.test(text) || /^(about|moz-extension|view-source):/i.test(text)) return text;
  if (/^(localhost|\d{1,3}(\.\d{1,3}){3})(:\d+)?(\/.*)?$/i.test(text)) return `http://${text}`;
  if (/^([a-z\d-]+\.)+[a-z]{2,}(:\d+)?(\/.*)?$/i.test(text)) return `https://${text}`;
  return null;
}
