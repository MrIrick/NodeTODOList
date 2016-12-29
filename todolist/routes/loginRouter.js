var loginRouter = require('express').Router();

var User = require('../module/UserDao.js');
var Item = require('../module/ItemDao.js');

//用户登陆请求
loginRouter.post('/', function(request, response, next){
    var username = request.body.username ;
    var password = request.body.password ;
    console.log("登陆用户是: " + username);
    User.getUser(username,function(err, doc){
        if(err)
        {
            console.error(err);
        }
        else
        {
            console.log('用户信息: '+doc);
            if(doc)
            {
                if(doc.password !== password)
                {
                    response.render('login.ejs', {passMessage:'密码不正确！', userMessage:''});
                }
                request.session.userInfo = doc ;
                Item.getItems(doc._id, function(err, items) {
                    if(err)
                    {
                        console.error(err) ;
                    }
                    else
                    {
                        response.render('item_list.ejs', {username:username, items:items, avatar:doc.avatar});
                    }
                });
            }
            else
            {
                response.render('login.ejs', {userMessage:'用户名不存在', passMessage:''});
            }
        }
    });

});

loginRouter.get('/', function(request, response, next) {
    response.render('item_list.ejs', {username:request.session.userInfo.username, items:'', avatar:request.session.userInfo.avatar});
});

loginRouter.get('/ajax', function(request, response, next) {
    var username = request.query.username ;
    console.log('ajax request accepted username= ' + username);
    User.getUser(username, function(err, doc) {
        if(err)
        {
            console.log(err) ;
        }
        else
        {
            if(doc)
            {
                console.log(doc);
                response.send('用户名 ' + doc.username +'已存在');
            }
            else
            {
                response.send('');
            }
        }
    })
});

module.exports = loginRouter ;










