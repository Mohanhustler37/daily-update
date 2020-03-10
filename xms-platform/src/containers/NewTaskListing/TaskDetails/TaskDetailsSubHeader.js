import React from 'react';
import "./TaskDetailsSubHeader.scss";

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'

import inactiveListViewIcon from '../../../assets/subheader-icon/Group 11412.svg'
import activeListViewIcon from '../../../assets/subheader-icon/Group 134.svg'
import inactiveGridIcon from '../../../assets/subheader-icon/Group 11272.svg'
import activeGridIcon from '../../../assets/subheader-icon/Group 11413.svg'
import inactiveColumIcon from '../../../assets/subheader-icon/Icon feather-columns-light.svg'
import activeColumIcon from '../../../assets/subheader-icon/Icon feather-columns (1).svg'
import inactiveCalenderIcon from '../../../assets/subheader-icon/Icon feather-calendar-light.svg'
import activeCalenderIcon from '../../../assets/subheader-icon/Icon feather-calendar.svg'
import inactiveRowsIcon from '../../../assets/subheader-icon/Group 11274.svg'
import activeRowsIcon from '../../../assets/subheader-icon/Group 11414.svg'

import inactiveFilterIcon from '../../../assets/subheader-icon/Group 10464.svg'
import activeFiltersIcon from '../../../assets/subheader-icon/active_filter_icon.svg'
import inactiveSortIcon from '../../../assets/subheader-icon/Sort light Group 11419.svg'
import activeSortIcon from '../../../assets/subheader-icon/Sort active Group 11420.svg'


import inactiveTagIcon from '../../../assets/subheader-icon/Icon metro-tags-light.svg'
import activeTagIcon from '../../../assets/subheader-icon/Icon metro-tags.svg'
import inactiveDownloadIcon from '../../../assets/subheader-icon/Icon feather-download-light.svg'
import activeDownloadIcon from '../../../assets/subheader-icon/Icon feather-download.svg'
import moreOptionsIcon from '../../../assets/subheader-icon/Icon awesome-ellipsis-v-light.svg';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { getAllTickets } from "../../TicketTable/TicketTableQueries";
import PlayIcon from '../../../assets/icons/assets_Task list_2019-11-20/Task details/play.svg';
import Button from '@material-ui/core/Button';
import StopWatch from "../../NewTaskListing/TaskDetailsStoperWatch/StopWatch";

const viewTypeButtons = [
  { id: 0, inactiveIcon: inactiveListViewIcon, activeIcon: activeListViewIcon, tooltip: "List View" },
  { id: 1, inactiveIcon: inactiveGridIcon, activeIcon: activeGridIcon, tooltip: "Grid View" },
  { id: 2, inactiveIcon: inactiveColumIcon, activeIcon: activeColumIcon, tooltip: "Board View" },
  { id: 3, inactiveIcon: inactiveCalenderIcon, activeIcon: activeCalenderIcon, tooltip: "Calender View" },
  { id: 4, inactiveIcon: inactiveRowsIcon, activeIcon: activeRowsIcon, tooltip: "Timeline View" },
]
const filterSortButtons = [
  { id: 0, inactiveIcon: inactiveFilterIcon, activeIcon: activeFiltersIcon, tooltip: "Filter" },
  { id: 1, inactiveIcon: inactiveSortIcon, activeIcon: activeSortIcon, tooltip: "Sort Ticket" },
]
const customeButtons = [
  { id: 0, inactiveIcon: inactiveTagIcon, activeIcon: activeTagIcon, tooltip: "Add Tags" },
  { id: 1, inactiveIcon: inactiveDownloadIcon, activeIcon: activeDownloadIcon, tooltip: "Export Tickets" },
]

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




class TaskDetailsSubHeader extends React.Component {
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
      allTickets:[]
    }
  }
  componentDidMount() {
    if (window.location.href.includes('/tasksListing') || window.location.href.includes('/taskDetails')
      || window.location.href.includes('/HabitList') || window.location.href.includes('/tasks')) {
      this.setState({ headerName: "Tasks" })
    } else {
      this.setState({ headerName: "Tickets" });
      this.getAllTicketsData();
    }
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
    const result = await getAllTickets(ticketDayData);
    if (result) {
      if (this.state.totalData == '' || this.state.totalData == undefined
        || this.state.totalData == null) {
        this.setState({ totalData: result.length,allTickets:result });
      }
    }
  }
  render() {
    return (
      <div className="tsk-dtls-sub-header-section">
        <div className='tsk-dtls-sub-header-left-section'>
          <div className='heading-and-dropdown-container'>
            <span className='sub-header-heading'>{this.state.headerName}</span>
            <FormControl variant="outlined" className={'select-day-for-tickets'}>
              <Select value={this.state.ticketDay ? this.state.ticketDay : this.state.day} onChange={this.handleChange} >
                <MenuItem value='tomorrow'>Tomorrow</MenuItem>
                <MenuItem value='today'>Today</MenuItem>
                <MenuItem value='yesterday'>Yesterday</MenuItem>
              </Select>
            </FormControl>
          </div>
          <span className='sub-header-tickets-count'>
            {this.state.totalData} {this.state.headerName} for today
          </span>
        </div>

        <div className='tsk-dtls-sub-header-right-section'>
          <div className='view-type-button-container'>
           {/* <Button className="tsk-dtls-tm-ply-icn d-flex align-items-center"><img className="ply-icn" src={PlayIcon} alt="play-icon"></img><span>01H 59M</span></Button> */}
           <StopWatch/>
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
                    <img className={`filter-sort-type-button  ${this.state.filterSortBtnId === filterSort.id ? 'active-view-button' : null}`} src={this.state.filterSortBtnId === filterSort.id ? filterSort.activeIcon : filterSort.inactiveIcon} alt='' />
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
    )
  }

}

export default TaskDetailsSubHeader;
