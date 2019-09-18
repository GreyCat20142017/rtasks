import React from 'react';
import {MAP_TYPES, TASKS} from './constants';
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
        case TASKS.MAP_YANDEX: {
            // rv = (<ErrorBoundary> <AppMap mapType={MAP_TYPES.YANDEX} mapInit={null} geoInit={null}/> </ErrorBoundary>);
            //todo  Нужно подумать как избежать проблем с совместным использованием карт 2Gis и Yandex
            // при подобном частичном переиспользовании кода
            rv = (<ErrorBoundary>
                <button className='btn btn-mdb-color btn-sm' disabled>временно отключено</button>
            </ErrorBoundary>);
            break;
        }
        case TASKS.MAP_2GIS: {
            rv = (<ErrorBoundary> <AppMap mapType={MAP_TYPES.GIS} mapInit={null} geoInit={null}/> </ErrorBoundary>);
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