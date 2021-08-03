import React, { Component } from 'react'
import * as tvAPI from '../../services/tv-api'
import TvCard from '../../components/TvCard/TvCard'
import PageNumber from '../../components/PageNumber/PageNumber'

class TvSearch extends Component {
  state = {
    searchResults: {},
    query: this.props.match.params.query,
    id: this.props.match.params.id,
    pageNumbers: []
  }

  async componentDidMount() {
    if (this.state.query) {
      const searchResults = await tvAPI.search(this.state.query)
      const pageNumbers = Array.from({length: searchResults.total_pages}, (x, i)=> i+1)
      this.setState({searchResults, pageNumbers})
    } else {
      const searchResults = await tvAPI.searchSimilar(this.state.id)
      const pageNumbers = Array.from({length: searchResults.total_pages}, (x, i)=> i+1)
      this.setState({searchResults, pageNumbers})
    }
  }

  render() { 
    console.log(this.state.pageNumbers)
    return (
      <>
        <h1>TV Results</h1>
        {this.state.searchResults.results?.map((tv, idx) => 
          <TvCard 
            key={idx}
            tv={tv}
          />
        )}
        <div>{this.state.pageNumbers.length}</div>
        {this.state.pageNumbers.map((page, idx) => 
          <PageNumber
            key={idx}
            pageNo={idx}
          />
        )}
      </>  
    );
  }
}
 
export default TvSearch;