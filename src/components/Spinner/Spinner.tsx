import styled from '@emotion/styled';
import { Hexagon } from './Hexagon';

interface SpinnerProps {
    size?: number;
    speed?: number;
}

const Container = styled('div', {
    shouldForwardProp: (prop) => prop !== 'size',
})<SpinnerProps>(({ size }) => ({
    position: 'relative',
    width: '1em',
    minWidth: '1em',
    height: '1em',
    fontSize: size,
}));

export function Spinner(props: SpinnerProps) {
    const { size = 64, speed = 1000 } = props;
    return (
        <Container size={size}>
            <Hexagon speed={speed} reverse>
                <Hexagon speed={speed}>
                    <Hexagon speed={speed} reverse>
                        <Hexagon speed={speed}>
                            <Hexagon speed={speed} reverse />
                        </Hexagon>
                    </Hexagon>
                </Hexagon>
            </Hexagon>
        </Container>
    );
}
