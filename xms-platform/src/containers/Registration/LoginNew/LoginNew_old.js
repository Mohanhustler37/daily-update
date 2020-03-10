import React from 'react';
import './LoginNew.scss';

import axios from "axios";
import { baseUrl } from "../../../constants";
import socketIOClient from "socket.io-client";
import validator from 'validator';
import history from '../../../Routes/history';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import GoogleLogin from 'react-google-login';


import OnBordingHeader from '../OnBoardingHeader/OnBoardingHeader';
import OnBoardingFooter from '../OnBoardingFooter/OnBoardingFooter';
import spinner from '../../../assets/icons/SVG/LoneDetailedFairybluebird-max-1mb.gif'

import loginButtonArrow from "../../../assets/icons/SVG/Group-10441-left.svg";
import EmailSuccessIcon from "../../../assets/icons/01-10-2019/Icon feather-check-circle.svg";

class LoginNew extends React.Component {
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
            <div className='on-boarding-login-layout'>
                <OnBordingHeader />
                <div className='on-boarding-login-body'>
                    {/* {
                        this.state.status !== 'danger' ? (this.state.status !== 'danger' ? <div className="alert alert-danger alert-dismissible">
                            <a class="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <strong>{this.state.response}</strong>
                        </div> : null

                        ) : null
                    } */}
                    <div className='login-card-container'>
                        {/* <div className="fullwid"> */}
                        <div className='sign-in-heading'>SIGN IN</div>
                        <div className='sign-in-sub-heading'>Enter your email & password to login</div>


                        <div className="sign-up-email-container">
                            <TextField
                                id="outlined-basic1"
                                className='on-boarding-input-field'
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
                                    <div className='error-valid-email-popup'><p>Please enter a valid email address.</p></div> : null
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

                        <div className="sign-up-password-container">
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
                                className='on-boarding-input-field'
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
                            />
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
                        <div className="sign-up-field-radio">
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

                        <div className={`login-btn-field ${this.state.isInValidEmail || this.state.password ? 'click-not-allowed' : 'click-not-allowed'}`}>
                            <Button
                                className={`sign-in-button ${this.state.isInValidEmail || this.state.password.length <= 0 ? 'click-not-allowed' : null}`}
                                variant="outlined" color="primary"
                                onClick={this.submitHandler}
                                disabled={this.state.isInValidEmail || this.state.password.length <= 0}>
                                {this.state.isLoginAttempting ? <img className='login-spinner' src={spinner} alt='spinner'/> : 'Login'}
                            </Button>
                            <div className="click-here-login-arrow-container">
                                <p className="Click-here-to-Login">Click here to Login</p>
                                <img src={loginButtonArrow}></img>
                            </div>
                        </div>                        

                        <div className="sign-up-or-seperator">
                            <hr/><span>OR</span><hr/>
                        </div>

                        <div className="sigh-up-with-google-button">

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



                        {/* </div> */}


                    </div>                        
                </div>


                <OnBoardingFooter />
            </div>
        )
    }
}

export default LoginNew;