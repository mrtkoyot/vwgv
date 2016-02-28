var path = require('path');
var production = (process.env.NODE_ENV === 'production');

module.exports = {
	bower: 'bower_components',
	app: 'site/templates',
	dist: 'dist',
	distTemplates: 'dist/site/templates',
	livereloadPort: 35729,
	port: 9000,
	root: path.resolve('./')
};
