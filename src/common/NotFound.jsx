import React, {Fragment} from 'react';

import {getInlineSvg} from '../functions';
import {MDB_COLOR} from '../constants';

const NotFound = () => (
    <Fragment>
            <h1 className="visually-hidden">404</h1>
            <div className="row">
                <section className="col-12 col-md-6 text-center py-2 mx-auto">
                    {getInlineSvg('roger', 120, 120, MDB_COLOR, MDB_COLOR)}
                    <p className="h4-responsive" title="Страница не найдена">
                        Ошибка 404. Запрошенная страница не найдена.
                    </p>
                </section>
            </div>
    </Fragment>
);

export default NotFound;
