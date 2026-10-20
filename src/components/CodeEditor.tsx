import { useEffect, useRef } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (v: string) => void;
  minHeight?: number;
}

/**
 * Lightweight code editor: a textarea overlaid with a syntax-tinted backdrop.
 * No external deps — keeps the bundle small and avoids editor keybindings.
 */
export function CodeEditor({ value, onChange, minHeight = 220 }: CodeEditorProps) {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const backdropRef = useRef<HTMLPreElement>(null);

  // Keep backdrop scroll in sync with textarea
  const syncScroll = () => {
    if (textRef.current && backdropRef.current) {
      backdropRef.current.scrollTop = textRef.current.scrollTop;
      backdropRef.current.scrollLeft = textRef.current.scrollLeft;
    }
  };

  useEffect(() => { syncScroll(); }, [value]);

  // Simple Python-ish highlighting for the backdrop
  const highlighted = highlightPython(value);

  // Tab inserts 4 spaces instead of losing focus
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = textRef.current;
      if (!el) return;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = value.slice(0, start) + "    " + value.slice(end);
      onChange(next);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 4;
      });
    }
  };

  return (
    <div
      className="relative overflow-auto rounded-xl border border-slate-700 bg-[#0d1117] font-mono text-[13px] leading-[1.55]"
      style={{ minHeight }}
    >
      <pre
        ref={backdropRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 m-0 overflow-auto whitespace-pre p-4 text-slate-200"
        style={{ minHeight, userSelect: "none" }}
        dangerouslySetInnerHTML={{ __html: highlighted || "\u00a0" }}
      />
      <textarea
        ref={textRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={syncScroll}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        className="absolute inset-0 m-0 resize-none whitespace-pre bg-transparent p-4 font-mono text-[13px] leading-[1.55] text-transparent caret-sky-300 outline-none"
        style={{ minHeight }}
      />
    </div>
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightPython(code: string): string {
  const escaped = escapeHtml(code);
  
  const tokens: string[] = [];
  let tokenIndex = 0;

  const replaceToken = (match: string, className: string) => {
    const placeholder = `__TOKEN_${tokenIndex++}__`;
    tokens.push(`<span class="${className}">${match}</span>`);
    return placeholder;
  };

  // 1. Isoler et protéger les commentaires (Corrigé : sans antislash devant le \$)
  let out = escaped.replace(/(#.*)\$/gm, (m) => replaceToken(m, "text-slate-500 italic"));

  // 2. Isoler et protéger les chaînes de caractères
  out = out.replace(/("""[\s\S]*?"""|&quot;[^&]*?&quot;|'[^']*?')/g, (m) => replaceToken(m, "text-emerald-300"));

  // 3. Colorer les mots-clés de manière propre sans casser les balises
  const kw = [
    "import", "from", "def", "return", "if", "elif", "else", "for", "while", 
    "in", "not", "and", "or", "is", "None", "True", "False", "lambda", "as", 
    "with", "try", "except", "class", "print", "assert"
  ];
  
  const kwRe = new RegExp(`\\b(${kw.join("|")})\\b`, "g");
  out = out.replace(kwRe, (match) => `<span class="text-fuchsia-400 font-semibold">${match}</span>`);

  // 4. Colorer les nombres
  out = out.replace(/\b(\d+\.?\d*)\b/g, (match) => `<span class="text-amber-300">${match}</span>`);

  // 5. Réinsérer les commentaires et chaînes protégés
  tokens.forEach((tokenHtml, idx) => {
    out = out.replace(`__TOKEN_${idx}__`, tokenHtml);
  });

  return out;
}