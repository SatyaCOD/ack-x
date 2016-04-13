"use strict";
var ack = global.ack,
	assert = require('assert')

describe('ack.object',function(){
	it('#isCyclic',function(){
		var a = {}
		var b = {}
		var c = {}

		a.b=b;b.a=a;

		assert.equal(ack.object(a).isCyclic(), true)
		assert.equal(ack.object(c).isCyclic(), false)
	})

	it('#toCookieString',function(){
		var cString = ack.object({test:22, likely:33}).toCookieString()
		assert.equal(cString, 'test=22; likely=33')
	})
})