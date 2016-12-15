var nunjucks = require('nunjucks');
var urlHelper = require('./helpers/url');

/**
 * template engine
 */
module.exports = function(app) {

  var nunenv = new nunjucks.Environment(
    new nunjucks.FileSystemLoader('views', {
      autoescape: true,
      watch: true,
      noCache: true,
    })
  )

  nunenv.express(app)

  nunenv
  .addFilter('debug', function(obj) {
    return JSON.stringify(obj, null, 2)
  })

  .addFilter('intval', function(obj) {
    return parseInt(obj || 0, 10);
  })

  .addGlobal('in_array', function(element, array) {
    array = array || [];
    return array.indexOf(element) !== -1;
  })

  .addFilter('ceil', function(str) {
    return Math.ceil(str);
  })
  .addFilter('build', function(str, data) {
    return urlHelper.build(str, data);
  })

  return nunenv
}
