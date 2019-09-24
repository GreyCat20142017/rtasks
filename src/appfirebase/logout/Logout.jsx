import React, {useState, useEffect} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

// import UserContext from '../UserContext';
import Loader from '../../common/loader/Loader';

const Logout = () => {
    const [wasError, setWasError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    useEffect(()=> {
        const logout = () => {
            setIsLoading(true);
            setWasError(null);

            firebase.auth().signOut().then(() => {
                // setUser(null);
                setIsLoading(false);
            }).catch(error => {
                setWasError(error.message);
                setIsLoading(false);
            });
        };
        logout();
    }, []);


    return (
        isLoading ?
            <Loader message={'Ожидание ответа сервера...'}/> :
            <p className='mt-3 text-danger'>{wasError}</p>
    );
};

export default Logout;
