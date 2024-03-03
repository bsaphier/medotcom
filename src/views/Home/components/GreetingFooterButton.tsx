import styled from '@emotion/styled';
import { animated, config, useSpring } from '@react-spring/web';

interface GreetingFooterButtonProps {
    flip?: boolean;
    hide?: boolean;
    onClick?: () => void;
}

interface ButtonProps {
    hide?: boolean;
}

const Button = styled(animated.div, {
    shouldForwardProp: (prop) => prop !== 'hide',
})<ButtonProps>(({ hide }) => ({
    opacity: hide ? 0 : 0.618,
    transition: 'opacity .618s ease-in-out',
    userSelect: 'none',
}));

const InnerContainer = styled('div')(() => ({
    margin: 'auto',
    width: '88px',
    height: '88px',
    transformOrigin: '45% 25%',
    transform: 'rotate(45deg)  translateY(-24px)',
}));

const PointDown = styled('div')(({ theme }) => ({
    boxSizing: 'border-box',
    padding: 12,
    width: '100%',
    height: '100%',
    borderRight: `${theme.colors.primary.main} solid 3px`,
    borderBottom: `${theme.colors.primary.main} solid 3px`,
    '*': {
        margin: '2px 0 0 2px',
    },
}));

function getSpringConfig(isIn: boolean, key: string) {
    if (key === 'rotate') {
        return config.wobbly;
    } else if (key === 'scale') {
        return isIn ? config.wobbly : config.stiff;
    } else if (key === 'translateY') {
        return isIn ? config.stiff : config.gentle;
    }
    return {};
}

export function GreetingFooterButton(props: GreetingFooterButtonProps) {
    const { flip, hide, onClick } = props;

    const [transformSpring, transformSpringApi] = useSpring(
        () => ({
            scale: 1,
            rotate: flip ? 180 : 0,
            translateY: 0,
            config: (key) => getSpringConfig(false, key),
        }),
        [flip],
    );

    const handleClick = () => {
        if (typeof onClick === 'function') {
            onClick();
        }
    };

    const handleMouseEnter = () => {
        transformSpringApi.start({
            scale: 1.3,
            translateY: -13,
            config: (key) => getSpringConfig(true, key),
        });
    };

    const handleMouseLeave = () => {
        transformSpringApi.start({
            scale: 1,
            translateY: 0,
            config: (key) => getSpringConfig(false, key),
        });
    };

    return (
        <Button
            role="button"
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={transformSpring}
            hide={hide}
        >
            <InnerContainer>
                <PointDown>
                    <PointDown>
                        <PointDown />
                    </PointDown>
                </PointDown>
            </InnerContainer>
        </Button>
    );
}
