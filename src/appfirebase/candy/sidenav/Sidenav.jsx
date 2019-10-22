import React from 'react';

import Darken from './Darken';
import CatalogFilter from '../catalogfilter/CatalogFilter';

const Sidenav = (props) => {

    return (
        <Darken {...props} switchMethod='switchSidenav'>
            <nav className={'shadow bg-white p-3'} style={{width: '270px', height: '100%', zIndex: 101}}>
                {props.filterData ?
                    <CatalogFilter filterData={props.filterData} applyFilter={props.applyFilter}
                                   cancel={props.cancel}/> :
                    null}
            </nav>
        </Darken>
    );
};

export default Sidenav;



