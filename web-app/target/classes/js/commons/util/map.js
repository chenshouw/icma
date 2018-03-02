/**
 * 去掉字符串的前后空格并且将空字符串转Null
 */
String.prototype.trim = function (){
	var text=$.trim(this);
	if(text==""){
		return null;
	}else{
		return text;	
	}
}

/**   
 * 去掉字符串两端空白    
 */ 
String.prototype.trimStr = function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

Array.prototype.remove = function(s) {     
    for (var i = 0; i < this.length; i++) {     
        if (s == this[i])     
            this.splice(i, 1);     
    }     
}

function Map() {     
    /** 存放键的数组(遍历用到) */    
    this.keys = new Array();     
    /** 存放数据 */    
    this.data = new Object();     
         
    /**   
     * 放入一个键值对   
     * @param {String} key   
     * @param {Object} value   
     */    
    this.put = function(key, value) {     
        if(this.data[key] == null){     
            this.keys.push(key);     
        }     
        this.data[key] = value;     
    };     
         
    /**   
     * 获取某键对应的值   
     * @param {String} key   
     * @return {Object} value   
     */    
    this.get = function(key) {     
        return this.data[key];     
    };     
    
	this.containsKey = function(key){
		if(this.data[key] == null){
			return false;
		}else{
			return true;
		}
	};     
    /**   
     * 删除一个键值对   
     * @param {String} key   
     */    
    this.remove = function(key) {     
        this.keys.remove(key);     
        this.data[key] = null;     
    };     
         
    /**   
     * 遍历Map,执行处理函数   
     *    
     * @param {Function} 回调函数 function(key,value,index){..}   
     */    
    this.each = function(fn){     
        if(typeof fn != 'function'){     
            return;     
        }     
        var len = this.keys.length;     
        for(var i=0;i<len;i++){     
            var k = this.keys[i];     
            fn(k,this.data[k],i);     
        }     
    };     
         
    /**   
     * 获取键值数组(类似Java的entrySet())   
     * @return 键值对象{key,value}的数组   
     */    
    this.entrys = function() {     
        var len = this.keys.length;     
        var entrys = new Array(len);     
        for (var i = 0; i < len; i++) {     
            entrys[i] = {     
                key : this.keys[i],     
                value : this.data[i]     
            };     
        }     
        return entrys;     
    };     
         
    /**   
     * 判断Map是否为空   
     */    
    this.isEmpty = function() {     
        return this.keys.length == 0;     
    };     
         
    /**   
     * 获取键值对数量   
     */    
    this.size = function(){     
        return this.keys.length;     
    };     
         
    /**   
     * 重写toString    
     */    
    this.toString = function(){     
        var s = "{";     
        for(var i=0;i<this.keys.length;i++){     
            var k = this.keys[i];  
			if(i == this.keys.length-1){
				 s += k+"="+this.data[k];
			}else{
				s += k+"="+this.data[k];
				s += ','
			}     
        }     
        s+="}";     
        return s;     
    }; 
}