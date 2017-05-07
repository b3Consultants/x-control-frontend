module.exports = {
  path: 'listeners',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Dashboard'));
    });
  }
};
