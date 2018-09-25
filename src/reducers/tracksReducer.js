export default (state = {}, action) => {
    switch(action.type){
        case 'ADD_TOP_TRACKS':
            return Object.assign({}, {tracks: action.payload});  
        case 'ADD_SEARCH_TRACKS':
            return Object.assign({}, {search_tracks: action.payload});
        default:
            return state;    
    }
}