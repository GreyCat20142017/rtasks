import {getPlacemarkTitle} from './mapfunctions';

export const DELIMITER = ' : ';
export const POINT_TEXT = 'Точка ';

export const DEFAULT_POINT = {name: 'Центр по умолчанию', coords: [45.000, 40.000], title: getPlacemarkTitle([45.000, 40.000])};

export const DEFAULT_POINTS = [
   {name: POINT_TEXT + '1', coords: [45.201, 41.951], title: getPlacemarkTitle([45.201, 41.951])},
   {name: POINT_TEXT + '2', coords: [44.056, 43.044], title: getPlacemarkTitle([44.056, 43.044])}
];

export const GEO_REG_EXP = /[0-9]{1-2}:[0-9]{1-3}/;

export const YANDEX_PLACEMARK_PRESETS = {
  START_POINT: 'islands#redStretchyIcon',
  COMMON_POINT: 'islands#blueStretchyIcon'
};