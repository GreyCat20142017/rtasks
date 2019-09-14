import React, {useEffect} from 'react';
import {DEFAULT_POINT} from './mapconstants';
import {getYmapsPoint, getYMapsRoute} from './mapfunctions';

const MapYandex = ({map, setMap, geoCollection, setGeoCollection, points, onChangeMarkerCoords}) => {

    useEffect(() => {
        const initMap = () => {
            const mapa = new window.ymaps.Map('id-map-api', {
                center: DEFAULT_POINT.coords,
                zoom: 6
            });
            mapa.behaviors.disable('scrollZoom');
            mapa.controls.remove('searchControl').remove('trafficControl').remove('geolocationControl').remove('typeSelector');
            setMap(mapa);
        };
        if (!map && window.ymaps) {
            window.ymaps.ready(initMap);
        }
    });

    useEffect(() => {

        if (map && window.ymaps) {
            let geo = new window.ymaps.GeoObjectCollection({}, {
                preset: 'islands#redCircleIcon',
                strokeWidth: 4,
                geodesic: true
            });
            map.geoObjects.add(geo);
            setGeoCollection(geo);
        }
    }, [map, setGeoCollection]);


    useEffect(() => {
        const onMarkerDragEnd = (e) => {
            const obj = e.get('target');
            if (obj.options.get('isMarker')) {
                const placemarkCoords = map.options.get('projection').fromGlobalPixels(
                    map.converter.pageToGlobal(e.get('position')),
                    map.getZoom()
                );
                onChangeMarkerCoords(obj.options.get('ind'), placemarkCoords);
            }
        };

        const refreshMap = () => {
            geoCollection.removeAll();
            points.forEach((point, ind) => {
                let marker = getYmapsPoint(point, ind);
                geoCollection.add(marker);
                marker.events.add('dragend', onMarkerDragEnd);
            });
            const polyline = getYMapsRoute(points);
            geoCollection.add(polyline);
        };
        if (geoCollection) {
            refreshMap();
        }
    }, [points, geoCollection, map, onChangeMarkerCoords]);


    return (
        <div className='map map--api' id='id-map-api'>
        </div>
    );
};

export default MapYandex;