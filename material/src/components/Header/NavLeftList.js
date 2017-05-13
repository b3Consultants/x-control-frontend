import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { hashHistory } from 'react-router';
import Divider from 'material-ui/Divider';
import axios from 'axios';
import ReactInterval from 'react-interval';

const HeaderIconButtonStyle = {
  width: '60px',
  height: '60px'
};

const listItemStyle = {
  paddingLeft: '40px' // 36 + 16, algin with sub list
};

const songNameStyle = {
  marginTop: '14px',
  marginLeft: '10%'
};


const NavLeftList = React.createClass({
  getInitialState() {
    return { enabled: true,
      timeout: 10000,
      songName: ''
    };

  },

  getSongName() {
    axios.get('http://localhost:8080/realtime/getRadioActualState')
      .then((response) => {
        const radio = response.data.song;
        this.setState({
          songName: radio
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  render() {
    const {timeout, enabled, songName} = this.state;
    return (
      <div>
        <ReactInterval {...{timeout, enabled}} callback={this.getSongName} />
        <ul className="list-unstyled list-inline">
          <li className="list-inline-item">
            <p className="h4 navbar-brand" style={songNameStyle}> {songName}</p>
          </li>
        </ul>
      </div>);
  }
});
module.exports = NavLeftList;
