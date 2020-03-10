import React, {Component} from 'react';
import "./RegistrationCompanyDetails.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';
import RegistrationDetailsLogo from "../../assets/images/logo.png";
import RegistrationDetailsLogoBar from "../../assets/icons/LoginAndRegistration_icons/Icon-metro-menu.svg"
import RegistrationCheckIcon from "../../assets/icons/LoginAndRegistration_icons/Iconfeather-check.svg";
import RegistrationProcessIcon from "../../assets/icons/LoginAndRegistration_icons/Icon-simple-processwire.svg";
import RegistrationDetailsLockIcon from "../../assets/icons/LoginAndRegistration_icons/Icon-material-lock-outline.svg";
import RegistrationButtonSelectIcon from "../../assets/icons/LoginAndRegistration_icons/Icon-ionic-md-arrow-dropdown.svg";
import RegistrationButtonOptionIcon from "../../assets/icons/LoginAndRegistration_icons/Group-10440.svg";
import RegistrationButtonArrowBackIcon from "../../assets/icons/LoginAndRegistration_icons/Icon feather-chevron-right.svg";
import RegistrationButtonRight1Icon from '../../assets/icons/LoginAndRegistration_icons/Iconfeather-chevron-right1.svg';
import RegistrationButtonArrow from "../../assets/icons/LoginAndRegistration_icons/share1.svg";
import RegistrationLeftTopArrow from "../../assets/icons/LoginAndRegistration_icons/share.svg";
import HeartIcon from "../../assets/icons/LoginAndRegistration_icons/Icon awesome-heart.svg";
import Registration from "../../containers/Registration/Registration";
import UserDetails from "../../containers/Registration/UserDetails";
// import FormControl from 'react-bootstrap/FormControl';
// import { MDBContainer, MDBInputGroup } from "mdbreact";
// import InputGroup from 'react-bootstrap/InputGroup';



class RegistrationCompanyDetails extends Component{
    constructor(props){
        super(props);

       this.state={
            getStarted:false,
            yourCompany:true,
            userDetails:false
        }
    };

    handleGetBack = () => {
    this.setState({getStarted:true,
                yourCompany:false,
              
            });
    };


    handleClickButton = () => {
        this.setState({yourCompany:false,
            userDetails:true})
    };

    
    render(){
        return(
            <div>
            {this.state.yourCompany == true ?
             <div>
            <div className="registration-company-details-page">
                    <div className="registration-company-details-header-logo">
                        <AppBar position="static">
                            <Toolbar variant="dense">
                                <img src={RegistrationDetailsLogo} className="registration-company-details-logo"></img>
                                <img src={RegistrationDetailsLogoBar}></img>
                            </Toolbar>
                        </AppBar>
                    </div>

              
                    <div className="registration-company-details-page-icons">
                        <div className="registration-company-details-icons">
                            <div className="registration-company-details-account-icon">
                                <img src={RegistrationCheckIcon}></img>
                            </div>
                                <p className="registration-company-details-icon-text">Account</p>
                        </div>
                        <div className="registration-connecting-icon"></div>
                        <div className="registration-company-details-icons">
                            <div className="registration-company-details-company-icon">
                                <img src={RegistrationProcessIcon}></img>
                            </div>
                                <p className="registration-company-details-icon-text">Company</p>
                        </div>
                        <div className="registration-connecting-icon"></div>
                        <div className="registration-company-details-icons">
                            <div className="registration-company-details-personal-icon">
                                <img src={RegistrationDetailsLockIcon}></img>
                            </div>
                                <p className="registration-company-details-icon-text">Personal</p>
                        </div>
                    </div>

                    <div className="registration-company-details-container">
                            
                            <div className="registration-company-details-container-text">
                                <p className="registration-company-details-container-text-one">YOUR COMPANY</p>
                                <p className="registration-company-details-container-text-two">Tell us about your company</p>
                            </div>
                            
                            <div className="registration-company-details-fields">
                                <div className="registration-company-details-field-one">
                                <InputBase
                                    placeholder="Company Name"
                                    className="registration-input"
                                    inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>

                                <div className="registration-company-details-field-two">
                                    <div className="button-one">
                                        <Button variant="outlined" color="primary" className="button-one">
                                            Select Industry<span><img src={RegistrationButtonSelectIcon}></img></span>
                                        </Button>
                                    </div>

                                    <div className="button-two">
                                        <Button variant="outlined" color="primary" className="">
                                            No. Of emp.<span><img src={RegistrationButtonOptionIcon}></img></span>
                                        </Button>
                                    </div>
                                </div>


                     <div className="registration-company-field-three">
                     <p>Choose your domain</p>
                            <span><img src={RegistrationLeftTopArrow}></img></span>
                             
                    
                                <InputBase
                                    type="text"
                                    placeholder="Your Domain"
                                    className="registration-input"
                                    inputProps={{ 'aria-label': 'search' }}
                                    />

                                <Button variant="outlined" color="primary" className="">
                                    .xms.com
                                </Button>
                     </div>

                                <div className="registration-company-details-field-four">
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

                               
                            </div>
         <footer className="companydetails-footer-container">
         <div className="companydetailsleftcontainer">
            <p>Made with <span><img src={HeartIcon}></img></span> in Chicago</p>
            </div>
            <div className="companydetailsrightcontainer">
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
{this.state.getStarted==true ? <Registration/> : ''}
{this.state.userDetails==true ? <UserDetails/> : ''}
</div>
        );
    }
}
export default RegistrationCompanyDetails;