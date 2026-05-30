import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const steps = [
  { time: 0, label: 'Sensory Receptors', highlight: 'receptors' },
  { time: 8, label: 'First-Order Neurons (DRG)', highlight: 'first-order' },
  { time: 28, label: 'Dorsal Columns (Gracilis + Cuneatus)', highlight: 'dorsal-columns' },
  { time: 47, label: 'Medulla: Nucleus Gracilis & Cuneatus', highlight: 'LowerMedulla' },
  { time: 53, label: 'Sensory Decussation', highlight: 'decussation' },
  { time: 63, label: 'Medial Lemniscus', highlight: 'medial-lemniscus' },
  { time: 67, label: 'VPL Thalamus', highlight: 'Thalamus' },
  { time: 77, label: 'Internal Capsule to Somatosensory Cortex', highlight: 'Cortex' },
];

const stepCamera = [
  { scale: 5, x: -52, y: -480},
  { scale: 1.12, x: 0, y: -36 },
  { scale: 1.22, x: 0, y: -96 },
  { scale: 1.34, x: 0, y: -176 },
  { scale: 1.48, x: 10, y: -242 },
  { scale: 1.62, x: 18, y: -314 },
  { scale: 1.76, x: 28, y: -388 },
  { scale: 1.92, x: 42, y: -486 },
];

function resetSvgHighlights(svgDoc) {
  svgDoc.querySelectorAll('g, path, line').forEach((element) => {
    if (!(element instanceof SVGElement)) return;

    element.style.filter = '';
    element.style.opacity = '1';
  });
}

function applySvgHighlight(svgDoc, step) {
  resetSvgHighlights(svgDoc);

  const element = svgDoc.getElementById(step.highlight);
  if (element) {
    element.style.filter = 'drop-shadow(0 0 15px #34d399) brightness(1.4)';
    element.style.transition = 'filter 0.4s ease';
  }
}

export default function DCMLPathway() {
  const audioRef = useRef(null);
  const svgHostRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [svgMarkup, setSvgMarkup] = useState('');

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    await audio.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    let active = true;

    fetch('/assets/Dorsal column medial lemniscusAsset 26.html')
      .then((response) => response.text())
      .then((markup) => {
        if (!active) return;

        const doc = new DOMParser().parseFromString(markup, 'text/html');
        const svg = doc.querySelector('svg');
        setSvgMarkup(svg?.outerHTML ?? '');
      })
      .catch(() => {
        if (active) setSvgMarkup('');
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const svgHost = svgHostRef.current;
    const svgElement = svgHost?.querySelector('svg');
    if (!svgElement) return;

    applySvgHighlight(svgElement, steps[currentStep]);
  }, [currentStep, svgMarkup]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const updateStep = () => {
      const time = audio.currentTime;
      const nextStep = steps.findLastIndex((step) => time >= step.time);

      if (nextStep >= 0 && nextStep !== currentStep) {
        setCurrentStep(nextStep);
      }
    };

    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateStep);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateStep);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentStep]);

  const jumpToStep = async (step, index) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = step.time;
    setCurrentStep(index);

    if (!isPlaying) {
      await audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold tracking-normal text-slate-950">
          Dorsal Column-Medial Lemniscus Pathway
        </h2>
        <button
          type="button"
          onClick={togglePlayback}
          className="w-fit rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          {isPlaying ? 'Pause Animation' : 'Play with Audio'}
        </button>
      </div>

      <div className="relative mx-auto max-h-[82vh] max-w-[520px] overflow-hidden rounded-lg border border-slate-200 bg-slate-950">
        <motion.div
          animate={stepCamera[currentStep]}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="origin-center will-change-transform"
        >
          <div
            ref={svgHostRef}
            id="dcml-svg"
            className="block h-full max-h-[82vh] w-full [&_svg]:h-full [&_svg]:w-full"
            aria-label="Dorsal column medial lemniscus pathway diagram"
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute left-4 top-4 max-w-[calc(100%-2rem)] rounded-lg border border-emerald-500/40 bg-black/85 px-4 py-3 text-white shadow-2xl backdrop-blur"
          >
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Step {currentStep + 1} / {steps.length}
            </div>
            <div className="text-lg font-semibold leading-tight">{steps[currentStep].label}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <audio ref={audioRef} src="/assets/audio/Dorsal column medial lemniscus pathway.mp3" preload="auto" />

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {steps.map((step, index) => (
          <button
            key={step.label}
            type="button"
            onClick={() => jumpToStep(step, index)}
            className={`rounded-lg border p-3 text-left text-xs font-semibold transition ${
              index === currentStep
                ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-400'
            }`}
          >
            {step.label}
          </button>
        ))}
      </div>
    </div>
  );
}
