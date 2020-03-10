import React, {Component} from 'react';
import "./Congratulation.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import RegistrationLogo from "../../assets/images/logo.png";
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import RegistrationLogoBar from "../../assets/icons/LoginAndRegistration_icons/Icon-metro-menu.svg";
import BookmarkImage from "../../assets/icons/LoginAndRegistration_icons/Icon feather-bookmark.svg";
import RegistrationButtonIcon from "../../assets/icons/LoginAndRegistration_icons/Iconfeather-chevron-right1.svg";
import ArrowForwardImage from "../../assets/icons/LoginAndRegistration_icons/Icon ionic-md-arrow-forward.svg";
import HeartIcon from "../../assets/icons/LoginAndRegistration_icons/Icon awesome-heart.svg";
import RegistrationButtonArrow from "../../assets/icons/LoginAndRegistration_icons/share1.svg";



class Congratulation extends Component{
    constructor(props){
        super()
    }

    render(){
        return(
            <div className="congratulation-page">
                <div className="congratulation-header-logo">
                    <AppBar position="static">
                        <Toolbar variant="dense">
                           <img src={RegistrationLogo} className="congratulation-logo"></img>
                           <img src={RegistrationLogoBar}></img>
                        </Toolbar>
                    </AppBar>
                </div>

                <div className="congratulation-field-one">
                    <p className="congratulation-text-one">CONGRATULATIONS</p>
                    <p className="congratulation-text-two">Domain created successfully</p>
                </div>

                <div className="congratulation-field-two">
                    <Button variant="outlined" color="primary" className="">
                       <p className="field2"> http://design7311.xms.com   <img src={BookmarkImage}></img> </p>
                     
                    </Button>
                    <span><img src={RegistrationButtonArrow}></img></span>
                    <p className="ptext">Click here to bookmark the page</p>
                </div>

                <div className="congratulation-field-three">
                    <p>This is where you will access your new account.<br/>
                    MAke sure to bookmark it once you are inside</p>
                </div>

                <div className="congratulation-field-four">
                    <Button variant="outlined" color="primary" className="">
                        Start 15 days free trail    
                        <img src={RegistrationButtonIcon}></img>
                    </Button>
                </div>

                <div className="congratulation-field-five">
                <p>Choose subscription <img src={ArrowForwardImage}/></p>
                </div>

         <footer class="congratulationfooter">
         <div className="footerleftcontainer">
            <p>Made with <span><img src={HeartIcon}></img></span> in Chicago</p>
            </div>
            <div className="footerrightcontainer">
                <ul className="list">
                    <li>Privacy Policy</li>
                    <li>Team of logo</li>
                    <li>Helps</li>
                </ul>
            </div>
        </footer>

             </div>

        );
    }
}

export default Congratulation;
