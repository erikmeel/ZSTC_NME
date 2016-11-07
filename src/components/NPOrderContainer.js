import React from 'react'

import NPOrder from '../../common/components/NPOrder'

import reactor from '../reactor'
import getters from '../getters'
import actions from '../actions'


export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
    	order: getters.order,
    	confirmations:getters.confirmations
    }
  },
  
  saveConfirmations(confirmations, cb, cb_error) {
	  var confirmationList = [];
	  var orderid = this.state.order.toJS().orderid;
	  var workcenter = this.props.workcenter.arbpl;
	  for(var i = 0; i < confirmations.length; i++) {
		  var actdate = confirmations[i].datetime.substring(0,4)+confirmations[i].datetime.substring(5,7)+confirmations[i].datetime.substring(8,10);
		  var acttime = confirmations[i].datetime.substring(11,16)+":00";
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
				  'EXEC_FIN_DATE': actdate,
				  'EXEC_FIN_TIME': acttime
		  }
		  confirmationList.push(conf);
	  }
	  actions.saveOrderConfirmations(confirmationList, orderid);
	  cb();
	  //alert("We will save confirmations");
  },


  render: function () {
	  let npOrder = <i>...reading order details...</i>
	  
	  //actions.setOrderInitial("");
	  
	  if(this.state.order) {
		  npOrder = <NPOrder workcenter={this.props.workcenter} order={this.state.order.toJS()} onSaveConfirmations={this.saveConfirmations} />
		  
//		  actions.getOrderConfirmations(this.state.order.toJS().orderid, null, null);
//		  if(true)
//			  alert('something');
	  }
	  
    return (
      <div className="col-md-12">
      	<div className="row">
      		{ npOrder }
      	</div>
      </div>
    );
  },
});
