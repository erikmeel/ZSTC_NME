import React from 'react'

import NPOrder from '../../common/components/Confirmations'

import reactor from '../reactor'
import getters from '../getters'
import actions from '../actions'

export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
    	order: getters.order,
    	confirmations: getters.confirmations
    }
  },


  render: function () {
	  let npconfirmations = <i></i>
	  
	  let orderid = this.props.order.orderid

	  actions.getOrderConfirmations(orderid, 0, 0)
	  
	  let v = 5 + 5
		

    return (
      <div className="col-md-12">
      	{ npconfirmations }
      </div>
    );
  },
});
