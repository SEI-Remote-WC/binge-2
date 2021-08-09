import React, { Component } from 'react'
import * as mediaAPI from '../../services/media-api'
import ReviewForm from '../../components/ReviewForm/ReviewForm'

class TvDetails extends Component {
  state = {
    searchResult: {},
    id: this.props.match.params.id,
    type: 'tv'
  }

  async componentDidMount() {
    const searchResult = await mediaAPI.searchOne(this.state.type, this.state.id)
    this.setState({searchResult})
  }

  render() { 
    return (
      <>
        <h1>TV Deets</h1>
        <a href={`/search/tvs/similar/${this.state.searchResult.id}`}>Find similar shows</a>
        {this.state.searchResult.genres?.map(genre => 
          <a key={genre.id} href={`/search/tvs/genre/${genre.id}`}>
            <p>{genre.name}</p>
          </a>
        )}
        {this.state.searchResult.videos?.results.map((video, idx) => 
           <iframe key={idx} title={`search-video-${idx}`} src={`http://www.youtube.com/embed/${video.key}`}
           width="560" height="315" frameBorder="0"></iframe>  
        )}
        <ReviewForm />
      </>
    );
  }
}
 
export default TvDetails;