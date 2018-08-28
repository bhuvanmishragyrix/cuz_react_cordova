import React, { Component } from 'react';
import { connect } from 'react-redux';

import BrandYearModelSelection from '../components/BrandYearModelSelection/BrandYearModelSelection';


class BrandYearModelSelectionPage extends Component {

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
            <div className={`mx-3`}>
                <BrandYearModelSelection productsAndImagesData={this.state.productsAndImagesData} />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        productsAndImagesData: state.images
    };
};

export default connect(mapStateToProps)(BrandYearModelSelectionPage);