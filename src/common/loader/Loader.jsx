import React from 'react';

import logo from './logo.svg';
import './loader.css';

const Loader = ({message = 'Данные загружаются...'}) => (
     <div className='mx-auto'>
        <img  className='loader' src={logo}  witdh='80' height='80' alt='logo' />
        <small className='mdb-color-text'>{message}</small>
    </div>
);

export default Loader;