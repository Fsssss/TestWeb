window.onload = function() {
	
			//功能代码
			var ipt_1 = document.getElementById("text1");
			var ipt_2 = document.getElementById("text2");
			var rp = document.getElementById("routePanel");
			var btn_change = document.getElementById("btn_change");
			var btn_search = document.getElementById("btn_search");
			var nav_bus = document.getElementsByClassName("nav_bus")[0];
			var nav_walk = document.getElementsByClassName("nav_walk")[0];
			var nav_drive = document.getElementsByClassName("nav_drive")[0];
			var tt = document.getElementsByClassName("conetent-left")[0];
			//tab标签切换
			// var nav_li = document.getElementById("nav_ul").getElementsByTagName("li")
			var nav_li = document.getElementsByClassName("nav_li");
//			console.log(nav_li)
			//console.log(nav_li);
//			for(var i = 0; i<=nav_li.length; i++){
//				nav_li[i].onclick = function (){
//					for (var j = 0; j < nav_li.length; j++) {
//						nav_li[j].classList.add("cancel");
//						console.log(111);
//					}
//					this.classList.remove("cancel");
//					this.classList.add("current");
//				}
//			}
			$(".nav_li").click(function(){

				$(this).toggleClass("current");

				$(this).siblings().removeClass("current");

				})
			//输入框值交换
			btn_change.onclick = exchange;
			function exchange(){
				var ipt_value = ipt_1.value;
				ipt_1.value = ipt_2.value;
				ipt_2.value = ipt_value;
			}


		 	//地图代码
			var map = new BMap.Map("container");
			// 创建地图实例  
			var point = new BMap.Point(116.404, 39.915);
			// 创建点坐标  
			map.centerAndZoom(point, 15);
			// 初始化地图，设置中心点坐标和地图级别  
			map.enableScrollWheelZoom(true);
			map.addControl(new BMap.NavigationControl());    
			map.addControl(new BMap.ScaleControl());    
			map.addControl(new BMap.OverviewMapControl());    
			map.addControl(new BMap.MapTypeControl());    
			map.setCurrentCity("黄石");
			map.enableScrollWheelZoom();
			// map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
		    var start = document.getElementById("start");//获取页面输入的起终点
		    var end = document.getElementById("end");


		    //查询路线切换
		    nav_bus.onclick = Switch;
		    nav_drive.onclick = Switch;
		    nav_walk.onclick = Switch;
		    function Switch (){
			    if(this.value == 1){
			    	btn_search.onclick = search.bus_search;//公交查询
			    			
			    }else if(this.value == 2){
			    	btn_search.onclick = search.drive_search;//驾车查询
			    }else if(this.value == 3){
			    	btn_search.onclick = search.walk_search;//步行查询
			    }
		    }


		    //公交路线绘制
		    var transit = new BMap.TransitRoute(map, {renderOptions: {map: map, panel: "r-result"}, 
				onResultsHtmlSet : function(){$("#r-result").show()}  	
		    });
		    //驾车路线绘制
		    var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map, panel: "r-result",
				onResultsHtmlSet : function(){$("#r-result").show()},autoViewport: true}});
		    //步行路线绘制
			// var walking = new BMap.WalkingRoute(map, {renderOptions:{map: map, autoViewport: true}});
			var walking = new BMap.WalkingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}});
		    //路线查询函数封装
		    var search = {
		    	bus_search:function(){
//		    		rp.style.display="black";
		    		$('#routePanel').show();
		    		start.innerHTML = ipt_1.value;
			    	end.innerHTML = ipt_2.value;
			    	console.log(start.innerHTML);
			    	console.log(end.innerHTML);
			    	transit.search(start.innerHTML,end.innerHTML);
			    	if(cookie !==null && cookie !== ""){
			    		put_cookie(cookie,start.innerHTML,end.innerHTML,"添加");//添加用户的查询记录
			    	}
		    	},
		    	drive_search:function(){
		    		rp.style.display="black";
		    		start.innerHTML = ipt_1.value;
			    	end.innerHTML = ipt_2.value;
			    	console.log(start.innerHTML);
			    	console.log(end.innerHTML);
			    	driving.search(start.innerHTML,end.innerHTML);
			    	if(cookie !==null && cookie !== ""){
			    		put_cookie(cookie,start.innerHTML,end.innerHTML,"添加");//添加用户的查询记录
			    	}
		    	},
		    	walk_search:function(){
		    		rp.style.display="black";
		    		start.innerHTML = ipt_1.value;
			    	end.innerHTML = ipt_2.value;
					walking.search(start.innerHTML, end.innerHTML);
					if(cookie !==null && cookie !== ""){
			    		put_cookie(cookie,start.innerHTML,end.innerHTML,"添加");//添加用户的查询记录
			    	}
		    	}
		    }
		    
			

//			 var geolocation = new BMap.Geolocation();
//			 	geolocation.getCurrentPosition(function(r){
//			 		if(this.getStatus() == BMAP_STATUS_SUCCESS){
//			 			var mk = new BMap.Marker(r.point);
//			 			map.addOverlay(mk);
//			 			map.panTo(r.point);
//			 			alert('您的位置：'+r.point.lng+','+r.point.lat);
//			 		}
//			 		else {
//			 			alert('failed'+this.getStatus());
//			 		}        
//			 	});

			 function myFun(result){
			 	var cityName = result.name;
			 	map.setCenter(cityName);
//			 	alert("当前定位城市:"+cityName);
			 }
			 var myCity = new BMap.LocalCity();
			 myCity.get(myFun); 

			// var geolocation = new BMap.Geolocation();
			// // 开启SDK辅助定位
			// geolocation.enableSDKLocation();
			// geolocation.getCurrentPosition(function(r){
			// 	if(this.getStatus() == BMAP_STATUS_SUCCESS){
			// 		var mk = new BMap.Marker(r.point);
			// 		map.addOverlay(mk);
			// 		map.panTo(r.point);
			// 		// alert('您的位置：'+r.point.lng+','+r.point.lat);
			// 	}
			// 	else {
			// 		// alert('failed'+this.getStatus());
			// 	}        
			// });
		    
		    //cookie获取后替换登录注册标签
		   
		    var login = document.getElementsByClassName('login')[0];
		    var register = document.getElementsByClassName('register')[0];
		    var arrStr = unescape(document.cookie.split("; ")); 
		    var cookie = getCookie("username");
		    var ipt_box = document.getElementsByClassName('input_box')[0];
		    
		    //console.log(cookie);
		    if(arrStr!==null && arrStr!==""){//cookie不为空则添加进页面
		    	login.children[0].innerHTML = "欢迎您，"+cookie;
			    register.children[0].innerHTML = "退出";
			    register.children[0].href = "#";
			    register.id = "back";
			    //点击退出删除cookie
			    var back = document.getElementById('back');
			    back.onclick = delCookie;
			    console.log(cookie);
			    
			    //添加cookie后可以查看用户历史记录
			    var btn_history = document.createElement('button');
			    btn_history.innerHTML = '历史';
			    btn_history.setAttribute('class','btn_history');
			    ipt_box.appendChild(btn_history);
			    btn_history.onclick = function(){
			    	put_cookie(cookie,start.innerHTML,end.innerHTML,"展示");//展示用户的查询历史记录
			    }
		    }
		    
		    
		    function getCookie(objName){//获取指定名称的cookie的值 
		        //console.log(arrStr);
		        for (var i = 0; i < arrStr.length; i++) { 
		            var temp = arrStr.split("="); 
		            if (temp[0] == objName){ 
		            	//console.log(temp[1])
		                return decodeURI(temp[1]); 
		            }
		        } 
		    }
		    function delCookie(){//删除cookie
		    	setCookie("username",cookie,-1);
		    	console.log(document.cookie);
		    	register.children[0].href = "login.html";
		    }
		    
		    function setCookie(c_name,value,expiredays){//设置cookie
				var exdate=new Date()
				exdate.setDate(exdate.getDate()+expiredays)
				document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
			}
		    
		    function put_cookie(cookie,start,end,swt){//查询后将查询记录添加到数据库
				var url = "servlet/HistoryServlet";
				var params = {"cookie":cookie,"start":start,"end":end,"switch":swt};
				console.log(params);
				 $.ajax({
				 		'url':url,
				 		'data':params, 
				 		'type':"post",
				 		 'xhrFields': {
				                withCredentials: true // 这里设置了withCredentials
				            },
				 		'success':function(data){
//				 			console.log(params.cookie);
//				 			console.log(data);
				 			var str = data.split("|;");
				 			var h_username = new Array();
				 			var h_start = new Array();
				 			var h_end = new Array();
				 			getH_username();//获取字符串内字段
				 			getH_start();
				 			getH_end();
//				 			console.log(h_username);
//				 			console.log(h_start);
//				 			console.log(h_end);
				 			
				 			var tableContent = '';
				 			tableContent +='<div id="history">';
				 						tableContent +='<table width="100%">';
				 							tableContent +='<tr>';
				 								tableContent +='<th>起点</th>';
				 								tableContent +='<th>终点</th>';
				 							tableContent +='</tr>';
				 							tableContent +='<tr>';
				 							for(var i=0;i<h_start.length;i++){
				 								tableContent +='<tr class="h_tr">';
				 								tableContent +='<td align="center">'+h_start[i]+'</td>';
				 								tableContent +='<td align="center">'+h_end[i]+'</td>';
				 								tableContent +='</tr>';
				 							}
				 								
				 							tableContent +='</tr>';
				 						tableContent +='</table>';
				 					tableContent +='</div>';
				 			tt.insertAdjacentHTML('beforeEnd',tableContent);
				 			
				 			
				 			function getH_username(){
				 				for(var i=0;i<str.length-1;i++){//解析字符串 获取user_name
					 				var str2 = str[i].split(";");
					 				for(var j=0;j<str2.length;j+=3){
//					 					console.log(str2[j])
					 					var str3 = str2[j].split(":");
					 					for(var u=0;u<str3.length;u++){
					 						if(str3[u+1]!=null && str3[u+1]!=""){
					 							h_username.push(str3[u+1]);
					 						}
					 					}
					 				}
					 			}
				 				return h_username;
				 			}
				 			function getH_start(){
				 				for(var i=0;i<str.length-1;i++){//解析字符串 获取user_name
					 				var str2 = str[i].split(";");
					 				for(var j=1;j<str2.length;j+=3){
//					 					console.log(str2[j])
					 					var str3 = str2[j].split(":");
					 					for(var u=0;u<str3.length;u++){
					 						if(str3[u+1]!=null && str3[u+1]!=""){
					 							h_start.push(str3[u+1]);
					 						}
					 					}
					 				}
					 			}
				 				return h_start;
				 			}
				 			function getH_end(){
				 				for(var i=0;i<str.length-1;i++){//解析字符串 获取user_name
					 				var str2 = str[i].split(";");
					 				for(var j=2;j<str2.length;j+=3){
//					 					console.log(str2[j])
					 					var str3 = str2[j].split(":");
					 					for(var u=0;u<str3.length;u++){
					 						if(str3[u+1]!=null && str3[u+1]!=""){
					 							h_end.push(str3[u+1]);
					 						}
					 					}
					 				}
					 			}
				 				return h_end;
				 			}
				 		},
				 		'error':function(XMLHttpResponse, textStatus, errorThrown){
				 			alert("系统出现错误");
				 			console.log("错误");
				 			console.log("1 异步调用返回失败,XMLHttpResponse.readyState:"+XMLHttpResponse.readyState);
		                    console.log("2 异步调用返回失败,XMLHttpResponse.status:"+XMLHttpResponse.status);
		                    console.log("3 异步调用返回失败,textStatus:"+textStatus);
		                    console.log("4 异步调用返回失败,errorThrown:"+errorThrown);
				 		}
				 	})
	        }
		    
		    
		    
		    function getHistory(){
		    	var url = "http://localhost:8080/TestWeb/servlet/HistoryServlet";
				var params = {"cookie":cookie,"start":start,"end":end};
				console.log(params);
				 $.ajax({
				 		'url':url,
				 		'data':params, 
				 		'type':"post",
				 		 'xhrFields': {
				                withCredentials: true // 这里设置了withCredentials
				            },
				 		'success':function(data){
				 			console.log(params.cookie);
				 			while(data.next()){
				 				console.log(data);
				 			}
				 			
//				 			alert(data);
				 		},
				 		'error':function(XMLHttpResponse, textStatus, errorThrown){
				 			alert("用户名或密码错误");
				 			console.log("用户名或密码错误");
				 			console.log("1 异步调用返回失败,XMLHttpResponse.readyState:"+XMLHttpResponse.readyState);
		                    console.log("2 异步调用返回失败,XMLHttpResponse.status:"+XMLHttpResponse.status);
		                    console.log("3 异步调用返回失败,textStatus:"+textStatus);
		                    console.log("4 异步调用返回失败,errorThrown:"+errorThrown);
				 		}
				 	})
		    }
		    
		    $(".conetent-left").on("click",".h_tr",function(){
		    	console.log(111)
		    	var h_start = $(this).children()[0].innerHTML;
		    	var h_end = $(this).children()[1].innerHTML;
		    	console.log(h_start);
		    	console.log(h_end);
		    	ipt_1.value = h_start;
		    	ipt_2.value = h_end;
		    	$('#history').hide();
		    })
		    var result = document.getElementById('r-result');
		    result.onclick = ttt;
		    function ttt(){
//	    		var tt = document.getElementsByClassName('trans-title');tranroute-plan-list
		    	var tt = document.getElementsByClassName('tranroute-plan-list');
    			console.log(tt);
    			console.log(tt.length);
    			var newArr = [];
    			for(var i=0;i<=tt.length-1;i++){
    				newArr.push(tt[i]);
    			}
    			console.log(newArr);
    			for(var i=0;i<newArr.length;i++){
    				console.log(newArr[i].innerText);
    			}
	    	}
//	    	setTimeout(ttt(),5000); 
		}
