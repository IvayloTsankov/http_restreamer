var http = require("http");
var fs = require("fs");

var server =  http.createServer(function (request, response)
{
    if(request.method == "POST")
    {
        request.on('data', function(data)
        {
            if(first === true)
            {
                var ts = "test.webm";
                webmfile = fs.openSync(ts, "w");
                first = false;
            }

            console.log("producer data available");
            fs.writeSync(webmfile, data, null, data.length);
            
            console.log("data written");	
            //console.log(data);
            // return;

            //arr.forEach(function(consumer) {
            //    consumer.write(data);
            //    console.log("DATA SENT TO CONSUMER");
            //});

            response.end("written");
            });

            request.on('close', function()
            {
                    fs.closeSync(webfile);
            });
    }

    if(request.method == "GET")
    {
        arr.push(response); 
        console.log("consumer request recieved");
    }
});

var arr = [];
var first = true;
var webmfile;

server.listen(9001);

console.log("Server running at http://127.0.0.1:9001");
