import React, {useState} from 'react';
import {orderBy} from 'lodash';

import Loader from '../common/loader/Loader';
import TableWrapper from '../common/compoundtable/table/TableWrapper';

import {DATA_URLS} from './tableconstants';
import {SORT_DIRECTIONS} from '../common/compoundtable/tableconstants';

const defaultSortDirection = SORT_DIRECTIONS.ASC;

const AppTable = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [wasError, setWasError] = useState(false);
    const [content, setContent] = useState([]);
    const [sortField, setSortField] = useState('');

    const stateReset = (data = [], loading = false, error = false, field = '') => {
        setContent(data);
        setIsLoading(false);
        setSortField(sortField);
        setWasError(error);
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
                    setContent(orderBy([...data.content], defaultSortField, defaultSortDirection));
                    setWasError(false);
                    setSortField(defaultSortField);
                    stateReset(orderBy([...data.content], defaultSortField, defaultSortDirection), false, false, defaultSortField);
                }
            })
            .catch(error => {
                if (!canceled) {
                    stateReset([], false, true, '');
                }
            });
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

                <TableWrapper
                    content={content}
                    sortField={sortField}
                />
            }
        </div>
    );
};

export default AppTable;