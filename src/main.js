'use strict';

import React from 'react'

import App from './components/App'
import reactor from './reactor'
import actions from './actions'

import WorkCenterStore from './stores/WorkCenterStore'
import NPOrderStore from './stores/NPOrderStore'
import ConfirmationStore from './stores/ConfirmationStore'

reactor.registerStores({
	workcenter: WorkCenterStore,
	order: NPOrderStore,
	confirmations: ConfirmationStore
	
})

React.render(
    React.createElement(App, null),
    document.getElementById('app')
);
