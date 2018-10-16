import React, { Component } from 'react';
import ThreeElementTabBar from '../components/ThreeElementTabBar/ThreeElementTabBar';
import Checkout from '../components/Checkout/Checkout';

/**
 * <ul style="list-style: none;">
 *      <li> This is the Checkout Page. </li>
 *      <li> Functional Description:</li>
 *      <ul>
 *          <li> This page is a container for ThreeElementTabBar and our Checkout component, which resides in src/components/Checkout/Checkout.js </li>
 *          <li> Overall in the Checkout Page, the user can view his order, the description of the product he is about to purchase, and the total price. </li>
 *          <li> Finally once the user has viewed the details he can press the "Checkout" button to be redirected to the page where he can enter payment details. </li>
 *      </ul>
 *      <li> Code Description: </li>
 *      <ul>
 *          <li> In this page we render the ThreeElementTabBar, from (from src/components/ThreeElementTabBar/ThreeElementTabBar)</li>
 *          <li> We hide the Menu Icon and the Share Icon in the ThreeElementTabBar using "hideMenuIcon" and "hideShareIcon" props.</li>
 *          <li> Then we render the Checkout component from src/components/Checkout/Checkout.js.</li>
 *      </ul>
 *      <li> Navigation Description: </li>
 *      <ul>
 *          <li> Tapping the "CHECKOUT" button redirects to PreparePrintFileStoreItAndPayPage (from src/containers/PreparePrintFileStoreItAndPayPage.js)</li>
 *      </ul>
 * </ul>
 */
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