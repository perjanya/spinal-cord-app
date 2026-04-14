import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { getTractMeta } from '../utils/svgHelpers';

const tabs = ['Overview', 'Pathway', 'Function', 'Clinical Relevance'];

export default function InfoPanel({ layer }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const { activeTract } = useAppStore();
  const tract = useMemo(() => getTractMeta(layer, activeTract), [layer, activeTract]);

  return (
    <div className="rounded-3xl border border-slate-700/70 bg-slate-950/40 p-5 shadow-neon">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Context Panel</p>
          <h2 className="text-2xl font-semibold text-white">{tract?.name ?? 'Tract details'}</h2>
        </div>
        <div className="hidden text-right sm:block">
          <p className="text-xs uppercase text-slate-500">Layer</p>
          <p className="text-sm text-slate-300">{layer?.title}</p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
              activeTab === tab ? 'bg-glow text-slate-950' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4 rounded-3xl bg-slate-900/70 p-4 text-slate-300">
        <p className="text-sm leading-7">
          {tract?.[activeTab.toLowerCase().replace(/ /g, '_')] ?? 'Select a tract to view the pathway, function and clinical relevance.'}
        </p>
      </div>

      <div className="mt-6 grid gap-3">
        <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Daily Life</h3>
          <p>{tract?.daily_life ?? 'Learn how this tract integrates with movement, sensation, and everyday behaviors.'}</p>
        </div>
        <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Philosophy</h3>
          <p>{layer?.philosophy ?? 'Concepts from mindfulness, motor control, and sensory awareness are a click away.'}</p>
        </div>
      </div>
    </div>
  );
}
