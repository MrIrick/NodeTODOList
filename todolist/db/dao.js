//引入核心模块儿
var mongoose = require('mongoose');

//创建数据库连接
var  connection = mongoose.connect('mongodb://localhost:27017/todo').connection;

//打开连接
connection.once('open', function(err){
    if(err)
    {
        console.error(err);
    }
    else
    {
        console.log('database opened');
    }
});


//连接错误
connection.on('error', function(){
    if(err)
    {
        console.log(err);
    }
});

//用户表结构
var userSchema = mongoose.Schema(
    {
        username:String,
        password:String,
        email:String,
        avatar:{type:String, default:'default_avatar.png'}
    }
);

//用户表
exports.User = mongoose.model('user', userSchema);



//列表项表结构
var ItemSchema = mongoose.Schema(
    {
        userID:String,
        title:String,
        postDate:Date ,
        finishState: Number, default:0 //1完成，0 未完成
    }
);

//Item 表
exports.Item = mongoose.model('item', ItemSchema) ;






