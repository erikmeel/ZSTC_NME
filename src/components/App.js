'use strict';

import React from 'react'
import { Alert, Button, ButtonToolbar } from 'react-bootstrap'

import reactor from '../reactor'
import getters from '../getters'
import actions from '../actions'

import WorkCenterContainer from './WorkCenterContainer'
import NPOrderContainer from './NPOrderContainer'
import ConfirmationsContainer from './ConfirmationsContainer'

export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      validWorkCenter: getters.validWorkCenter,
      workcenter: getters.workcenter,
      order: getters.order,
      sapConfirmations: getters.sapConfirmations,
      newConfirmations: getters.newConfirmations
    }
  },
  
  stopSubmitOnEnter(e) {
	  var eve = e || window.event;
	  var keycode = eve.keyCode || eve.which || eve.charCode;

	  if (keycode == 13) {
	    eve.cancelBubble = true;
	    eve.returnValue = false;

	    if (eve.stopPropagation) {   
	      eve.stopPropagation();
	      eve.preventDefault();
	    }

	    //return false;
	  }

  },

  render() {
	let orderContainer = <i></i>
	let confContainer = <i></i>
	if(this.state.validWorkCenter) {
		orderContainer = <NPOrderContainer validWorkCenter={this.state.validWorkCenter} workcenter={this.state.workcenter.toJS()} />
	}
	
	if(this.state.validWorkCenter && this.state.order && this.state.order.toJS().orderRead) {
		confContainer = <ConfirmationsContainer workcenter={this.state.workcenter.toJS()} order={this.state.order.toJS()} confirmations={this.state.confirmations} />
	}
	
    
    return (
      <div className="container-fluid">
        <form className="form" id="foo" onKeyPress={this.stopSubmitOnEnter}>
          < WorkCenterContainer />
          { orderContainer }
          { confContainer }
        </form>
      </div>
    );
  }
});
