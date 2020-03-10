import React, { Component } from 'react';
import "./Login.scss";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import OnBoardingHeader from '../Registration/OnBoardingHeader/OnBoardingHeader';
import OnBoardingFooter from '../Registration/OnBoardingFooter/OnBoardingFooter';

import loginLogo from "../../assets/images/logo.png";
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import loginLogoBar from "../../assets/icons/LoginAndRegistration_icons/Icon-metro-menu.svg";
import loginButtonArrow from "../../assets/icons/SVG/Group-10441-left.svg";
import loginGoogleImage from "../../assets/icons/LoginAndRegistration_icons/MaskGroup1.svg";
import HeartIcon from "../../assets/icons/LoginAndRegistration_icons/Icon awesome-heart.svg";
import Radio from '@material-ui/core/Radio';
import { baseUrl } from "../../constants";
import { Link } from 'react-router-dom';
import validator from 'validator';
import { InputLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import GoogleLogin from 'react-google-login';
import socketIOClient from "socket.io-client";
import EmailSuccessIcon from "../../assets/icons/01-10-2019/Icon feather-check-circle.svg";
import spinner from '../../assets/icons/SVG/LoneDetailedFairybluebird-max-1mb.gif'
import history from '../../Routes/history';
import  googleIcon from '../../assets/icons/SVG/google-icon.svg' 



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailIs: '',
            password: '',
            response: '',
            status: '',
            rememberMe: false,
            isInValidEmail: true,
            isInValidPwd: true,
            isWrongPwd: false,
            showPassword: false,
            isEmailRequired: false,
            isPwdRequired: false,
            isLoginAttempting: false
        }
    }

    showPassword = () => { this.setState({ showPassword: !this.state.showPassword }) }

    componentDidMount() {
        const rememberMe = localStorage.getItem('rememberMe') === 'on';
        const emailIs = rememberMe ? localStorage.getItem('user') : '';
        this.setState({ emailIs, rememberMe });

        window.addEventListener('keypress', (e) => {
            if (e.key == 'Enter' && e.keyCode == 13) {
                this.submitHandler();
            }
        }, false);
    }
    submitHandler = async (event) => {
        localStorage.setItem('rememberMe', this.state.rememberMe);
        localStorage.setItem('user', this.state.rememberMe ? this.state.emailIs : '');
        this.setState({ isLoginAttempting: true })
        // if (!this.state.isInValidEmail && !this.state.isInValidPwd) 


        // if (!this.state.isInValidEmail && !this.state.password.length <= 0) {
        // event.preventDefault();
        // if (validator.isEmail(this.state.emailIs)) {
        const emailIs = this.state.emailIs.trim();
        const password = this.state.password.trim();
        let requestBody = {
            query: `
                    mutation {
                        loginUser(emailIs: "${emailIs}", password: "${password}") {
                            id,
                            emailIs,
                            token,
                            companyId,
                            firstName,
                            lastName

                      }
                    }
                  `
        };
        let resData = await axios({
            method: 'post',
            url: baseUrl.server,
            data: requestBody,
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => {
            //alert(JSON.stringify(res))
            this.setState({ isLoginAttempting: false })
            return res
        }).catch(err => {
            //alert(JSON.stringify(err))
            return err;
        });
        console.log('resData.data', resData.data)
        if (resData.data) {
            if (resData.data.data.loginUser == null && resData.data.errors[0].message == 'Password is incorrect!') {
                // this.setState({ response: "Password Is Incorrect", status: "danger" });
                this.setState({ isWrongPwd: true, isPwdRequired: false, isLoginAttempting: false });
                //window.location.href = '/';
            } else if (resData.data.data.loginUser == null && resData.data.errors[0].message == 'User doesnt exists!') {
                this.setState({ response: "User Doesn't Exists", status: "danger", isLoginAttempting: false });
                //window.location.href = '/';
            } else if (resData.data.data.loginUser == null && resData.data.errors[0].message == 'Email or Password is required') {
                // this.setState({ response: "Email or password is required", status: "danger" });
                this.setState({ isEmailRequired: true, isPwdRequired: true, isLoginAttempting: false })
            }
            else if (resData.data.data.loginUser == null && resData.data.errors[0].message == 'Your account has not yet Activated.!') {
                this.setState({ response: "Your account has not yet Activated.!", status: "danger", isLoginAttempting: false });
                //window.location.href = '/';
        } else {
                this.setState({ response: "Logged in successfully", status: "success" });
                localStorage.setItem('jwtToken', resData.data.data.loginUser != null ?
                    resData.data.data.loginUser.token : '');
                localStorage.setItem('id', resData.data.data.loginUser != null ?
                    resData.data.data.loginUser.id : '');
                const socket = await socketIOClient.connect(baseUrl.server, {
                    query: { id: resData.data.data.loginUser != null ? resData.data.data.loginUser.id : '' }
                });
                // localStorage.setItem('socketId', socket.id);
                localStorage.setItem('companyId', resData.data.data.loginUser.companyId)
                localStorage.setItem('tenantId', resData.data.data.loginUser.tenantId)
                localStorage.setItem('loginUserDetails', JSON.stringify({
                    userId: resData.data.data.loginUser.id, 
                    companyId: resData.data.data.loginUser.companyId, 
                    firstName: resData.data.data.loginUser.firstName, 
                    lastName: resData.data.data.loginUser.lastName 
                }))
                history.push('/ticketlisting')
                this.setState({ isLoginAttempting: false });

            }
        } else {
            // this.setState({ response: "Something went wrong", status: "danger" });
            this.setState({ isLoginAttempting: false });
            alert("Something went wrong");

        }
        // }
        // }
    }

    changeHandler = event => {
        const input = event.target;
        const value = input.type === 'radio' ? input.checked : input.value;
        this.setState({ [input.name]: value });
        this.setState({ [event.target.name]: event.target.value })
        if (event.target.name === 'emailIs') {
            if (validator.isEmail(event.target.value.trim()))
                this.setState({ isInValidEmail: false, isEmailRequired: false })
            else
                this.setState({ isInValidEmail: true, isEmailRequired: false })
        }
        if (event.target.name === "password") {
            if (event.target.value.length < 8)
                this.setState({ isInValidPwd: true, isPwdRequired: false })
            else {
                for (let i = 0; i < event.target.value.length; i++) {
                    if (event.target.value[i].charCodeAt() >= 65 && event.target.value[i].charCodeAt() <= 90) {
                        this.setState({ isInValidPwd: false, isPwdRequired: false });
                        break;
                    } else this.setState({ isInValidPwd: true, isPwdRequired: false })
                }
            }
        }
    }

    render() {
        const responseGoogle = (response) => {
            console.log(response);
            console.log(response.profileObj);
            console.log(response.profileObj.email);
            const emailIs = response.profileObj.email;
            let requestBody = {
                query: `
                mutation {
                    googleLogin(emailIs: "${emailIs}") {
                        id,
                        emailIs,
                        token
                    }
                  }
                `
            };
            fetch(baseUrl.server, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) {
                        throw new Error('Failed!');
                    }
                    return res.json();
                })
                .then(resData => {
                    if (resData.data.googleLogin == null && resData.errors[0].message == 'User doesnt exists!') {
                        this.setState({ response: "User Doesn't Exists", status: "danger" });
                        //window.location.href = '/';
                    } else {
                        this.setState({ response: "Logged in successfully", status: "success" });
                        localStorage.setItem('jwtToken', resData.data.googleLogin.token);
                        localStorage.setItem('id', resData.data.googleLogin.id);
                        window.location.href = '/ticketlisting';
                    }
                })
                .catch(err => {
                    return err
                });
        }
        const failGoogle = (response) => {
            console.log(response);
        }
        return (
            <div className="login-page">
                <OnBoardingHeader />

                <div className='login-page-body'>
                <div className="login-container">
                    {
                        this.state.status == 'danger' ? (this.state.status == 'danger' ? <div className="alert alert-danger alert-dismissible">
                            <a class="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <strong>{this.state.response}</strong>
                        </div> : null

                        ) : null
                    }

                    <div className="login-container-header">
                        <p className="login-container-text-one">SIGN IN</p>
                        <p className="login-container-text-two">Enter your email & password to login</p>
                    </div>

                    {/* <div className="login-fields"> */}
                        <div className="login-field-one">
                            {/* <InputBase
                                placeholder="Email"
                                className={`${this.state.emailIs.length > 0 && this.state.isInValidEmail ? 'error-while-login' : null}`}
                                name="emailIs"
                                onChange={this.changeHandler}
                                value={this.state.emailIs}
                                inputProps={{ 'aria-label': 'search' }}
                            /> */}
                            <TextField
                                id="outlined-basic"
                                className='customised-login-field'
                                label="Email"
                                margin="normal"
                                variant="outlined"
                                required
                                error={(this.state.emailIs.length > 0 &&
                                    this.state.isInValidEmail) || this.state.isEmailRequired ? 'error-while-login'
                                    : null}
                                name="emailIs"
                                onChange={this.changeHandler}
                                value={this.state.emailIs}
                            />

                            {
                                this.state.emailIs.length > 0 && this.state.isInValidEmail ?
                                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i> : null
                            }
                            {
                                this.state.emailIs.length > 0 && !this.state.isInValidEmail ?
                                    <img src={EmailSuccessIcon} alt=""></img> : null
                            }
                            {
                                this.state.emailIs.length > 0 && this.state.isInValidEmail ?
                                    <div className='error-valid-email-popup'>Please enter a valid email address.</div> : null
                            }
                            {
                                this.state.isEmailRequired ?
                                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i> : null
                            }
                            {
                                this.state.isEmailRequired ?
                                    <div className='error-email-popup'>Email is required.</div> : null
                            }
                        </div>
                        <div className="login-field-two">
                            {/* <InputBase
                                placeholder="Password"
                                // className={`${this.state.password.length > 0 && this.state.isInValidPwd ? 'error-while-login' : null}`}
                                className={`${this.state.isWrongPwd ? 'error-while-login' : null}`}
                                name="password"
                                type={this.state.showPassword ? "text" : "password"}
                                onChange={this.changeHandler}
                                value={this.state.password}
                                inputProps={{ 'aria-label': 'search' }}
                            /> */}

                            <TextField
                                id="outlined-basic"
                                className='customised-login-field'
                                label="Password"
                                margin="normal"
                                variant="outlined"
                                required
                                error={this.state.isWrongPwd || this.state.isPwdRequired ? 'error-while-login' : null}
                                name="password"
                                type={this.state.showPassword ? "text" : "password"}
                                onChange={this.changeHandler}
                                value={this.state.password}
                                autoComplete='new-password'
                            />
                            <i  style={this.state.isWrongPwd || this.state.isPwdRequired ? { right: '55px'} : null}
                                onClick={this.showPassword}
                                className={this.state.password ? this.state.showPassword ? "fa fa-eye show-password-eye" : "fa fa-eye-slash show-password-eye" : null}
                            ></i>
                            {/* {
                                this.state.password.length > 0 && this.state.isInValidPwd ?
                                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i> : null
                            }
                            {
                                this.state.password.length > 0 && this.state.isInValidPwd ?
                                    <div className='error-password-popup'>
                                        Invalid username or password
                                </div> : null
                            } */}

                            {
                                this.state.isWrongPwd ?
                                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i> : null
                            }
                            {
                                this.state.isWrongPwd ?
                                    <div className='error-password-popup'>
                                        Invalid password.
                                </div> : null
                            }
                            {
                                this.state.isPwdRequired ?
                                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i> : null
                            }
                            {
                                this.state.isPwdRequired ?
                                    <div className='error-password-required-popup'>
                                        Password is required.
                                </div> : null
                            }
                        </div>
                        <div className="login-field-radio">
                            <div className='radion-btn-and-label'>
                                <Radio
                                    checked={this.state.rememberMe}
                                    onClick={event=>  {
                                        console.log('this.state.rememberMe', this.state.rememberMe)
                                        this.state.rememberMe ? 
                                            this.setState({ rememberMe: !event.target.checked}) 
                                            :  
                                            this.setState({ rememberMe: event.target.checked})
                                    }}
                                    style={{ color: '#7AC9FF', borderColor: '#7AC9FF' }}
                                    value={this.state.rememberMe}
                                    name="rememberMe"
                                    inputProps={{ "aria-label": "A" }}
                                /> 
                                <span className='remember-me'>Remember me</span>
                            </div>
                            <div className="forgot-password-link">
                                <nav><Link to="/forgotpassword">Forgot password ?</Link></nav>
                            </div>
                        </div>
                        {/* <div className="login-button"> */}
                            {/* <Button variant="outlined" color="primary" className=""
                                onClick={this.submitHandler} 
                                disabled={this.state.isInValidEmail || this.state.isInValidPwd}>
                                Login
                            </Button> */}
                            {
                                console.log('this.state.isInValidEmail || this.state.password.length', this.state.isInValidEmail || this.state.password.length ? 'true' : 'flase')
                            }
                            <div className={`login-btn-field ${this.state.isInValidEmail || this.state.password ? 'click-not-allowed' : 'click-not-allowed'}`}>
                                <Button
                                    className={this.state.isInValidEmail || this.state.password.length <= 0 ? 'click-not-allowed' : null}
                                    variant="outlined" color="primary" className=""
                                    onClick={this.submitHandler}
                                    disabled={this.state.isInValidEmail || this.state.password.length <= 0}>
                                    {this.state.isLoginAttempting ? <img className='login-spinner' src={spinner} alt='spinner'/> : 'Login'}
                                </Button>
                                <div className="click-here-login-arrow">
                                    <p className="Click-here-to-Login">Click here to Login</p>
                                    <img src={loginButtonArrow}></img>
                                </div>
                            </div>


                        {/* </div> */}
                    {/* </div> */}
                    <div className="login-or-seperator">
                        <hr/><span>OR</span><hr/>
                    </div>
                    <div className="login-with-google-button">
                        {/* <img className='google-icon' src={googleIcon} alt='google-icon'/>    
                        <span className='login-with-google-btn-name'>Login with Google</span> */}
                        <GoogleLogin
                            clientId="371997214976-dre2b43jbqppi6l05jm4m1eic0q3tbnl.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={failGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    <div className="login-bottom-text d-flex justify-content-center">
                        <p>Don't have an account?</p>
                        <nav><Link to="/registration">&nbsp;Sign up</Link></nav>
                    </div>

                </div>
                
                </div>


                <OnBoardingFooter />
                {/* <footer className="login-footer-container">
                    <div className="login-footer-left-container">
                        <p>Made with <span><img src={HeartIcon}></img></span> in Chicago</p>
                    </div>
                    <div className="login-footer-right-container justify-flex-end">
                        <ul className="login-list">
                            <nav><Link to="/privacy"><li>Privacy Policy</li></Link></nav>
                            <nav><Link to="/termsOfUse"><li>Term of use</li></Link></nav>
                            <nav><Link to="/help"><li>Helps</li></Link></nav>
                        </ul>
                    </div>
                </footer> */}
            </div>
        )
    }
}

export default Login;
