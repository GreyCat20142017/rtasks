export const KEYCODES = {
    ENTER: 13,
    ESC: 27
};

export const TASKS = {
    MAIN: {
        title: 'главная',
        component: null,
        comment: 'Тренировка на котиках. React (CRA), hooks, react-paginate, lodash, MDB'
    },
    TABLE: {
        title: 'таблица с данными', component: 'AppTable',
        comment: 'Получение данных, сортировка, фильтрация, пагинация, вывод детальной информации по строке таблицы.'
    },
    CHART: {title: 'ChartJS', component: 'AppChart', comment: 'Диаграмма по данным GitHub'}
};

export const TASKS_ORDER = [TASKS.MAIN, TASKS.TABLE, TASKS.CHART];