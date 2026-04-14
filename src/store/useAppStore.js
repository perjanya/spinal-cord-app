import create from 'zustand';

export const useAppStore = create((set) => ({
  selectedLayerId: 'anatomy',
  mode: 'explore',
  activeTract: 'spinothalamic',
  isVideoOpen: false,
  quizResults: [],
  setSelectedLayerId: (id) => set({ selectedLayerId: id, activeTract: null }),
  setMode: (mode) => set({ mode }),
  setActiveTract: (tract) => set({ activeTract: tract }),
  openVideo: () => set({ isVideoOpen: true }),
  closeVideo: () => set({ isVideoOpen: false }),
  addQuizResult: (result) =>
    set((state) => ({ quizResults: [...state.quizResults, result] })),
}));
