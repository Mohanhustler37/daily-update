import React, { useState, useEffect } from 'react';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import OnBoardingHeader from '../Registration/OnBoardingHeader/OnBoardingHeader';
import OnBoardingFooter from '../Registration/OnBoardingFooter/OnBoardingFooter';
import RegistrationStep from '../Registration/RegistrationStep/RegistrationStep';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './RegistrationUsingStepper.scss';
import "./Registration.scss";
import "./RegistrationCompanyDetails.scss"
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import RegistrationLogo from "../../assets/images/logo.png";
import RegistrationLogoBar from "../../assets/icons/LoginAndRegistration_icons/Icon-metro-menu.svg";
import RegistrationButtonIcon from "../../assets/icons/LoginAndRegistration_icons/Iconfeather-chevron-right1.svg";
import RegistrationProcessWire from "../../assets/icons/LoginAndRegistration_icons/Icon-simple-processwire.svg";
import RegistrationLockIcon from "../../assets/icons/LoginAndRegistration_icons/Icon-material-lock-outline.svg";
import RegistrationButtonArrow from "../../assets/icons/LoginAndRegistration_icons/share1.svg";
import RegistrationGoogleImage from "../../assets/icons/LoginAndRegistration_icons/MaskGroup1.svg";
import InputBase from '@material-ui/core/InputBase';
import HeartIcon from "../../assets/icons/LoginAndRegistration_icons/Icon awesome-heart.svg";
import RegistrationDetailsLogo from "../../assets/images/logo.png";
import RegistrationDetailsLogoBar from "../../assets/icons/LoginAndRegistration_icons/Icon-metro-menu.svg"
import RegistrationCheckIcon from "../../assets/icons/LoginAndRegistration_icons/Iconfeather-check.svg";
import RegistrationProcessIcon from "../../assets/icons/LoginAndRegistration_icons/Icon-simple-processwire.svg";
import RegistrationDetailsLockIcon from "../../assets/icons/LoginAndRegistration_icons/Icon-material-lock-outline.svg";
import RegistrationButtonSelectIcon from "../../assets/icons/LoginAndRegistration_icons/Icon-ionic-md-arrow-dropdown.svg";
import RegistrationButtonOptionIcon from "../../assets/icons/LoginAndRegistration_icons/Group-10440.svg";
import RegistrationButtonArrowBackIcon from "../../assets/icons/LoginAndRegistration_icons/Icon feather-chevron-right.svg";
import RegistrationButtonRight1Icon from '../../assets/icons/LoginAndRegistration_icons/Iconfeather-chevron-right1.svg';
import RegistrationLeftTopArrow from "../../assets/icons/LoginAndRegistration_icons/share.svg";
import Input from '@material-ui/core/Input';
import BirthdayIcon from "../../assets/icons/SVG/Iconfeather-calendar.svg";
import ArrowForwardImage from "../../assets/icons/LoginAndRegistration_icons/Icon ionic-md-arrow-forward.svg";
import BookmarkImage from "../../assets/icons/LoginAndRegistration_icons/Icon feather-bookmark.svg";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import axios from "axios";
import { baseUrl } from "../../constants";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import validator from 'validator';
import Radio from '@material-ui/core/Radio';
import ApolloClient from "apollo-boost";
import GoogleLogin from 'react-google-login';
import { ApolloProvider, useQuery, useMutation } from "@apollo/react-hooks";
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import { validateDomain } from "./registrationQueries";
import CongratulationRgtArw from "../../assets/congratulation_page_icons/icon-feather-chevron-right.svg";
import CngrtltnFwdIcon from "../../assets/congratulation_page_icons/icon-ionic-md-arrow-forward.svg";
import Congratulationinpttag from "../../assets/congratulation_page_icons/icon-feather-bookmark.svg";
import DrpDwnIcn from "../../assets/icons/create-ticket/Icon ionic-md-arrow-dropdown.svg";
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
// import loginButtonArrow from "../../../assets/icons/SVG/Group-10441-left.svg";
import loginButtonArrow from "../../assets/icons/SVG/Group-10441-left.svg";
import { Scrollbars } from 'react-custom-scrollbars';
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import calenderIcon from '../../assets/icons/SVG/Iconfeather-calendar.svg'
import completed from '../../assets/icons/task/completed.svg'
// import { Recaptcha } from 'react-recaptcha-google'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import useRecaptcha, { Badge } from 'react-recaptcha-hook';

import Recaptcha from 'react-google-recaptcha'
// useEffect(()=> {
// if (this.captchaDemo) {
//         console.log("started, just a second...")
//         this.captchaDemo.reset();
//         this.captchaDemo.execute();
//     }
//   });


const cache = new InMemoryCache();

const client = new ApolloClient({
    cache,
    uri: baseUrl.server,
});
const industries = [
    {id: 0, industryType: 'Software', },
    {id: 1, industryType: 'Manufacturing', },
    {id: 2, industryType: 'Finance', },
    {id: 3, industryType: 'Pharmaceutical', },
  ]

  const numberOfEmployees = [
    {id: 0, noOfEmp: '1-5 peoples', },
    {id: 1, noOfEmp: '6-20 peoples', },
    {id: 2, noOfEmp: '21-50 peoples', },
    {id: 3, noOfEmp: '51-100 peoples', },
    {id: 4, noOfEmp: '101-150 peoples', },
    {id: 5, noOfEmp: '151-200 peoples', },
    {id: 6, noOfEmp: '201-251 peoples', },
  ]


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        background: 'red'
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Account', 'Company', 'Personal'];
}

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })(props => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles(theme => ({
    root: {
      // '&:focus': {
      //   backgroundColor: theme.palette.primary.main,
      //   '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      //     color: theme.palette.common.white,
      //   },
      // },
    },
  }))(MenuItem);
  


 
export default function RegistrationUsingSetter(props) {
    const classes = useStyles();
    useEffect(()=> {
        document.addEventListener('click', handleOutsideClick, false);

        // handleSubscribe = handleSubscribe.bind();
        // recaptchaLoaded = recaptchaLoaded.bind();
        // verifyCallback = verifyCallback.bind();
 
        
    });

    // const onLoadRecaptcha = () => {
    //     if (captchaDemo) {
    //         captchaDemo.reset();
    //         captchaDemo.execute();
    //     }
    // }
    const handleSubscribe = () => {
        if (this.state.isVerified) {
          alert('You have successfully subscribed!');
        } else {
          alert('Please verify that you are a human!');
        }
      }
    const recaptchaLoaded = () => {
        console.log('capcha successfully loaded');
      }



    // verifyCallback(response) {
    //     if (response) {
    //       this.setState({
    //         isVerified: true
    //       })
    //     }
    //   }
    const  verifyCallback = (response) =>{
        if (response) {
            this.setState({
              isVerified: true
            })
          }
        // Here you will get the final recaptchaToken!!!  
        console.log(response, "<= your recaptcha token")
      }

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [state, setState] = React.useState({
        isVerified: false, 
        noOfEmployees: '',
        emailIs: '',
        password: '',
        companyName: '',
        industry: '',
        firstName: '',
        lastName: '',
        domain: '',
        phoneNumber: '',
        birthday: '',
        response: '',
        status: '',
        responseg: '',
        statusg: 'danger',
        selectedIndustry: ''
    });
    const [isInValidEmail, setIsInValidEmail] = React.useState(true);
    const [isInValidPwd, setIsInValidPwd] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState({ showPassword: false });
    const [emailIs, setEmailIs] = React.useState("");
    const [password, setPass] = React.useState("");
    const [companyName, setComp] = React.useState("");
    const [industry, setIndustry] = React.useState("");
    // const [indexIdustry, setRadioIndustry] = React.useState("");
    const [noOfEmployees, setNofEmp1] = React.useState("");
    const [domain, setDomain] = React.useState("");
    const [firstName,setFirstname] = React.useState("");
    const [lastName,setLasttname] = React.useState("");
    const [phoneNumber,setPhoneNum] = React.useState("");
    // const [birthday,setBday] = React.useState("");

    const [birthday, setSelectedDate] = React.useState("");
    const [birthdayToPass, setDateToPass] = React.useState("");
    const [checkEmailApiData, setCheckEmailData] = React.useState();
    const [userExist, setUserExist] = React.useState(false);
    const [isInValidPhoneNo, setPhoneNumber] = React.useState(false);
    const [isIndustryDropdown, setIndustryDropdown] = React.useState(false);
    const [isNumOfEmployeesDropdown, setNumOfEmployeesDropdown] = React.useState(false);
    const [anchorEl, setanchorEl] = React.useState(null);
    const [selecteIdTwo] = React.useState();
    const [selectedValue, setSelectedValue] = React.useState('a');

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    const [userDOB, setDateOfBirth] = useState();
    const [isShowUserDobDropDown, showUserDobDropDown] = useState(false);
    const handleOutsideClick =(event)=> {

        if(wrapperRef && !wrapperRef.contains(event.target)) {
            setIndustryDropdown(false)
            setNumOfEmployeesDropdown(false)
            showUserDobDropDown(false)
        }        
    }

    let wrapperRef;
    const setWrapperRef = (node) => {

        wrapperRef = node;
    } 

    const handleChange = name => event => {
        if (event.target.name === 'emailIs') {
            if (validator.isEmail(event.target.value.trim())) {
                setIsInValidEmail(false )
                setUserExist({ userExist: false })
            }
            else {
                setIsInValidEmail( true )
                setUserExist({ userExist: false })
            }
        }

        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if (event.target.name === "password") {
            if (event.target.value.length < 8)
                setIsInValidPwd( true)
            else {
                for (let i = 0; i < event.target.value.length; i++) {
                    if (strongRegex.test(event.target.value)) {
                        setIsInValidPwd( false );
                        break;
                    } else setIsInValidPwd( true)
                }
            }
        }
        if (event.target.name === "phoneNumber") {
            let phoneno = event.target.value.replace(/[^0-9]/g, '');

            if (phoneno.length != 10) {
                setPhoneNumber(true )
            } else {
                setPhoneNumber( false )
            }
        } else if (event.target.name == "phoneNumber" && event.target.value == '') {
            setPhoneNumber( false )
        }
        setState({
            ...state,
            [name]: event.target.value,
        })

    };
    const handleChangeEmail=()=>(event)=>{
        if (event.target.name === 'emailIs') {
            if (validator.isEmail(event.target.value.trim())) {
                setIsInValidEmail( false )
                setUserExist(false)
            }
            else {
                setIsInValidEmail({ isInValidEmail: true })
                setUserExist({ userExist: false })
            }
        }
        setEmailIs(event.target.value)
    }
    const handleChangePass=()=>(event)=>{
        
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if (event.target.name === "password") {
            if (event.target.value.length < 8)
                setIsInValidPwd(true)
            else {
                for (let i = 0; i < event.target.value.length; i++) {
                    if (strongRegex.test(event.target.value)) {
                        setIsInValidPwd( false );
                        break;
                    } else setIsInValidPwd( true )
                }
            }
        }
        setPass(event.target.value)
    }
    const handleChangeCompany =()=>(e)=>{
        setComp(e.target.value)
    }
    const handleChangeDomain =()=>(e)=>{
        setDomain(e.target.value)
    }


    const showPasswordData = event => {
        if (showPassword.showPassword == false) {
            setShowPassword({ ...showPassword, "showPassword": true });
        } else {
            setShowPassword({ ...showPassword, "showPassword": false });
        }
    }
    const [showNoOfEmp, setNofEmp] = React.useState(false);
    const handleShowNofEmp = () => {
        setNofEmp({ showNoOfEmp: true })
    }
    const handleChangeRadio = name => event => {
        setState({
            ...state,
            [name]: event.target.value,
        });
    }

    const showIndustryDropdown = () => {
        setIndustryDropdown(  !isIndustryDropdown )
        setNumOfEmployeesDropdown(false )

      }

      const showNumOfEmployeesDropdown = () => {
        setNumOfEmployeesDropdown(!isNumOfEmployeesDropdown )
        setIndustryDropdown(  false )
      }
    
     const industryHandleClick=(selectedObject) => {
        setIndustry(selectedObject);
        setIndustryDropdown(  false )
      }
      const numberOfEMPHandleClick=(selectedObject) => {
        setNofEmp1(selectedObject);
        setNumOfEmployeesDropdown(false )

      }
      const handleChangeFirstName = e =>{
          setFirstname(e.target.value)
      }
      const handleChangeLastname = e =>{
        setLasttname(e.target.value)
    }
    const handleChangePhoneNumber = event =>{
        if (event.target.name === "phoneNumber") {
            let phoneno = event.target.value.replace(/[^0-9]/g, '');

            if (phoneno.length != 10) {
                setPhoneNumber(true )
            } else {
                setPhoneNumber( false )
            }
        } else if (event.target.name == "phoneNumber" && event.target.value == '') {
            setPhoneNumber( false )
        }
        setPhoneNum(event.target.value)
    }
    
     const handleClose = () => {
        setanchorEl({ anchorEl: null });
    };
      
      const radioHandleChangeIndustry = event => {
        // setRadioIndustry(event.target.value);
      };
      const radioHandleChangeNOE = event => {
        setNofEmp1(event.target.value);
      }
    
    const submitHandler = async (e) => {
        if (state.isVerified) {
            alert('You have successfully subscribed!');
            return true
          } else {
            alert('Please verify that you are a human!');
            return false;
          }
      


        let requestBody = {
            query: `
         mutation addUser($emailIs:String!,$password: String!,$companyName:String,$industry:String,$firstName:String,$lastName:String,$domain:String,$phoneNumber:String,$birthday:String,$noOfEmployees:String) {
          createUser(emailIs:$emailIs,password: $password,companyName:$companyName,industry:$industry,firstName:$firstName,lastName:$lastName,domain:$domain,phoneNumber:$phoneNumber,birthday:$birthday,noOfEmployees:$noOfEmployees) {
            emailIs,
            domain,
            }
          }
        `,
            variables: {
                emailIs: emailIs, password: password, companyName: companyName, noOfEmployees: noOfEmployees, industry: industry, domain: domain, firstName: firstName, lastName: lastName, birthday: birthdayToPass, phoneNumber: phoneNumber
            }
        };
        let resData = await axios({
            method: 'post',
            url: baseUrl.server,
            data: requestBody,
        }).then(res => {
            return res
        }).catch(err => {
            return err;
        });
        if (resData.data.data.createUser == null && resData.data.errors[0].message == 'User exists already.') {
            //alert("User Already Exists");
            setState({ response: "User Already Exists.", status: "danger" });
            //window.location.href = '/registration';
        }
        else if (resData.data.data.createUser == null && resData.data.errors[0].message == 'Sub Domain doesnt exists') {
            setState({ response: "Sub Domain doesn't exists", status: "danger" });
        }
        else {
            //alert("Registered Successfully");
            setState({ response: "Registered Successfully", status: "success" });
            setActiveStep(prevActiveStep => prevActiveStep + 1);
            setState({
                ...state, "domain": resData.data.data.createUser.domain ?
                    resData.data.data.createUser.domain : 'example@example.com'
            });
            // window.location.href = '/congratulation';
        }
    }
    const handleDateChange = date => {
        var month =date.getMonth()
        var doB = date.getDate()+"/"+`${month + 1}` +"/"+date.getFullYear()
        var dateOfBirth = date.getTime()
        setDateToPass(toString(date))
        setSelectedDate(doB);
    };


    const handleNextValidate = async () => {

        let requestBody = {
            query: `
         mutation ValidateUserEmail($emailIs:String!,$password: String!) {
            validateUserEmail(emailIs:$emailIs,password: $password) {
                emailIs
            }
          }
        `,
            variables: {
                emailIs: emailIs, password: password,
            }
        };
        let resData = await axios({
            method: 'post',
            url: baseUrl.server,
            data: requestBody,
        }).then(res => {
            return res
        }).catch(err => {
            return err;
        });
        if (resData.data.data.validateUserEmail == null && resData.data.errors && resData.data.errors[0].message == 'User already exists') {
            setUserExist({ userExist: true });
        } else {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
        // setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const divStyle = {
        color: 'red',

    };
    const divStyleone = {
        color: 'green',
    };
    const responseGoogle = (response) => {
        let requestBody = {

            query: `
            mutation GoogleSignup($emailIs:String!,$firstName:String!,$lastName:String!) {
                googleSignup(emailIs:$emailIs,firstName:$firstName,lastName:$lastName) {
                   emailIs
               }
             }
           `,
            variables: {
                emailIs: response.profileObj.email,
                firstName: response.profileObj.familyName,
                lastName: response.profileObj.givenName,
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
                if (resData.errors[0].message == 'User exists already.') {
                    this.setState({ responseg: "User exists already.", statusg: "danger" });
                    // alert("User Doesn't Exists");
                    //window.location.href = '/';
                } else {
                    this.setState({ responseg: "Email has been sent to registered account.please verify the link to continue to login", statusg: "success" });
                }
            })
            .catch(err => {
                return err
            });
        //   
    }
    const failGoogle = (response) => {
        console.log(response);
    }
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };
    return (
        <div className="registration-component">
            <OnBoardingHeader />
            <div className='registration-body-section'>
            <div style={{width: '100%', height: '100%'}}>
            { 
                activeStep === 0 &&  (
                    <div className="registration-heading">
                        <p className="main-heading">
                            LET'S GET STARTED
                        </p>
                        <p className="sub-heading">
                            Register with your work address
                        </p>
                    </div>
                ) 
            }
            {
                activeStep === 1 &&  (
                    <div className="registration-company-details-container">
                        <p className="reg-cmp-dtls-mainheading">YOUR COMPANY</p>
                        <p className="reg-cmp-dtls-subheading">Tell us about your company</p>
                    </div>
                ) 
            }
            {
                activeStep === 2 && (
                    <div className="user-container-text-field">
                        <p className="reg-your-details">YOUR DETAILS</p>
                        <p className="reg-tell-me-about">Tell us about yourself</p>
                    </div>
                )
            }
            {
                activeStep === 0 || activeStep === 1 || activeStep === 2 ?(
                    <Stepper className={`${activeStep == 0 ? 'registrationStepperZero' : activeStep == 1 ? 'registrationStepperOne' : activeStep == 2 ? 'registrationStepperTwo' : '' }`} activeStep={activeStep} alternativeLabel>
                        <Step className="stepper-icons" src={RegistrationLogo}>
                            <StepLabel >Account</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Company</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Personal</StepLabel>
                        </Step>
                    </Stepper>
                ) : null
            }    
                        {activeStep === 0 && (
                            <div className="registration-page">
                                <div className="registration-container">

                                    {state.statusg == 'danger' ? <h1 style={divStyle}>{state.responseg}</h1>
                                        : <h1 style={divStyleone}>{state.responseg}</h1>}
                                        <div className="registration-email-field">
                                            <TextField
                                                id="outlined-basic"
                                                label="Email"
                                                margin="normal"
                                                className={`on-boarding-input-field ${emailIs.length > 0 && isInValidEmail || userExist.userExist  ? 'error-input' : null}` }
                                                variant="outlined"
                                                required
                                                error={
                                                    (emailIs.length > 0 && isInValidEmail)
                                                        || userExist.userExist
                                                        ? 'error-while-login' : null
                                                }
                                                name="emailIs"
                                                onChange={handleChangeEmail()}
                                                value={emailIs}
                                            />
                                            {
                                                emailIs.length > 0 && isInValidEmail ?
                                                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i> : null
                                            }
                                            {
                                                emailIs.length > 0 && isInValidEmail ?
                                                <div className='error-valid-email-popup'>Please enter a valid email address.</div> : null
                                            }

                                            {
                                                userExist.userExist ?
                                                    <p className='error-valid-email-popup'>User already exists. Please try with other email.</p> : null
                                            }
                                        </div>                                            
                                        <div className="registration-field-three">
                                            {/* <InputBase
                                                placeholder="Password"
                                                className="registration-input"
                                                name="password"
                                                type="password"
                                                value={state.password}
                                                onChange={handleChange('password')}
                                                inputProps={{ 'aria-label': 'search' }}
                                            /> */}
                                            <TextField
                                                id="outlined-basic"
                                                label="Password"
                                                margin="normal"
                                                variant="outlined"
                                                className={`on-boarding-input-field ${password.length > 0 && isInValidPwd ? 'error-input' : null}`} 
                                                required
                                                name="password"
                                                type="password"
                                                type={showPassword.showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={handleChangePass()}
                                            />

                                            <i
                                                onClick={showPasswordData}
                                                className={showPassword.showPassword ? "fa fa-eye show-password-eye" : "fa fa-eye-slash show-password-eye"}
                                            ></i>

                                            {
                                                password.length > 0 && isInValidPwd ?
                                                    <div className='registerErrorPasswordPopup error-password-popup'>
                                                        Password must cotain at least
                                                        8 characters, including
                                                        UPPER/lowercase, number
                                                        & special character.
                                                </div> : null
                                            }
                                        </div>

                                        <div className="registration-button">
                                            <Button variant="outlined" color="primary"
                                                className="" onClick={handleNextValidate}
                                            disabled={isInValidEmail || password.length <= 0 || userExist.userExist}
                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                <i className="fa fa-angle-right"></i>
                                            </Button>
                                            <div className="click-here-login-arrow-container">
                                                <p className="Click-here-to-Login">Click here to continue</p>
                                                <img src={loginButtonArrow}></img>
                                            </div>
                                        </div>
                                    <div className="reg-or-seperator">
                                        <hr/><span>OR</span><hr/>
                                    </div>

                                    <div className="reg-with-google-button">
                                        <GoogleLogin
                                            clientId="371997214976-dre2b43jbqppi6l05jm4m1eic0q3tbnl.apps.googleusercontent.com"
                                            buttonText="Login with Google"
                                            onSuccess={responseGoogle}
                                            onFailure={failGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        />
                                        {/* <Recaptcha
            ref={(el) => {captchaDemo = el;}}
            size="invisible"
            render="explicit"
            sitekey="6LckLMcUAAAAAODkBiI_2umxDci1olTn-ycMbXZx"
            onloadCallback={onLoadRecaptcha}
            verifyCallback={verifyCallback}
        /> */}
                                        
                                    </div> 

                                    <div className="registration-bottom-text d-flex justify-content-center">
                                        <p>Already have an account?</p>
                                        <nav><Link to="/"> &nbsp;&nbsp;Sign in</Link></nav>
                                    </div>

                                </div>
                            </div>

                        )}

                        {activeStep === 1 && (

                            <div className="registration-company-details-page">
                                {/* <div className="registration-company-details-container"> */}

                                    <div className="registration-company-details-fields">
                                        <div className="registration-company-details-field-one">
                                            <TextField
                                                id="outlined-basic"
                                                label="Company name"
                                                className='on-boarding-input-field'
                                                margin="normal"
                                                variant="outlined"
                                                required
                                                error={
                                                    companyName ? companyName.length == 1
                                                        ? 'error-while-login' : null : null
                                                }
                                                name="companyName"
                                                onChange={handleChangeCompany()}
                                                value={companyName}
                                            />
                                            {
                                                companyName ? companyName.length == 1 ?
                                                    <p className='error-company-popup'>
                                                        Fields marked in red need to befilled in.
                                                    </p> : null : null
                                            }
                                        </div>

                                        <div className="registration-company-details-field-two">
                                            <div className="company-details-button-one">
                                                <div className='menu-container'>
                                                    <div className='industry-container' onClick={showIndustryDropdown}>
                                                        <div className='selected-item-container'>
                                                            <p htmlFor="industry" name="industry">{industry ? industry : "select Industry"}</p>
                                                        </div>
                                                        <div className="industry-drp-dwn-img">
                                                            <img src={DrpDwnIcn}  />
                                                        </div>

                                                    </div>

                                                        <div className={`industry-dropdown-menu-container 
                                                            ${isIndustryDropdown ? 'industry-open-dropdown' : 'close-dropdown'}`}
                                                        ref={setWrapperRef}>
                                                            <Scrollbars className="custom-scroll" >
                                                            {
                                                            industries ? industries.map((icon, index) =>
                                                                <StyledMenuItem className="customized-ticket-source" onClick={() => industryHandleClick(icon.industryType)} onClose={handleClose}>
                                                                <div className="create-ticket-one-industry d-flex">
                                                                    <div className="create-ticket-prio-img-text d-flex">
                                                                    
                                                                    <p value={icon.industryType}>{icon.industryType}</p>
                                                                    </div>

                                                                    <div className="create-ticket-src-radio">
                                                                        <Radio
                                                                            checked={selecteIdTwo === index}
                                                                            onChange={(e) => radioHandleChangeIndustry(e, index)}
                                                                            value=""
                                                                            name="radio-button-demo"
                                                                            color="primary"
                                                                            inputProps={{ 'aria-label': '' }}
                                                                        />
                                                                    </div>
                                                                </div>


                                                            {/* </div> */}

                                                            </StyledMenuItem>
                                                        ) : ''
                                                        }
                                                        </Scrollbars>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="company-details-button-one">
                                                <div className='menu-container'>
                                                        <div className='industry-container' onClick={showNumOfEmployeesDropdown}>
                                                            <div className='selected-item-container'>
                                                            <p htmlFor="industry" name="industry">{noOfEmployees? noOfEmployees :"No. of Emp."}</p>
                                                            </div>
                                                            <div className="industry-drp-dwn-img">
                                                            <img src={DrpDwnIcn}  />
                                                            </div>

                                                        </div>

                                                            <div className={`industry-dropdown-menu-container 
                                                                ${isNumOfEmployeesDropdown ? 'industry-open-dropdown' : 'close-dropdown'}`}
                                                            
                                                                ref={setWrapperRef}>
                                                                <Scrollbars className="custom-scroll">
                                                                {
                                                                numberOfEmployees ? numberOfEmployees.map((icon, index) =>
                                                                    <StyledMenuItem className="customized-ticket-source" onClick={() => numberOfEMPHandleClick(icon.noOfEmp)} onClose={handleClose}>
                                                                    <div className="create-ticket-one-industry d-flex">
                                                                        <div className="create-ticket-prio-img-text d-flex">
                                                                        
                                                                        <p value={icon.id}>{icon.noOfEmp}</p>
                                                                        </div>

                                                                        <div className="create-ticket-src-radio">
                                                                        <Radio
                                                                            checked={noOfEmployees === icon.noOfEmp}
                                                                            onChange={(e) => numberOfEMPHandleClick(icon.noOfEmp)}
                                                                            value=""
                                                                            name="radio-button-demo"
                                                                            color="primary"
                                                                            inputProps={{ 'aria-label': '' }}
                                                                        />
                                                                        </div>
                                                                    </div>

                                                                    </StyledMenuItem>
                                                                ) : ''
                                                                }
                                                                </Scrollbars>
                                                            </div>
                                                    </div>
                                                {/* <FormControl className={classes.formControl}>
                                                    <NativeSelect
                                                        value={state.noOfEmployees}
                                                        onChange={handleChange('noOfEmployees')}
                                                        name="noOfEmployees"
                                                        required
                                                        className={classes.selectEmpty}
                                                        inputProps={{ 'aria-label': 'age' }}
                                                    >
                                                        <option value="">No of emp *</option>
                                                        <option value={5}>1-5 people </option>
                                                        <option value={20}>6-20 people</option>
                                                        <option value={50}>21-50 people</option>
                                                        <option value={100}>51-100 people</option>
                                                    </NativeSelect>
                                                </FormControl> */}
                                                {/* <FormControl>
                                                    <Select
                                                        labelId="demo-mutiple-checkbox-label"
                                                        value={state.noOfEmployees}
                                                        onChange={handleChange('noOfEmployees')}
                                                        input={<Input />}
                                                        name="noOfEmployees"
                                                        MenuProps={MenuProps}
                                                        placeholder="No of Emp"
                                                        required
                                                    >

                                                        <MenuItem value="5">
                                                            <div>
                                                                <p style={{
                                                                    display: 'flex', alignItems: 'center',
                                                                    justifyContent: 'center', padding: '7px', width: '100%'
                                                                }}
                                                                >1-5 people</p>
                                                                <Radio
                                                                    checked={state.noOfEmployees === "5"} value="5" name="noOfEmployees"
                                                                    onChange={handleChangeRadio("noOfEmployees")}
                                                                />
                                                            </div>
                                                        </MenuItem>
                                                        <MenuItem value="20">
                                                            <div>
                                                                <p style={{
                                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                    padding: '7px', width: '100%'
                                                                }}
                                                                >6-20 people</p>
                                                                <Radio
                                                                    checked={state.noOfEmployees === "20"} value="20" name="noOfEmployees"
                                                                    onChange={handleChangeRadio("noOfEmployees")}
                                                                />
                                                            </div>
                                                        </MenuItem>
                                                        <MenuItem value="50">
                                                            <div>
                                                                <p style={{
                                                                    display: 'flex', alignItems: 'center',
                                                                    justifyContent: 'center', padding: '7px', width: '100%'
                                                                }}
                                                                >21-50 people</p>
                                                                <Radio
                                                                    checked={state.noOfEmployees === "50"} value="50" name="noOfEmployees"
                                                                    onChange={handleChangeRadio("noOfEmployees")}
                                                                />
                                                            </div>
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl> */}
                                            </div>
                                        </div>


                                        <div className="reg-company-field-three">
                                            <div className="choose-your-domain">
                                                <p>Choose your domain</p>
                                                <img src={loginButtonArrow} className="choose-your-domain-img"></img>
                                            </div>
                                            <TextField
                                                id="outlined-basic"
                                                label="Your Domain"
                                                className='on-boarding-input-field registration-input'
                                                margin="normal"
                                                variant="outlined"
                                                required
                                                error={
                                                    domain ? domain.length == 1
                                                        ? 'error-while-login' : null : null
                                                }
                                                name="domain"
                                                onChange={handleChangeDomain()}
                                                value={domain}
                                            />

                                            <Button variant="outlined" color="primary" className="">
                                                .xms.com
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="registration-company-details-field-four-section">
                                        <div className="registration-ur-cmpny-button-filed d-flex justify-space-between">
                                            <div className="button-three-company">
                                                <Button variant="outlined" color="primary" onClick={handleBack}>
                                                    <span><img src={RegistrationButtonArrowBackIcon}></img></span> Prev
                                                </Button>
                                            </div>

                                            <div className="button-five-company">
                                                <Button variant="outlined" color="primary"
                                                    onClick={handleNext}
                                                disabled={
                                                    companyName!= null ? companyName.length <= 0 ||
                                                    industry === '' || noOfEmployees === '' ||
                                                    domain.length <= 0 : false
                                                }
                                                >
                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'} &nbsp;&nbsp;&nbsp;
                                                    <span><img src={RegistrationButtonRight1Icon}></img></span>
                                                </Button>
                                                <div className="ur-cmpny-button-filed-click-section">
                                                    <p>Click here to continue</p>
                                                    <img src={loginButtonArrow}></img>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                {/* </div> */}






                                {/* <footer className="registration-company-footer-container d-flex">
                                    <div className="registration-company-left-container">
                                        <p>Made with <span><img src={HeartIcon}></img></span> in Chicago</p>
                                    </div>
                                    <div className="registration-company-right-container justify-flex-end">
                                        <ul className="company-list">
                                            <nav><Link to="/privacy"><li>Privacy Policy</li></Link></nav>
                                            <nav><Link to="/termsOfUse"><li>Term of use</li></Link></nav>
                                            <nav><Link to="/help"><li>Helps</li></Link></nav>
                                        </ul>
                                    </div>
                                </footer> */}
                            </div>

                        )}

                        {activeStep === 2 && (

                            <div className="user-details-step">

                                <div className="user-container">
                                    {state.status == 'danger' ? <h1 style={divStyle}>{state.response}</h1>
                                        : <h1 style={divStyleone}>{state.response}</h1>}



                                    <div className="reg-user-dtls-fields">
                                        <div className="user-first-last-name">
                                            <TextField
                                                id="outlined-basic"
                                                label="First Name"
                                                margin="normal"
                                                variant="outlined"
                                                required
                                                error={
                                                    firstName == 1
                                                        ? 'error-while-login' : null
                                                }
                                                name="firstName"
                                                onChange={handleChangeFirstName}
                                                value={firstName}
                                                className="on-boarding-input-field first-last-name-field"
                                            />
                                            <TextField
                                                id="outlined-basic"
                                                label="Last Name"
                                                margin="normal"
                                                variant="outlined"
                                                required
                                                error={
                                                    lastName == 1
                                                        ? 'error-while-login' : null
                                                }
                                                name="lastName"
                                                onChange={handleChangeLastname}
                                                value={lastName}
                                                className="on-boarding-input-field first-last-name-field"
                                            />
                                        </div>
                                    </div>

                                    <div className="user-input-field-three">
                                        <div className="userBirthdayCalenderDropdown">
                                            <div className='menu-container'>
                                                <div className='dateAndIconConainer' onClick={()=> showUserDobDropDown(!isShowUserDobDropDown)}>
                                                    <div className='selected-item-container'>
                                                        <p htmlFor="industry" name="industry">{userDOB ? moment(userDOB).format('MM/DD/YYYY') : "Birthday"}</p>
                                                    </div>
                                                    <div className='iconAndDatePickerWrapper icon-and-date-picker-wrapper'>
                                                        <img className='user-birthday-icon' src={calenderIcon} alt='calende-icon'/>
                                                    </div>
                                                </div>
                                                <div className={`userDOBDropDown ${isShowUserDobDropDown ? 'dobOpenDropDown' : 'dobCloseDropdown'}`}
                                                    ref={setWrapperRef}> {
                                                        <DatePicker selected={userDOB} onChange={date => { setDateOfBirth(date); showUserDobDropDown(false)} } inline />
                                                    }
                                                </div>
                                            </div>
                                        </div>                                    
                                    </div>

                                    <div className="user-input-field-four">
                                        <div className="user-phone-number-input-field">
                                            <TextField
                                                id="outlined-basic"
                                                label="Phone number"
                                                margin="normal"
                                                variant="outlined"
                                                required
                                                type="number"
                                                // error={
                                                //     state.phoneNumber.toString().length == 9
                                                //         ? 'error-while-login' : null
                                                // }
                                                name="phoneNumber"
                                                onChange={handleChangePhoneNumber}
                                                value={phoneNumber}
                                                className="on-boarding-input-field"
                                            />
                                            {
                                                isInValidPhoneNo ?
                                                    <p className='error-phone-popup'>Phone number is invalid, please add valid phone number.</p> : null
                                            }
                                        </div>

                                    </div>

                                    <div className="registration-your-details-field-four-section">
                                        <div className="registration-ur-details-button-filed d-flex justify-space-between">
                                            <div className="button-three-company">
                                                <Button variant="outlined" color="primary"  onClick={handleBack}>
                                                    <span><img src={RegistrationButtonArrowBackIcon}></img></span> Prev
                                                </Button>
                                            </div>

                                            <div className="button-five-company">
                                                <Button variant="outlined" color="primary" 
                                                    onClick={submitHandler}
                                                disabled={
                                                    firstName == '' ||
                                                    lastName == '' ||
                                                    phoneNumber == '' || isInValidPhoneNo === true
                                                }
                                                >
                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                
                                                    <div className="click-here-login-arrow-container">
                                                        <p className="Click-here-to-Login">Click here to continue</p>
                                                        <img src={loginButtonArrow}></img>
                                                    </div>                                                    
                                                </Button>

                                            </div>
                                        </div>
                                        <div className="recaptchasection" >
                                                <Recaptcha
            sitekey="6LeqmccUAAAAAPKAM0DCqTiv5_iHBpnA8UeeyELa"
            render="explicit"
            onloadCallback={recaptchaLoaded}
            verifyCallback={verifyCallback}
          />
                                            </div>
                                    </div>
                                </div>
                                {/* <footer className="registration-user-footer-container d-flex">
                                    <div className="registration-user-left-container">
                                        <p>Made with <span><img src={HeartIcon}></img></span> in Chicago</p>
                                    </div>
                                    <div className="registration-user-right-container justify-flex-end">
                                        <ul className="user-list">
                                            <nav><Link to="/privacy"><li>Privacy Policy</li></Link></nav>
                                            <nav><Link to="/termsOfUse"><li>Term of use</li></Link></nav>
                                            <nav><Link to="/help"><li>Helps</li></Link></nav>
                                        </ul>
                                    </div>
                                </footer> */}
                            </div>
                        )}


                        {activeStep === 3 && (
                            <div className="congratulations-page">
                                <div className="congratulations-container">
                                    <div className="congratulation-header-field">
                                        <p className="congratulation-mainheading">CONGRATULATIONS</p>
                                        <p className="congratulation-subheading">Domain created successfully</p>
                                    </div>

                                    <div className="congratulation-field-two">

                                        <div className="congratulation-design-field">
                                            <InputBase
                                                type="text"
                                                placeholder="http://design7311.xms.com "
                                                className="registration-input"
                                                inputProps={{ 'aria-label': 'search' }}
                                                value={state.domain}
                                                disabled
                                            />
                                            <img className='Congratulation-input-tag' src={Congratulationinpttag}></img>

                                            <div className="click-here-login-arrow-container">
                                                <p className="Click-here-to-Login">Click here to bookmark the page</p>
                                                <img src={loginButtonArrow}></img>
                                            </div>
                                        </div>


                                        {/* <Button variant="outlined" color="primary" className="">
                                            <p className="field2"> http://design7311.xms.com   <img src={BookmarkImage}></img> </p>
                                                
                                        </Button> */}
                                    </div>

                                    <div className="congratulation-text-field-three">
                                        <p className="cngrlts-txt">This is where you will access your new account.<br />
                                            MAke sure to bookmark it once you are inside</p>
                                    </div>

                                    <div className="congratulation-field-four">
                                        <Button variant="outlined" color="primary" className="">
                                            Start 15 days free trail
                                            <img className="trail-icon" src={CongratulationRgtArw}></img>
                                        </Button>
                                    </div>

                                    <div className="congratulation-field-five">
                                        <p className="cngrts-sbcrtn-txt">Choose subscription <img src={CngrtltnFwdIcon} /></p>
                                    </div>


                                </div>
                            </div>
                        )}
                </div>
            </div>
            <OnBoardingFooter />
        </div>
    );
}
