// import React, { useState } from 'react';
// import 'date-fns';
// import { makeStyles } from '@material-ui/core/styles';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import './RegistrationUsingStepper.scss';
// import "./Registration.scss";
// import "./RegistrationCompanyDetails.scss"
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import RegistrationLogo from "../../assets/images/logo.png";
// import RegistrationLogoBar from "../../assets/icons/LoginAndRegistration_icons/Icon-metro-menu.svg";
// import RegistrationButtonIcon from "../../assets/icons/LoginAndRegistration_icons/Iconfeather-chevron-right1.svg";
// import RegistrationProcessWire from "../../assets/icons/LoginAndRegistration_icons/Icon-simple-processwire.svg";
// import RegistrationLockIcon from "../../assets/icons/LoginAndRegistration_icons/Icon-material-lock-outline.svg";
// import RegistrationButtonArrow from "../../assets/icons/LoginAndRegistration_icons/share1.svg";
// import RegistrationGoogleImage from "../../assets/icons/LoginAndRegistration_icons/MaskGroup1.svg";
// import InputBase from '@material-ui/core/InputBase';
// import HeartIcon from "../../assets/icons/LoginAndRegistration_icons/Icon awesome-heart.svg";
// import RegistrationDetailsLogo from "../../assets/images/logo.png";
// import RegistrationDetailsLogoBar from "../../assets/icons/LoginAndRegistration_icons/Icon-metro-menu.svg"
// import RegistrationCheckIcon from "../../assets/icons/LoginAndRegistration_icons/Iconfeather-check.svg";
// import RegistrationProcessIcon from "../../assets/icons/LoginAndRegistration_icons/Icon-simple-processwire.svg";
// import RegistrationDetailsLockIcon from "../../assets/icons/LoginAndRegistration_icons/Icon-material-lock-outline.svg";
// import RegistrationButtonSelectIcon from "../../assets/icons/LoginAndRegistration_icons/Icon-ionic-md-arrow-dropdown.svg";
// import RegistrationButtonOptionIcon from "../../assets/icons/LoginAndRegistration_icons/Group-10440.svg";
// import RegistrationButtonArrowBackIcon from "../../assets/icons/LoginAndRegistration_icons/Icon feather-chevron-right.svg";
// import RegistrationButtonRight1Icon from '../../assets/icons/LoginAndRegistration_icons/Iconfeather-chevron-right1.svg';
// import RegistrationLeftTopArrow from "../../assets/icons/LoginAndRegistration_icons/share.svg";
// import Input from '@material-ui/core/Input';
// import BirthdayIcon from "../../assets/icons/SVG/Iconfeather-calendar.svg";
// import ArrowForwardImage from "../../assets/icons/LoginAndRegistration_icons/Icon ionic-md-arrow-forward.svg";
// import BookmarkImage from "../../assets/icons/LoginAndRegistration_icons/Icon feather-bookmark.svg";
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import FormControl from '@material-ui/core/FormControl';
// import NativeSelect from '@material-ui/core/NativeSelect';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import axios from "axios";
// import { baseUrl } from "../../constants";
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { Link } from 'react-router-dom';
// import TextField from '@material-ui/core/TextField';
// import validator from 'validator';
// import Radio from '@material-ui/core/Radio';
// import ApolloClient from "apollo-boost";
// import GoogleLogin from 'react-google-login';
// import { ApolloProvider, useQuery, useMutation } from "@apollo/react-hooks";

// const cache = new InMemoryCache();

// const client = new ApolloClient({
//     cache,
//     uri: baseUrl.server,
// });

// const useStyles = makeStyles(theme => ({
//     root: {
//         width: '100%',
//     },
//     backButton: {
//         marginRight: theme.spacing(1),
//     },
//     instructions: {
//         marginTop: theme.spacing(1),
//         marginBottom: theme.spacing(1),
//     },
// }));

// function getSteps() {
//     return ['Account', 'Company', 'Personal'];
// }


// // const ADD_USER = gql`
// // mutation addUser($emailIs:String!,$password: String!,$companyName:String,$industry:String,$firstName:String,$lastName:String,$domain:String,$phoneNumber:String,$birthday:String,$noOfEmployees:String) {
// //     createUser(emailIs:$emailIs,password: $password,companyName:$companyName,industry:$industry,firstName:$firstName,lastName:$lastName,domain:$domain,phoneNumber:$phoneNumber,birthday:$birthday,noOfEmployees:$noOfEmployees) {
// //       emailIs
// //   }
// // }
// // `;

// export default function RegistrationUsingSetter(props) {
//     const classes = useStyles();
//     const [activeStep, setActiveStep] = React.useState(0);
//     const steps = getSteps();
//     const [state, setState] = React.useState({
//         noOfEmployees: '',
//         emailIs: '',
//         password: '',
//         companyName: '',
//         industry: '',
//         firstName: '',
//         lastName: '',
//         domain: '',
//         phoneNumber: '',
//         birthday: '',
//         response: '',
//         status: '',
//     });
//     const [isInValidEmail, setIsInValidEmail] = React.useState(true);
//     const [isInValidPwd, setIsInValidPwd] = React.useState(true);
//     const [showPassword, setShowPassword] = React.useState({ showPassword: false });

//     const [birthday, setSelectedDate] = React.useState(new Date());
//     const [checkEmailApiData, setCheckEmailData] = React.useState();
//     const [userExist, setUserExist] = React.useState(false);
//     const { useEffect, useState } = React;
//     const inputLabel = React.useRef(null);
//     const [labelWidth, setLabelWidth] = React.useState(0);
//     const [user, setUser] = useState([]);
//      //alert(JSON.stringify(user));
//     useEffect(() => {
//         //alert(props.match.params.token);
//     //   fetc1h('127.0.0.1:8000/customers')
//     //     .then(response => response.json())
//     //     .then(data => {
//     //       setCustomers(data); // set customers in state
//     //     });
//     let requestBody = {
//         query: `
//         mutation GoogleUserVerify($token: String!){
//               googleUserVerification(token: $token) {
//                   id
//                   emailIs
//                   firstName
//                   lastName
//             }
//           }
//         `,
//         variables: {
//             token: props.match.params.token,
//             //token:"gzchchgacghhxhjcg",
//         }
//       };

//     fe1tch(baseUrl.server, {
//         method: 'POST',
//         body: JSON.stringify(requestBody),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(res => {
//             if (res.status !== 200 && res.status !== 201) {
//                 throw new Error('Failed!');
//             }
//             return res.json();
//         })
//         .then(resData => {
//             //console.log(resData);
//             setUser(resData.data.googleUserVerification);
//             // if (resData.data.userVerification==null && resData.errors[0].message=='Token doesnt found') {
//             //     this.setState({response:"Token is not Mapped with User",status:"danger"});
//             //     //window.location.href = '/';
//             // }else{
//             //     this.setState({response:"Your Account has been activated successfully",status:"success"});
//             //     window.location.href = '/';
//             // }
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }, []); 
//     const handleChange = name => event => {

//         if (event.target.name === 'emailIs') {
//             if (validator.isEmail(event.target.value)) {
//                 setIsInValidEmail({ isInValidEmail: false })
//                 setUserExist({ userExist: false })
//             }
//             else {
//                 setIsInValidEmail({ isInValidEmail: true })
//                 setUserExist({ userExist: false })
//             }
//         }

//         let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
//         // event.target.value[i].charCodeAt() >= 65 && event.target.value[i].charCodeAt() <= 90

//         if (event.target.name === "password") {
//             if (event.target.value.length < 8)
//                 setIsInValidPwd({ isInValidPwd: true })
//             else {
//                 for (let i = 0; i < event.target.value.length; i++) {
//                     if (strongRegex.test(event.target.value)) {
//                         setIsInValidPwd({ isInValidPwd: false });
//                         break;
//                     } else setIsInValidPwd({ isInValidPwd: true })
//                 }
//             }
//         }
//         setState({
//             ...state,
//             [name]: event.target.value,
//         });
//     };
//     const showPasswordData = event => {
//         if (showPassword.showPassword == false) {
//             setShowPassword({ ...showPassword, "showPassword": true });
//         } else {
//             setShowPassword({ ...showPassword, "showPassword": false });
//         }
//     }

//     const submitHandler = async (e) => {
//         let requestBody = {
//             query: `
//          mutation addUser($emailIs:String!,$password: String!,$companyName:String,$industry:String,$firstName:String,$lastName:String,$domain:String,$phoneNumber:String,$birthday:String,$noOfEmployees:String) {
//           googleSignUpCompletion(emailIs:$emailIs,password: $password,companyName:$companyName,industry:$industry,firstName:$firstName,lastName:$lastName,domain:$domain,phoneNumber:$phoneNumber,birthday:$birthday,noOfEmployees:$noOfEmployees) {
//             emailIs
//             }
//           }
//         `,
//             variables: {
//                 emailIs: user.emailIs, password: state.password, companyName: state.companyName, noOfEmployees: state.noOfEmployees, industry: state.industry, domain: state.domain, firstName: user.firstName, lastName: user.lastName, birthday: state.birthday, phoneNumber: state.phoneNumber
//             }
//         };
//         let resData = await axios({
//             method: 'post',
//             url: baseUrl.server,
//             data: requestBody,
//         }).then(res => {
//             return res
//         }).catch(err => {
//             return err;
//         });
//         // if (resData.data.googleSignUpCompletion == null && resData.data.errors[0].message == 'User exists already.') {
//         //     //alert("User Already Exists");
//         //     setState({ response: "User Already Exists.", status: "danger" });
//         //     //window.location.href = '/registration';
//         // } else {
//         //     //alert("Registered Successfully");
//         //     setState({ response: "Registered Successfully", status: "success" });
//         //     window.location.href = '/';
//         // }
//     }
//     const handleDateChange = date => {
//         setSelectedDate(date);
//     };


//     const handleNextValidate = async () => {

//         let requestBody = {
//             query: `
//          mutation ValidateUserEmail($emailIs:String!,$password: String!) {
//             validateUserEmail(emailIs:$emailIs,password: $password) {
//                 emailIs
//             }
//           }
//         `,
//             variables: {
//                 emailIs: state.emailIs, password: state.password,
//             }
//         };
//         let resData = await axios({
//             method: 'post',
//             url: baseUrl.server,
//             data: requestBody,
//         }).then(res => {
//             return res
//         }).catch(err => {
//             return err;
//         });
//         if (resData.data.data.validateUserEmail == null && resData.data.errors && resData.data.errors[0].message == 'User already exists') {
//             setUserExist({ userExist: true });
//         } else {
//             setActiveStep(prevActiveStep => prevActiveStep + 1);
//         }
//         // setActiveStep(prevActiveStep => prevActiveStep + 1);
//     }
//     console.log("USER EXIST", userExist.userExist);
//     const handleNext = () => {
//         setActiveStep(prevActiveStep => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep(prevActiveStep => prevActiveStep - 1);
//     };

//     const handleReset = () => {
//         setActiveStep(0);
//     };
//     const divStyle = {
//         color: 'red',

//     };
//     const divStyleone = {
//         color: 'green',
//     };
//     const responseGoogle = (response) => {
//          //console.log(response);
//          console.log(response.profileObj);
//          console.log(response.profileObj.email);
        
//         let requestBody = {
//             // query: `
//             // mutation {
//             //     googleSignup(emailIs: "${emailIs}") {
//             //         emailIs
//             //     }
//             //   }
//             // `
//             query: `
//             mutation GoogleSignup($emailIs:String!,$firstName:String!,$lastName:String!) {
//                 googleSignup(emailIs:$emailIs,firstName:$firstName,lastName:$lastName) {
//                    emailIs
//                }
//              }
//            `,
//                variables: {
//                    emailIs: response.profileObj.email,
//                    firstName: response.profileObj.familyName,
//                    lastName: response.profileObj.givenName,
//                }
//         };
     
//         fet1ch(baseUrl.server, {
//             method: 'POST',
//             body: JSON.stringify(requestBody),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(res => {
//                 if (res.status !== 200 && res.status !== 201) {
//                     throw new Error('Failed!');
//                 }
//                 return res.json();
//             })
//             .then(resData => {
//                // alert(JSON.stringify(resData))
//                 // if (resData.data.googleLogin == null && resData.errors[0].message == 'User doesnt exists!') {
//                 //     this.setState({ response: "User Doesn't Exists", status: "danger" });
//                 //     alert("User Doesn't Exists");
//                 //     //window.location.href = '/';
//                 // } else {
//                 //     this.setState({ response: "Logged in successfully", status: "success" });
//                 //     localStorage.setItem('jwtToken', resData.data.googleLogin.token);
//                 //     localStorage.setItem('id', resData.data.googleLogin.id);
//                 //     window.location.href = '/ticketlisting';
//                 // }
//             })
//             .catch(err => {
//                 return err
//             });
//         //   
//     }
//     const failGoogle = (response) => {
//         console.log(response);
//     }
//     return (
//         <div className="registration-overall-body">
//             <div className={classes.root}>
//                 <div className="registration-page">
//                     <div className="registration-header-logo">
//                         <AppBar position="static">
//                             <Toolbar variant="dense">
//                                 <img src={RegistrationLogo} className="registration-logo"></img>
//                                 <img src={RegistrationLogoBar}></img>
//                             </Toolbar>
//                         </AppBar>
//                     </div>
//                 </div>
//                 <Stepper activeStep={activeStep} alternativeLabel>
//                     <Step className="stepper-icons" src={RegistrationLogo}>
//                         <StepLabel >Account</StepLabel>
//                     </Step>

//                     <Step>
//                         <StepLabel>Company</StepLabel>
//                     </Step>
//                     <Step>
//                         <StepLabel>Personal</StepLabel>
//                     </Step>
//                 </Stepper>

//                 <div className="row">

//                     <div className="col-md-12">
//                         {activeStep === 0 && (

//                             <div className="registration-page">
//                                 <div className="registration-container">
//                                     <div className="registration-container-text">
//                                         <p className="registration-container-text-one">
//                                             LET'S GET STARTED
//                                         </p>
//                                         <p className="registration-container-text-two">
//                                             Register with your work address
//                                         </p>
//                                     </div>
//                                     <div className="registration-fields">
//                                         <div className="registration-field-one">
//                                             {/* <InputBase
//                                                 placeholder="Work Email"
//                                                 className="registration-input"
//                                                 name="email"
//                                                 value={state.emailIs}
//                                                 onChange={handleChange('emailIs')}
//                                                 inputProps={{ 'aria-label': 'search' }}
//                                             /> */}

//                                             <TextField
//                                                 id="outlined-basic"
//                                                 label="Email"
//                                                 margin="normal"
//                                                 variant="outlined"
//                                                 required
//                                                 error={
//                                                     (state.emailIs.length > 0 && isInValidEmail.isInValidEmail)
//                                                         || userExist.userExist
//                                                         ? 'error-while-login' : null
//                                                 }
//                                                 name="emailIs"
//                                                 onChange={handleChange('emailIs')}
//                                                 value={user.emailIs}
//                                             />

//                                             {/* {
//                                                 state.emailIs.length > 0 && isInValidEmail ?
//                                                     <i class="fa fa-exclamation-circle" aria-hidden="true"></i> : null
//                                             } */}
//                                             {
//                                                 state.emailIs.length > 0 && isInValidEmail.isInValidEmail ?
//                                                     <p className='error-email-popup'>Please enter a valid email address.</p> : null
//                                             }

//                                             {
//                                                 userExist.userExist ?
//                                                     <p className='error-email-popup'>User already exists. Please try with other email.</p> : null
//                                             }
//                                         </div>
//                                         <div className="registration-field-three">
//                                             {/* <InputBase
//                                                 placeholder="Password"
//                                                 className="registration-input"
//                                                 name="password"
//                                                 type="password"
//                                                 value={state.password}
//                                                 onChange={handleChange('password')}
//                                                 inputProps={{ 'aria-label': 'search' }}
//                                             /> */}
//                                             <TextField
//                                                 id="outlined-basic"
//                                                 label="Password"
//                                                 margin="normal"
//                                                 variant="outlined"
//                                                 required
//                                                 name="password"
//                                                 type="password"
//                                                 type={showPassword.showPassword ? "text" : "password"}
//                                                 value={state.password}
//                                                 onChange={handleChange('password')}
//                                             />

//                                             <i
//                                                 onClick={showPasswordData}
//                                                 className={showPassword.showPassword ? "fa fa-eye show-password-eye" : "fa fa-eye-slash show-password-eye"}
//                                             ></i>
//                                             {
//                                                 state.password.length > 0 && isInValidPwd.isInValidPwd ?
//                                                     <div className='error-password-popup'>
//                                                         Password must cotain at least
//                                                         8 characters, including
//                                                         UPPER/lowercase, number
//                                                         & special character.
//                                                 </div> : null
//                                             }
//                                         </div>

//                                         <div className="registration-button">
//                                             <Button variant="outlined" color="primary"
//                                                 className="" onClick={handleNextValidate}
//                                                 disabled={isInValidEmail.isInValidEmail || state.password.length <= 0 || userExist.userExist}
//                                             >
//                                                 {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                                                 &nbsp;&nbsp;<i className="fa fa-angle-right"></i>
//                                             </Button>
//                                             <span><img src={RegistrationButtonArrow}></img></span>
//                                             <p>Click here to continue</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <footer className="registration-Start-footer-container d-flex">
//                                     <div className="registration-start-left-container">
//                                         <p>Made with <span><img src={HeartIcon}></img></span> in Chicago</p>
//                                     </div>
//                                     <div className="registration-start-right-container d-flex justify-flex-end">
//                                         <ul className="start-list">
//                                             <nav><Link to="/privacy"><li>Privacy Policy</li></Link></nav>
//                                             <nav><Link to="/termsOfUse"><li>Terms of use</li></Link></nav>
//                                             <nav><Link to="help"><li>Helps</li></Link></nav>
//                                         </ul>
//                                     </div>
//                                 </footer>
//                             </div>

//                         )}

//                         {activeStep === 1 && (

//                             <div className="registration-company-details-page">
//                                 <div className="registration-company-details-container">
//                                     <div className="registration-company-details-container-text">
//                                         <p className="registration-company-details-container-text-one">YOUR COMPANY</p>
//                                         <p className="registration-company-details-container-text-two">Tell us about your company</p>
//                                     </div>

//                                     <div className="registration-company-details-fields">
//                                         <div className="registration-company-details-field-one">
//                                             {/* <InputBase
//                                                 placeholder="Company Name"
//                                                 className="registration-input"
//                                                 name="companyName"
//                                                 onChange={handleChange('companyName')}
//                                                 value={state.companyName}
//                                                 inputProps={{ 'aria-label': 'search' }}
//                                             /> */}
//                                             <TextField
//                                                 id="outlined-basic"
//                                                 label="Company name"
//                                                 margin="normal"
//                                                 variant="outlined"
//                                                 required
//                                                 error={
//                                                     state.companyName.length == 1
//                                                         ? 'error-while-login' : null
//                                                 }
//                                                 name="companyName"
//                                                 onChange={handleChange('companyName')}
//                                                 value={state.companyName}
//                                             />
//                                             {
//                                                 state.companyName.length == 1 ?
//                                                     <p className='error-company-popup'>
//                                                         Fields marked in red need to befilled in.
//                                                     </p> : null
//                                             }
//                                         </div>

//                                         <div className="registration-company-details-field-two">
//                                             <div className="company-details-button-one">

//                                                 <FormControl className={classes.formControl}>
//                                                     <NativeSelect
//                                                         value={state.industry}
//                                                         onChange={handleChange('industry')}
//                                                         name="industry"
//                                                         required
//                                                         className={classes.selectEmpty}
//                                                         inputProps={{ 'aria-label': 'age' }}
//                                                     >
//                                                         <option value="" className="select-industry">
//                                                             Select Industry *
//                                                         </option>
//                                                         <option value="software">Software</option>
//                                                         <option value="manufacturing">Manufacturing</option>
//                                                         <option value="finance">Finance</option>
//                                                         <option value="pharmaceutical">Pharmaceutical</option>
//                                                     </NativeSelect>
//                                                 </FormControl>
//                                             </div>

//                                             <div className="company-details-button-one">
//                                                 <FormControl className={classes.formControl}>
//                                                     <NativeSelect
//                                                         value={state.noOfEmployees}
//                                                         onChange={handleChange('noOfEmployees')}
//                                                         name="noOfEmployees"
//                                                         required
//                                                         className={classes.selectEmpty}
//                                                         inputProps={{ 'aria-label': 'age' }}
//                                                     >
//                                                         <option value="">No of emp *</option>
//                                                         <option value={5}>
//                                                             1-5 people
//                                                         </option>
//                                                         <option value={20}>6-20 people</option>
//                                                         <option value={50}>21-50 people</option>
//                                                         <option value={100}>51-100 people</option>
//                                                     </NativeSelect>
//                                                 </FormControl>
//                                             </div>
//                                         </div>


//                                         <div className="registration-company-field-three">
//                                             <div className="choose-your-domain">
//                                                 <p>Choose your domain</p>
//                                                 <img src={RegistrationLeftTopArrow} className="choose-your-domain-img"></img>
//                                             </div>
//                                             {/* <InputBase
//                                                 type="text"
//                                                 placeholder="Your Domain *"
//                                                 className="registration-input"
//                                                 value={state.domain}
//                                                 onChange={handleChange('domain')}
//                                                 name="domain"
//                                                 inputProps={{ 'aria-label': 'search' }}
//                                             /> */}
//                                             <TextField
//                                                 id="outlined-basic"
//                                                 label="Your Domain"
//                                                 margin="normal"
//                                                 variant="outlined"
//                                                 className="registration-input"
//                                                 required
//                                                 error={
//                                                     state.domain.length == 1
//                                                         ? 'error-while-login' : null
//                                                 }
//                                                 name="domain"
//                                                 onChange={handleChange('domain')}
//                                                 value={state.domain}
//                                             />

//                                             <Button variant="outlined" color="primary" className="">
//                                                 .xms.com
//                                             </Button>
//                                         </div>
//                                     </div>
//                                     <div className="registration-company-details-field-four-section">
//                                         <div className="button-three-company">
//                                             <Button variant="outlined" color="primary" className="button-one" onClick={handleBack}>
//                                                 <span><img src={RegistrationButtonArrowBackIcon}></img></span> Prev
//                                             </Button>
//                                         </div>

//                                         <div className="button-five-company">
//                                             <Button variant="outlined" color="primary" className="button-two"
//                                                 onClick={handleNext}
//                                                 disabled={
//                                                     state.companyName.length <= 0 ||
//                                                     state.industry === '' || state.noOfEmployees === '' ||
//                                                     state.domain.length <= 0
//                                                 }
//                                             >
//                                                 {activeStep === steps.length - 1 ? 'Finish' : 'Next'} &nbsp;&nbsp;&nbsp;
//                                                 <span><img src={RegistrationButtonRight1Icon}></img></span>
//                                             </Button>
//                                         </div>
//                                         <span><img src={RegistrationButtonArrow}></img></span>
//                                         <p>Click here to continue</p>
//                                     </div>
//                                 </div>

//                                 <footer className="registration-company-footer-container d-flex">
//                                     <div className="registration-company-left-container">
//                                         <p>Made with <span><img src={HeartIcon}></img></span> in Chicago</p>
//                                     </div>
//                                     <div className="registration-company-right-container justify-flex-end">
//                                         <ul className="company-list">
//                                             <nav><Link to="/privacy"><li>Privacy Policy</li></Link></nav>
//                                             <nav><Link to="/termsOfUse"><li>Term of use</li></Link></nav>
//                                             <nav><Link to="/help"><li>Helps</li></Link></nav>
//                                         </ul>
//                                     </div>
//                                 </footer>
//                             </div>

//                         )}

//                         {activeStep === 2 && (

//                             <div className="user-page">

//                                 <div className="user-container">
//                                     {state.status == 'danger' ? <h1 style={divStyle}>{state.response}</h1>
//                                         : <h1 style={divStyleone}>{state.response}</h1>}
//                                     <div className="user-container-text-field">
//                                         <p className="user-container-text-one">YOUR DETAILS</p>
//                                         <p className="user-container-text-two">Tell us about yourself</p>
//                                     </div>


//                                     <div className="user-field-one">
//                                         <div className="user-button-one">

//                                             {/* <InputBase
//                                                 type="text"
//                                                 placeholder="First Name"
//                                                 name="firstName"
//                                                 onChange={handleChange('firstName')}
//                                                 value={state.firstName}
//                                                 className="registration-input"
//                                                 inputProps={{ 'aria-label': 'search' }}
//                                             /> 

//                                             <InputBase
//                                                 type="text"
//                                                 placeholder="Last Name"
//                                                 name="lastName"
//                                                 onChange={handleChange('lastName')}
//                                                 value={state.lastName}
//                                                 className="registration-input"
//                                                 inputProps={{ 'aria-label': 'search' }}
//                                             />
//                                             */}

//                                             <TextField
//                                                 id="outlined-basic"
//                                                 label="First Name"
//                                                 margin="normal"
//                                                 variant="outlined"
//                                                 required
//                                                 error={
//                                                     state.firstName == 1
//                                                         ? 'error-while-login' : null
//                                                 }
//                                                 name="firstName"
//                                                 onChange={handleChange('firstName')}
//                                                 value={user.firstName}
//                                                 className="registration-input"
//                                             />

//                                             <TextField
//                                                 id="outlined-basic"
//                                                 label="Last Name"
//                                                 margin="normal"
//                                                 variant="outlined"
//                                                 required
//                                                 error={
//                                                     state.lastName == 1
//                                                         ? 'error-while-login' : null
//                                                 }
//                                                 name="lastName"
//                                                 onChange={handleChange('lastName')}
//                                                 value={user.lastName}
//                                                 className="registration-input"
//                                             />

//                                         </div>
//                                     </div>

//                                     <div className="user-input-field-three">
//                                         <div className="user-birthday-input-field">
//                                             {/* <InputBase
//                                                 type="text"
//                                                 placeholder="Birthday"
//                                                 className="registration-input"
//                                                 inputProps={{ 'aria-label': 'search' }}
//                                             /> */}

//                                             <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                                                 <Grid container justify="space-around">
//                                                     {/* <KeyboardDatePicker
//                                                         required
//                                                         disableToolbar
//                                                         variant="inline"
//                                                         format="dd/MM/yyyy"
//                                                         margin="normal"
//                                                         id="date-picker-inline"
//                                                         label="Birthday"
//                                                         value={birthday}
//                                                         onChange={handleDateChange}
//                                                         KeyboardButtonProps={{
//                                                             'aria-label': 'change date',
//                                                         }}
//                                                     /> */}
//                                                     <KeyboardDatePicker
//                                                         margin="normal"
//                                                         id="date-picker-dialog"
//                                                         label="Birthday"
//                                                         format="dd/MM/yyyy"
//                                                         value={birthday}
//                                                         onChange={handleDateChange}
//                                                         KeyboardButtonProps={{
//                                                             'aria-label': 'change date',
//                                                         }}
//                                                     />

//                                                 </Grid>
//                                             </MuiPickersUtilsProvider>
//                                         </div>


//                                     </div>

//                                     <div className="user-input-field-four">
//                                         <div className="user-phone-number-input-field">
//                                             {/* <InputBase
//                                                 type="number"
//                                                 placeholder="Phone Number"
//                                                 value={state.phoneNumber}
//                                                 onChange={handleChange('phoneNumber')}
//                                                 name="phoneNumber"
//                                                 className="registration-input"
//                                                 max={12}
//                                                 inputProps={{ min: "0", max: "10", 'aria-label': 'search' }}
//                                             /> */}
//                                             <TextField
//                                                 id="outlined-basic"
//                                                 label="Phone number"
//                                                 margin="normal"
//                                                 variant="outlined"
//                                                 required
//                                                 type="number"
//                                                 // error={
//                                                 //     state.phoneNumber.toString().length == 9
//                                                 //         ? 'error-while-login' : null
//                                                 // }
//                                                 name="phoneNumber"
//                                                 onChange={handleChange('phoneNumber')}
//                                                 value={state.phoneNumber}
//                                                 className="registration-input"
//                                             />
//                                         </div>

//                                     </div>


//                                     {/* <div className="user-field-five">
//                                                             <div className="button-three">
//                                                                 <Button variant="outlined" color="primary" className="button-one" onClick={handleBack}>
//                                                                 <span><img src={RegistrationButtonArrowBackIcon}></img></span> Prev
//                                                                 </Button>
//                                                             </div>

//                                                             <div className="button-five">
//                                                                 <Button variant="outlined" color="primary" className="button-two" onClick={submitHandler}>
                                                                 
//                                                                 {activeStep === steps.length - 1 ? 'Next' : 'Next'}
//                                                                 </Button>
//                                                                 <span><img src={RegistrationButtonArrow}></img></span>
//                                                                 <p>Click here to continue</p>
//                                                             </div>
                                                            
//                                                         </div>  */}
//                                     <div className="registration-company-details-field-four-section">
//                                         <div className="button-three-company">
//                                             <Button variant="outlined" color="primary" className="button-one" onClick={handleBack}>
//                                                 <span><img src={RegistrationButtonArrowBackIcon}></img></span> Prev
//                                             </Button>
//                                         </div>

//                                         <div className="button-five-company">
//                                             <Button variant="outlined" color="primary" className="button-two"
//                                                 onClick={submitHandler}
//                                                 disabled={
                                                   
//                                                     state.birthday || state.phoneNumber == ''
//                                                 }
//                                             >
//                                                 {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                                                 <span><img src={RegistrationButtonRight1Icon}></img></span>
//                                             </Button>

//                                         </div>
//                                         <span><img src={RegistrationButtonArrow}></img></span>
//                                         <p>Click here to continue</p>
//                                     </div>
//                                 </div>
//                                 <footer className="registration-user-footer-container d-flex">
//                                     <div className="registration-user-left-container">
//                                         <p>Made with <span><img src={HeartIcon}></img></span> in Chicago</p>
//                                     </div>
//                                     <div className="registration-user-right-container justify-flex-end">
//                                         <ul className="user-list">
//                                             <nav><Link to="/privacy"><li>Privacy Policy</li></Link></nav>
//                                             <nav><Link to="/termsOfUse"><li>Term of use</li></Link></nav>
//                                             <nav><Link to="/help"><li>Helps</li></Link></nav>
//                                         </ul>
//                                     </div>
//                                 </footer>
//                             </div>
//                         )}


//                         {activeStep === 3 && (
//                             <div className="congratulations-page">
//                                 <div className="congratulations-container">
//                                     <div className="congratulation-header-field">
//                                         <p className="congratulation-text-one">CONGRATULATIONS</p>
//                                         <p className="congratulation-text-two">Domain created successfully</p>
//                                     </div>
//                                     <div className="congratulation-field-two">
//                                         <div className="congratulation-design-field">
//                                             <InputBase
//                                                 type="text"
//                                                 placeholder="http://design7311.xms.com "
//                                                 className="registration-input"
//                                                 inputProps={{ 'aria-label': 'search' }}
//                                             />
//                                             <span><img src={RegistrationButtonArrow}></img></span>
//                                             <p className="ptext">Click here to bookmark the page</p>
//                                         </div>
//                                         {/* <Button variant="outlined" color="primary" className="">
//                                             <p className="field2"> http://design7311.xms.com   <img src={BookmarkImage}></img> </p>
                                                
//                                         </Button> */}
//                                     </div>

//                                     <div className="congratulation-text-field-three">
//                                         <p>This is where you will access your new account.<br />
//                                             MAke sure to bookmark it once you are inside</p>
//                                     </div>

//                                     <div className="congratulation-field-four">
//                                         <Button variant="outlined" color="primary" className="">
//                                             Start 15 days free trail
//                                             <img src={RegistrationButtonIcon}></img>
//                                         </Button>
//                                     </div>

//                                     <div className="congratulation-field-five">
//                                         <p>Choose subscription <img src={ArrowForwardImage} /></p>
//                                     </div>


//                                 </div>
//                                 <footer className="registration-congratulations-footer-container d-flex">
//                                     <div className="registration-congratulations-left-container">
//                                         <p>Made with <span><img src={HeartIcon}></img></span> in Chicago</p>
//                                     </div>
//                                     <div className="registration-congratulations-right-container justify-flex-end">
//                                         <ul className="congratulations-list">
//                                             <nav><Link to="/privacy"><li>Privacy Policy</li></Link></nav>
//                                             <nav><Link to="/termsOfUse"></Link></nav><li>Term of use</li>
//                                             <nav><Link to="help"><li>Helps</li></Link></nav>
//                                         </ul>
//                                     </div>
//                                 </footer>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
