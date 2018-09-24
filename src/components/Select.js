import React from 'react';
import { connect } from 'react-redux';
import { sortByArtistA, sortByArtistZ, sortByTrack, sortByListeners } from '../actions/filterReducer';
import '../css/select.scss';


const Select = (props) => {
  const handleSort = (e) => {
       switch(e.target.value){
           case 'track': return props.sortByTrack();
           case 'listeners': return props.sortByListeners();    
           case 'artistA': return props.sortByArtistA();
           case 'artistZ': return props.sortByArtistZ();
                  
       }  
       return null;  
  }

  return (
    <div>
        <select onChange={handleSort} className="sort-group">
            <option>Sort By:</option>
            <option value="artistA">Artist Name (A-Z)</option>
            <option value="artistZ">Artist Name (Z-A)</option>
            <option value="track">Track Name (A-Z)</option>
            <option value="listeners">Listeners</option>
        </select>        
    </div>
  )
}


const mapDispatchToProps = (dispatch) => ({
    sortByArtistA: () => dispatch(sortByArtistA()),
    sortByArtistZ: () => dispatch(sortByArtistZ()),
    sortByTrack: () => dispatch(sortByTrack()),
    sortByListeners: () => dispatch(sortByListeners())
});

export default connect(undefined, mapDispatchToProps)(Select);
    