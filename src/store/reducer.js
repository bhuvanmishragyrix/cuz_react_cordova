import * as actionTypes from './actionTypes';

const initialState = {
    images: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_FETCHED_PRODUCTS_AND_IMAGES_JSON_DATA:

            return {
                ...state,
                images: action.payload.images
            }
    }
    return state;
};

export default reducer;