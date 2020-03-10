import React from 'react';
import './OnBoardingFooter.scss';

import { Link } from 'react-router-dom';
import HeartIcon from "../../../assets/icons/LoginAndRegistration_icons/Icon awesome-heart.svg";

const OnBoardingFooter = props => {
    return (
        <footer className="registration-module-footer-container">
            <div className="footer-left-container">
                <p className="footer-left-container-txt">Made with <span><span ><i style={{color:'#ea5455'}} class="fa fa-heart" aria-hidden="true"/></span></span> in Chicago</p>
            </div>
            <div className="footer-right-container justify-flex-end">
                <ul className="login-list">
                    <nav><Link to="/privacy"><li>Privacy Policy</li></Link></nav>
                    <nav><Link to="/termsOfUse"><li>Term of use</li></Link></nav>
                    <nav><Link to="/help"><li>Helps</li></Link></nav>
                </ul>
            </div>
        </footer>
    )
}

export default OnBoardingFooter;