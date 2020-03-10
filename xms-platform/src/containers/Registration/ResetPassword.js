import React, { Component } from 'react';
import "./ResetPassword.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import RegistrationLogo from "../../assets/images/logo.png";
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import RegistrationLogoBar from "../../assets/icons/LoginAndRegistration_icons/Icon-metro-menu.svg";
import RegistrationButtonArrow from "../../assets/icons/LoginAndRegistration_icons/share1.svg";
import OnBoardingHeader from '../Registration/OnBoardingHeader/OnBoardingHeader'
import OnBoardingFooter from '../Registration/OnBoardingFooter/OnBoardingFooter'
import HeartIcon from "../../assets/icons/LoginAndRegistration_icons/Icon awesome-heart.svg";
import { Link } from 'react-router-dom';
import * as qs from 'query-string';
import { baseUrl } from "../../constants";
import axios from "axios";
import TextField from '@material-ui/core/TextField';

class Resetpassword extends Component {
    constructor(props) {
        super();
        this.state = {
            newPassword: '',
            confirmPassword: '',
            isInValidPwd: false,
            isConfirmPwd: false,
            showPassword: false
        }
    }

    // componentDidMount() {
    //     let token = qs.parse(this.props.match.params, { ignoreQueryPrefix: true });
    // }

    submitHandler = async (e) => {
        e.preventDefault();
        let requestBodyR = {
            query: `
              mutation ResetPassword(
                  $newPassword: String!
                  $token:String!
                ) {
                    resetPassword(
                        password: $newPassword
                        token:$token
                ) {
                    emailIs
                }
              }
            `,
            variables: {
                newPassword: this.state.newPassword,
                token: this.props.match.params.token,
            }
        };
        let resData = await axios({
            method: 'post',
            url: baseUrl.server,
            data: requestBodyR,
        }).then(res => {
            // alert(JSON.stringify(res));
            alert("Password updated successfully.");
            window.location.href = '/';
        }).catch(err => {
            //
            // window.location.href = '/';
        });

    };

    handleCheckPassword = (event) => {
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if (event.target.name === "password") {
            if (event.target.value.length < 8)
                this.setState({ isInValidPwd: true })
            else {
                for (let i = 0; i < event.target.value.length; i++) {
                    if (strongRegex.test(event.target.value)) {
                        this.setState({ isInValidPwd: false });
                        break;
                    } else this.setState({ isInValidPwd: true })
                }
            }
        }
    }
    handleConfirmPassword = (event) => {
        if (event.target.value != this.state.newPassword) {
            this.setState({ isConfirmPwd: true })
        }
        this.setState({ isConfirmPwd: false, confirmPassword: event.target.value })
    }
    showPasswordData = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }
    render() {
        return (
            <div className="user-page">
                <OnBoardingHeader />
                <div className="resetpwd-container">
                    <div className="resetpwd-container-text">
                        <p className="resetpwd-container-text-one">RESET YOUR PASSWORD</p>
                        <p className="resetpwd-container-text-two">Set a new password for <span>abc@xyz.com</span></p>
                    </div>
                </div>
                <div className="resetpwd-field-one">
                    <InputBase
                        placeholder="New Password"
                        className="registration-input"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={this.handleCheckPassword}
                    // onChange={e => this.setState({ newPassword: e.target.value })}
                    />
                    <i
                        onClick={this.showPasswordData}
                        className={this.state.showPassword ? "fa fa-eye show-password-eye" : "fa fa-eye-slash show-password-eye"}
                    ></i>
                </div>

                {
                    this.state.newPassword.length > 0 && this.state.isInValidPwd ?
                        <div className='error-password-popup'>
                            Password must cotain at least
                            8 characters, including
                            UPPER/lowercase, number
                            & special character.
                        </div> : null
                }

                <div className="resetpwd-field-two">
                    <InputBase
                        placeholder="Confirm Password"
                        className="registration-input"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={this.handleConfirmPassword}
                        // onChange={e => this.setState({ confirmPassword: e.target.value })}
                    />

                    <i
                        onClick={this.showPasswordData}
                        className={this.state.showPassword ? "fa fa-eye show-password-eye" : "fa fa-eye-slash show-password-eye"}
                    ></i>
                </div>

                <div className="resetpwd-field-three">
                    <Button variant="outlined" color="primary"
                        className="field-three"
                        onClick={this.submitHandler}
                    >
                        Reset Password
                    </Button>
                    <span className="label-text"><img src={RegistrationButtonArrow}></img></span>
                    <span className="txt-lbl">Click here to <br />generate new password</span>
                </div>

                <div className="reset-bottom-text">
                    <nav><Link to="/">Back to Login</Link></nav>
                </div>
                <OnBoardingFooter />

{/* 
                <footer class="reset-password-footer-container d-flex">
                    <div className="reset-password-left-container">
                        <p>Made with <span><img src={HeartIcon}></img></span> in Chicago</p>
                    </div>
                    <div className="reset-password-right-container justify-flex-end">
                        <ul className="reset-list">
                            <li>Privacy Policy</li>
                            <li>Team of logo</li>
                            <li>Helps</li>
                        </ul>
                    </div>
                </footer> */}
            </div>
        )
    }
}

export default Resetpassword;
