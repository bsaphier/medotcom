import styled from '@emotion/styled';

import { PageContent } from '../components/PageContent';
import { Spinner } from '../components/Spinner';

const ViewContainer = styled('section')({
    // position: 'relative',
    width: '100%',
    // padding: '120px 0',
    // overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '192px',

    backgroundColor: '#CCC',
});

export function Loader() {
    return (
        <PageContent>
            <ViewContainer>
                <Spinner />
            </ViewContainer>
        </PageContent>
    );
}
