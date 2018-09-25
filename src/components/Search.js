import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { addSearchTracks } from '../actions/tracksReducer';
import '../css/search.scss';

class Search extends React.Component{
    state = {
        track_title: ''
    };
    handleSubmit = (e) => {
        e.preventDefault();
        let track = this.state.track_title;
        
        track === '' ? this.props.history.push('/') : 
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${track}&api_key=9e453d7b43fbb0b0499f4399eb2a2807&format=json`)
             .then(res => {
                 let search_tracks = res.data.results.trackmatches.track;
                 if(search_tracks && search_tracks.length > 0){
                    this.props.addSearchTracks(search_tracks);                     
                    this.props.history.push('/searchresults');             
                    setTimeout(() => {
                        this.setState(() => ({ track_title: '' }));
                    }, 500); 
                }
             })
             .catch(err => console.log(err));
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
                <input type="text" placeholder="Enter a track title..." name="track" onChange={this.handleChange} value={this.state.track_title} />
                <button type="submit" className="btn-search" id="btn-search"><i className="fas fa-search"></i></button>
              </form> 
            </div>  
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    addSearchTracks: (search_tracks) => dispatch(addSearchTracks(search_tracks)),
    //addSpinner: (status) => dispatch(addSpinner(status))
});

export default connect(undefined, mapDispatchToProps)(withRouter(Search));