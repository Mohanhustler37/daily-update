import React from 'react';
import './OnBoardingHeader.scss';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import appLogo from "../../../assets/images/logo.png";
import moreIcon from "../../../assets/icons/LoginAndRegistration_icons/Icon-metro-menu.svg";


const OnBoardingHeader = props => {
    return (
        <div className="on-boarding-header">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <img className="onboarding-logo" src={appLogo} ></img>
                    <img className="onboarding-more-icon" src={moreIcon}></img>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default OnBoardingHeader;