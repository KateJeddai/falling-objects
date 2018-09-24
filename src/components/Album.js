import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
import '../css/album.scss';

export const history = createHistory();

class Album extends Component{
    state = {
        album_name: '',
        album_artist: '',
        album_image: '',
        album_tracks: '',
        album_content: '',
        album_published: ''
    };
    
    componentDidMount(){
        console.log(this.props.artist_id);
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=9e453d7b43fbb0b0499f4399eb2a2807&artist=${this.props.artist_id}&album=${this.props.match.params.id}&format=json`)
             .then(res => {
                 console.log(res.data);
                 this.setState(() => ({
                    album_name: res.data.album.name,
                    album_artist: res.data.album.artist,
                    album_image: res.data.album.image[2]['#text'],
                    album_tracks: res.data.album.tracks.track,
                    album_content: res.data.album.wiki ? res.data.album.wiki.content : '',
                    album_published: res.data.album.wiki ? res.data.album.wiki.published : ''
                 }));    
             })             
             .catch(err => console.log(err));
    }

    render(){
        let album = this.state.album_name,
            image = this.state.album_image,
            tracks = this.state.album_tracks,
            content = this.state.album_content,
            published = this.state.album_published;
            published = published.split('').slice(0, 11).join('');

        return tracks && tracks.length > 0 ? (
            <div className="container">
                <div><button className="button" onClick={history.goBack}>Go Back</button></div>
                <div className="album-card">
                  <h2><strong>{album}</strong></h2>   
                  <div className="album-wrapper">
                    <div className="album-up">
                        <div className="album-image">  
                            <img src={image} alt="photo" />
                        </div>
                        <div className="text">
                            { published ? (
                                <div><strong>Published: </strong><i>{published}</i></div>
                              ) : null
                           } 
                            
                            <ol>
                                { tracks.length > 0 && tracks.map((track) => (<li key={track.name}>{track.name}</li>))}
                            </ol> 
                        </div>
                    </div>
                    <div className="album-down">
                        { content ? (<pre>{content}</pre>) : null }
                    </div>
                  </div>
                </div>  
            </div>
        ) : (<Spinner /> )
    }
}

const mapStateToProps = (state = {}) => {
    console.log(state.saveArtist.artist_id);
    return { artist_id: state.saveArtist.artist_id };
}

export default connect(mapStateToProps)(Album);
