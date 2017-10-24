// Rest Api 설계
// ------------------
// /서비스명/값
// ------------------
// /피보나치/100 = 숫자배열
// /아나그램/acdagc = true/false

// 1. 서버 모듈(라이브러리)을 import
var http = require("http");

// 2. 서버 모듈을 사용해서 서버를 정의
var server = http.createServer( function(request, response){

	// 1 요청이 온 주소체계가 내가 제공하는 api 구조와 일치하는지 확인
	// decodeURI(주소) -> %20 등의 주소문자를 원래 문자로 변환
	// encodeURI(문자) -> 주소로 사용할 수 있는 문자열로 변환

	var cmds = decodeURI(request.url).split("/");
	response.writeHead(200, {'Content-Type':'text/html'});
	// 2. 주소 체계가 잘못 되었다면 알려준다
	if(cmds.length < 3){
		response.end("<h>Your request is wrong!!!</h>");
	// 3. 주소 체계가 정상이면
	}else{
		if(cmds[1] == "fibonacci"){
			if(!isNaN(cmds[2])){ // 숫자면 true - Not a Number
				var text = getFibo(cmds[2]);
				response.end(text);
			}else{
				response.end("<h>Value is Wrong!</h>");
			}
		}else if(cmds[1] == "anagram"){

		}else{
			response.end("<h>No Service!!!</h>");
		}
	}
});

// 3. 서버 실행
server.listen(8089, function(){
	console.log("server is running...");
});



// 함수를 만들고
// 0,1 ~ 부터 시작해서 count개의 피보나치 수열을 출력하세요
function getFibo(count){
	var result = "";

	var prev = 0, next = 1;
	result = result + 0 + "</br>";
	result = result + 0 + "</br>";
	for(var i=2; i<count; i++){
		var sum = prev+next;
		result = result + sum + "</br>";
		prev = next;
		next = sum;
	}

	return result;
}