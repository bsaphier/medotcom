import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

interface HexagonProps {
    speed?: number;
    reverse?: boolean;
    children?: ReactNode;
}

const HexagonContainer = styled('div')({
    position: 'absolute',
    width: '75%',
    height: '75%',
    top: '12.5%',
    left: '12.5%',
});

const HexagonSegment = styled('span', {
    shouldForwardProp: (prop) => prop !== 'reverse' && prop !== 'speed',
})<HexagonProps>(({ theme, reverse, speed }) => ({
    position: 'absolute',
    boxSizing: 'border-box',
    width: '100%',
    height: '57.735%',
    top: '21.1325%',
    left: 0,
    borderLeft: `4px solid ${theme.colors.primary.main}`,
    borderRight: `4px solid ${theme.colors.primary.main}`,
    animationDuration: `${speed}ms`,
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    animationDirection: reverse ? 'reverse' : '',
}));

const HexagonSegmentA = styled(HexagonSegment)({
    animationName: keyframes({
        '0%': {
            transform: 'rotate(0deg) scale(1)',
        },
        '50%': {
            transform: 'rotate(180deg) scale(0.62)',
        },
        '100%': {
            transform: 'rotate(360deg) scale(1)',
        },
    }),
});

const HexagonSegmentB = styled(HexagonSegment)({
    transform: 'rotate(120deg)',
    animationName: keyframes({
        '0%': {
            transform: 'rotate(120deg) scale(1)',
        },
        '50%': {
            transform: 'rotate(300deg) scale(0.62)',
        },
        '100%': {
            transform: 'rotate(480deg) scale(1)',
        },
    }),
});

const HexagonSegmentC = styled(HexagonSegment)({
    transform: 'rotate(240deg)',
    animationName: keyframes({
        '0%': {
            transform: 'rotate(240deg) scale(1)',
        },
        '50%': {
            transform: 'rotate(420deg) scale(0.62)',
        },
        '100%': {
            transform: 'rotate(600deg) scale(1)',
        },
    }),
});

export function Hexagon(props: HexagonProps) {
    const { reverse, speed, children } = props;
    return (
        <HexagonContainer>
            <HexagonSegmentA speed={speed} reverse={reverse} />
            <HexagonSegmentB speed={speed} reverse={reverse} />
            <HexagonSegmentC speed={speed} reverse={reverse} />
            {children}
        </HexagonContainer>
    );
}
