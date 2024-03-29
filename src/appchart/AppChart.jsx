import React, {useState} from 'react';

import Loader from '../common/loader/Loader';
import SimpleChart from './chart/SimpleChart';
import Details from '../common/details/Details';
import GitUserForm from './form/GitUserForm';

import {
    getTotals,
    getTotalsField,
    transformUserData,
    transformReposData,
    getDetailsFields,
    getPreparedData,
    createPDFDefinition,
    getTotalDetails
} from './chartfunctions';
import {CHART_CANVAS, GIT_HOUR_LIMIT, GIT_LINK_PARTS, GIT_URLS, LIMIT} from './chartconstants';


const getPagesUrls = (tmpUser, url) => {
    const isGitData = (typeof url === 'string');
    let pages = [];
    if (isGitData) {
        const totalCount = tmpUser['reposCount'] ? tmpUser['reposCount'] : 0;
        const totalPages = Math.ceil(totalCount / parseInt(LIMIT, 10)) || 1;

        for (let i = 1; i <= totalPages; i++) {
            let repoUrl = isGitData ?
                url + GIT_LINK_PARTS.PAGE + (i) + GIT_LINK_PARTS.LIMIT :
                url.reposUrl;
            pages.push(repoUrl);
        }
    }
    return isGitData ? pages : [url.reposUrl];
};

const AppChart = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState({user: null, repos: []});
    const [wasError, setWasError] = useState(null);
    const [currentDetails, setCurrentDetails] = useState(null);

    const onError = (errorMessage) => {
        setWasError(errorMessage);
        setContent({user: null, repos: []});
        setIsLoading(false);
    };

    const getData = (url = GIT_URLS.TEST, canceled = false) => {

        setIsLoading(true);
        setWasError(false);

        fetch(typeof url === 'string' ? url : url.userUrl)
            .then(response => response.json())
            .then(userData => {
                if (!canceled) {
                    const tmpUser = transformUserData(userData);
                    const pages = getPagesUrls(tmpUser, url);

                    if (pages.length < GIT_HOUR_LIMIT) {
                        Promise.all(pages.map(page => fetch(page)))
                            .then(response => Promise.all(response.map(
                                response => response.json()
                            )))
                            .then(results => {
                                const jointData = [];
                                results.forEach(result => jointData.push(...result));
                                setContent({user: tmpUser, repos: transformReposData(jointData)});
                                setIsLoading(false);
                            }).catch(error => {
                            if (!canceled) {
                                onError('Произошла ошибка при получении данных о репозиториях');
                            }
                        });
                    } else {
                        onError('У github для неавторизованных пользователей ограничение на 60 запросов в час. Не стоит и пытаться выполнить запрос с таким количеством страниц.');
                    }
                }

            })
            .catch(error => {
                if (!canceled) {
                    onError('Произошла ошибка при получении данных пользователя');
                }
            });
    };

    const onLegendClick = (something) => {
        const fields = getDetailsFields(content);
        if (fields) {
            const filterField = getTotalsField(content);
            const details = content.repos.filter(
                repo => ((repo[filterField] === something) || (something === '?' && !repo[filterField]))).map(
                repo => fields.reduce((rv, field) => (rv + ' ' + repo[field]), ''));
            setCurrentDetails({details: details, title: something});
        }
    };

    const onTotalButtonClick = () => {
        if (content.user) {
            const {details, title} = getTotalDetails(content);
            setCurrentDetails({details, title});
        }
    };

    const onGitUserClick = (userName) => {
        if (userName !== '' && userName.match(/[A-Za-z\d_-]/)) {
            getData(GIT_LINK_PARTS.LINK + userName);
        } else {
            setWasError('В имени пользователя допустимы только латинские символы, цифры, дефис и подчеркивание');
        }
    };

    const makePdfOperation = (needOpen) => {
        if (window.pdfMake) {
            const canvas = document.getElementById(CHART_CANVAS.id);
            const canvasURL = canvas ? canvas.toDataURL() : null;
            const totalDetails = getTotalDetails(content);
            const docDefinition = createPDFDefinition(totalDetails, canvasURL);

            if (needOpen) {
                window.pdfMake.createPdf(docDefinition).open();
            } else {
                window.pdfMake.createPdf(docDefinition).download();
            }
        }
    };

    const onPdfOpenClick = () => {
        makePdfOperation(true);
    };

    const onPdfDownloadClick = () => {
        makePdfOperation(false);
    };


    return (
        <div>
            <h4 className='h4-responsive'>AppChart</h4>
            <div className="btn-group mt-2" role="group" aria-label="Получение данных">
                {Object.keys(GIT_URLS).map(item => (
                    <button className="btn btn-sm btn-outline-mdb-color mx-1 cloudy-knoxville-gradient" key={item}
                            onClick={() => getData(GIT_URLS[item])}
                            title={GIT_URLS[item].title}>
                        {GIT_URLS[item].name}
                    </button>
                ))}
            </div>
            <GitUserForm onGitUserClick={onGitUserClick}/>

            {isLoading ?
                <Loader/> :
                <React.Fragment>
                    {wasError ?
                        <p className='mt-2 text-danger d'><small>{wasError}</small></p> :
                        currentDetails ?
                            <Details details={currentDetails.details} title={currentDetails.title}
                                     unsetDetails={() => setCurrentDetails(null)}/> :
                            <React.Fragment>
                                <SimpleChart
                                    data={getPreparedData(getTotals(content.repos, getTotalsField(content)))}
                                    chartTitle={'Диаграмма ' + (content.user ? content.user.login : '')}
                                    chartFooter={content.user ? 'Всего публичных репозиториев: ' + content.user['reposCount'] : ''}
                                    onLegendClick={onLegendClick}
                                    hidden={!(content.user)}/>
                                <button
                                    className={'btn btn-sm btn-mdb-color ' + (content.user ? 'd-inline-block' : 'd-none')}
                                    type='button'
                                    onClick={onTotalButtonClick}>
                                    Итоги в виде таблицы
                                </button>
                                <button
                                    className={'btn btn-sm btn-mdb-color ' + (content.user ? 'd-inline-block' : 'd-none')}
                                    type='button' title='Cформировать и открыть PDF c диаграммой и таблицей'
                                    onClick={onPdfOpenClick}>
                                    Открыть PDF
                                </button>
                                <button
                                    className={'btn btn-sm btn-mdb-color ' + (content.user ? 'd-inline-block' : 'd-none')}
                                    type='button' title='Cформировать и скачать PDF c диаграммой и таблицей'
                                    onClick={onPdfDownloadClick}>
                                    Скачать PDF
                                </button>
                            </React.Fragment>
                    }
                </React.Fragment>
            }
        </div>
    );
};

export default AppChart;