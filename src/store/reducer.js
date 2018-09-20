import * as actionTypes from './actionTypes';

const initialState = {
    images: null,
    selectedCategory: null,
    selectedBrand: null,
    selectedYear: null,
    selectedModel: null,
    selectedCategoryImageFileName: null,
    selectedGraphic: null,
    selectedGraphicPrice: null,
    customisedPartsImages: null
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

            return {
                ...state,
                selectedGraphic: action.payload.selectedGraphic,
                selectedGraphicPrice: action.payload.selectedGraphicPrice
            };

        case actionTypes.STORE_CUSTOMISED_PARTS_IMAGES:

            return {
                ...state,
                customisedPartsImages: action.payload.customisedPartsImages
            }

        case actionTypes.STORE_PART_NAME_ARRAY_AND_LEFT_RIGHT_CAROUSEL_DATA:

            return {
                ...state,
                visualComposerPartNamesArray: action.payload.visualComposerPartNamesArray,
                visualComposerLeftRightCarouselData: action.payload.visualComposerLeftRightCarouselData
            }
    }
    return state;
};

export default reducer;