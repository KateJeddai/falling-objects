export default (state = { direction: 'down'}, action) => {
    switch(action.type){
        case 'SET_DIRECTION':
            return Object.assign({}, { direction: action.payload.direction });
    }
    return state;
}