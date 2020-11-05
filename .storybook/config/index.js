const merge = require('webpack-merge');
module.exports = merge(
  require('./fonts'),
  require('./resolve'),
  require('./style')
)