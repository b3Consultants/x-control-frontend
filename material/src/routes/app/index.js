module.exports = {
  path: 'app',
  indexRoute: { onEnter: (nextState, replace) => replace('/app/dashboard') },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/charts'),
        require('./routes/dashboard'),
        require('./routes/ecommerce'),
        require('./routes/forms'),
        require('./routes/pageLayouts'),
        require('./routes/pages'),
        require('./routes/tables'),
        require('./routes/ui'),
        require('./routes/listeners'),
        require('./routes/likes')
      ]);
    });
  },
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/MainApp'));
    });
  }
};
