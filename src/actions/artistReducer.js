const addTopArtists = (artists) => ({
    type: 'ADD_ARTISTS',
    payload: artists
});

export default addTopArtists;

export const saveArtist = (artist_id) => ({
    type: 'SAVE_ARTIST',
    payload: artist_id
});
