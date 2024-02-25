import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { animated, config, useSpring } from '@react-spring/web';
import { CSSProperties, ReactNode, useEffect } from 'react';
import { useGlobalStore } from 'store/global';
import { PageContent } from 'components/PageContent';

type GreetingData = {
    text: ReactNode;
    note: number;
    fontStyle: object;
}[];

const greetingMessage: GreetingData = [
    {
        text: 'Hello',
        note: 0,
        fontStyle: {
            fontWeight: 100,
            fontSize: '8rem',
            lineHeight: '6rem',
            paddingLeft: '0.33rem',
            letterSpacing: '0.65rem',
        },
    },
    {
        text: 'My name is',
        note: 5,
        fontStyle: {
            fontWeight: 400,
            fontSize: '3rem',
            lineHeight: '4rem',
            paddingLeft: '0.7rem',
            letterSpacing: '0.92rem',
        },
    },
    {
        text: 'Ben',
        note: 1,
        fontStyle: {
            fontWeight: 100,
            fontSize: '13rem',
            lineHeight: '10rem',
            paddingLeft: '1.4rem',
            letterSpacing: '1.45rem',
        },
    },
    {
        text: 'Saphier',
        note: 2,
        fontStyle: {
            fontWeight: 100,
            fontSize: '8rem',
            fontStyle: 'italic',
            lineHeight: '7rem',
            paddingRight: '1rem',
            letterSpacing: '-0.83rem',
        },
    },
    {
        text: "I'm a software engineer",
        note: 3,
        fontStyle: {
            fontWeight: 900,
            fontSize: '2rem',
            lineHeight: '2rem',
            paddingRight: '0.05rem',
            letterSpacing: '-0.02rem',
        },
    },
    {
        text: 'Exploring',
        note: 4,
        fontStyle: {
            fontWeight: 100,
            fontSize: '5rem',
            lineHeight: '4rem',
            paddingRight: '0.15rem',
            letterSpacing: '-0.05rem',
        },
    },
    {
        text: 'the crossover between',
        note: 5,
        fontStyle: {
            fontWeight: 600,
            fontSize: '2rem',
            lineHeight: '2rem',
            letterSpacing: '-0.015rem',
        },
    },
    {
        text: 'Sound & Code',
        note: 6,
        fontStyle: {
            fontWeight: 100,
            fontSize: '3rem',
            lineHeight: '3rem',
            paddingLeft: '0.3rem',
            letterSpacing: '0.4rem',
        },
    },
];

interface GreetingTextWrapperProps {
    active: boolean;
}

interface PhraseProps {
    fontStyle: CSSProperties;
    children: ReactNode;
}

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
})<GreetingTextWrapperProps>(({ active }) => ({
    position: 'fixed',
    left: '50%',
    willChange: 'transform, top, filter',
    transform: 'translate(-50%, -100%)',
    cursor: 'default',
    ...(active
        ? {
              animation: `${hueShiftAnimation} 13s infinite linear`,
          }
        : {}),
}));

const PhraseWrapper = styled('div')(() => ({
    display: 'flex',
    textAlign: 'justify',
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
}));

const Phrase = styled('span', {
    shouldForwardProp: (prop) => prop !== 'fontStyle',
})<PhraseProps>(({ theme, fontStyle }) => ({
    display: 'inline-block',
    margin: '0 auto',
    whiteSpace: 'pre',
    color: theme.colors.primary.main,
    overflow: 'visible',
    willChange: 'letter-spacing',
    WebkitFontSmoothing: 'antialiased',
    ...fontStyle,
}));

export function Greeting() {
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
            <GreetingTextWrapper active={displayGreeting} style={greetingTopSpring}>
                {greetingMessage.map((phrase, idx) => (
                    <PhraseWrapper key={`greeting-phrase-${idx}`}>
                        <Phrase fontStyle={phrase.fontStyle}>{phrase.text}</Phrase>
                    </PhraseWrapper>
                ))}
            </GreetingTextWrapper>
        </PageContent>
    );
}
