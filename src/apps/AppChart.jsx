import React, {useState} from 'react';
import Loader from '../components/loader/Loader';
import {CHART_TYPES, GIT_URLS} from '../constants';
import {
    getTotals,
    getTotalsField,
    transformUserData,
    transformReposData,
    transformToChartData,
    getDetailsFields
} from '../functions';
import SimpleChart from '../pie/SimpleChart';
import Details from '../components/details/Details';

const AppChart = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState({user: null, repos: []});
    const [wasError, setWasError] = useState(false);
    const [currentDetails, setCurrentDetails] = useState(null);

    const getReposData = async (url = GIT_URLS.TEST, canceled = false) => {
        return await fetch(url.reposUrl)
            .then(response => response.json())
            .then(data => (transformReposData(data))
            ).catch(() => {
                setWasError(true);
                return [];
            });
    };

    const getData = (url = GIT_URLS.TEST, canceled = false) => {
        setIsLoading(true);
        setWasError(false);

        fetch(url.userUrl)
            .then(response => response.json())
            .then(userData => {
                if (!canceled) {
                    setWasError(false);
                    getReposData(url).then(reposData => {
                        setIsLoading(false);
                        setContent({user: transformUserData(userData), repos: reposData});
                    });
                }
            })
            .catch(error => {
                if (!canceled) {
                    setWasError(true);
                    setContent({user: null, repos: []});
                    setIsLoading(false);
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

    return (
        <div>
            <h4 className='h4-responsive'>AppChart</h4>
            <div className="btn-group" role="group" aria-label="Получение данных">
                {Object.keys(GIT_URLS).map(item => (
                    <button className="btn btn-sm btn-outline-mdb-color" key={item}
                            onClick={() => getData(GIT_URLS[item])}
                            title={GIT_URLS[item].title}>
                        {GIT_URLS[item].name}
                    </button>
                ))}
            </div>
            {isLoading ?
                <Loader/> :
                <React.Fragment>
                    {wasError ?
                        <p className='mt-2'><small>Произошла ошибка при получении данных</small></p> :
                        currentDetails ?
                            <Details details={currentDetails.details} title={currentDetails.title}
                                     unsetDetails={() => setCurrentDetails(null)}/> :
                            <SimpleChart chartTitle={'Диаграмма ' + (content.user ? content.user.login : '')}
                                         chartFooter={content.user ? 'Всего публичных репозиториев: ' + content.user['reposCount'] : ''}
                                         chartData={transformToChartData(getTotals(content.repos, getTotalsField(content)), CHART_TYPES.BAR, onLegendClick)}
                                         hidden={!(content.user)}/>
                    }
                </React.Fragment>
            }
        </div>
    );
};

export default AppChart;