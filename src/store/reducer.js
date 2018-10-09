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
    customisedPartsImages: null,
    selectedGraphicDescription: null,
    visualComposerPartNamesArray: null,
    visualComposerLeftRightCarouselData: null,
    userJWTToken: null,
    userEmailId: null
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

        case actionTypes.STORE_GRAPHIC_DESCRIPTION:

            return {
                ...state,
                selectedGraphicDescription: action.payload.selectedGraphicDescription
            }

        case actionTypes.CLEAR_CUSTOMISED_IMAGES_AND_PARTS_ARRAY_AND_CAROUSEL_DATA_AND_PRICE:

            return {
                ...state,
                selectedGraphicPrice: null,
                customisedPartsImages: null,
                visualComposerPartNamesArray: null,
                visualComposerLeftRightCarouselData: null
            }

        case actionTypes.STORE_USER_JWT_TOKEN:

            return {
                ...state,
                userJWTToken: action.payload.userJWTToken
            };

        case actionTypes.STORE_USER_EMAIL_ID_IN_STORE:

            return {
                ...state,
                userEmailId: action.payload.userEmailId
            }

        case actionTypes.RESET_SELECTION_DATA_AFTER_SUCCESSFUL_PAYMENT:

            return {
                ...state,
                selectedCategory: null,
                selectedBrand: null,
                selectedYear: null,
                selectedModel: null,
                selectedCategoryImageFileName: null,
                selectedGraphic: null,
                selectedGraphicPrice: null,
                customisedPartsImages: null,
                selectedGraphicDescription: null,
                visualComposerPartNamesArray: null,
                visualComposerLeftRightCarouselData: null
            }
    }
    return state;
};

export default reducer;