import styled from '@emotion/styled';
import { MouseEvent } from 'react';
import { getFrequencyFromNote, playPluckSynth } from 'sound';

interface KeyProps {
    active?: boolean;
    sizeRatio: number;
}

interface PianoKeyProps extends KeyProps {
    note: string;
    octave: number;
    black?: boolean;
}

const Key = styled('button')(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-out, transform 0.1s ease',
    '&:focus-visible': {
        outline: `${theme.colors.primary.main} solid 2px`,
    },
}));

const WhiteKey = styled(Key, {
    shouldForwardProp: (prop) => prop !== 'active' && prop !== 'sizeRatio',
})<KeyProps>(({ theme, active, sizeRatio }) => ({
    width: 48 * sizeRatio,
    height: 140 * sizeRatio,
    backgroundColor: active ? theme.colors.primary.light : '#fff',
    border: `1px solid ${active ? theme.colors.primary.light : '#ddd'}`,
    borderRadius: 8 * sizeRatio,
    color: '#aaa',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.03)',
    '&:active:hover': {
        backgroundColor: theme.colors.primary.light,
        borderColor: theme.colors.primary.light,
    },
    '&:hover': active
        ? {}
        : {
              backgroundColor: '#f0f3f8',
          },
}));

const BlackKey = styled(Key, {
    shouldForwardProp: (prop) => prop !== 'active' && prop !== 'sizeRatio',
})<KeyProps>(({ theme, active, sizeRatio }) => ({
    width: 36 * sizeRatio,
    height: 90 * sizeRatio,
    backgroundColor: active ? theme.colors.primary.main : '#333',
    border: `1px solid ${active ? theme.colors.primary.main : '#222'}`,
    borderRadius: 8 * sizeRatio,
    color: '#eee',
    marginLeft: -20 * sizeRatio,
    marginRight: -20 * sizeRatio,
    zIndex: 1,
    '&:active:hover': {
        backgroundColor: theme.colors.primary.main,
        borderColor: theme.colors.primary.main,
    },
    '&:hover': active
        ? {}
        : {
              backgroundColor: '#222',
          },
}));

export function PianoKey(props: PianoKeyProps) {
    const { note, black, octave, active, sizeRatio } = props;

    const handleClick = (event: MouseEvent) => {
        event.preventDefault();
        playPluckSynth({
            noteInHz: getFrequencyFromNote(note, octave),
        });
    };

    let Component = WhiteKey;
    if (black) {
        Component = BlackKey;
    }
    return (
        <Component
            active={active}
            onMouseDown={handleClick}
            sizeRatio={sizeRatio}
        />
    );
}
