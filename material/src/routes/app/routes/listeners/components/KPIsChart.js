import React from 'react';
import CHARTCONFIG from 'constants/ChartConfig';
import axios from 'axios';
import PropTypes from 'prop-types';
import echarts from 'echarts';
import 'echarts/theme/macarons';

import elementResizeEvent from 'element-resize-event';

const area = {};
area.options = {
  title : {
        text: 'Listeners',
        subtext: 'actuales '
    },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Cantidad', 'Dispositivo'],
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
      data: ['Movil', 'Desktop.', 'Otros.'],
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
      name: 'Usuarios',
      type: 'bar',
      barCategoryGap: '35%',
      data: [0, 0, 0],
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

function maxof(array) {
  let max = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}
function getInfo() {
  axios.get('http://localhost:8080/realtime/getListenersInfo')
    .then((response) => {
      const array = [response.data.mobile, response.data.desktop, response.data.others];
      area.options.series[0].data = array;
      area.options.yAxis[0].max = maxof(array);
    })
    .catch((err) => {
      console.log(err);
    });
}

setInterval(() => {
  getInfo();
}, 1000);


class ListenersChart extends React.Component {
  propTypes: {
    option: PropTypes.object.isRequired,
    notMerge: PropTypes.bool,
    lazyUpdate: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    theme: PropTypes.string,
    onChartReady: PropTypes.func,
    showLoading: PropTypes.bool,
    loadingOption: PropTypes.object,
    onEvents: PropTypes.object
  }

  // first add
  componentDidMount() {
    const echartObj = this.renderEchartDom();
    const onEvents = this.props.onEvents || {};
    let reizeEvent;

    this.bindEvents(echartObj, onEvents);
    // on chart ready
    if (typeof this.props.onChartReady === 'function') this.props.onChartReady(echartObj);

    function resize() {
      clearTimeout(reizeEvent);
      reizeEvent = setTimeout(() => { echartObj.resize(); }, 200);
    }

    // on resize
    elementResizeEvent(this.echartsDom, () => {
      resize();
    });
  }

  // update
  componentDidUpdate() {
    this.renderEchartDom();
    this.bindEvents(this.getEchartsInstance(), this.props.onEvents || []);
  }

  // remove
  componentWillUnmount() {
    echarts.dispose(this.echartsDom);
  }

  // bind the events
  bindEvents(instance, events) {
    const loop = function loop(eventName) {
      // ignore the event config which not satisfy
      if (typeof eventName === 'string' && typeof events[eventName] === 'function') {
        // binding event
        instance.off(eventName);
        instance.on(eventName, (param) => {
          events[eventName](param, instance);
        });
      }
    };

    for (const eventName in events) {
      loop(eventName);
    }

  }

  // render the dom
  renderEchartDom() {
    // init the echart object
    const echartObj = this.getEchartsInstance();
    // set the echart option
    area.options.series[0].data = [this.props.mobile, this.props.desktop, this.props.other]
    area.options.yAxis[0].max = maxof([this.props.mobile, this.props.desktop, this.props.other]);
    echartObj.setOption(area.options);
  //  setInterval(function () {
    //  getInfo();
      //echartObj.setOption(area.options);
    //}, 5000);
    // set loading mask
    if (this.props.showLoading) echartObj.showLoading(this.props.loadingOption || null);
    else echartObj.hideLoading();

    return echartObj;
  }
  getEchartsInstance() {
    // return the echart object
    const theme = this.props.theme ? this.props.theme : 'macarons';
    return echarts.getInstanceByDom(this.echartsDom) || echarts.init(this.echartsDom, theme);
  }

  render() {
    const style = this.props.style || {
      height: '350px'
    };
    // for render
    return (
      <div
        ref={(c) => { this.echartsDom = c; }}
        className={this.props.className}
        style={style} />
    );
  }
}

module.exports = ListenersChart;
