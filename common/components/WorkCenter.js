'use strict';

var React = require('react');
var moment = require('moment');
moment.locale('fr');

import { Grid, Row, Col, Button, Input, Modal } from 'react-bootstrap'

var WorkCenterInfo = React.createClass({
	propTypes: {
    	validWorkCenter: React.PropTypes.bool,
    	needToChooseWorkCenter: React.PropTypes.bool
    	
  },
  
	getInitialState() {
		return {

		 
	};
  },

  render: function () {
  
  	let workStartTime = moment()
  	let workEndTime = moment()
  	let pauseTime = moment()
  	
  	workStartTime.set({hour:0,minute:0,second:0})
  	workEndTime.set({hour:0,minute:0,second:0})
  	pauseTime.set({hour:0,minute:0,second:0})
  	 
  	workStartTime.add(this.props.workcenter.begzt, 'second')
  	workEndTime.add(this.props.workcenter.endzt, 'second')
  	pauseTime.add(this.props.workcenter.pause, 'second')
    
    return (
    <Grid fluid="1">
    	<Row  className="show-grid">
    	<Col md={2} lg={2}>
      		<div className="text-center workcenter-widget"><h3>{ this.props.workcenter.name }</h3></div>
      	</Col>
        <Col md={10} lg={10}>
        	<Grid fluid="1">
        		<Row className="workcenter-widget">
          			<Col md={2} lg={2}>Work Center: { this.props.workcenter.arbpl }</Col>
          			<Col md={3} lg={3}>Cost Center: { this.props.workcenter.cost_center }</Col>
          			<Col md={3} lg={3}>Responsible: { this.props.workcenter.resp_code } - { this.props.workcenter.resp_name }</Col>
          			<Col md={2} lg={2}>Valid from: { this.props.workcenter.begin_date }</Col>
        			<Col md={2} lg={2}>Valid to: { this.props.workcenter.end_date }</Col>
          		</Row>
          		<Row className="workcenter-widget">
          			<Col md={2} lg={2}>Start time: { workStartTime.toLocaleString().substring(16,21) }</Col>
          			<Col md={2} lg={2}>End time: { workEndTime.toLocaleString().substring(16,21) }</Col>
          			<Col md={2} lg={2}>Break: { pauseTime.toString().substring(16,21) }</Col>
          			<Col md={2} lg={2}>Capacity per day: { this.props.workcenter.duration }hr</Col>
          		</Row>
          	</Grid>
        </Col>
      </Row>
      </Grid>
    )
  }
})

var WorkCenter = React.createClass({
  propTypes: {
    validWorkCenter: React.PropTypes.bool,
    needToChooseWorkCenter: React.PropTypes.bool,
    onWorkCenterChanged: React.PropTypes.func.isRequired
  },
  
  getInitialState() {
	return {
		arbpl: ""
		 
	};
  },

  render: function () {
    let workcenterInfo = "";
    let arbpl = "";
    if(this.props.validWorkCenter) { 
    	workcenterInfo = <WorkCenterInfo workcenter={this.props.workcenter} validWorkCenter={this.props.validWorkCenter} />
    	}
    	
    if(this.props.workcenter) {
    	arbpl = this.props.workcenter.arbpl;
    }

    return (
      <Grid fluid="1">
    	<Row>
    		<Col md={12} lg={12}>
        		<Input type="text" placeholder="Work Center" onChange={this.props.onWorkCenterChanged} hasFeedback value={arbpl} />
        	</Col>
      	</Row>
      	<Row>
      		<Col>
      			{ workcenterInfo }
      		</Col>
	    </Row>
      </Grid>	  
    );
  }
});

module.exports = WorkCenter;
