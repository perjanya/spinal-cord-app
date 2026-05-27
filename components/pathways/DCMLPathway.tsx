import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DCMLPathway: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const svgRef = useRef<HTMLObjectElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { time: 0, label: "Sensory Receptors", highlight: "receptors", order: 1 },
    { time: 8, label: "First-Order Neurons (DRG)", highlight: "first-order", order: 1 },
    { time: 28, label: "Dorsal Columns", highlight: "dorsal-columns", order: 1 },
    { time: 47, label: "Medulla", highlight: "LowerMedulla", order: 2 },
    { time: 53, label: "Sensory Decussation", highlight: "decussation", order: 2 },
    { time: 63, label: "Medial Lemniscus", highlight: "medial-lemniscus", order: 2 },
    { time: 67, label: "VPL Thalamus", highlight: "Thalamus", order: 3 },
    { time: 77, label: "Internal Capsule → Somatosensory Cortex", highlight: "Cortex", order: 3 },
  ];

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  };

  // Main animation handler
  useEffect(() => {
    const svgObject = svgRef.current;
    if (!svgObject) return;

    const handleLoad = () => {
      const svgDoc = svgObject.contentDocument;
      if (!svgDoc) return;

      // Reset
      svgDoc.querySelectorAll('.signal-particle').forEach(el => el.remove());
      svgDoc.querySelectorAll('g, path, line').forEach(el => {
        if (el instanceof SVGElement) el.style.filter = '';
      });

      const current = steps[currentStep];
      const highlightEl = svgDoc.getElementById(current.highlight);
      
      if (highlightEl) {
        highlightEl.style.filter = 'drop-shadow(0 0 18px #34d399) brightness(1.35)';
      }

      // Create flowing particles along major orders
      createFlowingParticles(svgDoc, current.order);
    };

    svgObject.addEventListener('load', handleLoad);
    return () => svgObject.removeEventListener('load', handleLoad);
  }, [currentStep]);

  const createFlowingParticles = (svgDoc: Document, activeOrder: number) => {
    const particleGroup = svgDoc.createElementNS("http://www.w3.org/2000/svg", "g");
    particleGroup.setAttribute("class", "signal-particles");

    const particleCount = 8;
    const duration = 2800; // ms for one full travel

    // Define major path segments for each order
    const paths = {
      1: [ // First Order
        { x: 130, y: 1230, tx: 165, ty: 1180 },
        { x: 165, y: 1180, tx: 240, ty: 1050 },
        { x: 245, y: 980, tx: 255, ty: 780 },
      ],
      2: [ // Second Order
        { x: 265, y: 720, tx: 285, ty: 580 },
        { x: 290, y: 550, tx: 310, ty: 400 },
        { x: 315, y: 360, tx: 340, ty: 250 },
      ],
      3: [ // Third Order
        { x: 355, y: 220, tx: 400, ty: 140 },
        { x: 410, y: 130, tx: 460, ty: 90 },
      ]
    };

    const currentPath = paths[activeOrder as keyof typeof paths] || paths[1];

    currentPath.forEach((segment, segIndex) => {
      for (let i = 0; i < particleCount; i++) {
        const particle = svgDoc.createElementNS("http://www.w3.org/2000/svg", "circle");
        particle.setAttribute("class", "signal-particle");
        particle.setAttribute("r", "3.5");
        particle.setAttribute("fill", "#34d399");
        particle.setAttribute("filter", "drop-shadow(0 0 6px #34d399)");

        // Start at beginning of segment
        particle.setAttribute("cx", segment.x.toString());
        particle.setAttribute("cy", segment.y.toString());

        svgDoc.getElementById('Layer_1')?.appendChild(particle);

        // Animate along the segment
        const delay = (segIndex * 300) + (i * 180); // staggered but simultaneous start per order

        particle.animate([
          { 
            cx: segment.x,
            cy: segment.y,
            opacity: 0.4
          },
          { 
            cx: segment.tx,
            cy: segment.ty,
            opacity: 1
          }
        ], {
          duration: duration,
          delay: delay,
          easing: 'linear',
          iterations: 1,
          fill: 'forwards'
        });
      }
    });
  };

  // Audio synchronization
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateStep = () => {
      const time = audio.currentTime;
      const newStep = steps.findIndex((s, i) => 
        time >= s.time && (i === steps.length - 1 || time < steps[i + 1].time)
      );
      
      if (newStep !== -1 && newStep !== currentStep) {
        setCurrentStep(newStep);
      }
    };

    audio.addEventListener('timeupdate', updateStep);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateStep);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [currentStep]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-zinc-950 rounded-3xl border border-zinc-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-emerald-400">Dorsal Column-Medial Lemniscus Pathway</h2>
        
        <button
          onClick={togglePlayback}
          className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-semibold flex items-center gap-3 text-lg transition-all"
        >
          {isPlaying ? '⏸ Pause' : '▶ Play with Flowing Signals'}
        </button>
      </div>

      <div className="relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700 aspect-[530/1327] max-h-[82vh]">
        <object
          ref={svgRef}
          id="dcml-svg"
          data="/assets/Dorsal column medial lemniscusAsset 26.svg"
          type="image/svg+xml"
          className="w-full h-full"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-8 left-8 bg-black/90 backdrop-blur-xl px-8 py-5 rounded-2xl border border-emerald-500/40 max-w-xs shadow-2xl"
          >
            <div className="uppercase text-emerald-400 text-xs tracking-widest mb-2">
              STEP {currentStep + 1}
            </div>
            <div className="text-3xl font-semibold text-white leading-tight">
              {steps[currentStep].label}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <audio ref={audioRef} src="/assets/audio/dorsal-column-medial-lemniscus.mp3" />

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {steps.map((step, i) => (
          <div
            key={i}
            onClick={() => {
              const audio = audioRef.current;
              if (audio) {
                audio.currentTime = step.time;
                if (!isPlaying) audio.play();
              }
            }}
            className={`p-5 rounded-2xl cursor-pointer transition-all border text-sm ${
              i === currentStep 
                ? 'bg-emerald-950 border-emerald-500 text-emerald-300' 
                : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DCMLPathway;