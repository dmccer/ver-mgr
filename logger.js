var log4js = require('log4js');


module.exports = function(category) {
  category = category || 'vermgr';

  log4js.configure({
    appenders: [
      { type: 'console' },
      {
        type: 'file',
        filename: 'log/vermgr.log',
        category: category
      }
    ]
  });

  return log4js.getLogger(category);
};
