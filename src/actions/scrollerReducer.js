export const scrollerReducer = (direction, y) =>  ({
    type: 'SET_DIRECTION',
    payload: { direction, y }
});