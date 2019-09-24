import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import App from './App';
import './mdbcss/bootstrap.min.css';
import './mdbcss/mdb.min.css';
import './index.css';

import {APP_ROOT} from './constants';
import {setBasepath} from 'hookrouter';
setBasepath(APP_ROOT);


ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
