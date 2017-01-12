'use strict';

var React = require('react');

import { Button, Input, Modal, Tooltip, OverlayTrigger, Tabs, Tab } from 'react-bootstrap'



var Confirmation = React.createClass({
	propTypes: {
		onDeleteConfirmation: React.PropTypes.func.isRequired
	},
	
	render:function() {
		let dt = ""
		let de = ""
		let dtStart = ""
		let dtFinish = ""
		let tm = ""
		let te = ""
		let tooltip = ""
		let activity = ""
		let description = ""
		let value = ""
		let uom = ""
		let comment = ""
		let activitytype = ""
		let id = ""
			
		if(this.props.sap==="X") {
			dt = this.props.confirmation.execstartdate
			de = this.props.confirmation.execfinishdate
			tm = this.props.confirmation.execstarttime
			te = this.props.confirmation.execfinishtime
			dtStart = dt.substring(0,4) + "-" + dt.substring(4,6) + "-" + dt.substring(6,8)
			dtFinish = de.substring(0,4) + "-" + de.substring(4,6) + "-" + de.substring(6,8)
			if(tm!=null) {
				tm = tm.substring(0,2) + ":" + tm.substring(2,4)
			}
			else {
				tm = ""
			}
			if(te!=null) {
				te = te.substring(0,2) + ":" + te.substring(2,4)
			}
			else {
				te = ""
			}
			if(tm!="") {
				dtStart = dtStart + " / " + tm
			}
			if(te!="") {
				dtFinish = dtFinish + " / " + te
			}
			activity = this.props.confirmation.operation
			description = this.props.confirmation.operation + " - " + this.props.operation.description
			value = this.props.confirmation.actual
			uom = this.props.confirmation.uom
			comment = this.props.confirmation.text
			activitytype = this.props.confirmation.activitytype
			id = this.props.id
			tooltip = <Tooltip id="tooltip">Cancel SAP confirmation</Tooltip>
		}
		else {
			if(this.props.confirmation.UoM === "HR") {
				dtStart = this.props.confirmation.startdate + " / " + this.props.confirmation.actualtime
				dtFinish = this.props.confirmation.finishdate  + " / " + this.props.confirmation.endtime
			}
			else {
				dtStart = this.props.confirmation.startdate
			}
			tooltip = <Tooltip id="tooltip">Clear confirmation</Tooltip>
			activity = ""
			description = this.props.confirmation.description
			value = this.props.confirmation.value
			uom = this.props.confirmation.UoM
			comment = this.props.confirmation.comment
			activitytype = this.props.confirmation.activitytype
			id = this.props.confirmation.id
		}
		return(
			<tr>
				<td>{description}</td>
				<td>{value}</td>
				<td>{uom}</td>
				<td>{dtStart}</td>
				<td>{dtFinish}</td>
				<td>{comment}</td>
				<td>
					<OverlayTrigger placement="bottom" overlay={tooltip}>
						<div className="btn btn-link" onClick={this.props.onDeleteConfirmation}>
							<div id={id} className="glyphicon glyphicon-trash"/>
						</div>
					</OverlayTrigger>
				</td>
			</tr>
		);
	}
});

var ConfirmationList = React.createClass({
	propTypes: {
		onDeleteConfirmation: React.PropTypes.func.isRequired,
		onConfirmConfirmations: React.PropTypes.func.isRequired
	},
	
	getInitialState() {
		return {
			"pendingCollapse": "",
			"newConfirmations": this.props.confirmations
		}
  	},
	
	collapsePending(event) {
  		var	coll = document.getElementById("newConfSection");
  		
		if(this.state.pendingCollapse=="collapse") {
			coll.className = "panel panel-collapse";
			this.setState({
				pendingCollapse: ""
			})
		} else {
			coll.className = "panel panel-collapse collapse";
			this.setState({
				pendingCollapse: "collapse"
			})
		}
	},

	render: function() {
		let confirmations = [];
		let title = "";
		let btnSAP = "";
		
		if(this.props.confirmations) {
			for(var i = 0; i < this.props.confirmations.length; i++) {
				let conf = <Confirmation key={this.props.confirmations[i].id} id={this.props.confirmations[i].id} confirmation={this.props.confirmations[i]} onDeleteConfirmation={this.props.onDeleteConfirmation} />
				confirmations.push(conf);
			}
		}
		
		if(this.state.pendingCollapse === "") {
			let tooltip = <Tooltip id="tooltip">Send confirmations to SAP</Tooltip>
			title = <div>New Confirmations <div className="glyphicon glyphicon-chevron-up"/></div>
			btnSAP = <div className="col-md-12">
						<div className="col-md-10"/>
						<div className="col-md-1">
							<OverlayTrigger placement="bottom" overlay={tooltip}>
								<div className="btn btn-primary" onClick={this.props.onConfirmConfirmations}>Confirm to SAP</div>
							</OverlayTrigger>
						</div>
					</div>	
					
		}
		else {
			title = <div>New Confirmations <div className="glyphicon glyphicon-chevron-down"/></div>
			btnSAP = ""
		}
		
		return(
			<div className="panel-group">
				<div>
					<div className="btn btn-link" onClick={this.collapsePending}>
						{title}
					</div>
					<div>
						{btnSAP}
					</div>
				</div>
				<div id="newConfSection" className="panel panel-collapse">
					<div className="panel-body conf-colored">
						<table className="table table-striped">
							<thead>
								<tr>
									<th>Operation</th>
									<th>Quantity</th>
									<th>UoM</th>
									<th>Start Date/Time</th>
									<th>End Date/Time</th>
									<th>Comments</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{confirmations}
							</tbody>
						</table>
					</div>
				</div>
		
			</div>
		);
	}
});

var SAPConfirmationList = React.createClass({
	propTypes: {
		onDeleteConfirmation: React.PropTypes.func.isRequired
	},
	
	getInitialState() {
		return {
			"pendingCollapse": "collapse",
		}
  	},
	
	
	collapsePending(event) {
  		var	coll = document.getElementById("sapConfSection");
  		
		if(this.state.pendingCollapse=="collapse") {
			coll.className = "panel panel-collapse";
			this.setState({
				pendingCollapse: ""
			})
		} else {
			coll.className = "panel panel-collapse collapse";
			this.setState({
				pendingCollapse: "collapse"
			})
		}
	},
		
	render: function() {
		let confirmations = [];
		let title = ""
		if(this.props.confirmations) {
			for(var i = 0; i < this.props.confirmations.length; i++) {
				let key = this.props.confirmations[i].conf_no + "_" + this.props.confirmations[i].conf_cntr
				let operation = null;
				for(var j = 0; j < this.props.order.operations.length; j++) {
					if(this.props.order.operations[j].activity === this.props.confirmations[i].operation) {
						operation = this.props.order.operations[j];
						j = this.props.order.operations.length;
					}
				}
				let conf = <Confirmation sap="X" key={key} id={key} confirmation={this.props.confirmations[i]} operation={operation} onDeleteConfirmation={this.props.onDeleteConfirmation} />
				confirmations.push(conf);
			}
		}
		if(this.state.pendingCollapse === "")
			title = <div>Existing Confirmations <div className="glyphicon glyphicon-chevron-up"/></div>
		else
			title = <div>Existing Confirmations <div className="glyphicon glyphicon-chevron-down"/></div>
	
		return(
			<div className="panel-group col-md-12 col-lg-12">
				<div>
					<div className="col-md-3 col-lg-2">
						<div id="sap" className="btn btn-link" onClick={this.collapsePending}>
						{title}</div>
					</div>
					<div className="col-md-4 col-lg-4">
					 	<div className="note-label">From {this.props.since}</div>
					</div>
				</div>
					<div id="sapConfSection" className="panel panel-collapse collapse">
					<div className="panel-body">
						<table className="table table-striped">
							<thead>
								<tr>
									<th>Operation</th>
									<th>Quantity</th>
									<th>UoM</th>
									<th>Start Date/Time</th>
									<th>End Date/Time</th>
									<th>Comments</th>
								</tr>
							</thead>
							<tbody>
								{confirmations}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
});

var Confirmations = React.createClass({
	propTypes: {
		onSaveConfirmations: React.PropTypes.func.isRequired
	},
	
	getInitialState() {
		return {
			 
		};
	  },

	
	render:function() {
		let submit = <i></i>
		let tooltip = <Tooltip id="tooltip">Send confirmations to SAP</Tooltip>
		let confList = <i></i>
		
		if(this.props.sap==="X") {
			confList = <SAPConfirmationList order={this.props.order} since={this.props.since} confirmations={this.props.confirmations} onDeleteConfirmation={this.props.onDeleteConfirmation} />
		}
		else {
			confList = <ConfirmationList sap={this.props.sap} confirmations={this.props.confirmations} onDeleteConfirmation={this.props.onDeleteConfirmation} onConfirmConfirmations={this.props.onSaveConfirmations} />
		}
			
		if(this.props.confirmations&&this.props.sap==="") {
			//submit = <OverlayTrigger placement="bottom" overlay={tooltip}><div className="btn btn-primary" onClick={this.props.onSaveConfirmations}>Confirm to SAP</div></OverlayTrigger>
		}
		else {
			tooltip = ""
		}
		return(
			
			<div>
					{ confList }
			</div>
		);
	}
});

module.exports = Confirmations;