import styled from '@emotion/styled';
import { CSSProperties, ReactNode } from 'react';
import { animated, config, useSpring } from '@react-spring/web';
import { bluesScale, playPluckSynth } from 'sound';

export interface PhraseData {
    text: ReactNode;
    note: number;
    spacingNatural: string | number;
    spacingHover: string | number;
    fontStyle: CSSProperties;
}

interface PhraseProps {
    fontStyle: CSSProperties;
}

interface GreetingPhraseProps {
    phrase: PhraseData;
}

const PhraseWrapper = styled('div')(() => ({
    display: 'flex',
    textAlign: 'justify',
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
    userSelect: 'none',
}));

const Phrase = styled(animated.span, {
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

export function GreetingPhrase(props: GreetingPhraseProps) {
    const { phrase } = props;

    const [spacingSpring, spacingSpringApi] = useSpring(() => ({
        letterSpacing: phrase.spacingNatural,
        config: config.gentle,
    }));

    const handleActivate = () => {
        playPluckSynth(bluesScale[phrase.note]);
        spacingSpringApi.start({
            letterSpacing: phrase.spacingHover,
            config: config.gentle,
        });
    };

    const handleDeactivate = () => {
        spacingSpringApi.start({
            letterSpacing: phrase.spacingNatural,
            config: config.wobbly,
        });
    };

    return (
        <PhraseWrapper
            onPointerEnter={handleActivate}
            onPointerLeave={handleDeactivate}
        >
            <Phrase fontStyle={phrase.fontStyle} style={spacingSpring}>
                {phrase.text}
            </Phrase>
        </PhraseWrapper>
    );
}
