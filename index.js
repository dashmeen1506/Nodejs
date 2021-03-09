const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 3000;
const host = 'localhost';

const server = http.createServer((req,res)=>{
    if(req.method == 'GET')
    {
        var fileUrl;
        if(req.url == '/')
            fileUrl = '/index.html';
        else
            fileUrl=req.url;
        
        var filePath = path.resolve('./public'+fileUrl);
        console.log(filePath);
        var fileExt = path.extname(filePath);
        console.log(fileExt);
        
        if(fileExt == '.html')
        {
            fs.exists(filePath,(exists)=>{
                if(exists)
                {
                    res.statusCode=200;
                    res.setHeader('Content-Type','text/html');
                    fs.createReadStream(filePath).pipe(res);
                    return;
                }
                res.statusCode=404;
                res.setHeader('Content-Type','text/html');
                res.end('<html><body><h1>ERROR 404 :' + fileUrl + ' not found </h1></body></html>');
            }) 
        }
        else
        {
            res.statusCode=404;
            res.setHeader('Content-Type','text/html');
            res.end('<html><body><h1>ERROR 404 :' + fileUrl + ' not a html file </h1></body></html>'); 
            return ;
        }
    }
    else
    {
        res.statusCode=404;
        res.setHeader('Content-Type','text/html');
        res.end('<html><body><h1>ERROR 404 :' + req.method + ' not supported </h1></body></html>'); 
        return;
    }
});

server.listen(port,host,()=>{
    console.log("server is listening");
})