import React, {useRef} from 'react';
import {useDrag, useDrop} from 'react-dnd';

import {ArrayRowCells} from './ArrayRowCells';
import {DND_TYPES} from '../../constants';

export const DraggableArrayRow = ({element, rowInd, controls = [], moveRow}) => {

    const dragRef = useRef();

    const [, drop] = useDrop({
        accept: DND_TYPES.ROW,
        hover(item, monitor) {
            if (!dragRef.current) {
                return;
            }
            item.rowInd = rowInd;
        }
    });

    const [, drag] = useDrag({
        item: {type: DND_TYPES.ROW, text: element.text, rowInd: rowInd},
        end: monitor => {
            if (moveRow && parseInt(rowInd, 10) >= 0 && parseInt(monitor.rowInd, 10) >= 0) {
                moveRow(rowInd, monitor.rowInd);
            }
        }
    });

    drag(drop(dragRef));

    return (
        <tr className='d-flex align-items-center draggable' key={rowInd} ref={dragRef}
               title='Для перемещения точки маршрута - drag-and-drop строки таблицы'>
        <ArrayRowCells element={element} controls={controls} rowInd={rowInd}/>
    </tr>);
};