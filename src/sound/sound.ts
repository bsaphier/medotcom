import { Synth } from './synth';

const audioContext = new window.AudioContext();

const synth1 = new Synth(audioContext);

export const pluckSynthNoteOn = (note: { noteInHz: number }) => {
    synth1.noteOn({
        note: note.noteInHz,
        attack: { value: 0.8, time: 0.02 },
        decay: { time: 0.05 },
        sustain: { value: 0.2 },
    });
};

export const pluckSynthNoteOff = () => {
    synth1.noteOff({
        release: { time: 0.0162 },
    });
};

export const playPluckSynth = (note: { noteInHz: number }) => {
    pluckSynthNoteOn(note);
    const noteLength = 0.01 + 0 + 0.162; // attack + decay + sustain + release
    setTimeout(() => {
        synth1.noteOff({
            release: { time: 0.162 },
        });
    }, noteLength * 1000); // Convert to milliseconds
};
