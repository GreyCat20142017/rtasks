import React, {useState} from 'react';
import axios from 'axios';

import Loader from '../common/loader/Loader';
import SimpleTable from '../common/simpletable/SimpleTable';

const FIREBASE_URL = 'https://rtasks-cacd5.firebaseio.com/candy.json';

const AppFirebase = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState([]);
    const [wasError, setWasError] = useState(null);

    const getData = async (url) => {
        setIsLoading(true);
        setWasError(null);
        try {
            const response = await axios.get(url, {'limitToFirst': 1});
            const data = response.data;
            setContent(data ? data : []);
            setIsLoading(false);
        } catch (err) {
            setWasError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <React.Fragment>
            {isLoading ? <Loader message={'Ожидание ответа сервера...'}/> :
                <div>
                    <h4 className='h4-responsive py-2 mdb-color-text'>Данные (AppFirebase)</h4>
                    <p className='text-warning'>{wasError}</p>
                    <div className="btn-group pb-2" role="group" aria-label="Firebase">
                        <button className="btn btn-sm btn-outline-mdb-color"
                                onClick={() => getData(FIREBASE_URL)}
                                title='Получение тестовых данных'>
                            получить данные
                        </button>
                    </div>
                    {content.length > 0 ?
                        <SimpleTable details={content.map(row => `${row.kind} "${row.name}"`)}/> :
                        null
                    }
                </div>
            }
        </React.Fragment>
    );
};

export default AppFirebase;