import React from 'react';
import DropDown from './dropdown/DropDownHook';
import {navigate} from 'hookrouter';
import {getAuthUserProperty} from '../appfirebase/firebasefunctions';

const getUserMenuItems = (user) => {
    const items = [
        {key: '/register', link: '/register', text: 'Регистрация', hidden: !!(user)},
        {key: '/login', link: '/login', text: 'Вход', hidden: !!(user)},
        {key: '/profile', link: '/profile', text: 'Профиль', hidden: !(user)},
        {key: '/logout', link: '/logout', text: 'Выход', hidden: !(user)}
    ];
    return items.filter(item => !item.hidden);
};


const UserMenu = ({user}) => {
    const data = getUserMenuItems(user);
    const userMenuCallBack = (href) => navigate(href);

    return (
        <div className='d-flex justify-content-center'>
            <DropDown data={data} togglerText={getAuthUserProperty(user)} callback={userMenuCallBack} routerLink={true}
                      css={{
                          togglerCss: 'btn dropdown-toggle btn-sm btn-mdb-color',
                          linkCss: 'dropdown-item'
                      }}/>
        </div>
    );
};

export default UserMenu;