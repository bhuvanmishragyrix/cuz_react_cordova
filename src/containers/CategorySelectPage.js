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

    constructor(props) {
        super(props);

        this.state = {
            productsAndImagesData: this.props.productsAndImagesData
        };
    }

    componentWillReceiveProps(newProps) {

        this.setState({
            productsAndImagesData: newProps.productsAndImagesData
        });
    }

    render() {

        return (
            <div className="mx-3">
                <CategorySelect productsAndImagesData={this.state.productsAndImagesData} />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        productsAndImagesData: state.images
    };
};

export default connect(mapStateToProps)(CategorySelectPage);