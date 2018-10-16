import React from 'react';
import VisualComposerColorCustomiser from '../components/VisualComposerColorCustomiser/VisualComposerColorCustomiser';

/**
 * <ul style="list-style:none;">
 *      <li> This is Visual Composer Color Customiser page.  </li>
 *      <li> Functional Description: </li>
 *      <ul>
 *          <li> This is just a container for the VisualComposerColorCustomiser component (from src/components/VisualComposerColorCustomiser/VisualComposerColorCustomiser.js) </li>
 *          <li> Overall on the Visual Composer Color Customiser page, a user can select the different part stickers (Left and Right Side both) </li>
 *          <li> Then select a certain region (section) on the part sticker by tapping on it. </li>
 *          <li> On tapping on a section, a black border surrounds the section, indicating that it has been selected.</li>
 *          <li> The user can then select a color, from the color picker, to apply it to the selected section. </li>
 *          <li> The user can reset the colors of the sticker, to defaults, by pressing the "Reset" button. </li>
 *          <li> The user can view his customisations as they would look on the bike by pressing the "Preview" button </li>
 *          <li> Once completed doing customisations, the user can press the "Done" button, which enables the "Next" button. The "Next" button is disabled initially.</li>
 *          <li> The user can then press the "Next" button to be redirected to the Checkout Page.</li>
 *      </ul>
 *      <li> Code Description: </li>
 *      <ul> 
 *          <li> The VisualComposerColorCustomiser (from src/components/VisualComposerColorCustomiser/VisualComposerColorCustomiser.js) is rendered on this page.</li>
 *      </ul>
 * </ul>
 */
const visualComposerColorCustomiserPage = () => {
    return (
        <div>
            <VisualComposerColorCustomiser />
        </div>
    );
};

export default visualComposerColorCustomiserPage;