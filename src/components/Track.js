import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import { saveArtist } from '../actions/artistReducer';
import '../css/track.scss';


class Track extends Component{
  state = {
      track_title: '',
      track_artist: '',
      artist_id: '',
      album_name: '',
      album_image: '',
      track_published: '',
      track_content: ''
  };
  
  componentDidMount(){
    axios.get(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=9e453d7b43fbb0b0499f4399eb2a2807&mbid=${this.props.match.params.id}&format=json`)
         .then(res => {
             console.log(res.data, res.data.track.name);
             this.setState(() => ({
                 track_title: res.data.track.name,
                 track_artist: res.data.track.artist.name,
                 artist_id: res.data.track.artist.mbid,
                 album_name: res.data.track.album.title,
                 album_image: res.data.track.album.image[2]['#text'],
                 track_published: res.data.track.wiki ? res.data.track.wiki.published : '',
                 track_content: res.data.track.wiki ? res.data.track.wiki.content : ''
             }));         
                 this.props.saveArtist(this.state.track_artist);
         })
         .catch(err => console.log(err));
  }

  render(){
      let title = this.state.track_title,
          artist = this.state.track_artist,
          album = this.state.album_name,
          track_published = this.state.track_published,
          track_content = this.state.track_content;

          console.log(title.length);

    return title && title.length > 0 ? (
      <div className="container">
        <div className="track-card">
            <h2><strong>Title</strong>: {title}</h2>
            <div className="track-wrapper">
              <div className="track-up">
                  <div className="img">
                    <img src={this.state.album_image} alt="photo" />
                  </div>
                  <div className="titles">
                    <p><strong>Artist</strong>: <Link className="link" to={`/artist/${artist}`}>{artist}</Link></p>
                    <p><strong>Album</strong>: <Link className="link" to={`/album/${album}`}>{album}</Link></p>
                    {track_published === '' ? null : <i>{track_published}</i>}                  
                  </div>
              </div>    
              <div className="text">
                  {track_content === '' ? null : <pre>{track_content}</pre>}
              </div>  
            </div>    
        </div>
      </div>
    ) : (<Spinner /> )
  }
}

const mapDispatchToProps = (dispatch) => ({
      saveArtist: (artist_id) => dispatch(saveArtist(artist_id))
})

export default connect(undefined, mapDispatchToProps)(Track);