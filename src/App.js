import React from 'react';
import './App.css';
import { Container, Grid, Header, Menu } from 'semantic-ui-react'
import TaskContainer from './containers/TaskContainer'
import NewForm from './components/NewForm'

const tasksIndexUrl = "http://localhost:3000/tasks"

class App extends React.Component {
  state = {
    allTasks: [],
    activeTasks: [],
    completedTasks: []
  }

  componentDidMount = () => this.fetchTasks()

  fetchTasks = () => {
    fetch(tasksIndexUrl)
    .then(res => res.json())
    .then(tasks => this.setTasks(tasks))
  }

  setTasks = tasks => {
    this.setState({
      allTasks: tasks,
      activeTasks: tasks.filter(task => !task.completed),
      completedTasks: tasks.filter(task => task.completed)
    })
  }

  completeTask = task => {
    fetch(`${tasksIndexUrl}/${task.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({ completed: !task.completed })
    })
    .then( _ => this.fetchTasks())
  }

  postTask = task => {
    fetch(tasksIndexUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({...task, completed: false})
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        allTasks: [...this.state.allTasks, data],
        activeTasks: [...this.state.activeTasks, data]
      })
    })
  }

  deleteTask = task => {
    fetch(`${tasksIndexUrl}/${task.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      }
    })
    .then( _ => {
      const filteredTasks = [...this.state.allTasks]
      .filter(oneTask => oneTask.id !== task.id)
      this.setTasks(filteredTasks)
    })
  }

  patchTask = (taskId, updatedTask) => {
    fetch(`${tasksIndexUrl}/${taskId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
    .then(res => res.json())
    .then(newTask => {
      const updatedTasks = this.state.allTasks.map(task => {
        return task.id === newTask.id ? newTask : task
      })
      this.setTasks(updatedTasks)
    })
  }

  render() {
    return (
      <React.Fragment>
        <Menu>
          <Menu.Item>
            <Header as="h2">TaskMaster</Header>
          </Menu.Item>

          <NewForm postTask={this.postTask}/>

        </Menu>
        <Container>
        <Grid columns={2} >
          <Grid.Row>
            <Grid.Column>
              <Header as='h1'>Active Tasks</Header>
              <TaskContainer
              status="active"
              completeTask={this.completeTask}
              deleteTask={this.deleteTask}
              tasks={this.state.activeTasks}
              patchTask={this.patchTask}/>
            </Grid.Column>

            <Grid.Column>
              <Header as='h1'>Completed Tasks</Header>
              <TaskContainer
              status="completed"
              deleteTask={this.deleteTask}
              completeTask={this.completeTask}
              tasks={this.state.completedTasks}
              patchTask={this.patchTask}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
