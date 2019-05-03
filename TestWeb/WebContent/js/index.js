window.onload = function() {
	
			//功能代码
			var ipt_1 = document.getElementById("text1");
			var ipt_2 = document.getElementById("text2");
			var btn_change = document.getElementById("btn_change");
			var btn_search = document.getElementById("btn_search");
			var nav_bus = document.getElementsByClassName("nav_bus")[0];
			var nav_walk = document.getElementsByClassName("nav_walk")[0];
			var nav_drive = document.getElementsByClassName("nav_drive")[0];
			//tab标签切换
			// var nav_li = document.getElementById("nav_ul").getElementsByTagName("li")
			var nav_li = document.getElementById("nav_li");
			//console.log(nav_li);
			for(var i = 0; i<=nav_li.length; i++){
				nav_li[i].onclick = function (){
					for (var j = 0; j < nav_li.length; j++) {
						nav_li[j].classList.add("cancel");
					}
					this.classList.remove("cancel");
					this.classList.add("current");
				}
			}

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
		    var start = document.getElementById("start");
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
		    		start.innerHTML = ipt_1.value;
			    	end.innerHTML = ipt_2.value;
			    	console.log(start.innerHTML);
			    	console.log(end.innerHTML);
			    	transit.search(start.innerHTML,end.innerHTML);
		    	},
		    	drive_search:function(){
		    		start.innerHTML = ipt_1.value;
			    	end.innerHTML = ipt_2.value;
			    	console.log(start.innerHTML);
			    	console.log(end.innerHTML);
			    	driving.search(start.innerHTML,end.innerHTML);
		    	},
		    	walk_search:function(){
		    		start.innerHTML = ipt_1.value;
			    	end.innerHTML = ipt_2.value;
					walking.search(start.innerHTML, end.innerHTML);
		    	}
		    }
		    
			

			// var geolocation = new BMap.Geolocation();
			// 	geolocation.getCurrentPosition(function(r){
			// 		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			// 			var mk = new BMap.Marker(r.point);
			// 			map.addOverlay(mk);
			// 			map.panTo(r.point);
			// 			alert('您的位置：'+r.point.lng+','+r.point.lat);
			// 		}
			// 		else {
			// 			alert('failed'+this.getStatus());
			// 		}        
			// 	});

			// function myFun(result){
			// 	var cityName = result.name;
			// 	map.setCenter(cityName);
			// 	alert("当前定位城市:"+cityName);
			// }
			// var myCity = new BMap.LocalCity();
			// myCity.get(myFun); 

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
		    //console.log(cookie);
		    if(arrStr!==null && arrStr!==""){//cookie不为空则添加进页面
		    	login.children[0].innerHTML = "欢迎您，"+cookie;
			    register.children[0].innerHTML = "退出";
			    register.children[0].href = "#";
			    register.id = "back";
			    //点击退出删除cookie
			    var back = document.getElementById('back');
			    back.click = delCookie(cookie);
			    console.log(cookie);
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
		    function delCookie(name){
		    	setCookie("username",name,-1);
		    	console.log(cookie);
		    }
		    
		    function setCookie(c_name,value,expiredays){
				var exdate=new Date()
				exdate.setDate(exdate.getDate()+expiredays)
				document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
			}
		}
