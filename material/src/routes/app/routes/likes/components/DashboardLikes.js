import React from 'react';
import APPCONFIG from 'constants/Config';
import QueueAnim from 'rc-queue-anim';
import axios from 'axios';
import LikesPieChart from './LikesChart';
import AquisitionChart from './CurrentLikesChart';
import StatBoxes from './StatBoxes';
import EngagementStats from './EngagementStats';
import BenchmarkChart from './BenchmarkChart';

class Main extends React.Component {

  getAcutalLikes(update) {
    axios.get(APPCONFIG.baseURL + '/likes/' + this.props.song)
      .then((response) => {

        this.setState({mata_song: response.data.mata,
          apesta_song: response.data.apesta,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount() {
    const inter = setInterval(() => {
      this.getAcutalLikes();
    }, 1000);
    this.setState({interval: inter});


  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }


  render() {
    return (
      <div className="row">
        <div className="col-xl-6">
          <div className="box box-default">
            <div className="box-body">
              <LikesPieChart {...this.props} />
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="box box-default">
            <div className="box-body">
              <AquisitionChart{...this.state} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class Engagement extends React.Component {
  render() {
    return (
      <div className="box box-default">
        <div className="box-body">
          <div className="row">
            <div className="col-xl-8">
              <div className="box box-transparent">
                <div className="box-header">Engagement</div>
                <div className="box-body">
                  <div className="row text-center metrics">
                    <div className="col-xs-6 col-md-3 metric-box">
                      <span className="metric">2.6M</span>
                      <span className="metric-info">Visits</span>
                    </div>
                    <div className="col-xs-6 col-md-3 metric-box">
                      <span className="metric">4.5M</span>
                      <span className="metric-info">Users</span>
                    </div>
                    <div className="col-xs-6 col-md-3 metric-box">
                      <span className="metric">08:03</span>
                      <span className="metric-info">Visit Duration</span>
                    </div>
                    <div className="col-xs-6 col-md-3 metric-box">
                      <span className="metric">5.25</span>
                      <span className="metric-info">Pages per Visit</span>
                    </div>
                  </div>

                  <EngagementStats />
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="box box-transparent">
                <div className="box-header">Benchmark</div>
                <div className="box-body">
                  <BenchmarkChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class Dashboard extends React.Component {


  getInfo() {
    axios.get(APPCONFIG.baseURL + '/realtime/getRadioActualState')
      .then((response) => {
        this.setState({song: response.data.song,
          mobile: response.data.mobile,
          desktop: response.data.desktop,
          other: response.data.others,
          listeners: response.data.listeners,
          averageTime: response.data.averageTime,
          peak: response.data.peak
        });
      })
      .catch((err) => {
        console.log(err);
      });
      axios.get(APPCONFIG.baseURL + '/likes')
        .then((response) => {
          this.setState({mata: response.data.mata,
            apesta: response.data.apesta,
          });
        })
        .catch((err) => {
          console.log(err);
        });
  }

  componentDidMount() {
    const inter = setInterval(() => {
      this.getInfo();
    }, 1000);
    this.setState({interval: inter});
  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  render() {
    return (<div className="container-fluid no-breadcrumbs page-dashboard">
      <QueueAnim type="bottom" className="ui-animate">
        <Main {...this.state} />
        <div key="2"><StatBoxes {...this.state} /></div>
      </QueueAnim>
    </div>);
  }
}


module.exports = Dashboard;
