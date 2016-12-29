var itemRouter = require('express').Router() ;
var Item = require('../module/ItemDao.js');
var path = require('path') ;
var User = require('../module/UserDao.js') ;


//新增事物
itemRouter.post('/addItem', checkLlogin, function(request, response, next) {
    var user = request.session.userInfo ;
    console.log("用户信息： " + user.username);
    response.cookie('name','zhangsan', {maxAge:4000});
    response.cookie('gender', 'nan', {maxAge:4000});
    response.cookie('hello', 'world',{maxAge:4000});
    response.cookie('age', 22, {maxAge:4000});
    var item = {
        userID:request.session.userInfo._id,
        title:request.body.title,
        postDate: new Date(),
        finishState:0
    };
    ////添加事项
    Item.addItem(item, function(err, items) {
        if(err)
        {
            console.error(err) ;
        }
        else
        {
            console.log(items) ;
            response.render('item_list.ejs', {items:items, username:user.username, avatar:user.avatar});
        }
    })

});
//完成事物
itemRouter.get('/finish/:id', function(request, response, next) {
    var itemId = request.params.id ;
    var user = request.session.userInfo ;
    console.log("itemID", itemId);
    Item.updateState(itemId, function(err, items) {
       if(err)
       {
           console.error(err) ;
       }
       else
       {
            console.log(items);
            response.render('item_list.ejs', {items:items, username:user.username,avatar:user.avatar});
       }
    });
});

//编辑item页面
itemRouter.get('/edit/:id', function(request, response, next) {
    var itemId = request.params.id ;
    Item.getItemById(itemId, function(err, item) {
        if(err)
        {
            console.error(err);
        }
        else
        {
            item.avatar = request.session.userInfo.avatar ;
            item.username = request.session.userInfo.username ;
            response.render('edit.ejs', item);
        }
    })
});

//修改事物
itemRouter.post('/edit/:id',checkLlogin, function(request, response, next) {
    console.log('用户信息', request.session.userInfo);
   var user = request.session.userInfo ;
   var itemId = request.params.id ;
   var title = request.body.title ;
   var item = {title:title};


    Item.updateItem(itemId, item, function(err, items) {
        if(err)
        {
            console.error(err) ;
        }
        else
        {
            response.render('item_list.ejs',{items:items, username:request.session.userInfo.username,avatar:user.avatar});
        }
    })
});
//删除事物
itemRouter.get('/delete/:id', function(request, response, next) {
    var itemId = request.params.id ;
    var user = request.session.userInfo;
    console.log('hello') ;
    Item.deleteItem(itemId, function(err, items) {
        if(err)
        {
            console.error(err) ;
        }
        else
        {
            console.log("事物详情： " + items) ;
            response.render('item_list.ejs',{items:items, username:request.session.userInfo.username,avatar:user.avatar});
        }
    })
});

//返回上传头像页面
itemRouter.get('/upload_avatar', function(request, response, next){
    var userInfo = request.session.userInfo ;
    console.log('用户信息是', userInfo);
   response.render('upload_avatar.ejs', userInfo);
});

//引入文件上传模块儿
var multer = require('multer');
var dirpath = path.join(__dirname,'../public/', 'avatars');
//文件保存路径

var storage = multer.diskStorage({
    //存储位置
    destination:function(req, file, callback)
    {
        callback(null, dirpath) ;
    },
    //文件名
    filename:function(request, file, callback)
    {
        var originalName = file.originalname ;
        var fineName = file.originalname.substring(0, originalName.lastIndexOf('.'))+Date.now() + path.extname(originalName) ;
        callback(null, fineName) ;
    }
}) ;


var upload = multer({storage:storage}) ;

//处理上传头像请求
itemRouter.post('/uploadAvatar', checkLlogin, upload.single('avatar'),  function(request, response, next){
    var userInfo = request.session.userInfo ;
    console.log('post中用户信息是:%o' , userInfo);
    console.log('sessionId:' + request.session.name);
    userInfo.avatar = request.file.filename ;
    User.updateUser(userInfo, function(err, user){
        if(err)
        {

            console.error(err) ;
        }
        else
        {
            if(user)
            {
                Item.getItems(userInfo._id, function(err, items){
                    if(err)
                    {
                        console.error(err) ;
                    }
                    else
                    {
                        response.render('item_list.ejs', {items:items, username:userInfo.username, avatar:userInfo.avatar});
                    }
                })
            }
        }
    }) ;
});


function checkLlogin(request ,response ,next)
{
    if(!request.session.userInfo)
    {
        response.redirect('/login.html') ;
    }
    next();
}




module.exports = itemRouter ;