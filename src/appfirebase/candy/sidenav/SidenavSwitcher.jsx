import React from 'react';

const SidenavSwitcher = ({isSidenavOpen, switchSidenav}) => (
  <button className='btn btn-sm' title='Переключить боковую панель с фильтрами' onClick={switchSidenav}>
    {isSidenavOpen ? <span>&#10008;</span> : <span>&#9776;</span>}
  </button>
);

export default SidenavSwitcher;

