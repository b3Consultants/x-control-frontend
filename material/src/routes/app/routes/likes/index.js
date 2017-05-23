module.exports = {
  path: 'likes',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/DashboardLikes'));
    });
  }
};
