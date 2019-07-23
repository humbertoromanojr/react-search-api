import React, { Component } from 'react';

import { Container, SearchInput } from './styles';

class Search extends Component {
  render() {
    return (
      <Container>
        <SearchInput htmlFor="search-input">
          <input type="text" value="" ir="search-input" 
          placeholder="Search..." />
        </SearchInput>
        <i className="fa fa-search" aria-hidden="true" />
    </Container>
    )
  }
}

export default Search