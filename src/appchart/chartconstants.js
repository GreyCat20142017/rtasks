import {APP_ROOT} from '../constants';

export const GIT_URLS = {
    PHPTEST: {
        name: 'Intensive-test',
        reposUrl: APP_ROOT + '/data/testRepos.json',
        userUrl: APP_ROOT + '/data/testUser.json',
        title: 'Тестовые данные по интенсиву (из папки приложения)'
    },
    TEST: {
        name: 'User-test',
        reposUrl: APP_ROOT + '/data/gitRepos.json',
        userUrl: APP_ROOT + '/data/gitUser.json',
        title: 'Тестовые данные по пользователю github (из папки приложения).'
    }
    // NODETEST: {
    //     name: 'Node-test',
    //     reposUrl: '/data/nodeRepos.json',
    //     userUrl: '/data/nodeUser.json',
    //     title: 'Тестовые данные по интенсиву (из папки приложения).'
    // },
    // REACTTEST: {
    //     name: 'React-test',
    //     reposUrl: '/data/reactRepos.json',
    //     userUrl: '/data/reactUser.json',
    //     title: 'Тестовые данные по интенсиву (из папки приложения).'
    // }
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
export const LIMIT = 50;
export const ACADEMY_PREFIX = 'htmlacademy-';
export const GIT_LINK_PARTS = {
    LINK: 'https://api.github.com/users/',
    PAGE: '/repos?page=',
    LIMIT: '&per_page=' + LIMIT
};

export const GIT_HOUR_LIMIT = 60;

export const CHART_CANVAS = {id: 'simpleChart', width: 270, height: 100};