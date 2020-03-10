import React from 'react';
import "./otpathentication.scss";

import OtpInput from 'react-otp-input';
import Button from "@material-ui/core/Button";

import OnBoardingHeader from '../OnBoardingHeader/OnBoardingHeader';
import OnBoardingFooter from '../OnBoardingFooter/OnBoardingFooter';
import loginButtonArrow from "../../../assets/icons/SVG/Group-10441-left.svg";

class OtpAuthentication extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            optNumber: 8   
        }
    }

    render() {
        let { optNumber } = this.state;
        return  (
            <div className="otpAuthenticationComponent">
                <OnBoardingHeader />
                <div className='otpAuthenticationComponentBody'>                        
             
                    <div className="optContainer">                       
                    <label>VERIFICATION</label>
                    <label>Please enter the One-Time Password to verify your account</label>
                    <label>A One-Time password has been sent to +1 987 123 4560</label>
                    <OtpInput   
                            containerStyle={'otpInputComponent'}
                            onChange={otp => this.setState({optNumber: otp})}
                            numInputs={6}
                            value={optNumber}
                            isInputNum={true}
                            separator={<span> </span>}
                        />
                        <div className='buttonAndCaptionContainer'>
                            <Button
                                className={`otpValidatorButton ${''}`}
                                variant="outlined"
                                color="primary"
                                onClick={'this.submitHandler'}
                                disabled={''}
                            > Validate</Button>   
                            <div className="ur-cmpny-button-filed-click-section">   
                                <p>Click here <br/>to validate OTP</p>
                                <img src={loginButtonArrow}></img>
                            </div>  
                        </div>
                        <label className='resendOTP'>Resend OTP</label>
                   
                    </div>
                </div>
                <OnBoardingFooter />
            </div>
        )     
    }
}
    
export default OtpAuthentication;