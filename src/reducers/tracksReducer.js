export default (state = {}, action) => {
    switch(action.type){
        case 'ADD_TOP_TRACKS':
            return Object.assign({}, {tracks: action.payload});            
        default:
            return state;    
    }
}