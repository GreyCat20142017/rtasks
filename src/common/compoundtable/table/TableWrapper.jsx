import React, {useState} from 'react';
import {orderBy} from 'lodash';

import Table from './Table';
import Filter from '../filter/Filter';
import {SORT_DIRECTIONS} from '../tableconstants';
import Details from '../../details/Details';

import {getPreparedData} from '../tablefunctions';


const TableWrapper = (props) => {
    const [filterValue, setFilterValue] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [sortField, setSortField] = useState(props.sortField || '');
    const [sortDirection, setSortDirection] = useState(SORT_DIRECTIONS.ASC);
    const [currentDetails, setCurrentDetails] = useState(null);
    const preparedData = getPreparedData([...props.content], sortField, sortDirection, filterValue);


    const onTableSort = (column) => (setSortField(column));

    const onPageChange = (page) => (setCurrentPage(page));

    const onRowClick = (rowData) => (setCurrentDetails(rowData));

    const onDirectionChange = () => (
        setSortDirection(sortDirection === SORT_DIRECTIONS.ASC ? SORT_DIRECTIONS.DESC : SORT_DIRECTIONS.ASC)
    );

    const onFilterApply = (value) => {
        setFilterValue(value);
        setCurrentPage(0);
    };

    return (
        currentDetails ?
            <Details
                details={currentDetails}
                unsetDetails={() => setCurrentDetails(null)}
                getRowClickComponent={props['getRowClickComponent'] ? props.getRowClickComponent : undefined}
            /> :
            (preparedData.length > 0 ?
                <React.Fragment>
                    <Filter onFilterApply={onFilterApply}/>
                    <Table
                        data={preparedData.length > 0 ? orderBy([...preparedData[currentPage]], sortField, sortDirection) : []}
                        currentPage={currentPage} onPageChange={onPageChange} pageCount={preparedData.length}
                        sortField={sortField} sortDirection={sortDirection}
                        onTableSort={onTableSort} onDirectionChange={onDirectionChange} onRowClick={onRowClick}/>
                </React.Fragment> :
                null)
    );
};

export default TableWrapper;