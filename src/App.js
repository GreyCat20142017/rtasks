import React, {useEffect, useState} from 'react';

import firebase from 'firebase/app';
import {firebaseConfig} from './config';

import AppSwitcher from './AppSwitcher';
import {TASKS_ORDER} from './constants';

function App() {
    const [task, setTask] = useState(0);
    useEffect(()=> {
        try {
            firebase.initializeApp(firebaseConfig);
        } catch (e) {

        }
    });
    
    return (
        <div className="container py-3">
            <div className='col-12 col-md-10 mx-auto text-center'>

                <header>
                    <h3 className='h3-responsive text-center'>Разные задачи c использованием React</h3>

                    {TASKS_ORDER.map((item, ind) =>
                        <button className={'btn btn-sm ' + (ind === task ? '' : ' btn-mdb-color ')} key={ind} type='button'
                                title={TASKS_ORDER[ind]['comment']}
                                onClick={() => setTask(ind)}>{TASKS_ORDER[ind]['title']}</button>
                    )}

                    <hr/>
                    <p><small>{TASKS_ORDER[task]['comment']}</small></p>
                    <hr/>
                </header>

                <main>
                    <AppSwitcher component={TASKS_ORDER[task]}/>
                </main>

            </div>
        </div>
    );
}

export default App;
