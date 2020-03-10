import React, {Component} from "react";
import "./Help.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import loginLogo from "../../assets/images/logo.png";
import loginLogoBar from "../../assets/icons/LoginAndRegistration_icons/Icon-metro-menu.svg";
import { Link } from 'react-router-dom';

class Help extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="help-section">
                <div className="help-header-logo">
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <nav><Link to="/"><img src={loginLogo} className="help-logo"></img></Link></nav>
                            <img src={loginLogoBar}></img>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className="help-coming-soon-text">
                    <p>Coming Soon...</p>
                </div>
                
            </div>
        )
    }
}
export default Help;