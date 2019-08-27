import React, {useEffect} from 'react';
import {KEYCODES} from '../../constants';

const Details = ({details, unsetDetails}) => {
    const columns = Object.keys(details);

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
                    <h5 className='text-center my-3'>Информация о выбранной записи:</h5>
                    <table className='table table-sm table-bordered'>
                        <thead>
                        <tr>
                            <th className='th-sm font-weight-bold mdb-color text-white '>Название поля</th>
                            <th className='th-sm font-weight-bold mdb-color text-white '>Значение</th>
                        </tr>
                        </thead>
                        <tbody>
                        {columns.map((item, ind) => (
                            <tr key={ind}>
                                <td>{item}
                                </td>
                                <td>{details[item]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button className='btn btn-sm btn-mdb-color' onClick={unsetDetails} type={'button'}>назад</button>
                </div>
            </React.Fragment> : null
    );
};

export default Details;