import React, {useEffect} from 'react';
import {KEYCODES} from '../../constants';
import SimpleTable from '../simpletable/SimpleTable';

/**
 * @param details - Объект или массив строк
 * @param unsetDetails - Функция, изменяющая состояние модального окна с таблицей
 */


const getDefaultComponent = () =>  ({details, unsetDetails, title = 'Информация о выбранной записи:'}) => (
    <React.Fragment>
        <div className='mt-4 p-3 shadow-lg fixed-bottom h-100 bg-white'>
            <button className='btn btn-sm btn-mdb-color' onClick={unsetDetails} type={'button'}
                    title='Для возврата к предыдущему экрану - Еsc'>
                выйти из просмотра (ESC)
            </button>
            <h5 className='text-center my-3'>{title}</h5>
            <div className='overflow-auto h-100'>
                <SimpleTable details={details}/>
            </div>

        </div>
    </React.Fragment>
);

const Details = (props) => {

    const onKeyDown = (evt) => {
        if (evt.keyCode === KEYCODES.ESC) {
            evt.preventDefault();
            props.unsetDetails();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    });

    const Component = ((typeof props['getRowClickComponent'] === 'undefined') ?
        getDefaultComponent() : props['getRowClickComponent']());

    return (props.details ?
            <Component {...props}/>
            : null
    );
};

export default Details;