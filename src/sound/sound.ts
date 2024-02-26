import { Synth } from './synth';

const synth1 = new Synth();

export const playPluckSynth = (note: { noteInHz: number }) => {
    synth1.play({
        note: note.noteInHz,
        attack: { value: 0.8, time: 0.02 },
        decay: { value: 0.2, time: 0.05 },
        sustain: { time: 0 },
        release: { time: 0.162 },
    });
};
