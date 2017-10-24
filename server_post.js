var http = require("http");
var u = require("url");
var fs = require("fs");
var qs = require("querystring");
var mime = require("mime");

// 주소(Rest Api) 요청의 형태
// http://localhost:8090/post?filepath=/dir1/xxx.png

var server = http.createServer(function(request,response){
	var url = u.parse(request.url);
	// method 를 꺼낸다
	// 주소에서 명령어=서버자원의id(uri) 를 먼저 꺼낸다
	var cmd = url.pathname;
	if(cmd == "/getfile"){
		if(request.method == 'POST'){
			// .. body에 넘어온 filepath
		}else if(request.method == "GET"){
			var query = qs.parse(url.query);
			if(query.filepath){
				var filepath = query.filepath;
				console.log("filepath="+filepath);
				var mtype = mime.lookup(filepath); // 파일의 mime type을 알려준다
				fs.readFile(filepath, function(error, data){
					if(error){
						response.writeHead(500,{'Content-Type':'text/html'});
						response.end(error+"");
					}else{
						response.writeHead(200,{'Content-Type':mtype});
						response.end(data);
					}
				});
			}
		}else{
			response.writeHead(500,{'Content-Type':'text/html'});
			response.end("error : method="+request.method);
		}
	}else{

	}

	
});

var sendHttpResult = function(){

};

server.listen(8090, function(){
	console.log("server is running...");
});

