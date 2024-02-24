import { ReactNode } from 'react';

export interface SpinnerProps {
    size?: number;
    speed?: number;
}

export interface HexagonProps {
    speed?: number;
    reverse?: boolean;
    children?: ReactNode;
}
