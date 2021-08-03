import React, { Component } from 'react'
import * as tvAPI from '../../services/tv-api'

class TvDetails extends Component {
  state = {
    searchResult: {},
    id: this.props.match.params.id
  }

  async componentDidMount() {
    const searchResult = await tvAPI.searchOne(this.state.id)
    this.setState({searchResult})
  }

  render() { 
    return (
      <>
        <h1>TV Deets</h1>
        <a href={`/tvs/similar/${this.state.searchResult.id}`}>Find similar shows</a>
        {this.state.searchResult.videos?.results.map((video, idx) => 
           <iframe key={idx} title={`search-video-${idx}`} src={`http://www.youtube.com/embed/${video.key}`}
           width="560" height="315" frameBorder="0"></iframe>  
        )}
      </>
    );
  }
}
 
export default TvDetails;