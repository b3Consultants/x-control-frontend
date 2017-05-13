import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const option = {
  title : {
        text: 'Listeners',
        subtext: 'por hora'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['Movil','Escritorio','Otros']
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['9:00am','10:00am','11:00am','12:00pm','1:00pm','2:00pm','3:00pm']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'Movil',
            type:'line',
            stack: '',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'Escritorio',
            type:'line',
            stack: '',
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'Otros',
            type:'line',
            stack: '',
            data:[150, 232, 201, 154, 190, 330, 410]
        }
    ]
};



const Chart = () => (
  <ReactEcharts style={{height: '400px'}} option={option} showLoading={false} />
);

module.exports = Chart;
