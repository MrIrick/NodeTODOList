//引入用户表
var User = require('../db/dao.js').User;

//查询用户是否存在
exports.getUser = function(username, callback)
{
    User.findOne({username:username},function(err, doc) {
        if(err)
        {
            callback(err);
        }
        else
        {
            callback(null, doc);
        }
    });
};

//增加用户
exports.addUser = function(user, callback){
    console.log(user);
    User.create(user, function(err, doc) {
        if(err)
        {
            callback(err) ;
        }
        else
        {
            callback(null ,doc) ;
        }
    });
};

exports.updateUser = function(userInfo, callback)
{
    User.findById(userInfo._id, function(err, user){
        if(err)
        {
            callback(err) ;
        }
        else
        {
            if(user)
            {
                user.avatar = userInfo.avatar ;
                console.log(user) ;
                user.save(function(err ,user){
                    if(err)
                    {
                        callback(err) ;
                    }
                    else
                    {
                        callback(null ,user) ;
                    }
                })
            }
        }
    });
};









