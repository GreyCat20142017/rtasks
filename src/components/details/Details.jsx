import React, {useEffect} from 'react';
import {KEYCODES} from '../../constants';

const DetailsHeader = ({isArray}) => (isArray ?
        <tr>
            <th className='th-sm font-weight-bold mdb-color text-white'>Список</th>
        </tr> :
        <tr>
            <th className='th-sm font-weight-bold mdb-color text-white'>Название поля</th>
            <th className='th-sm font-weight-bold mdb-color text-white'>Значение</th>
        </tr>
);

const ObjectRows = ({details}) => {
    const columns = Array.isArray(details) ? details : Object.keys(details);
    return (
        <React.Fragment>
            {columns.map((item, ind) => (
                <tr key={ind}>
                    <td>{item}
                    </td>
                    <td>{details[item]}</td>
                </tr>
            ))}
        </React.Fragment>);
};

const ArrayRows = ({details}) => {
    return (
        <React.Fragment>
            {details.map((item, ind) => (
                <tr key={ind}>
                    <td>{item}</td>
                </tr>
            ))}
        </React.Fragment>);
};

/**
 *
 * @param details - Объект или массив строк
 * @param unsetDetails
 */

const Details = ({details, unsetDetails, title = 'Информация о выбранной записи:'}) => {

    const onKeyDown = (evt) => {
        if (evt.keyCode === KEYCODES.ESC) {
            evt.preventDefault();
            unsetDetails();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    });

    return (details ?
            <React.Fragment>
                <div className='mt-4 p-3 shadow-lg'>
                    <h5 className='text-center my-3'>{title}</h5>
                    <table className='table table-sm table-bordered'>
                        <thead>
                        <DetailsHeader isArray={Array.isArray(details)}/>
                        </thead>
                        <tbody>
                        {Array.isArray(details) ?
                            <ArrayRows details={details}/> :
                            <ObjectRows details={details}/>}
                        </tbody>
                    </table>
                    <button className='btn btn-sm btn-mdb-color' onClick={unsetDetails} type={'button'}>назад</button>
                </div>
            </React.Fragment>
            : null
    );
};

export default Details;