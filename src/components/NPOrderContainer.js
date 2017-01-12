import React from 'react'

import NPOrder from '../../common/components/NPOrder'
var moment = require('moment');

import { Grid, Row, Col, Button, Input, Modal } from 'react-bootstrap'

import reactor from '../reactor'
import getters from '../getters'
import actions from '../actions'


export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
    	order: getters.order,
    	newConfirmations:getters.newConfirmations
    }
  },
  
  //Save confirmations to SAP
  saveConfirmations(confirmations, cb, cb_error) {
	  var confirmationList = [];
	  var orderid = this.state.order.toJS().orderid;
	  var workcenter = this.props.workcenter.arbpl;
	  for(var i = 0; i < confirmations.length; i++) {
		  var actdate = confirmations[i].startdate.substring(0,4)+confirmations[i].startdate.substring(5,7)+confirmations[i].startdate.substring(8,10);
		  var findate = confirmations[i].finishdate.substring(0,4)+confirmations[i].finishdate.substring(5,7)+confirmations[i].finishdate.substring(8,10);
		  
		  var acttime = confirmations[i].actualtime+":00";
		  var fintime = confirmations[i].endtime+":00";
		  var conf = {
				  'orderid' : orderid,
				  'operation': confirmations[i].activity,
				  'work_cntr': workcenter,
				  'act_work': confirmations[i].value,
				  'UN_WORK': confirmations[i].UoM,
				  'ACT_TYPE': confirmations[i].activitytype,
				  'CONF_TEXT': confirmations[i].comment,
				  'CALC_MOTIVE': 'NP',
				  'EXEC_START_DATE': actdate,
				  'EXEC_START_TIME': acttime,
				  'EXEC_FIN_DATE': findate,
				  'EXEC_FIN_TIME': fintime
		  }
		  confirmationList.push(conf);
	  }
	  actions.saveOrderConfirmations(confirmationList, orderid);
	  
	  let dtNow = new Date()
	  let dtPreviousMonth = new Date()
	  dtPreviousMonth.setMonth(dtPreviousMonth.getMonth()-1)
	  let dtMonth_1 = new Date(dtPreviousMonth.getFullYear(), dtPreviousMonth.getMonth(), 1)
	  actions.getOrderConfirmations(this.state.order.toJS(), dtMonth_1, dtNow)
	  
	  cb();
	  
  },


  render: function () {
	  let npOrder = <i>...reading order details...</i>
	  	  
	  if(this.state.order) {
		  npOrder = <NPOrder workcenter={this.props.workcenter} order={this.state.order.toJS()} onSaveConfirmations={this.saveConfirmations} />
		 
	  }
	  
    return (
      <div>
      		{ npOrder }
      </div>
    );
  },
});
