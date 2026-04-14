import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import LayerSelector from './components/LayerSelector';
import SpinalCordViewer from './components/SpinalCordViewer';
import InfoPanel from './components/InfoPanel';
import QuizEngine from './components/QuizEngine';
import VideoModal from './components/VideoModal';
import { layers } from './layers/index';

function App() {
  const {
    selectedLayerId,
    setSelectedLayerId,
    mode,
    setMode,
    isVideoOpen,
    closeVideo,
  } = useAppStore();

  useEffect(() => {
    if (!selectedLayerId) {
      setSelectedLayerId('anatomy');
    }
  }, [selectedLayerId, setSelectedLayerId]);

  const currentLayer = layers.find((layer) => layer.id === selectedLayerId);
  const isQuizMode = mode === 'quiz';
  const isCaseMode = mode === 'case';

  return (
    <div className="min-h-screen bg-surface text-slate-100">
      <header className="border-b border-slate-700/50 p-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Spinal Cord Explorer</p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Ascending + Descending Tract Layers</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {['explore', 'quiz', 'case'].map((option) => (
              <button
                key={option}
                onClick={() => setMode(option)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  mode === option
                    ? 'bg-glow text-slate-950 shadow-neon'
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {option === 'explore' ? 'Explore Mode' : option === 'quiz' ? 'Quiz Mode' : 'Case Challenge'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-120px)] max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-6">
        <section className="space-y-6 lg:w-[62%]">
          <LayerSelector layers={layers} selectedLayerId={selectedLayerId} onSelect={setSelectedLayerId} />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-slate-700/80 bg-slate-950/50 p-5 shadow-neon"
          >
            <SpinalCordViewer layer={currentLayer} />
          </motion.div>
        </section>

        <aside className="space-y-6 lg:w-[38%]">
          <InfoPanel layer={currentLayer} />

          <AnimatePresence mode="wait">
            {isQuizMode ? <QuizEngine key="quiz" /> : isCaseMode ? <QuizEngine key="case" isCaseMode /> : null}
          </AnimatePresence>
        </aside>
      </main>

      <VideoModal open={isVideoOpen} onClose={closeVideo} />
    </div>
  );
}

export default App;
