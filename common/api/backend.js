'use strict';

var Backend = exports;

var moment = require('moment')
var request = require('superagent')
var sprintf = require('util').format
// var BASE_URL = 'http://127.0.0.1:4567/sap/zrest/STC'
var SAP_CLIENT = 'sap-client=500&sap-language=EN';
var BASE_URL = '/sap/zrest/stc';
var WORKCENTER_ENTITY = 'workcenter';
var ORDER_ENTITY = "serviceorder";

Backend.getWorkCenterDetails = function (workcenter, cb, cb_error) {
	  var j = {
	    'werks': workcenter.substring(0,4),
	    'arbpl': workcenter
	  }
	  request
	    .get(sprintf('%s/%s?%s', BASE_URL, WORKCENTER_ENTITY, SAP_CLIENT))
	    .query({'action': 'GET_BY_WORKCENTER'})
	    .query({'json': JSON.stringify(j)})
	    .accept('json')
	    .end(function (err, res) {
	      if (!err && res.body) {
	        var data = res.body[0].model;
	        var result = []
	        if (data.length > 0 && data[0].workcenters.length > 0) {
	        	var workcenters = data[0].workcenters
	        	for (var i = 0; i < workcenters.length; i++) {
	                var workcenter = {
	                  'arbpl': workcenters[i].arbpl.toUpperCase(),
	                  'name': workcenters[i].arbpl_name,
	                  'begin_date': workcenters[i].begda,
	                  'end_date': workcenters[i].endda,
	                  'cost_center': workcenters[i].kostl,
	                  'resp_code': workcenters[i].veran,
	                  'resp_name': workcenters[i].veran_name,
	                  'plant': workcenters[i].werks,
	                  'objid': workcenters[i].objid
	                }
	             result.push(workcenter);
	          }
	          
	          cb(result)
	          //console.log(JSON.stringify(result));
	        } else {
	          //cb_error()
	        }
	      }
	      else {
	    	  cb_error(res.error)
	      }
	})
};
	
Backend.getOrderDetails = function (workcenter, ordertype, cb, cb_error) {
	var j = {
			'planplant': workcenter.arbpl.substring(0,4),
			'plant': workcenter.arbpl.substring(0,4),
		    'mn_wk_ctr': workcenter.arbpl,
		    'order_type': ordertype
		  }
		  request
		    .get(sprintf('%s/%s?%s', BASE_URL, ORDER_ENTITY, SAP_CLIENT))
		    .query({'action': 'GET_BY_WORKCENTER'})
		    .query({'json': JSON.stringify(j)})
		    .accept('json')
		    .end(function (err, res) {
		      if (!err && res.body) {
		        var data = res.body[0].model;
		        var result;
		        var operations;
		        if (data.length > 0 ) {
		        	for (var i = 0; i < data.length; i++) {
		        		var orderid = parseInt(data[i].orderid)
		                var order = {
		                  'orderid': orderid,
		                  'description': data[i].description,
		                  'orderRead': true,
		                  'operations': data[i].operations
		        		}
		                //  'operations': data[i].operations,
		                //}
		             result = order;
		          }
		          
		          cb(result)
		          //console.log(JSON.stringify(result));
		        } else {
		          cb_error()
		        }
		      }
		      else {
		    	  cb_error(err.message)
		      }
		})
};

Backend.saveOrderConfirmations = function (confirmations, orderid, cb, cb_error) {
	var j = {
			'orderid': orderid,
			'confirmations': confirmations
	}
	request
		.get(sprintf('%s/%s?%s', BASE_URL, ORDER_ENTITY, SAP_CLIENT))
		.query({'action': 'SAVE_CONFIRMATIONS'})
		.query({'json': JSON.stringify(j)})
		.accept('json')
		.end(function (err, res) {
			if (!err && res.body)  {
				cb()
			} else {
				cb_error()
			}
		})
};

Backend.getOrderConfirmations = function (orderid, datefrom, dateto, cb, cb_error) {
	datefrom = 20160101;
	dateto = 20161231;
	var j = {
			'order_no': orderid,
			'start_date': datefrom,
		    'end_date': dateto
		  }
		  request
		  	.get(sprintf('%s/%s?%s', BASE_URL, ORDER_ENTITY, SAP_CLIENT))
		  	.query({'action': 'GET_CONFIRMATIONS'})
		  	.query({'json': JSON.stringify(j)})
		  	.accept('json')
		  	.end(function (err, res) {
			      if (!err && res.body)  {
			    	var data = res.body[0].model;
			        var result;
			        if (data.length > 0 ) {
			        	for (var i = 0; i < data.length; i++) {
			        		var orderid = parseInt(data[i].orderid)
			                var order = {
			                  'orderid': orderid,
			                  'description': data[i].description,
			                  'confirmations': data[i].confirmations,
			                }
			             result = order.confirmations;
			          }
			          
			          cb(result)
			          //console.log(JSON.stringify(result));
			        } else {
			          cb_error()
			        }
			      }
			      else {
			    	  cb_error(err.message)
			      }
			})
};