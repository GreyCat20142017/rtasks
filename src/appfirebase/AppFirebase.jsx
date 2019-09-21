import React, {useState, useEffect} from 'react';
import axios from 'axios';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

// import {firebaseConfig} from './config';

import Loader from '../common/loader/Loader';
import SimpleTable from '../common/simpletable/SimpleTable';
import {getCurrentUserId, getCurrentUserInfo} from './firebasefunctions';


const FIREBASE_URL = 'https://rtasks-cacd5.firebaseio.com/candy.json';

const AppFirebase = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState([]);
    const [wasError, setWasError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // firebase.initializeApp(firebaseConfig);
        return () => {
            logout();
        };
    }, []);

    useEffect(() => {
        setUser(getCurrentUserId());
    }, []);

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

    const updateCurrentProfile = (displayName) => {
        setIsLoading(true);
        setWasError(null);
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: displayName
        }).then(() => {
            // Update successful.
            setIsLoading(false);
        }).catch((error) => {
            setWasError(error.message);
            setIsLoading(false);
        });
    };

    const register = async () => {
        setIsLoading(true);
        setWasError(null);
        const regData = {
            email: 'bredovina@bred.bred',
            password: 'secret',
            displayName: 'Бредовина',
            returnSecureToken: true
        };
        try {
            const user = await firebase.auth().createUserWithEmailAndPassword(regData.email, regData.password);
            setUser(user.user.uid);
            setIsLoading(false);
            updateCurrentProfile(gitregData.displayName);
        } catch (err) {
            setWasError(err.message);
            setIsLoading(false);
        }
    };

    const login = async () => {
        setIsLoading(true);
        setWasError(null);
        const regData = {
            email: 'bredovina@bred.bred',
            password: 'secret',
            returnSecureToken: true
        };
        try {
            const user = await firebase.auth().signInWithEmailAndPassword(regData.email, regData.password);
            setUser(user.user.uid);
            setIsLoading(false);
        } catch (err) {
            setWasError(err.message);
            setIsLoading(false);
        }
    };

    const logout = () => {
        setIsLoading(true);
        setWasError(null);
        firebase.auth().signOut().then(() => {
            setUser(null);
            setIsLoading(false);
        }).catch(error => {
            setWasError(error.message);
        });
    };

    let current = getCurrentUserInfo();

    return (
        <React.Fragment>
            {isLoading ? <Loader message={'Ожидание ответа сервера...'}/> :
                <div>
                    <h4 className='h4-responsive py-2 mdb-color-text'>Данные (AppFirebase)</h4>
                    <p className='text-warning'>{wasError}</p>
                    {current ?
                        <p className='my-2 text-center'><small>Текущий пользователь: {current.name}</small></p> :
                        null
                    }
                    <div className="btn-group pb-2" role="group" aria-label="Firebase">
                        <button className="btn btn-sm btn-outline-mdb-color"
                                onClick={() => getData(FIREBASE_URL)}
                                title='Получение тестовых данных'>
                            получить данные
                        </button>
                        {user ?
                            <React.Fragment>
                                <button className="btn btn-sm btn-outline-mdb-color"
                                        onClick={logout}
                                        title='Выход'>
                                    Выход
                                </button>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <button className="btn btn-sm btn-outline-mdb-color"
                                        onClick={register}
                                        title='Тест регистрации'>
                                    Регистрация
                                </button>
                                <button className="btn btn-sm btn-outline-mdb-color"
                                        onClick={login}
                                        title='Тест аутентификации'>
                                    Вход
                                </button>
                            </React.Fragment>
                        }
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