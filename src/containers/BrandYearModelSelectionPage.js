import React, { Component } from 'react';
import { connect } from 'react-redux';

import BrandYearModelSelection from '../components/BrandYearModelSelection/BrandYearModelSelection';

/**
 * <ul style="list-style:none;">
 * <li> This is the Brand, Year, and Model selection page. </li>
 * <li> Overall on the BrandYearModel selection page, the user can view the available Brands, and </li>
 * <li> The available Years, and </li>
 * <li> The Models available for the current Brand and Year pair. </li>
 * <li> The user can also change the Brand and Year to see the available Models for that particular selection. </li>
 * <li> The user can also change the current Model from the Model slider. </li>
 * <li> Finally the user can press the "Continue" button to navigate forward with the current selection.  </li>
 * <li> The continue button would be disabled if there are no models corresponding to the currently Brand and Year selection.</li>
 * <li> Navigation Description: </li>
 *      <ul>
 *          <li> If the "Continue" button is enabled and we tap on it, we are redirected to route '/parentForThreeElementTabBarScreens/graphicStyleSelectPage'.</li>
 *      </ul>
 * </ul>
 */
class BrandYearModelSelectionPage extends Component {

    /**
    * This is the constructor of this class. Here we set the state attribute 'productsAndImagesData' to 'images' attribute set in the store.
    * @param {Object} props The props that this component receives.
    */
    constructor(props) {
        super(props);

        this.state = {
            productsAndImagesData: this.props.productsAndImagesData
        };
    }

    /**
    * <ul>
    * <li> This function is trigerred when the props to this component are updated. </li>
    * <li> We should receive new props when the images JSON data is updated in the store. </li>
    * <li> We set this function so that in case intially JSON data was not fetched when this component's constructor ran, they would be received later. </li>
    * <li> Upon receiving the JSON data, we set this data in our state variable 'productsAndImagesData'.  </li>
    * <li> This data is in turn passed to BrandYearModelSelection component from 'src/component/BrandYearModelSelection/BrandYearModelSelection.js' through props. </li>
    * </ul>
    * @param {Object} newProps The new set of props received.
    */
    componentWillReceiveProps(newProps) {

        this.setState({
            productsAndImagesData: newProps.productsAndImagesData
        });
    }

    /**
    * This is the render function of our class
    */
    render() {
        return (
            <div className={`mx-3`}>
                <BrandYearModelSelection productsAndImagesData={this.state.productsAndImagesData} />
            </div>
        );
    }
};

/**
 * Here we map attributes that we have in store to props in the class.
 */
const mapStateToProps = (state) => {
    return {
        productsAndImagesData: state.images
    };
};

export default connect(mapStateToProps)(BrandYearModelSelectionPage);