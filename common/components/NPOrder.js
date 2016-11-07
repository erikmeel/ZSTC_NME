'use strict';

var React = require('react');

import { Button, Input, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap'
import Confirmations from './Confirmations'

var OperationList = React.createClass({
	propTypes: {
		onSaveConfirmations: React.PropTypes.func.isRequired
	},
	
  
	getInitialState() {
		return {
			"datum": null,
			"confirmations": [],
			"confValue": "",
			"confDate": "",
			"confComment": "",
			"selectedOperation": 0,
			"confirmationnr": "",
			"newConfID": 0
		}
  	},
  	
  	onSetValue(event) {
  		let ele = event.target;
  		if(ele.id === "confVal") {
  			this.setState({
  				"confValue": ele.value
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
  	  				confirmations: confirmations
  	  	  		});
	},
  	
  	onOperationChange(event) {
  		let operations = [];
  		let index = event.target.selectedIndex;
  
  		operations = this.props.operations;
  		let operation = operations.filter(function(v) { return v.activity == event.target.value })[0];
  		let UoMLabel = document.getElementById("UoM");
  		UoMLabel.textContent = operation.UoM;
  		
  		this.setState({
  			operationIndex: index,
  			confirmationnr: operation.confirmation
  		})
  	},
  	
  	addConfirmation(e) {
  		var eve = e || window.event;
	    var keycode = eve.keyCode || eve.which || eve.charCode;
	    
	    if(keycode === 13 || eve.type === "click") {

  			var v = this.state.confValue;
  			var dt = this.state.confDate;
  			var cmt = this.state.confComment;
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
  				var conf = {
  					'id': id,
  					'activity': selectedOperation.value,
  					'description': selectedOperation.text,
	  				'value': v,
  					'UoM': operation.UoM,
  					'comment': cmt,
  					'datetime': dt,
  					'activitytype': operation.activitytype,
	  				'confirmationnr': confnr
  				}
  				confirmations.push(conf);
  				this.setState({
  	  				confirmations: confirmations,
  	  				newConfID: id,
  	  				confValue: "",
  	  				confDate:"",
  	  				confComment: ""
  	  			})
  	  		}
  	  	}
  	},
  	
  saveConfirmations() {
  	let confirmations = this.state.confirmations
  	
  	this.props.onSaveConfirmations(confirmations, 
				  () => {
					  this.setState({
						  confirmations: [],
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
  		let elDate = document.getElementById(elName);
  		elDate.value = today+"T00:00";	
  		this.setState({
  			datum : elDate.value,
  			confDate: elDate.value
  		})
  	}
  },
  
  render: function () {
  	let selOper = <i></i>
  	let UoM = <i></i>
  	let tabConfirmations = <i></i>
  	let newConfirmations = <i></i>
  	let tooltip = <Tooltip id="tooltip">Add confirmation</Tooltip>
  	
  	if(this.props.operations) {
  		let operations = [];
  		for(var i = 0; i < this.props.operations.length; i++) {
  			let operationText = this.props.operations[i].activity + " - " + this.props.operations[i].description
  			let operationOption = <option key={this.props.operations[i].confirmation} id={this.props.operations[i].confirmation} value={this.props.operations[i].activity}>{operationText}</option>
  			operations.push(operationOption)
  			if(i == 0)
  			 UoM = <div id="UoM" className="uom">{this.props.operations[i].UoM}</div>
  		}
  		selOper = <Input type='select' id="operationSelect" placeholder='select' onChange={this.onOperationChange}>{operations}</Input>
  	}
  	
  	if(this.state.confirmations) {
  		let confirmations = [];
  		if(this.state.confirmations.length>0) { 
  			newConfirmations = <div><Confirmations confirmations={this.state.confirmations} onDeleteConfirmation={this.onDeleteConfirmation} onSaveConfirmations={this.saveConfirmations}/></div>
  		}
  	}
    
    return (
      <div className="container">
      	<h3>Enter confirmation</h3>
        <div className="col-sm-3">
          	{selOper}
        </div>
        <div className="col-sm-2">
        	<input className="form-control operation-value" id="confVal" onChange={this.onSetValue} onKeyPress={this.addConfirmation}
         			type="number" placeholder="confirmation" min="0" step="1" value={this.state.confValue}>
        	</input>
        </div>
        <div className="col-sm-1">
          	{UoM}
        </div>
        <div className="col-sm-3">
        	<input className="form-control" ref="confDate" id="confDate" onChange={this.onSetValue}  onKeyPress={this.addConfirmation}
        	 		name="confDate" data-date-format="DD/MM/YYYY" onFocus={this.handleDateFocus.bind(null, 'confDate')} type="datetime-local" value={this.state.confDate} />
        </div>
        <div className="col-sm-2">
        	<input className="form-control" ref="confComment" id="confComment" onChange={this.onSetValue} onKeyPress={this.addConfirmation}
        			name="confComment" type="text" placeholder="Comment" value={this.state.confComment}>
        	</input>
        </div>
        <div className="col-sm-1">
   			<OverlayTrigger placement="bottom" overlay={tooltip}>
          		<div className="btn btn-link" onClick={this.addConfirmation}>
          			<div className="glyphicon glyphicon-plus"/>
          		</div>
          	</OverlayTrigger>
        </div>
        <div className="row col-lg-12">
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
    	orderHeader = <div><div className="col-lg-2"><h2>{this.props.order.orderid}</h2></div><div className="col-lg-9"><h2>{this.props.order.description}</h2></div></div>
    	operationList = <OperationList operations={this.props.order.operations} onSaveConfirmations={this.props.onSaveConfirmations} />
    }

    return (
      <div>
      	<div className="col-lg-12">
      		{ orderHeader }
      	</div>
      	<div className="col-lg-12 well">
      		{ operationList }
	    </div>
      </div>	  
    );
  }
});

module.exports = NPOrder;
