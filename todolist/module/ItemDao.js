var ItemDao = require('../db/dao.js').Item;

//添加事物
exports.addItem = function(item, callback) {
    ItemDao.create(item, function(err, doc) {
        if(err) {
            callback(err);
        }
        else{
            console.log(doc);
            ItemDao.find({userID: item.userID}, null, {sort: {finishState: 1}}, function(err, docs) {
                if(err) {
                    callback(err);
                }
                else{
                    callback(null, docs);
                }
            });
        }
    })
};

//获取所有的事物
exports.getItems = function(userID, callback) {
    ItemDao.find({userID: userID}, null, {sort: {finishState: 1}}, function(err, docs) {
        if(err) {
            callback(err);
        }
        else{
            callback(null, docs);
        }
    })
};

//通过id获取item信息
exports.getItemById = function(itemId, callback) {
    ItemDao.findById(itemId, function(err, item) {
        if(err) {
            callback(err);
        }
        else{
            console.log('item信息: ', item);
            callback(null, item);
        }
    });

};

//更新item状态
exports.updateState = function(itemId, callback) {
    ItemDao.findById(itemId, function(err, item) {
        if(err) {
            callback(err);
        }
        else{
            console.log('item信息: ', item);
            item.finishState = 1;
            item.postDate = new Date();
            item.save(function(err, doc) {
                if(err) {
                    callback(err);
                }
                else{
                    //这里代码重复了，寻找优化方法
                    //getItems(doc.userID, callback) ;
                    ItemDao.find({userID: doc.userID}, null, {sort: {finishState: 1}}, function(err, items) {
                        if(err) {
                            callback(err);
                        }
                        else{
                            callback(null, items);
                        }
                    });
                }
            });
        }
    });
};
//更新item数据
exports.updateItem = function(itemId, data, callback) {
    ItemDao.findById(itemId, function(err, item) {
        if(err) {
            callback(err);
        }
        else{
            console.log('更新item信息：' + item);
            item.title = data.title;
            item.postDate = new Date();
            item.save(function(err, item) {
                if(err) {
                    callback(err);
                }
                else{
                    console.log('被修改后的item: ', item);
                    ItemDao.find({userID: item.userID}, null, {sort: {finishState: 1}}, function(err, items) {
                        if(err) {
                            callback(err);
                        }
                        else{
                            callback(null, items);
                        }
                    });
                }
            });
        }
    });
};

//删除item
exports.deleteItem = function(itemId, callback) {
    ItemDao.findById(itemId, function(err, doc) {
       if(err)
       {
           callback(err) ;
       }
       else
       {
           if(doc)
           {
               doc.remove(function(err, item) {
                   console.log("被删掉的item："　, doc);
                   //重复代码，寻找优化空间
                   ItemDao.find({userID:item.userID}, null,{sort:{finishState:1}}, function(err, items) {
                       if(err)
                       {
                           callback(err) ;
                       }
                       else
                       {
                           callback(null, items) ;
                       }
                   })
               });
           }
           else
           {
               console.log("被删掉的item："　, doc);
               //重复代码，寻找优化空间
               ItemDao.find({userID:item.userID}, null,{sort:{finishState:1}}, function(err, items) {
                   if(err)
                   {
                       callback(err) ;
                   }
                   else
                   {
                       callback(null, items) ;
                   }
               })
           }
       }
    });
};

exports.ItemDao = ItemDao;




















