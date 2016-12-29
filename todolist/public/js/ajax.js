
window.onload = function()
{
    document.getElementById('username').onblur = function()
    {
        var xmlHttp = getXmpHttpRequest() ;
        var username = document.getElementById('username').value ;
        xmlHttp.onreadystatechange = function()
        {
            if(4 == xmlHttp.readyState && 200 == xmlHttp.status)
            {
                if(xmlHttp.responseText.trim())
                {
                    console.log(xmlHttp.responseText) ;
                    document.getElementById('message').innerHTML = '用户名' + username + '已存在';
                }
                else
                {
                    document.getElementById('message').innerHTML = '用户名不存在';
                }

            }
        };
        console.log('world');
        xmlHttp.open('GET', '/ajax?username=' + username, true) ;

        xmlHttp.send();
    }

};


function getXmpHttpRequest()
{
    var xmlHttp = null ;

    if(window.XMLHttpRequest)
    {
        xmlHttp = new XMLHttpRequest();
    }
    else
    {
        //兼容ie5，6
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP') ;
    }
    return xmlHttp ;
}


function getXmlHttpRequest()
{
	var xmlHttp = null ;

	if(window.XMLHttpRequest)
	{
		xmlHttp = new XMLHttpRequest();
	}
	else
	{
		xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
	}

	return xmlHttp ;
}

