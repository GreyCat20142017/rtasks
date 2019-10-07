import React, {useEffect, useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

import Loader from '../common/loader/Loader';
import {FIREBASE_URL, FIREBASE_URL_TYPE, IMAGE_PATH} from './fireconstants';
import {getComposition, getField} from './firebasefunctions';

const Stars = ({starsAmount, voiceAmount = null}) => {
    const stars = 'stars'.slice(0, starsAmount).split('');
    return (
        <p className='text-center p-0 m-0 my-1'
           title={'Звезд: ' + starsAmount + (voiceAmount ? ', голосов: ' + voiceAmount : '')}>
            {stars.map((star, ind) => <span key={ind} className='text-warning'>&#9733;</span>)}
        </p>
    );
};

const Rating = ({rating}) => {
    const starsAmount = parseInt(getField(rating, 'value'));
    const voiceAmount = parseInt(getField(rating, 'number'));
    return (
        <div className='shadow-sm'>
            <Stars starsAmount={starsAmount} voiceAmount={voiceAmount}/>
            <p className='p-0 m-0 text-center'>{voiceAmount} голосов</p>
        </div>
    );
};

const Composition = ({nutritionFacts}) => {
    const composition = getComposition(nutritionFacts);
    return (
        <div className='p-2'>
            <p>
                <small>
                    Состав: {getField(composition, 'contents')} {getField(composition, 'properties')}
                </small>
            </p>
            <p className=''>Энергетическая ценность: {getField(composition, 'energy')}</p>
        </div>
    );
};

const Image = ({details}) => (
    <div className='p-2 mx-auto'>
        <img className='img-thumbnail img-fluid' src={IMAGE_PATH + details.picture}
             alt={'Фото: ' + details.name}
             width='265'
             height='264'/>
    </div>
);

const Card = ({details, unsetDetails}) => (
    <div className='pt-4 px-2 w-100'>
        <article className='card mx-auto mdb-color-text' style={{maxWidth: '300px'}}>
            <header className='card-header'>
                <span className='font-weight-bold mdb-color-text'>{details.kind}</span>
                <h3 className='h3-responsive'>&laquo;{details.name}&raquo;</h3>
            </header>

            <div className='card-body'>
                <Image details={details}/>

                <div className='card-group justify-content-between'>
                    <span className='p-1'>Цена: {details.price}</span>
                    <span className='p-1'>Количество: {details.amount}</span>
                </div>
                {details.rating ? <Rating rating={details.rating}/> : null}
                {details.nutritionFacts ? <Composition nutritionFacts={details.nutritionFacts}/> : null}
                <div className='card-footer'>
                    <button className='btn btn-sm btn-mdb-color' onClick={() => unsetDetails()}>Закрыть</button>
                </div>
            </div>
        </article>
    </div>
);

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