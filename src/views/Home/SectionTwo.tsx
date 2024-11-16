import {
    useRef,
    useState,
    useEffect,
    MouseEvent,
    TouchEvent,
    forwardRef,
} from 'react';
import styled from '@emotion/styled';

import { playPluckSynth } from 'sound';
import layer1 from 'assets/images/sot0.svg';
import layer2 from 'assets/images/sot1.svg';
import layer3 from 'assets/images/sot2.svg';
import { useSoundStore } from 'store/sound';
import { PageContent } from 'components/PageContent';
import { ParallaxLayer } from './components/ParallaxLayer';
import { PianoButton } from './components/PianoButton';

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
    backgroundColor: theme.colors.background.darker,
    boxShadow: '#222 0px 1px 8px -3px inset',
}));

const ParallaxBackground = styled('div')({
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    perspective: 1500,
    transformStyle: 'preserve-3d',
});

const layers = [layer1, layer2, layer3];

function normalizeToIntRange(value: number, min: number, max: number) {
    return Math.round(value * (max - min) + min);
}

export const SectionTwo = forwardRef<HTMLDivElement>((_props, ref) => {
    const scale = useSoundStore((state) => state.scale);

    const parallaxRef = useRef<HTMLDivElement>(null);
    const [parallaxCoords, setParallaxCoords] = useState({ x: 0, y: 0 });
    const [noteToPlay, setNoteToPlay] = useState<number | null>(null);

    const handleReset = () => {
        setParallaxCoords({ x: 0, y: 0 });
        setNoteToPlay(null);
    };

    const handleMouseMove = (
        event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
    ) => {
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
            setNoteToPlay(null);
        } else {
            const octave = normalizeToIntRange(normalizedMousePosition.y, 1, 3);
            const scaleStep = normalizeToIntRange(
                normalizedMousePosition.x,
                0,
                scale.length - 1,
            );
            setNoteToPlay(scale[scaleStep].noteInHz * octave);
            setParallaxCoords({
                x: 100 * (normalizedMousePosition.y - 0.5),
                y: -100 * (normalizedMousePosition.x - 0.5),
            });
        }
    };

    useEffect(() => {
        if (noteToPlay) {
            playPluckSynth({ noteInHz: noteToPlay });
        }
    }, [noteToPlay]);

    return (
        <PageContentRelative ref={ref}>
            <PianoButton />
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
