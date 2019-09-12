import React, {useState} from 'react';

import MapForm from './mapform/MapForm';
import {DEFAULT_POINTS, DEFAULT_POINT} from './mapconstants';
import MapYandex from './MapYandex';
// import {isPointInside} from './mapfunctions';
import {getPlacemarkTitle} from './mapfunctions';

const AppMap = () => {
    const [routePoints, setRoutePoints] = useState([...DEFAULT_POINTS]);

    const [map, setMap] = useState(null);
    const [geoCollection, setGeoCollection] = useState(null);

    const onDeletePoint = (delIndex) => (
        setRoutePoints(routePoints.filter((item, index) => index !== delIndex))
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
            console.log('out of map!');
            // const newPointCoords = DEFAULT_POINT.coords;
            // setRoutePoints([...routePoints, {name: , coords: [...newPointCoords]}]);
        }
    };

    return (
        <div className='row'>
            <div className='col-4'>
                <MapForm routePoints={routePoints} onDeletePoint={onDeletePoint} onAddPoint={onAddPoint}/>
            </div>
            <div className='col-8 border-light'>
                <MapYandex map={map} setMap={setMap} points={routePoints}
                           geoCollection={geoCollection} setGeoCollection={setGeoCollection}
                           onChangeMarkerCoords={onChangeMarkerCoords}/>
            </div>
        </div>
    );
};

export default AppMap;