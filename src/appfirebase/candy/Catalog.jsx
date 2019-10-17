import React, {useEffect, useState} from 'react';

import {Card} from './Card';
import {KEYCODES} from '../../constants';

// const Filter = ({fields}) => (
//     typeof fields === 'object' ? Object.keys(fields).map(key => <span>{key}</span>) : null
// );
// <Filter fields={catalog && Array.isArray(catalog) && catalog.length > 0 ? catalog[0] : undefined} />

const CATALOG_TABS = {
    CATALOG: '#catalog',
    PDF: '#pdf'
};

export const Catalog = ({catalog, closeCatalog}) => {

    const [tab, setTab] = useState(CATALOG_TABS.CATALOG);

    const onKeyDown = (evt) => {
        if (evt.keyCode === KEYCODES.ESC) {
            evt.preventDefault();
            closeCatalog();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    });

    return (
        <div className='mt-4 p-3 shadow-lg fixed-bottom h-100 w-100 bg-white text-center d-flex flex-column'>
            <h5 className='h5-responsive pb-2'>Каталог</h5>
            <ul className='nav nav-tab mx-auto' id='myTab' role='tablist'>
                <li className='nav-item'>
                    <button className={'btn m-0 btn-sm ' + (tab === CATALOG_TABS.CATALOG ? '' : ' btn-mdb-color')}
                            id='home-tab' data-toggle='tab' role='tab'
                            onClick={() => setTab(CATALOG_TABS.CATALOG)}
                            aria-controls='Обычный'
                            aria-selected='true'>Обычный
                    </button>
                </li>
                <li className='nav-item'>
                    <button className={'btn m-0 btn-sm ' + (tab === CATALOG_TABS.PDF ? '' : ' btn-mdb-color')}
                            id='profile-tab' data-toggle='tab' href={CATALOG_TABS.PDF} role='tab'
                            onClick={() => setTab(CATALOG_TABS.PDF)}
                            aria-controls='PDF'
                            aria-selected='false'>PDF
                    </button>
                </li>
            </ul>

            <div
                className='shadow-sm col-sm-12 col-md-10 mx-auto d-flex flex-wrap justify-content-center flex-grow-1 overflow-auto'>
                {tab === CATALOG_TABS.PDF ?  <p>something</p> :
                    catalog.map((row, ind) =>
                    <Card key={ind} details={row} unsetDetails={closeCatalog} showComposition={false}/>
                )}
            </div>
        </div>
    );
};