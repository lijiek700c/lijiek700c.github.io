var selectDatas={
	user:[
		{
			label:'测试1',value:'D'
		},
		{
			label:'测试2',value:'T'
		}
	],
	misType:[
		{
			label:'临时',value:'tmp'
		},
		{
			label:'派发',value:'pf'
		}]
};
//jedate日期插件
function showDate(){
    var test=Object.prototype.toString;
    for(var i=0,len=arguments.length;i<len;i++){
        var arg=arguments[i];
        if(test.call(arg).slice(8,-1)!=='Object'){
            return; 
        }else{
            if(typeof arg.id!=='string'){
                return;
            }
            var str='#'+$.trim(arg.id);
            if(arg.isYmd){
                $(str).jeDate({
                    isinitVal:true,
                    minDate: '2016-06-16 23:59:59',
                    format:"YYYY-MM-DD",
                    zIndex:3000
                });
            }
            if(arg.isYmdHms){
                $(str).jeDate({
                    /*isinitVal:true,
                    ishmsVal:true,*/
                    minDate: '2016-06-16 23:59:59',
                    format:"YYYY-MM-DD hh:mm:ss",
                    zIndex:3000,
                });
            }
        }
    }
}
//
$.when($.ready).done(function(){
	var owner='测试人';
	//侧边栏
	Vue.component('mis-menu',{
		template:'<li class="first">'+
					'<div class="fe-mis_sideBar_selectItem" :data-name="model.name" :class="{on:model.isSelected}" @click="selectTab($event)">'+
						'<i class="fl icon" :class="model.iconClass"></i>'+
						'<span class="fl txt" v-text="model.txt"></span>'+
						'<i class="fr arrow"></i>'+
					'</div>'+
					'<ul class="subMenu fe-transition" v-if="isFolder">'+
						'<mis-menu v-for="(item,index) in model.children" :key="index" :model="item">'+
						'</mis-menu>'+
					'</ul>'+
				'</li>',
		props:{
			model:{
				type:Object
			},
			num:{
				type:Number
			}
		},
		computed:{
			isFolder:function(){
				return this.model.children&&this.model.children.length>0;
			}
		},
		data:function(){
			return {};
		},
		methods:{
			selectTab:function(ev){
				var $this=$(ev.currentTarget);
				$this.parent().siblings().children('.fe-mis_sideBar_selectItem').removeClass('on');
				$this.toggleClass('on');
				this.$root.componentName=$this.attr('data-name');  //切换
				localStorage.setItem('initComponentName',$this.attr('data-name'));
			}
		}
	});
	//任务审批
	Vue.component('task-approval',{
		template:'#task-approval',
		mounted:function(){
			
		},
		data:function(){
			return {
				showVersion:true,//是否显示版本
				propData:{    //传进
					tabsData:[    //版本tab栏
						{
							txt:'1.0版本',
							isSelect:false
						},
						{
							txt:'初始版本',
							isSelect:true
						}
					],
					versionData:[  //传进版本组件的数据
						{
							projectName:'项目2',
							isShow:false    //版本显示或隐藏
						},
						{
							projectName:'项目1',
							isShow:true
						}
					]
				}
			};
		},
		methods:{
			
		}
	});
	//相关事务
	Vue.component('related-affairs',{
		template:'#related-affairs',
		data:function(){
			return {};
		}
	});
	//新建任务
	Vue.component('new-task',{
		template:'#new-task',
		mounted:function(){
			showDate({id:'newStart',isYmd:true});
			showDate({id:'newEnd',isYmd:true});
		},
		data:function(){
			return {};
		}
	});
	//草稿箱
	Vue.component('drafts',{
		template:'#drafts',
		data:function(){
			return {};
		}
	});
	//完成任务
	Vue.component('finish-task',{
		template:'#finish-task',
		data:function(){
			return {};
		}
	});
	//数据统计
	Vue.component('data-statistics',{
		template:'#data-statistics',
		mounted:function(){
			showDate({id:'tjStart',isYmd:true});
			showDate({id:'tjEnd',isYmd:true});
			this.myChart = echarts.init(document.getElementById('charts'));
			this.myChart.setOption(this.option);
		},
		data:function(){
			return {
				myChart:null,  //图表
				option:{
					textStyle:{
						color:'#828890',
						lineHeight:38,
						fontSize:16
					},
				    legend: {
				        data:['测试人1','测试人2'],
				        textStyle:{
				        	fontSize:14
				        }
				    },
					tooltip:{
						show:true,
						trigger:'axis',
						formatter:'{a}--任务数：{c}<br />{a1}--任务数：{c1}',
				        textStyle:{
				        	fontSize:12
				        }
					},
					animationEasing:'elasticInOut',
				    xAxis:{
				        type:'category',
       	 				boundaryGap: false,
				        data:['1月份','2月份','3月份','4月份','5月份','6月份','7月份','8月份','9月份','10月份','11月份','12月份'],
				        axisLine:{
				        	lineStyle:{
				        		color:'#828890'
				        	}
				        },
				        axisLabel:{
				        	align:'center'
				        }
				    },
				    yAxis:{
				        type:'value',
				        axisLine:{
				        	lineStyle:{
				        		color:'#828890'
				        	}
				        },
				        axisTick:{
				        	lineStyle:{
				        		color:'#828890'
				        	}
				        }
				    },
				    series:[
					    {
					    	name:'测试人1',
					        data:[90,20,30,60,50,60,70,80,90,100,90,80],
					        type:'line',
					        stack:'测试人1',
					        itemStyle:{
					        	color:'#49AEF2'
					        },
					        lineStyle:{
					        	color:'#49AEF2'
					        },
	       					areaStyle:{
	       						color:'#87ddf9',
	       						opacity:0.3
	       					}
					    },
					    {
					    	name:'测试人2',
					        data:[20,100,30,60,90,60,50,60,90,10,90,20],
					        type:'line',
					        stack:'测试人2',
					        itemStyle:{
					        	color:'#49AEF2'
					        },
					        lineStyle:{
					        	color:'#49AEF2'
					        },
	       					areaStyle:{
	       						color:'#87ddf9',
	       						opacity:0.3
	       					}
					    }
				    ]
				}	
			};
		},
		methods:{
			test:function(){  //测试修改图表
				this.option.series[0].data[1]=100;
				this.myChart.setOption(this.option);
			}
		}
	});
	//提醒设置
	Vue.component('remind-setting',{
		template:'#remind-setting',
		mounted:function(){
			showDate({id:'rsStart',isYmd:true});
			showDate({id:'rsEnd',isYmd:true});
			//console.log($(this.$el).find('#rsStart').val());
		},
		data:function(){
			return {};
		}
	});
	//任务审批组件
	Vue.component('ta-version-box',{
		template:'#ta-version-box',
		props:{
			model:{
				type:Object
			},
			showVersion:{
				type:Boolean
			}
		},
		created:function(){
			this.getedData=$.extend(true,{},this.model);
		},
		data:function(){
			return {
				getedData:null
			};
		},
		methods:{
			add:function(){
				this.getedData.tabsData.unshift({
					txt:'2.0版本',
					isSelect:false
				});
				var tmpArrs=this.getedData.versionData.splice(0,this.getedData.versionData.length);
				this.getedData.versionData=null;
				tmpArrs.unshift({
					projectName:'项目3',
					isShow:false    //版本显示或隐藏
				});
				this.$nextTick($.proxy(function(){
					this.getedData.versionData=tmpArrs;
					tmpArrs=null;
				},this));
			},
			tabVersion:function(index){  //切换显示的版本
				this.getedData.tabsData.forEach(function(item){
					item.isSelect=false;
				});
				this.getedData.versionData.forEach(function(item){
					item.isShow=false;
				});
				this.getedData.tabsData[index].isSelect=true;
				this.getedData.versionData[index].isShow=true;
			}
		}
	});
	//任务审批版本
	Vue.component('ta-version',{
		template:'#ta-version',
		props:{
			model:{
				type:Object
			},
			isShow:{
				type:Boolean
			}
		},
		created:function(){
			this.ownData=$.extend(true,{},this.model);
		},
		mounted:function(){
			console.log(this.ownData);
			//日期插件
			showDate({id:this.ownData.startTime,isYmd:true});
			showDate({id:this.ownData.endTime,isYmd:true});
		},
		data:function(){
			return {
				ownData:null
			};
		}
	});
	//下拉框
	Vue.component('mis-type',{
		template:'#mis-type',
		props:['type','initSelected'],
		created:function(){
			this.optionDatas=$.extend(true,{},selectDatas);
		},
		data:function(){
			return {
				optionDatas:null
			};
		}
	});
	new Vue({
		data:{
			componentName:'task-approval',
			menuDatas:[
				{
					name:'task-approval',
					txt:'任务审批',
					iconClass:'icon-1',
					isSelected:false/*,
					children:[
						{
							name:'test3'
						},
						{
							name:'test3'
						}
					]*/
				},
				{
					name:'related-affairs',
					txt:'相关事务',
					iconClass:'icon-2',
					isSelected:false,
				},
				{
					name:'new-task',
					txt:'新建任务',
					iconClass:'icon-3',
					isSelected:false,
				},
				{
					name:'drafts',
					txt:'草稿箱',
					iconClass:'icon-4',
					isSelected:false
				},
				{
					name:'finish-task',
					txt:'完成任务',
					iconClass:'icon-5',
					isSelected:false,
				},
				{
					name:'data-statistics',
					txt:'数据统计',
					iconClass:'icon-6',
					isSelected:false,
				},
				{
					name:'remind-setting',
					txt:'提醒设置',
					iconClass:'icon-7',
					isSelected:false
				}
			],
			headSearchStr:''
		},
		created:function(){
			var initComponentName=localStorage.getItem('initComponentName');
			if(initComponentName){
				this.menuDatas.forEach(function(item,i){
					item.isSelected=false;
					if(item.name===initComponentName){
						item.isSelected=true;
					}
				});
				this.componentName=initComponentName;
			}else{
				this.menuDatas[0].isSelected=true;
			}
			
		},
		mounted:function(){
		},
		computed:{
			isEmpty:function(){
				return this.headSearchStr==='';
			}
		},
		methods:{
			
		}
	}).$mount('.fe-container');
});