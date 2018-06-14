import { combineReducers } from 'redux';

const searchResults = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_RESULTS':
            return action.payload;
        default:
            return state;
    }
};

// const storeThumbnails = (state = [], action) => {
//     switch (action.type) {
//         case 'STORE_THUMBNAILS':
//             return action.payload;
//         default:
//             return state;
//     }
// }

// const cover = client.image(
//     {
//         cloudinary_id: props.result.cover.cloudinary_id,
//     },
//     'cover_big', 'jpg');

export default combineReducers({
    searchResults,
    // storeThumbnails,
});