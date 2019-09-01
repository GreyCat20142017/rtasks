import React from 'react';

const ProgressBar = ({current, max = 100}) => (
    <div className='progress'
         style={{height: '20px', display: Math.ceil(current) >= max ? 'none' : 'block'}}>
        <div className='progress-bar mdb-color' role='progressbar'
             style={{width : Math.ceil(current) + '%', height: '20px'}} aria-valuenow={current}
             aria-valuemin='0' aria-valuemax={max}>
            {current}%
        </div>
    </div>
);
export default ProgressBar;