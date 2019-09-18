import {DEFAULT_POINT, DELIMITER, YANDEX_PLACEMARK_PRESETS} from './mapconstants';
import {MAP_TYPES} from '../constants';

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
            preset: ind === 0 ? YANDEX_PLACEMARK_PRESETS.START_POINT : YANDEX_PLACEMARK_PRESETS.COMMON_POINT,
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

export const getPlacemarkTitle = (coords, name = '') => (
    Array.isArray(coords) ? name + ' - ' + coords.map(item => parseInt(item).toFixed(3)).join(DELIMITER) : name
);

export const getCenterByMapType = (map, mapType) => {
    if (map) {
        switch (mapType) {
            case MAP_TYPES.YANDEX: {
                return map ? map.getCenter() : DEFAULT_POINT.coords;
            }
            case MAP_TYPES.GIS: {
                const center = (map && map.mapa) ? map.mapa.getCenter() : null;
                return center ? [center.lat, center.lng] : DEFAULT_POINT.coords;
            }
            default: {
                return DEFAULT_POINT.coords;
            }
        }
    }
    return DEFAULT_POINT.coords;
};

export const getHtmlIcon = (ind) => (
    ind === 0 ?
        `<div class='icon-2gis icon-2gis--first'><span>${ind + 1}</span></div>` :
        `<div class='icon-2gis'><span>${ind + 1}</span></div>`
);