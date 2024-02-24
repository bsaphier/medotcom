import { create } from 'zustand';

interface GlobalState {
    loading: boolean;
    displayGreeting: boolean;
    setLoading: (next: boolean) => void;
    setDisplayGreeting: (next: boolean) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
    loading: true,
    displayGreeting: false,
    setLoading: (next) => set({ loading: next }),
    setDisplayGreeting: (next) => set({ displayGreeting: next }),
}));
