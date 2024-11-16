export type Scale = {
    step: number;
    noteInHz: number;
}[];

const A_IN_HZ = 220;

const TWELVE_TET = [
    1,
    16 / 15,
    9 / 8,
    6 / 5,
    5 / 4,
    4 / 3,
    64 / 45,
    3 / 2,
    8 / 5,
    5 / 3,
    16 / 9,
    15 / 8,
];

export const KEY_DICT = {
    A: TWELVE_TET[0],
    Bb: TWELVE_TET[1],
    B: TWELVE_TET[2],
    C: TWELVE_TET[3],
    Db: TWELVE_TET[4],
    D: TWELVE_TET[5],
    Eb: TWELVE_TET[6],
    E: TWELVE_TET[7],
    F: TWELVE_TET[8],
    Gb: TWELVE_TET[9],
    G: TWELVE_TET[10],
    Ab: TWELVE_TET[11],
};

const BLUES_STEPS = [
    KEY_DICT.A,
    KEY_DICT.C,
    KEY_DICT.D,
    KEY_DICT.Eb,
    KEY_DICT.E,
    KEY_DICT.G,
    KEY_DICT.A * 2,
];

export function scaleFactory(
    scale: number[],
    tonic: number,
    octave: number,
): Scale {
    return scale.map((step, idx) => ({
        step: idx + 1,
        noteInHz: tonic * 2 ** octave * step,
    }));
}

export const bluesScale = scaleFactory(BLUES_STEPS, A_IN_HZ, 1);

////////////////////////

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
};

export function getFrequencyFromNote(key: string, octave: number) {
    const semitoneFromA4 = SEMITONE_STEPS[key] + (octave - A4_OCTAVE) * 12;
    const frequency = 2 ** (semitoneFromA4 / 12) * 440;
    return frequency;
}
