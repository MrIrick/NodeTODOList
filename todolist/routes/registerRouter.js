var registerRouter = require('express').Router();

var UserDao = require('../module/UserDao.js');



//返回注册页面
registerRouter.get('/', function(request, response, next) {
    if(request.session.userInfo == 'undefined' || request.session.userInfo == null)
    {
        response.render('register.ejs', {passMessage:'', userMessage:'', congratulationMess:''});
    }
    else
    {
        response.redirect('/login');
    }
});

//注册用户请求
registerRouter.post('/', function(request,response, next) {
    var user = {
        username:request.body.username ,
        password:request.body.password,
        email:request.body.email
    };
    console.log("密码: " + user.password);
    console.log('确认密码: ' + request.body.rePassword );
    if(user.password != request.body.rePassword)
    {
        response.render('register.ejs', {passMessage:'密码不一致,请重新输入!', userMessage:'',congratulationMess:''});
        return ;
    }
    
    UserDao.getUser(user.username, function(err, doc) {

        if(err)
        {
            console.error(err) ;
        }
        else
        {
            if(doc)
            {
                response.render('register.ejs', {userMessage:'用户名已存在', passMessage:'', congratulationMess:''});
            }
            else
            {
                UserDao.addUser(user, function(err, doc) {
                    if(err)
                    {
                        console.error(err) ;
                    }
                    else
                    {
                        response.render('register.ejs', {userMessage:'', passMessage:'', congratulationMess:'恭喜您，注册成功!'}) ;
                    }
                });
            }
        }

        
    })







});




module.exports = registerRouter ;















