import React, {useRef, useEffect} from 'react';
import {Chart} from 'chart.js';


const SimpleChart = ({chartTitle = 'Диаграмма', chartFooter = '', chartData = [], hidden = false}) => {

        const canvas = useRef(null);

        useEffect(() => {
            const ctx = canvas.current.getContext('2d');
            new Chart(ctx, chartData);
        });

        return (

            <div className={hidden ? 'hidden' : ''}>
                <h5 className='h5-responsive my-2'>{chartTitle}</h5>
                <canvas ref={canvas} id="simpleChart" width="270" height="100"></canvas>
                <p className='my-2'>{chartFooter}</p>
            </div>
        );
    }
;

export default SimpleChart;