import React, { Component } from 'react';
import axios from 'axios'

import './styles.css';

class Search extends Component {

  constructor() {
    super()

    this.state = {
      query: '',
      results: {},
      loading: false,
      message: '',
    };

    this.cancel = '';
  }

  fetchSearchResults = (updatedPagNo = '', query) => {
    const pageNumber = updatedPagNo ? `&page=${updatedPagNo}` : '';
    const apikey = '13119022-7ad29fb7ca34bf00319c1499e';
    const searchUrl = `https://pixabay.com/api/?key=${apikey}&q=${query}${pageNumber}`

    if( this.cancel ) {
      this.cancel.cancel();
    }

    this.cancel = axios.CancelToken.source();

    axios.get( searchUrl, {
      cancelToken: this.cancel.token
    })
    .then(res => {
      const resultNotFoundMsg = ! res.data.hits.length
                              ? 'There are no more search results. Please try a new search!'
                              : '';
      this.setState({
        results: res.data.hits,
        messsage: resultNotFoundMsg,
        loading: false
      })
                            
    })
    .catch(error => {
      if(axios.isCancel(error) || error) {
        this.setState({
          loading: false,
          message: 'Failed to fetch the data. Please check network'
        })
      }
    })
  }

  renderSearchResults = () => {
    const { results } = this.state

    if (Object.keys(results).length && results.length) {
      return (
        <div className="results-container">
          {
            results.map(result => {
              return (
                <a key={result.id} href={result.previewURL} className="result-item">
                  <h6 className="image-username">{result.username}</h6>
                  <div className="image-wrapper">
                    <img className="image" src={result.previewURL} alt={`${result.username} image`}/>
                  </div>
                </a>
              )
            })
          }
        </div>
      )
    }
  }

  handleChange = (event) => {
    event.preventDefault()

    const query = event.target.value;
    this.setState({
      query: query,
      loading: true,
      message: '',
    }, () => {
      this.fetchSearchResults(1, query)
    })
  }

  render() {
    const { query } = this.state;
    
    return (
      <div className="container">
        <label className="search-label" htmlFor="search-input">
          <input 
          type="text" 
          value={query} 
          name="query"
          id="search-input" 
          placeholder="Search..." 
          onChange={this.handleChange}
          />
          <i className="fa fa-search search-icon" aria-hidden="true" />
        </label>

        {this.renderSearchResults()}
    </div>
    )
  }
}

export default Search