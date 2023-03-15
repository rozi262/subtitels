

class User
{
    constructor()
    {

    }

    upload_file(file, cont)
    {
        const data = new FormData();
        data.append("file",file,"file");
        data.append("quality",QUALITY_SELECTOR.value);
        SERVER_POST("send_srt",data,cont);
    }
    get_file(cont)
    {
        SERVER_GET("get_srt","none",cont);
    }
}