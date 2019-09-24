import firebase from 'firebase/app';
import 'firebase/auth';

export const getUser = (user) => {
    return user ? ({
        displayName: user.displayName,
        uid: user.uid,
        email: user.email
    }) : null;
};

export const getCurrentUserInfo = () => getUser(firebase.auth().currentUser);

export const getAuthUserProperty = (user, property = 'displayName') => (
    user ? user[property] : 'Гость'
);