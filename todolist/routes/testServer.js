var http = require('http');
var url = require('url');

http.createServer(function(request, resposne )
{
    var urlParse = url.parse(request.url, true);
    console.log(urlParse) ;
    resposne.write('success') ;
    //resposne.end() ;
}).listen(3000, function(){
    console.log('server started')
});



