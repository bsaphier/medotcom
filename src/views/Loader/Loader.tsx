import styled from '@emotion/styled';
import { Spinner } from 'components/Spinner';
import { PageContent } from 'components/PageContent';

const ViewContainer = styled('section')({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export function Loader() {
    return (
        <PageContent>
            <ViewContainer>
                <Spinner size={240} speed={3000} />
            </ViewContainer>
        </PageContent>
    );
}
