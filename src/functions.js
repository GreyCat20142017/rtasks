import {ACADEMY_PREFIX, GIT_TYPES, CHART_COLORS} from './constants';

export const parseRepoInfo = (repo) => {
    const [academyId, project, intensiveNumber] = repo.name.split('-');
    return ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        academyId,
        project,
        intensiveNumber,
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

export const transformToChartData = (totals, type, onLegendClick) => {
    const keys = Object.keys(totals);
    const labels = keys;
    const data = keys.map(item => totals[item]);

    return ({
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: 'количество репозиториев',
                data: data,
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
            'onClick': (evt, item) => {
                if (item.length >= 0 && item[0]) {
                    onLegendClick(labels[parseInt(item[0]['_index'], 10)]);
                }
            }
        }
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
