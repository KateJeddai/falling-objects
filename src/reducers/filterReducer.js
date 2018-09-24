export default (state = { sortBy: '' }, action) => {
    switch(action.type){
        case 'SORT_BY_ARTIST_A': 
            return {...state, sortBy: 'artistA'};
        case 'SORT_BY_ARTIST_Z': 
            return {...state, sortBy: 'artistZ'};
        case 'SORT_BY_TRACK':
            return {...state, sortBy: 'track'};
        case 'SORT_BY_LISTENERS':
            return {...state, sortBy: 'listeners'}
    }
    return state;
};