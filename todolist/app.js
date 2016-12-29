var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var credential = require('./Credential/credentials.js');
var session = require('express-session');

//用户路由器   
var checkLogined = require('./routes/checkLogined.js');
var loginRouter = require('./routes/loginRouter.js');
var registerRouter = require('./routes/registerRouter.js');
var logoutRouter = require('./routes/logoutRouter.js');

//待办事项路由器
var itemRouter = require('./routes/itemRouter.js');
var app = express();


var storage = new session.MemoryStore({reapInterval:300*1000});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser()) ;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(credential.cookieSecret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
    {
        name:'TODOID',
        secret:'aaa',
        resave:true ,
        saveUninitialized:true,
        rolling:true,
        cookie:{maxAge:100*6000}
    }
));


//调用中间价处理用户请求

//用户登陆路由
app.use('*',checkLogined);
app.use('/login', checkLogined);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter) ;
app.use('/', loginRouter);

//待办事项路由

app.use('/', itemRouter) ;


app.listen(3214, function(){
  console.log('server started');
});

app.use('*', function(request, response, next) {
    response.send('error');
});

module.exports = app;
