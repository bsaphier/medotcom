import { Piano } from './Piano';
import { Draggable } from 'components/Draggable';

export function DraggablePiano() {
    return (
        <Draggable>
            <Piano />
        </Draggable>
    );
}
