import React from 'react';
import CHARTCONFIG from 'constants/ChartConfig';
import axios from 'axios';
import PropTypes from 'prop-types';
import echarts from 'echarts';
import 'echarts/theme/macarons';

import elementResizeEvent from 'element-resize-event';

let  option = {
      title : {
          text: 'Listeners',

      },
      legend: {
        data:['Desktop','Movil','Otros']
      },
      tooltip : {
          trigger: 'axis'
      },
      dataZoom : {
        show : true,
        realtime : true,
        start : 0,
        end : 100
      },
      calculable : true,
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              data : [10, 12, 21, 54, 260, 830, 710]
          }
      ],
      yAxis : [
          {
              type : 'value'
          }
      ],
      series : [
          {
              name:'Desktop',
              type:'line',
              smooth:true,
              itemStyle: {
                normal: {
                  color: "red",
                  areaStyle: {type: 'default'}
                }
              },
              data:[10, 12, 21, 54, 260, 830, 710]
          },
          {
              name:'Movil',
              type:'line',
              smooth:true,
              itemStyle: {
                normal: {
                  color: "green",
                  areaStyle: {type: 'default'}
                }
              },
              data:[30, 182, 434, 791, 390, 30, 10]
          },
          {
              name:'Otros',
              type:'line',
              smooth:true,
              itemStyle: {
                normal: {
                  color: "yellow",
                  areaStyle: {type: 'default'}
                }
              },
              data:[1320, 1132, 601, 234, 120, 90, 20]
          }
      ]
};
class ListenersHour extends React.Component {
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
  shouldComponentUpdate(nextProps, nextState){

    return nextProps.doUpdate;
  }
  // render the dom
  renderEchartDom() {
    // init the echart object
    const echartObj = this.getEchartsInstance();
    option.xAxis[0].data = this.props.dates;
    option.series[0].data = this.props.desktop;
    option.series[1].data = this.props.mobile;
    option.series[2].data = this.props.other;
    //echartObj.setTheme({color:['red','green','yellow']});
    echartObj.setOption(option);
    // set loading mask
    if (this.props.showLoading) echartObj.showLoading(this.props.loadingOption || null);
    else echartObj.hideLoading();

    return echartObj;
  }

  getEchartsInstance() {
    // return the echart object
    const theme = this.props.theme ? this.props.theme : 'dafult';
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

module.exports = ListenersHour;
