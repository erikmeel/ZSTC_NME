import backend from '../common/api/backend'
import reactor from './reactor'
import getters from './getters'
import {
  DISMISS_FLASH,
  SET_WORKCENTER_VALUE,
  RECEIVE_WORKCENTER_START,
  RECEIVE_WORKCENTER_SUCCESS,
  RECEIVE_WORKCENTER_FAILED,
  CHOOSE_WORKCENTER,
  SET_NPORDER_INITIAL,
  RECEIVE_NPORDER_START,
  RECEIVE_NPORDER_SUCCESS,
  RECEIVE_NPORDER_FAILED,
  RECEIVE_NPCONF_SUCCESS,
  RECEIVE_NPCONF_FAILED,
  CANCEL_NPCONF_SUCCESS,
  CANCEL_NPCONF_FAILED,
  SAVE_CONFIRMATIONS_SUCCESS,
  SAVE_CONFIRMATIONS_FAILED
} from './actionTypes'

import _ from 'underscore'

export default {

  dismissFlash() {
    reactor.dispatch(DISMISS_FLASH)
  },
  
  setWorkCenterValue(value) {
	    reactor.dispatch(SET_WORKCENTER_VALUE, { value });
	  },
  
  getWorkCenterDetails(value) {
	    reactor.dispatch(RECEIVE_WORKCENTER_START, { value });
	    backend.getWorkCenterDetails(value,
	    		workcenters => {
	    			if(workcenters.length === 1) {
	    				let workcenter = workcenters[0];
	    				reactor.dispatch(RECEIVE_WORKCENTER_SUCCESS, { workcenter })
	    				this.getOrderDetails(workcenter, "ZSM5");
	    			}
	    			else {
	    				let workcenterList = workcenters;
	    				this.setOrderInitial();
	    				reactor.dispatch(CHOOSE_WORKCENTER, {workcenterList})
	    			}
	    		},
	    		(obj) => {
	    	        reactor.dispatch(RECEIVE_WORKCENTER_FAILED)
	   	 });
	  },
	  
 setToInitial() {
		  reactor.dispatch(RECEIVE_WORKCENTER_FAILED);
	  },
	  
 setOrderInitial() {
		  reactor.dispatch(SET_NPORDER_INITIAL);
		  reactor.dispatch(RECEIVE_NPCONF_FAILED);
	  },
	  
 getOrderDetails(workcenter, orderType) {
		  //reactor.dispatch(RECEIVE_NPORDER_START, { workcenter, orderType});
		  backend.getOrderDetails( workcenter, orderType,
				  order => {
					  reactor.dispatch(RECEIVE_NPORDER_SUCCESS, { order })
					  let dtNow = new Date()
					  let dtPreviousMonth = new Date()
					  dtPreviousMonth.setMonth(dtPreviousMonth.getMonth()-1)
					  let dtMonth_1 = new Date(dtPreviousMonth.getFullYear(), dtPreviousMonth.getMonth(), 1)
					  this.getOrderConfirmations(order, dtMonth_1, dtNow)
				  },
				  () => {
					  reactor.dispatch(RECEIVE_NPORDER_FAILED)
				  })
	  },
	  
 saveOrderConfirmations(confirmations, orderid) {
		backend.saveOrderConfirmations(confirmations, orderid,
				() => {
					reactor.dispatch(SAVE_CONFIRMATIONS_SUCCESS)
				},
				() => {
					reactor.dispatch(SAVE_CONFIRMATIONS_FAILED)
				})  
	  },
	  
 getOrderConfirmations(order, datefrom, dateto) {
		  backend.getOrderConfirmations(order, datefrom, dateto,
				  confirmations => {
					  reactor.dispatch(RECEIVE_NPCONF_SUCCESS, { order, confirmations })
				  },
				  () => {
					  reactor.dispatch(RECEIVE_NPCONF_FAILED)
				  })
	  },
	  
cancelOrderConfirmation(workcenter, order, confirmation) {
		  backend.cancelOrderConfirmation(order, confirmation,
			  confirmations => {
				  reactor.dispatch(CANCEL_NPCONF_SUCCESS, { order, confirmations })
				  this.getOrderDetails(workcenter, "ZSM5");
			  },
			  () => {
				  reactor.dispatch(CANCEL_NPCONF_FAILED)
			  })
	  },

 resetToIntial() {
    reactor.dispatch(RESET_TO_INITIAL)
  }
}
