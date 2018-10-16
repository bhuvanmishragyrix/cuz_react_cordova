import React from 'react';
import Preview from '../components/Preview/Preview';

/**
 * This the preview page.
 * <ul style="list-style:none;">
 * <li> Functional Description: </li>
 *      <ul>
 *          <li> In this page we can view our customisation as they would appear on the product (Dirt Bike), from the right side. </li>
 *      </ul>
 * <li> Code Description: </li>
 *      <ul>
 *          <li> This is the container for the Preview component (from src/components/Preview/Preview.js) </li>
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