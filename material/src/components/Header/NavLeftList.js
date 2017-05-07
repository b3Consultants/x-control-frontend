import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { hashHistory } from 'react-router';
import Divider from 'material-ui/Divider';
import axios from 'axios';

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

function songName() {
  console.log('h');
  axios.get('http://localhost:8080/listeners/getRadioInfo')
    .then((response) => {
      console.log(response);
      const radio = JSON.parse(response.data);
      return radio.songtitle;
    })
    .catch((err) => {
      console.log(err);
    });
}

class NavLeftList extends React.Component {
  constructor() {
    super();
    this.state = {
      song_name: 'a'
    };
  }

  getSongName() {
    axios.get('http://localhost:8080/listeners/getRadioInfo')
      .then((response) => {
        console.log(response);
        const radio = JSON.parse(response.data);
        this.setState({
          song_name: radio.songtitle
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (event, value) => {
    hashHistory.push(value);
  }

  render() {
    return (
      <ul className="list-unstyled list-inline">
        <li className="list-inline-item">
          {this.getSongName()}
          <p className="h4 navbar-brand" style={songNameStyle}>{this.state.song_name}</p>
        </li>
      </ul>
    );
  }
}

module.exports = NavLeftList;
