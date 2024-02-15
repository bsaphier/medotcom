import { create } from "zustand";

interface SoundState {
    droneOn: boolean;
    toggleDrone: () => void;
}

export const useSoundStore = create<SoundState>((set) => ({
    droneOn: false,
    toggleDrone: () => set((state) => ({ droneOn: !state.droneOn })),
}));
