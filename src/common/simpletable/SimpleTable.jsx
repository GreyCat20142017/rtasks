import React from 'react';

const getControl = (Control, callback, buttonType, colInd, rowInd) => (
    <Control key={rowInd + ' ' + colInd} callback={callback} buttonType={buttonType} ind={rowInd}/>
);

export const ArrayRows = ({details, controls = [], draggableRows}) => {
    return (
        <React.Fragment>
            {details.map((item, rowInd) => (
                <tr className={'d-flex align-items-center' + (draggableRows ? 'draggable' : '')} key={rowInd}>
                    <td className='flex-grow-1'>{item}</td>
                    <td className='d-flex align-items-center justify-content-center flex-nowrap h-100'>
                        {controls.map((control, colInd) => getControl(control.Control, control.callback, control.buttonType, colInd, rowInd))}
                    </td>
                </tr>
            ))}
        </React.Fragment>);
};

export const DetailsHeader = ({isArray}) => (isArray ?
        <tr>
            <th className='th-sm font-weight-bold mdb-color text-white'>Список</th>
        </tr> :
        <tr>
            <th className='th-sm font-weight-bold mdb-color text-white'>Название поля</th>
            <th className='th-sm font-weight-bold mdb-color text-white'>Значение</th>
        </tr>
);

export const ObjectRows = ({details}) => {
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

const SimpleTable = ({details, noHeader = false, controls = [], draggableRows = false}) => (
    <table className='table table-sm table-bordered w-100'>
        <thead>
        {noHeader ? null : <DetailsHeader isArray={Array.isArray(details)}/>}
        </thead>
        <tbody>
        {Array.isArray(details) ?
            <ArrayRows details={details} controls={controls} draggableRows={draggableRows}/> :
            <ObjectRows details={details}/>}
        </tbody>
    </table>
);

export default SimpleTable;

