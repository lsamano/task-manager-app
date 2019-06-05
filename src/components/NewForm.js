import React from 'react'
import { Form, TextArea, Button, Header } from 'semantic-ui-react'

class NewForm extends React.Component {
  state = {
    content: ""
  }

  submitEvent = event => {
    this.setState({ content: "" })
    this.props.postTask(this.state)
  }

  changeEvent = event => {
    this.setState({content: event.target.value})
  }

  render() {
    return (
      <React.Fragment>
        <Header as="h1">Make a New Task</Header>
        <Form onSubmit={this.submitEvent}>
          <Form.Field
          width="twelve"
          control={TextArea}
          label='Description'
          placeholder='Start writing here...'
          value={this.state.content}
          onChange={this.changeEvent}
          />
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
      </React.Fragment>
    )
  }
}

export default NewForm;
