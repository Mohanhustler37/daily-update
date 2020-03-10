import React, { Component } from 'react';
import axios from "axios";
import "./ForgotPassword.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import OnBoardingHeader from '../Registration/OnBoardingHeader/OnBoardingHeader'
import OnBoardingFooter from '../Registration/OnBoardingFooter/OnBoardingFooter'
import RegistrationLogo from "../../assets/images/logo.png";
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import RegistrationLogoBar from "../../assets/icons/LoginAndRegistration_icons/Icon-metro-menu.svg";
import RegistrationButtonArrow from "../../assets/icons/LoginAndRegistration_icons/share1.svg";
import HeartIcon from "../../assets/icons/LoginAndRegistration_icons/Icon awesome-heart.svg";
import { Link } from 'react-router-dom';
import { baseUrl } from "../../constants";
import validator from 'validator';
import bendArrowIcon from '../../assets/icons/SVG/Group-10441-left.svg'

class Forgotpassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailIs: '',
            isInValidEmail: '',
            isValidEmail: false
        }
    }
    submitHandlerR = async (e) => {
        e.preventDefault();
        let requestBodyR = {
            query: `
              mutation ForgetPassword(
                  $emailIs: String!
                ) {
                    forgotPassword(
                        emailIs: $emailIs
                ) {
                    emailIs
                }
              }
            `,
            variables: {
                emailIs: this.state.emailIs,
            }
        };
        let resData = await axios({
            method: 'post',
            url: baseUrl.server,
            data: requestBodyR,
        }).then(res => {
            // alert(JSON.stringify(res));
            if (res.data.data.forgotPassword == null && res.data.errors[0].message == "User with Email does not exists") {
                this.setState({ isValidEmail: true })
            } else {
                alert("Password reset link sent to your email, please check.");
                window.location.href = '/';
            }

        }).catch(err => {
            console.log("ERROR", err);
            // window.location.href = '/';
        });

    };
    handleEmailChange = (event) => {
        if (event.target.name === 'emailIs') {
            if (validator.isEmail(event.target.value)) {
                this.setState({ emailIs: event.target.value })
                this.setState({ isInValidEmail: false })
            }
            else {
                this.setState({ emailIs: event.target.value })
                this.setState({ isInValidEmail: true })
            }
        }
    }
    render() {
        return (
            <div className="forgot-password-page">
                <OnBoardingHeader />
                <div className='forgot-password-body'>
                <div className="user-container">

                    <div className="user-container-text">
                        <p className="user-container-text-one">FORGOT PASSWORD</p>
                        <div className="user-container-text-two">
                            <p> Enter the email address you used when you signed up and <br/> we’ll send you instructions to reset your password.</p>
                            <p> For security reasons, we do not save your password <br/> and never share your password via email.</p>
                        </div>

                    </div>
                </div>
                <div className="password-field-one">
                    <InputBase
                        placeholder="Work Email"
                        className="registration-input"
                        name="emailIs"
                        onChange={this.handleEmailChange}
                        value={this.state.emailIs}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    {
                        this.state.emailIs.length > 0 && this.state.isInValidEmail ?
                            <i class="fa fa-exclamation-circle" aria-hidden="true"></i> : null
                    }
                    {
                        this.state.emailIs.length > 0 && this.state.isInValidEmail ?
                            <div className='forgotPasswordEnterValidEmailPopup'>
                                Please enter a valid email address
                            </div> : null
                    }
                    {
                        this.state.isValidEmail ?
                            <i class="fa fa-exclamation-circle" aria-hidden="true"></i> : null
                    }
                    {
                        !this.state.isValidEmail ?
                            <div className='ForgorPassEmailDoesExistPopup err-email-popup'>
                                Email id doesn't exist.Please enter a registered email id.
                            </div> : null
                    }
                </div>


                <div className="password-field-two d-flex">
                    <Button variant="outlined" color="primary"
                        className=""
                        disabled={this.state.emailIs == '' || this.state.isInValidEmail == true}
                        onClick={this.submitHandlerR}
                    >
                        Request reset link
                    </Button>

                    <div className="click-here-login-arrow-container">
                        <p className="Click-here-to-Login">Click here to recover password</p>
                        <img src={bendArrowIcon}></img>
                    </div>

                </div>

                <div className="Forgot-bottom-text">
                    <nav><Link to="/">Back to Login</Link></nav>
                </div>
                </div>
                <OnBoardingFooter />


            </div>
        )
    }
}

export default Forgotpassword;
