import React from 'react';
import Preview from '../components/Preview/Preview';

/**
 * This the preview page.
 *      <ul style="list-style:none;">
 *      <li> Functional Description: </li>
 *      <ul>
 *          <li> This is the just a container for the Preview component (from src/components/Preview/Preview.js) </li>
 *          <li> Overall on the Preview page we can view our customisation as they would appear on the product (Dirt Bike), from the left and right side. </li>
 *          <li> Currently only the right side image is available.</li>
 *      </ul>
 *      <li> Code Description: </li>
 *      <ul>
 *          <li> The Preview component (from src/components/Preview/Preview.js) is rendered here </li>
 *      </ul>
 * </ul>
 */
const previewPage = () => {
    return (
        <div className={`mx-3`}>
            <Preview />
        </div>
    );
};

export default previewPage;