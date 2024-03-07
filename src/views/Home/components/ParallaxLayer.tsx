import styled from '@emotion/styled';
import { animated, config, useSpring } from '@react-spring/web';

interface ParallaxLayerProps {
    src: string;
    x: number;
    y: number;
    z: number;
}

const Img = styled(animated.img)({
    position: 'absolute',
    height: '100%',
    width: '100%',
    userSelect: 'none',
    touchAction: 'none',
});

export function ParallaxLayer(props: ParallaxLayerProps) {
    const { src, x, y, z } = props;

    const springStyle = useSpring({
        rotateX: x,
        rotateY: y,
        transform: `translate3d(${x / 4}px, ${y / 4}px, ${z}px)`,
        config: config.wobbly,
    });

    return <Img src={src} style={springStyle} />;
}
