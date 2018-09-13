import React, { Component } from 'react';
import ThreeElementTabBar from '../components/ThreeElementTabBar/ThreeElementTabBar';
import Payments from '../components/Payments/Payments';

const paymentsPage = () => {
    return (
        <div>
            <ThreeElementTabBar hideShareIcon={true} />
            <Payments />
        </div>
    );
}

export default paymentsPage;