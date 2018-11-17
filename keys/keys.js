if(process.env.NODE_ENV === 'production') {
  //production mode
  module.exports = require('./prod.js');
} else {
  //development mode
  module.exports = require ('./dev');
}