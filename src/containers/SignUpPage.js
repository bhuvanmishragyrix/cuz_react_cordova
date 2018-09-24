import React from 'react';


import ThreeElementTabBar from '../components/ThreeElementTabBar/ThreeElementTabBar';
import * as appConstants from '../constants/AppConstants';
import SignUp from '../components/SignUp/SignUp';

const signUpPage = () => {

    let topMargin = {
        marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + appConstants.TOP_MARGIN_FOR_THREE_ELEMENT_TABBAR_PAGES}px`
    }

    return (
        <div>
            <ThreeElementTabBar hideMenuIcon={true} hideShareIcon={true} />
            <div style={topMargin}>
                <SignUp />
            </div>
        </div>
    );
};

export default signUpPage;