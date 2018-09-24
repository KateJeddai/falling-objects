export default (state = {}, action) => {
    switch(action.type){
        case 'ADD_ARTISTS':
            return Object.assign({}, { artists: action.payload });
        default: 
            return state;    
    }
}

export const saveArtist = (state = {}, action) => {
    switch(action.type){
        case 'SAVE_ARTIST':
            return Object.assign({}, { artist_id: action.payload });
        default:
            return state;    
    }
}
