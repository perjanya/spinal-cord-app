import { motion } from 'framer-motion';

export default function LayerSelector({ layers, selectedLayerId, onSelect }) {
  return (
    <div className="rounded-3xl border border-slate-700/70 bg-slate-950/40 p-5 shadow-neon">
      <h2 className="text-xl font-semibold text-white">Layer Selector</h2>
      <p className="mt-2 text-sm text-slate-400">Choose a layer to explore new visual overlays and clinical insights.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {layers.map((layer) => (
          <motion.button
            key={layer.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(layer.id)}
            className={`rounded-2xl border px-4 py-3 text-left transition ${
              selectedLayerId === layer.id
                ? 'border-glow bg-glow/10 text-white shadow-neon'
                : 'border-slate-700 bg-slate-900/80 text-slate-300 hover:border-glow/50 hover:bg-slate-900'
            }`}
          >
            <p className="font-semibold capitalize text-white">{layer.title}</p>
            <p className="mt-1 text-sm text-slate-400">{layer.subtitle}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
