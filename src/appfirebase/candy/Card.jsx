import React from 'react';
import 'firebase/database';
import {IMAGE_PATH, STARS, STARS_PATTERN} from '../fireconstants';
import {getComposition, getField, getTextForm} from '../firebasefunctions';

const Stars = ({starsAmount, voiceAmount = null}) => {
    const max = STARS_PATTERN.length;
    const min = Math.max(Math.min(starsAmount, max), 0);
    const stars = STARS_PATTERN.slice(0, min).split('');
    const starsEmpty = starsAmount > 0 ? STARS_PATTERN.slice(0, max - min).split('') : STARS_PATTERN.split('');
    return (
        <p className='text-center p-0 m-0 my-1'
           title={'Звезд: ' + starsAmount + (voiceAmount ? ', голосов: ' + voiceAmount : '')}>
            {stars.map((star, ind) => <span key={ind} className='text-warning'>{STARS.STAR}</span>)}
            {starsEmpty.map((star, ind) => <span key={'e-' + ind} className='text-warning'>{STARS.STAR_EMPTY}</span>)}
        </p>
    );
};

export const Rating = ({rating}) => {
    const starsAmount = parseInt(getField(rating, 'value'));
    const voiceAmount = parseInt(getField(rating, 'number'));
    return (
        <div className='shadow-sm'>
            <Stars starsAmount={starsAmount} voiceAmount={voiceAmount}/>
            <p className='p-0 m-0 text-center'>{voiceAmount} {getTextForm(voiceAmount, ['голос', 'голоса', 'голосов'])}</p>
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

const CardError = ({unsetDetails}) => (
    <>
        <header className='card-header' style={{minHeight: '110px'}}>
            <span className='font-weight-bold mdb-color-text'>Не удалось получить данные о продукте</span>
        </header>
        <div className='card-footer'>
            <button className='btn btn-sm btn-mdb-color' onClick={() => unsetDetails()}>Закрыть</button>
        </div>
    </>
);

export const Card = ({details, unsetDetails, showComposition = true}) => (
    <div className='pt-4 px-2'>
        <article className='card mx-auto mdb-color-text' style={{maxWidth: '300px'}}>
            {details ?
                <>
                    <header className='card-header' style={{minHeight: '110px'}}>
                        <span className='font-weight-bold mdb-color-text'>{details.kind}</span>
                        <h4 className='h4-responsive'>&laquo;{details.name}&raquo;</h4>
                    </header>

                    <div className='card-body position-relative'>
                        <Image details={details}/>
                        <span className='btn circle position-absolute btn-mdb-color text-white p-2'
                              style={{top: '5px', right: '20px', borderRadius: '50%'}}>
                            {details.weight || ''} г
                        </span>
                        <div className='card-group justify-content-between'>
                            <span className='p-1'>Цена: {details.price}</span>
                            <span className='p-1'>Количество: {details.amount}</span>
                        </div>
                        {details.rating ? <Rating rating={details.rating}/> : null}
                        {details.nutritionFacts && showComposition ?
                            <Composition nutritionFacts={details.nutritionFacts}/> : null}
                        <div className='card-footer'>
                            <button className='btn btn-sm btn-mdb-color' onClick={() => unsetDetails()}>Закрыть</button>
                        </div>
                    </div>
                </> :
                <CardError unsetDetails={unsetDetails}/>
            }
        </article>
    </div>
);

