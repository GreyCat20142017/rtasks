import {DELIMITER} from './mapconstants';

export const getYmapsPoint = (point, ind) => {
    return new window.ymaps.GeoObject(
        {
            geometry: {
                type: 'Point',
                coordinates: [...point.coords]
            },
            properties: {
                iconContent: point.name,
                hintContent: point.title
            }
        },
        {
            preset: 'islands#blueStretchyIcon',
            draggable: true,
            isMarker: true,
            ind: ind
        }
    );
};

export const getYMapsRoute = (points) => {
    return new window.ymaps.GeoObject(
        {
            geometry: {
                type: 'LineString',
                coordinates: [...points.map(point => point.coords)]
            },
            properties: {
                hintContent: 'Маршрут'
            }
        }, {
            geodesic: true,
            strokeWidth: 2,
            strokeColor: 'blue'
        }
    );
};

export const isPointInside = (name, limits) => {
    return window.ymaps.geoQuery(window.ymaps.geocode(name)).searchInside(limits);
};

export const getPlacemarkTitle = (coords) => (
    coords.map(item => item.toFixed(3)).join(DELIMITER)
);