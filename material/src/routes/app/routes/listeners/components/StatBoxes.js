import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

class Statboxes extends React.Component{
  render() {
    return (
      <div className="row">
        <div className="col-xl-3 col-sm-6">
          <div className="box box-default">
            <div className="box-top">
              <span>{this.props.listeners}<span className="size-h5"></span></span>
            </div>
            <div className="box-info">
              <span>Listeners</span>
            </div>
            <div className="box-bottom">
              <i className="material-icons color-success">hearing</i>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="box box-default">
            <div className="box-top">
              <span>3.2<span className="size-h5"></span>hs</span>
            </div>
            <div className="box-info">
              <span>Tiempo Promedio</span>
            </div>
            <div className="box-bottom">
              <i className="material-icons color-info">av_timer</i>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="box box-default">
            <div className="box-top">
              <span>37<span className="size-h5">k</span></span>
            </div>
            <div className="box-info">
              <span>Pico de listeners</span>
            </div>
            <div className="box-bottom">
              <i className="material-icons color-warning">trending_up</i>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="box box-default">
            <div className="box-top">
              <span>11:32</span>
            </div>
            <div className="box-info">
              <span>Hora pico</span>
            </div>
            <div className="box-bottom">
              <i className="material-icons color-danger">access_time</i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Statboxes;
