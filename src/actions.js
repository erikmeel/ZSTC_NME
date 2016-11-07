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
	    				//reactor.dispatch(CHOOSE_WORKCENTER, {workcenterList})
	    			}
	    		},
	    		(obj) => {
	    	        reactor.dispatch(RECEIVE_WORKCENTER_FAILED)
	   	 });
	  },
	  
 setOrderInitial(value) {
		  reactor.dispatch(SET_NPORDER_INITIAL, { value });
	  },
	  
 getOrderDetails(workcenter, orderType) {
		  //reactor.dispatch(RECEIVE_NPORDER_START, { workcenter, orderType});
		  backend.getOrderDetails( workcenter, orderType,
				  order => {
					  reactor.dispatch(RECEIVE_NPORDER_SUCCESS, { order })
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
	  
 getOrderConfirmations(orderid, datefrom, dateto) {
		  backend.getOrderConfirmations(orderid, datefrom, dateto,
				  confirmations => {
					  reactor.dispatch(RECEIVE_NPCONF_SUCCESS, { confirmations })
				  },
				  () => {
					  reactor.dispatch(RECEIVE_NPCONF_FAILED)
				  })
	  },

 resetToIntial() {
    reactor.dispatch(RESET_TO_INITIAL)
  }
}
