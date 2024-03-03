import { useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { animated, config, useSpring } from '@react-spring/web';
import { useGlobalStore } from 'store/global';
import { PageContent } from 'components/PageContent';
import { GreetingPhrase, PhraseData } from './components/GreetingPhrase';
import { GreetingFooterButton } from './components/GreetingFooterButton';

interface GreetingProps {
    showButtonOne: boolean;
    showButtonTwo: boolean;
    onToggleSections: () => void;
}

const greetingMessage: PhraseData[] = [
    {
        text: 'Hello',
        note: 0,
        spacingNatural: '0.65rem',
        spacingHover: '3rem',
        fontStyle: {
            fontWeight: 100,
            fontSize: '8rem',
            lineHeight: '6rem',
            paddingLeft: '0.33rem',
        },
    },
    {
        text: 'My name is',
        note: 5,
        spacingNatural: '0.92rem',
        spacingHover: '2rem',
        fontStyle: {
            fontWeight: 400,
            fontSize: '3rem',
            lineHeight: '4rem',
            paddingLeft: '0.7rem',
        },
    },
    {
        text: 'Ben',
        note: 1,
        spacingNatural: '1.45rem',
        spacingHover: '8rem',
        fontStyle: {
            fontWeight: 100,
            fontSize: '13rem',
            lineHeight: '10rem',
            paddingLeft: '1.4rem',
        },
    },
    {
        text: 'Saphier',
        note: 2,
        spacingNatural: '-0.83rem',
        spacingHover: '2rem',
        fontStyle: {
            fontWeight: 100,
            fontSize: '8rem',
            fontStyle: 'italic',
            lineHeight: '7rem',
            paddingRight: '1rem',
        },
    },
    {
        text: "I'm a software engineer",
        note: 3,
        spacingNatural: '-0.02rem',
        spacingHover: '1rem',
        fontStyle: {
            fontWeight: 900,
            fontSize: '2rem',
            lineHeight: '2rem',
            paddingRight: '0.05rem',
        },
    },
    {
        text: 'Exploring',
        note: 4,
        spacingNatural: '-0.05rem',
        spacingHover: '2rem',
        fontStyle: {
            fontWeight: 100,
            fontSize: '5rem',
            lineHeight: '4rem',
            paddingRight: '0.15rem',
        },
    },
    {
        text: 'the crossover between',
        note: 5,
        spacingNatural: '-0.015rem',
        spacingHover: '1rem',
        fontStyle: {
            fontWeight: 600,
            fontSize: '2rem',
            lineHeight: '2rem',
        },
    },
    {
        text: 'Sound & Code',
        note: 6,
        spacingNatural: '0.4rem',
        spacingHover: '2rem',
        fontStyle: {
            fontWeight: 100,
            fontSize: '3rem',
            lineHeight: '3rem',
            paddingLeft: '0.3rem',
        },
    },
];

const hueShiftAnimation = keyframes({
    '0%': {
        filter: 'hue-rotate(0deg)',
    },
    '50%': {
        filter: 'hue-rotate(-45deg)',
    },
    '100%': {
        filter: 'hue-rotate(0deg)',
    },
});

const GreetingTextWrapper = styled(animated.div, {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ active }) => ({
    position: 'fixed',
    left: '50%',
    transform: 'translate(-50%, -100%)',
    cursor: 'default',
    ...(active
        ? {
              animation: `${hueShiftAnimation} 13s infinite linear`,
          }
        : {}),
}));

const GreetingFooter = styled('div', {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ active }) => ({
    margin: 'auto auto -96px',
    ...(active
        ? {
              animation: `${hueShiftAnimation} 13s infinite linear`,
          }
        : {}),
    '& > :first-of-type': {
        marginBottom: 48,
    },
}));

export function Greeting(props: GreetingProps) {
    const { showButtonOne, showButtonTwo, onToggleSections } = props;
    const displayGreeting = useGlobalStore((state) => state.displayGreeting);

    const [greetingTopSpring, greetingTopSpringApi] = useSpring(() => ({
        top: '0%',
        config: config.gentle,
    }));

    useEffect(() => {
        greetingTopSpringApi.start({
            top: displayGreeting ? '80%' : '0%',
            config: config.gentle,
        });
    }, [displayGreeting, greetingTopSpringApi]);

    return (
        <PageContent>
            <GreetingTextWrapper
                active={displayGreeting}
                style={greetingTopSpring}
            >
                {greetingMessage.map((phrase, idx) => (
                    <GreetingPhrase
                        key={`greeting-phrase-${idx}`}
                        phrase={phrase}
                    />
                ))}
            </GreetingTextWrapper>
            <GreetingFooter active={displayGreeting}>
                <GreetingFooterButton
                    hide={!showButtonOne}
                    flip={!displayGreeting}
                    onClick={onToggleSections}
                />
                <GreetingFooterButton
                    hide={!showButtonTwo}
                    flip={!displayGreeting}
                    onClick={onToggleSections}
                />
            </GreetingFooter>
        </PageContent>
    );
}
