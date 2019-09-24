import React, {useState} from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import Loader from '../../common/loader/Loader';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [wasError, setWasError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const updateCurrentProfile = (displayName) => {
        setIsLoading(true);
        setWasError(null);
        const user = firebase.auth().currentUser;
        if (user) {
            user.updateProfile({
                displayName: displayName
            }).then(() => {
                // Update successful.
                setWasError('Зарегистрирован пользователь' + displayName);
                setIsLoading(false);
            }).catch((error) => {
                setWasError(error.message);
                setIsLoading(false);
            });
        }
    };

    const register = async (regData) => {
        setIsLoading(true);
        setWasError(null);
        try {
            const user = await firebase.auth().createUserWithEmailAndPassword(regData.email, regData.password);
            setWasError('Зарегистрирован: ' + user.user.uid);
            setIsLoading(false);
            updateCurrentProfile(regData.displayName);
        } catch (err) {
            setWasError(err.message);
            setIsLoading(false);
        }
    };

    const onSubmit = (evt) => {
        evt.preventDefault();
        if (email.trim() !== '' && password.trim() !== '') {
            register({email, password, displayName: name});
        } else {
            setWasError('Необходимо заполнить e-mail, пароль и имя');
        }
    };

    return (
        <React.Fragment>
            <section className='col-12 col-md-6 py-3 justify-content-center container'>
                <h2 className='text-center'>Регистрация</h2>
                <form
                    className='needs-validation mx-auto col-11 p-3 white mdb-color-text rounded shadow-lg text-center'
                >
                    <div className='col-12 d-flex flex-column mt-2'>
                        <label className='text-left' htmlFor='name'>Имя</label>
                        <input className='form-control'
                               type='text' name='name' placeholder='Имя' id='name' required
                               value={name} onChange={(evt) => setName(evt.target.value)}/>

                        <span className='invalid-feedback'></span>
                    </div>
                    <div className='col-12 d-flex flex-column mt-2'>
                        <label className='text-left' htmlFor='email'>E-mail</label>
                        <input className='form-control'
                               type='email' name='email' placeholder='E-mail' id='email' required
                               value={email} onChange={(evt) => setEmail(evt.target.value)}/>
                        <span className='invalid-feedback'></span>
                    </div>
                    <div className='col-12 d-flex flex-column mt-2'>
                        <label className='text-left' htmlFor='password'>Пароль</label>
                        <input className='form-control'
                               type='password' name='password' placeholder='Пароль' id='password' required
                               value={password} onChange={(evt) => setPassword(evt.target.value)}/>

                        <span className='invalid-feedback'></span>
                    </div>
                    <button className='btn btn-mdb-color btn-sm' type='submit' onClick={onSubmit}
                            onSubmit={onSubmit}>
                        Зарегистрироваться
                    </button>
                </form>
                {isLoading ?
                    <Loader message={'Ожидание ответа сервера...'}/> :
                    <p className='mt-3 text-danger'>{wasError}</p>
                }

            </section>
        </React.Fragment>
    );
};

export default Register;
