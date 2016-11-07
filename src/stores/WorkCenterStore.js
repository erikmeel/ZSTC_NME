import { Store, toImmutable } from 'nuclear-js'
import { SET_WORKCENTER_VALUE, RECEIVE_WORKCENTER_START, RECEIVE_WORKCENTER_SUCCESS, RECEIVE_WORKCENTER_FAILED, CHOOSE_WORKCENTER, RECEIVE_NPORDER_START, RECEIVE_NPORDER_SUCCESS, RECEIVE_NPORDER_FAILED, RECEIVE_NPCONF_START, RECEIVE_NPCONF_SUCCESS, RECEIVE_NPCONF_FAILED } from '../actionTypes'

const initialState = toImmutable({
	validWorkCenter: false,
	needToChooseWorkCenter: false,
	lastWorkCenterRequestId: "",
	workcenter: {
		arbpl: "",
		name: "",
        begin_date: "",
        end_date: "",
        cost_center: "",
        resp_code: "",
        resp_name: "",
        plant: "",
        objid: 0
	}	
})

export default Store({
  getInitialState() {
    return initialState
  },

  initialize() {
    this.on(SET_WORKCENTER_VALUE, setWorkCenterValue)
    this.on(RECEIVE_WORKCENTER_START, startReceiveWorkCenter)
    this.on(RECEIVE_WORKCENTER_FAILED, invalidateWorkCenter)
    this.on(RECEIVE_WORKCENTER_SUCCESS, receiveWorkCenter)
    this.on(CHOOSE_WORKCENTER, chooseWorkCenter)
  }
})

function setWorkCenterValue(state, { value }) {
	value = value.toUpperCase()
	let s = state
	s = s.setIn(['arbpl'], value)
	s = s.setIn(['workcenter', 'arbpl'], value)
	return s
  //return initialState.setIn(['workcenter','arbpl'], value)
}

function startReceiveWorkCenter(state, { lastWorkCenterRequestId }) {
	return state.merge({
		"validWorkCenter": false
	})
  //return state.setIn(['lastWorkCenterRequestId'], lastWorkCenterRequestId)
}

function receiveWorkCenter(state, { workcenter }) {
  return state.merge({
    "validWorkCenter": true,
    "needToChooseWorkCenter": true,
  //  "possibleWorkCenters": [],
    "workcenter": workcenter
  });
}

function invalidateWorkCenter(state) {
  return state.merge({
    "validWorkCenter": false,
  })
}

function confirmSuccess(state) {
  return initialState
}

function chooseWorkCenter(state, {workcenterList}) {
	  return state.merge({
	    "validWorkCenter": false,
	    "needToChooseWorkCenter": true,
	    "possibleWorkCenters": workcenterList,
	  })
}

