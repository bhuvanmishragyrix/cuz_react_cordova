import React from 'react';

import PreparePrintFileStoreItAndPay from '../components/PreparePrintFileStoreItAndPay/PreparePrintFileStoreItAndPay';
import ThreeElementTabBar from '../components/ThreeElementTabBar/ThreeElementTabBar';

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