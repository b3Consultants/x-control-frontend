import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router';
import APPCONFIG from 'constants/Config';
import NavLeftList from './NavLeftList';
import NavRightList from './NavRightList';

const style = { backgroundcolor: 'red'};

class Header extends React.Component {
  componentDidMount() {
    const sidebarToggler = this.sidebarBtn;
    const $sidebarToggler = $(sidebarToggler);
    const $body = $('#body');

    $sidebarToggler.on('click', (e) => {
      // _sidebar.scss, _page-container.scss
      $body.toggleClass('sidebar-mobile-open');
    });
  }

  render() {
    const { isFixedHeader, colorOption } = this.props;

    return (
      <section className="app-header">
        <div
          className={classnames('app-header-inner')}
          style={style}
                >
          <div className="hidden-lg-up float-left">
            <a href="javascript:;" className="md-button header-icon toggle-sidebar-btn" ref={(c) => { this.sidebarBtn = c; }}>
              <i className="material-icons">menu</i>
            </a>
          </div>

          <div className="brand hidden-md-down">
            <h2><Link to="/">{APPCONFIG.brand}</Link></h2>
          </div>

          <div className="top-nav-left">
            <NavLeftList />
          </div>

          <div className="top-nav-right">
            <NavRightList />
          </div>
        </div>
      </section>
    );
  }
}


const mapStateToProps = state => ({
  colorOption: state.settings.colorOption,
  isFixedHeader: state.settings.isFixedHeader
});

module.exports = connect(
  mapStateToProps
)(Header);
