import React from 'react';
import ReactPaginate from 'react-paginate';

import {PAGE_LIMIT, SORT_DIRECTIONS} from '../tableconstants';

const SortIndicator = ({currentColumn, sortField, sortDirection, onDirectionChange}) => {
    const arrow = sortDirection === SORT_DIRECTIONS.ASC ?
        <h5 className='font-weight-bold d-inline ml-2' aria-hidden='true' onClick={onDirectionChange}>&uarr;</h5> :
        <h5 className='font-weight-bold d-inline ml-2' aria-hidden='true' onClick={onDirectionChange}>&darr;</h5>;
    return (currentColumn === sortField) ? arrow : null;
};

const TableRow = ({row, ind, columns, onRowClick, pseudoId = -1}) => (
    <tr className='cursor-pointer' key={ind} title='Клик - для просмотра детальной информации'
        onClick={() => onRowClick(row, pseudoId)}>{columns.map(column =>
        <td key={column + ind}>{row[column]}</td>)}
    </tr>
);

const Table = ({data, onTableSort, ...rest}) => {
    const columns = Array.isArray(data) && data.length > 0 ? Object.keys(data[0]) : [];
    const noData = !(columns.length > 0 && data.length > 0);

    const onPageChange = (paginationPage) => (rest.onPageChange(paginationPage.selected));

    return (
        noData ? <p className='text-mdb-color py-2'><small>Нет данных для вывода в таблицу</small></p> :
            <React.Fragment>
                <table className='table table-sm table-striped table-bordered my-3' cellSpacing='1' width='100%'
                       id='idTable'>
                    <thead>
                    <tr>
                        {columns.map(column =>
                            <th className='th-sm font-weight-bold mdb-color text-white cursor-pointer'
                                key={column + 'th'} onClick={() => onTableSort(column)}>
                                {column}
                                <SortIndicator currentColumn={column} {...rest}/>
                            </th>)
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, ind) =>
                        <TableRow key={ind} row={row} ind={ind} columns={columns} onRowClick={rest.onRowClick}
                        pseudoId={row['id'] ? row.id : ind + rest.currentPage * PAGE_LIMIT}/>
                    )}
                    </tbody>
                </table>

                {noData || rest.pageCount < 2 ? null :
                    <ReactPaginate
                        previousLabel={<span>&lArr;</span>}
                        nextLabel={<span>&rArr;</span>}
                        breakLabel={<span className='gap'>...</span>}
                        pageCount={rest.pageCount}
                        onPageChange={onPageChange}
                        forcePage={rest.currentPage}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousLinkClassName={'page-link mdb-color-text'}
                        nextLinkClassName={'page-link mdb-color-text'}
                        disabledClassName={'disabled'}
                        activeClassName={'active'}
                    />
                }
            </React.Fragment>

    );
};

export default Table;