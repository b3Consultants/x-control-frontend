import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const data = [{
  value: 200,
  name: 'Mata',
}, {
  value: 50,
  name: 'Apesta'
}];

const pie = {};
pie.options = {
  title: {
    text: 'Mata/Apesta actuales',
    textStyle: {
      fontSize: 18,
      fontWeight: 100,
      color: '#000'
}
  },
  tooltip: {
    show: true,
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)'
  },
  legend: {
    show: false,
    orient: 'vertical',
    x: 'right',
    data: ['Mata', 'Apesta'],
  },
  series: [{
    type: 'pie',
    selectedMode: 'single',
    radius: ['40%', '52%'],
    color: [
      '#EFE04C',
      '#69D361',
      '#47DAB5',
      '#4AC3D6',
      '#5EA1DA',
    ],
    label: {
      normal: {
        position: 'outside',
        formatter: '{b}',
        textStyle: {
          fontSize: 12
        }
      }
    },
    labelLine: {
      normal: {
        show: true
      }
    },
    data,
    markPint: {
      symbol: 'diamond',
      data: [{symbol: 'diamond', }]
    }
  }]
};

const Chart = () => (
  <ReactEcharts style={{height: '400px'}} option={pie.options} showLoading={false} />
);

module.exports = Chart;
