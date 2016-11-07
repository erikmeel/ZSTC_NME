import { Store, toImmutable } from 'nuclear-js'
import { RECEIVE_NPCONF_SUCCESS, SAVE_CONFIRMATIONS_SUCCESS } from '../actionTypes'

const initialState = toImmutable({
	order: null		
})

export default Store({
  getInitialState() {
    return initialState
  },

  initialize() {
	  this.on(RECEIVE_NPCONF_SUCCESS, receiveConfirmations)
	  this.on(SAVE_CONFIRMATIONS_SUCCESS, resetConfirmations)
	  }
})

function receiveConfirmations(state, { confirmations }) {
	  return state.merge({
		  "confirmations": confirmations
	  })
}

function resetConfirmations(state) {
	return state.merge({
		  "confirmations": []
	  })
}
