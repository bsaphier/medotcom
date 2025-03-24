export type NoteOn = {
    note: number;
    attack: { value: number; time: number };
    decay: { time: number };
    sustain: { value: number };
};

export type NoteOff = {
    release: { time: number };
};

export class Synth {
    #timer?: ReturnType<typeof setTimeout>;
    #initialized: boolean;
    context: AudioContext;
    gainNode: GainNode;
    levelNode: GainNode;
    masterGain: GainNode;
    oscillator1: OscillatorNode;
    oscillator2: OscillatorNode;
    filter: BiquadFilterNode;

    constructor(context: AudioContext) {
        this.#timer;
        this.#initialized = false;

        this.context = context;
        this.gainNode = this.context.createGain();
        this.levelNode = this.context.createGain();
        this.masterGain = this.context.createGain();

        this.oscillator1 = this.context.createOscillator();
        this.oscillator2 = this.context.createOscillator();

        this.filter = this.context.createBiquadFilter();
    }

    initialize() {
        this.masterGain.gain.value = 0.62;
        this.masterGain.connect(this.context.destination);
        this.gainNode.connect(this.masterGain);

        this.oscillator1.type = 'triangle';
        this.oscillator2.type = 'sawtooth';

        this.filter.frequency.value = 1760;
        this.filter.type = 'bandpass';
        this.filter.Q.value = 0.382;

        this.oscillator1.connect(this.filter);
        this.oscillator2.connect(this.levelNode);
        this.levelNode.connect(this.filter);
        this.filter.connect(this.gainNode);

        this.gainNode.gain.value = 0.62;
        this.levelNode.gain.value = 0.025;

        this.oscillator1.start();
        this.oscillator2.start();

        this.#initialized = true;
        return this;
    }

    noteOn(note: NoteOn) {
        clearTimeout(this.#timer);

        if (!this.#initialized) {
            this.initialize();
        }
        if (this.context.state === 'suspended') {
            this.context.resume();
        }

        const { note: noteInHz, attack, decay, sustain } = note;
        const currentTime = this.context.currentTime;
        const decayStartTime = currentTime + attack.time;
        const sustainStartTime = decayStartTime + decay.time;

        this.filter.frequency.setTargetAtTime(
            noteInHz * 4,
            currentTime,
            attack.time / 3,
        );
        this.filter.frequency.setTargetAtTime(
            1760,
            sustainStartTime,
            decay.time,
        );

        this.gainNode.gain.setTargetAtTime(0, currentTime, 0.01);
        this.oscillator1.frequency.setTargetAtTime(
            noteInHz,
            currentTime,
            attack.time / 4,
        );
        this.oscillator2.frequency.setTargetAtTime(
            noteInHz * 2.05,
            currentTime,
            attack.time / 4,
        );

        /** Attack */
        this.gainNode.gain.setTargetAtTime(
            attack.value,
            currentTime,
            attack.time,
        );
        /** Decay */
        this.gainNode.gain.setTargetAtTime(
            sustain.value,
            decayStartTime,
            decay.time,
        );
    }

    noteOff(note: NoteOff) {
        const { release } = note;
        const startTime = this.context.currentTime + 0.0125;

        // if notes are pressed to fast and a new note begins before
        // the start time, the new note turns off/
        this.gainNode.gain.setTargetAtTime(0, startTime, release.time);

        this.#timer = setTimeout(
            () => {
                this.context.suspend();
            },
            (startTime + release.time) * 10000,
        );
    }

    kill() {
        this.oscillator1.stop();
        this.oscillator2.stop();
        this.context.close();

        this.filter.disconnect();
        this.oscillator1.disconnect();
        this.oscillator2.disconnect();
        this.gainNode.disconnect();
        this.levelNode.disconnect();
        this.masterGain.disconnect();
    }
}
