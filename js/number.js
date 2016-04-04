"use strict";
var jXNumber = function jXNumber(number){
	this.number = number
	return this
}

jXNumber.prototype.decimalFormat = function(p){
  p = p==null ? 2 : p
  var m=Math.pow(10,p)
    ,n=this.number
  return (Math.round(n*m)/m).toFixed(p)
}

/**
  @options - {}
  @options.date - default=new Date()
*/
jXNumber.prototype.asMinutesToDateTime = function(options){
  options = options || {}
  var minute = this.number
  var iDate = options.date || new Date()
  var date = new Date(iDate.getFullYear(), iDate.getMonth(), iDate.getDate(), 0, minute)

  return date
}

/**
  @options = {}
  @options.timeDelim - default=':'
  @optiosn.dayPeriodDelim - default=' '
*/
jXNumber.prototype.asMinutesToTime = function(options){
  options = options || {}
  options.timeDelim = options.timeDelim || ':'
  options.dayPeriodDelim = options.dayPeriodDelim || ' '
  var d = this.asMinutesToDateTime(options)
  var hour = d.getHours()
  var tt = 'AM'
  var mins = d.getMinutes()

  if(hour > 12){
    tt = 'PM'
    hour = hour - 12
  }

  mins = mins.toString().length == 1 ? '0'+mins : mins

  return hour +options.timeDelim+ mins +options.dayPeriodDelim+ tt;
}


var rtn = function(path){return new jXNumber(path)}
if(typeof(module)!='undefined' && module.exports){
	rtn.Class = jXNumber
	module.exports = rtn
}else if(typeof(jX)!='undefined'){
	jX.modules.define('number', rtn)
}