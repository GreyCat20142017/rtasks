import {CONTROL_BUTTON_TYPES} from './constants';

export const moveDown = (sourceArr, ind) => {
    if (sourceArr.length <= 1) {
        return sourceArr;
    }
    const arr = [...sourceArr];
    if (ind !== arr.length - 1) {
        [arr[ind], arr[ind + 1]] = [arr[ind + 1], arr[ind]];
        return arr;
    }
    const moved = arr.pop();
    return [moved, ...arr];
};

export const moveUp = (sourceArr, ind) => {
    if (sourceArr.length <= 1) {
        return sourceArr;
    }
    const arr = [...sourceArr];
    if (ind !== 0) {
        [arr[ind], arr[ind - 1]] = [arr[ind - 1], arr[ind]];
        return arr;
    }
    const moved = arr.shift();
    return [...arr, moved];
};

export const getButtonTypeClass = (buttonType) => (buttonType === CONTROL_BUTTON_TYPES.DELETE ? ' btn-primary ' : ' btn-mdb-color ');