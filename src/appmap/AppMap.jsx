import React, {useState, useEffect} from 'react';
import update from 'immutability-helper'

import MapYandex from './MapYandex';

import MapForm from './mapform/MapForm';
import {getPlacemarkTitle} from './mapfunctions';
import {moveUp, moveDown} from '../functions';
// import {isPointInside} from './mapfunctions';
import {DEFAULT_POINTS, DEFAULT_POINT} from './mapconstants';
import {KEYCODES} from '../constants';


const AppMap = () => {
    const [routePoints, setRoutePoints] = useState([...DEFAULT_POINTS]);
    const [map, setMap] = useState(null);
    const [geoCollection, setGeoCollection] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);

    const onKeyDown = (evt) => {
        if (evt.keyCode === KEYCODES.ESC) {
            evt.preventDefault();
            setShowSidebar(false);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    });

    const onDeletePoint = (delIndex) => (
        setRoutePoints(routePoints.filter((item, index) => index !== delIndex))
    );

    const onUp = (ind) => (
        setRoutePoints(moveUp(routePoints, ind))
    );

    const onDown = (ind) => (
        setRoutePoints(moveDown(routePoints, ind))
    );

    const onChangeMarkerCoords = (index, newCoords) => (
        setRoutePoints(routePoints.map((item, ind) => (index === ind) ?
            Object.assign({}, item, {coords: [...newCoords], title: getPlacemarkTitle(newCoords)}) : item))
    );

    const onAddPoint = (name) => {
        if (name) {
            const newPointCoords = map ? map.getCenter() : DEFAULT_POINT.coords;
            setRoutePoints([...routePoints, {
                name: name,
                coords: [...newPointCoords],
                title: getPlacemarkTitle(newPointCoords)
            }]);
            // Зажабили Яндексы геокодинг без ключа, кажется... Ну, и ладно.
            // const result = isPointInside(name, map);
            // result.then(() => {
            //     const amount = result.getLength();
            //     if (amount > 0) {
            //         const props = result.get(0).properties.getAll();
            //         setRoutePoints([...routePoints, {
            //             name: props.name,
            //             coords: [...props.boundedBy[0]],
            //             title: props.boundedBy[0].join(' : ')}]);
            //     }
            // });

        } else {
            // console.log('out of map!');
            // const newPointCoords = DEFAULT_POINT.coords;
            // setRoutePoints([...routePoints, {name: , coords: [...newPointCoords]}]);
        }
    };

    const moveRow = (dragIndex, hoverIndex) => {
        const draggedPoint = routePoints[dragIndex]
        setRoutePoints(
            update(routePoints, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, draggedPoint]],
            }),
        )
    };

    return (
        <div className='row'>
            <div className={showSidebar ? 'd-block col-11 h-100 position-fixed fixed-center on-top' : 'd-none d-md-block col-4'}>
                <MapForm routePoints={routePoints} onDeletePoint={onDeletePoint} onAddPoint={onAddPoint}
                         onUp={onUp} onDown={onDown} moveRow={moveRow}/>
                {showSidebar ?
                    <button className='btn btn-mdb-color btn-sm' onClick={() => setShowSidebar(false)}>
                        закрыть форму (Esc)
                    </button> : null
                }
            </div>
            <div>
            <button className={showSidebar ? ' d-none' : 'btn btn-sm btn-mdb-color col-1 d-md-none'}
                    onClick={() => setShowSidebar(true)} title='открыть форму редактирования маршрута'>
                &#10148;<span className='visually-hidden'>открыть форму редактирования маршрута</span>
            </button>
            </div>
            <div className='col-10 col-md-8 border-light'>
                <MapYandex map={map} setMap={setMap} points={routePoints}
                           geoCollection={geoCollection} setGeoCollection={setGeoCollection}
                           onChangeMarkerCoords={onChangeMarkerCoords}/>
            </div>
        </div>
    );
};

export default AppMap;