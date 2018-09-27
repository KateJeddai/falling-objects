export default (state = { direction: 'down', y: 0}, action) => {
    switch(action.type){
        case 'SET_DIRECTION':
            return Object.assign({}, { direction: action.payload.direction, y: action.payload.y });
    }
    return state;
}