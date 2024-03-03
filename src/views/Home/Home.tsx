import styled from '@emotion/styled';
import { UIEvent, useEffect, useRef, useState } from 'react';
import { useGlobalStore } from 'store/global';
import { Greeting } from 'views/Home/Greeting';
import { SectionTwo } from 'views/Home/SectionTwo';
import { PageContent } from 'components/PageContent';

const ViewContainer = styled('div')({
    height: '100dvh',
    overflow: 'auto',
});

const Page = styled('section')({
    position: 'relative',
    padding: '120px 0',
    width: '100%',
});

export function Home() {
    const displayGreeting = useGlobalStore((state) => state.displayGreeting);
    const setDisplayGreeting = useGlobalStore(
        (state) => state.setDisplayGreeting,
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
            <PageContent>
                <Page>Hi</Page>
            </PageContent>
        </ViewContainer>
    );
}
