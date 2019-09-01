import React, {useState} from 'react';

import Loader from '../common/loader/Loader';
import SimpleChart from './chart/SimpleChart';
import Details from '../common/details/Details';
import GitUserForm from './form/GitUserForm';
import ProgressBar from '../common/progressbar/Progressbar';

import {
    getTotals,
    getTotalsField,
    transformUserData,
    transformReposData,
    getDetailsFields, getPreparedData
} from './chartfunctions';
import {GIT_LINK_PARTS, GIT_URLS, LIMIT} from './chartconstants';


const AppChart = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState({user: null, repos: []});
    const [wasError, setWasError] = useState(null);
    const [currentDetails, setCurrentDetails] = useState(null);
    const [currentProgress, setCurrentProgress] = useState(0);

    const getReposData = async (url = GIT_URLS.TEST.reposUrl, canceled = false) => {
        return await fetch(url)
            .then(response => response.json())
            .then(data => (transformReposData(data))
            ).catch(() => {
                setWasError('Произошла ошибка при получении данных репозиториев');
                return [];
            });
    };

    const getData = (url = GIT_URLS.TEST, canceled = false) => {
        let tmpRepos = [];
        let tmpUser = null;
        setIsLoading(true);
        setWasError(false);

        fetch(typeof url === 'string' ? url : url.userUrl)
            .then(response => response.json())
            .then(userData => {
                if (!canceled) {
                    tmpUser = transformUserData(userData);
                    const totalCount = tmpUser['reposCount'] ? tmpUser['reposCount'] : 0;
                    const totalPages = Math.ceil(totalCount / parseInt(LIMIT, 10)) || 1;
                    for (let i = 1; i <= totalPages; i++) {
                        let repoUrl = (typeof url === 'string') ?
                            url + GIT_LINK_PARTS.PAGE + (i) + GIT_LINK_PARTS.LIMIT :
                            url.reposUrl;
                        setCurrentProgress(Math.ceil(i) / totalPages);

                        getReposData(repoUrl).then(reposData => {
                            tmpRepos.push(...reposData);
                        }).then(() => {
                            setIsLoading(true);
                            setContent({user: tmpUser, repos: [...tmpRepos]});
                        }).then(() => setIsLoading(false));
                    }
                }
            })
            .catch(error => {
                if (!canceled) {
                    setWasError('Произошла ошибка при получении данных пользователя');
                    setContent({user: null, repos: []});
                    setIsLoading(false);
                }
            })
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

    const onGitUserClick = (userName) => {
        if (userName !== '' && userName.match(/[A-Za-z\d_-]/)) {
            getData(GIT_LINK_PARTS.LINK + userName);
        } else {
            setWasError('В имени пользователя допустимы только латинские символы, цифры, дефис и подчеркивание');
        }
    };

    return (
        <div>
            <h4 className='h4-responsive'>AppChart</h4>
            <div className="btn-group" role="group" aria-label="Получение данных">
                {Object.keys(GIT_URLS).map(item => (
                    <button className="btn btn-sm btn-outline-mdb-color mx-1" key={item}
                            onClick={() => getData(GIT_URLS[item])}
                            title={GIT_URLS[item].title}>
                        {GIT_URLS[item].name}
                    </button>
                ))}
            </div>
            <GitUserForm onGitUserClick={onGitUserClick}/>

            {isLoading ?
                <React.Fragment>
                    <Loader/>
                    <ProgressBar current={currentProgress} max={100}/>
                </React.Fragment> :
                <React.Fragment>
                    {wasError ?
                        <p className='mt-2 text-danger'><small>{wasError}</small></p> :
                        currentDetails ?
                            <Details details={currentDetails.details} title={currentDetails.title}
                                     unsetDetails={() => setCurrentDetails(null)}/> :
                            <SimpleChart
                                data={getPreparedData(getTotals(content.repos, getTotalsField(content)))}
                                chartTitle={'Диаграмма ' + (content.user ? content.user.login : '')}
                                chartFooter={content.user ? 'Всего публичных репозиториев: ' + content.user['reposCount'] : ''}
                                onLegendClick={onLegendClick}
                                hidden={!(content.user)}/>
                    }
                </React.Fragment>
            }
        </div>
    );
};

export default AppChart;