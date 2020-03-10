import React from 'react';
import "./SubHeaderNew.scss";

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'

// import inactiveListViewIcon from '../../assets/subheader-icon/Group 11412.svg'
import inactiveListViewIcon from '../../assets/subheader-icon/Group 134.svg'
import activeListViewIcon from '../../assets/subheader-icon/Group 134.svg'
// import inactiveGridIcon from '../../assets/subheader-icon/Group 11272.svg'
import inactiveGridIcon from '../../assets/subheader-icon/Group 11413.svg'
import activeGridIcon from '../../assets/subheader-icon/Group 11413.svg'
// import inactiveColumIcon from '../../assets/subheader-icon/Icon feather-columns-light.svg'
import inactiveColumIcon from '../../assets/subheader-icon/Icon feather-columns (1).svg'
import activeColumIcon from '../../assets/subheader-icon/Icon feather-columns (1).svg'
// import inactiveCalenderIcon from '../../assets/subheader-icon/Icon feather-calendar-light.svg'
import inactiveCalenderIcon from '../../assets/subheader-icon/Icon feather-calendar.svg'
import activeCalenderIcon from '../../assets/subheader-icon/Icon feather-calendar.svg'
// import inactiveRowsIcon from '../../assets/subheader-icon/Group 11274.svg'
import inactiveRowsIcon from '../../assets/subheader-icon/Group 11414.svg'
import activeRowsIcon from '../../assets/subheader-icon/Group 11414.svg'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import inactiveFilterIcon from '../../assets/subheader-icon/Group 10464.svg'
import activeFiltersIcon from '../../assets/subheader-icon/Group 10464.svg'
// import inactiveSortIcon from '../../assets/subheader-icon/Sort light Group 11419.svg'
import inactiveSortIcon from '../../assets/subheader-icon/Sort active Group 11420.svg'
import activeSortIcon from '../../assets/subheader-icon/Sort active Group 11420.svg'
// import inactivefltericon from '../../assets/subheader-icon/header_filtericon.svg'
import inactivefltericon from '../../assets/subheader-icon/active_filter_icon.svg'
import activeFlterIcon from '../../assets/subheader-icon/active_filter_icon.svg'
// import inactiveTagIcon from '../../assets/subheader-icon/Icon metro-tags-light.svg'
import inactiveTagIcon from '../../assets/subheader-icon/Icon metro-tags.svg'
import activeTagIcon from '../../assets/subheader-icon/Icon metro-tags.svg'
// import inactiveDownloadIcon from '../../assets/subheader-icon/Icon feather-download-light.svg'
import inactiveDownloadIcon from '../../assets/subheader-icon/Icon feather-download.svg'
import activeDownloadIcon from '../../assets/subheader-icon/Icon feather-download.svg'
import moreOptionsIcon from '../../assets/subheader-icon/Icon awesome-ellipsis-v-light.svg';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import DrpDwnIcn from "../../assets/icons/SVG/Icon ionic-ios-arrow-down.svg";
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import { CirclePicker, TwitterPicker } from 'react-color';


import { getAllTickets } from "../TicketTable/TicketTableQueries";

const viewTypeButtons = [
  { id: 0, inactiveIcon: inactiveListViewIcon, activeIcon: activeListViewIcon, tooltip: "List View" },
  { id: 1, inactiveIcon: inactiveGridIcon, activeIcon: activeGridIcon, tooltip: "Grid View" },
  { id: 2, inactiveIcon: inactiveColumIcon, activeIcon: activeColumIcon, tooltip: "Board View" },
  { id: 3, inactiveIcon: inactiveCalenderIcon, activeIcon: activeCalenderIcon, tooltip: "Calender View" },
  { id: 4, inactiveIcon: inactiveRowsIcon, activeIcon: activeRowsIcon, tooltip: "Timeline View" },
]
const filterSortButtons = [
  { id: 0, inactiveIcon: inactivefltericon, activeIcon: activeFlterIcon, tooltip: "Filter" },

  { id: 1, inactiveIcon: inactiveSortIcon, activeIcon: activeSortIcon, tooltip: "Sort Ticket" },
]
const customeButtons = [
  { id: 0, inactiveIcon: inactiveTagIcon, activeIcon: activeTagIcon, tooltip: "Add Tags" },
  { id: 1, inactiveIcon: inactiveDownloadIcon, activeIcon: activeDownloadIcon, tooltip: "Export Tickets" },
]
const colors = ['#1abc9c', '#17a085', '#2ecc71', '#27ae60', '#3498db', '#2980b9', '#9b59b6', '#8e44ad', '#34495e', '#2c3e50', '#f1c40e', '#f39c12', '#d35400', '#e74c3c', '#c0392b', '#9b0000', '#f28a8a', '#00edff', '#1aa0bc', '#1cd8ff', '#ff92f4', '#d500a3', '#ffb300', '#d0cfec', '#ecf1f9', '#c8c8c8', '#656565', '#464646']

const ticketType = [
  { id: 1, title: "today" },
  { id: 2, title: "tomorrow" },
  { id: 3, title: "yesterday" }
]

// const StyledMenu = withStyles({
//   paper: {
//     border: '1px solid #d3d4d5',
//   },
// })(props => (
//   <Menu
//     elevation={0}
//     getContentAnchorEl={null}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'center',
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'center',
//     }}
//     {...props}
//   />
// ));

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

function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      width: '5em',
      height: '0.5em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent #ffffff transparent`,
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
    fontSize: 6,
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

class SubHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 'today',
      viewBtnId: 0,
      filterSortBtnId: null,
      customeBtnId: null,
      headerName: "",
      ticketDayData: [],
      ticketDay: '',
      totalData: '',
      allTickets:[],
      ticketType:[],
      selectDay:''
    }
  }
  componentDidMount() {
    // if (window.location.href.includes('/tasksListing') || window.location.href.includes('/taskdetails')
    //   || window.location.href.includes('/HabitList') || window.location.href.includes('/tasks')) {
    //   this.setState({ headerName: "Habits" })
    // } else {
    //   this.setState({ headerName: "Habits" });
    //   this.getAllTicketsData();
    // }
    if(window.location.href.includes('/ticketlisting')){
      this.setState({ headerName: "tickets" })
      this.getAllTicketsData();

  }
    if(window.location.href.includes('/tasks') || window.location.href.includes('/taskdetails')){this.setState({ headerName: "tasks" })}
    if(window.location.href.includes('/HabitList')){this.setState({ headerName: "habits" })}
    if(window.location.href.includes('/HabitList')){this.setState({ headerName: "habits" })}

  }
  viewTypeClickHandler = (button) => this.setState({ viewBtnId: button.id })
  filterSortClickHandler = (button) => this.setState({ filterSortBtnId: button.id })
  customeBtnClickHandler = (button) => this.setState({ customeBtnId: button.id })

  handleChange = async (event) => {
    const ticketDayData = event.target.value;
    this.setState({ ticketDay: event.target.value })
    const result = await getAllTickets(ticketDayData);
    if (result != null) {
      this.setState({ totalData: result.length,allTickets:result });
      this.props.refresh(result)
    }
  }
  getAllTicketsData = async () => {
    const ticketDayData = "today";
    const result = await getAllTickets(this.state.ticketDay);
    if (result) {
      if (this.state.totalData == '' || this.state.totalData == undefined
        || this.state.totalData == null) {
        this.setState({ totalData: result.length,allTickets:result });
      }
    }
  }

  dropdownToggleHandler =(event, dropdownToggle)=> {
    console.log('dropdownToggleHandler_dropdownToggleHandler')
    event.stopPropagation();
    if(dropdownToggle) {
      this.setState({ 
        isQuickCreateDropdown: false,
        isTicketTypeDropdown: false,
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
        isTicketTypeDropdown: false,
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
      this.dropdownToggleHandler(e, { dropdownToggle: 'isTicketTypeDropdown' })
  }
  handleChangeticketType=(event) =>{
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  colorPalletPopup = () => (
    <div className='color-pallet-popup-for-tags' ref={this.setWrapperRef}>
      <span>Color palette</span>
      <TwitterPicker colors={colors} onChangeComplete={this.handleChangeComplete} />
    </div>
  )

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

   handleClickAway = () => {
    this.setState({ isTicketTypeDropdown: false });
  };
  render() {
    console.log('isTicketTypeDropdown', this.state.isTicketTypeDropdown)
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
      <div className="new-sub-header-section" onClick={(e)=>this.dropdownToggleHandler(e)}>
        <div className='sub-header-left-section'>
          <div className='heading-and-dropdown-container'>
            <span className='sub-header-heading'>{this.state.headerName}</span>
            <div className="create-habit-day">
                <div className='habit-container' >
                  <div className='habit-drawer-container' onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isTicketTypeDropdown' })}>
                    <div className='selected-habit-item-container'>
                        {console.log('habit-drp-dwn', this.state.selected)}
                        <p>{this.state.selected ? this.state.selected : ' By day' } </p>
                     
                    </div>
                    <div className="habit-drp-dwn-img">
                      <img src={DrpDwnIcn} onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isTicketTypeDropdown' })} />
                    </div>

                  </div>

                  <div className={`habit-type-dropdown-menu-container 
                    ${this.state.isTicketTypeDropdown ? 'habit-type-open-dropdown' : 'close-dropdown'}`}
                    ref={this.setWrapperRef}
                  >
                    {
                      ticketType.map((day, index) =>
                      <StyledMenuItem className="customized-habit-source"
                        onClick={(e) => this.tickettypeHandleClick(e, day.title)} onClose={this.handleClose}
                      >
                        <div className="create-habit-one-tckt-typ d-flex">
                        { console.log('this.state.selected', this.state.selected, day) }
                          <div className="create-habit-img-text d-flex">
                            <p>{day.title}</p>
                         </div>

                          <div className="create-habit-src-radio">
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
            {/* <FormControl variant="outlined" className={'select-day-for-tickets'}>
              <Select value={this.state.ticketDay ? this.state.ticketDay : this.state.day} onChange={this.handleChange} >
                <MenuItem value='tomorrow'>Tomorrow</MenuItem>
                <MenuItem value='today'>Today</MenuItem>
                <MenuItem value='yesterday'>Yesterday</MenuItem>
              </Select>
            </FormControl> */}
          </div>
          <span className='sub-header-tickets-count' 
          // onChange={this.changeNumberOfHabitList}
          >
            {this.state.totalData} {this.state.headerName} for today
          </span>
        </div>

        <div className='sub-header-right-section'>
          <div className='view-type-button-container'>
            {
              viewTypeButtons.map(viewType => (
                <ArrowTooltip title={viewType.tooltip} placement="bottom">
                  <img className={`view-type-button  ${this.state.viewBtnId === viewType.id ? 'active-view-button' : null} waves-effect`} src={this.state.viewBtnId === viewType.id ? viewType.activeIcon : viewType.inactiveIcon} alt='' onClick={() => this.viewTypeClickHandler(viewType)} />
                </ArrowTooltip>))
            }

          </div>

          <div className='filter-sort-button-container'>
              {/* <ArrowTooltip title="add" placement="bottom">
                  <div className="filter-sort-button-section" onClick={() => this.filterSortClickHandler()}>
                    <img className={`filter-sort-type-button  ${this.state.filterSortBtnId ? 'active-view-button' : null}`} src={this.state.filterSortBtnId ? activeFiltersIcon : inactiveFilterIcon} alt='' />
                  </div>
                </ArrowTooltip> */}
            {
              filterSortButtons.map(filterSort => (
                <ArrowTooltip title={filterSort.tooltip} placement="bottom">
                  <div className="filter-sort-button-section" onClick={() => this.filterSortClickHandler(filterSort)}>
                    <img className={`filter-sort-type-button  ${this.state.filterSortBtnId === filterSort.id ? 'active-view-button' : null} sidebar-icon-button`} src={this.state.filterSortBtnId === filterSort.id ? filterSort.activeIcon : filterSort.inactiveIcon} alt='' />
                  </div>
                </ArrowTooltip>
              ))
            }
          </div>

          <div className='custome-button-container'>
            {
              customeButtons.map(customeBtn => (
                <ArrowTooltip title={customeBtn.tooltip} placement="bottom">
                  <div onClick={() => this.customeBtnClickHandler(customeBtn)}>
                    <img className={`filter-sort-type-button  ${this.state.customeBtnId === customeBtn.id ? 'active-view-button' : null}`} src={this.state.customeBtnId === customeBtn.id ? customeBtn.activeIcon : customeBtn.inactiveIcon} alt='' />
                  </div>
                </ArrowTooltip>
              ))
            }
          </div>
          <ArrowTooltip title="More Options" placement="bottom">
            <img className='more-options-icon' src={moreOptionsIcon} alt='moreOptionsIcon' />
          </ArrowTooltip>
        </div>
      </div>
      </ClickAwayListener>
   )
  }

}

export default SubHeader