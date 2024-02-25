import { UIEvent, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useGlobalStore } from 'store/global';
import { PageContent } from 'components/PageContent';
import { Greeting } from './Greeting';

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
    const setDisplayGreeting = useGlobalStore((state) => state.setDisplayGreeting);
    const hasEnteredRef = useRef(false);

    const handleScroll = (event: UIEvent) => {
        const { scrollTop, clientHeight } = event.target as HTMLDivElement;
        const greetingIn = scrollTop <= clientHeight / 4;
        setDisplayGreeting(greetingIn);
    };

    useEffect(() => {
        if (!hasEnteredRef.current) {
            hasEnteredRef.current = true;
            setDisplayGreeting(true);
        }
    }, [setDisplayGreeting]);

    return (
        <ViewContainer onScroll={handleScroll}>
            <Greeting />
            <PageContent>
                <Page>Hi</Page>
            </PageContent>
            <PageContent>
                <Page>Hi</Page>
            </PageContent>
        </ViewContainer>
    );
}
