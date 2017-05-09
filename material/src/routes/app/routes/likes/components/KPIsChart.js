import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const area = {};
area.options = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Acquisition', 'Revenue'],
    textStyle: {
      color: CHARTCONFIG.color.text
    }
  },
  toolbox: {
    show: false
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: ['Mata', 'Apesta.', 'Contalo.'],
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      }
    }
  ],
  yAxis: [
    {
      max: 3000,
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: CHARTCONFIG.color.splitArea
        }
      }
    }
  ],
  series: [
    {
      name: 'Cantidad ',
      type: 'bar',
      barCategoryGap: '35%',
      data: [1500, 600, 2000],
      itemStyle: {
        normal: {
          color: CHARTCONFIG.color.success
        }
      },
      lineStyle: {
        normal: {
          color: CHARTCONFIG.color.success
        }
      },
      areaStyle: {
        normal: {
          color: CHARTCONFIG.color.success
        }
      },
      symbol: 'diamond'
    }
  ]
};

const Chart = () => (
  <ReactEcharts style={{height: '400px'}} option={area.options} showLoading={false} />
);

module.exports = Chart;
