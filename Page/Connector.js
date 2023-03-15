SERVER_URL = "http://localhost:8000//"

function SERVER_MESSEGE(kind, typ, data, cont, fail_check)
{
    var xhr = new XMLHttpRequest();
    xhr.open(kind,SERVER_URL + typ,true);
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState === 4)
        {
            if(xhr.status == 200)
            {
                const son = JSON.parse(xhr.responseText)
                cont(son.data,son.data2,son.data3);
            }
            else if(fail_check)
                window.location.href = "FailPage.html"
        }
        else
            console.log("fail to post");
    };
    xhr.send(data);
}

function SERVER_POST(typ, data, cont)
{
    SERVER_MESSEGE("POST",typ,data,cont,true)
}
function SERVER_GET(typ, data, cont)
{
    SERVER_MESSEGE("GET",typ,data,cont,true)
}