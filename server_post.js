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
	var path = url.pathname;
	var cmds = path.split("/");
	if(cmds[1] == "file"){
		if(request.method == 'POST'){
			// .. body에 넘어온 filepath
		}else if(request.method == "GET"){
			var filepath = path.substring(1);
			console.log("filepath="+filepath);
			var mtype = mime.lookup(filepath); // 파일의 mime type을 알려준다
			// mime type을 체크해서 동영상이면 stream 처리
			fs.readFile(filepath, function(error, data){
				if(error){
					response.writeHead(500,{'Content-Type':'text/html'});
					response.end(error+"");
				}else{
					response.writeHead(200,{'Content-Type':mtype});
					response.end(data);
				}
			});
		}else{
			response.writeHead(500,{'Content-Type':'text/html'});
			response.end("error : method="+request.method);
		}
	}else if(cmds[1] == "html"){
		filepath = path.substring(1);
		fs.readFile(filepath, 'utf-8',function(error, data){
			if(error){
				response.writeHead(404,{'Content-Type':'text/html'});
				response.end("<h1>404 Page not found!</h1>");
			}else{
				response.writeHead(200,{'Content-Type':'text/html'});
				response.end(data);
			}
		});
	}else if(cmds[1] == "signin"){
		// request.url 은 위에서 parsing해서 url 변수에 담아둔 상태
		var id = "root";
		var pw = "qwer1234";
		
		var sign;

		var postdata = "";
		request.on("data", function(data){
			postdata += data;
		});

		request.on("end", function(){
			sign = qs.parse(postdata);

			console.log(url);
			console.log(sign);
			if(sign.id == id && sign.pw == pw){
				response.writeHead(404,{'Content-Type':'text/html'});
				response.end("<h1>Welcome!</h1>");
			}else{
				response.writeHead(404,{'Content-Type':'text/html'});
				response.end("<h1>ID or PW not found!</h1>");
			}
		});
	}else {
		response.writeHead(404,{'Content-Type':'text/html'});
		response.end("<h1>404 Page not found!</h1>");
	}
});

var sendHttpResult = function(){

};

server.listen(8090, function(){
	console.log("server is running...");
});

