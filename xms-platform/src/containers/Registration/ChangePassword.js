import React, { Component } from 'react';
import axios from "axios";
import "./ResetPassword.scss";
import "./ChangePassword.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import RegistrationLogo from "../../assets/images/logo.png";
import Button from '@material-ui/core/Button';
import OnBoardingHeader from '../Registration/OnBoardingHeader/OnBoardingHeader'
import OnBoardingFooter from '../Registration/OnBoardingFooter/OnBoardingFooter'
import InputBase from '@material-ui/core/InputBase';
import RegistrationLogoBar from "../../assets/icons/LoginAndRegistration_icons/Icon-metro-menu.svg";
import RegistrationButtonArrow from "../../assets/icons/LoginAndRegistration_icons/share1.svg";
import HeartIcon from "../../assets/icons/LoginAndRegistration_icons/Icon awesome-heart.svg";
import { baseUrl } from "../../constants";
import { Link } from 'react-router-dom';
import bendArrowIcon from '../../assets/icons/SVG/Group-10441-left.svg'
import TextField from '@material-ui/core/TextField';

class Changepassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            oldPassword: '',
            confirmPassword: '',
            response: '',
            status: '',
            isShowConfPassword: false,
            isShowPassword: false

        }
    }
    submitHandlerR = async (e) => {
        const id = localStorage.getItem('id');
        e.preventDefault();
        //if(this.state.password==this.state.confirmPassword){
        let requestBodyR = {
            query: `
                  mutation ChangePassword(
                      $password: String!,$oldPassword:String!,$confirmPassword:String!,$id:Int!
                    ) {
                        changePassword(
                            password: $password,oldPassword:$oldPassword,confirmPassword:$confirmPassword,id:$id
                    ) {
                        id
                    }
                  }
                `,
            variables: {
                password: this.state.password,
                oldPassword: this.state.oldPassword,
                confirmPassword: this.state.confirmPassword,
                id: Number(id)
            }
        };
        let resData = await axios({
            method: 'post',
            url: baseUrl.server,
            data: requestBodyR,
        }).then(res => {
            //alert(JSON.stringify(res));
            return res
            //window.location.href = '/login';
        }).catch(err => {
            return err
            //window.location.href = '/login';
        });

        // }else{
        //     alert("Password and Confirm Password Doesn't Match");
        // }
        if (resData.data.data.changePassword == null && resData.data.errors[0].message == 'Enter Valid Old Password!') {
            this.setState({ response: "Enter Valid Old Password!", status: "danger" });
            //window.location.href = '/';
            //alert('1');
        } else if (resData.data.data.changePassword == null && resData.data.errors[0].message == 'User doesnt exists!') {
            this.setState({ response: "The new password and confirmation password does not match", status: "danger" });
            //window.location.href = '/';
        } else {
            //alert('11');
            this.setState({ response: "Password Has Been Successfully Updated", status: "success" });
            window.location.href = '/ticketlisting';
        }

    };
    render() {
        const divStyle = {
            color: 'red',

        };
        const divStyleone = {
            color: 'green',
        };
        return (
            <div className="user-page">
                <OnBoardingHeader />
                <div className="change-password-body">
                <div className="resetpassword-container">
                    {
                        this.state.status == 'danger' ? (this.state.status == 'danger' ? <div className="alert alert-success alert-dismissible">
                            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <strong>{this.state.response}</strong>
                        </div>
                            : <div className="alert alert-success alert-dismissible">
                                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                                <strong>{this.state.response}</strong>
                            </div>

                        ) : null
                    }
                    <div className="resetpassword-container-text">
                        <p className="resetpassword-container-text-one">Reset your password</p>
                        <p className="resetpassword-container-text-two">Set a new password for <span>abc@xyz.com</span></p>

                        {/* {this.state.status == 'danger'?   <h1 style={divStyle}>{this.state.response}</h1>
                : <h1 style={divStyleone}>{this.state.response}</h1>  } */}
                    </div>
                </div>
                <div className='change-password-elements-wrapper'>
                <div className="resetNewPasswordContainer">
                    <TextField 
                        className='' 
                        label="New Password" 
                        name="newPassword"
                        required id="outlined-required" 
                        className={''} 
                        value={this.state.newPassword}
                        margin="normal" 
                        variant="outlined" 
                        type={this.state.isShowPassword ? 'text' : 'password'}
                        onChange={e => this.setState({ newPassword: e.target.value })}
                    />  
                    {
                        <i  onClick={()=> this.setState({ isShowPassword: !this.state.isShowPassword })}
                            className={this.state.newPassword ? this.state.newPassword ? "fa fa-eye showPasswordEye" : "fa fa-eye-slash show-password-eye" : null}
                        />
                    }                    
                    {
                        !this.state.status > 0 && !this.state.status ?
                            <i class="fa fa-exclamation-circle" aria-hidden="true"></i> : null
                    }                    
                </div>
                <div className="resetConfirmPasswordContainer">
                    <TextField 
                        className='' 
                        name="confirmPassword"
                        required id="outlined-required" 
                        label="Confirm Password" 
                        value={this.state.confirmPassword}
                        className={''} 
                        onChange={e => this.setState({ confirmPassword: e.target.value })}
                        margin="normal" 
                        variant="outlined" 
                        type={!this.state.isShowConfPassword ? 'password' : 'text'  }
                    /> 
                    {
                        <i   onClick={()=> this.setState({ isShowConfPassword: !this.state.isShowConfPassword })}
                            className={this.state.confirmPassword ? this.state.confirmPassword ? "fa fa-eye showPasswordEye" : "fa fa-eye-slash show-password-eye" : null}
                        />
                    }     
                    {
                        !this.state.status > 0 && !this.state.status ?
                            <i class="fa fa-exclamation-circle" aria-hidden="true"></i> : null
                    }   
                    {
                        !this.state.confirmPassword ?
                            <div className='newAndConfPassNotMatchPopup'>
                                The new password and confirm password does not match.
                            </div> : null
                    }                                        
                </div>



                <div className="change-password-field-two d-flex">
                    <Button variant="outlined" color="primary" className="" onClick={this.submitHandlerR}>
                    Reset your password
                    </Button>

                    <div className="click-here-login-arrow-container">
                        <p className="Click-here-to-Login">Click here to generate new password</p>
                        <img src={bendArrowIcon}></img>
                    </div>
                 
                </div>

                {/* <div className="bottom-text">
                    <p>Back to Login</p>
                </div> */}
                <div className="change-bottom-text">
                    <nav><Link to="/">Back to Login</Link></nav>
                </div>
                </div>
                </div>
                <OnBoardingFooter />








                
            </div>
        )
    }
}

export default Changepassword;
