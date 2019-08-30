import React, {useState} from 'react';
import {orderBy, chunk} from 'lodash';

import Loader from '../components/loader/Loader';
import Table from '../components/table/Table';
import Filter from '../components/filter/Filter';
import {DATA_URLS, PAGE_LIMIT, SORT_DIRECTIONS} from '../constants';
import Details from '../components/details/Details';

const containsPattern = (itemObject, pattern) => (
    Object.keys(itemObject).reduce((rv, current) => (rv || itemObject[current].toLowerCase().includes(pattern.toLowerCase())), false)
);

const getPreparedData = (content, sortField, sortDirection, filterValue) => (
    chunk(content.filter(item => containsPattern(item, filterValue)), PAGE_LIMIT)
);

const AppTable = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState([]);
    const [wasError, setWasError] = useState(false);
    const [filterValue, setFilterValue] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState(SORT_DIRECTIONS.ASC);
    const [currentDetails, setCurrentDetails] = useState(null);
    const preparedData = getPreparedData([...content], sortField, sortDirection, filterValue);

    const basicReset = () => {
        setCurrentPage(0);
        setCurrentDetails(null);
        setFilterValue('');
        setIsLoading(false);
    };

    const getData = (url, canceled = false) => {
        setIsLoading(true);
        setWasError(false);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!canceled) {
                    const defaultSortField = data.content.length > 0 && Object.keys(data.content[0]).length > 0 ?
                        Object.keys(data.content[0])[0] : '';
                    setContent(orderBy([...data.content], defaultSortField, sortDirection));
                    setWasError(false);
                    setSortField(defaultSortField);
                    basicReset();
                }
            })
            .catch(error => {
                if (!canceled) {
                    setWasError(true);
                    setContent([]);
                    basicReset();
                }
            });
    };

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
        <div>
            <h4 className='h4-responsive py-3 mdb-color-text'>Таблица с данными (AppTable)</h4>
            <div className="btn-group" role="group" aria-label="Получение данных">
                {Object.keys(DATA_URLS).map(item => (
                    <button className="btn btn-sm btn-outline-mdb-color" key={item}
                            onClick={() => getData(DATA_URLS[item].url)}
                            title={DATA_URLS[item].title}>
                        {DATA_URLS[item].name}
                    </button>
                ))}
            </div>
            {wasError ? <p className='p-2 text-danger'>Ошибка при загрузке данных.</p> : null}
            {isLoading ?
                <Loader/> :
                currentDetails ? <Details details={currentDetails} unsetDetails={() => setCurrentDetails(null)}/> :
                    <React.Fragment>
                        {content.length > 0 ? <Filter onFilterApply={onFilterApply}/> : null}
                        <Table
                            data={preparedData.length > 0 ? orderBy([...preparedData[currentPage]], sortField, sortDirection) : []}
                            currentPage={currentPage} onPageChange={onPageChange} pageCount={preparedData.length}
                            sortField={sortField} sortDirection={sortDirection}
                            onTableSort={onTableSort} onDirectionChange={onDirectionChange} onRowClick={onRowClick}/>

                    </React.Fragment>
            }
        </div>
    );
};

export default AppTable;