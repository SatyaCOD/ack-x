"use strict";
var jXArray = function jXArray(array){
	this.array = array
	return this
}

//pivets array of objects to object of arrays
jXArray.prototype.objectify = function(){
	if(!this.array.length)return {}

	var x,n,s,r={}

	s = this.array[0]
	for(n in s){
		r[n] = []
	}

	for(x=this.array.length-1; x >= 0; --x){
		s = this.array[x]
		for(n in s){
			r[n].unshift(s[n])
		}
	}
	return r
}

//append an array's items onto the end of this array
jXArray.prototype.appendArray = function(){
	//each argument maybe another array
	for(var argIn=0; argIn < arguments.length; ++argIn){
		var array = arguments[argIn]
		for(var aI=0; aI < array.length; ++aI){
			this.array.push(array[aI])
		}
	}

	return this
}
jXArray.prototype.union = jXArray.prototype.appendArray

//prepend an array's items onto the front of this array
jXArray.prototype.prependArray = function(){
	//each argument maybe another array
	for(var argIn=0; argIn < arguments.length; ++argIn){
		var array = arguments[argIn]
		for(var aI=array.length-1; aI >= 0; --aI){
			this.array.unshift(array[aI])
		}
	}

	return this
}

jXArray.prototype.sum = function(method){
	var n=0,a = this.array
	method = method || function(v,i){return v}
	for(var i=a.length-1; i >= 0; --i){
		n = n + Number(method(a[i],i))
	}
	return n
}

//grouptype = sequence || struct. WHEN isIndexValue=true THEN return array contains back reference to orginal array index
jXArray.prototype.group = function(method, isIndexValue, grouptype){
	method = method ? method : function(v){return v}
	grouptype = grouptype ? grouptype : 'sequence'
	isIndexValue = isIndexValue==null ? 0 : isIndexValue

	var array = this.array

	if(grouptype == 'struct'){
		var struct = {};
		for(var x=0; x < array.length; ++x){
			var a = array[x]
			var v = method(a);
			if(struct[v]==null)struct[v]=[];
			struct[v].push(isIndexValue ? x : a);
		}
		return struct;
	}

	var rArray = [[]];
	var cVal = 0;
	for(var x=0; x < array.length; ++x){
		var a = array[x];
		var v = method(a);
		if(cVal != v && x > 1)rArray.push([]);
		cVal=v;
		rArray[rArray.length-1].push(isIndexValue ? x : a);
	}

	return rArray;
}

var rtn = function(path){return new jXArray(path)}
if(typeof(module)!='undefined' && module.exports){
	rtn.Class = jXArray
	module.exports = rtn
}else if(typeof(jX)!='undefined'){
	jX.modules.define('array', rtn)
}