import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

class Search extends Component {
  render() {
    return (
      <div>
        <Input fluid
        placeholder='Search...'
        value={this.props.searchTerm}
        onChange={this.props.changeEvent}
        icon={{ name: 'search', link: true }}
         />
      </div>
    );
  }
}

export default Search;
