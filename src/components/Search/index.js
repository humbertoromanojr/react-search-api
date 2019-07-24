import React, { Component } from 'react';

import './styles.css';

class Search extends Component {
  render() {
    return (
      <div className="container">
        <label className="search-label" htmlFor="search-input">
          <input 
          type="text" 
          value="" 
          id="search-input" 
          placeholder="Search..." 
          />
          <i className="fa fa-search search-icon" aria-hidden="true" />
        </label>
    </div>
    )
  }
}

export default Search