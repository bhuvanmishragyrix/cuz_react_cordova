import React from 'react';

import PreparePrintFileStoreItAndPay from '../components/PreparePrintFileStoreItAndPay/PreparePrintFileStoreItAndPay';

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