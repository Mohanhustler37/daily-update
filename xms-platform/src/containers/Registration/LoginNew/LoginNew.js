import React from "react";
import "./LoginNew.scss";

import axios from "axios";
import { baseUrl } from "../../../constants";
import socketIOClient from "socket.io-client";
import validator from "validator";
import history from "../../../Routes/history";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";

import OnBordingHeader from "../OnBoardingHeader/OnBoardingHeader";
import OnBoardingFooter from "../OnBoardingFooter/OnBoardingFooter";
import spinner from "../../../assets/icons/SVG/LoneDetailedFairybluebird-max-1mb.gif";

import loginButtonArrow from "../../../assets/icons/SVG/Group-10441-left.svg";
import EmailSuccessIcon from "../../../assets/icons/01-10-2019/Icon feather-check-circle.svg";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {googleLogin,loginUser} from "./LoginNewQueries"
class LoginNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailIs: "",
      password: "",
      response: "",
      status: "",
      rememberMe: false,
      isInValidEmail: true,
      isInValidPwd: true,
      isWrongPwd: false,
      showPassword: false,
      isEmailRequired: false,
      isPwdRequired: false,
      isLoginAttempting: false
    };
  }

  showPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  componentDidMount() {
    const rememberMe = localStorage.getItem("rememberMe") === "on";
    const emailIs = rememberMe ? localStorage.getItem("user") : "";
    this.setState({ emailIs, rememberMe });

    window.addEventListener(
      "keypress",
      e => {
        if (e.key == "Enter" && e.keyCode == 13) {
          this.submitHandler();
        }
      },
      false
    );
  }
  submitHandler = async event => {
    localStorage.setItem("rememberMe", this.state.rememberMe);
    localStorage.setItem("user",this.state.rememberMe ? this.state.emailIs : "");
    this.setState({ isLoginAttempting: true });
    const emailIs1 = this.state.emailIs.trim();
    const password1 = this.state.password.trim();
    let variables = {
      emailIs:emailIs1,
      password:password1
    }
    let client = this.props.client 
    loginUser(client,variables,async(res) => {
      this.setState({ isLoginAttempting: false });
      if (
        res.data.loginUser == null &&
        res.errors[0].message == "Password is incorrect!"
      ) {
        this.setState({
          isWrongPwd: true,
          isPwdRequired: false,
          isLoginAttempting: false
        });
      } else if (
        res.data.loginUser == null &&
        res.errors[0].message == "User doesnt exists!"
      ) {
        this.setState({
          response: "User Doesn't Exists",
          status: "danger",
          isLoginAttempting: false
        });
        //window.location.href = '/';
      } else if (
        res.data.loginUser == null &&
        res.errors[0].message == "Email or Password is required"
      ) {
        // this.setState({ response: "Email or password is required", status: "danger" });
        this.setState({
          isEmailRequired: true,
          isPwdRequired: true,
          isLoginAttempting: false
        });
      } else if (
        res.data.loginUser == null &&
        res.errors[0].message == "Your account has not yet Activated.!"
      ) {
        this.setState({
          response: "Your account has not yet Activated.!",
          status: "danger",
          isLoginAttempting: false
        });
      } else {
        this.setState({
          response: "Logged in successfully",
          status: "success"
        });
        localStorage.setItem(
          "jwtToken",
          res.data.loginUser != null
            ? res.data.loginUser.token
            : ""
        );
        localStorage.setItem(
          "id",
          res.data.loginUser != null
            ? res.data.loginUser.id
            : ""
        );
        const socket = await socketIOClient.connect(baseUrl.server, {
          query: {
            id:
              res.data.loginUser != null
                ? res.data.loginUser.id
                : ""
          }
        });
          localStorage.setItem(
            "companyId",
            res.data.loginUser.companyId
          );
          localStorage.setItem(
            "loginUserDetails",
            JSON.stringify({
              userId: res.data.loginUser.id,
              companyId: res.data.loginUser.companyId,
              firstName: res.data.loginUser.firstName,
              lastName: res.data.loginUser.lastName
            })
          );
          history.push("/ticketlisting");
          this.setState({ isLoginAttempting: false });
      }
    })
//  requestBody = {
//       query: `
//                     mutation {
//                         loginUser(emailIs: "${emailIs}", password: "${password}") {
//                             id,
//                             emailIs,
//                             token,
//                             companyId,
//                             firstName,
//                             lastName

//                       }
//                     }
//                   `
//     };
//     let resData = await a1xios({
//       method: "post",
//       url: baseUrl.server,
//       data: requestBody,
//       headers: {
//         "Content-type": "application/json"
//       }
//     })
//       .then(res => {
//         //alert(JSON.stringify(res))
//         this.setState({ isLoginAttempting: false });
//         return res;
//       })
//       .catch(err => {
//         //alert(JSON.stringify(err))
//         return err;
//       });
//     console.log("resData.data", resData.data);
//     if (resData.data) {
//       if (
//         resData.data.data.loginUser == null &&
//         resData.data.errors[0].message == "Password is incorrect!"
//       ) {
//         // this.setState({ response: "Password Is Incorrect", status: "danger" });
//         this.setState({
//           isWrongPwd: true,
//           isPwdRequired: false,
//           isLoginAttempting: false
//         });
//         //window.location.href = '/';
//       } else if (
//         resData.data.data.loginUser == null &&
//         resData.data.errors[0].message == "User doesnt exists!"
//       ) {
//         this.setState({
//           response: "User Doesn't Exists",
//           status: "danger",
//           isLoginAttempting: false
//         });
//         //window.location.href = '/';
//       } else if (
//         resData.data.data.loginUser == null &&
//         resData.data.errors[0].message == "Email or Password is required"
//       ) {
//         // this.setState({ response: "Email or password is required", status: "danger" });
//         this.setState({
//           isEmailRequired: true,
//           isPwdRequired: true,
//           isLoginAttempting: false
//         });
//       } else if (
//         resData.data.data.loginUser == null &&
//         resData.data.errors[0].message == "Your account has not yet Activated.!"
//       ) {
//         this.setState({
//           response: "Your account has not yet Activated.!",
//           status: "danger",
//           isLoginAttempting: false
//         });
//         //window.location.href = '/';
//       } else {
//         this.setState({
//           response: "Logged in successfully",
//           status: "success"
//         });
//         localStorage.setItem(
//           "jwtToken",
//           resData.data.data.loginUser != null
//             ? resData.data.data.loginUser.token
//             : ""
//         );
//         localStorage.setItem(
//           "id",
//           resData.data.data.loginUser != null
//             ? resData.data.data.loginUser.id
//             : ""
//         );
//         const socket = await socketIOClient.connect(baseUrl.server, {
//           query: {
//             id:
//               resData.data.data.loginUser != null
//                 ? resData.data.data.loginUser.id
//                 : ""
//           }
//         });
//         // localStorage.setItem('socketId', socket.id);
//         // if (resData.data.loginUser != null) {
//           localStorage.setItem(
//             "companyId",
//             resData.data.data.loginUser.companyId
//           );
//           localStorage.setItem(
//             "loginUserDetails",
//             JSON.stringify({
//               userId: resData.data.data.loginUser.id,
//               companyId: resData.data.data.loginUser.companyId,
//               firstName: resData.data.data.loginUser.firstName,
//               lastName: resData.data.data.loginUser.lastName
//             })
//           );
//           history.push("/ticketlisting");
//           this.setState({ isLoginAttempting: false });
//         // }else{
//         //   this.setState({ isLoginAttempting: true });
//         // }
//       }
//     } else {
//       // this.setState({ response: "Something went wrong", status: "danger" });
//       this.setState({ isLoginAttempting: false });
//       alert("Something went wrong");
//     }
    // }
    // }
  };

  changeHandler = event => {
    const input = event.target;
    const value = input.type === "radio" ? input.checked : input.value;
    this.setState({ [input.name]: value });
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === "emailIs") {
      if (validator.isEmail(event.target.value.trim()))
        this.setState({ isInValidEmail: false, isEmailRequired: false });
      else this.setState({ isInValidEmail: true, isEmailRequired: false });
    }
    if (event.target.name === "password") {
      if (event.target.value.length < 8)
        this.setState({ isInValidPwd: true, isPwdRequired: false });
      else {
        for (let i = 0; i < event.target.value.length; i++) {
          if (
            event.target.value[i].charCodeAt() >= 65 &&
            event.target.value[i].charCodeAt() <= 90
          ) {
            this.setState({ isInValidPwd: false, isPwdRequired: false });
            break;
          } else this.setState({ isInValidPwd: true, isPwdRequired: false });
        }
      }
    }
  };

  render() {
    const responseGoogle = response => {
      const emailIs = response.profileObj.email;
      let client = this.props.client;
      googleLogin(client,emailIs,res=>{
        // alert(JSON.stringify(res))
        if (
          res.data.googleLogin == null &&
          res.errors[0].message == "User doesnt exists!"
        ) {
          this.setState({
            response: "User Doesn't Exists",
            status: "danger"
          });
        } else {
          this.setState({
            response: "Logged in successfully",
            status: "success"
          });
          localStorage.setItem("jwtToken", res.data.googleLogin.token);
          localStorage.setItem("id", res.data.googleLogin.id);
          window.location.href = "/ticketlisting";
        }
      })
    };
    


    const failGoogle = response => {
      console.log(response);
    };
    console.log("this.state", this.state);
    return (
      <div className="on-boarding-login-layout">
        <OnBordingHeader />
        <div className="login-wrapper">
          <div className="login-form">
            <div className="label-wrapper">
              <h2>SIGN IN</h2>
              <p>Enter your email & password to login</p>
            </div>
            <div className="field-wrapper">
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">
                  Email
                </InputLabel>
                <OutlinedInput
                  id="outlined-basic1"
                  className="on-boarding-input-field"
                  margin="normal"
                  variant="outlined"
                  required
                  error={
                    (this.state.emailIs.length > 0 &&
                      this.state.isInValidEmail) ||
                      this.state.isEmailRequired
                      ? "error-while-login"
                      : null
                  }
                  name="emailIs"
                  onChange={this.changeHandler}
                  value={this.state.emailIs}
                  endAdornment={
                    <InputAdornment position="end">
                      {this.state.emailIs.length > 0 &&
                        this.state.isInValidEmail ? (
                          <i
                            class="fa fa-exclamation-circle"
                            aria-hidden="true"
                          ></i>
                        ) : null}
                      {this.state.emailIs.length > 0 &&
                        !this.state.isInValidEmail ? (
                          <img src={EmailSuccessIcon} alt=""></img>
                        ) : null}
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
                {this.state.emailIs.length > 0 && this.state.isInValidEmail ? (
                  <div className="error-popup">
                    <p>Please enter a valid email address.</p>
                  </div>
                ) : null}

                {this.state.isEmailRequired ? (
                  <div className="error-popup">Email is required.</div>
                ) : null}
              </FormControl>
            </div>
            <div className="field-wrapper">
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-basic"
                  className="on-boarding-input-field"
                  margin="normal"
                  variant="outlined"
                  required
                  error={
                    this.state.isWrongPwd || this.state.isPwdRequired
                      ? "error-while-login"
                      : null
                  }
                  name="password"
                  type={this.state.showPassword ? "text" : "password"}
                  onChange={this.changeHandler}
                  value={this.state.password}
                  autoComplete="new-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={this.showPassword}
                      >
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                            <VisibilityOff />
                          )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
                {this.state.isWrongPwd ? (
                  <div className="error-popup">Invalid password.</div>
                ) : null}
                {this.state.isPwdRequired ? (
                  <div className="error-popup">Password is required.</div>
                ) : null}
              </FormControl>
            </div>
            <div className="field-wrapper">
              <div className="radion-btn-and-label">
                <Radio
                  checked={this.state.rememberMe}
                  onClick={event => {
                    console.log("this.state.rememberMe", this.state.rememberMe);
                    this.state.rememberMe
                      ? this.setState({ rememberMe: !event.target.checked })
                      : this.setState({ rememberMe: event.target.checked });
                  }}
                  style={{ color: "#7AC9FF", borderColor: "#7AC9FF" }}
                  value={this.state.rememberMe}
                  name="rememberMe"
                  inputProps={{ "aria-label": "A" }}
                />
                <span className="remember-me">Remember me</span>
              </div>
              <nav>
                <Link to="/forgotpassword">Forgot password ?</Link>
              </nav>
            </div>
            <div
              className={`field-wrapper login-btn-field ${
                this.state.isInValidEmail || this.state.password
                  ? "click-not-allowed"
                  : "click-not-allowed"
                }`}
            >
              <Button
                className={`sign-in-button ${
                  this.state.isInValidEmail || this.state.password.length <= 0
                    ? "click-not-allowed"
                    : null
                  }`}
                variant="outlined"
                color="primary"
                onClick={this.submitHandler}
                disabled={
                  this.state.isInValidEmail || this.state.password.length <= 0
                }
              >
                {this.state.isLoginAttempting ? (
                  <img className="login-spinner" src={spinner} alt="spinner" />
                ) : (
                    "Login"
                  )}
              </Button>
              <div className="arrow-container">
                <p>Click here to Login</p>
                <img src={loginButtonArrow}></img>
              </div>
            </div>
            <div className="field-wrapper">
              <hr />
              <span>OR</span>
              <hr />
            </div>
            <div className="field-wrapper">
              <div className="sigh-up-with-google-button">
                <GoogleLogin
                  clientId="371997214976-dre2b43jbqppi6l05jm4m1eic0q3tbnl.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  onSuccess={responseGoogle}
                  onFailure={failGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </div>
            <div className="field-wrapper">
              <div className="login-bottom-text d-flex justify-content-center">
                <p>Don't have an account?</p>
                <nav>
                  <Link to="/registration">&nbsp;Sign up</Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div>
          <OnBoardingFooter />
        </div>
      </div>
    );
  }
}
export default LoginNew;