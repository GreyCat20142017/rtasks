import React, {useState} from 'react';

import SimpleTable from '../../common/simpletable/SimpleTable';

import {GEO_REG_EXP} from '../mapconstants';
import {KEYCODES} from '../../constants';

const DeleteButton = ({callback, ind}) => (
    <button className='btn btn-mdb-color btn-sm m-0 py-1 px-2' type='button' onClick={() => callback(ind)}>
        &#10008;<span className='visually-hidden'>удалить</span>
    </button>
);

const MapForm = ({routePoints, onAddPoint, onDeletePoint}) => {
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
        <React.Fragment>
            <input
                className={'form-control' + (inputValue.trim() === '' && !wasInput) ? 'is_valid' : 'is-invalid'}
                value={inputValue} pattern={GEO_REG_EXP}
                title='Название для новой точки маршрута. Enter - для завершения ввода.'
                placeholder='... новая точка маршрута' required
                type='text' id='idGitUser' onChange={(evt) => setInputValue(evt.target.value)}
                onKeyDown={onEnterPress}/>
            <SimpleTable details={routePoints.map(item => item.name)} noHeader={true}
                         controlColumns={[{Control: DeleteButton, callback: onDeletePoint, title: ''}]}/>
            <p><small>Новые точки маршрута добавляются в центр карты для перемещения в нужную точку.</small></p>
            <p><small>Ибо геокодинг, кажется, только по ключу.</small></p>
        </React.Fragment>
    );
};

export default MapForm;