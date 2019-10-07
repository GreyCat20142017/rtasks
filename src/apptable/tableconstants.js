import {DATA_ROOT} from '../constants';

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
        name: 'тест', url: DATA_ROOT + 'data/test.json',
        title: 'Тестовые данные из папки приложения.'
    }
};

