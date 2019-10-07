import {chunk} from 'lodash';

import {PAGE_LIMIT} from './tableconstants';

export const containsPattern = (itemObject, pattern) => (
    Object.keys(itemObject).reduce((rv, current) => (
        rv || itemObject[current].toString().toLowerCase().includes(pattern.toLowerCase())), false
    )
);

export const getPreparedData = (content, sortField, sortDirection, filterValue) => (
    chunk(content.filter(item => containsPattern(item, filterValue)), PAGE_LIMIT)
);
