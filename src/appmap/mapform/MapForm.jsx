import React, {useState} from 'react';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import SimpleTable from '../../common/simpletable/SimpleTable';
import {GEO_REG_EXP} from '../mapconstants';
import {CONTROL_BUTTON_TYPES, KEYCODES} from '../../constants';
import {getButtonTypeClass} from '../../functions';

const ControlButton = ({callback, buttonType, ind}) => (
    <button className={'btn btn-sm m-0 py-1 px-2 mx-1 ' + getButtonTypeClass(buttonType)}
            type='button' title={buttonType.title} onClick={() => callback(ind)}>
        <span>{buttonType.icon}</span><span className='visually-hidden'>{buttonType.title}</span>
    </button>
);

const MapForm = ({routePoints, onAddPoint, onDeletePoint, onUp, onDown, moveRow}) => {
    const [inputValue, setInputValue] = useState('');
    const [wasInput, setWasInput] = useState(false);

    const onEnterPress = (evt) => {
        if (evt.keyCode === KEYCODES.ENTER) {
            evt.preventDefault();
            const pointData = evt.target.value;
            const result = pointData;
            if (inputValue.trim() !== '') {
                setInputValue('');
                setWasInput(false);
                onAddPoint(result);
            } else {
                setWasInput(true);
            }
        }
    };

    return (
        <div className='w-100'>
            <input
                className={'form-control ' + (inputValue.trim() === '' && !wasInput) ? 'is_valid' : 'is-invalid'}
                value={inputValue} pattern={GEO_REG_EXP}
                title='Название для новой точки маршрута. Enter - для завершения ввода.'
                placeholder='... новая точка маршрута' required
                type='text' id='idGitUser' onChange={(evt) => setInputValue(evt.target.value)}
                onKeyDown={onEnterPress}/>

                <DndProvider backend={HTML5Backend}>
            <SimpleTable details={routePoints.map(item => item.name)} noHeader={true} draggableRows={true} moveRow={moveRow}
                         controls={[
                             {Control: ControlButton, buttonType: CONTROL_BUTTON_TYPES.DELETE, callback: onDeletePoint},
                             {Control: ControlButton, buttonType: CONTROL_BUTTON_TYPES.UP, callback: onUp},
                             {Control: ControlButton, buttonType: CONTROL_BUTTON_TYPES.DOWN, callback: onDown}
                         ]}/>
                </DndProvider>

            <p><small>Новые точки маршрута добавляются в центр карты для последующего перемещения в нужную точку
                карты.</small></p>
            <p><small>Ибо геокодинг, кажется, только по ключу.</small></p>
        </div>
    );
};

export default MapForm;