import { useRef, useState, MouseEvent, TouchEvent, forwardRef } from 'react';
import styled from '@emotion/styled';

import {
    BLUES_SCALE,
    getFrequencyFromNote,
    pluckSynthNoteOff,
    pluckSynthNoteOn,
} from 'sound';
import layer1 from 'assets/images/sot0.svg';
import layer2 from 'assets/images/sot1.svg';
import layer3 from 'assets/images/sot2.svg';
import { PageContent } from 'components/PageContent';
import { PianoButton } from './components/PianoButton';
import { ResumeButton } from './components/ResumeButton';
import { ParallaxLayer } from './components/ParallaxLayer';

const PageContentRelative = styled(PageContent)({
    position: 'relative',
});

const ContentContainer = styled('div')({
    flex: 1,
    padding: '120px 0',
});

const Frame = styled('div')(({ theme }) => ({
    height: '100%',
    width: '100%',
    borderRadius: 8,
    border: '1px solid #d4d4d4',
    backgroundColor: theme.colors.background.darker,
}));

const ParallaxBackground = styled('div')({
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    perspective: 1500,
    transformStyle: 'preserve-3d',
});

const layers = [layer1, layer2, layer3];

function normalizeToRange(value: number, min: number, max: number) {
    return value * (max - min) + min;
}

export const SectionTwo = forwardRef<HTMLDivElement>((_props, ref) => {
    const timer = useRef<number>();
    const parallaxRef = useRef<HTMLDivElement>(null);
    const [parallaxCoords, setParallaxCoords] = useState({ x: 0, y: 0 });

    const handleReset = () => {
        setParallaxCoords({ x: 0, y: 0 });
        pluckSynthNoteOff();
    };

    const handleMouseMove = (
        event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
    ) => {
        clearTimeout(timer.current);

        let x,
            y = 0;

        if (!parallaxRef.current) {
            return;
        }

        const { top, left, width, height } =
            parallaxRef.current.getBoundingClientRect();

        if ((event as TouchEvent).touches) {
            const touch = (event as TouchEvent).touches[0];
            [x, y] = [touch.clientX, touch.clientY];
        } else {
            [x, y] = [
                (event as MouseEvent).clientX,
                (event as MouseEvent).clientY,
            ];
        }

        const normalizedMousePosition = {
            x: (x - left) / width,
            y: (y - top) / height,
        };

        if (
            normalizedMousePosition.x > 1 ||
            normalizedMousePosition.x < 0 ||
            normalizedMousePosition.y > 1 ||
            normalizedMousePosition.y < 0
        ) {
            // out of bounds
            setParallaxCoords({ x: 0, y: 0 });
        } else {
            setParallaxCoords({
                x: 100 * (normalizedMousePosition.y - 0.5),
                y: -100 * (normalizedMousePosition.x - 0.5),
            });
            playSound(normalizedMousePosition.y);
        }
    };

    const playSound = (percent: number, step?: number) => {
        if (!step) {
            step = 0;
        }

        if (step >= BLUES_SCALE.length) {
            return;
        }

        clearTimeout(timer.current);

        const noteToPlay = BLUES_SCALE[step];
        const noteInHz = normalizeToRange(
            percent,
            getFrequencyFromNote(noteToPlay, 3),
            getFrequencyFromNote(noteToPlay, 1),
        );
        pluckSynthNoteOn({ noteInHz });
        timer.current = setTimeout(() => {
            pluckSynthNoteOff();
            setTimeout(() => {
                setParallaxCoords({ x: 0, y: 0 });
            }, 50);
        }, 100);
    };

    return (
        <PageContentRelative ref={ref}>
            <PianoButton />
            <ResumeButton />
            <ContentContainer>
                <Frame>
                    <ParallaxBackground
                        ref={parallaxRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleReset}
                        onTouchMove={handleMouseMove}
                        onTouchCancel={handleReset}
                        onTouchEnd={handleReset}
                    >
                        {layers.map((layer, idx) => {
                            const { x, y } = parallaxCoords;
                            const z = Math.abs(
                                Math.max(Math.abs(x), Math.abs(y)) * idx * 2,
                            );
                            return (
                                <ParallaxLayer
                                    key={`parallax-layer-${idx}`}
                                    src={layer}
                                    x={x}
                                    y={y}
                                    z={z}
                                />
                            );
                        })}
                    </ParallaxBackground>
                </Frame>
            </ContentContainer>
        </PageContentRelative>
    );
});
