import React, {Component} from 'react';
import "./UserDetails.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import RegistrationLogo from "../../assets/images/logo.png";
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import RegistrationLogoBar from "../../assets/icons/LoginAndRegistration_icons/Icon-metro-menu.svg";
import RegistrationProcessWire from "../../assets/icons/LoginAndRegistration_icons/Icon-simple-processwire.svg";
import RegistrationButtonArrow from "../../assets/icons/LoginAndRegistration_icons/share1.svg";
import RegistrationCorrectArrow from "../../assets/icons/LoginAndRegistration_icons/Iconfeather-check.svg";
import BirthdayIcon from "../../assets/icons/SVG/Iconfeather-calendar.svg";
import RegistrationButtonArrowBackIcon from "../../assets/icons/LoginAndRegistration_icons/Icon feather-chevron-right.svg";
import RegistrationButtonRight1Icon from '../../assets/icons/LoginAndRegistration_icons/Iconfeather-chevron-right1.svg';
import HeartIcon from "../../assets/icons/LoginAndRegistration_icons/Icon awesome-heart.svg";
import RegistrationCompanyDetails from "../../containers/Registration/RegistrationCompanyDetails";
import Congratulation from "../../containers/Registration/Congratulation";


class UserDetails extends Component{
    constructor(props){
        super();

        this.state={
            userDetails:true,
            yourCompany:false,
            congratulation:false
        }

    }

    handleGetBack = () => {
        this.setState({
            userDetails:false,
            yourCompany:true
        })
    };

    handleClickButton = () => {
       this.setState({
                userDetails:false,
                congratulation:true    
       })
    }



    render(){
        return(
            <div>
                  {this.state.userDetails == true ?
                <div>
            <div className="user-page">
                    <div className="user-header-logo">
                    <AppBar position="static">
                        <Toolbar variant="dense">
                           <img src={RegistrationLogo} className="user-logo"></img>
                           <img src={RegistrationLogoBar}></img> 
                        </Toolbar>
                    </AppBar>
                    </div>
          
                    <div className="user-page-icons">
                        <div className="user-icons">
                            <div className="user-Account-icon">
                            <img src={RegistrationCorrectArrow}></img>
                            </div>
                                <p className="user-icon-text">Account</p>
                        </div>
                        <div className="user-connecting-icon"></div>
                        <div className="user-icons">
                            <div className="user-Company-icon">
                                <img src={RegistrationCorrectArrow}></img>
                            </div>
                                <p className="user-icon-text">Company</p>
                        </div>
                        <div className="user-connecting-icon"></div>
                        <div className="user-icons">
                            <div className="user-Personal-icon">
                            <img src={RegistrationProcessWire}></img>
                            </div>
                                <p className="user-icon-text">Personal</p>
                        </div>
                    </div>

                    <div className="user-container">
                            
                            <div className="user-container-text">
                                <p className="user-container-text-one">YOUR DETAILS</p>
                                <p className="user-container-text-two">Tell us about yourself</p>
                            </div>


                            <div className="user-field-one">
                                    <div className="user-button-one">
                                        <Button variant="outlined" color="primary" className="">
                                           First Name
                                        </Button>
                                    </div>

                                    <div className="user-button-two">
                                        <Button variant="outlined" color="primary" className="">
                                            Last Name
                                        </Button>
                                    </div>
                             </div> 

                             <div className="user-field-three">
                                <Button variant="outlined" color="primary" className="user-button1">
                                Birthday <span><img src={BirthdayIcon}></img></span> 
                                </Button>
                            </div>

                            <div className="user-field-four">
                                <Button variant="outlined" color="primary" className="user-button2">
                                Phone Number
                                </Button>
                            </div>


                                {/* <div className="user-field-five">
                                    <div className="button-three">
                                        <Button variant="outlined" color="primary" className="button-one" onClick={this.handleGetBack}>
                                        <span><img src={RegistrationButtonArrowBackIcon}></img></span> Prev
                                        </Button>
                                    </div>

                                    <div className="button-four">
                                        <Button variant="outlined" color="primary" className="button-two" onClick={this.handleClickButton}>
                                        Next <span><img src={RegistrationButtonRight1Icon}></img></span>
                                        </Button>
                                        <span><img src={RegistrationButtonArrow}></img></span>
                                        <p>Click here to continue</p>
                                    </div>
                                   
                                </div>  */}

                                <div className="user-field-five">
                                    <div className="button-three">
                                        <Button variant="outlined" color="primary" className="button-one" onClick={this.handleGetBack}>
                                        <span><img src={RegistrationButtonArrowBackIcon}></img></span> Prev
                                        </Button>
                                    </div>

                                    <div className="button-five">
                                        <Button variant="outlined" color="primary" className="button-two" onClick={this.handleClickButton}>
                                        Next <span><img src={RegistrationButtonRight1Icon}></img></span>
                                        </Button>
                                        <span><img src={RegistrationButtonArrow}></img></span>
                                        <p>Click here to continue</p>
                                    </div>
                                   
                                </div> 
                        
                                
     <footer class="userdetailscontainer">
         <div className="userdetailsleftcontainer">
            <p>Made with <span><img src={HeartIcon}></img></span> in Chicago</p>
            </div>
            <div className="userdetailsrightcontainer">
                <ul className="list">
                    <li>Privacy Policy</li>
                    <li>Team of logo</li>
                    <li>Helps</li>
                </ul>
            </div>
        </footer> 
        </div>

 </div>
    </div> : ''}
    {this.state.yourCompany==true ? <RegistrationCompanyDetails/> : ''}
    {this.state.congratulation==true ? <Congratulation/> : ''}
    </div>
        )
    }
}

export default UserDetails;