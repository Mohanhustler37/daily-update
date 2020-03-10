import React, {Component} from 'react';
import axios from "axios";
import "./ResetPassword.scss";
import "./ChangePassword.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import RegistrationLogo from "../../assets/images/logo.png";
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import RegistrationLogoBar from "../../assets/icons/LoginAndRegistration_icons/Icon-metro-menu.svg";
import RegistrationButtonArrow from "../../assets/icons/LoginAndRegistration_icons/share1.svg";
import HeartIcon from "../../assets/icons/LoginAndRegistration_icons/Icon awesome-heart.svg";
import { baseUrl } from "../../constants";
import { Link } from 'react-router-dom';
class Confirmation extends Component{
    constructor(props){
        super(props);
        this.state = {
            response:'',
            status:'',
        }
    }
    componentDidMount(){
       this.VerifyAccount();
       //alert(this.props.match.params.token);
    }
    VerifyAccount = () => {
        let requestBody = {
            query: `
            mutation UserVerify($token: String!){
                  userVerification(token: $token) {
                      id
                }
              }
            `,
            variables: {
                token: this.props.match.params.token,
                //token:"gzchchgacghhxhjcg",
            }
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
                //console.log(resData);
                if (resData.data.userVerification==null && resData.errors[0].message=='Token doesnt found') {
                    this.setState({response:"Token is not Mapped with User",status:"danger"});
                    //window.location.href = '/';
                }else{
                    this.setState({response:"Your Account has been activated successfully",status:"success"});
                    window.location.href = '/';
                }
            })
            .catch(err => {
                console.log(err);
            });
        //alert(JSON.stringify(this.state.habits));
    };
    render(){
        const divStyle = {
            color: 'red',
    
        };
        const divStyleone = {
            color: 'green',
        };
        return(
            <div className="user-page">
                    <div className="user-header-logo">
                    <AppBar position="static">
                        <Toolbar variant="dense">
                           <img src={RegistrationLogo} className="user-logo"></img>
                           <img src={RegistrationLogoBar}></img>
                        </Toolbar>
                    </AppBar>
                    </div>
                    <div className="resetpassword-container">
           
                            <div className="resetpassword-container-text">
                            {this.state.status == 'danger' ? <h1 style={divStyle}>{this.state.response}</h1>
                                        : <h1 style={divStyleone}>{this.state.response}</h1>}  
                                {/* {this.state.status == 'danger'?   <h1 style={divStyle}>{this.state.response}</h1>
                : <h1 style={divStyleone}>{this.state.response}</h1>  } */}
                            </div>
                 </div>
                

        <footer className="change-password-container d-flex">
         <div className="change-password-left-container">
            <p>Made with <span><img src={HeartIcon}></img></span> in Chicago</p>
        </div>
            <div className="change-password-right-container justify-flex-end">
                <ul className="change-password-list">
                    <li>Privacy Policy</li>
                    <li>Team of logo</li>
                    <li>Helps</li>
                </ul>
            </div>
        </footer>
                
            </div>
        )
    }
}

export default  Confirmation;
