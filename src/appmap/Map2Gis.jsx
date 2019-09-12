import React, {useEffect} from 'react';
import {DEFAULT_POINT} from './mapconstants';

const Map2Gis = ({map}) => {
     useEffect(() => {
        if (!map) {
            initMap();
        }
        return removeListeners();
    });


    const initMap = () => {

    };

    const removeListeners = () => {

    };

    return (
        <div className="map map--api" id="id-map-api"
             title="Карта">
        </div>
    );
};

export default Map2Gis;