import React, {useContext} from 'react';

import UserContext from '../UserContext';
import SimpleTable from '../../common/simpletable/SimpleTable';

const Profile = () => {
    const {authUser} = useContext(UserContext);
    return (
        <React.Fragment>
            <h4>Профиль пользователя</h4>
            {authUser ?
                <SimpleTable details={authUser}/> :
                <p>Просмотр профиля возможен только для залогиненного пользователя</p>
            }
        </React.Fragment>
    );
};

export default Profile;