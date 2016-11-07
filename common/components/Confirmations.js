'use strict';

var React = require('react');

import { Button, Input, Modal, Tooltip, OverlayTrigger, Tabs, Tab } from 'react-bootstrap'



var Confirmation = React.createClass({
	propTypes: {
		onDeleteConfirmation: React.PropTypes.func.isRequired
	},
	
	render:function() {
	
		let dt = this.props.confirmation.datetime.replace("T", " / ");
		let tooltip = <Tooltip id="tooltip">Clear confirmation</Tooltip>
		
		return(
			<tr>
				<td>{this.props.confirmation.activity}</td>
				<td>{this.props.confirmation.description}</td>
				<td>{this.props.confirmation.value}</td>
				<td>{dt}</td>
				<td>{this.props.confirmation.comment}</td>
				<td><i>{this.props.confirmation.activitytype}</i></td>
				<td>
					<OverlayTrigger placement="bottom" overlay={tooltip}>
						<div className="btn btn-link" onClick={this.props.onDeleteConfirmation}>
							<div id={this.props.confirmation.id} className="glyphicon glyphicon-trash"/>
						</div>
					</OverlayTrigger>
				</td>
			</tr>
		);
	}
});

var ConfirmationList = React.createClass({
	propTypes: {
		onDeleteConfirmation: React.PropTypes.func.isRequired
	},
	
	getInitialState() {
		return {
			"pendingCollapse": "",
			"confirmations": this.props.confirmations
		}
  	},
	
	collapsePending() {
  		var coll = document.getElementById("newConfSection");
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
		
		if(this.props.confirmations) {
			for(var i = 0; i < this.props.confirmations.length; i++) {
				let conf = <Confirmation key={this.props.confirmations[i].id} confirmation={this.props.confirmations[i]} onDeleteConfirmation={this.props.onDeleteConfirmation} />
				confirmations.push(conf);
			}
		};
	
		return(
			<div className="panel-group">
				<div className="btn btn-link" onClick={this.collapsePending}>Confirmations</div>
				<div id="newConfSection" className="panel panel-collapse">
					<div className="panel-body">
						<table className="table table-striped">
							<thead>
								<tr>
									<th>Activity</th>
									<th>Description</th>
									<th>Quantity</th>
									<th>Start Date/Time</th>
									<th>Comments</th>
									<th>Act.Type</th>
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

var SAPConfirmation = React.createClass({
	
	render:function() {
		
		return(
			<tr>
				<td>{this.props.confirmation.activity}</td>
				<td>{this.props.confirmation.description}</td>
				<td>{this.props.confirmation.value}</td>
				<td>{this.props.confirmation.value}</td>
			</tr>
		);
	}
});

var SAPConfirmationList = React.createClass({
	
	render: function() {
		let confirmations = [];
		if(this.props.confirmations) {
			for(var i = 0; i < this.props.confirmations.length; i++) {
				let conf = <Confirmation key={this.props.confirmations[i].id} confirmation={this.props.confirmations[i]} onDeleteConfirmation={this.props.onDeleteConfirmation} />
				confirmations.push(conf);
			}
		};
	
		return(
			<Tabs>
				<Tab title="Pending Confirmations">
					<table className="table table-striped">
						<thead>
							<tr>
								<th>Activity</th>
								<th>Description</th>
								<th>Quantity</th>
								<th>Comments</th>
								<th colSpan="2">Start Date/Time</th>
							</tr>
						</thead>
						<tbody>
							{confirmations}
						</tbody>
					</table>
				</Tab>
			</Tabs>
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
		let confList = <ConfirmationList confirmations={this.props.confirmations} onDeleteConfirmation={this.props.onDeleteConfirmation} />
		
		if(this.props.confirmations) {
			submit = <div className="btn btn-primary" onClick={this.props.onSaveConfirmations}>Confirm to SAP</div>
		}
		return(
			
			<div className="col-md-12">
				<div className="col-md-10">
					{ confList }
				</div>
				<div className="col-md-2">
					<OverlayTrigger placement="bottom" overlay={tooltip}>
						{ submit }
					</OverlayTrigger>
				</div>
				
			
			</div>
		);
	}
});

module.exports = Confirmations;