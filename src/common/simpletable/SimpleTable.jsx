import React from 'react';
import {DraggableArrayRow} from './DraggableArrayRow';
import {SimpleArrayRow} from './SimpleArrayRow';

export const DetailsHeader = ({isArray}) => (isArray ?
        <tr>
            <th className='th-sm font-weight-bold mdb-color text-white'>Список</th>
        </tr> :
        <tr>
            <th className='th-sm font-weight-bold mdb-color text-white'>Название поля</th>
            <th className='th-sm font-weight-bold mdb-color text-white'>Значение</th>
        </tr>
);

export const ArrayRows = ({details, controls = [], draggableRows, moveRow}) => (
    details.map((element, rowInd) => (
        draggableRows ?
            <DraggableArrayRow element={element} controls={controls} rowInd={rowInd} key={'row'+rowInd} moveRow={moveRow}/> :
            <SimpleArrayRow  element={element} controls={controls} rowInd={rowInd} key={'row'+rowInd}/>
    ))
);

export const ObjectRows = ({details}) => {
    const columns = Array.isArray(details) ? details : Object.keys(details);
    return (
        <React.Fragment>
            {columns.map((element, ind) => (
                <tr key={ind}>
                    <td>{element}
                    </td>
                    <td>{details[element]}</td>
                </tr>
            ))}
        </React.Fragment>);
};

const SimpleTable = ({details, noHeader = false, controls = [], draggableRows = false, moveRow = null}) => (
    <table className='table table-sm table-bordered w-100'>
        <thead>
        {noHeader ? null : <DetailsHeader isArray={Array.isArray(details)}/>}
        </thead>
        <tbody>
        {Array.isArray(details) ?
            <ArrayRows details={details} controls={controls} draggableRows={draggableRows} moveRow={moveRow}/> :
            <ObjectRows details={details}/>}
        </tbody>
    </table>
);

export default SimpleTable;

