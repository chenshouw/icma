/**
 * （公用）弹出框拓展--按需求自行添加
 * 信息提示框---BootboxExt.alert(提示信息,回调函数)
 * 确认提示框---BootboxExt.confirm(提示信息,回调函数)
 */
var BootboxExt = function () {
	return{
		alert:function(message,callback){
			bootbox.setDefaults("locale","zh_CN");//使用中文API
			bootbox.alert({  
	            buttons: {  
	               ok: {  
	                    label: '确 定',  
	                    className: 'btn red'  
	                }  
	            },  
	            message: message,  
	            callback:callback,
	            onEscape:callback,
	            title: "提示信息"  
	        });
		},
		confirm:function(message,callback){
			bootbox.setDefaults("locale","zh_CN");//使用中文API
			bootbox.confirm({  
		        buttons: {  
		            confirm: {  
		                label: '确 认',  
		                className: 'btn red'  
		            },  
		            cancel: {  
		                label: '取 消',  
		                className: 'btn btn-default'  
		            }  
		        },  
		        message:message,  
		        callback:function(result){callback(result);},
		        onEscape:function(result){callback(result);},
		        title: "操作提示信息"
			});
		}
	}
}();