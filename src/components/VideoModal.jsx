import { AnimatePresence, motion } from 'framer-motion';

export default function VideoModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-3xl rounded-3xl border border-slate-700/70 bg-slate-950 p-6 shadow-neon"
          >
            <div className="flex items-center justify-between gap-4 pb-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Video Preview</p>
                <h2 className="text-xl font-semibold text-white">Clinical Pathway Snapshot</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200 hover:bg-slate-700"
              >
                Close
              </button>
            </div>
            <div className="aspect-video overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
              <div className="flex h-full items-center justify-center text-center text-slate-400">
                Placeholder for future YouTube or MP4 embedding.
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
