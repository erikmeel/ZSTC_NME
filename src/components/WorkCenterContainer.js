import React from 'react'

import WorkCenter from '../../common/components/WorkCenter'

import reactor from '../reactor'
import getters from '../getters'
import actions from '../actions'


export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      workcenter: getters.workcenter,
      validWorkCenter: getters.validWorkCenter,
      needToChooseWorkCenter: getters.needToChooseWorkCenter
    }
  },

  workCenterChange(event) {
    actions.setWorkCenterValue(event.target.value);
    
    if (event.target.value.length > 4) {
    	actions.getWorkCenterDetails(event.target.value);
    }
    if (event.target.value.length === 0) {
      //actions.resetToIntial()
    }
  },


  render: function () {
    let workcenter = this.state.workcenter
    let workcenterdiv = <i></i>
	
    workcenterdiv = <WorkCenter workcenter={workcenter.toJS()} onWorkCenterChanged={this.workCenterChange} validWorkCenter={this.state.validWorkCenter} needToChooseWorkCenter={this.state.needToChooseWorkCenter} />
    

    return (
      <div>
        { workcenterdiv }
      </div>
    );
  },
});
