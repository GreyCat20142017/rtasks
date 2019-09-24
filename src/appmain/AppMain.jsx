import React from 'react';
import {getInlineSvg} from '../functions';
import {MDB_COLOR} from '../constants';

const AppMain = () => (
    <React.Fragment>
        <p className='mt-3'>Просто найденные на просторах интернета задания по React.</p>
        {getInlineSvg('rtasks', 100, 100, MDB_COLOR, MDB_COLOR)}
        <p>Без какой-либо общей идеи и реальной цели.</p>
        <p>Исключительно для внесения разнообразия в учебные задачи.</p>
    </React.Fragment>
);

export default AppMain;