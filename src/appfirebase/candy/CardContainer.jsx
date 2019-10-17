import React, {useEffect, useState} from 'react';
import {FIREBASE_URL, FIREBASE_URL_TYPE} from '../fireconstants';
import firebase from 'firebase/app';
import 'firebase/database';
import Loader from '../../common/loader/Loader';
import {Card} from './Card';

export const CardContainer = ({details, unsetDetails}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [rowDetails, setRowDetails] = useState({});

    useEffect(() => {
        const url = FIREBASE_URL[FIREBASE_URL_TYPE.FIREBASE_DB];
        const id = details.id;

        setIsLoading(true);
        firebase.database().ref(url + '/' + id).once('value', (snapshot) => {
            setRowDetails(snapshot.val());
            setIsLoading(false);
        }).catch(() => setIsLoading(false));
    }, [details.id]);

    return (
        isLoading ? <Loader/> : <Card details={rowDetails} unsetDetails={unsetDetails}/>
    );
};