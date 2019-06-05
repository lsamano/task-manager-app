import React from 'react'
import { Card, Button, Icon } from 'semantic-ui-react'

const CompletedTask = ({task, completeTask, deleteTask}) => {
  const doneClickEvent = event => completeTask(task)
  const deleteClickEvent = event => deleteTask(task)

  return (
    <Card>
      <Card.Content>

        <Card.Header>
          Task #{task.id}
        </Card.Header>

        <Card.Description>
          {task.content}
        </Card.Description>

      </Card.Content>

      <Card.Content extra>
        <Button.Group icon>
          <Button onClick={doneClickEvent}>
            <Icon name='undo' /> Undone
          </Button>
          <Button color='blue'>
            <Icon name='edit' /> Edit
          </Button>
          <Button negative onClick={deleteClickEvent}>
            <Icon name='trash' /> Delete
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default CompletedTask;
