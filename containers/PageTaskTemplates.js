import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import TaskTemplatesContainer from './TaskTemplatesContainer'

const store = configureStore()

export default class PageTaskTemplates extends Component {
  render() {
    return (
      <Provider store={store}>
      	<div className="container">
          <TaskTemplatesContainer />
    	 </div>
      </Provider>
    )
  }
}