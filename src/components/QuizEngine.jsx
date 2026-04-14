import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import clinicalCases from '../data/clinical_cases.json';
import { layers } from '../layers/index';

export default function QuizEngine({ isCaseMode = false }) {
  const { selectedLayerId, addQuizResult } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const layerCases = useMemo(
    () => clinicalCases.filter((item) => item.layer === selectedLayerId),
    [selectedLayerId],
  );

  const currentCase = layerCases[currentIndex] ?? layerCases[0];
  if (!currentCase) {
    return (
      <div className="rounded-3xl border border-slate-700/70 bg-slate-950/40 p-5 text-slate-300 shadow-neon">
        <p>No questions available for this layer yet.</p>
      </div>
    );
  }

  const handleAnswer = (choice) => {
    const correct = choice === currentCase.answer;
    setSelectedAnswer(choice);
    setFeedback(correct ? 'Correct! Great clinical reasoning.' : 'Incorrect — review the pathway and try again.');
    addQuizResult({ question: currentCase.question, correct, timestamp: Date.now() });
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setFeedback(null);
    setCurrentIndex((index) => (index + 1) % layerCases.length);
  };

  return (
    <div className="rounded-3xl border border-slate-700/70 bg-slate-950/40 p-5 shadow-neon">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{isCaseMode ? 'Case Challenge' : 'Quiz'}</p>
          <h3 className="text-xl font-semibold text-white">{currentCase.title}</h3>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">
          {currentIndex + 1}/{layerCases.length}
        </span>
      </div>

      <div className="space-y-4 bg-slate-900/80 p-4 text-slate-300">
        <p className="text-sm leading-7">{currentCase.scenario}</p>
        <div className="grid gap-3">
          {currentCase.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={Boolean(selectedAnswer)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                selectedAnswer === option
                  ? option === currentCase.answer
                    ? 'border-emerald-400/70 bg-emerald-500/10 text-emerald-100'
                    : 'border-rose-400/70 bg-rose-500/10 text-rose-100'
                  : 'border-slate-700 bg-slate-950/90 text-slate-300 hover:border-glow/50 hover:bg-slate-900'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {feedback && <p className="rounded-2xl bg-slate-800/90 p-3 text-sm leading-6 text-slate-100">{feedback}</p>}
        {selectedAnswer && (
          <button
            onClick={nextQuestion}
            className="w-full rounded-2xl bg-glow px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-glow/90"
          >
            Next scenario
          </button>
        )}
      </div>
    </div>
  );
}
