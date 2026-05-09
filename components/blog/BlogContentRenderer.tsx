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

export function SectionsRenderer({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-8 text-foreground/80">
      {sections.map((section, idx) => (
        <div key={idx}>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            {section.title}
          </h2>
          <p className="text-foreground/70 mb-3 leading-relaxed">
            {section.content}
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
                  <p className="text-foreground/70 mb-3">{sub.content}</p>
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