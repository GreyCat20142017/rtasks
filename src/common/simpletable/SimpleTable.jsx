import React from 'react';

const getControl = (Control, callback, ind) => (<Control callback={callback} ind={ind}/>);

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

export const ArrayRows = ({details, controlColumns = []}) => {

    return (
        <React.Fragment>
            {details.map((item, ind) => (
                <tr key={ind}>
                    <td>{item}</td>
                    {controlColumns.map((control, index) =>
                        <td key={index}>
                            {getControl(control.Control, control.callback, ind)}
                        </td>)}
                </tr>
            ))}
        </React.Fragment>);
};

const SimpleTable = ({details, noHeader = false, controlColumns = []}) => (
    <table className='table table-sm table-bordered'>
        <thead>
        {noHeader ? null : <DetailsHeader isArray={Array.isArray(details)}/>}
        </thead>
        <tbody>
        {Array.isArray(details) ?
            <ArrayRows details={details} controlColumns={controlColumns}/> :
            <ObjectRows details={details}/>}
        </tbody>
    </table>
);

export default SimpleTable;

