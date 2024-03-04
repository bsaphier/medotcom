import styled from '@emotion/styled';

import { keyframes } from '@emotion/react';
import { Spinner } from 'components/Spinner';
import { useGlobalStore } from 'store/global';
import { PageContent } from 'components/PageContent';

const ViewContainer = styled('div')({
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const EnterButton = styled('button')(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: theme.colors.primary.main,
    fontFamily: theme.typography.fontFamily,
    background: 'none',
    border: 'none',
    padding: 72,
    fontWeight: 800,
    cursor: 'pointer',
    animationDuration: '3000ms',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    animationName: keyframes({
        '0%': {
            transform: 'translate(-50%, -50%)  scale(1)',
        },
        '50%': {
            transform: 'translate(-50%, -50%) scale(0.8)',
        },
        '100%': {
            transform: 'translate(-50%, -50%) scale(1)',
        },
    }),
}));

export function Loader() {
    const setLoading = useGlobalStore((state) => state.setLoading);

    const handleClick = () => {
        setLoading(false);
    };

    return (
        <PageContent>
            <ViewContainer>
                <Spinner size={240} speed={3000} />
            </ViewContainer>
            <EnterButton onClick={handleClick}>CLICK</EnterButton>
        </PageContent>
    );
}
