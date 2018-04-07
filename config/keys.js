// keys. js - figure out what set of credentials to return
if(process.env.Node_ENV=== 'production'){
  // in pro
  module.exports = require( './prod.js' )
}else{
  // in dev
  module.exports = require( './dev.js' )
}
