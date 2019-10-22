import React from 'react';
import {getInlineSvg} from '../../../functions';
import {MDB_COLOR} from '../../../constants';

const SidenavSwitcher = ({isSidenavOpen, switchSidenav}) => (
  <button className='btn btn-sm' title='Переключить боковую панель с фильтрами' onClick={switchSidenav}>
    {isSidenavOpen ? <span>&#10008;</span> : <span>{getInlineSvg('filter', 16,16, MDB_COLOR, MDB_COLOR)}</span>}
  </button>
);

export default SidenavSwitcher;

