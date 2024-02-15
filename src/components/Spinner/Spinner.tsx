import styled from '@emotion/styled';
import { Hexagon } from './Hexagon';

const Container = styled('div')({
    position: 'relative',
    width: '1em',
    height: '1em',

    backgroundColor: '#DDD',
});

export function Spinner() {
    return (
        <Container>
            <Hexagon reverse>
                <Hexagon>
                    <Hexagon reverse>
                        <Hexagon>
                            <Hexagon />
                        </Hexagon>
                    </Hexagon>
                </Hexagon>
            </Hexagon>
        </Container>
    );
}
