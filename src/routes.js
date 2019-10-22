import React from 'react';

import AppChart from './appchart/AppChart';
import AppTable from './apptable/AppTable';
import AppMap from './appmap/AppMap';
import AppMain from './appmain/AppMain';
import AppFirebase from './appfirebase/AppFirebase';
import Login from './appfirebase/login/Login';
import Logout from './appfirebase/logout/Logout';
import Register from './appfirebase/register/Register';
import Profile from './appfirebase/profile/Profile';
import Disabled from './common/Disabled';
import ErrorBoundary from './errorboundary/ErrorBoundary';
import {DISABLED_COMPONENTS, MAP_TYPES} from './constants';

export const routes = {
    '/': () => <AppMain/>,
    '/chart': () =>  <ErrorBoundary message={''}> <AppChart/> </ErrorBoundary>,
    '/table': () => <AppTable/>,
    '/mapyandex': () => (DISABLED_COMPONENTS.indexOf(MAP_TYPES.YANDEX) >= 0 ?
        <Disabled/> :
        <ErrorBoundary> <AppMap mapType={MAP_TYPES.YANDEX} mapInit={null} geoInit={null}/> </ErrorBoundary>),
    '/map2gis': () => (DISABLED_COMPONENTS.indexOf(MAP_TYPES.GIS) >= 0 ?
        <Disabled/> :
        <ErrorBoundary> <AppMap mapType={MAP_TYPES.GIS} mapInit={null} geoInit={null}/> </ErrorBoundary>),
    '/firebase': () => <ErrorBoundary message={'Что-то не то с Firebase получилось.'}><AppFirebase/></ErrorBoundary>,
    '/login': () => <Login/>,
    '/register': () => <Register/>,
    '/profile': ()=> <Profile/>,
    '/logout': ()=> <Logout/>
};

