import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { getFrequencyFromNote, playPluckSynth } from 'sound';

interface PianoKeyMap {
    [key: string]: string;
}

const MIN_OCTAVE = 2;
const MAX_OCTAVE = 7;

const Keyboard = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: 4,
    backgroundColor: theme.colors.background.darker,
    padding: 12,
    borderRadius: 16,
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
    flexDirection: 'row',
}));

const Key = styled('div')({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 500,
    cursor: 'pointer',
    borderRadius: 8,
    transition: 'background-color 0.2s ease, transform 0.1s ease',
});

const WhiteKey = styled(Key)({
    width: 48,
    height: 140,
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    color: '#aaa',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.03)',
    '&:hover': {
        backgroundColor: '#f0f3f8',
    },
});

const BlackKey = styled(Key)({
    width: 36,
    height: 90,
    backgroundColor: '#333',
    border: '1px solid #222',
    color: '#eee',
    marginLeft: -20,
    marginRight: -20,
    zIndex: 1,
    '&:hover': {
        backgroundColor: '#222',
    },
});

const pianoKeys: PianoKeyMap = {
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

export function Piano() {
    const [octave, setOctave] = useState(0);

    const handlePianoKeyDown = useCallback(
        (key: string) => {
            if (pianoKeys[key]) {
                playPluckSynth({
                    noteInHz: getFrequencyFromNote(pianoKeys[key], octave),
                });
            }
        },
        [octave],
    );

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            event.preventDefault();
            handlePianoKeyDown(event.key);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handlePianoKeyDown]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            event.preventDefault();
            if (event.key === 'x') {
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

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    return (
        <Keyboard>
            <WhiteKey /> {/* C4 */}
            <BlackKey /> {/* C#4 */}
            <WhiteKey /> {/* D4 */}
            <BlackKey /> {/* D#4 */}
            <WhiteKey /> {/* E4 */}
            <WhiteKey /> {/* F4 */}
            <BlackKey /> {/* F#4 */}
            <WhiteKey /> {/* G4 */}
            <BlackKey /> {/* G#4 */}
            <WhiteKey /> {/* A4 */}
            <BlackKey /> {/* A#4 */}
            <WhiteKey /> {/* B4 */}
            <WhiteKey /> {/* C5 */}
            <BlackKey /> {/* C#5 */}
            <WhiteKey /> {/* D5 */}
            <BlackKey /> {/* D#5 */}
            <WhiteKey /> {/* E5 */}
            <WhiteKey /> {/* F5 */}
            <BlackKey /> {/* F#5 */}
            <WhiteKey /> {/* G5 */}
            <BlackKey /> {/* G#5 */}
            <WhiteKey /> {/* A5 */}
            <BlackKey /> {/* A#5 */}
            <WhiteKey /> {/* B5 */}
        </Keyboard>
    );
}
