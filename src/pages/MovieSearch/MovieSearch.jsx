import React, { Component } from 'react'
import * as movieAPI from '../../services/movies-api'
import MovieCard from '../../components/MovieCard/MovieCard'

class MovieSearch extends Component {
  state = {
    searchResults: {},
    query: this.props.match.params.query,
    id: this.props.match.params.id,
    genre: this.props.match.params.genre
  }

  async componentDidMount() {
    if (this.state.query) {
      const searchResults = await movieAPI.search(this.state.query)
      console.log(searchResults)
      this.setState({searchResults})
    } else if (this.state.id) {
      const searchResults = await movieAPI.searchSimilar(this.state.id)
      console.log(searchResults)
      this.setState({searchResults})
    } else if (this.state.genre) {
      const searchResults = await movieAPI.searchGenre(this.state.genre)
      console.log(searchResults)
      this.setState({searchResults})
    }
  }

  render() { 
    return (
      <>
        <h1>Movie Results</h1>
        {this.state.searchResults.results?.map((movie, idx) => 
          <MovieCard 
            key={idx}
            movie={movie}
          />
        )}
        
      </>  
    );
  }
}
 
export default MovieSearch;