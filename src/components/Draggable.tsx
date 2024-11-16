import {
    MouseEvent as ReactMouseEvent,
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
    const [position, setPosition] = useState<Position>({ x: 50, y: 50 });
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    const handleMouseDown = (event: ReactMouseEvent<HTMLElement>) => {
        setIsDragging(true);
        event.preventDefault();

        const target = event.currentTarget;
        setOffset({
            x: event.clientX - target.getBoundingClientRect().left,
            y: event.clientY - target.getBoundingClientRect().top,
        });
        setDimension({
            width: target.offsetWidth,
            height: target.offsetHeight,
        });
    };

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (isDragging) {
                let x = event.clientX - offset.x;
                let y = event.clientY - offset.y;

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

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    return (
        <Container
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
            onMouseDown={handleMouseDown}
        >
            {props.children}
        </Container>
    );
}
