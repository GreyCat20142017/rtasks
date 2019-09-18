export const KEYCODES = {
    ENTER: 13,
    ESC: 27
};

export const MAP_TYPES = {
    YANDEX: 'YANDEX',
    GIS: '2GIS'
};

export const TASKS = {
    MAIN: {
        title: 'главная',
        component: null,
        comment: 'Тренировка на котиках. React (CRA), hooks, react-paginate, lodash, chart.js, MDB, Яндекс-карты, React-DnD'
    },
    TABLE: {
        title: 'таблица с данными', component: 'AppTable',
        comment: 'Получение данных, сортировка, фильтрация, пагинация, вывод детальной информации по строке таблицы.'
    },
    CHART: {title: 'ChartJS', component: 'AppChart', comment: 'Диаграмма по данным GitHub'},
    MAP_YANDEX: {title: 'карта Yandex', component: 'AppMap', comment: 'Карта c маршрутом, React-DnD', additionalParam: MAP_TYPES.YANDEX},
    MAP_2GIS: {title: 'карта 2Gis', component: 'AppMap', comment: 'Карта c маршрутом, React-DnD', additionalParam: MAP_TYPES.GIS}
};

export const TASKS_ORDER = [...Object.keys(TASKS).map(key => TASKS[key])];

const url = window.location.origin;
export const DATA_ROOT = (url.match(/github\.io/gi)) ? '' : '/';

export const CONTROL_BUTTON_TYPES = {
    DELETE: {title: 'удалить', icon: '\u{2718}'},
    UP: {title: 'вверх', icon: '\u{2B06}'},
    DOWN: {title: 'вниз', icon: '\u{2B07}'}
};

export const DND_TYPES = {
    ROW: 'ROW'
};

