import APPCONFIG from 'constants/Config';
import RADIO_INFO_CHANGE from 'constants/ActionTypes';

const initialSettings = APPCONFIG.settings;

const settings = (state = initialSettings, action) => {
    // console.log(action)
  switch (action.type) {
    case RADIO_INFO_CHANGE:
      return {
        ...state,
        ...action.info
      };
    default:
      return state;
  }
};

module.exports = settings;
