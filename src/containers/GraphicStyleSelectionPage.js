import React from 'react';

import GraphicStyleSelect from '../components/GraphicStyleSelect/GraphicStyleSelect';

/**
 * <ul> 
 *      <li> This is the Graphic Selection Page. </li>
 *      <li> Functional Description: </li>
 *      <ul>
 *          <li> This page is just a container for the GraphicStyleSelect component (from 'src/components/GraphicStyleSelect/GraphicStyleSelect.js'). </li>
 *          <li> Overall on the Graphic Selection Page, the user can view his current selection for Category, Brand, Year, and Model. </li>
 *          <li> He can read the instructions on how to customise and preview a selected Graphic (a set of stickers). </li>
 *          <li> Also tap on a graphic to select it and navigate forward with that selection. </li>
 *      </ul>
 *      <li> Code Description: </li>
 *      <ul>
 *          <li> We render the GraphicStyleSelect component from 'src/components/GraphicStyleSelect/GraphicStyleSelect.js' component here. </li>
 *      </ul>
 *      <li> Navigation Description: </li>
 *      <ul>
 *          <li> On tapping a graphic, we would be navigated to VisualComposerColorCustomiserPage (from 'src/containers/VisualComposerColorCustomiserPage.js')</li>
 *      </ul>
 * </ul>
 */
const graphicStyleSelectionPage = () => {
    return (
        <div className="mx-3">
            <GraphicStyleSelect />
        </div>
    );
};

export default graphicStyleSelectionPage;