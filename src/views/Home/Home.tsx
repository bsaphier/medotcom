import styled from '@emotion/styled';
import { useShallow } from 'zustand/react/shallow';
import { UIEvent, useEffect, useRef, useState } from 'react';

import { Piano } from './components/Piano';
import { useGlobalStore } from 'store/global';
import { Greeting } from 'views/Home/Greeting';
import { Draggable } from 'components/Draggable';
import { SectionTwo } from 'views/Home/SectionTwo';

const ViewContainer = styled('div')({
    height: '100dvh',
    overflow: 'auto',
});

export function Home() {
    const showPiano = useGlobalStore((state) => state.showPiano);

    const [displayGreeting, setDisplayGreeting] = useGlobalStore(
        useShallow((state) => [
            state.displayGreeting,
            state.setDisplayGreeting,
        ]),
    );

    const [showButtonOne, setShowButtonOne] = useState(true);
    const [showButtonTwo, setShowButtonTwo] = useState(true);

    const hasEnteredRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionTwoRef = useRef<HTMLDivElement>(null);

    const handleScroll = (event: UIEvent) => {
        const { scrollTop, clientHeight } = event.target as HTMLDivElement;
        const greetingIn = scrollTop <= clientHeight / 4 - 24;
        setDisplayGreeting(greetingIn);
        setShowButtonOne(scrollTop < 24);
        setShowButtonTwo(scrollTop < clientHeight - 24);
    };

    const handleToggleSections = () => {
        if (displayGreeting) {
            sectionTwoRef.current?.scrollIntoView({
                behavior: 'smooth',
            });
        } else {
            (
                sectionTwoRef.current?.previousSibling as HTMLDivElement
            )?.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        if (!hasEnteredRef.current) {
            hasEnteredRef.current = true;
            setDisplayGreeting(true);
        }
    }, [setDisplayGreeting]);

    return (
        <ViewContainer ref={containerRef} onScroll={handleScroll}>
            <Greeting
                onToggleSections={handleToggleSections}
                showButtonOne={showButtonOne}
                showButtonTwo={showButtonTwo}
            />
            <SectionTwo ref={sectionTwoRef} />
            {showPiano && (
                <Draggable>
                    <Piano />
                </Draggable>
            )}
        </ViewContainer>
    );
}
