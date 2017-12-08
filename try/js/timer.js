define(function(){
	var timer=(new function(){
		var stos=[],sivs=[],that=this;
		//  设置setTimeout
		this.setTimeout=function(fn,delay){   
			var id=stos.length;
			stos[id]={   //放入stos队列
				fn:fn,
				paused:false,
				delay:delay,
				start:new Date().getTime(),
				id:setTimeout(function(){
					fn&&fn();
					that.clearTimeout(id);
				},delay)
			};
			return id;      //返回stos对应的下标
		};
		this.clearTimeout=function(id){     //清除setTimeout
			var sto=stos[id];   //根据id获取stos队列中对应的setTimeout
			if(sto===undefined)return false;
			//清除setTimeout
			clearTimeout(sto.id);
			//删除stos队列中的对应id
			stos.splice(id,1);
			return true;
		};
		this.pauseTimeout=function(id){
			var sto=stos[id];   //根据id获取stos队列中对应的setTimeout
			if(sto===undefined||sto.paused===true){
				return false;
			}
			//标记暂停
			sto.paused=true;
			//清空Timeout
			clearTimeout(sto.id);
			var elapse=new Date().getTime()-sto.start;
			//重置delay
			sto.delay=sto.delay-elapse;
			return true;
		};
		this.resumeTimeout=function(id){
			var sto=stos[id];   //根据id获取stos队列中对应的setTimeout
			if(sto===undefined||sto.paused===false){
				return false;
			}
			//标记为恢复
			sto.paused=false;
			//新建一个timeout表示继续
			sto.id=stos[timer.setTimeout(sto.fn,sto.delay)].id;
			return true;
		};
		//设置 setInterval
		this.setInterval=function(fn,delay){
			var id=sivs.length;
			sivs[id]={
				fn:fn,
				paused:false,
				delay:delay,
				start:new Date().getTime(),
				id:setInterval(fn,delay)
			};
			return id;    //返回sivs对应的下标
		};
		this.clearInterval=function(id){   //清除setInterval
			var siv=sivs[id];
			if(siv===undefined){
				return false;
			}
			//清空Interval
			clearInterval(siv.id);
			//删除对应的siv.id
			sivs.splice(id,1);
			return true;
		};
		//清空所有的timeout
		this.cleanTimeout=function(){
			for(var i=0;i<stos.length;i++){
				var sto=stos[i];
				//清空timeout
				clearTimeout(sto.id);
			}
			//stos=[];
			stos.length=0;  //清空stos数组
		};
		//清空所有的interval
		this.cleanInterval=function(){
			for(var i=0;i<sivs.length;i++){
				var siv=sivs[i];
				clearInterval(siv.id);
			}
			//sivs=[];
			sivs.length=0;  //清空sivs数组
		};
		//清空所有的timeout和interval
		this.clean=function(){
			this.cleanTimeout();
			this.cleanInterval();
			return true;
		};
		//暂停interval
		this.pauseInterval=function(id){
			var siv=sivs[id];
			if(siv===undefined||siv.paused===true){
				return false;
			}
			//标记暂停
			siv.paused=true;
			//清空interval
			clearInterval(siv.id);
			var elapse=(new Date().getTime()-siv.start)%siv.delay;
			//添加一个wait属性
			siv.wait=siv.delay-elapse;
			return true;
		};
		//恢复interval
		this.resumeInterval=function(id){
			var siv=sivs[id];
			if(siv===undefined||siv.paused===false){
				return false;
			}
			//标记恢复
			siv.paused=false;
			//执行一个setTimeout执行wait的时间
			this.setTimeout(function(){
				siv.fn();
				//新建一个interval表示继续
				siv.id=sivs[timer.setInterval(siv.fn,siv.delay)].id;
			},siv.wait);
			return true;
		};
		//  暂停全部timeout和interval,或者只暂停timeout,interval
		this.pause=function(id){
			if(id===undefined){
				//暂停全部的timeout和interval
				stos.forEach(function(item,id){
					that.pauseTimeout(id);
				});
				sivs.forEach(function(item,id){
					that.pauseInterval(id);
				});
				return true;
			}else if(stos[id]!==undefined){
				this.pauseTimeout(id);
				return true;
			}else if(sivs[id]!==undefined){
				this.pauseInterval(id);
				return true;
			}	
			return false;
		}; 
		//  恢复全部timeout和interval,或者只恢复timeout,interval
		this.resume=function(id){
			if(id===undefined){
				stos.forEach(function(item,id){
					that.resumeTimeout(id);
				});
				sivs.forEach(function(item,id){
					that.resumeInterval(id);
				});
				return true;
			}else if(stos[id]!==undefined){
				this.resumeTimeout(id);
				return true;
			}else if(sivs[id]!==undefined){
				this.resumeInterval(id);
				return true;
			}
			return false;
		};
	}());
	return timer;
});