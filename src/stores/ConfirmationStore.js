import { Store, toImmutable } from 'nuclear-js'
import { RECEIVE_NPCONF_FAILED, RECEIVE_NPCONF_SUCCESS, SAVE_CONFIRMATIONS_SUCCESS, CANCEL_NPCONF_SUCCESS, CANCEL_NPCONF_FAILED } from '../actionTypes'

const initialState = toImmutable({
	order: null,
	sapConfirmations: [],
	newConfirmations: [],
	message: ""
})

export default Store({
  getInitialState() {
    return initialState
  },

  initialize() {
	  this.on(RECEIVE_NPCONF_SUCCESS, receiveConfirmations)
	  this.on(RECEIVE_NPCONF_FAILED, invalidateConfirmations)
	  this.on(SAVE_CONFIRMATIONS_SUCCESS, resetConfirmations)
	  this.on(CANCEL_NPCONF_SUCCESS, resetConfirmations)
	  this.on(CANCEL_NPCONF_FAILED, resetConfirmations)
	  }
})

function receiveConfirmations(state, { confirmations }) {
	let s = state
	s = s.setIn(['sapConfirmations'], confirmations)
	return s
}

function invalidateConfirmations(state) {
	let s = state
	s = s.setIn(['sapConfirmations'], [])
	return s
}

function resetConfirmations(state) {
	return state.merge({
		  "newConfirmations": [],
		  "message": "Confirmations saved",
	  })
}
