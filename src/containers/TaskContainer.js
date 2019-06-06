import React from 'react'
import Task from '../components/Task'
import Search from '../components/Search'
import { Card } from 'semantic-ui-react'

class TaskContainer extends React.Component {
  state = {
    searchTerm: ""
  }

  changeEvent = event => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  formatCards = givenTasks => {
    const {completeTask, deleteTask, patchTask} = this.props
    return this.props.tasks.filter(task => task.content.includes(this.state.searchTerm))
    .map( task => <Task completeTask={completeTask} deleteTask={deleteTask} patchTask={patchTask} key={task.id} task={ task }/>)
  }

  render() {
    return (
      <div>
        <Search changeEvent={this.changeEvent} searchTerm={this.state.searchTerm}/>
        <Card.Group>
        { this.props.tasks.length > 0
          ? this.formatCards(this.props.tasks)
          : <p>Loading</p> }
        </Card.Group>
      </div>
    )
  }

}

export default TaskContainer;
