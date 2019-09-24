import React, {useContext} from 'react';
import {A, useRoutes} from 'hookrouter';

import UserContext from './appfirebase/UserContext';

import NotFound from './common/NotFound';
import {TASKS, TASKS_ORDER} from './constants';
import {routes} from './routes';
import {taskSearch, getAClassName} from './functions';
import UserMenu from './common/UserMenu';

const AppSwitcher = () => {
    const routeResult = useRoutes(routes);
    const task = taskSearch(window.location.pathname);
    const {authUser} = useContext(UserContext);

    return (
        <React.Fragment>
            <header>
                <h3 className='h3-responsive text-center'>Разные задачи c использованием React</h3>
                {TASKS_ORDER.map((item, ind) =>
                    <A href={TASKS_ORDER[ind]['href']}
                       className={getAClassName(TASKS_ORDER[ind].href)}
                       key={ind}
                       title={TASKS_ORDER[ind]['comment']}>{TASKS_ORDER[ind]['title']}
                    </A>
                )}
                <UserMenu user={authUser}/>
            </header>
            <hr/>
            <p><small>{TASKS[task]['comment']}</small></p>
            <hr/>
            {routeResult || <NotFound/>}
        </React.Fragment>
    );
};

export default AppSwitcher;