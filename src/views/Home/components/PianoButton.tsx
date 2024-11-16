import styled from '@emotion/styled';
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
    border: 'none',
    borderRadius: 8,
    backgroundColor: theme.colors.background.darker,
    width: 32,
    height: 32,
    boxShadow: active
        ? 'inset 3px 3px 5px #b8b8b8, inset -3px -3px 5px #ffffff'
        : '3px 3px 5px #b8b8b8, -3px -3px 5px #ffffff',
    fontSize: 16,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    '&:before': {
        color: theme.colors.primary.main,
        content: '"♪"',
    },
}));

export function PianoButton() {
    const [showPiano, togglePiano] = useGlobalStore(
        useShallow((state) => [state.showPiano, state.togglePiano]),
    );

    return (
        <Container>
            <Button active={showPiano} onClick={togglePiano} />
        </Container>
    );
}
