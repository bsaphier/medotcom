import { Scale, bluesScale } from 'sound';
import { create } from 'zustand';

interface SoundState {
    droneOn: boolean;
    toggleDrone: () => void;
    scale: Scale;
}

export const useSoundStore = create<SoundState>((set) => ({
    droneOn: false,
    toggleDrone: () => set((state) => ({ droneOn: !state.droneOn })),
    scale: bluesScale,
    setScale: (nextScale: Scale) => set({ scale: nextScale }),
}));
