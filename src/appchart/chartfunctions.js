import {ACADEMY_PREFIX, CHART_CANVAS, CHART_COLORS, GIT_TYPES} from './chartconstants';

const isDigit = (str) => (str.match(/[0-9]/));

export const getIsAcademy = (text) => (text.includes(ACADEMY_PREFIX));

const parseName = (name, isAcademy) => {
    let [academyId, project, intensiveNumber] = ['?', '?', '?'];
    if (isAcademy) {
        const splitted = name.split('-');
        switch (splitted.length) {
            case 1: {
                [academyId, project, intensiveNumber] = ['?', splitted[0], '?'];
                break;
            }
            case 2: {
                [academyId, project, intensiveNumber] = isDigit(splitted[0]) ? [splitted[0], splitted[1], '?'] : (
                    isDigit(splitted[1]) ? ['?', splitted[0], splitted[1]] : ['?', splitted.join('-'), '?']
                );
                break;
            }
            default: {
                const [first, ...rest] = splitted;
                const middle = rest.slice(0, rest.length - 1);
                const last = rest[rest.length - 1];
                academyId = isDigit(first) ? first : '?';
                intensiveNumber = isDigit(last) ? last : '?';
                project = (academyId === '?' ? first + '-' : '') + middle.join('-') + (intensiveNumber === '?' ? '-' + last : '');
            }
        }
    }
    return ({
        academyId,
        project,
        intensiveNumber
    });
};

export const parseRepoInfo = (repo) => {
    const isAcademy = getIsAcademy(repo.html_url);
    const parsedName = parseName(repo.name, isAcademy);
    return ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        academyId: parsedName.academyId,
        project: parsedName.project,
        intensiveNumber: parsedName.intensiveNumber,
        homepage: repo.homepage,
        language: repo.language
    });
};

export const transformUserData = (data) =>
    ({
        id: data.id,
        login: data.login,
        type: data.login.toLowerCase().includes(ACADEMY_PREFIX) ? GIT_TYPES.INTENSIVE : GIT_TYPES.USER,
        reposCount: data.public_repos,
        profile: data.html_url
    });

export const transformReposData = (data) =>
    (data.map(item => parseRepoInfo(item)));

export const getTotals = (content, totalField = 'project') => {
    const totals = {};
    let fieldName = '?';
    content.forEach((repo) => {
        fieldName = repo[totalField] ? repo[totalField] : '?';
        totals[fieldName] = totals[fieldName] ? totals[fieldName] + 1 : 1;
    });
    return totals;
};

const getDark = (colors) => (colors.map(color =>
        (color.substring(0, color.lastIndexOf(',')) + ', 1)'))
);

export const transformToChartData = (sourceData, type, onLegendClick) => {
    const labels = [...sourceData.labels];
    return ({
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: sourceData.label,
                data: [...sourceData.data],
                backgroundColor: CHART_COLORS,
                borderColor: getDark(CHART_COLORS),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {beginAtZero: true}
                }]
            },
            onClick: (evt, item) => {
                if (item.length >= 0 && item[0]) {
                    onLegendClick(labels[parseInt(item[0]['_index'], 10)]);
                }
            }
        }
    });
};

export const getPreparedData = (totals) => {
    const keys = Object.keys(totals);
    const labels = keys;
    const data = keys.map(item => totals[item]);
    return ({
        label: 'количество репозиториев',
        data,
        labels
    });
};

export const getTotalsField = (content) => (
    (content.user && (content.user.type === GIT_TYPES.INTENSIVE)) ? 'project' : 'language'
);

export const getDetailsFields = (content) => (
    (content.user && content.repos) ?
        ((content.user.type === GIT_TYPES.INTENSIVE) ? ['academyId', 'description'] : ['name']) :
        null
);

export const getDropDownData = (operations) => {
    const keys = [...Object.keys(operations)];
    return keys.map(key => ({
        key: key,
        text: operations[key],
        link: key
    }));
};

export const getTotalDetails = (content) => {
    const details = {};
    let title = 'Нет данных';
    if (content.user) {
        const isAcademy = getIsAcademy(content.user.login);
        const fieldName = isAcademy ? 'project' : 'language';
        const uniqueIdCount = isAcademy ? content.repos.map(repo => repo.academyId).filter((v, i, a) => a.indexOf(v) === i).length : 0;
        const aboutId = isAcademy ? `. Из них с неповторяющимися Id академии - ${uniqueIdCount}` : ``;
        content.repos.forEach(repo => {
            let key = repo[fieldName] ? repo[fieldName] : '?';
            details[key] = details[key] ? details[key] + 1 : 1;
        });
        title = 'Всего репозиториев: ' + content.user.reposCount + aboutId + '. Разбивка по ' + (isAcademy ? 'проектам' : 'языкам') + ':';
    }
    return ({details, title, login: content.user ? content.user.login : ' ? '});
};


export const createPDFDefinition = (totalDetails, canvasURL) => {
    const ul = Object.keys(totalDetails.details).sort((b, a) => (parseInt(totalDetails.details[a]) - parseInt(totalDetails.details[b]))).map(key => [' ', key, totalDetails.details[key], ' ']);

    const headerTitle = 'Данные по ' + totalDetails.login + ' (' + (new Date()).toLocaleString('ru') + ')';

    const pdfContent = [
        {text: headerTitle, margin: 20, fontSize: 20, alignment: 'center'},
        {text: totalDetails.title, margin: 20, alignment: 'center'}
    ];

    if (canvasURL) {
        pdfContent.push({
            image: canvasURL,
            width: CHART_CANVAS.width,
            height: CHART_CANVAS.height,
            alignment: 'center',
            margin: 20
        });
    }

    pdfContent.push({
        layout: 'lightHorizontalLines',
        table: {
            widths: ['*', 'auto', 'auto', '*'],
            body: ul
        }
    });

    const docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        content: pdfContent,
        header: () => ({
            text: '',
            fontSize: 20,
            bold: true
        }),

        footer: (currentPage, pageCount) => {
            return ({
                text: currentPage.toString() + ' / ' + pageCount,
                alignment: 'center'
            });
        }
    };

    return docDefinition;
};