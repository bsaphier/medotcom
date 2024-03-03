import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { PageContent } from 'components/PageContent';

const ContentContainer = styled('div')({
    padding: '120px 0',
});

export const SectionTwo = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <PageContent ref={ref}>
            <ContentContainer>Teo</ContentContainer>
        </PageContent>
    );
});
