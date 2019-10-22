import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FIREBASE_URL, FIREBASE_URL_TYPE} from '../fireconstants';
import Loader from '../../common/loader/Loader';
import {Card} from './Card';

export const CardContainer = ({details, unsetDetails}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [rowDetails, setRowDetails] = useState(null);

    useEffect(() => {
        const url = FIREBASE_URL[FIREBASE_URL_TYPE.FIREBASE_API];
        const id = details.id;

        setIsLoading(true);
        axios.get(url + '/' + id + '.json', {timeout: 1000}).then(response => {
            const data = response ? response.data : null;
            setRowDetails(data);
            setIsLoading(false);
        }).catch(() => setIsLoading(false));

    }, [details.id]);

    return (
        isLoading ? <Loader/> : <Card details={rowDetails} unsetDetails={unsetDetails}/>
    );
};