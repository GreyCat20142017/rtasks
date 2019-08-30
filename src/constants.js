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
    SOME: {title: 'ChartJS', component: 'AppChart', comment: 'Диаграмма по данным GitHub'}
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


//git chart
export const GIT_URLS = {
    PHPTEST: {
        name: 'PHP',
        reposUrl: '/data/testRepos.json',
        userUrl: '/data/testUser.json',
        title: 'Данные из удаленного источника. Могут быть временно недоступны.'
    },
    TEST: {
        name: 'тест',
        reposUrl: '/data/gitRepos.json',
        userUrl: '/data/gitUser.json',
        title: 'Тестовые данные из папки приложения.'
    }
};

export const CHART_COLORS = [
    'rgba(58, 226, 103, 0.2)',
    'rgba(217, 217, 194, 0.2)',
    'rgba(89, 105, 141, 0.2)',
    'rgba(109, 138, 224, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(175, 38, 255, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
];

export const CHART_TYPES = {
    BAR: 'bar',
    PIE: 'pie',
    DOUGHNUT: 'doughnut'
};

export const GIT_TYPES = {
    INTENSIVE: 'intensive',
    USER: 'user'
};

export const ACADEMY_PREFIX = 'htmlacademy-';