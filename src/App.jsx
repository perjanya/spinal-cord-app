import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

const knowMoreBasics = `The Dorsal Column pathway is the body's high-speed data cable for discriminative touch, allowing you to recognize a coin in your pocket without looking or to feel the vibration of a tuning fork. It begins with first-order neurons in the Dorsal Root Ganglion, which send long axons up the back of the spinal cord in two bundles: the Fasciculus Gracilis for the legs and lower body, and the Fasciculus Cuneatus for the arms and upper body. These fibers stay on the same side they entered until they reach the lower medulla of the brainstem.

In the medulla, they synapse with second-order neurons at the Nucleus Gracilis and Nucleus Cuneatus. It is here that the fibers decussate in the sensory decussation, forming the Medial Lemniscus. These crossed fibers travel to the VPL nucleus of the thalamus, where third-order neurons take the information to the somatosensory cortex. Because of this crossing, the left side of your brain perceives what your right hand touches. Clinically, damage here leads to sensory ataxia, often symbolized by a positive Romberg sign.`;

const knowMoreClinical = `The Romberg test depends on the three-legged stool of balance: vision, vestibular input from the inner ear, and proprioception from the dorsal columns. Under normal conditions, the brain needs at least two of these three inputs to keep the body upright.

In a positive Romberg test, the proprioception leg is impaired by dorsal column pathway damage. With eyes open, vision compensates. When the patient closes their eyes, that compensation is removed; with only vestibular input left, the patient sways or falls.

This is sensory ataxia. It is distinct from cerebellar ataxia, where the patient remains unsteady even with eyes open. Loss of conscious joint-position sense is a hallmark of conditions such as Tabes Dorsalis and Subacute Combined Degeneration of the spinal cord.`;

const pathwayLevels = [
  {
    id: 'drg',
    phase: 'Level 1',
    label: 'Receptors',
    shortLabel: 'Receptors',
    prompt:
      'The first-order neurons of the Dorsal Column pathway are located in the __________ and consist of large, heavily myelinated fibers.',
    type: 'blank',
    placeholder: 'Type the missing structure',
    answer: 'Dorsal Root Ganglion / DRG',
    accepted: ['dorsal root ganglion', 'drg'],
    minMatches: 1,
    hint: 'The cell bodies sit just outside the spinal cord in a sensory ganglion.',
    knowMore: knowMoreBasics,
    position: 'left-[25%] bottom-[8%] sm:left-[28%]',
  },
  {
    id: 'lower-medulla',
    phase: 'Level 2',
    label: 'Medulla',
    shortLabel: 'Medulla',
    prompt: 'Where do the second-order neurons of the PCML pathway decussate (cross)?',
    type: 'mcq',
    hint: 'Motor decussation is at the medulla; this sensory crossing is also in the medulla.',
    options: [
      'Anterior white commissure',
      'Sensory decussation of medulla',
      'VPL',
      'Internal capsule',
    ],
    answer: 'Sensory decussation of medulla',
    knowMore: knowMoreBasics,
    position: 'right-[23%] bottom-[25%] sm:right-[26%]',
  },
  {
    id: 'columns',
    phase: 'Level 3',
    label: 'Fasciculi Arrangement',
    shortLabel: 'Gracilis / Cuneatus',
    prompt:
      'True or False: Fibers in the Fasciculus Gracilis and Cuneatus are arranged such that sacral segments are located most laterally.',
    type: 'boolean',
    hint: 'Think lower limb first: sacral and lumbar fibers enter earlier and occupy the medial dorsal column.',
    options: ['True', 'False'],
    answer: 'False',
    explanation: 'Sacral fibers are medial; cervical fibers are lateral.',
    knowMore: `${knowMoreBasics}

Lower-limb sensory fibers from sacral and lumbar segments travel medially in the Fasciculus Gracilis, while upper-limb fibers ascend more laterally in the Fasciculus Cuneatus. This somatotopic map is useful when comparing lower-limb proprioceptive load in standing and sitting professions, including foot-arch and balance-related observations.`,
    position: 'left-[17%] bottom-[37%] sm:left-[21%]',
  },
  {
    id: 'proprioception',
    phase: 'Level 4',
    label: 'Romberg Test',
    shortLabel: 'Romberg',
    prompt:
      'A patient presents with a positive Romberg test, swaying only when eyes are closed. Which receptor type is likely failing to transmit signals correctly?',
    type: 'mcq',
    hint: 'The deficit appears when visual compensation is removed, so joint-position input is the weak link.',
    options: [
      'Nociceptors',
      'Thermoreceptors',
      'Proprioceptors',
      'Photoreceptors',
    ],
    answer: 'Proprioceptors',
    knowMore: knowMoreClinical,
    position: 'right-[20%] bottom-[49%] sm:right-[24%]',
  },
  {
    id: 'cordotomy',
    phase: 'Level 5',
    label: 'Posterior Funiculus',
    shortLabel: 'Cordotomy',
    prompt:
      "Sparing the posterior funiculus preserves __________ and __________.",
    type: 'blank',
    placeholder: 'Type two preserved sensations',
    answer: 'Vibration / Proprioception',
    accepted: ['vibration', 'proprioception'],
    minMatches: 2,
    hint: 'These are dorsal column modalities, not spinothalamic pain and temperature.',
    knowMore: knowMoreClinical,
    position: 'left-[25%] bottom-[62%] sm:left-[31%]',
  },
  {
    id: 'b12',
    phase: 'Level 6',
    label: 'Vitamin B12 Deficiency',
    shortLabel: 'B12',
    prompt:
      'True or False: In a patient with early-stage Vitamin B12 deficiency, you would expect to see a loss of pain sensation before a loss of vibration sense.',
    type: 'boolean',
    hint: 'Subacute combined degeneration commonly affects posterior columns early.',
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

function getCertificateRecords(progress) {
  const ascendingComplete = ascendingTracts.every((tract) => progress.completedTracts.includes(tract.id));
  const descendingTracts = ['corticospinal', 'rubrospinal', 'vestibulospinal', 'reticulospinal', 'tectospinal'];
  const descendingComplete = descendingTracts.every((tractId) => progress.completedTracts.includes(tractId));

  return [
    {
      id: 'ascending',
      title: 'Ascending Pathways Completed',
      description: 'Awarded after completion of all ascending tract pathways.',
      earned: ascendingComplete,
    },
    {
      id: 'descending',
      title: 'Descending Pathways Completed',
      description: 'Awarded after completion of all descending tract pathways.',
      earned: descendingComplete,
    },
    {
      id: 'all-tracts',
      title: 'All Spinal Cord Tracts Completed',
      description: 'Awarded when learning of all ascending and descending tracts is completed.',
      earned: ascendingComplete && descendingComplete,
    },
  ];
}

function ProgressPill({ progress, compact = false }) {
  const certificateRecords = getCertificateRecords(progress);
  const earnedCertificateCount = certificateRecords.filter((certificate) => certificate.earned).length;

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
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Certificates</p>
        <p className={`mt-1 text-sm font-semibold ${earnedCertificateCount ? 'text-emerald-700' : 'text-slate-500'}`}>
          {earnedCertificateCount}/3 earned
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

function BadgeDrawer({ progress, isOpen, onToggle }) {
  return (
    <div className="fixed left-0 top-1/2 z-40 flex -translate-y-1/2 flex-row-reverse items-stretch">
      <button
        type="button"
        onClick={onToggle}
        className="grid min-h-28 w-10 place-items-center rounded-r-lg border border-l-0 border-amber-500 bg-amber-500 px-2 py-3 text-xs font-semibold text-amber-950 shadow-xl transition hover:bg-amber-400"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        aria-expanded={isOpen}
        aria-label="Badges"
        title="Badges"
      >
        Badge
      </button>

      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 340 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden border-y border-r border-slate-200 bg-white shadow-2xl"
      >
        <div className="w-[340px] p-4 text-slate-950">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">Learning Awards</p>
            <h2 className="mt-1 text-xl font-semibold">Badges</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {progress.badges.length}/{badges.length} earned across this module.
            </p>
          </div>
          <BadgeShelf progress={progress} />
        </div>
      </motion.aside>
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
  const certificateRecords = getCertificateRecords(progress);
  const earnedCertificateCount = certificateRecords.filter((certificate) => certificate.earned).length;
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
        <h2 id="certificate-title" className="mt-4 text-4xl font-semibold">Spinal Cord Tract Certificates</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-700">
          Certificates are awarded only for full pathway groups: all ascending tracts, all descending tracts, and all tracts together.
        </p>
        <div className="mt-8 grid gap-3 text-left">
          {certificateRecords.map((certificate) => (
            <div
              key={certificate.id}
              className={`rounded-lg border p-4 ${
                certificate.earned
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-950'
                  : 'border-slate-200 bg-slate-50 text-slate-500'
              }`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{certificate.title}</h3>
                  <p className="mt-1 text-sm leading-6">{certificate.description}</p>
                </div>
                <span className="w-fit rounded-md border border-current px-2 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
                  {certificate.earned ? 'Earned' : 'Locked'}
                </span>
              </div>
              {certificate.earned && (
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em]">
                  Certificate ID: SC-{certificate.id.toUpperCase()}-{progress.completedTracts.length}-{progress.points}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-3 rounded-lg border border-slate-200 bg-white p-5 text-left sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Points</p>
            <p className="mt-1 text-2xl font-semibold">{progress.points}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Badges</p>
            <p className="mt-1 text-2xl font-semibold">{progress.badges.length}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Certificates</p>
            <p className="mt-1 text-2xl font-semibold">{earnedCertificateCount}/3</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Date</p>
            <p className="mt-1 text-sm font-semibold">{today}</p>
          </div>
        </div>
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
            This destination is reserved for descending tract modules. The landing object can already route learners here.
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="rounded-lg border border-dashed border-rose-300 bg-white p-6 text-slate-700">
          Add corticospinal, rubrospinal, vestibulospinal, reticulospinal, and tectospinal modules here later.
        </div>
      </main>
    </div>
  );
}

function QuizDrawer({ levels, completedLevelIds, activeLevelId, isReady, isOpen, onToggle, onSelectLevel }) {
  const nextIndex = Math.min(completedLevelIds.length, levels.length - 1);

  return (
    <div className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 items-stretch">
      <button
        type="button"
        onClick={onToggle}
        className={`grid min-h-28 w-10 place-items-center rounded-l-lg border border-r-0 px-2 py-3 text-xs font-semibold shadow-xl transition ${
          isReady
            ? 'border-sky-600 bg-sky-700 text-white hover:bg-sky-800'
            : 'border-slate-300 bg-slate-200 text-slate-500'
        }`}
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        aria-expanded={isOpen}
        aria-label="Pathway Quiz"
        title="Pathway Quiz"
      >
        Quiz
      </button>

      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 360 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden border-y border-l border-slate-200 bg-white shadow-2xl"
      >
        <div className="w-[360px] p-4 text-slate-950">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">Gamified Pathway</p>
            <h2 className="mt-1 text-xl font-semibold">Pathway Quiz</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {isReady ? 'Complete each level to unlock the next.' : 'Finish the 88-second pathway animation to unlock the quiz.'}
            </p>
          </div>

          <div className="grid overflow-hidden rounded-lg border border-slate-200">
            {levels.map((level, index) => {
              const isCompleted = completedLevelIds.includes(level.id);
              const isUnlocked = isReady && (index <= nextIndex || isCompleted);
              const isActive = activeLevelId === level.id;

              return (
                <button
                  key={level.id}
                  type="button"
                  disabled={!isUnlocked}
                  onClick={() => onSelectLevel(level)}
                  className={`grid grid-cols-[1fr_auto] items-center gap-3 border-b border-slate-200 px-3 py-3 text-left text-sm transition last:border-b-0 ${
                    isActive && isUnlocked
                      ? 'bg-sky-50 text-sky-950'
                      : isReady && isCompleted
                        ? 'bg-emerald-50 text-emerald-900'
                        : isUnlocked
                          ? 'bg-white text-slate-800 hover:bg-sky-50'
                          : 'bg-slate-100 text-slate-400 grayscale'
                  }`}
                >
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.16em]">{level.phase}</span>
                    {level.label}
                  </span>
                  <span className="text-lg" aria-hidden="true">
                    {isReady && isCompleted ? '✓' : isUnlocked ? '›' : '🔒'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.aside>
    </div>
  );
}

function FlashcardModal({ level, onClose, onComplete, onKnowMore }) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [hintVisible, setHintVisible] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(level.type !== 'mcq');
  const [showMore, setShowMore] = useState(false);
  const correct = useMemo(() => isAnswerCorrect(level, answer), [answer, level]);

  const submitAnswer = () => {
    if (!answer.trim()) return;
    setFeedback(correct ? 'correct' : 'incorrect');

    if (correct) {
      onComplete(level.id, true);
      setShowMore(true);
      onKnowMore(level.id);
    } else {
      onComplete(level.id, false);
    }
  };

  const chooseAnswer = (option) => {
    setAnswer(option);
    const optionCorrect = isAnswerCorrect(level, option);
    setFeedback(optionCorrect ? 'correct' : 'incorrect');

    if (optionCorrect) {
      onComplete(level.id, true);
      setShowMore(true);
      onKnowMore(level.id);
    } else {
      onComplete(level.id, false);
    }
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

        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => {
              setHintVisible(true);
              if (level.type === 'mcq' && hintVisible) setOptionsVisible(true);
            }}
            className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-amber-300 bg-amber-50 text-xl transition hover:bg-amber-100"
            aria-label="Show hint"
            title="Show hint"
          >
            💡
          </button>
          <p className="text-lg leading-8 text-slate-900">{level.prompt}</p>
        </div>

        <AnimatePresence>
          {hintVisible && (
            <motion.div
              className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
            >
              {level.hint}
              {level.type === 'mcq' && !optionsVisible && (
                <button
                  type="button"
                  onClick={() => setOptionsVisible(true)}
                  className="mt-3 block rounded-lg border border-amber-600 px-3 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-100"
                >
                  Show answer options
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5">
          {level.type === 'blank' ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={answer}
                onChange={(event) => {
                  setAnswer(event.target.value);
                  setFeedback(null);
                }}
                disabled={feedback === 'correct'}
                placeholder={level.placeholder}
                className="min-h-12 flex-1 rounded-lg border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-200"
              />
              <button
                type="button"
                onClick={submitAnswer}
                disabled={!answer.trim() || feedback === 'correct'}
                className="min-h-12 rounded-lg bg-sky-700 px-5 font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Check
              </button>
            </div>
          ) : level.type === 'mcq' && !optionsVisible ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
              Use the hint first, then reveal the options when you are ready.
            </div>
          ) : (
            <div className="grid gap-3">
              {level.options.map((option) => (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${
                    answer === option
                      ? 'border-sky-700 bg-sky-50 text-sky-950'
                      : 'border-slate-300 bg-white text-slate-800 hover:border-sky-600 hover:bg-sky-50'
                  } ${feedback === 'correct' ? 'cursor-default opacity-80' : ''}`}
                >
                  <input
                    type="radio"
                    name={`quiz-${level.id}`}
                    value={option}
                    checked={answer === option}
                    disabled={feedback === 'correct'}
                    onChange={() => chooseAnswer(option)}
                    className="h-4 w-4 accent-sky-700"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div
              className={`mt-5 rounded-lg border p-4 ${
                feedback === 'correct'
                  ? 'border-emerald-300 bg-emerald-50'
                  : 'border-red-300 bg-red-50'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {feedback === 'correct' ? (
                <div className="flex flex-wrap items-center gap-3">
                  <div className="quiz-badge-pop grid h-12 w-12 place-items-center rounded-full border-2 border-amber-500 bg-amber-300 text-xl font-black text-amber-950 shadow-lg">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-800">Correct. Badge unlocked.</p>
                    <p className="mt-1 text-sm text-emerald-900">
                      <span className="font-semibold">Answer:</span> {level.answer}
                      {level.explanation ? ` - ${level.explanation}` : ''}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-red-700">Incorrect. Try again.</p>
                  <p className="mt-1 text-sm text-red-900">Use the hint, then submit another answer.</p>
                </div>
              )}

              {feedback === 'correct' && showMore && (
                <div className="mt-4 space-y-3 whitespace-pre-line border-t border-slate-200 pt-4 text-sm leading-7 text-slate-700">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Know More</p>
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

function DcmlModule({ onBack, progress, onAnswer, onKnowMore, onShowCertificate }) {
  const pathwayFrameRef = useRef(null);
  const [activeLevel, setActiveLevel] = useState(null);
  const [quizReady, setQuizReady] = useState(false);
  const [quizDrawerOpen, setQuizDrawerOpen] = useState(false);
  const [badgeDrawerOpen, setBadgeDrawerOpen] = useState(false);
  const completedLevelIds = progress.completedLevels;

  const completeLevel = (levelId, correct) => onAnswer(levelId, correct);

  useEffect(() => {
    const unlockQuiz = () => {
      setQuizReady(true);
      setQuizDrawerOpen(true);
    };

    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === 'dcml-quiz-ready') unlockQuiz();
    };

    window.addEventListener('message', handleMessage);

    const timer = quizReady ? undefined : window.setInterval(() => {
      const audio = pathwayFrameRef.current?.contentDocument?.querySelector('audio');

      if (audio?.currentTime >= 88) {
        unlockQuiz();
        window.clearInterval(timer);
      }
    }, 750);

    return () => {
      window.removeEventListener('message', handleMessage);
      if (timer) window.clearInterval(timer);
    };
  }, [quizReady]);

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
                Use the interactive pathway as your map. The quiz unlocks after the 88-second animation, then opens from the right-side drawer.
              </p>
            </div>
            <button
              type="button"
              onClick={onShowCertificate}
              className="w-fit rounded-lg bg-sky-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
            >
              View Certificates
            </button>
          </div>
          <ProgressPill progress={progress} />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <section className="relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-12 py-4 text-center">
            <p className="text-base font-semibold text-slate-800">Dorsal Column Medial Lemniscus</p>
          </div>
          <div className="relative min-h-[70vh] bg-slate-950">
            <iframe
              ref={pathwayFrameRef}
              src="/assets/DCMLnewwithcameramovments1.html"
              title="Dorsal Column Medial Lemniscus interactive pathway"
              className="h-[70vh] w-full border-0"
            />
          </div>
        </section>
      </main>

      <BadgeDrawer
        progress={progress}
        isOpen={badgeDrawerOpen}
        onToggle={() => setBadgeDrawerOpen((value) => !value)}
      />

      <QuizDrawer
        levels={pathwayLevels}
        completedLevelIds={completedLevelIds}
        activeLevelId={activeLevel?.id}
        isReady={quizReady}
        isOpen={quizDrawerOpen}
        onToggle={() => setQuizDrawerOpen((value) => !value)}
        onSelectLevel={(level) => {
          setActiveLevel(level);
          setQuizDrawerOpen(false);
        }}
      />

      <AnimatePresence>
        {activeLevel && (
          <FlashcardModal
            key={activeLevel.id}
            level={activeLevel}
            onClose={() => setActiveLevel(null)}
            onComplete={completeLevel}
            onKnowMore={onKnowMore}
          />
        )}
      </AnimatePresence>
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
      const completedLevels = !correct || current.completedLevels.includes(levelId)
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
