import React from 'react'

import Confirmations from '../../common/components/Confirmations'

import reactor from '../reactor'
import getters from '../getters'
import actions from '../actions'

export default React.createClass({
  mixins: [reactor.ReactMixin],
  
  getDataBindings() {
    return {
    	order: getters.order,
    	sapConfirmations: getters.sapConfirmations
    }
  },
  
  onDeleteConfirmation(event) {
	  let id = event.target.id;
	  let conf_no = id.substring(0, id.indexOf('_'));
	  let counter = id.substring(id.indexOf('_')+1, id.length);
	  let confirmations = this.state.sapConfirmations;
	  let confirmation = null;
	  
	  for(var i = 0; i < confirmations.length; i++) {
			if(confirmations[i].conf_no === conf_no && confirmations[i].conf_cntr === counter) {
			  confirmation = confirmations[i];
			  i = confirmations.length;
			}
		}
	  
	  this.setState({
		  sapConfirmations: []
	  })
	  
	  actions.cancelOrderConfirmation(this.props.workcenter, this.state.order.toJS(), confirmation);
	  
	  
	  return null;
  },
  
  onSaveConfirmation() {
	  return null;
  },


  render: function () {
	  
	  let orderid = this.props.order.orderid
	  
	  let dtNow = new Date()
	  let dtPreviousMonth = new Date()
	  dtPreviousMonth.setMonth(dtPreviousMonth.getMonth()-1)
	  let dtMonth_1 = new Date(dtPreviousMonth.getFullYear(), dtPreviousMonth.getMonth(), 1)
	  
	  let npconfirmations = <i>No existing confirmations found since {dtMonth_1.toDateString()}...</i>
	  
	  
	  if(this.state.sapConfirmations) {
		  let confirmations =  this.state.sapConfirmations
		  if(confirmations.length>0) {
			  npconfirmations = <Confirmations sap="X" since={dtMonth_1.toDateString()} order={this.props.order} confirmations={this.state.sapConfirmations}  onDeleteConfirmation={this.onDeleteConfirmation} onSaveConfirmation={this.onSaveConfirmation} />
		  }
	  }

	  
	  
	  //if(this.state.confirmations.message) {
	//	  npconfirmations = <i>Confirmations saved...</i>
	 // }
		

    return (
      <div className="col-md-12">
      	{ npconfirmations }
      </div>
    );
  },
});
