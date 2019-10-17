import firebase from 'firebase/app';
import 'firebase/auth';
import {getColumns} from '../functions';

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

export const getRowMapResult = (row, fields) => {
    const obj = {};
    fields.forEach(field => (
        obj[field.name] = row[field.name] ? row[field.name] : field.defaultValue));
    return (obj);
};

/**
 * Candy
 */
export const getComposition = function (nutritionFacts) {
    const composition = {contents: '-', properties: '-', energy: '-'};
    if (nutritionFacts) {
        composition.contents = nutritionFacts.contents ? nutritionFacts.contents + '.' : '';
        composition.properties = '' + (nutritionFacts.sugar ? 'C сахаром, ' : 'Без сахара, ') +
            (nutritionFacts.gluten ? 'c глютеном, ' : 'без глютена, ') +
            (nutritionFacts.vegetarian ? 'вегетаринское. ' : 'не вегетаринское. ');
        composition.energy = nutritionFacts.energy ? nutritionFacts.energy : 'нет данных';
    }
    return composition;
};

export const getField = (data, fieldname, defaultValue = '-') => (
    data && data[fieldname] ? data[fieldname] : defaultValue
);

export const getDataWithId = (source) => {
    const result = [...source];
    if (result.length > 0) {
        const columns = getColumns(result);
        if (columns.indexOf('id') === -1) {
            result.forEach((row, ind) => {
                row['id'] = ind;
            });
        }
    }
    return result;
};

export const getTextForm = (sourceNumber, textForms) => {
    sourceNumber = Math.abs(sourceNumber) % 100;
    let temporaryNumber = sourceNumber % 10;
    if (sourceNumber > 10 && sourceNumber < 20) {
        return textForms[2];
    }
    if (temporaryNumber > 1 && temporaryNumber < 5) {
        return textForms[1];
    }
    if (temporaryNumber === 1) {
        return textForms[0];
    }
    return textForms[2];
};