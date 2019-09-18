import React, {useEffect} from 'react';

import {DEFAULT_POINT} from './mapconstants';
import {getHtmlIcon, getPlacemarkTitle} from './mapfunctions';

const Map2Gis = ({map, setMap, geoCollection, setGeoCollection, points, onChangeMarkerCoords}) => {
    useEffect(() => {
        const initMap = () => {
            window.DG.then(function () {
                const mapa = window.DG.map('id-map-api', {
                    'center': DEFAULT_POINT.coords,
                    'zoom': 6
                });
                setMap(mapa);
            });
        };
        if (!map) {
            initMap();
        }
    });

    useEffect(() => {
            if (map && !geoCollection) {
                const geoCollection = window.DG.featureGroup();
                geoCollection.addTo(map);
                setGeoCollection(geoCollection);
            }
        }, [map, geoCollection, setGeoCollection]
    );


    useEffect(() => {
        const onMarkerDragEnd = (e) => {
            const marker = e.target;
            const lat = marker._latlng.lat.toFixed(3);
            const lng = marker._latlng.lng.toFixed(3);
            onChangeMarkerCoords(marker.options.alt, [lat, lng]);
        };

        const refreshMap = () => {
            geoCollection.eachLayer(layer => {
                layer.clearAllEventListeners();
                geoCollection.removeLayer(layer);
            });
            setGeoCollection(geoCollection);
            points.forEach((point, ind) => {
                window.DG.marker([...point.coords], {
                    draggable: true,
                    title: getPlacemarkTitle(point.coords, point.name),
                    alt: point.name,
                    icon: window.DG.divIcon({html: getHtmlIcon(ind)})
                }).on('dragend', onMarkerDragEnd).addTo(geoCollection);
            });
            window.DG.polyline(points.map(point => point.coords), {
                color: '#59698d',
                weight: 2,
                opacity: 0.5
            }).addTo(geoCollection);
            geoCollection.addTo(map);
        };
        if (map && geoCollection) {
            refreshMap();
        }
    }, [points, map, geoCollection, setGeoCollection, onChangeMarkerCoords]);


    return (
        <div className='map map--api' id='id-map-api'>
        </div>
    );
};


export default Map2Gis;