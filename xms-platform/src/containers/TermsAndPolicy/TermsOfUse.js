import React, {Component} from "react";
import "./TermsOfUse.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import loginLogo from "../../assets/images/logo.png";
import loginLogoBar from "../../assets/icons/LoginAndRegistration_icons/Icon-metro-menu.svg";
import { Link } from 'react-router-dom';

class TermOfUse extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="terms-of-use-section">
                <div className="terms-header-logo">
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <nav><Link to="/"><img src={loginLogo} className="terms-logo"></img></Link></nav>
                            <img src={loginLogoBar}></img>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className="terms-coming-soon-text">
                    <p>Coming Soon...</p>
                </div>
                
            </div>
        )
    }
}
export default TermOfUse;