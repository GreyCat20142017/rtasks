import React, {useState, useEffect} from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import UserContext from './appfirebase/UserContext';
import {getUser} from './appfirebase/firebasefunctions';
import AppSwitcher from './AppSwitcher';

import {firebaseConfig} from './config';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const App = () => {
    const [authUser, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => setUser(getUser(user)));
    }, []);

    return (
        <UserContext.Provider value={{authUser, setUser}}>
            <div className="container py-3">
                <div className='col-12 col-md-10 mx-auto text-center'>
                    <main>
                        <AppSwitcher/>
                    </main>
                </div>
            </div>
        </UserContext.Provider>
    );
};

export default App;
