import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import ThreeElementTabBar from '../components/ThreeElementTabBar/ThreeElementTabBar';
import CategorySelectPage from '../containers/CategorySelectPage';
import { getFromAPI } from '../util/Util';
import { LINK_TO_FETCH_JSON_DATA_FROM } from '../constants/AppConstants';
import { STORE_FETCHED_PRODUCTS_AND_IMAGES_JSON_DATA } from '../store/actionTypes';

class ParentForThreeElementTabBarScreens extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jSONData: null
        };
    }

    componentDidMount() {
        getFromAPI(LINK_TO_FETCH_JSON_DATA_FROM)
            .then((data) => {
                this.setState({
                    jSONData: data.data
                });
                this.props.storeProductsAndImagesJSONData(data.data);
            })
            .catch((err) => { console.log("Error", err) });
    }

    render() {
        return (
            <div>
                <ThreeElementTabBar />
                <Switch>
                    <Route path="/parentForThreeElementTabBarScreens/categorySelectPage" component={CategorySelectPage} productsAndImagesJSONData={this.state.jSONData} />
                </Switch>
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        storeProductsAndImagesJSONData: (data) => {
            dispatch({ type: STORE_FETCHED_PRODUCTS_AND_IMAGES_JSON_DATA, payload: data })
        }
    };
};

export default connect(null, mapDispatchToProps)(ParentForThreeElementTabBarScreens);