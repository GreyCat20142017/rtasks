import React, {useState} from 'react';
import axios from 'axios';
import {orderBy} from 'lodash';
import firebase from 'firebase/app';
import 'firebase/database';

import Loader from '../common/loader/Loader';
import TableWrapper from '../common/compoundtable/table/TableWrapper';
import {CardContainer} from './Candy';
import {SORT_DIRECTIONS} from '../common/compoundtable/tableconstants';
import {FIELDS_LIST, FIREBASE_URL, FIREBASE_URL_TYPE} from './fireconstants';
import {getDataWithId, getRowMapResult} from './firebasefunctions';

const defaultSortDirection = SORT_DIRECTIONS.ASC;

const getRowClickComponent = () => (props) => {
    return (
        <CardContainer {...props}/>
    );
};

const AppFirebase = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState([]);
    const [wasError, setWasError] = useState(null);
    const [sortField, setSortField] = useState('');

    const getData = async (url, url_type) => {
        let data = [];
        setIsLoading(true);
        setWasError(null);
        try {
            if (url_type === FIREBASE_URL_TYPE.FIREBASE_DB) {
                const response = await firebase.database().ref(url).once('value');
                data = response.val().map(row => getRowMapResult(row, FIELDS_LIST));
            } else {
                const response = await axios.get(url);
                data = response.data.map(row => getRowMapResult(row, FIELDS_LIST));
            }
            const defaultSortField = data.length > 0 && Object.keys(data[0]).length > 0 ?
                Object.keys(data[0])[0] : '';
            setContent(data ? orderBy(getDataWithId(data), defaultSortField, defaultSortDirection) : []);
            setSortField(defaultSortField);
            setIsLoading(false);
            setWasError(false);
        } catch (err) {
            setWasError(err.message);
            setIsLoading(false);
        }
    };

    const getAPIData = () => (getData(FIREBASE_URL[FIREBASE_URL_TYPE.FIREBASE_API], FIREBASE_URL_TYPE.FIREBASE_API));

    const getDBData = () => (getData(FIREBASE_URL[FIREBASE_URL_TYPE.FIREBASE_DB], FIREBASE_URL_TYPE.FIREBASE_DB));

    const getJSONData = () => (getData(FIREBASE_URL[FIREBASE_URL_TYPE.JSON], FIREBASE_URL_TYPE.JSON));

    return (
        <React.Fragment>
            {isLoading ? <Loader message={'Ожидание ответа сервера...'}/> :
                <div>
                    <h4 className='h4-responsive py-2 mdb-color-text'>Данные (AppFirebase)</h4>
                    <p className='text-danger'>{wasError}</p>
                    <div className='btn-group pb-2' role='group' aria-label='Firebase'>
                        <button className='btn btn-sm btn-outline-mdb-color'
                                onClick={getAPIData}
                                title='Получение тестовых данных (API)'>
                            получить данные (API)
                        </button>
                        <button className='btn btn-sm btn-outline-mdb-color'
                                onClick={getDBData}
                                title='Получение тестовых данных (RealtimeDatabase)'>
                            получить данные
                        </button>
                        <button className='btn btn-sm btn-outline-mdb-color'
                                onClick={getJSONData}
                                title='Получение тестовых данных (локальный JSON)'>
                            получить данные (JSON)
                        </button>
                    </div>
                    {content.length > 0 ?
                        <TableWrapper
                            content={content}
                            sortField={sortField}
                            getRowClickComponent={getRowClickComponent}
                        /> :
                        <p>Нет данных</p>
                    }
                </div>
            }
        </React.Fragment>
    );
};

export default AppFirebase;