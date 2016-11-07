import { Store, toImmutable } from 'nuclear-js'
import { SET_NPORDER_INITIAL, RECEIVE_NPORDER_START, RECEIVE_NPORDER_SUCCESS, RECEIVE_NPORDER_FAILED } from '../actionTypes'

const initialState = toImmutable({
	order: null		
})

export default Store({
  getInitialState() {
    return initialState
  },

  initialize() {
	   this.on(SET_NPORDER_INITIAL, setOrderInitial)	   
	   this.on(RECEIVE_NPORDER_SUCCESS, receiveOrder)
	   this.on(RECEIVE_NPORDER_FAILED, invalidateOrder)
	  }
})

function setOrderInitial(state, { value }) {
	  let s = state
	  s = s.setIn(['order', 'order'], null)
	  return s
}

function receiveOrder(state, { order }) {
	  //let s = state
	  //s = s.setIn(['order', 'orderRead'], true)
	  //s = s.setIn(['order', 'operations'], operations)
	  //s = s.setIn(['order', 'order'], orderReceived)
	  //return s
	  //state.setIn(['order', 'orderRead', true]);
	  return state.merge({
		  "operations": order.operations,
		  "order": order
	  })
}

function invalidateOrder(state) {
		  return state.merge({
		    "order": null
		  })
}

function receiveConfirmations(state, { confirmations }) {
	//state.setIn(['workcenter', 'validWorkCenter', true]);
return state.merge({
	"confirmations": confirmations
})
}

function invalidateConfirmations(state) {
	return state.merge({
		"confirmations": []
	})
}

