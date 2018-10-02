import React, { Component } from 'react';
import ThreeElementTabBar from '../components/ThreeElementTabBar/ThreeElementTabBar';
import Checkout from '../components/Checkout/Checkout';

const checkoutPage = () => {
    return (
        <div>
            <ThreeElementTabBar hideShareIcon={true} hideMenuIcon={true} />
            <div className={`mx-3`}>
                <Checkout />
            </div>
        </div>
    );
}

export default checkoutPage;