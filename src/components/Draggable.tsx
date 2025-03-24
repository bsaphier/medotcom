import {
    MouseEvent as ReactMouseEvent,
    TouchEvent as ReactTouchEvent,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from 'react';
import styled from '@emotion/styled';

interface DraggableProps {
    children?: ReactNode;
}

interface Position {
    x: number;
    y: number;
}

const Container = styled('div')({
    position: 'absolute',
});

export function Draggable(props: DraggableProps) {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    const handleStart = (
        event: ReactMouseEvent<HTMLElement> | ReactTouchEvent<HTMLElement>,
    ) => {
        event.preventDefault();
        setIsDragging(true);

        const target = event.currentTarget;

        let clientX,
            clientY = 0;

        if ((event as ReactTouchEvent).touches) {
            const touch = (event as ReactTouchEvent).touches[0];
            clientX = touch.clientX;
            clientY = touch.clientY;
        } else {
            clientX = (event as ReactMouseEvent).clientX;
            clientY = (event as ReactMouseEvent).clientY;
        }

        setOffset({
            x: clientX - target.getBoundingClientRect().left,
            y: clientY - target.getBoundingClientRect().top,
        });
        setDimension({
            width: target.offsetWidth,
            height: target.offsetHeight,
        });
    };

    const handleMove = useCallback(
        (event: MouseEvent | TouchEvent) => {
            if (isDragging) {
                let clientX,
                    clientY = 0;

                if ((event as TouchEvent).touches) {
                    const touch = (event as TouchEvent).touches[0];
                    clientX = touch.clientX;
                    clientY = touch.clientY;
                } else {
                    clientX = (event as MouseEvent).clientX;
                    clientY = (event as MouseEvent).clientY;
                }

                let x = clientX - offset.x;
                let y = clientY - offset.y;

                // Ensure the element stays within the viewport
                const rightBoundary = window.innerWidth - dimension.width;
                const bottomBoundary = window.innerHeight - dimension.height;

                if (x < 0) x = 0;
                if (y < 0) y = 0;
                if (x > rightBoundary) x = rightBoundary;
                if (y > bottomBoundary) y = bottomBoundary;

                setPosition({ x, y });
            }
        },
        [isDragging, offset, dimension],
    );

    const handleMouseUpOrTouchEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleMouseUpOrTouchEnd);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('touchend', handleMouseUpOrTouchEnd);
        return () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleMouseUpOrTouchEnd);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleMouseUpOrTouchEnd);
        };
    }, [handleMove, handleMouseUpOrTouchEnd]);

    return (
        <Container
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
        >
            {props.children}
        </Container>
    );
}
