type Frequency = number;
type ScaleSteps = Frequency[];

export type Scale = {
    step: number;
    noteInHz: number;
}[];

const A_IN_HZ: Frequency = 220;
const BLUES_STEPS: ScaleSteps = [1, 6 / 5, 4 / 3, 45 / 32, 3 / 2, 9 / 5, 2];

/////////////////////////////////////////
// [220, 264, 293.3333333333333, 309.375, 330, 396, 440]
// ['A', 'C', 'D', 'D#', 'E', 'G', 'A']
const KEY_DICT = {
    A: 1,
    Bb: 16 / 15,
    B: 9 / 8,
    C: 6 / 5,
    Db: 5 / 4,
    D: 4 / 3,
    Eb: 64 / 45,
    E: 3 / 2,
    F: 8 / 5,
    Gb: 5 / 3,
    G: 16 / 9,
    Ab: 15 / 8,
};

const TWELVE_TET: ScaleSteps = [
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

const ALT_STEPS: ScaleSteps = [
    KEY_DICT.A,
    KEY_DICT.C,
    KEY_DICT.D,
    KEY_DICT.Eb,
    KEY_DICT.E,
    KEY_DICT.G,
    KEY_DICT.A * 2,
];

const KEY_STEPS: ScaleSteps = [
    6 / 5,
    5 / 4,
    4 / 3,
    64 / 45,
    3 / 2,
    8 / 5,
    5 / 3,
    16 / 9,
    15 / 8,
    2,
    32 / 15,
    9 / 4,
    12 / 5,
];

/////////////////////////////////////////

function scaleFactory(scaleSteps: ScaleSteps, tonic: Frequency): Scale {
    return scaleSteps.map((step, idx) => ({
        step: idx + 1,
        noteInHz: tonic * step,
    }));
}

export const bluesScale = scaleFactory(ALT_STEPS, A_IN_HZ);
export const keyboardScale = scaleFactory(KEY_STEPS, A_IN_HZ);
