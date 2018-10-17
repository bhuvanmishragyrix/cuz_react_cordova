import React from 'react';

import PreparePrintFileStoreItAndPay from '../components/PreparePrintFileStoreItAndPay/PreparePrintFileStoreItAndPay';
import ThreeElementTabBar from '../components/ThreeElementTabBar/ThreeElementTabBar';

/**
 * <ul style="list-style: none;">
 *      <li> This is the PreparePrintFileStoreItAndPayPage (from src/containers/PreparePrintFileStoreItAndPayPage.js)</li>
 *      <li> Functional Description:</li>
 *      <ul>
 *          <li> On this page we prepare the print file that has to be sent to the admin. </li>
 *          <li> Send the file to the admin, i.e. store it on AWS S3. </li>
 *          <li> Perform the payment. </li>
 *      </ul>
 *      <li> Code Description: </li>
 *      <ul>
 *          <li> In this page we render the ThreeElementTabBar, from (from src/components/ThreeElementTabBar/ThreeElementTabBar)</li>
 *          <li> We hide the Menu Icon and the Share Icon in the ThreeElementTabBar using "hideMenuIcon" and "hideShareIcon" props.</li>
 *          <li> Then we render the PreparePrintFileStoreItAndPay component from src/components/PreparePrintFileStoreItAndPay/PreparePrintFileStoreItAndPay.js.</li>
 *      </ul>
 *      <li> Navigation Description: </li>
 *      <ul>
 *          <li> Upon successfully storing the file to AWS S3, entering valid payment and personal details, and successfully completing payment, user will be provided with a "Go to Home Page" link which pops the router stack 5 times, hence redirects to '/parentForThreeElementTabBarScreens/categorySelectPage'</li>
 *      </ul>
 * </ul>
 */
const preparePrintFileStoreItAndPayPage = () => {

    return (
        <div>
            <ThreeElementTabBar hideShareIcon={true} hideMenuIcon={true} />
            <div className="mx-3">
                <PreparePrintFileStoreItAndPay />
            </div>
        </div>
    );

}

export default preparePrintFileStoreItAndPayPage;