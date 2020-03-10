// import React from 'react';
// import 'date-fns';
// import { makeStyles } from '@material-ui/core/styles';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import './RegistrationUsingStepper.scss';
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
// import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';


// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//   },
//   backButton: {
//     marginRight: theme.spacing(1),
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
// }));

// function getSteps() {
//   return ['Account', 'Company', 'Personal'];
// }



// export default function RegistrationUsingSetter() {
//   const classes = useStyles();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const steps = getSteps();
  



//   const [state, setState] = React.useState({
//     age: '',
//     name: 'hai',
//   });

//   const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));


//   const inputLabel = React.useRef(null);
//   const [labelWidth, setLabelWidth] = React.useState(0);

//   const handleChange = name => event => {
//     setState({
//       ...state,
//       [name]: event.target.value,
//     });
//   };

//   const handleDateChange = date => {
//     setSelectedDate(date);
//   };
  
//   const handleNext = () => {
//     setActiveStep(prevActiveStep => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep(prevActiveStep => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   return (
//     <div className={classes.root}>
//     <div className="registration-page">
//         <div className="registration-header-logo">
//                     <AppBar position="static">
//                         <Toolbar variant="dense">
//                             <img src={RegistrationLogo} className="registration-logo"></img>
//                             <img src={RegistrationLogoBar}></img>
//                         </Toolbar>
//                     </AppBar>
//                 </div>
//         </div>
//       <Stepper activeStep={activeStep} alternativeLabel>

//         <Step>
//             <StepLabel>Company</StepLabel>
//           </Step>
        
//         <Step>
//         <StepLabel>User</StepLabel>
//           </Step>
//           <Step>
//             <StepLabel>Completed</StepLabel>
//         </Step>
//         </Stepper>
      
//       <div className="row">
//           <div className="col-md-12">
//           {activeStep === 0 && (

// <div className="registration-page">       
                    

// <div className="registration-container">

//     <div className="registration-container-text">
//         <p className="registration-container-text-one">LET'S GET STARTED</p>
//         <p className="registration-container-text-two">Register with tour work address</p>
//     </div>

//     <div className="registration-fields">
//         <div className="registration-field-one">
//             <InputBase
//                 placeholder="Work Email"
//                 className="registration-input"
//                 inputProps={{ 'aria-label': 'search' }}
//             />
//         </div>
//         <div className="registration-field-two">
//             <InputBase
//                 placeholder="Password"
//                 className="registration-input"
//                 inputProps={{ 'aria-label': 'search' }}
//             />
//         </div>
//         <div className="registration-button">
//             <Button variant="outlined" color="primary" className="" onClick={handleNext}>
//                 {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//             </Button>


//             <span><img src={RegistrationButtonArrow}></img></span>
//             <p>Click here to continue</p>
//         </div>
//     </div>
//     <div className="break">
//         <div className="registration-bottom-line"></div>OR<div className="registration-bottom-line"></div>
//     </div>
//     <div className="registration-with-google">
//         <Button variant="outlined" color="primary" className="google-button">
//             <span><img src={RegistrationGoogleImage}></img></span><span><p>Login with Google</p></span>
//         </Button>
//     </div>
//     <div className="registration-bottom-text">
//         <p>Already have an account? <span>Sign in</span></p>
//     </div>
    
// </div>
// </div>

//                   )}

// {activeStep === 1 && (

//     <div className="registration-company-details-page">
                                                  
                                                            

//     <div className="registration-company-details-container">
            
//             <div className="registration-company-details-container-text">
//                 <p className="registration-company-details-container-text-one">YOUR COMPANY</p>
//                 <p className="registration-company-details-container-text-two">Tell us about your company</p>
//             </div>
            
//             <div className="registration-company-details-fields">
//                 <div className="registration-company-details-field-one">
//                 <InputBase
//                     placeholder="Company Name"
//                     className="registration-input"
//                     inputProps={{ 'aria-label': 'search' }}
//                     />
//                 </div>

//                 <div className="registration-company-details-field-two">
//                     <div className="company-details-button-one">

//                     <FormControl className={classes.formControl}>
//                         <NativeSelect
//                         value={state.age}
//                         onChange={handleChange('age')}
//                         name="age"
//                         className={classes.selectEmpty}
//                         inputProps={{ 'aria-label': 'age' }}
//                         >
//                         <option value="">None</option>
//                         <option value={10}>Ten</option>
//                         <option value={20}>Twenty</option>
//                         <option value={30}>Thirty</option>
//                         </NativeSelect>
//                     </FormControl>

                    
//                         {/* <Button variant="outlined" color="primary" className="button-one">
//                             Select Industry<span><img src={RegistrationButtonSelectIcon}></img></span>
//                         </Button> */}
//                     </div>

//                     <div className="company-details-button-one">
//                         {/* <Button variant="outlined" color="primary" className="">
//                             No. Of emp.<span><img src={RegistrationButtonOptionIcon}></img></span>
//                         </Button> */}

//                             <FormControl className={classes.formControl}>
//                                 <NativeSelect
//                                 value={state.age}
//                                 onChange={handleChange('age')}
//                                 name="age"
//                                 className={classes.selectEmpty}
//                                 inputProps={{ 'aria-label': 'age' }}
//                                 >
//                                 <option value="">No of emp</option>
//                                 <option value={10}>1</option>
//                                 <option value={20}>2</option>
//                                 <option value={30}>3</option>
//                                 </NativeSelect>
//                             </FormControl>
//                     </div>
//                 </div>


//     <div className="registration-company-field-three">
//     <p>Choose your domain</p>
//             <span><img src={RegistrationLeftTopArrow}></img></span>
            
    
//                 <InputBase
//                     type="text"
//                     placeholder="Your Domain"
//                     className="registration-input"
//                     inputProps={{ 'aria-label': 'search' }}
//                 />

//                 <Button variant="outlined" color="primary" className="">
//                     .xms.com
//                 </Button>
//     </div>



            
//             </div>


//             <div className="registration-company-details-field-four">
//                     <div className="button-three">
//                         <Button variant="outlined" color="primary" className="button-one" onClick={handleBack}>
//                         <span><img src={RegistrationButtonArrowBackIcon}></img></span> Prev
//                         </Button>
//                     </div>

//                     <div className="button-five">
//                         <Button variant="outlined" color="primary" className="button-two" onClick={handleNext}>
//                                 {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                         </Button>
//                         <span><img src={RegistrationButtonArrow}></img></span>
//                         <p>Click here to continue</p>
//                     </div>
                
//                 </div> 

// </div>
// </div>

//                   )}

//                                 {activeStep === 2 && (

//                                 <div className="user-page">                         

//                                             <div className="user-container">
                                                    
//                                                     <div className="user-container-text-field">
//                                                         <p className="user-container-text-one">YOUR DETAILS</p>
//                                                         <p className="user-container-text-two">Tell us about yourself</p>
//                                                     </div>


//                                                     <div className="user-field-one">
//                                                             <div className="user-button-one">
                                                                
//                                                                 <InputBase
//                                                                     type="text"
//                                                                     placeholder="First Name"
//                                                                     className="registration-input"
//                                                                     inputProps={{ 'aria-label': 'search' }}
//                                                                 />

//                                                                 <InputBase
//                                                                     type="text"
//                                                                     placeholder="Last Name"
//                                                                     className="registration-input"
//                                                                     inputProps={{ 'aria-label': 'search' }}
//                                                                 />
//                                                             </div>
//                                                     </div> 

//                                                     <div className="user-input-field-three">
//                                                         <div className="user-birthday-input-field">
//                                                                 {/* <InputBase
//                                                                     type="text"
//                                                                     placeholder="Birthday"
//                                                                     className="registration-input"
//                                                                     inputProps={{ 'aria-label': 'search' }}
//                                                                 /> */}

//                                                             <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                                                                 <Grid container justify="space-around">
//                                                                     <KeyboardDatePicker
//                                                                     disableToolbar
//                                                                     variant="inline"
//                                                                     format="MM/dd/yyyy"
//                                                                     margin="normal"
//                                                                     id="date-picker-inline"
//                                                                     label="Birthday"
//                                                                     value={selectedDate}
//                                                                     onChange={handleDateChange}
//                                                                     KeyboardButtonProps={{
//                                                                         'aria-label': 'change date',
//                                                                     }}
//                                                                     />
                                                                                                                                       
//                                                                 </Grid>
//                                                                 </MuiPickersUtilsProvider>
//                                                         </div>
                                                                
                                                        
//                                                     </div>

//                                                     <div className="user-input-field-four">
//                                                        <div className="user-phone-number-input-field">
//                                                                 <InputBase
//                                                                     type="text"
//                                                                     placeholder="Phone Number"
//                                                                     className="registration-input"
//                                                                     inputProps={{ 'aria-label': 'search' }}
//                                                                 />
//                                                        </div>
                                                                
//                                                     </div>


//                                                         <div className="user-field-five">
//                                                             <div className="button-three">
//                                                                 <Button variant="outlined" color="primary" className="button-one" onClick={handleBack}>
//                                                                 <span><img src={RegistrationButtonArrowBackIcon}></img></span> Prev
//                                                                 </Button>
//                                                             </div>

//                                                             <div className="button-five">
//                                                                 <Button variant="outlined" color="primary" className="button-two" onClick={handleNext}>
//                                                                 Next 
//                                                                 {/* <span><img src={RegistrationButtonRight1Icon}></img></span> */}
//                                                                 {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                                                                 </Button>
//                                                                 <span><img src={RegistrationButtonArrow}></img></span>
//                                                                 <p>Click here to continue</p>
//                                                             </div>
                                                            
//                                                         </div> 
                                                
                                                        
                                        
//                                         </div>

//                                         </div>
//               )}


// {activeStep === 3 && (

// <div className="congratulations-page">                         

//             <div className="congratulations-container">
                    
//                 <div className="congratulation-header-field">
//                     <p className="congratulation-text-one">CONGRATULATIONS</p>
//                     <p className="congratulation-text-two">Domain created successfully</p>
//                 </div>
//                 <div className="congratulation-field-two">
//                     <div className="congratulation-design-field">
//                         <InputBase
//                             type="text"
//                             placeholder="http://design7311.xms.com "
//                             className="registration-input"
//                             inputProps={{ 'aria-label': 'search' }}
//                         />
//                         <span><img src={RegistrationButtonArrow}></img></span>
//                         <p className="ptext">Click here to bookmark the page</p>
//                     </div>
                    

//                     {/* <Button variant="outlined" color="primary" className="">
//                         <p className="field2"> http://design7311.xms.com   <img src={BookmarkImage}></img> </p>
                                                
//                     </Button> */}
                        
//                 </div>

//                 <div className="congratulation-text-field-three">
//                     <p>This is where you will access your new account.<br/>
//                     MAke sure to bookmark it once you are inside</p>
//                 </div>

//                 <div className="congratulation-field-four">
//                     <Button variant="outlined" color="primary" className="">
//                         Start 15 days free trail    
//                         <img src={RegistrationButtonIcon}></img>
//                     </Button>
//                 </div>

//                 <div className="congratulation-field-five">
//                     <p>Choose subscription <img src={ArrowForwardImage}/></p>
//                 </div>


                   

                                
                   
                                
                    


                        

                            
                       
                
                        
        
//         </div>

//         </div>
// )}
//           </div>
    
//       </div>
 
            
      
      
//                             <footer class="registration-footer-container">
//                                 <div className="registration-left-container">
//                                     <p>Made with <span><img src={HeartIcon}></img></span> in Chicago</p>
//                                 </div>
//                                 <div className="registration-right-container">
//                                     <ul className="list">
//                                         <li>Privacy Policy</li>
//                                         <li>Team of logo</li>
//                                         <li>Helps</li>
//                                     </ul>
//                                 </div>
//                             </footer>
//     </div>
//   );
// }
