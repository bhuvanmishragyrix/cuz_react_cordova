import React, { Component } from 'react';
import { connect } from 'react-redux';

import CategorySelect from '../components/CategorySelect/CategorySelect';

/**
 * <ul style="list-style: none;">
 *      <li> This is the Category Selection and New Products display Page. </li>
 *      <li> Functional Description:</li>
 *      <ul>
 *          <li> This page is a container for CategorySelect component, which resides in src/components/CategorySelect/CategorySelect.js </li>
 *          <li> Overall in the Category Select Page, the user can view all the available categories, and </li>
 *          <li> View all the New Products, and  </li>
 *          <li> Change the selected category from the category slider, and </li>
 *          <li> Navigate forward by pressing the "Continue" button. </li>
 *      </ul>
 *      <li> Navigation Description: </li>
 *      <ul>
 *          <li> If the "Continue" button is enabled and we tap on it, we are redirected to route '/parentForThreeElementTabBarScreens/brandYearModalSelectPage'.</li>
 *      </ul>
 * </ul>
 */
class CategorySelectPage extends Component {

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
    * <li> This data is in turn passed to CategorySelect component from 'src/component/CategorySelect/CategorySelect.js' through props. </li>
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
            <div className="mx-3">
                <CategorySelect productsAndImagesData={this.state.productsAndImagesData} />
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

export default connect(mapStateToProps)(CategorySelectPage);