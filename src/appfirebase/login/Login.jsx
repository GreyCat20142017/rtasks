import React, {useContext, useState} from 'react';
// import {navigate} from 'hookrouter';
import firebase from 'firebase/app';
import 'firebase/auth';

import UserContext from '../UserContext';
import Loader from '../../common/loader/Loader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wasError, setWasError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {authUser} = useContext(UserContext);

    const onSubmit = (evt) => {
        evt.preventDefault();
        if (email.trim() !== '' && password.trim() !== '') {
            login({email, password});
        } else {
            setWasError('Необходимо заполнить e-mail и пароль');
        }
    };

    const login = (regData) => {
        setIsLoading(true);
        setWasError(null);
        firebase.auth().signInWithEmailAndPassword(regData.email, regData.password).then(() => {
            setIsLoading(false);
        }).catch(error => {
            setWasError(error.message);
            setIsLoading(false);
        });
    };

    return (
        <section className="col-12 col-md-6 py-3 justify-content-center container">
            <h3 className='text-center mb-2'>Вход</h3>
            {authUser ?
                <h5 className='text-center mb-2'>выполнен под пользователем {authUser.displayName}</h5> :
                <form className='needs-validation mx-auto p-3 white mdb-color-text rounded shadow-lg text-center'
                      onSubmit={onSubmit}>
                    <div className='col-12 d-flex flex-column mt-2'>
                        <label className='text-left' htmlFor='email'>E-mail</label>
                        <input className='form-control' autoComplete="off"
                               type='email' name='email' placeholder='E-mail' id='email' required
                               value={email} onChange={(evt) => setEmail(evt.target.value)}/>
                        <span className='invalid-feedback'></span>
                    </div>
                    <div className='col-12 d-flex flex-column mt-2'>
                        <label className='text-left' htmlFor='password'>Пароль</label>
                        <input className='form-control' autoComplete="off"
                               type='password' name='password' placeholder='Пароль' required
                               value={password} onChange={(evt) => setPassword(evt.target.value)}/>
                        <span className='invalid-feedback'></span>
                    </div>
                    <div className='py-3'>
                        <button className='btn btn-sm btn-mdb-color' type='submit' onClick={onSubmit}
                                onSubmit={onSubmit}>Войти
                        </button>
                    </div>
                </form>
            }
            {isLoading ?
                <Loader message={'Ожидание ответа сервера...'}/> : null
            }
            <p className='mt-3 text-danger'>{wasError}</p>

        </section>
    );
};

export default Login;
