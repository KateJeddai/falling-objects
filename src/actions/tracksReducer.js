const addTopTracks = (tracks) => ({
    type: 'ADD_TOP_TRACKS',
    payload: tracks
});

export default addTopTracks;

export const addSearchTracks = (search_tracks) => ({
    type: 'ADD_SEARCH_TRACKS',
    payload: search_tracks
});