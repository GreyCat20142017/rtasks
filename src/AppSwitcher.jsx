import React from 'react';
import {TASKS} from './constants';
import AppTable from './apptable/AppTable';
import AppChart from './appchart/AppChart';
import AppMap from './appmap/AppMap';
import ErrorBoundary from './errorboundary/ErrorBoundary';

const AppSwitcher = ({component}) => {
    let rv = null;
    switch (component) {
        case TASKS.CHART: {
            rv = <AppChart/>;
            break;
        }
        case TASKS.TABLE: {
            rv = <AppTable/>;
            break;
        }
        case TASKS.MAP: {
            rv = (<ErrorBoundary> <AppMap/> </ErrorBoundary>);
            // rv = (<ErrorBoundary> <button className='btn btn-mdb-color btn-sm' disabled>временно отключено</button> </ErrorBoundary>);
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