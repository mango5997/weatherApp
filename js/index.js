 var weather;
 var city;
 $.ajax({
	url: "https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		weather=obj.data.weather;
		console.log(weather);

	}
})
 $.ajax({
 	url: "https://www.toutiao.com/stream/widget/local_weather/city/",
 	dataType:"jsonp",
	type:"get",
	success:function(obj){
		city=obj.data;
		console.log(obj.data);
	}
 })
 .done(function() {
 	console.log("success");
 })
 .fail(function() {
 	console.log("error");
 })
 .always(function() {
 	console.log("complete");
 });
 
//渲染数据
function update(){
	//当前城市
	var cityName=document.getElementsByClassName("header")[0];
	cityName.innerHTML=weather.city_name;
	//当前温度
 	var DQQW=document.getElementsByClassName("wd")[0];
 	DQQW.innerHTML=weather.current_temperature+"°";
 	//当前天气情况
 	var TQTQ=document.getElementsByClassName("tqqk")[0];
 	TQTQ.innerHTML=weather.current_condition;
 	// 今天最高温   span 用ID写
	var dat_high_temperature=document.getElementById("dat_high_temperature");
	dat_high_temperature.innerHTML=weather.dat_high_temperature;
	// 今天最低温   
	var dat_low_temperature=document.getElementById("dat_low_temperature");
	dat_low_temperature.innerHTML=weather.dat_low_temperature;
	//今天icon
	var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
	dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png);`;
	//今天天气情况
 	var day_condition=document.getElementById("day_condition");
 	day_condition.innerHTML=weather.day_condition;
	//明天最高温   
	var tomorrow_high_temperature=document.getElementById("tomorrow_high_temperature");
	tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
	// 明天最低温   
	var tomorrow_low_temperature=document.getElementById("tomorrow_low_temperature");
	tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature;
	//明天icon
	var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
	tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png);`;
	//明天天气情况
 	var tomorrow_condition=document.getElementById("tomorrow_condition");
 	tomorrow_condition.innerHTML=weather.tomorrow_condition;

//渲染现在天气情况
    for(var i in weather.hourly_forecast){
    	//创建父元素div
    	var now=document.createElement("div");
    	//给父元素div加样式
    	now.className="now";
    	//获取now的父元素
    	var nowp=document.getElementById("now");
    	//把now插入到父元素中
    	nowp.appendChild(now);

    	var now_time=document.createElement("h2");
    	now_time.className="now_time";
    	now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
    	now.appendChild(now_time);

    	var now_icon=document.createElement("div");
    	now_icon.className="now_icon";
		now_icon.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png);`; 
    	now.appendChild(now_icon);

    	var now_tem=document.createElement("div");
    	now_tem.className="now_tem";
    	now_tem.innerHTML=weather.hourly_forecast[i].temperature+"°";
    	now.appendChild(now_tem);
    }
 //渲染最近天气状况
	for (var j in weather.forecast_list){
    	// 创建父元素div
    	var recent=document.createElement("div");
    	recent.className="recent";
    	var recentp=document.getElementById("recent");
    	recentp.appendChild(recent);

    	//获取日期信息
    	console.log(weather.forecast_list[j].date.substring(5,7 ));
    	console.log(weather.forecast_list[j].date.substring(8));
    	
    	var recent_time=document.createElement("div");
    	recent_time.className="recent_time";
    	recent_time.innerHTML=weather.forecast_list[j].date.substring(5,7 )+"/"+weather.forecast_list[j].date.substring(8);
    	recent.appendChild(recent_time);


    	var recent_wea=document.createElement("h2");
    	recent_wea.className="recent_wea";
    	recent_wea.innerHTML=weather.forecast_list[j].condition;
    	recent.appendChild(recent_wea);

    	var  recent_pic=document.createElement("div");
    	recent_pic.className="recent_pic";
    	recent_pic.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png);`;
    	recent.appendChild(recent_pic);

    	var recent_high=document.createElement("h3");
    	recent_high.className="recent_high";
    	recent_high.innerHTML=weather.forecast_list[j].high_temperature+"°";
    	recent.appendChild(recent_high);

    	var recent_low=document.createElement("h4");
    	recent_low.className="recent_low";
    	recent_low.innerHTML=weather.forecast_list[j].low_temperature+"°";
    	recent.appendChild(recent_low);

    	var recent_wind=document.createElement("h5");
    	recent_wind.className="recent_wind";
    	recent_wind.innerHTML=weather.forecast_list[j].wind_direction;
    	recent.appendChild(recent_wind);

    	var recent_level=document.createElement("h6");
    	recent_level.className="recent_level";
    	recent_level.innerHTML=weather.forecast_list[j].wind_level+"级";
    	recent.appendChild(recent_level);
    }


//定义点击事件
		var header=document.getElementsByClassName("header")[0];
		var city_box=document.getElementsByClassName("city_box")[0];
		header.onclick=function(){
		//使搜索城市以后再点击城市出现搜索/取消
		$(".text").val("");
		$(".button").html("取消");
		city_box.style="display:block";
	 }
//渲染城市
    for(var k in city){
    	// console.log(k);
    	var cityp=document.getElementById("city");
    	var title=document.createElement("h1");
    	title.className="title";
    	title.innerHTML=k;
    	cityp.appendChild(title);

    	var con=document.createElement("div");
    	con.className="con";
    	for(var y in city[k]){
    		// console.log(y);
    		var erjy=document.createElement("div");
    		erjy.className="son";
    		erjy.innerHTML=y;
    		con.appendChild(erjy);
    	}
    	cityp.appendChild(con);
    }
}


//查找各城市的天气信息
function AJAX(str){
	$.ajax({
	url: `https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		weather=obj.data.weather;
		update();
		$(".city_box").css({"display":"none"});
		}
	})
}






//当页面加载完成执行的代码
window.onload=function(){
	update();
	//
	$(".son").on("click",function(){
		var cityh=this.innerHTML;
		AJAX(cityh);
	})
	//当input获取焦点，button变确认     确认写在函数里面  
	//focus  获取焦点
	// html 设置或改变元素的内容  -
	$(".text").on("focus",function(){
		$(".button").html("确认");	
	})
//操作按钮
	var button=document.getElementsByClassName("button")[0];
	// console.log(button);
//添加点击事件
	button.onclick=function(){
		//获取button中的的内容
		var btn=this.innerHTML;
		if(btn=="取消"){
			var city_box1=document.getElementsByClassName("city_box")[0];
			city_box1.style="display:none";
		}
		else{
			//获取text的值
			var str=document.getElementsByClassName("text")[0].value;
			console.log(str);
			for(var i in city){
				if(str==i){
					AJAX(str);
					//
					return;
				}
				else{
					for(var j in city[i]){
						if(str==j){
							AJAX(str);
							return;
						}
					}
				}
			}
		alert("没有该城市")
		}
	}
}




// 测试案例      var 狗=document.getElementsByClassName("×")-----从类名x获取数据
//调代码的思路： console.log(狗);  输出1  用来测试结果