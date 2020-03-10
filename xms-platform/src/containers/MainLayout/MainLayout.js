import React from 'react';
import './MainLayout.scss';

import history from '../../Routes/history'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CreateTicketDrawer from '../../components/TicketingSystem/TicketTable/SideDrawers/CreateTicketUpdated/CreateTicketDrawer';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import sideBarLogo from '../../assets/Sidenavbar-icons/logo.png';
import activeIcon1 from '../../assets/Sidenavbar-icons/Group 11254-active.svg'
// import inActiveIcon1 from '../../assets/Sidenavbar-icons/Group 11254.svg'
import inActiveIcon1 from '../../assets/Sidenavbar-icons/Group 11254-active.svg'
import activeIcon2 from '../../assets/Sidenavbar-icons/Group 11260.svg'
import inActiveIcon2 from '../../assets/Sidenavbar-icons/Group 11260.svg'
// import inActiveIcon2 from '../../assets/Sidenavbar-icons/Group 11261.svg'
import activeIcon3 from '../../assets/Sidenavbar-icons/Group 11262-active.svg'
// import inActiveIcon3 from '../../assets/Sidenavbar-icons/Group 11262.svg'
import inActiveIcon3 from '../../assets/Sidenavbar-icons/Group 11262-active.svg'
import activeIcon4 from '../../assets/Sidenavbar-icons/Icon awesome-project-diagram-active.svg'
// import inActiveIcon4 from '../../assets/Sidenavbar-icons/Icon awesome-project-diagram.svg'
import inActiveIcon4 from '../../assets/Sidenavbar-icons/Icon awesome-project-diagram-active.svg'
import activeIcon5 from '../../assets/Sidenavbar-icons/Icon awesome-user-alt-active.svg'
import inActiveIcon5 from '../../assets/Sidenavbar-icons/Icon awesome-user-alt-active.svg'
// import inActiveIcon5 from '../../assets/Sidenavbar-icons/Icon awesome-user-alt.svg'
import activeIcon6 from '../../assets/Sidenavbar-icons/Icon material-chat_bubble_outline-active.svg'
import inActiveIcon6 from '../../assets/Sidenavbar-icons/Icon material-chat_bubble_outline-active.svg'
// import inActiveIcon6 from '../../assets/Sidenavbar-icons/Icon material-chat_bubble_outline.svg'
import activeIcon7 from '../../assets/Sidenavbar-icons/Icon feather-heart-active.svg'
import inActiveIcon7 from '../../assets/Sidenavbar-icons/Icon feather-heart-active.svg'
// import inActiveIcon7 from '../../assets/Sidenavbar-icons/Icon feather-heart.svg'
import activeIcon8 from '../../assets/icons/SVG/helpactiveicon.svg'
import inActiveIcon8 from '../../assets/Sidenavbar-icons/Icon material-help-outline-active.svg'
// import inActiveIcon8 from '../../assets/Sidenavbar-icons/Icon material-help-outline-active.svg'
// import inActiveIcon8 from '../../assets/Sidenavbar-icons/Icon material-help-outline.svg'
// import footerSettingIcon from '../../assets/Sidenavbar-icons/Group 11263.svg'
import footerSettingIcon from '../../assets/icons/SVG/settingactiveicon.svg'
import searchIcon from '../../assets/Sidenavbar-icons/Icon feather-search-small.svg'
import addIcon from '../../assets/Sidenavbar-icons/Group 11382.svg'
import sidebarToggleIcon from '../../assets/Sidenavbar-icons/Group 11332.svg';

const sidebarIcons = [
  {id: 0, name: 'Dashboard', activeIcon: activeIcon1, inActiveIcon: inActiveIcon1, notification: false, tooltip:"Dashboard"},
  {id: 1, name: 'Tickets', path: '/ticketlisting', activeIcon: activeIcon2, inActiveIcon: inActiveIcon2, notification: true, tooltip:"Tickets"},
  {id: 2, name: 'Task', path: '/tasks', activeIcon: activeIcon3, inActiveIcon: inActiveIcon3, notification: false, tooltip:"Task List"},
  {id: 3, name: 'OKR', path: '/OkrListing', activeIcon: activeIcon4, inActiveIcon: inActiveIcon4, notification: false, tooltip:"OKR"},
  {id: 4, name: 'Profile', activeIcon: activeIcon5, inActiveIcon: inActiveIcon5, notification: false, tooltip:"Profile"},
  {id: 5, name: 'Chat', path: '/chat', activeIcon: activeIcon6, inActiveIcon: inActiveIcon6, notification: false, tooltip:"Chat"},
  {id: 6, name: 'Habit', path: '/HabitList', activeIcon: activeIcon7, inActiveIcon: inActiveIcon7, notification: false, tooltip:"Habit List"},
  {id: 7, name: 'Help', path: '/help', activeIcon: activeIcon8, inActiveIcon: inActiveIcon8, notification: false, tooltip:"Help"},
]
const sidebarSections = [
  {id: 1, heading: 'tickets', addIcon: addIcon, subheading: [
    {id: 1, name: 'All', count: '24'},
    {id: 2, name: 'My Tickets', count: '12'},
    {id: 3, name: 'Due Today', count: '6'},
    {id: 4, name: 'On Priority', count: '6'},
  ]},
  {id: 2, heading: 'status', addIcon: '', subheading: [
    {id: 1, name: 'All', count: '42'},
    {id: 2, name: 'Open', count: '12'},
    {id: 3, name: 'In-Progress', count: '6'},
    {id: 4, name: 'Resolved', count: '12'},
    {id: 5, name: 'Resolved', count: '6'},
  ]},
  {id: 3, heading: 'grouping', addIcon: '', subheading: [
    {id: 1, name: 'All', count: '42'},
    {id: 2, name: 'Tasks by company', count: '12'},
    {id: 3, name: 'Tasks by company', count: '6'},
    {id: 4, name: 'Tasks by Team/Dept', count: '12'},
  ]},
]
function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      width: '2em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      width: '2em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: -2,
      marginLeft: '-0.95em',
      height: '2em',
      width: '2em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent #ffffff transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.95em',
      height: '2em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color}`,
      },
    },
  };
}


const useStylesArrow = makeStyles(theme => ({
  tooltip: {
    position: 'relative',
    fontSize: 10, 
    borderRadius: 100,
    backgroundColor: "#ffffff",
    color: "#656565",
    boxShadow: "0 3px 12px 0 #d2d2d2",
    marginLeft: '0.1em',
    padding: "4px 12px 4px 12px",
    textAlign: 'center'
  },
  arrow: {
    position: 'absolute',
    fontSize: 4,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  popper: arrowGenerator(theme.palette.grey[700]),
}));

function ArrowTooltip(props) {
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
              element: arrowRef,
            },
          },
        },
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


class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarIconId: 1,
      isSidebarToggle: true,
      headingId: 1,
      subheadingId: 1,
      isTicketTypeDropdown:false
    }
  }

  sidebarIconClickHandler = icon=> {
    // if(icon.path){ 
      // this.setState({sidebarIconId: icon.id })
      this.state.sidebarIconId = icon.id
      // alert(this.state.sidebarIconId +"  " +icon.id +"== ")
      history.push(icon.path) 
    // }
    
  }
  sidebarToggler = async ()=> await this.setState({ isSidebarToggle: !this.state.isSidebarToggle })
  subheadingClickHandler =async (heading, subheading)=> await this.setState({ headingId: heading.id, subheadingId: subheading.id })
  isCreateTicketToggler = async() => { await this.setState({ isCTDrawerOpen: !this.state.isCTDrawerOpen })}

  render(){
    let { isSidebarToggle, headingId, subheadingId} = this.state;
    return(
      <div className='xms-sidebar-container'>
        {/* <CreateTicketDrawer isCTDrawerOpen={this.state.isCTDrawerOpen} thisObj={this} /> */}
        <div className='side-navbar-left-container'>
          <div className='side-bar-main-section'>
            <img className='side-bar-logo' src={sideBarLogo} alt='sideBarLogo' />
            {
              sidebarIcons.map(icon => (
                <ArrowTooltip title={icon.tooltip} placement="right">
                  <Button key={icon.id} className={`sidebar-icon-button ${window.location.href.includes( icon.path) ? 'active-sidebar-icon' : null}`} onClick={()=>this.sidebarIconClickHandler(icon)}>
                    {icon.name ? <span className='sidebar-icon-name'>{window.location.href.includes( icon.path) ? icon.name : null}</span> : null}
                    <img className='sidebar-icon' src={window.location.href.includes( icon.path) ? icon.activeIcon : icon.inActiveIcon} alt='' />
                    { <span className={`${icon.notification ? 'navbar-notification' : null} `}></span>}
                  </Button>
                </ArrowTooltip>

              ))
            }
          </div>
          <ArrowTooltip title="Settings" placement="right">
            <img className='sidebar--footer-setting-icon' src={footerSettingIcon} alt='footerSettingIcon'/>
          </ArrowTooltip>
        </div>

        <div className={`side-navbar-right-container ${isSidebarToggle ? 'open-sidebar' : 'close-sidebar' }`}>
          <div className={`${isSidebarToggle ? 'show' : 'hide' }`}>
            {this.props.secondSidebar}
          </div>
          <img className={`${isSidebarToggle ? 'sidebar-close-icon' : 'sidebar-open-icon'}`} src={sidebarToggleIcon} alt='sidebarToggleIcon' onClick={this.sidebarToggler}/>
        </div>

        <div className={`layout-body-section ${isSidebarToggle ? 'sidebar-is-open' : 'sidebar-is-closed'}`}>
          {this.props.bodySection}
        </div>
      </div>

    )
  }
}

export default MainLayout;
