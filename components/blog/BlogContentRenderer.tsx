'use client';

import { useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

// ── Per-block copy button ────────────────────────────────────────────────────
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md
                 bg-accent/10 border border-accent/20 text-accent text-xs font-medium
                 hover:bg-accent/20 transition-all duration-200 opacity-0 group-hover:opacity-100"
      aria-label="Copy code"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Disalin!' : 'Salin'}
    </button>
  );
}

// ── Sections renderer (posts with sections array) ────────────────────────────
interface Section {
  title: string;
  content: string;
  code?: string;
  subsections?: Array<{ title: string; content: string; code?: string }>;
}

const celebrantNameClasses = [
  'bg-cyan-400/10 border-cyan-300/35 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.16)]',
  'bg-rose-400/10 border-rose-300/35 text-rose-100 shadow-[0_0_18px_rgba(251,113,133,0.16)]',
  'bg-amber-400/10 border-amber-300/35 text-amber-100 shadow-[0_0_18px_rgba(251,191,36,0.16)]',
  'bg-emerald-400/10 border-emerald-300/35 text-emerald-100 shadow-[0_0_18px_rgba(52,211,153,0.16)]',
  'bg-violet-400/10 border-violet-300/35 text-violet-100 shadow-[0_0_18px_rgba(167,139,250,0.16)]',
  'bg-sky-400/10 border-sky-300/35 text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.16)]',
] as const;

function getCelebrantNameClass(name: string) {
  const hash = [...name].reduce(
    (total, char) => total + char.charCodeAt(0),
    0,
  );

  return celebrantNameClasses[hash % celebrantNameClasses.length];
}

function renderInlineContent(text: string) {
  return text.split(/(\[\[[^\[\]]+\]\])/g).map((part, index) => {
    const match = part.match(/^\[\[([^\[\]]+)\]\]$/);

    if (!match) return part;

    const name = match[1].trim();

    return (
      <span
        key={`${name}-${index}`}
        className={`relative -top-px mx-0.5 inline-flex items-center rounded-md border px-1.5 py-0.5 align-baseline text-[0.85em] font-black tracking-normal ${getCelebrantNameClass(name)}`}
      >
        {name}
      </span>
    );
  });
}

export function SectionsRenderer({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-8 text-foreground/80">
      {sections.map((section, idx) => (
        <div key={idx}>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            {section.title}
          </h2>
          <p className="text-foreground/70 mb-3 leading-relaxed">
            {renderInlineContent(section.content)}
          </p>

          {section.code && !section.subsections && (
            <div className="relative group my-4">
              <pre className="bg-card border border-border rounded-lg p-4 overflow-x-auto">
                <code className="text-accent text-sm font-mono">
                  {section.code}
                </code>
              </pre>
              <CopyButton code={section.code} />
            </div>
          )}

          {section.subsections && section.subsections.length > 0 && (
            <div className="space-y-4 ml-4 mt-4">
              {section.subsections.map((sub, subIdx) => (
                <div key={subIdx}>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {sub.title}
                  </h3>
                  <p className="text-foreground/70 mb-3 leading-relaxed">
                    {renderInlineContent(sub.content)}
                  </p>
                  {sub.code && (
                    <div className="relative group my-4">
                      <pre className="bg-card border border-border rounded-lg p-4 overflow-x-auto">
                        <code className="text-accent text-sm font-mono">
                          {sub.code}
                        </code>
                      </pre>
                      <CopyButton code={sub.code} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── HTML content renderer (posts with content string) ────────────────────────
// Injects copy buttons into every <pre> element after mount.
export function HtmlContentRenderer({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const pres = ref.current.querySelectorAll('pre');
    pres.forEach((pre) => {
      // Avoid double-injecting
      if (pre.querySelector('[data-copy-btn]')) return;

      pre.style.position = 'relative';
      pre.classList.add('group');

      const code = pre.querySelector('code')?.textContent ?? pre.textContent ?? '';

      const btn = document.createElement('button');
      btn.setAttribute('data-copy-btn', '');
      btn.className =
        'absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md ' +
        'bg-accent/10 border border-accent/20 text-accent text-xs font-medium ' +
        'hover:bg-accent/20 transition-all duration-200 opacity-0 group-hover:opacity-100';
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> Salin';

      btn.addEventListener('click', async () => {
        await navigator.clipboard.writeText(code.trim());
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Disalin!';
        setTimeout(() => {
          btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> Salin';
        }, 2000);
      });

      pre.appendChild(btn);
    });
  }, [html]);

  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{ __html: html }}
      className="space-y-6"
    />
  );
}
