import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import addTopTracks from '../actions/tracksReducer';
import '../css/search.scss';

class Search extends React.Component{
    state = {
        track_title: ''
    };
    handleSubmit = (e) => {
        e.preventDefault();
        let track = this.state.track_title;

        axios.get(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${track}&api_key=9e453d7b43fbb0b0499f4399eb2a2807&format=json`)
             .then(res => {
                 let tracks = res.data.results.trackmatches.track;
                 this.props.addTopTracks(tracks);
             })
    }
    handleChange = (e) => {
        let track_title = e.target.value;
        this.setState(() => ({
            track_title
        }));   
    }

    render(){
        return(
            <div className="container">
              <form onSubmit={this.handleSubmit} className="form">
                <h3>Search for your favorite track</h3>              
                <input type="text" placeholder="Enter track title..." name="track" onChange={this.handleChange} value={this.state.track_title} />
                <button type="submit" className="btn-search" id="btn-search"><i className="fas fa-search"></i></button>
              </form> 
            </div>  
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    addTopTracks: (tracks) => dispatch(addTopTracks(tracks))
});

export default connect(undefined, mapDispatchToProps)(Search);