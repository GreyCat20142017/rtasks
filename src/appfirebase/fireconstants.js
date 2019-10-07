import {DATA_ROOT} from '../constants';

export const FIREBASE_URL_TYPE = {
    FIREBASE_API: 'api',
    FIREBASE_DB: 'db',
    JSON: 'JSON'
};

export const FIREBASE_URL = {
    [FIREBASE_URL_TYPE.FIREBASE_API]: 'https://rtasks-cacd5.firebaseio.com/candy.json',
    [FIREBASE_URL_TYPE.FIREBASE_DB]: '/candy',
    [FIREBASE_URL_TYPE.JSON]:  DATA_ROOT + '/data/candy.json'
};

export const FIELDS_LIST = [
    {name: 'name', defaultValue: '-'},
    {name: 'kind', defaultValue: '-'},
    {name: 'amount', defaultValue: 0},
    {name: 'price', defaultValue: 0},
    {name: 'weight', defaultValue: 0}
];

export const IMAGE_PATH = '/img/';