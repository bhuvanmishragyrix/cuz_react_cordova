import React from 'react';

import Landing from '../components/Landing/Landing';

/**
 * <ul style="list-style:none;"> 
 *      <li> This is the First Screen that we see in the application. The Landing Page.</li>
 *      <li> Navigation Description: </li>
 *      <ul>
 *          <li> Clicking the start button navigates to LoginPage (from src/containers/LoginPage)</li>
 *      </ul>
 * </ul>
 */
const LandingPage = () => {
    return (
        <Landing />
    );
};

export default LandingPage;