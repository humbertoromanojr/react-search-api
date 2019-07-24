import React, { Component } from 'react';
import axios from 'axios'

import './styles.css';
import Loader from '../../loader.gif'

class Search extends Component {

  constructor() {
    super()

    this.state = {
      query: '',
      results: {},
      loading: false,
      message: '',

      totalResults: 0,
      totalPages: 0,
      currentPageNo: 0,
    };

    this.cancel = '';
  }

  getPageCount = (total, denominator) => {
    const divisible = 0 === total % denominator;
    const valueToBeAdded = divisible ? 0 : 1;

    return Math.floor( total/denominator ) + valueToBeAdded
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
      const total = res.data.total;
      const totalPagesCount = this.getPageCount( total, 20 )

      const resultNotFoundMsg = ! res.data.hits.length
                              ? 'There are no more search results. Please try a new search!'
                              : '';
      this.setState({
        results: res.data.hits,
        message: resultNotFoundMsg,
        totalResults: total,
        totalPages: totalPagesCount,
        currentPageNo: updatedPagNo,
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

  handlePageClick = (event, type) => {
    event.preventDefault();

    const updatePageNo = 'prev' === type
      ? this.state.currentPageNo - 1
      : this.state.currentPageNo + 1

      if ( ! this.state.loading ) {
        this.setState({ 
          loading: true,
          message: ''
         }, () => {
           this.fetchSearchResults(updatePageNo, this.state.query)
         })
      }
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
                  <h6 className="image-username">{result.user}</h6>
                  <div className="image-wrapper">
                    <img className="image" src={result.previewURL} alt={`${result.user} image`}/>
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
    
    if ( !query ) {
      this.setState({
        query,
        loading: true,
        message: ''
      })
    } else {
      this.setState({
        query: query,
        loading: true,
        message: '',
      }, () => {
        this.fetchSearchResults(1, query)
      })
    }
  }

  render() {
    const { query, loading, message, currentPageNo, totalPages } = this.state;

    const showLink = 1 < currentPageNo
    const showNext = totalPages > currentPageNo;
    
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

        {/* Error message */}
        { message && <p className="message">{ message }</p> }

        {/* Loading */}
        <img src={Loader} className={`search-loading ${loading ? 'show' : 'hide'}`} alt="loading" />

        {/* Result */}
        {this.renderSearchResults()}
    </div>
    )
  }
}

export default Search