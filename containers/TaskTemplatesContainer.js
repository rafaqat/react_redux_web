import React, { PropTypes, Component } from 'react';
import Auth from 'j-toker';
Auth.configure({apiUrl: 'http://localhost:3001/api/v1'});

class TaskTemplatesContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('TaskTemplatesContainer.js this.props', this.props);
    return (
      <div className='TaskTemplatesContainer'>
        <h1>TaskTemplatesContainer!!!!</h1>
        <a href='/'>Login Page Page!</a>
      </div>
    );
  }
}

TaskTemplatesContainer.propTypes = {
}

export default TaskTemplatesContainer
