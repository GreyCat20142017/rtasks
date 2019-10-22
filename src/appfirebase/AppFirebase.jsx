import React, {useState} from 'react';

import axios from 'axios';
import {orderBy} from 'lodash';
import firebase from 'firebase/app';
import 'firebase/database';

import Loader from '../common/loader/Loader';
import TableWrapper from '../common/compoundtable/table/TableWrapper';
import {SORT_DIRECTIONS} from '../common/compoundtable/tableconstants';
import {FIELDS_LIST, FIREBASE_URL, FIREBASE_URL_TYPE} from './fireconstants';
import {getDataWithId, getRowMapResult} from './firebasefunctions';
import {CardContainer} from './candy/CardContainer';
import {Catalog} from './candy/Catalog';

const defaultSortDirection = SORT_DIRECTIONS.ASC;

const getRowClickComponent = () => (props) => {
    return (
        <CardContainer {...props}/>
    );
};

const CurrentComponent = ({showCatalog, content, sortField, getRowClickComponent, catalog, closeCatalog}) => (
    showCatalog ?
        <Catalog catalog={catalog} closeCatalog={closeCatalog}/> :
        <TableWrapper
            content={content}
            sortField={sortField}
            getRowClickComponent={getRowClickComponent}
        />
);

const AppFirebase = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState([]);
    const [wasError, setWasError] = useState(null);
    const [sortField, setSortField] = useState('');
    const [catalog, setCatalog] = useState([]);
    const [showCatalog, setShowCatalog] = useState(false);

    const getData = async (url, url_type) => {
        let data = [];
        setIsLoading(true);
        setWasError(null);
        try {
            if (url_type === FIREBASE_URL_TYPE.FIREBASE_DB) {
                if (firebase.database().ref('.info/connected')) {
                    const response = await firebase.database().ref(url).once('value');
                    data = response ? response.val().map(row => getRowMapResult(row, FIELDS_LIST)) : [];
                    setCatalog(response.val());
                } else {
                    setIsLoading(false);
                    setWasError('База Firebase недоступна');
                }
            } else {
                const response = await axios.get(url + '.json', {timeout: 1000});
                data = response ? response.data.map(row => getRowMapResult(row, FIELDS_LIST)) : [];
                setCatalog(response.data);
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

    const getDBData = () => {
        if (window.navigator.onLine) {
            getData(FIREBASE_URL[FIREBASE_URL_TYPE.FIREBASE_DB], FIREBASE_URL_TYPE.FIREBASE_DB);
        } else {
            setWasError('Offline!');
        }
    };

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
                        {content.length > 0 ?
                            <button className='btn btn-sm btn-light-green ml-1'
                                    onClick={() => setShowCatalog(!showCatalog)}
                                    title='Каталог'>
                                каталог
                            </button> : null
                        }
                    </div>
                    {content.length > 0 ?
                        <CurrentComponent content={content} sortField={sortField}
                                          getRowClickComponent={getRowClickComponent}
                                          showCatalog={showCatalog} catalog={catalog}
                                          closeCatalog={() => setShowCatalog(false)}/>
                        :
                        <p>Нет данных</p>
                    }
                </div>
            }
        </React.Fragment>
    );
};

export default AppFirebase;