/*
    注销登陆
 */
var logoutRouter = require('express').Router();


logoutRouter.get('/', function(request, response, next) {
    request.session.destroy();
	console.log('hellowrold')
    response.redirect('/login');
});




module.exports = logoutRouter ;
















