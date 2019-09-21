import firebase from 'firebase/app';
import 'firebase/auth';

export const getCurrentUserId = () => {
    const user = firebase.auth().currentUser;
    return user ? user.uid : null;
};

export const getCurrentUserInfo = () => {
    const user = firebase.auth().currentUser;
    console.log(user);
    return user ?
        ({
            name: user.displayName,
            email: user.email,
            id: user.uid
        }) :
        null;
};