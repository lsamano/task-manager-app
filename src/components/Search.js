import React, { Component } from 'react'
import { Card, Input } from 'semantic-ui-react'

class Search extends Component {
  render() {
    return (
      <div>
        <Input fluid
        placeholder='Search...'
        value={this.props.searchTerm}
        onChange={this.props.changeEvent} />
      </div>
    );
  }
}

export default Search;
