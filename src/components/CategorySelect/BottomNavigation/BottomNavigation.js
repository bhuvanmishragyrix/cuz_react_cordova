import React, { Component } from 'react';
import BottomNavigationStyles from './BottomNavigation.css';
import $ from 'jquery';

class BottomNavigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fontSizeOfIconsInsideBottomNavigation: {
                fontSize: 0
            },
            fontSizeOfTextInsideBottomNavigation: {
                fontSize: 0
            }
        };
    }

    componentDidMount() {
        let iconFontSizeToSet, textFontSizeToSet;
        iconFontSizeToSet = $('.bottomMenuColumn').width();
        textFontSizeToSet = 0.4 * $(`.bottomMenuColumn`).width();
        this.setState({
            fontSizeOfIconsInsideBottomNavigation: {
                fontSize: `${iconFontSizeToSet}px`
            },
            fontSizeOfTextInsideBottomNavigation: {
                fontSize: `${textFontSizeToSet}px`
            }
        });
    }

    render() {
        return (
            <div className={`container ${BottomNavigationStyles.navBarSettings} pt-2`}>
                <div className="row">
                    <div className="bottomMenuColumn col-2 text-center">
                        <i style={this.state.fontSizeOfIconsInsideBottomNavigation} className={`fa fa-search ${BottomNavigationStyles.iconColor}`} aria-hidden="true"></i>
                        <p className={BottomNavigationStyles.text} style={this.state.fontSizeOfTextInsideBottomNavigation}>Search</p>
                    </div>
                    <div className="bottomMenuColumn col-2 text-center">
                        <i style={this.state.fontSizeOfIconsInsideBottomNavigation} className={`fa fa-user ${BottomNavigationStyles.iconColor}`} aria-hidden="true"></i>
                        <p className={BottomNavigationStyles.text} style={this.state.fontSizeOfTextInsideBottomNavigation}>My Account</p>
                    </div>
                    <div className="bottomMenuColumn col-2 text-center">
                        <i style={this.state.fontSizeOfIconsInsideBottomNavigation} className={`fa fa-shopping-cart ${BottomNavigationStyles.iconColor}`} aria-hidden="true"></i>
                        <p className={BottomNavigationStyles.text} style={this.state.fontSizeOfTextInsideBottomNavigation}>My Orders</p>
                    </div>
                    <div className="bottomMenuColumn col-2 text-center">
                        <i style={this.state.fontSizeOfIconsInsideBottomNavigation} className={`fa fa-pencil ${BottomNavigationStyles.iconColor}`} aria-hidden="true"></i>
                        <p className={BottomNavigationStyles.text} style={this.state.fontSizeOfTextInsideBottomNavigation}>My Designs</p>
                    </div>
                    <div className="bottomMenuColumn col-2 text-center">
                        <i style={this.state.fontSizeOfIconsInsideBottomNavigation} className={`fa fa-cog ${BottomNavigationStyles.iconColor}`} aria-hidden="true"></i>
                        <p className={BottomNavigationStyles.text} style={this.state.fontSizeOfTextInsideBottomNavigation}>Settings</p>
                    </div>
                    <div className="bottomMenuColumn col-2 text-center">
                        <i style={this.state.fontSizeOfIconsInsideBottomNavigation} className={`fa fa-info-circle ${BottomNavigationStyles.iconColor}`} aria-hidden="true"></i>
                        <p className={BottomNavigationStyles.text} style={this.state.fontSizeOfTextInsideBottomNavigation}>Info</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default BottomNavigation;