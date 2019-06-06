import React from 'react'
import { Input } from 'semantic-ui-react'

const Search = ({searchTerm, changeEvent}) => (
  <div>
    <Input fluid
      placeholder='Search...'
      value={searchTerm}
      onChange={changeEvent}
      icon={{ name: 'search', link: true }}
    />
  </div>
)

export default Search;
