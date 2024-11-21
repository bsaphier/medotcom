import styled from '@emotion/styled';
import { PianoKey } from './PianoKey';
import { useEffect, useState } from 'react';
import { getFrequencyFromNote, playPluckSynth } from 'sound';

interface PianoKeyMap {
    [key: string]: string;
}

interface KeyboardProps {
    sizeRatio: number;
}

const MIN_OCTAVE = 2;
const MAX_OCTAVE = 6;
const PIANO_WIDTH = 748;

const pianoKeys = [
    {
        note: 'C',
        pianoKey: 'C',
        black: false,
        octaveOffset: 0,
    },
    {
        note: 'C#',
        pianoKey: 'C#',
        black: true,
        octaveOffset: 0,
    },
    {
        note: 'D',
        pianoKey: 'D',
        black: false,
        octaveOffset: 0,
    },
    {
        note: 'D#',
        pianoKey: 'D#',
        black: true,
        octaveOffset: 0,
    },
    {
        note: 'E',
        pianoKey: 'E',
        black: false,
        octaveOffset: 0,
    },
    {
        note: 'F',
        pianoKey: 'F',
        black: false,
        octaveOffset: 0,
    },
    {
        note: 'F#',
        pianoKey: 'F#',
        black: true,
        octaveOffset: 0,
    },
    {
        note: 'G',
        pianoKey: 'G',
        black: false,
        octaveOffset: 0,
    },
    {
        note: 'G#',
        pianoKey: 'G#',
        black: true,
        octaveOffset: 0,
    },
    {
        note: 'A',
        pianoKey: 'A',
        black: false,
        octaveOffset: 0,
    },
    {
        note: 'A#',
        pianoKey: 'A#',
        black: true,
        octaveOffset: 0,
    },
    {
        note: 'B',
        pianoKey: 'B',
        black: false,
        octaveOffset: 0,
    },
    {
        note: 'C',
        pianoKey: 'C2',
        black: false,
        octaveOffset: 1,
    },
    {
        note: 'C#',
        pianoKey: 'C#2',
        black: true,
        octaveOffset: 1,
    },
    {
        note: 'D',
        pianoKey: 'D2',
        black: false,
        octaveOffset: 1,
    },
    {
        note: 'D#',
        pianoKey: 'D#2',
        black: true,
        octaveOffset: 1,
    },
    {
        note: 'E',
        pianoKey: 'E2',
        black: false,
        octaveOffset: 1,
    },
    {
        note: 'F',
        pianoKey: 'F2',
        black: false,
        octaveOffset: 1,
    },
    {
        note: 'F#',
        pianoKey: 'F#2',
        black: true,
        octaveOffset: 1,
    },
    {
        note: 'G',
        pianoKey: 'G2',
        black: false,
        octaveOffset: 1,
    },
    {
        note: 'G#',
        pianoKey: 'G#2',
        black: true,
        octaveOffset: 1,
    },
    {
        note: 'A',
        pianoKey: 'A2',
        black: false,
        octaveOffset: 1,
    },
    {
        note: 'A#',
        pianoKey: 'A#2',
        black: true,
        octaveOffset: 1,
    },
    {
        note: 'B',
        pianoKey: 'B2',
        black: false,
        octaveOffset: 1,
    },
];

const pianoKeyMap: PianoKeyMap = {
    a: 'C',
    w: 'C#',
    s: 'D',
    e: 'D#',
    d: 'E',
    f: 'F',
    t: 'F#',
    g: 'G',
    y: 'G#',
    h: 'A',
    u: 'A#',
    j: 'B',
    k: 'C2',
    o: 'C#2',
    l: 'D2',
};

const Keyboard = styled('div', {
    shouldForwardProp: (prop) => prop !== 'sizeRatio',
})<KeyboardProps>(({ theme, sizeRatio }) => ({
    display: 'flex',
    gap: 4 * sizeRatio,
    backgroundColor: theme.colors.background.darker,
    padding: 12 * sizeRatio,
    borderRadius: 16,
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
    flexDirection: 'row',
    transformOrigin: 'top left',
    transition: 'transform 0.2s ease', // Smooth scaling
}));

export function Piano() {
    const [activeNote, setActiveNote] = useState<string | null>(null);
    const [octave, setOctave] = useState(2);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < PIANO_WIDTH) {
                setScale(screenWidth / PIANO_WIDTH);
            } else {
                setScale(1);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (pianoKeyMap[event.key]) {
                setActiveNote(pianoKeyMap[event.key]);
                playPluckSynth({
                    noteInHz: getFrequencyFromNote(
                        pianoKeyMap[event.key],
                        octave,
                    ),
                });
            } else if (event.key === 'x') {
                setOctave((current) => {
                    if (current + 1 <= MAX_OCTAVE) {
                        return current + 1;
                    }
                    return current;
                });
            } else if (event.key === 'z') {
                setOctave((current) => {
                    if (current - 1 >= MIN_OCTAVE) {
                        return current - 1;
                    }
                    return current;
                });
            }
        };

        const handleKeyUp = () => {
            setActiveNote(null);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [octave]);

    return (
        <Keyboard sizeRatio={scale}>
            {pianoKeys.map((pianoKey) => (
                <PianoKey
                    key={pianoKey.pianoKey}
                    note={pianoKey.note}
                    black={pianoKey.black}
                    active={activeNote === pianoKey.pianoKey}
                    octave={octave + pianoKey.octaveOffset}
                    sizeRatio={scale}
                />
            ))}
        </Keyboard>
    );
}
