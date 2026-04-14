import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { animateStrokeFlow } from '../utils/svgHelpers';
import { ReactSVG } from 'react-svg';

function fallbackSvg() {
  return (`<svg viewBox="0 0 640 640" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cord" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#1f2937" />
        <stop offset="100%" stop-color="#111827" />
      </linearGradient>
    </defs>
    <rect width="640" height="640" fill="transparent" />
    <path id="spinothalamic" d="M320 560 C300 490 300 420 320 350 C340 280 330 220 300 160" fill="none" stroke="#4ade80" stroke-width="14" stroke-linecap="round" />
    <path id="corticospinal" d="M340 560 C360 500 360 430 340 360 C320 290 320 220 340 160" fill="none" stroke="#fb7185" stroke-width="14" stroke-linecap="round" />
    <circle cx="320" cy="140" r="36" fill="#0f172a" stroke="#64748b" stroke-width="3" />
    <circle cx="320" cy="560" r="36" fill="#0f172a" stroke="#64748b" stroke-width="3" />
  </svg>`);
}

export default function SpinalCordViewer({ layer }) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const { activeTract, setActiveTract, openVideo } = useAppStore();
  const [externalLoadError, setExternalLoadError] = useState(false);
  const tractIds = useMemo(() => layer?.tracts?.map((tract) => tract.id) ?? [], [layer]);

  useEffect(() => {
    if (containerRef.current && (!layer?.svgUrl || externalLoadError)) {
      const svgElement = containerRef.current.querySelector('svg');
      if (svgElement) {
        svgRef.current = svgElement;
      }
    }
  }, [layer, externalLoadError]);

  useEffect(() => {
    if (!svgRef.current || !activeTract) return;
    animateStrokeFlow(svgRef.current, activeTract);
  }, [activeTract]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-900/60 p-4">
      <div className="flex items-center justify-between gap-4 pb-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Spinal Cord Scaffold</p>
          <h2 className="text-2xl font-semibold text-white">{layer?.title}</h2>
        </div>
        <button
          type="button"
          onClick={openVideo}
          className="rounded-full bg-glow/10 px-4 py-2 text-sm text-glow transition hover:bg-glow/20"
        >
          Watch Snippet
        </button>
      </div>

      <div className="relative flex min-h-[420px] items-center justify-center rounded-3xl bg-slate-950/80 p-4 shadow-inner">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(116,209,239,0.14),transparent_35%)]" />
        <div className="relative h-full w-full">
          <div ref={containerRef} className="h-full w-full">
            {!layer?.svgUrl || externalLoadError ? (
              <div dangerouslySetInnerHTML={{ __html: fallbackSvg() }} />
            ) : (
              <ReactSVG
                src={layer.svgUrl}
                beforeInjection={(svg) => {
                  svg.setAttribute('role', 'img');
                  svg.querySelectorAll('path').forEach((path) => {
                    path.style.cursor = 'pointer';
                  });
                }}
                afterInjection={(error, svg) => {
                  if (error) {
                    setExternalLoadError(true);
                    return;
                  }
                  svgRef.current = svg;
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {tractIds.map((tractId) => (
          <button
            type="button"
            key={tractId}
            onClick={() => setActiveTract(tractId)}
            className={`rounded-2xl border px-3 py-2 text-left text-sm transition ${
              activeTract === tractId
                ? 'border-glow bg-glow/10 text-white shadow-neon'
                : 'border-slate-700 bg-slate-950/80 text-slate-300 hover:border-glow/50 hover:bg-slate-900'
            }`}
          >
            {tractId.replace(/([A-Z])/g, ' $1').replace(/-/g, ' ')}
          </button>
        ))}
      </div>
    </div>
  );
}
