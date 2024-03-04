type Frequency = number;
type ScaleSteps = Frequency[];

export type Scale = {
    step: number;
    noteInHz: number;
}[];

const ROOT_IN_HZ: Frequency = 220;
const BLUES_STEPS: ScaleSteps = [1, 6 / 5, 4 / 3, 45 / 32, 3 / 2, 9 / 5, 2];

function scaleFactory(scaleSteps: ScaleSteps, tonic: Frequency): Scale {
    return scaleSteps.map((step, idx) => ({
        step: idx + 1,
        noteInHz: tonic * step,
    }));
}

export const bluesScale = scaleFactory(BLUES_STEPS, ROOT_IN_HZ);
