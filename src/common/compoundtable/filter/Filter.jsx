import React, {useState} from 'react';
import {KEYCODES} from '../../../constants';

const Filter = ({onFilterApply}) => {
    const [inputValue, setInputValue] = useState('');

    const onKeyPress = (evt) => {
        if (evt.keyCode === KEYCODES.ENTER) {
            evt.preventDefault();
            onFilterApply(evt.target.value);
        }
    };

    const clearFilter = () => {
        if (inputValue !== '') {
            setInputValue('');
            onFilterApply('');
        }
    };

    return (
        <div className='md-form d-flex align-items-baseline mt-3 mb-2'>
            <label htmlFor='idFilter'>{inputValue.trim() === '' ? 'Текст для поиска' : ''}</label>
            <input className='form-control' value={inputValue}
                   type='text' id='idFilter' onChange={(evt) => setInputValue(evt.target.value)}
                   onKeyDown={onKeyPress}/>
            <div className='btn-group' role='group' aria-label='группа кнопок'>
                <button className={'btn btn-mdb-color btn-sm'} type='button' onClick={() => onFilterApply(inputValue)}
                        title='выполнить поиск подстроки во всех полях таблицы'>
                    поиск
                </button>
                <button className={'btn btn-mdb-color btn-sm ml-1'} type='button' onClick={clearFilter}
                        title='сбросить выражение поиска'>
                    &#10008;<span className='visually-hidden'>сбросить</span>
                </button>
            </div>
        </div>
    );
};

export default Filter;