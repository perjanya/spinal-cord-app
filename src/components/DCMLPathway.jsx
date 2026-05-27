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

  createSignalDots(svgDoc, steps.indexOf(step));
}

function getDotPositions(stepIndex) {
  const positionsMap = {
    0: [{ x: 80, y: 1230 }, { x: 100, y: 1200 }, { x: 120, y: 1170 }],
    1: [{ x: 160, y: 1180 }, { x: 180, y: 1150 }, { x: 200, y: 1120 }],
    2: [{ x: 240, y: 1050 }, { x: 245, y: 980 }, { x: 250, y: 900 }],
    3: [{ x: 255, y: 850 }, { x: 270, y: 780 }, { x: 280, y: 720 }],
    4: [{ x: 265, y: 700 }, { x: 275, y: 650 }, { x: 285, y: 600 }],
    5: [{ x: 290, y: 550 }, { x: 300, y: 480 }, { x: 310, y: 400 }],
    6: [{ x: 320, y: 350 }, { x: 340, y: 280 }, { x: 355, y: 220 }],
    7: [{ x: 370, y: 190 }, { x: 400, y: 140 }, { x: 430, y: 100 }],
  };

  return positionsMap[stepIndex] || [{ x: 250, y: 800 }];
}

function createSignalDots(svgDoc, stepIndex) {
  svgDoc.querySelectorAll('.signal-dot').forEach((dot) => dot.remove());

  if (!svgDoc.querySelector('#signal-dot-style')) {
    const defs = svgDoc.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.id = 'signal-dot-style';
    style.textContent = `
      .signal-dot {
        fill: #34d399;
        filter: drop-shadow(0 0 8px #34d399);
        animation: dcmlSignalPulse 2.5s linear infinite;
      }
      @keyframes dcmlSignalPulse {
        0% { opacity: 0.3; }
        50% { opacity: 1; }
        100% { opacity: 0.3; }
      }
    `;
    defs.appendChild(style);

    if (!defs.parentElement) {
      svgDoc.insertBefore(defs, svgDoc.firstChild);
    }
  }

  const positions = getDotPositions(stepIndex);
  const layer = svgDoc.querySelector('#Layer_1') || svgDoc;

  Array.from({ length: 5 }, (_, index) => {
    const position = positions[index % positions.length];
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    dot.setAttribute('class', 'signal-dot');
    dot.setAttribute('r', '4');
    dot.setAttribute('cx', String(position.x));
    dot.setAttribute('cy', String(position.y));
    dot.style.animationDelay = `-${index * 0.4}s`;
    layer.appendChild(dot);

    return dot;
  });
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

    fetch('/assets/Dorsal column medial lemniscusAsset 26.svg')
      .then((response) => response.text())
      .then((markup) => {
        if (active) setSvgMarkup(markup);
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
          {isPlaying ? 'Pause Animation' : 'Play with Audio + Signal'}
        </button>
      </div>

      <div className="relative mx-auto max-h-[82vh] max-w-[520px] overflow-hidden rounded-lg border border-slate-200 bg-slate-950">
        <div
          ref={svgHostRef}
          id="dcml-svg"
          className="block h-full max-h-[82vh] w-full [&_svg]:h-full [&_svg]:w-full"
          aria-label="Dorsal column medial lemniscus pathway diagram"
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />

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
