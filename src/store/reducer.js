import * as actionTypes from './actionTypes';

const initialState = {
    images: null,
    selectedCategory: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_FETCHED_PRODUCTS_AND_IMAGES_JSON_DATA:

            return {
                ...state,
                images: action.payload.images
            }

        case actionTypes.STORE_CATEGORY:
            console.log("Category In Store", action.payload);
            return {
                ...state,
                selectedCategory: action.payload
            }
    }
    return state;
};

export default reducer;