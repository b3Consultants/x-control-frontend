import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link, hashHistory } from 'react-router';
import APPCONFIG from 'constants/Config';

import {
    togglCollapsedNav
} from '../../actions';
import SidenavContent from './SidenavContent';

class Sidebar extends React.Component {

  componentDidMount() {
    // AutoCloseMobileNav
    const $body = $('#body');

    if (APPCONFIG.AutoCloseMobileNav) {
      hashHistory.listen((location) => {
        setTimeout(() => {
          $body.removeClass('sidebar-mobile-open');
        }, 0);
      });
    }
  }

  onToggleCollapsedNav = (e) => {
    const val = !this.props.navCollapsed;
    const { handleToggleCollapsedNav } = this.props;
    handleToggleCollapsedNav(val);
  }

  render() {
    const { navCollapsed, colorOption } = this.props;
    let toggleIcon = null;
    if (navCollapsed) {
      toggleIcon = <i className="material-icons">radio_button_unchecked</i>;
    } else {
      toggleIcon = <i className="material-icons">radio_button_checked</i>;
    }

    return (
      <nav
        className={classnames('app-sidebar', {
          'bg-color-light': ['31', '32', '33', '34', '35', '36'].indexOf(colorOption) >= 0,
          'bg-color-dark': ['31', '32', '33', '34', '35', '36'].indexOf(colorOption) < 0 })}
            >
        <section
          className={classnames('sidebar-header', {
            'bg-color-dark': false,
            'bg-color-light': false,
            'bg-color-primary': false,
            'bg-color-success': false,
            'bg-color-info': false,
            'bg-color-warning': false,
            'bg-color-danger': true })}
                >
          <img className="logo-img logo-react" src="assets/images/X_icon.jpg" alt="" />
          <Link to="/" className="brand">{APPCONFIG.brand}</Link>

        </section>

        <section className="sidebar-content">
          <SidenavContent />
        </section>

      </nav>
    );
  }
}

const mapStateToProps = state => ({
  navCollapsed: state.settings.navCollapsed,
  colorOption: state.settings.colorOption
});

const mapDispatchToProps = dispatch => ({
  handleToggleCollapsedNav: (isNavCollapsed) => {
    dispatch(togglCollapsedNav(isNavCollapsed));
  },
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
