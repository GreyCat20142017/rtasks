export const KEYCODES = {
    ENTER: 13,
    ESC: 27
};

export const TASKS = {
    MAIN: {
        title: 'главная',
        component: null,
        comment: 'Тренировка на котиках. React (CRA), hooks, react-paginate, lodash, chart.js, MDB'
    },
    TABLE: {
        title: 'таблица с данными', component: 'AppTable',
        comment: 'Получение данных, сортировка, фильтрация, пагинация, вывод детальной информации по строке таблицы.'
    },
    CHART: {title: 'ChartJS', component: 'AppChart', comment: 'Диаграмма по данным GitHub'},
    MAP: {title: 'карта', component: 'AppMap', comment: 'Карта c маршрутом'}
};

export const TASKS_ORDER = [TASKS.MAIN, TASKS.TABLE, TASKS.CHART, TASKS.MAP];

const url = window.location.origin;
export const DATA_ROOT = (url.match(/github\.io/gi)) ? '' : '/';

export const MOUSE_BUTTONS = {
    LEFT: 1,
    RIGHT: 2
};

export const CONTROL_BUTTON_TYPES = {
    DELETE: {title: 'удалить', icon: '\u{2718}'},
    UP: {title: 'вверх', icon: '\u{2B06}'},
    DOWN: {title: 'вниз', icon: '\u{2B07}'}
}