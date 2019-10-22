export const KEYCODES = {
    ENTER: 13,
    ESC: 27
};

export const MAP_TYPES = {
    YANDEX: 'YANDEX',
    GIS: '2GIS'
};

export const DISABLED_COMPONENTS = [MAP_TYPES.YANDEX];

const url = window.location.origin;
export const APP_ROOT = ((url.match(/github\.io/gi)) ? '/rtasks' : '');

export const TASKS = {
    MAIN: {
        title: 'главная',
        component: null,
        comment: 'Тренировка на котиках. React (hooks) - CRA, react-paginate, lodash, chart.js, MDB, API карт, React-DnD, Firebase, hookrouter',
        href: '/'
    },
    TABLE: {
        title: 'таблица с данными', component: 'AppTable',
        comment: 'Получение данных, сортировка, фильтрация, пагинация, вывод детальной информации по строке таблицы.',
        href:  '/table'
    },
    CHART: {title: 'ChartJS', component: 'AppChart', comment: 'Диаграмма, вывод детальной информации. API GitHub, promise', href: '/chart'},
    MAP_YANDEX: {title: 'карта Yandex', component: 'AppMap', comment: 'Карта c маршрутом. API Yandex-карт, React-DnD', additionalParam: MAP_TYPES.YANDEX,
        href: '/mapyandex'},
    MAP_2GIS: {title: 'карта 2Gis', component: 'AppMap', comment: 'Карта c маршрутом. API 2Gis, React-DnD', additionalParam: MAP_TYPES.GIS,
        href:  '/map2gis'},
    FIREBASE: {title: 'Firebase', component: 'AppFirebase', comment: 'Firebase (регистрация, аутентификация, получение данных). Axios, async/await',
        href: '/firebase'}
};

export const TASKS_ORDER = [...Object.keys(TASKS).map(key => TASKS[key])].filter(
    task => !(task.additionalParam) || (DISABLED_COMPONENTS.indexOf(task.additionalParam) === -1));;

export const CONTROL_BUTTON_TYPES = {
    DELETE: {title: 'удалить', icon: '\u{2718}'},
    UP: {title: 'вверх', icon: '\u{2B06}'},
    DOWN: {title: 'вниз', icon: '\u{2B07}'}
};

export const DND_TYPES = {
    ROW: 'ROW'
};

export const MDB_COLOR='#59698d';