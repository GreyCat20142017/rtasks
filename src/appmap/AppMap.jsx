import React, {useState, useEffect} from 'react';
import update from 'immutability-helper';

import MapYandex from './MapYandex';
import Map2Gis from './Map2Gis';

import MapForm from './mapform/MapForm';
import {getCenterByMapType, getPlacemarkTitle} from './mapfunctions';
import {moveUp, moveDown} from '../functions';
import {DEFAULT_POINTS, DELIMITER} from './mapconstants';
import {KEYCODES, MAP_TYPES} from '../constants';

const AppMap = ({mapType, mapInit = null, geoInit = null}) => {
    const [routePoints, setRoutePoints] = useState([...DEFAULT_POINTS]);
    const [map, setMap] = useState(mapInit);
    const [geoCollection, setGeoCollection] = useState(geoInit);
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

    const on2GisMovePoint = (name, newCoords) => {
        const point = routePoints.find((item) => item.name === name);
        if (point) {
            setRoutePoints(routePoints.map(item => (item.name === name) ? ({
                name: name,
                coords: newCoords,
                title: newCoords.join(DELIMITER)
            }) : item));
        }
    };

    const onAddPoint = (name) => {
        if (name) {
            const newPointCoords = getCenterByMapType(map, mapType);
            setRoutePoints([...routePoints, {
                name: name,
                coords: [...newPointCoords],
                title: getPlacemarkTitle(newPointCoords, name)
            }]);
        }
    };

    const moveRow = (dragIndex, hoverIndex) => {
        const draggedPoint = routePoints[dragIndex];
        setRoutePoints(
            update(routePoints, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, draggedPoint]],
            }),
        );
    };

    return (
        <div className='row'>
            <div
                className={showSidebar ? 'd-block col-11 h-100 position-fixed fixed-center on-top' : 'd-none d-md-block col-4'}>
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
                {
                    mapType === MAP_TYPES.YANDEX ?
                        <MapYandex map={map} setMap={setMap} points={routePoints}
                                   geoCollection={geoCollection} setGeoCollection={setGeoCollection}
                                   onChangeMarkerCoords={onChangeMarkerCoords}/> :
                        mapType === MAP_TYPES.GIS ?
                            <Map2Gis map={map} setMap={setMap} points={routePoints}
                                     geoCollection={geoCollection} setGeoCollection={setGeoCollection}
                                     onChangeMarkerCoords={on2GisMovePoint}/> : null
                }
            </div>
        </div>
    );
};

export default AppMap;