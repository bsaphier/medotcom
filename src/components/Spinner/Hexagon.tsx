import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import { HexagonProps } from './Hexagon.types';

const HexagonContainer = styled('div')({
    position: 'absolute',
    width: '75%',
    height: '75%',
    top: '12.5%',
    left: '12.5%',
});

const HexagonSegment = styled('span', {
    shouldForwardProp: (prop) => prop !== 'reverse',
})<HexagonProps>(({ theme, reverse }) => ({
    position: 'absolute',
    boxSizing: 'border-box',
    width: '100%',
    height: '57.735%',
    top: '21.1325%',
    left: 0,
    borderLeft: `2px solid ${theme.colors.primary.main}`,
    borderRight: `2px solid ${theme.colors.primary.main}`,
    animationDuration: '3s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    animationDirection: reverse ? 'reverse' : '',
}));

const HexagonSegmentA = styled(HexagonSegment)({
    // animationName: keyframes({
    //     '0%, 1%': {
    //         transform: 'rotate(0deg) scale(1)',
    //         opacity: 1,
    //     },
    //     '48%, 52%': {
    //         transform: 'rotate(180deg) scale(0.62)',
    //         opacity: 0.62,
    //     },
    //     '99%, 100%': {
    //         transform: 'rotate(360deg) scale(1)',
    //         opacity: 1,
    //     },
    // }),
});

const HexagonSegmentB = styled(HexagonSegment)({
    transform: 'rotate(120deg)',
    // animationName: keyframes({
    //     '0%, 1%': {
    //         transform: 'rotate(120deg) scale(1)',
    //         opacity: 1,
    //     },
    //     '48%, 52%': {
    //         transform: 'rotate(300deg) scale(0.62)',
    //         opacity: 0.62,
    //     },
    //     '99%, 100%': {
    //         transform: 'rotate(480deg) scale(1)',
    //         opacity: 1,
    //     },
    // }),
});

const HexagonSegmentC = styled(HexagonSegment)({
    transform: 'rotate(240deg)',
    // animationName: keyframes({
    //     '0%, 1%': {
    //         transform: 'rotate(240deg) scale(1)',
    //         opacity: 1,
    //     },
    //     '48%, 52%': {
    //         transform: 'rotate(420deg) scale(0.62)',
    //         opacity: 0.62,
    //     },
    //     '99%, 100%': {
    //         transform: 'rotate(600deg) scale(1)',
    //         opacity: 1,
    //     },
    // }),
});

export function Hexagon(props: HexagonProps) {
    const { reverse, children } = props;
    return (
        <HexagonContainer>
            <HexagonSegmentA reverse={reverse} />
            <HexagonSegmentB reverse={reverse} />
            <HexagonSegmentC reverse={reverse} />
            {children}
        </HexagonContainer>
    );
}
