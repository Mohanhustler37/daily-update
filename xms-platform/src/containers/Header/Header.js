import React from "react";
import "./Header.scss";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import searchIcon from '../../assets/Sidenavbar-icons/Icon feather-search-small.svg'
import alertIcon from '../../assets/icons/SVG/Iconfeather-bell.svg'
import inActiveAddIcon from '../../assets/Sidenavbar-icons/Group 11408.svg'
import nineDotsIcon from '../../assets/Sidenavbar-icons/9dots.svg'
import profileImage from '../../assets/images/profile_menu_icon.png'
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
// import inactiveProfileIcon from '../../assets/icons/Logout/Icon-metro-profile.svg'
import inactiveProfileIcon from '../../assets/icons/SVG/profileactiveicon.svg'
import activeProfileIcon from '../../assets/icons/SVG/profileactiveicon.svg'
//import inactiveAccountIcn from '../../assets/icons/Logout/Icon-feather-settings.svg'
import inactiveAccountIcn from '../../assets/icons/SVG/settingactiveicon.svg'
import activeAccountIcn from '../../assets/icons/SVG/settingactiveicon.svg'
// import inactiveUpgradeIcn from '../../assets/icons/Logout/Icon-material-update.svg'
import inactiveUpgradeIcn from '../../assets/icons/SVG/upgradeactiveicon.svg'
import activeUpgradeIcn from '../../assets/icons/SVG/upgradeactiveicon.svg'
// import inactiveHelpIcn from '../../assets/icons/Logout/help-outline.svg'
import inactiveHelpIcn from '../../assets/icons/SVG/helpactiveicon.svg'
import activeHelpIcn from '../../assets/icons/SVG/helpactiveicon.svg'
import inactiveSignOutIcn from '../../assets/icons/Logout/open-account-logout.svg'
import activeSignOutIcn from '../../assets/icons/Logout/open-account-logout.svg'
import profileBorder from "../../assets/icons/Logout/profile-circle.svg";
import AllApps from "./AllApps";
import DrpDwnIcn from "../../assets/icons/SVG/Icon ionic-ios-arrow-down.svg";
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import { CirclePicker, TwitterPicker } from 'react-color';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const headerIcons = [
  { id: 1, icon: alertIcon, tooltip: "Notification" },
  { id: 2, icon: inActiveAddIcon, tooltip: "Create" },
  { id: 3, icon: nineDotsIcon, tooltip: "XMS Apps" }
];

const ticketType = [
  { id: 1, title: "company1" },
  { id: 2, title: "company2" },
  { id: 3, title: "company3" }
]
let wrapperRef;
function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.95em",
      width: "5em",
      height: "0.5em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent #ffffff transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.95em",
      width: "2em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${color} transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: -2,
      marginLeft: "-0.95em",
      height: "2em",
      width: "2em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent #ffffff transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.95em",
      height: "2em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${color}`
      }
    }
  };
}

const useStylesArrow = makeStyles(theme => ({
  tooltip: {
    position: "relative",
    fontSize: 10,
    borderRadius: 100,
    backgroundColor: "#ffffff",
    color: "#656565",
    boxShadow: "0 3px 12px 0 #d2d2d2",
    marginLeft: "0.1em",
    padding: "4px 12px 4px 12px",
    textAlign: "center"
  },
  arrow: {
    position: "absolute",
    fontSize: 6,
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid"
    }
  },
  popper: arrowGenerator(theme.palette.grey[700])
}));

export function ArrowTooltip(props) {
  const { arrow, ...classes } = useStylesArrow();
  const [arrowRef, setArrowRef] = React.useState(null);

  return (
    <Tooltip
      classes={classes}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef
            }
          }
        }
      }}
      {...props}
      title={
        <React.Fragment>
          {props.title}
          <span className={arrow} ref={setArrowRef} />
        </React.Fragment>
      }
    />
  );
}

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

class HeaderSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appName: "xcelpros",
      isShowLogOutPopUp: false,
      isHabitTypeDropdown:false,
      customeButtons: [
        {
          id: 0,
          inactiveIcon: inactiveProfileIcon,
          activeIcon: activeProfileIcon,
          title: "Profile"
        },
        {
          id: 1,
          inactiveIcon: inactiveAccountIcn,
          activeIcon: activeAccountIcn,
          title: "Account Settings"
        },
        {
          id: 2,
          inactiveIcon: inactiveUpgradeIcn,
          activeIcon: activeUpgradeIcn,
          title: "Upgrade plan"
        },
        {
          id: 3,
          inactiveIcon: inactiveHelpIcn,
          activeIcon: inactiveHelpIcn,
          title: "Help"
        },
        {
          id: 4,
          inactiveIcon: inactiveSignOutIcn,
          activeIcon: activeSignOutIcn,
          title: "Signout",
          onclick: this.logoutHandler
        }
      ]
    };
  }

  componentDidMount() {
    // document.addEventListener('mousedown', this.handleClickOutsideBody);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  logoutHandler = async event => {
    localStorage.clear();
    window.location.href = "/";
  };

  handleLogOutPopUp = e => {
    e.stopPropagation();
    this.setState({ isShowLogOutPopUp: !this.state.isShowLogOutPopUp });
  };

  customeBtnClickHandler = button => this.setState({ customeBtnId: button.id });
  handleClickOutsideBody = async event => {
    // if (wrapperRef && !wrapperRef.contains(event.target)) {
    await this.setState({
      isShowLogOutPopUp: false
    });
    // }
  };
  handleClickAway = () => {
    this.setState({ isHabitTypeDropdown: false });
  };
  // setWrapperRef = node => (wrapperRef = node);

  dropdownToggleHandler =(event, dropdownToggle)=> {
    console.log('dropdownToggleHandler_dropdownToggleHandler')
    event.stopPropagation();
    if(dropdownToggle) {
      this.setState({ 
        isQuickCreateDropdown: false,
        isHabitTypeDropdown: false,
        isMultiTagDropdown: false,
        isSourceDropdown: false,
        isPriorityDropdown: false,
        isEmailDropdown: false,
        isShowDropdown: false,
        isAssignToOpen: false,
        [dropdownToggle[Object.keys(dropdownToggle)[0]]]: !this.state[dropdownToggle[Object.keys(dropdownToggle)[0]]]
       })
    }
    else {
      event.stopPropagation();
      this.setState({
        isQuickCreateDropdown: false,
        isHabitTypeDropdown: false,
        isMultiTagDropdown: false,
        isSourceDropdown: false,
        isPriorityDropdown: false,
        isEmailDropdown: false,
        isShowDropdown: false,
        isAssignToOpen: false
      })
    }
  }

  tickettypeHandleClick=(e,selectedObject) =>{
    this.setState({selected: selectedObject});
    this.dropdownToggleHandler(e, { dropdownToggle: 'isHabitTypeDropdown' })
  }
  handleChangeticketType=(event) =>{
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  render() {
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
      <div className="header-container"  onClick={(e)=>this.dropdownToggleHandler(e)}>
        <div className="header-search-section">
          <div className="header-srch-br">
            <img
              className="header-search-icon"
              src={searchIcon}
              alt="searchIcon"
            />
            <TextField
              className="header-search-bar-field"
              placeholder="Search anything..."
              margin="normal"
            />
          </div>
        </div>

        <div className="header-right-section">
        <div className="head-drawer-type">
                <div className='header-container'>
                  <div className='header-drawer-container' onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isHabitTypeDropdown' })}>
                    <div className='header-selected-item-container'>
                      
                      
                        {/* {
                          this.state.ticketTypeId == 1 ? "Service request" :
                            this.state.ticketTypeId == 2 ? "Incident" :
                              this.state.ticketTypeId == 3 ? "Problem" : "Ticket Type"
                        } */}
                        
                        <p>{this.state.selected ? this.state.selected : 'XCELPROS' } </p>
                     
                    </div>
                    <div className="header-drp-dwn-img">
                      <img src={DrpDwnIcn} onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isHabitTypeDropdown' })} />
                    </div>

                  </div>

                  <div className={`header-dropdown-menu-container 
                    ${this.state.isHabitTypeDropdown ? 'header-open-dropdown' : 'close-dropdown'}`}
                    ref={this.setWrapperRef}
                  >
                    {
                      ticketType.map((day, index) =>
                      <StyledMenuItem className="customized-header-source"
                        onClick={(e) => this.tickettypeHandleClick(e,day.title)} onClose={this.handleClose}
                      >
                        <div className="create-header-one-tckt-typ d-flex">
                        { console.log('this.state.selected', this.state.selected, day) }
                        {/* <label 
                              className='labelStyle'
                              style={{ background:  
                                icon.title === 'service_request' ? '#53d7e3' 
                                : icon.title === 'Problem' ? '#ffc50c'
                                : icon.title === 'Incident' ? '#fd673a'
                                : '#53d7e3' 
                              }}
                          ></label> */}
                          <div className="create-header-tckt-img-text d-flex">
                            <p>{day.title}</p>
                          </div>

                          <div className="create-header-src-radio">
                            <Radio
                               checked={this.state.selected == day.title}
                               
                              // onChange={(e) => this.peopleHandleClickfunction(e, index)}
                              value={day.id}
                              name="ticketTypeId"
                              color="primary"
                              inputProps={{ 'aria-label': '' }}
                              onChange={(e) => this.handleChangeticketType(e, day.id, day.title)}
                            />
                          </div>
                        </div>

                      </StyledMenuItem>
                    )
                    }

                  </div>
                </div>
              </div>

          {/* <FormControl
            variant="outlined"
            className={"application-type-dropdown"}
          >
            <Select value={this.state.appName} onChange={this.handleChange}>
              <MenuItem value={"xcelpros"}>XCELPROS</MenuItem>
              <MenuItem value={20}>Demo name</MenuItem>
              <MenuItem value={30}>Demo name</MenuItem>
            </Select>
          </FormControl> */}
          {/* <Button className='logout-button' onClick={this.logoutHandler} >Logout</Button>     */}
          <div className="header-icons-section">
            {headerIcons.map(icon =>
              icon.id === 3 ? (
                <AllApps icon={icon} />
              ) : (
                <ArrowTooltip title={icon.tooltip} placement="bottom">
                  <img src={icon.icon} alt={icon.icon} />
                </ArrowTooltip>
              )
            )}
          </div>
          <div
            className="header-profile-image"
            onClick={this.handleLogOutPopUp}
          >
            <img
              className="prfl-img-border"
              src={profileBorder}
              alt="profile"
            ></img>
            <img className="prfl-img" src={profileImage} alt="profileImage" />
            {this.state.isShowLogOutPopUp ? (
              <div className="profile-logOut-popUp" ref={this.setWrapperRef}>
                <div className="profile-logOut-popUp-section">
                  {this.state.customeButtons.map(customeBtn => (
                    <div
                      className="profile-logOut-popUp-icn-txt"
                      onClick={customeBtn.onclick}
                    >
                      <img
                        className={`account-type-button  ${
                          this.state.customeBtnId === customeBtn.id
                            ? "active-account-view-button"
                            : null
                        }`}
                        src={
                          window.location.href.includes(customeBtn.path)
                            ? customeBtn.activeIcon
                            : customeBtn.inactiveIcon
                        }
                        alt=""
                      />
                      <label className="account-title">
                        {customeBtn.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      </ClickAwayListener>
    );
  }
}
export default HeaderSection;
