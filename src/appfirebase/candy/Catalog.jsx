import React, {useEffect, useState} from 'react';

import {Card} from './Card';
import {KEYCODES} from '../../constants';

import SidenavSwitcher from './sidenav/SidenavSwitcher';
import Sidenav from './sidenav/Sidenav';
import {containsPattern} from '../../common/compoundtable/tablefunctions';
import {RUSSIAN_TITLES} from './catalogfilter/CatalogFilterComponents';

const FILTER_OPTION_TYPES = {kinds: 'kinds', facts: 'facts'};

export const containsPatternWithin = (itemObject, pattern) => (
    Object.keys(itemObject).reduce((rv, current) => (
        rv ||
        (typeof itemObject[current] === 'object' ? containsPattern(itemObject[current], pattern) :
            itemObject[current].toString().toLowerCase().includes(pattern.toLowerCase()))), false
    )
);

const getFilterOptions = (filterData, optionType) => (filterData[optionType] ?
    Object.keys(filterData[optionType]).filter(option => filterData[optionType][option]) : []);

const getSubHeader = (filterData) => {
    let text = 'Условия отбора: ';
    if (filterData) {
        const kinds = getFilterOptions(filterData, FILTER_OPTION_TYPES.kinds);
        const facts = getFilterOptions(filterData, FILTER_OPTION_TYPES.facts);
        text += kinds.length > 0 ? ' ' + kinds.join(', ') + '. ' : '';
        text += facts.length > 0 ? 'Только ' + facts.map(fact => RUSSIAN_TITLES[fact].toString().toLowerCase() || fact).join(', ') + '. ' : '';
        text += filterData.text ? 'Содержащие подстроку "' + filterData.text + '".' : '';
    }
    return text;
};

const getFilteredCatalog = (catalog, filterData) => {
    let filteredCatalog = [...catalog];
    if (filterData) {
        const kinds = getFilterOptions(filterData, FILTER_OPTION_TYPES.kinds);
        const facts = getFilterOptions(filterData, FILTER_OPTION_TYPES.facts);
        filteredCatalog = filteredCatalog.filter(elem => kinds.indexOf(elem.kind) >= 0);
        facts.forEach(prop => {
            filteredCatalog = filteredCatalog.filter(elem => (elem.nutritionFacts[prop] && true));
        });
        filteredCatalog = filterData.text ? filteredCatalog.filter(item => containsPatternWithin(item, filterData.text)) : filteredCatalog;
    }
    return filteredCatalog;
};

export const Catalog = ({catalog, closeCatalog}) => {

    const [isSidenavOpen, setIsSidenavOpen] = useState(false);
    const [filterData, setFilterData] = useState(null);
    const [filteredData, setFilteredData] = useState([...catalog]);

    useEffect(() => {
        const onKeyDown = (evt) => {
            if (evt.keyCode === KEYCODES.ESC) {
                evt.preventDefault();
                closeCatalog();
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [closeCatalog]);

    useEffect(() => {
        const kinds = {};
        const prices = {min: 0, max: 0};
        catalog.forEach(item => {
            kinds[item.kind] = true;
            prices.max = Math.max(parseInt(item['price']), prices.max);
        });
        setFilterData({
            kinds, prices, text: '',
            facts: {'sugar': false, 'gluten': false, 'vegetarian': false}
        });
    }, [catalog, setFilterData]);

    const switchSidenav = () => setIsSidenavOpen(!isSidenavOpen);

    const applyFilter = (newFilterData) => {
        setIsSidenavOpen(false);
        setFilterData(Object.assign({}, filterData, newFilterData));
        setFilteredData(getFilteredCatalog(catalog, newFilterData));
    };

    const cancel = () => (setIsSidenavOpen(false));

    return (
        <div className='mt-4 p-3 shadow-lg fixed-bottom h-100 w-100 bg-white text-center d-flex flex-column'>
            <div className='col-sm-12 col-md-10 mx-auto h-100'>
                <h5 className='h5-responsive pb-2'>Каталог продуктов (по мотивам Candyshop)</h5>
                <p className='mdb-color-text'><small>{getSubHeader(filterData)}</small></p>
                <div className='d-flex justify-content-between'>
                    <div>
                        <button className='btn btn-sm' title='Выход из просмотра каталога' onClick={closeCatalog}>
                            ESC-выход
                        </button>
                        <SidenavSwitcher isSidenavOpen={isSidenavOpen} switchSidenav={switchSidenav}/>
                    </div>
                    <p className='text-warning'><small>Народ жаждет Кэндишопа!</small><span
                        className='font-weight-bold'>&#9786;</span></p>
                </div>
                <div
                    className='shadow-sm w-100 h-100 d-flex flex-wrap justify-content-center shadow-sm w-100 h-100  overflow-auto'>

                    <Sidenav isOpen={isSidenavOpen} switchSidenav={switchSidenav} filterData={filterData}
                             applyFilter={applyFilter} cancel={cancel}/>

                    {filteredData && filteredData.length > 0 ?
                        filteredData.map((row, ind) =>
                            <Card key={ind} details={row} unsetDetails={closeCatalog} showComposition={false}/>
                        ) :
                        <p>Нет данных по выбранным критериям. Нужно проверить условия в фильтре.</p>
                    }

                </div>
            </div>

        </div>
    );
};