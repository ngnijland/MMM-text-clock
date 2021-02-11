const NodeHelper = require('node_helper');
const locale = require('./locale');

module.exports = NodeHelper.create({
  socketNotificationReceived: function (notification, payload) {
    if (notification === 'SET_LANGUAGE') {
      this.sendSocketNotification(
        'SET_LANGUAGE',
        JSON.stringify(
          Object.assign({}, { language: payload }, locale[payload]),
          (_, value) => {
            if (typeof value === 'function') {
              return '__FUNC__' + value.toString();
            }

            return value;
          },
          2
        )
      );
    }
  },
});
