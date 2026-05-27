import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import DCMLPage from './pages/DCMLPage';

const knowMoreBasics = `The Dorsal Column pathway is the body's high-speed data cable for discriminative touch, allowing you to recognize a coin in your pocket without looking or to feel the vibration of a tuning fork. It begins with first-order neurons in the Dorsal Root Ganglion, which send long axons up the back of the spinal cord in two bundles: the Fasciculus Gracilis for the legs and lower body, and the Fasciculus Cuneatus for the arms and upper body. These fibers stay on the same side they entered until they reach the lower medulla of the brainstem.

In the medulla, they synapse with second-order neurons at the Nucleus Gracilis and Nucleus Cuneatus. It is here that the fibers decussate in the sensory decussation, forming the Medial Lemniscus. These crossed fibers travel to the VPL nucleus of the thalamus, where third-order neurons take the information to the somatosensory cortex. Because of this crossing, the left side of your brain perceives what your right hand touches. Clinically, damage here leads to sensory ataxia, often symbolized by a positive Romberg sign.`;

const knowMoreClinical = `The Romberg test depends on the three-legged stool of balance: vision, vestibular input from the inner ear, and proprioception from the dorsal columns. Under normal conditions, the brain needs at least two of these three inputs to keep the body upright.

In a positive Romberg test, the proprioception leg is impaired by dorsal column pathway damage. With eyes open, vision compensates. When the patient closes their eyes, that compensation is removed; with only vestibular input left, the patient sways or falls.

This is sensory ataxia. It is distinct from cerebellar ataxia, where the patient remains unsteady even with eyes open. Loss of conscious joint-position sense is a hallmark of conditions such as Tabes Dorsalis and Subacute Combined Degeneration of the spinal cord.`;

const pathwayLevels = [
  {
    id: 'drg',
    phase: 'Phase 1',
    label: 'Dorsal Root Ganglion',
    shortLabel: 'DRG',
    prompt:
      'The first-order neurons of the Dorsal Column pathway are located in the __________ and consist of large, heavily myelinated fibers.',
    type: 'blank',
    placeholder: 'Type the missing structure',
    answer: 'Dorsal Root Ganglion / DRG',
    accepted: ['dorsal root ganglion', 'drg'],
    minMatches: 1,
    knowMore: knowMoreBasics,
    position: 'left-[25%] bottom-[8%] sm:left-[28%]',
  },
  {
    id: 'lower-medulla',
    phase: 'Phase 1',
    label: 'Lower Medulla',
    shortLabel: 'Lower medulla',
    prompt: 'Where do the second-order neurons of the PCML pathway decussate (cross)?',
    type: 'mcq',
    options: [
      'A) Anterior White Commissure of the spinal cord',
      'B) Sensory Decussation in the Medulla',
      'C) Ventral Posterolateral (VPL) Nucleus',
      'D) Internal Capsule',
    ],
    answer: 'B) Sensory Decussation in the Medulla',
    knowMore: knowMoreBasics,
    position: 'right-[23%] bottom-[25%] sm:right-[26%]',
  },
  {
    id: 'columns',
    phase: 'Phase 1',
    label: 'Fasciculi Arrangement',
    shortLabel: 'Gracilis / Cuneatus',
    prompt:
      'True or False: Fibers in the Fasciculus Gracilis and Cuneatus are arranged such that sacral segments are located most laterally.',
    type: 'boolean',
    options: ['True', 'False'],
    answer: 'False',
    explanation: 'Sacral fibers are medial; cervical fibers are lateral.',
    knowMore: knowMoreBasics,
    position: 'left-[17%] bottom-[37%] sm:left-[21%]',
  },
  {
    id: 'proprioception',
    phase: 'Phase 2',
    label: 'Romberg Test',
    shortLabel: 'Romberg',
    prompt:
      'A patient presents with a positive Romberg test, swaying only when eyes are closed. Which receptor type is likely failing to transmit signals correctly?',
    type: 'mcq',
    options: [
      'A) Nociceptors (Pain)',
      'B) Thermoreceptors (Temperature)',
      'C) Proprioceptors (Muscle Spindles/Pacinian corpuscles)',
      'D) Photoreceptors',
    ],
    answer: 'C) Proprioceptors (Muscle Spindles/Pacinian corpuscles)',
    knowMore: knowMoreClinical,
    position: 'right-[20%] bottom-[49%] sm:right-[24%]',
  },
  {
    id: 'cordotomy',
    phase: 'Phase 2',
    label: 'Posterior Funiculus',
    shortLabel: 'Cordotomy',
    prompt:
      "A neurosurgeon performing a cordotomy for pain relief may intentionally spare the posterior funiculus to preserve the patient's sense of __________ and __________.",
    type: 'blank',
    placeholder: 'Type two preserved sensations',
    answer: 'Fine touch / Vibration / Proprioception',
    accepted: ['fine touch', 'vibration', 'proprioception'],
    minMatches: 2,
    knowMore: knowMoreClinical,
    position: 'left-[25%] bottom-[62%] sm:left-[31%]',
  },
  {
    id: 'b12',
    phase: 'Phase 2',
    label: 'Vitamin B12 Deficiency',
    shortLabel: 'B12',
    prompt:
      'True or False: In a patient with early-stage Vitamin B12 deficiency, you would expect to see a loss of pain sensation before a loss of vibration sense.',
    type: 'boolean',
    options: ['True', 'False'],
    answer: 'False',
    explanation: 'PCML functions such as vibration are usually compromised first.',
    knowMore: knowMoreClinical,
    position: 'right-[18%] bottom-[76%] sm:right-[25%]',
  },
];

const ascendingTracts = [
  {
    id: 'dcml',
    title: 'Dorsal Column - Medial Lemniscus',
    image: '/dcml-pathway.png',
    status: 'Ready',
    description: 'Fine touch, vibration, conscious proprioception, and two-phase flashcards.',
  },
  {
    id: 'lateral-stt',
    title: 'Lateral Spinothalamic Tract',
    image: '/lateral-spinothalamic.png',
    status: 'Content next',
    description: 'Pain and temperature pathway. Interactive questions will be added from your next content set.',
  },
  {
    id: 'ventral-stt',
    title: 'Ventral Spinothalamic Tract',
    image: '/ventral-spinothalamic.png',
    status: 'Content next',
    description: 'Crude touch and pressure pathway. The image is ready for the same flashcard workflow.',
  },
  {
    id: 'spinocerebellar',
    title: 'Spinocerebellar Tracts',
    image: '/spinocerebellar.png',
    status: 'Content next',
    description: 'Anterior and posterior spinocerebellar tracts for unconscious proprioception.',
  },
];

const homeAudioTracks = [
  {
    title: 'Sensory pathway overview',
    src: '/audio/sensory-file.mp3',
  },
  {
    title: 'Motor pathway overview',
    src: '/audio/motor-file.mp3',
  },
];

const STORAGE_KEY = 'spinal-cord-explorer-progress-v1';

const initialProgress = {
  points: 0,
  completedLevels: [],
  attemptedLevels: [],
  correctFirstTryLevels: [],
  knowMoreLevels: [],
  badges: [],
  completedTracts: [],
};

const badges = [
  {
    id: 'first-signal',
    title: 'First Signal',
    description: 'Complete your first pathway flashcard.',
    tone: 'bg-sky-50 text-sky-900 border-sky-400',
  },
  {
    id: 'precision-touch',
    title: 'Precision Touch',
    description: 'Answer three DCML flashcards correctly.',
    tone: 'bg-violet-50 text-violet-900 border-violet-400',
  },
  {
    id: 'curious-clinician',
    title: 'Curious Clinician',
    description: 'Open three Know more sections.',
    tone: 'bg-amber-50 text-amber-900 border-amber-400',
  },
  {
    id: 'dcml-explorer',
    title: 'DCML Explorer',
    description: 'Complete every Dorsal Column - Medial Lemniscus level.',
    tone: 'bg-emerald-50 text-emerald-900 border-emerald-500',
  },
];

function loadProgress() {
  if (typeof window === 'undefined') return initialProgress;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialProgress;
    return { ...initialProgress, ...JSON.parse(stored) };
  } catch {
    return initialProgress;
  }
}

function evaluateBadges(progress) {
  const earned = new Set(progress.badges);

  if (progress.completedLevels.length >= 1) earned.add('first-signal');
  if (progress.correctFirstTryLevels.length >= 3) earned.add('precision-touch');
  if (progress.knowMoreLevels.length >= 3) earned.add('curious-clinician');
  if (pathwayLevels.every((level) => progress.completedLevels.includes(level.id))) earned.add('dcml-explorer');

  return [...earned];
}

function ProgressPill({ progress, compact = false }) {
  const certificateReady = progress.completedTracts.includes('dcml');

  return (
    <div className={`grid gap-2 ${compact ? '' : 'sm:grid-cols-3'}`}>
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Points</p>
        <p className="mt-1 text-2xl font-semibold text-slate-950">{progress.points}</p>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Badges</p>
        <p className="mt-1 text-2xl font-semibold text-slate-950">{progress.badges.length}/{badges.length}</p>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Certificate</p>
        <p className={`mt-1 text-sm font-semibold ${certificateReady ? 'text-emerald-700' : 'text-slate-500'}`}>
          {certificateReady ? 'Ready' : 'In progress'}
        </p>
      </div>
    </div>
  );
}

function BadgeShelf({ progress }) {
  return (
    <div className="grid gap-2">
      {badges.map((badge) => {
        const earned = progress.badges.includes(badge.id);

        return (
          <div
            key={badge.id}
            className={`rounded-lg border px-3 py-3 text-sm transition ${
              earned ? badge.tone : 'border-slate-200 bg-slate-50 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold">{badge.title}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.16em]">{earned ? 'Earned' : 'Locked'}</span>
            </div>
            <p className="mt-1 leading-5">{badge.description}</p>
          </div>
        );
      })}
    </div>
  );
}

function BadgeCelebration({ badge, onClose }) {
  const pieces = Array.from({ length: 24 }, (_, index) => index);

  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center overflow-hidden bg-slate-950/65 px-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="badge-title"
    >
      <div className="absolute inset-0 pointer-events-none">
        {pieces.map((piece) => (
          <motion.span
            key={piece}
            className="absolute block h-3 w-3 rounded-sm"
            style={{
              left: `${8 + ((piece * 37) % 84)}%`,
              backgroundColor: ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6'][piece % 4],
            }}
            initial={{ top: '-8%', rotate: 0 }}
            animate={{ top: '108%', rotate: 360 }}
            transition={{ duration: 2.2 + (piece % 5) * 0.18, delay: (piece % 8) * 0.08 }}
          />
        ))}
      </div>
      <motion.div
        className="relative w-full max-w-md rounded-lg border border-amber-300 bg-white p-6 text-center text-slate-950 shadow-2xl"
        initial={{ scale: 0.86, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0 }}
      >
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border-4 border-amber-400 bg-amber-50 text-4xl font-black text-amber-700">
          B
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">Badge unlocked</p>
        <h2 id="badge-title" className="mt-2 text-3xl font-semibold text-slate-950">
          {badge.title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{badge.description}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  );
}

function CertificateModal({ progress, onClose }) {
  const today = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-title"
    >
      <motion.div
        className="w-full max-w-3xl rounded-lg border-4 border-sky-700 bg-white p-8 text-center text-slate-950 shadow-2xl"
        initial={{ scale: 0.96, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.98, y: 12 }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-700">Certificate of Completion</p>
        <h2 id="certificate-title" className="mt-4 text-4xl font-semibold">Ascending Tracts: DCML Module</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-700">
          This certifies completion of the Dorsal Column - Medial Lemniscus interactive pathway module.
        </p>
        <div className="mt-8 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-5 text-left sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Points</p>
            <p className="mt-1 text-2xl font-semibold">{progress.points}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Badges</p>
            <p className="mt-1 text-2xl font-semibold">{progress.badges.length}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Date</p>
            <p className="mt-1 text-sm font-semibold">{today}</p>
          </div>
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Certificate ID: SC-DCML-{progress.completedLevels.length}-{progress.points}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 rounded-lg bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

function isAnswerCorrect(level, value) {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();

  if (level.type === 'blank') {
    const matchCount = level.accepted.filter((term) => normalized.includes(term)).length;
    return matchCount >= (level.minMatches ?? 1);
  }

  return normalized === level.answer.toLowerCase();
}

function HomeAudioControls() {
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [finished, setFinished] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const activeTrack = homeAudioTracks[trackIndex];

  const playAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
      setShouldPlay(true);
      setAutoplayBlocked(false);
      setFinished(false);
    } catch {
      setIsPlaying(false);
      setAutoplayBlocked(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = muted;
  }, [muted, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !shouldPlay) return;

    audio.currentTime = 0;
    playAudio();
  }, [trackIndex, shouldPlay]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setShouldPlay(false);
      return;
    }

    if (finished) {
      setTrackIndex(0);
    }

    setShouldPlay(true);
    playAudio();
  };

  const handleEnded = () => {
    if (trackIndex < homeAudioTracks.length - 1) {
      setTrackIndex((current) => current + 1);
      setShouldPlay(true);
      return;
    }

    setIsPlaying(false);
    setShouldPlay(false);
    setFinished(true);
    setTrackIndex(0);
  };

  return (
    <section className="absolute bottom-24 left-4 z-20 w-[min(19rem,calc(100%-2rem))] rounded-lg border border-white/80 bg-white/90 p-3 shadow-xl backdrop-blur">
      <audio
        ref={audioRef}
        src={activeTrack.src}
        preload="auto"
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlayback}
            className="grid h-10 w-10 place-items-center rounded-lg bg-sky-700 text-lg font-semibold text-white transition hover:bg-sky-800"
            aria-label={isPlaying ? 'Pause audio' : finished ? 'Replay audio' : 'Play audio'}
            title={isPlaying ? 'Pause' : finished ? 'Replay' : 'Play'}
          >
            {isPlaying ? 'II' : finished ? 'R' : '>'}
          </button>
          <button
            type="button"
            onClick={() => setMuted((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-300 text-lg font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
            aria-label={muted ? 'Unmute audio' : 'Mute audio'}
            title={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? 'M' : 'S'}
          </button>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-300 text-lg font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
            aria-label={expanded ? 'Collapse audio controls' : 'Expand audio controls'}
            title={expanded ? 'Collapse' : 'Volume'}
          >
            {expanded ? '-' : '+'}
          </button>
          <span className="min-w-0 truncate text-xs font-semibold text-slate-700">
            {finished ? 'Complete' : activeTrack.title}
          </span>
        </div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              className="border-t border-slate-200 pt-3"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                Volume
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                  className="w-full accent-sky-700"
                />
              </label>
              {autoplayBlocked && (
                <p className="mt-2 text-xs leading-5 text-amber-700">
                  Press play once to start audio.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function LandingScreen({ onSelectDivision, progress }) {
  return (
    <div className="min-h-screen bg-[#f7fafc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Spinal Cord Explorer</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
            Choose A Pathway System
          </h1>
          <div className="mt-4">
            <ProgressPill progress={progress} />
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(320px,520px)_1fr]">
        <section className="relative min-h-[560px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <spline-viewer
            url="https://prod.spline.design/GVrlap4FGO1V3lj4/scene.splinecode"
            className="pointer-events-none block h-[560px] w-full"
          />
          <HomeAudioControls />
          <button
            type="button"
            onClick={() => onSelectDivision('ascending')}
            className="absolute left-1/2 top-5 z-10 w-44 -translate-x-1/2 rounded-lg border border-emerald-600 bg-emerald-50/95 px-4 py-3 text-sm font-semibold text-emerald-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-100"
          >
            Ascending Tracts
          </button>
          <button
            type="button"
            onClick={() => onSelectDivision('descending')}
            className="absolute bottom-5 left-1/2 z-10 w-44 -translate-x-1/2 rounded-lg border border-rose-600 bg-rose-50/95 px-4 py-3 text-sm font-semibold text-rose-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-rose-100"
          >
            Descending Tracts
          </button>
        </section>

        <section className="grid content-start gap-4">
          <button
            type="button"
            onClick={() => onSelectDivision('ascending')}
            className="rounded-lg border border-emerald-600 bg-white p-5 text-left shadow-sm transition hover:bg-emerald-50"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Sensory input upward</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Ascending Tracts</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Open DCML now, then add lateral STT, ventral STT, and spinocerebellar tract content in the same interactive format.
            </p>
          </button>
          <button
            type="button"
            onClick={() => onSelectDivision('descending')}
            className="rounded-lg border border-rose-600 bg-white p-5 text-left shadow-sm transition hover:bg-rose-50"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">Motor output downward</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Descending Tracts</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              A placeholder destination is ready for corticospinal and related motor tract modules when you want them.
            </p>
          </button>
        </section>
      </main>
    </div>
  );
}

function AscendingTractsScreen({ onBack, onOpenTract, progress }) {
  return (
    <div className="min-h-screen bg-[#f7fafc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <button type="button" onClick={onBack} className="mb-3 text-sm font-semibold text-sky-800 hover:text-sky-950">
              Back to spinal cord object
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">Ascending Tracts</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              Select A Sensory Pathway
            </h1>
          </div>
          <div className="w-full max-w-sm">
            <ProgressPill progress={progress} compact />
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-2 xl:grid-cols-4">
        {ascendingTracts.map((tract) => (
          <button
            key={tract.id}
            type="button"
            onClick={() => onOpenTract(tract.id)}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-500"
          >
            <div className="h-72 bg-slate-50">
              <img src={tract.image} alt={`${tract.title} diagram`} className="h-full w-full object-contain" />
            </div>
            <div className="border-t border-slate-200 p-4">
              <div className={`mb-3 inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${
                progress.completedTracts.includes(tract.id)
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                  : 'border-slate-200 bg-slate-50 text-slate-600'
              }`}>
                {progress.completedTracts.includes(tract.id) ? 'Completed' : tract.status}
              </div>
              <h2 className="text-lg font-semibold text-slate-950">{tract.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{tract.description}</p>
            </div>
          </button>
        ))}
      </main>
    </div>
  );
}

function PlaceholderTractScreen({ tract, onBack }) {
  return (
    <div className="min-h-screen bg-[#f7fafc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <button type="button" onClick={onBack} className="mb-3 text-sm font-semibold text-sky-800 hover:text-sky-950">
            Back to ascending tracts
          </button>
          <h1 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">{tract.title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Image and module shell are ready. I will attach your questions, answers, and know-more text when you send the content.
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <img src={tract.image} alt={`${tract.title} diagram`} className="mx-auto max-h-[1180px] w-full object-contain" />
        </section>
      </main>
    </div>
  );
}

function DescendingTractsScreen({ onBack }) {
  return (
    <div className="min-h-screen bg-[#f7fafc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <button type="button" onClick={onBack} className="mb-3 text-sm font-semibold text-sky-800 hover:text-sky-950">
            Back to spinal cord object
          </button>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-700">Descending Tracts</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
            Motor Pathways
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Dorsal Column - Medial Lemniscus pathway animation is available here for review.
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <DCMLPage />
      </main>
    </div>
  );
}

function FlashcardModal({ level, onClose, onComplete, onKnowMore }) {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const correct = useMemo(() => isAnswerCorrect(level, answer), [answer, level]);

  const submitAnswer = () => {
    if (!answer.trim()) return;
    setSubmitted(true);
    onComplete(level.id, correct);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="flashcard-title"
    >
      <motion.div
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-slate-300 bg-white p-5 text-slate-950 shadow-2xl sm:p-6"
        initial={{ scale: 0.96, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.98, y: 12 }}
      >
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">{level.phase}</p>
            <h2 id="flashcard-title" className="mt-1 text-2xl font-semibold text-slate-950">
              {level.label}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-300 text-xl leading-none text-slate-600 transition hover:border-slate-500 hover:text-slate-950"
            aria-label="Close flashcard"
          >
            x
          </button>
        </div>

        <p className="text-lg leading-8 text-slate-900">{level.prompt}</p>

        <div className="mt-5">
          {level.type === 'blank' ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                disabled={submitted}
                placeholder={level.placeholder}
                className="min-h-12 flex-1 rounded-lg border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-200"
              />
              <button
                type="button"
                onClick={submitAnswer}
                disabled={!answer.trim() || submitted}
                className="min-h-12 rounded-lg bg-sky-700 px-5 font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Check
              </button>
            </div>
          ) : (
            <div className="grid gap-3">
              {level.options.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => {
                    setAnswer(option);
                    setSubmitted(true);
                    onComplete(level.id, isAnswerCorrect(level, option));
                  }}
                  disabled={submitted}
                  className={`rounded-lg border px-4 py-3 text-left transition ${
                    answer === option
                      ? 'border-sky-700 bg-sky-50 text-sky-950'
                      : 'border-slate-300 bg-white text-slate-800 hover:border-sky-600 hover:bg-sky-50'
                  } disabled:cursor-default`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <AnimatePresence>
          {submitted && (
            <motion.div
              className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <p className={`font-semibold ${correct ? 'text-emerald-700' : 'text-amber-700'}`}>
                {correct ? 'Correct.' : 'Good attempt. Compare it with the answer below.'}
              </p>
              <p className="mt-2 text-slate-900">
                <span className="font-semibold">Answer:</span> {level.answer}
                {level.explanation ? ` - ${level.explanation}` : ''}
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowMore((value) => !value);
                  if (!showMore) onKnowMore(level.id);
                }}
                className="mt-4 rounded-lg border border-sky-700 px-4 py-2 text-sm font-semibold text-sky-800 transition hover:bg-sky-50"
              >
                {showMore ? 'Hide know more' : 'Know more'}
              </button>
              {showMore && (
                <div className="mt-4 space-y-3 whitespace-pre-line border-t border-slate-200 pt-4 text-sm leading-7 text-slate-700">
                  {level.knowMore}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function DcmlModule({ onBack, progress }) {
  const completedLevelIds = progress.completedLevels;

  return (
    <div className="min-h-screen bg-[#f7fafc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:px-6">
          <button type="button" onClick={onBack} className="w-fit text-sm font-semibold text-sky-800 hover:text-sky-950">
            Back to ascending tracts
          </button>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Spinal Cord Explorer</p>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
                Dorsal Column - Medial Lemniscus
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Play the audio-guided pathway and jump between the main DCML landmarks.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {completedLevelIds.length}/{pathwayLevels.length} levels completed
            </div>
          </div>
          <ProgressPill progress={progress} />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <DCMLPage />
      </main>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [activeTractId, setActiveTractId] = useState(null);
  const [progress, setProgress] = useState(loadProgress);
  const [celebrationBadge, setCelebrationBadge] = useState(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const activeTract = ascendingTracts.find((tract) => tract.id === activeTractId);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (producer) => {
    setProgress((current) => {
      const next = producer(current);
      const nextBadges = evaluateBadges(next);
      const newBadgeId = nextBadges.find((badgeId) => !current.badges.includes(badgeId));
      const updated = { ...next, badges: nextBadges };

      if (newBadgeId) {
        setCelebrationBadge(badges.find((badge) => badge.id === newBadgeId));
      }

      return updated;
    });
  };

  const recordAnswer = (levelId, correct) => {
    updateProgress((current) => {
      const alreadyAttempted = current.attemptedLevels.includes(levelId);
      const completedLevels = current.completedLevels.includes(levelId)
        ? current.completedLevels
        : [...current.completedLevels, levelId];
      const attemptedLevels = alreadyAttempted ? current.attemptedLevels : [...current.attemptedLevels, levelId];
      const correctFirstTryLevels =
        correct && !alreadyAttempted && !current.correctFirstTryLevels.includes(levelId)
          ? [...current.correctFirstTryLevels, levelId]
          : current.correctFirstTryLevels;
      const completedTracts =
        pathwayLevels.every((level) => completedLevels.includes(level.id)) && !current.completedTracts.includes('dcml')
          ? [...current.completedTracts, 'dcml']
          : current.completedTracts;
      const points = current.points + (alreadyAttempted ? 0 : 10) + (correct && !alreadyAttempted ? 20 : 0) +
        (completedTracts.length > current.completedTracts.length ? 50 : 0);

      return {
        ...current,
        points,
        completedLevels,
        attemptedLevels,
        correctFirstTryLevels,
        completedTracts,
      };
    });
  };

  const recordKnowMore = (levelId) => {
    updateProgress((current) => {
      if (current.knowMoreLevels.includes(levelId)) return current;

      return {
        ...current,
        points: current.points + 10,
        knowMoreLevels: [...current.knowMoreLevels, levelId],
      };
    });
  };

  let content;

  if (screen === 'landing') {
    content = (
      <LandingScreen
        progress={progress}
        onSelectDivision={(division) => {
          setScreen(division);
          setActiveTractId(null);
        }}
      />
    );
  } else if (screen === 'descending') {
    content = <DescendingTractsScreen onBack={() => setScreen('landing')} />;
  } else if (screen === 'ascending' && !activeTractId) {
    content = (
      <AscendingTractsScreen
        progress={progress}
        onBack={() => setScreen('landing')}
        onOpenTract={(tractId) => {
          setActiveTractId(tractId);
        }}
      />
    );
  } else if (activeTractId === 'dcml') {
    content = (
      <DcmlModule
        progress={progress}
        onBack={() => setActiveTractId(null)}
        onAnswer={recordAnswer}
        onKnowMore={recordKnowMore}
        onShowCertificate={() => setIsCertificateOpen(true)}
      />
    );
  } else {
    content = <PlaceholderTractScreen tract={activeTract} onBack={() => setActiveTractId(null)} />;
  }

  return (
    <>
      {content}
      <AnimatePresence>
        {celebrationBadge && (
          <BadgeCelebration badge={celebrationBadge} onClose={() => setCelebrationBadge(null)} />
        )}
        {isCertificateOpen && <CertificateModal progress={progress} onClose={() => setIsCertificateOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
