import styled from '@emotion/styled';
import { MouseEvent, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useGlobalStore } from 'store/global';

interface ButtonProps {
    active?: boolean;
}

const Container = styled('div')(() => ({
    position: 'absolute',
    top: 48,
    right: 48,
}));

const Button = styled('button', {
    shouldForwardProp: (prop) => prop !== 'active',
})<ButtonProps>(({ theme, active }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    border: '1px solid #d4d4d4',
    backgroundColor: active ? '#f0f0f0' : theme.colors.background.darker,
    width: 32,
    height: 32,
    boxShadow: active ? '0px 0px 8px #efefef' : 'none',
    fontSize: 16,
    cursor: 'pointer',
    transition: 'all 50ms ease-in-out',
    '&:before': {
        color: theme.colors.primary.main,
        content: '"♪"',
    },
    '&:focus-visible': {
        outline: `${theme.colors.primary.main} solid 2px`,
    },
}));

export function PianoButton() {
    const [showPiano, togglePiano] = useGlobalStore(
        useShallow((state) => [state.showPiano, state.togglePiano]),
    );

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.currentTarget.blur();
        togglePiano();
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'q') {
                togglePiano();
            }
        };

        if (showPiano) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [showPiano, togglePiano]);

    return (
        <Container>
            <Button
                active={showPiano}
                onClick={handleClick}
                aria-haspopup="true"
            />
        </Container>
    );
}
