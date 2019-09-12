import React, {useRef, useEffect, useState} from 'react';
import {Chart} from 'chart.js';

import DropDown from '../../common/dropdown/DropDownHook';
import {getDropDownData, transformToChartData} from '../chartfunctions';
import {CHART_TYPES} from '../chartconstants';

let chart = null;

const SimpleChart = ({data = [], chartTitle, chartFooter, onLegendClick, hidden = false}) => {
        const [chartType, setChartType] = useState(CHART_TYPES.BAR);
        const canvas = useRef(null);
        const chartData = transformToChartData(data, chartType, onLegendClick);

        useEffect(() => {
            drawChart();
        });

        const drawChart = () => {
            const ctx = canvas.current.getContext('2d');
            if (chart) {
                chart.destroy();
            }
            chart = new Chart(ctx, Object.assign({}, chartData, {type: chartType}));
        };

        const onChartTypeChange = (type) => {
            setChartType(type);
            drawChart();
        };

        return (
            <div className={hidden ? 'hidden' : ''}>
                <h5 className='h5-responsive my-2'>{chartTitle}</h5>
                <div className='d-flex mx-auto justify-content-center'>
                    <DropDown data={getDropDownData(CHART_TYPES)} dropdownSet={CHART_TYPES}
                              ariaInfo={'operation-dropdown'}
                              togglerText={chartType} callback={onChartTypeChange}
                              css={{
                                  togglerCss: 'btn btn-light-green btn-sm dropdown-toggle',
                                  linkCss: 'dropdown-item'
                              }}/>
                </div>
                <canvas ref={canvas} id="simpleChart" width="270" height="100"></canvas>
                <p className='my-2'>{chartFooter}</p>
            </div>
        );
    }
;

export default SimpleChart;