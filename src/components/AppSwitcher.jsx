import React from 'react';
import {TASKS} from '../constants';
import AppTable from '../apps/AppTable';
import AppChart from '../apps/AppChart';

const AppSwitcher = ({component}) => {
    let rv = null;
    switch (component) {
        case TASKS.SOME: {
            rv = <AppChart/>;
            break;
        }
        case TASKS.TABLE: {
            rv = <AppTable/>;
            break;
        }
        default:
            rv = <React.Fragment>
                    <p className='mt-3'>Просто найденные на просторах интернета задания по React. </p>
                    <p>Без какой-либо общей идеи и реальной цели.</p>
                    <p>Исключительно для внесения разнообразия в учебные задачи.</p>
                </React.Fragment>;
    }
    return rv;
};

export default AppSwitcher;