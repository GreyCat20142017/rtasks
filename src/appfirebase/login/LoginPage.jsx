import React, {Fragment} from 'react';

import {getInlineSvg} from '../templateFunctions';
;
import LoginForm from './LoginForm';
import Main from './Main';

const LoginPage = ({logIn}) => (
    <React.Fragment>
        <section className="col-12 col-md-6 py-3 justify-content-center container">
            <h2 className='text-center'>Вход</h2>
            <LoginForm logIn={logIn}/>
        </section>
    </React.Fragment>
);

export default LoginPage;
