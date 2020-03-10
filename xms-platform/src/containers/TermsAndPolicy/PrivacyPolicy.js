import React, {Component} from "react";
import "./PrivacyPolicy.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import loginLogo from "../../assets/images/logo.png";
import loginLogoBar from "../../assets/icons/LoginAndRegistration_icons/Icon-metro-menu.svg";
import { Link } from 'react-router-dom';

class PrivacyPolicy extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="privacy-policy-section">
                <div className="privacy-header-logo">
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <nav><Link to="/"><img src={loginLogo} className="privacy-logo"></img></Link></nav>
                            <img src={loginLogoBar}></img>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className="coming-soon-text">
                    <p>Coming Soon...</p>
                </div>
                
            </div>
        )
    }
}
export default PrivacyPolicy;