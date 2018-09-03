import * as actionTypes from './actionTypes';

const initialState = {
    images: null,
    selectedCategory: null,
    selectedBrand: null,
    selectedYear: null,
    selectedModel: null,
    selectedCategoryImageFileName: null,
    selectedGraphic: null,
    selectedGraphicPrice: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_FETCHED_PRODUCTS_AND_IMAGES_JSON_DATA:

            return {
                ...state,
                images: action.payload.images
            };

        case actionTypes.STORE_CATEGORY_AND_CATEGORY_IMAGE_NAME:

            return {
                ...state,
                selectedCategory: action.payload.category,
                selectedCategoryImageFileName: action.payload.selectedCategoryImageFileName
            };

        case actionTypes.STORE_SELECTED_BRAND_YEAR_MODEL:

            return {
                ...state,
                selectedBrand: action.payload.brand,
                selectedYear: action.payload.year,
                selectedModel: action.payload.model
            };

        case actionTypes.STORE_GRAPHIC_NAME_AND_PRICE:

            console.log(action.payload.selectedGraphic, action.payload.selectedGraphicPrice);

            return {
                ...state,
                selectedGraphic: action.payload.selectedGraphic,
                selectedGraphicPrice: action.payload.selectedGraphicPrice
            };
    }
    return state;
};

export default reducer;