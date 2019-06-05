import React from 'react';
import './App.css';
import { Container, Grid, Header, Menu } from 'semantic-ui-react'
import TaskContainer from './containers/TaskContainer'
import NewForm from './components/NewForm'
import EditForm from './components/EditForm'

class App extends React.Component {
  state = {
    allTasks: [],
    activeTasks: [],
    completedTasks: []
  }

  componentDidMount = () => this.fetchTasks()

  fetchTasks = () => {
    fetch("http://localhost:3000/tasks")
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
    // run fetch to update
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({ completed: !task.completed })
    })
    .then( _ => this.fetchTasks())
    // update state
  }

  postTask = task => {
    fetch('http://localhost:3000/tasks', {
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
        activeTasks: [...this.state.activeTasks, data]
      })
    })
  }

  deleteTask = task => {
    fetch(`http://localhost:3000/tasks/${task.id}`, {
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
    fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
    .then(res => res.json())
    .then(newTask => {
      // const taskToUpdate = this.state.allTasks.find(task => task.id === newTask.id)
      // taskToUpdate.content = updatedTask.content
      const updatedTasks = this.state.allTasks.map(task => {
        if (task.id === newTask.id) {
          return newTask
        } else {
          return task
        }
      })
      this.setTasks(updatedTasks)
    })
  }

  render() {
    console.log("App", this.state);
    return (
      <React.Fragment>
        <Menu>
          <Menu.Item>
            TaskMaster
          </Menu.Item>
        </Menu>
        <Container>
        <Grid columns={2} >

          <Grid.Row>
            <Grid.Column>
              <Container>
                <NewForm postTask={this.postTask} />
              </Container>
            </Grid.Column>
          </Grid.Row>

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
