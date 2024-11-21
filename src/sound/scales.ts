export type Scale = {
    step: number;
    noteInHz: number;
}[];

interface SemiToneMap {
    [key: string]: number;
}

const A4_OCTAVE = 4;

const SEMITONE_STEPS: SemiToneMap = {
    C: -9,
    'C#': -8,
    Db: -8,
    D: -7,
    'D#': -6,
    Eb: -6,
    E: -5,
    F: -4,
    'F#': -3,
    Gb: -3,
    G: -2,
    'G#': -1,
    Ab: -1,
    A: 0,
    'A#': 1,
    Bb: 1,
    B: 2,
    C2: 3,
    'C#2': 4,
    Db2: 4,
    D2: 5,
    'D#2': 6,
    Eb2: 6,
    E2: 7,
    F2: 8,
    'F#2': 9,
    Gb2: 9,
    G2: 10,
    'G#2': 11,
    Ab2: 11,
    A2: 12,
    'A#2': 13,
    Bb2: 13,
    B2: 14,
};

const BLUES_SCALE = ['A', 'C2', 'D2', 'Eb2', 'E2', 'G2', 'A2'];

export function getFrequencyFromNote(key: string, octave: number) {
    const semitoneFromA4 = SEMITONE_STEPS[key] + (octave - A4_OCTAVE) * 12;
    const frequency = 2 ** (semitoneFromA4 / 12) * 440;
    return frequency;
}

export function scaleFactory(notes: string[]): Scale {
    return notes.map((note, idx) => ({
        step: idx + 1,
        noteInHz: getFrequencyFromNote(note, 4),
    }));
}

export const bluesScale = scaleFactory(BLUES_SCALE);
