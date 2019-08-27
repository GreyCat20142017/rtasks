// const course = 'book';
// const lesson = 77;

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
    SOME: {title: 'что-то еще', component: 'AppSome', comment: 'Что-то будет когда-то'}
};

export const TASKS_ORDER = [TASKS.MAIN, TASKS.TABLE, TASKS.SOME];

export const DATA_URLS = {
    SMALL: {
        name: '20 слов',
        url: 'https://greycat20142017.github.io/pseudodb/rtasks20.json',
        title: 'Данные из удаленного источника. Могут быть временно недоступны.'
    },
    BIG: {
        name: '200 слов',
        url: 'https://greycat20142017.github.io/pseudodb/rtasks200.json',
        title: 'Данные из удаленного источника. Могут быть временно недоступны.'
    },
    TEST: {
        name: 'тест', url: '/data/test.json',
        title: 'Тестовые данные из папки приложения.'
    }
};


export const SORT_DIRECTIONS = {
    ASC: 'asc',
    DESC: 'desc'
};

export const PAGE_LIMIT = 10;