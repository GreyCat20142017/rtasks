import React from 'react';

import {getInlineSvg} from '../../../functions';
import {MDB_COLOR} from '../../../constants';

export const RUSSIAN_TITLES = {
    'gluten': 'С глютеном',
    'sugar': 'С сахаром',
    'vegetarian': 'Вегетарианские'
};

export const Kinds = ({kinds, onCheckBoxClick, selectAll, unSelectAll, title = 'По виду:'}) => {
    return (
        kinds ?
            <>
                <hr/>
                <p className='font-weight-bolder text-center my-0 py-0'>{title}</p>
                <div className='py-1 px-2 text-left'>
                    {Object.keys(kinds).map(kind =>
                        <div className='custom-control custom-checkbox pt-1' key={kind}>
                            <input type='checkbox' className='custom-control-input' id={'check' + kind}
                                   checked={kinds[kind]}
                                   value={kinds[kind]}
                                   onChange={() => onCheckBoxClick(kind)}/>
                            <label className='custom-control-label'
                                   htmlFor={'check' + kind}><small>{RUSSIAN_TITLES[kind] || kind}</small></label>
                        </div>
                    )}
                </div>
                <div className='button-group'>
                    <button className='btn p-1'
                            title='выделить все' onClick={selectAll}>
                        {getInlineSvg('select', 20, 20, MDB_COLOR, MDB_COLOR)}
                    </button>
                    <button className='btn p-1'
                            title='снять выделение' onClick={unSelectAll}>
                        {getInlineSvg('unselect', 20, 20, MDB_COLOR, MDB_COLOR)}
                    </button>
                </div>
            </> : null
    );
};

export const TextForm = ({text, setText}) => (
    <>
        <hr/>
        <div className='px-1'>
            <label className='font-weight-bold' htmlFor='text'
                   title='В т.ч. по цене, количеству и части названия и вида'>По тексту:</label>
            <p className='d-flex align-items-center p-0'>
                <input className='w-responsive h-75' type='text' id='text' value={text}
                       onChange={(evt) => setText(evt.target.value)}/>
                <button className='btn btn-sm px-2' disabled={text.length === 0} title='Очистить текст'
                        aria-label={'Очистить текст'}
                        onClick={() => setText('')}>&#10008;</button>
            </p>
        </div>
        <hr/>
    </>
);

export const FilterButtons = ({apply, reset, cancel}) => (
    <div className='button-group'>
        <button className='btn btn-sm btn-mdb-color'
                title='Применить фильтр'
                onClick={apply}>
            применить фильтр
        </button>
        <button className='btn btn-sm btn-mdb-color'
                title='Сбросить текущий фильтр и применить фильтр по умолчанию' onClick={reset}>
            сбросить фильтр
        </button>
        <button className='btn btn-sm btn-mdb-color'
                title='Закрыть панель фильтра без изменений' onClick={cancel}>
            закрыть
        </button>
    </div>
);