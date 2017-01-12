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

function setOrderInitial(state) {
	  let s = state
	  s = s.setIn(['order'], null)
	  return s
}

function receiveOrder(state, { order }) {
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

function invalidateConfirmations(state) {
	return state.merge({
		"newConfirmations": []
	})
}

