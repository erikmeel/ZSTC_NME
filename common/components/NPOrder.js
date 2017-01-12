'use strict';

var React = require('react');
var InputSlider = require('react-input-slider');
var moment = require('moment');
moment.locale('fr');

import { Grid, Row, Col, Button, Input, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap'

import Confirmations from './Confirmations'


var OperationList = React.createClass({
	propTypes: {
		onSaveConfirmations: React.PropTypes.func.isRequired
	},
	
  
	getInitialState() {
		var uom = "";
		let startHr = "";
		let startMn = "";
		
		//Get work center start time
		let startTime = moment()
		startTime.set({hour:0,minute:0,second:0})
		startTime.add(parseInt(this.props.workcenter.begzt),'second')
		
		if(this.props.operations.length > 0 )
			uom = this.props.operations[0].UoM
			
		if(startTime.hours()<10)
			startHr = "0" + startTime.hours().toString()
		else
			startHr = startTime.hours().toString()
			
		if(startTime.minutes()<10)
  			startMn = "0" + startTime.minutes().toString()
  		else
  			startMn = startTime.minutes().toString()
			
		return {
			"datum": null,
			"orderRead": false,
			"confirmations": [],
			"confValue": "",
			"confDate": "",
			"confComment": "",
			"selectedOperation": 0,
			"confirmationnr": "",
			"newConfID": 0,
			"uom": uom,
			"actual_start_time": startTime,
			"actual_end_time": startTime,
			"actual_start_hour": startHr,
			"actual_start_minute": startMn,
			"additional_days": 0
		}
  	},
  	
  	onSetValue(event) {
  		let ele = event.target;
  		let stTime = this.state.actual_start_time;
  		let enDate = moment()
  		let enTime = moment(stTime);
  		let startHr = "00";
  		let startMn = "00";
  		let addDays = 0
  		
  		if(ele.id === "confVal") {
  			if(this.state.uom === "HR") {
  				var i = parseFloat(ele.value)
  				while(i > parseFloat(this.props.workcenter.duration)) {
  					i = i - parseFloat(this.props.workcenter.duration)
  					addDays += 1
  				}
  				
  				let addMinutes = 60 * parseFloat(i)
  				let addBreak = 0
  				//add Break if leftover working time is more than half duration of the working day.
  				if(i > (parseFloat(this.props.workcenter.duration) / 2)) {
  					addBreak = parseInt(this.props.workcenter.pause) / 60
  				}
  				enTime.add(addMinutes+addBreak, 'minute')
  			}
  			this.setState({
  				"confValue": ele.value,
  				"actual_start_time": stTime,
  				"actual_end_time": enTime,
  				"additional_days": addDays
  				})
  		}
  		if(ele.id === "confHour") {
  			stTime = this.state.actual_start_time
  			stTime.hour(ele.value)
  			enTime = moment(stTime)
  			startHr = stTime.hours()
  			
  			if(event.type === "blur") {	
  				if(stTime.hours()<10)
  					startHr = "0" + stTime.hours().toString()
  				else
  					startHr = stTime.hours().toString()
  			
  				if(this.state.uom === "HR" && this.state.confValue != "") {
  					var i = parseFloat(this.state.confValue)
  					while(i > parseFloat(this.props.workcenter.duration)) {
	  					i = i - parseFloat(this.props.workcenter.duration)
	  					enTime.set({hour:0,minute:0,second:0})
	  					enTime.add(parseInt(this.props.workcenter.begzt),'second')
  					}
  					let addMinutes = 60 * parseFloat(i)
  					let addBreak = 0
  					//add Break if leftover working time is more than half duration of the working day.
  					if(i > (parseFloat(this.props.workcenter.duration) / 2)) {
  						addBreak = parseInt(this.props.workcenter.pause) / 60
  					}
  					enTime.add(addMinutes+addBreak, 'minute')
  					
  				}
  			}
  			
  			this.setState({
  				actual_start_time: stTime,
  				actual_end_time: enTime,
  				actual_start_hour: startHr
  			}) 
  		}
  		if(ele.id === "confMinute") {
			stTime = this.state.actual_start_time
  			stTime.minutes(ele.value)
  			enTime = moment(stTime)
  			startMn = stTime.minutes()
  			
  			if(event.type === "blur") {
  				if(stTime.minutes()<10)
  					startMn = "0" + stTime.minutes().toString()
  				else
  					startMn = stTime.minutes()
  			
  				if(this.state.uom === "HR" && this.state.confValue != "") {
  					var i = parseFloat(this.state.confValue)
  					while(i > parseFloat(this.props.workcenter.duration)) {
	  					i = i - parseFloat(this.props.workcenter.duration)
	  					enTime.set({hour:0,minute:0,second:0})
	  					enTime.add(parseInt(this.props.workcenter.begzt),'second')
  					}
  					let addMinutes = 60 * parseFloat(i)
  					let addBreak = 0
  					//add Break if leftover working time is more than half duration of the working day.
  					if(i > (parseFloat(this.props.workcenter.duration) / 2)) {
  						addBreak = parseInt(this.props.workcenter.pause) / 60
  					}
  					enTime.add(addMinutes+addBreak, 'minute')
  					
  				}
  			}
  			
  			this.setState({
  				actual_start_time: stTime,
  				actual_end_time: enTime,
  				actual_start_minute: startMn
  			})  		
  		}
  		if(ele.id === "confDate") {
  			this.setState({
  				"confDate": ele.value
  				})
  		}
  		if(ele.id === "confComment") {
  			this.setState({
  				"confComment": ele.value
  				})
  		}
  		
  	},
  	
  	onDeleteConfirmation(event) {
  		let id = parseInt(event.target.id);
  		let confirmations = this.state.confirmations;
  		for(var i=0; i < confirmations.length; i++) {
  			if(confirmations[i].id === id) {
  				confirmations.splice(i, 1);
  			}
  		}
  		this.setState({
  	  				newConfirmations: confirmations
  	  	  		});
	},
  	
  	onOperationChange(event) {
  		let operations = [];
  		let index = event.target.selectedIndex;
  		let startHr = "";
		let startMn = "";
			
		if(moment().hours()<10)
			startHr = "0" + moment().hours().toString()
		else
			startHr = moment().hours().toString()
			
		if(moment().minutes()<10)
  			startMn = "0" + moment().minutes().toString()
  		else
  			startMn = moment().minutes().toString()
		
  		operations = this.props.operations;
  		let operation = operations.filter(function(v) { return v.activity == event.target.value })[0];
  		
  		this.setState({
  			operationIndex: index,
  			confirmationnr: operation.confirmation,
  			uom: operation.UoM,
  			actual_start_hour: startHr,
			actual_start_minute: startMn
  		})
  	},
  	
  	addConfirmation(e) {
  		var eve = e || window.event;
	    var keycode = eve.keyCode || eve.which || eve.charCode;
	    
	    if(keycode === 13 || eve.type === "click") {

  			var v = this.state.confValue;
  			var dt = this.state.confDate;
  			var addDays = this.state.additional_days;
  			var stTime = this.state.actual_start_time.format("HH:mm"); 
  			var enTime = this.state.actual_end_time.format("HH:mm");
  			var cmt = this.state.confComment;
  			if(this.state.uom !== "HR") {
  				stTime = "00:00"
  				enTime = "00:00"
  			}
  			if(v=="" || dt=="") {
  			}
  			else {
	  			var operationSelect = document.getElementById("operationSelect");
  				var index = operationSelect.selectedIndex;
	  			var selectedOperation = operationSelect.options[index];
	  			var confnr = selectedOperation.id;
  				var confirmations = this.state.confirmations;
  				var id = parseInt(this.state.newConfID) + 1;
  				var operations = this.props.operations;
  				var operation = null;
  				for(var i = 0; i < operations.length; i++) {
  					if(operations[i].confirmation === confnr) {
  					  operation = operations[i];
  					  i = operations.length;
  					}
  				}
  				
  				//Calculate finish date
  				var dtEnd = moment();
  				dtEnd.year(parseInt(dt.substring(0,4)));
  				dtEnd.month(parseInt(dt.substring(5,7))-1);
  				dtEnd.date(parseInt(dt.substring(8,10)));
  				dtEnd.add(addDays, "day");
  				var dtFinish = dtEnd.toISOString().substring(0,10);
  				
  				var conf = {
  					'id': id,
  					'activity': selectedOperation.value,
  					'description': selectedOperation.text,
	  				'value': v,
  					'UoM': operation.UoM,
  					'comment': cmt,
  					'startdate': dt,
  					'finishdate': dtFinish,
  					'actualtime': stTime,
  					'endtime': enTime,
  					'activitytype': operation.activitytype,
	  				'confirmationnr': confnr
  				}
  				confirmations.push(conf);
  				this.setState({
  	  				newConfirmations: confirmations,
  	  				newConfID: id,
  	  				confValue: "",
  	  				confDate:"",
  	  				confComment: ""
  	  			})
  	  		}
  	  	}
  	},
  	
  saveConfirmations() {
  	let confirmations = this.state.newConfirmations
  	
  	this.props.onSaveConfirmations(confirmations, 
				  () => {
					  this.setState({
						  newConfirmations: [],
						  newConfID: 0,
						  confValue: "",
						  confDate: "",
						  confComment: ""
					  });
				  },
				  () => {
					  alert("Error in processing confirmations")
				  });
		  
  },
  	
  	
  handleDateFocus(elName, event) {
  	if(!this.state.confDate) {
  		let today = new Date().toISOString().substr(0,10);
  		//let elDate = document.getElementById(elName);
  		//elDate.value = today+"T00:00";	
  		this.setState({
  			datum : today,
  			confDate: today
  		})
  	}
  },
    
  render: function () {
  	let selOper = <i></i>
  	let UoM = <i></i>
  	let tabConfirmations = <i></i>
  	let newConfirmations = <i></i>
  	let timeVisible = "col-sm-2 "
  	let commentsClass = "col-md-3 col-lg-2"
  	let tooltip = <Tooltip id="tooltip">Add confirmation</Tooltip>
  	let endDate = moment().toISOString().substring(0,10)
  	
  	if(this.props.operations) {
  		let operations = [];
  		for(var i = 0; i < this.props.operations.length; i++) {
  			let operationText = this.props.operations[i].activity + " - " + this.props.operations[i].description
  			let operationOption = <option key={this.props.operations[i].confirmation} id={this.props.operations[i].confirmation} value={this.props.operations[i].activity}>{operationText}</option>
  			operations.push(operationOption)
  			if(this.state.uom === "") {
  			 	UoM = <div id="UoM" className="uom">{this.props.operations[i].UoM}</div>
  			 }
  			 else {
  			 	UoM = <div id="UoM" className="uom">{this.state.uom}</div>
  			 }
  		}
  		selOper = <Input type='select' id="operationSelect" placeholder='select' onChange={this.onOperationChange}>{operations}</Input>
  	}
  	
  	if(this.state.confDate !== "") {
  		endDate = this.state.confDate
  		let calcEndDate = moment()
  		calcEndDate.year(parseInt(endDate.substring(0,4)))
  		calcEndDate.month(parseInt(endDate.substring(5,7))-1)
  		calcEndDate.date(parseInt(endDate.substring(8,10)))
  		calcEndDate.add(parseInt(this.state.additional_days), 'day')
  		endDate = calcEndDate.toISOString().substring(0,10) + "/"
   	}
   	else {
   		endDate = endDate + "/"
   	}
  	
  	if(this.state.uom === "HR") {
  	   timeVisible = "col-md-3 col-lg-3"
  	   commentsClass = "col-md-3 col-lg-2"
  	}
  	else {
  		timeVisible = "col-md-3 col-lg-3 hidden"
  		commentsClass = "col-md-5 col-lg-5"
  	}
  	
  	if(this.state.newConfirmations) {
  		let confirmations = [];
  		if(this.state.newConfirmations.length>0) { 
  			newConfirmations = <div><Confirmations sap="" confirmations={this.state.confirmations} onDeleteConfirmation={this.onDeleteConfirmation} onSaveConfirmations={this.saveConfirmations}/></div>
  		}
  	}
    
    return (
      <div className="col-md-12 col-lg-12">
      	<h4>Enter confirmation</h4>
      	<div>
      		<div className="col-md-2 col-lg-2">Operation</div>
      		<div className="col-md-2 col-lg-2">
      			<div className="col-md-8 col-lg-8">Quantity</div>
      			<div className="col-md-2 col-lg-2">UoM</div>
      		</div>
      		<div className="col-md-2 col-lg-2">Start Date</div>
      		<div className={timeVisible}>
      			<div className="col-md-6 col-lg-6">Start Time</div>
      			<div className="col-sm-6 col-lg-6">End Date/Time</div>
      		</div>
      		<div className={commentsClass}>Comment</div>
      	</div>
        <div className="col-md-2 col-lg-2">
          	{selOper}
        </div>
        <div className="col-md-2 col-lg-2">
        	<div className="col-md-8 col-lg-8">
        		<input className="form-control operation-value" id="confVal" onChange={this.onSetValue} onKeyPress={this.addConfirmation}
         			type="number" placeholder="Quantity" min="0" step="1" value={this.state.confValue}>
        		</input>
        	</div>
        	<div className="col-md-4 col-lg-4">
          		{UoM}
        	</div>
        </div>
        <div className="col-md-2 col-lg-2">
        	<input className="form-control" ref="confDate" id="confDate" onChange={this.onSetValue} onKeyPress={this.addConfirmation}
        	 		name="confDate" onFocus={this.handleDateFocus.bind(null, 'confDate')} type="date" value={this.state.confDate} />
        </div>
        <div className={timeVisible}>
        		<div className="col-md-2 col-lg-2 time-entry text-center">
        				<input className="time-input" type="number" id="confHour" onChange={this.onSetValue} onBlur={this.onSetValue} onKeyPress={this.addConfirmation}
        					placeholder="00" min="0" max="23" step="1" value={this.state.actual_start_hour}>
        				</input>
       			</div>
   				
       			<div className="col-md-2 col-lg-2 time-entry text-center">
        				<input className="time-input" type="number" id="confMinute" onChange={this.onSetValue} onBlur={this.onSetValue} onKeyPress={this.addConfirmation}
        					placeholder="00" min="0" max="59" step="1" value={this.state.actual_start_minute}>
        				</input>
        		</div>
				<div className="col-md-1 col-lg-1"/>
        		<div className="col-md-7 col-lg-6 text-center">
        				<div className="Label time-noentry">{endDate} {this.state.actual_end_time.format("HH:mm")}</div>
        		</div>
        </div>
        <div className="col-md-1 col-lg-2">
        	<input className="form-control" ref="confComment" id="confComment" onChange={this.onSetValue} onKeyPress={this.addConfirmation}
        			name="confComment" type="text" placeholder="Comment" value={this.state.confComment}>
        	</input>
        </div>
        <div className="col-md-1 col-lg-1">
   			<OverlayTrigger placement="bottom" overlay={tooltip}>
          		<div className="btn btn-link" onClick={this.addConfirmation}>
          			<div className="glyphicon glyphicon-plus"/>
          		</div>
          	</OverlayTrigger>
        </div>
        <div className="col-md-12 col-lg-12">
      		{newConfirmations}
      	</div>
      </div>
      
    )
  }
});

var NPOrder = React.createClass({
	propTypes: {
		onSaveConfirmations: React.PropTypes.func.isRequired
	},
	
	
  getInitialState() {
	return {
		 
	};
  },

  render: function () {
    let operationList = <i></i> 
    let orderHeader = <i></i>
    
    if(this.props.order) {
    	orderHeader = <div className="col-md-12 col-lg-12"><div className="col-md-2 col-lg-2"><h3>{this.props.order.orderid}</h3></div><div className="col-md-10 col-lg-10"><h3>{this.props.order.description}</h3></div></div>
    	operationList = <div className="col-md-12 col-lg-12"><OperationList operations={this.props.order.operations} workcenter={this.props.workcenter} onSaveConfirmations={this.props.onSaveConfirmations} /></div>
    }

    return (
      <div>
      	{ orderHeader }      	
      	{ operationList }
      </div>	  
    );
  }
});

module.exports = NPOrder;
