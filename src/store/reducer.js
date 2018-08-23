import * as actionTypes from './actionTypes';

const initialState = {
    test: "Hello World!"
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_FETCHED_PRODUCTS_AND_IMAGES_JSON_DATA:

            return {
                ...state,
                fetchedProductsAndImagesJSONData: action.payload
            }
    }
    return state;
};

export default reducer;