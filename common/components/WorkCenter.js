'use strict';

var React = require('react');

import { Button, Input, Modal } from 'react-bootstrap'

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
    
    return (
    <div className="col-lg-12 well">
    	<div className="col-md-2">
      		<div className="text-center workcenter-widget">Name <h3>{ this.props.workcenter.name }</h3></div>
      	</div>
        <div className="col-md-7 workcenter-widget">
          	<p className="col-md-4">Work Center: { this.props.workcenter.arbpl }</p>
          	<p className="col-md-4">Cost Center: { this.props.workcenter.cost_center }</p>
          	<p className="col-md-4">Responsible: { this.props.workcenter.resp_code } - { this.props.workcenter.resp_name }</p>
        </div>
        <div className="col-md-3 workcenter-widget">    
        	<p className="col-md-6">Valid from: { this.props.workcenter.begin_date }</p>
        	<p className="col-md-6">Valid to: { this.props.workcenter.end_date }</p>
        </div>
      </div>
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
      <div>
    	<div>
        	<Input type="text" placeholder="Work Center" onChange={this.props.onWorkCenterChanged} hasFeedback value={arbpl} />
      	</div>
      	<div>
      		{ workcenterInfo }
	    </div>
      </div>	  
    );
  }
});

module.exports = WorkCenter;
