var checkLogined = require('express').Router();


checkLogined.get('/', function(request,response, next){
    console.log('hello');
    next();
},function(request, response, next){
    console.log('world');
    next();
},function(request ,response, next) {
    console.log('checklogined请求');

    if(request.session.userInfo == undefined || request.session.userInfo == null)
    {
        console.log(request.session);
        console.log(request.session.userInfo);
        response.redirect('/login.html');
    }
    else
    {
        next();
    }
});


module.exports = checkLogined ;





