"use strict";
var ack = require('../../index'),
	assert = require('assert')


describe('ack.date',function(){
	var date,ndate

	beforeEach(function(){
		date = ack.date('2/12/2013')
		ndate = ack.date(new Date())
	})

	it('accepts-number',function(){
		assert.equal(ack.date(1457471202852).date, 'Tue Mar 08 2016 16:06:42 GMT-0500 (EST)')
	})

	it('#getFullYear',function(){
		var D = new Date()
		assert.equal(ack.date(D).date.toString(), D.toString())
		assert.equal(ack.date(D).date.getFullYear(), D.getFullYear())
	})

	it('#gt',function(){
		assert.equal(ndate.gt(date),true,'Todays date is greater')
		assert.equal(ndate.gt('2/21/2013'),true,'Todays date is greater')
	})

	it('#lt',function(){
		assert.equal(date.lt(ndate),true,'SetDate is lesser')
		assert.equal(date.lt(),true,'set date is lesser')
	})

	it('#minuteOfDay',function(){
		assert.equal(ack.date().now().minuteOfDay() >= new Date().getMinutes(), true)
	})

	it('#getWeeksWithMondayInYearExposedArray',function(){
		var jDate = ack.date('8/3/2015')
		var yweArray = jDate.getWeeksWithMondayInYearExposedArray()
		assert.equal(yweArray.length, 53)
		for(var weekIndex=1; weekIndex < yweArray.length-1; ++weekIndex){//!!!Non ISO weeks so at least the first and last week may not match
			assert.equal(yweArray[weekIndex].week(), weekIndex+1)
		}
	})

	it('#getMonthDateProperNumber',function(){
		assert.equal(ack.date('2/01/2016').getMonthDateProperNumber(), '1st')
		assert.equal(ack.date('2/02/2016').getMonthDateProperNumber(), '2nd')
		assert.equal(ack.date('2/03/2016').getMonthDateProperNumber(), '3rd')
		assert.equal(ack.date('2/4/2016').getMonthDateProperNumber(), '4th')
	})

	it('#mmmmdyyyy',function(){
		assert.equal(ack.date('2/24/2016').mmmmdyyyy(), 'February 24th 2016')
	})

	it('#daysInMonth',function(){
		assert.equal(ack.date('7/02/2015').daysInMonth(), 31)
		assert.equal(ack.date('8/1/2015').daysInMonth(), 31)
	})

	describe('gotos',function(){
		it('#sod#gotoStartOfDate',function(){
			var sod = ack.date('7/1/2015').gotoSod().date
			assert.equal(sod.getHours(), 1)
			assert.equal(sod.getMinutes(), 0)
			assert.equal(sod.getMilliseconds(), 0)
		})

		it('#eod#gotoEndOfDate',function(){
			var sod = ack.date('7/1/2015').gotoEod().date
			assert.equal(sod.getHours(), 23)
			assert.equal(sod.getMinutes(), 59)
			assert.equal(sod.getMilliseconds(), 999)
		})
	})


	it('#isWeekend',function(){
		assert.equal(ack.date('7/31/2015').isWeekend(), false)
		assert.equal(ack.date('8/1/2015').isWeekend(), true)
	})

	it('#getDayName',function(){
		assert.equal( ack.date('06/16/2015').getDayName(), 'Tuesday' )
	})

	it('#getDayAbbr',function(){
		assert.equal( ack.date('06/16/2015').getDayAbbr(), 'Tue' )
	})

	describe('#gotoMondayOfWeek',function(){
		it('tuesday',function(){
			date = ack.date('4/7/2015').gotoMondayOfWeek()
			assert(date.mmddyyyy,'04/06/2015')
		})

		it('monday',function(){
			date = ack.date('3/30/2015').gotoMondayOfWeek()
			assert(date.mmddyyyy,'03/30/2015')
		})

		it('monday2',function(){
			date = ack.date('4/6/2015').gotoMondayOfWeek()
			assert(date.mmddyyyy,'04/06/2015')
		})
	})

	it('#addHours',function(){
		var d0 = new Date('01/01/2015 02:00:00'),
			d1 = ack.date(new Date(d0)).addHours(5),
			diff = d1.dateHourDiff(d0)

		assert.equal(diff,5,'added 5 hours but got '+diff)
	})

	it('#addMinutes',function(){
		var d0 = new Date('01/01/2015 02:00:00'),
			d1 = ack.date(new Date(d0)).addMinutes(6),
			diff = d1.dateMinuteDiff(d0)

		assert.equal(diff, 6, 'added 6 minutes but got '+diff)
	})

	it('#addSeconds',function(){
		var d0, d1
		d0 = d1 = new Date()

		var	D1 = ack.date(d1).addSeconds(5),
			diff = D1.dateSecondDiff(d0)
		assert.equal(diff,5,'added 5 seconds but got '+diff)
	})

	describe('#nextYear',function(){
		it('works',function(){
			assert.equal(ack.date().now().nextYear().year(), new Date().getFullYear()+1)
		})

		it('#new',function(){
			assert.equal(ack.date().now().nextYear().new().year(), new Date().getFullYear()+1)
		})

		it('backwards',function(){
			assert.equal(ack.date().now().nextYear(-1).year(), new Date().getFullYear()-1)
		})
	})

	describe('#priorYear',function(){
		it('works',function(){
			assert.equal(ack.date().now().priorYear().year(), new Date().getFullYear()-1)
		})

		it('#new',function(){
			assert.equal(ack.date().now().priorYear().new().year(), new Date().getFullYear()-1)
		})
	})

	it('#dateMinuteDiff',function(){
		var d0 = new Date(),
			D0 = ack.date(d0),
			D1 = ack.date(new Date(d0)).addYear(2),
			diff = D1.dateYearDiff(d0),
			diff2 = D0.dateYearDiff( D1.date )
		assert.equal(diff,2,'added 2 years but got '+diff)
		assert.equal(diff2,2,'added 2 years but got '+diff2)
	})

	it('#dateMinuteDiff',function(){
		var d0 = new Date(),
			D0 = ack.date(d0),
			D1 = ack.date(new Date(d0)).addSeconds(120),
			diff = D1.dateMinuteDiff(d0),
			diff2 = D0.dateMinuteDiff( D1.date )

		assert.equal(diff,2,'added 2 minutes but got '+diff)
		assert.equal(diff2,2,'added 2 minutes but got '+diff2)
	})

	it('#dateDayDiff',function(){
		var d = new Date()
		assert.equal(ack.date().now().dateDayDiff(d), 0)

		d = ack.date().now().addDays(1)
		assert.equal(ack.date().now().dateDayDiff(d), 1)
	})

	it('#fullWeeksLeftInMonth', function(){
		assert.equal(ack.date('07/20/2015').fullWeeksLeftInMonth(), 1)
	})

	it('#weekInMonth',function(){
		assert.equal(ack.date('07/01/2015').weekInMonth(), 1)
		assert.equal(ack.date('07/06/2015').weekInMonth(), 2)
		assert.equal(ack.date('07/13/2015').weekInMonth(), 3)
		assert.equal(ack.date('07/20/2015').weekInMonth(), 4)
		assert.equal(ack.date('07/31/2015').weekInMonth(), 5)
	})

	it('#nextMonth',function(){
		var nD = ack.date('4/1/2015').nextMonth(22).date
		assert.equal(nD.getMonth(),1)
		assert.equal(nD.getFullYear(),2017)
	})

	describe('#priorMonth',function(){
		it('2',function(){
			var nD = ack.date('4/1/2015').priorMonth(2).date
			assert.equal(nD.getMonth(),1)
			assert.equal(nD.getFullYear(),2015)
		})

		it('22',function(){
			var nD = ack.date('4/1/2015').priorMonth(22).date
			assert.equal(nD.getMonth(),5)
			assert.equal(nD.getFullYear(),2013)
		})
	})

	describe('#nextYear',function(){
		it('works',function(){
			var nD = ack.date('4/1/2015').nextWeek(1).date
			assert.equal(nD.getDate(),8)
			assert.equal(nD.getFullYear(),2015)
		})

		it('rotates-year',function(){
			var nD = ack.date('1/1/2015').nextWeek(-1).date
			assert.equal(nD.getFullYear(),2014)

			var nD = ack.date('12/29/2015').nextWeek().date
			assert.equal(nD.getFullYear(),2016)
		})
	})

	describe('#priorWeek',function(){
		it('3',function(){
			var nD = ack.date('4/1/2015').priorWeek(3).date
			assert.equal(nD.getMonth(),2)
			assert.equal(nD.getDate(),11)
			assert.equal(nD.getFullYear(),2015)
		})

		it('1',function(){
			var nD = ack.date('4/1/2015').priorWeek(1).date
			assert.equal(nD.getDate(),25)
			assert.equal(nD.getFullYear(),2015)
		})
	})

	it('#getMonthAbbr',function(){
		var nD = ack.date('4/1/2015').getMonthAbbr()
		assert.equal(nD,'Apr')
	})

	it('hhmmtt',function(){
		var jDate = ack.date('Tue Mar 01 2016 11:30:51 GMT-0500 (EST)')
		var val = jDate.hhmmtt()
		assert.equal(val, '11:30 AM')

		var jDate = ack.date('Tue Mar 01 2016 12:30:51 GMT-0500 (EST)')
		var val = jDate.hhmmtt()
		assert.equal(val, '12:30 PM')

		var jDate = ack.date('Tue Mar 01 2016 13:30:51 GMT-0500 (EST)')
		var val = jDate.hhmmtt()
		assert.equal(val, '01:30 PM')
	})

	it('hmmtt',function(){
		var jDate = ack.date('Tue Mar 01 2016 11:30:51 GMT-0500 (EST)')
		var val = jDate.hmmtt()
		assert.equal(val, '11:30 AM')

		var jDate = ack.date('Tue Mar 01 2016 12:30:51 GMT-0500 (EST)')
		var val = jDate.hmmtt()
		assert.equal(val, '12:30 PM')

		var jDate = ack.date('Tue Mar 01 2016 13:30:51 GMT-0500 (EST)')
		var val = jDate.hmmtt()
		assert.equal(val, '1:30 PM')
	})

	it('#storageFormat',function(){
		var nD = ack.date('Sun Jul 12 2015 15:58:28 GMT-0400 (EDT)')
		assert.equal(nD.storageFormat(),'2015-07-12 15:58:28.0')
	})

	it('#dateMonthDiff',function(){
		var diff0 = ack.date('2016/01/01').dateMonthDiff('2016/02/01')
		var diff1 = ack.date('2016/02/01').dateMonthDiff('2016/01/01')
		assert.equal(diff0, 1)
		assert.equal(diff1, 1)
	})

	it('#getDateWeekStop',function(){
		var jDate = ack.date('3/8/2016')
		assert.equal(jDate.getDateWeekStop(), 'Sat Mar 12 2016 23:59:59 GMT-0500 (EST)');
	})
})