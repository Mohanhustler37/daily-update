import React, { Component } from 'react';
import "./TicketingSystem.scss";
import ChartBar from "../TicketingSystem/ChartBar/ChartBar";
import TicketTable from "../TicketingSystem/TicketTable/TicketTable";
import Group133 from "../../assets/icons/SVG/Group133.svg";
import Group134 from "../../assets/icons/SVG/Group134.svg";
import IconFeather from "../../assets/icons/SVG/Iconfeather-columns.svg";
import IconFeatherCalender from "../../assets/icons/SVG/Iconfeather-calendar.svg";
import IconMaterialTimeLine from "../../assets/icons/SVG/Iconmaterial-timeline.svg";
import IconMaterialFilterList from "../../assets/icons/SVG/Iconmaterial-filter-list.svg";
import IconAwesomeEllipsis from "../../assets/icons/SVG/Iconawesome-ellipsis-v.svg";
import GridView from "./GridView/GridView";
import FiltersDrawer from '../TicketingSystem/TicketTable/SideDrawers/FiltersDrawer/FiltersDrawer';
import CreateTicketDrawer from '../TicketingSystem/TicketTable/SideDrawers/CreateTicketUpdated/CreateTicketDrawer';
import CreateHabitDrawer from '../CreateHabitDrawer/CreateHabitDrawer';


import Logo from "../../assets/images/logo.png"
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Profile from "../../assets/images/profile.png";
import NotificationsIcon from "../../assets/icons/SVG/Iconfeather-bell.svg";
import NotificationsEllipse from "../../assets/icons/SVG/Ellipse 23.svg";
import DotsIcon from "../../assets/icons/SVG/9dots.svg";
import HeaderAddIcon from "../../assets/icons/01-10-2019/Icon feather-plus-circle.svg";
import HomeIcon from "../../assets/icons/SVG/Iconfeather-home.svg";
import TicketAlt from "../../assets/icons/SVG/Iconawesome-ticket-alt.svg";
import ProjectDiagram from "../../assets/icons/SVG/Iconawesome-project-diagram.svg";
import UserIcon from "../../assets/icons/SVG/Iconawesome-user-alt.svg";
import ChatBubble from "../../assets/icons/SVG/Iconmaterial-chat_bubble_outline.svg";
import HeartIcon from "../../assets/icons/SVG/Iconfeather-heart.svg";
import HelpIcon from "../../assets/icons/SVG/Iconmaterial-help-outline.svg";
import SideNavbarAddIcon from "../../assets/icons/01-10-2019/Icon feather-plus-circle.svg";
import FilterIcon from "../../assets/icons/SVG/Icon feather-filter.svg";
import SortIcon from "../../assets/icons/SVG/Icon awesome-sort.svg";
import TagIcon from "../../assets/icons/01-10-2019/Icon-awesome-tags.svg";
import Switch from '@material-ui/core/Switch';
import axios from "axios";
import { baseUrl } from "../../constants";
import gql from "graphql-tag";
import Button from '@material-ui/core/Button';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import TicketListAddIcon from "../../assets/icons/01-10-2019/Icon feather-plus-circle.svg";
import PickColorLock from "../../assets/icons/01-10-2019/color-pick-lock.svg";
import Fab from '@material-ui/core/Fab';
import { CirclePicker } from 'react-color';
import { Link } from 'react-router-dom';
import history from '../../Routes/history';

const Get_Ticket_under_manager = gql`
    query{
        getTicketUnderManager(managerId:2){
            id,
            name,
            ticketDescription,
            userId,
            statusId
        }
    }
`;
class TicketingSystem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listView: true,
            gridView: false,
            isShowPopupOne: false,
            isShowPopupColor: false,
            isFDrawerOpen: false,
            ascending: true,
            descending: false,
            sortingValue: '',
            ascDescValue: 'ascending',
            responseData: '',
            open: false,
            setOpen: false,
            isCTDrawerOpen: false,
            isOpenCreateHabit: false
        }
    }



    componentDidMount() {
        const token = localStorage.getItem('jwtToken');
        if (token === null || token === undefined || token === '')
            history.push('/');
    }
    // openCreateHabitDrawer=()=> this.setState({ isOpenCreateHabit: true })
    createHabitDrawerToggler = () => {
        this.setState({ isOpenCreateHabit: !this.state.isOpenCreateHabit })
    }
    logoutHandler = async (event) => {
        //localStorage.clear();
        window.location.href = '/';
    }
    isFDrawerToggler = () => {
        this.setState({ isFDrawerOpen: !this.state.isFDrawerOpen })
    }
    isCreateTicketToggler = () => {
        this.setState({ isCTDrawerOpen: !this.state.isCTDrawerOpen })
    }

    sortPopup = () => {
        this.setState({
            isShowPopupOne: !this.state.isShowPopupOne,
            isShowPopupTwo: false
        })
    }

    sortPopupColor = () => {
        this.setState({
            isShowPopupColor: !this.state.isShowPopupColor,
            isShowPopupColorTwo: false
        })
    }

    handleAscending = () => {
        this.setState({
            ascending: !this.state.ascending,
            descending: false,
            ascDescValue: 'ascending'
        });
    }
    handleDescending = () => {
        this.setState({
            descending: !this.state.descending,
            ascending: false,
            ascDescValue: 'descending'
        });
    }

    // handleModalOpen = () => {
    //     this.setState({setOpen: true})
    //   };


    //   handleModalClose = () => {
    //     this.setState({setOpen: false})
    //   };



    // handlePopClose = ()=>{
    //     this.setState({setShow: false})
    // }
    // handlePopShow = ()=>{
    //     this.setState({setShow:true})
    // }


    handleSort = async (e, sortValue) => {
        if (sortValue == "createdDate") {
            this.setState({ sortingValue: sortValue });
        } else if (sortValue == "dueDate") {
            this.setState({ sortingValue: sortValue });
        } else if (sortValue == "lastModified") {
            this.setState({ sortingValue: sortValue });
        } else if (sortValue == "priority") {
            this.setState({ sortingValue: sortValue });
        } else {
            this.setState({ sortingValue: sortValue });
        }
        let requestBody = {
            query: `
              mutation sortBasedOnSelection(
                  $category: String,
                  $categoryKeyWord: String,
                ) {
                    sortBasedOnSelection(
                        category: $category,
                        categoryKeyWord:$categoryKeyWord
                ) {
                    id
                    name,
                    ticketDescription
                }
              }
            `,
            variables: {
                category: this.state.sortingValue &&
                    this.state.sortingValue != '' ?
                    this.state.sortingValue : '',
                categoryKeyWord: this.state.ascDescValue
            }
        };

        let resData = await axios({
            method: 'post',
            url: baseUrl.server,
            data: requestBody,
        }).then(res => {
            return res
        }).catch(err => {
            this.setState({ responseData: '' });
            return err;
        });
        this.setState({
            responseData: resData.data != null ?
                resData.data.data.sortBasedOnSelection : ''
        });
        console.log("AFTER API", resData.data);
    }

    handleListView = () => {
        this.setState({
            gridView: false,
            listView: true
        });
    }
    handleGridView = () => {
        this.setState({
            listView: false,
            gridView: true
        });
    }
    render() {
        return (
            <div className="ticket-listing-overall-body">
                <FiltersDrawer isFDrawerOpen={this.state.isFDrawerOpen} thisObj={this} />
                <CreateTicketDrawer isCTDrawerOpen={this.state.isCTDrawerOpen} thisObj={this} />
                <CreateHabitDrawer isOpenCreateHabit={this.state.isOpenCreateHabit} thisObj={this} />
                <div className="ticketing-appBar">
                    <div className="header-logo">
                        <img src={Logo}></img> <span className="ticketing-text">Ticketing</span>
                    </div>

                    <div className="header-search">
                        <div className="search-bar">
                            <div className="search-icon">
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search anything…"
                                className="search-input"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </div>

                    <div className="header-icon">
                        <div className="dropdown-button">
                            <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">XCELPROS</button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">Normal</a>
                                <a className="dropdown-item active" href="#">Active</a>
                                <a className="dropdown-item disabled" href="#">Disabled</a>
                            </div>
                        </div>
                        <Button onClick={this.logoutHandler} >Logout</Button>
                        <div className="appbar-icon">
                            <img src={NotificationsIcon} alt=""></img>
                            <img src={NotificationsEllipse} className="notification-ellipse"></img>
                        </div>
                        <div className="appbar-icon">
                            <img src={HeaderAddIcon}></img>
                        </div>
                        <div className="appbar-icon">
                            <img src={DotsIcon} alt=""></img>
                        </div>

                        <div className="profile-image">
                            <img src={Profile}></img>
                        </div>

                    </div>
                </div>

                <div className="ticket-listing-body-container row">
                    <div className="col-sm-3">
                        <div className="side-navbar-container">
                            <div className="side-navbar-container1">
                                <div className="side-navbar-container1-icons">
                                    <nav><Link to="/ticketlisting"><img src={HomeIcon}></img></Link></nav>
                                </div>
                                <div className="side-navbar-container1-icons">
                                    <img src={TicketAlt}></img>
                                </div>
                                <div className="side-navbar-container1-icons">
                                    <nav><Link to="/tasksList"><img src={ProjectDiagram}></img></Link></nav>
                                </div>
                                <div className="side-navbar-container1-icons">
                                    <img src={UserIcon}></img>
                                </div>
                                <div className="side-navbar-container1-icons">
                                    <img src={ChatBubble}></img>
                                </div>
                                <div className="side-navbar-container1-icons">
                                    <nav><Link to="/habitList"><img src={HeartIcon}></img></Link></nav>
                                </div>
                                <div className="side-navbar-container1-icons">
                                    <img src={HelpIcon}></img>
                                </div>
                            </div>
                            <div className="side-navbar-container2">
                                <div className="search-side-navbar">
                                    <div className="side-navbar-search-icon">
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search tickets"
                                        className="search-input"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                                <div className="side-navbar-content">
                                    <div className="ticket-header">
                                        <p>TICKETS</p>
                                        <nav><Link to="/createticket"><img src={SideNavbarAddIcon} className="side-navbar-add-icon" onClick={this.handleShow}></img></Link></nav>
                                    </div>
                                    <div className="ticket-header-content-one">
                                        <Fab onClick={this.isCreateTicketToggler}>All</Fab>
                                        <div className="ticket-value"><p>42</p></div>
                                    </div>
                                    <div className="ticket-header-content" onClick={this.createHabitDrawerToggler}>
                                        <p>My Tickets</p>
                                        <div className="ticket-value"><p>12</p></div>
                                    </div>
                                    <div className="ticket-header-content">
                                        <p>Due today</p>
                                        <div className="ticket-value"><p>6</p></div>
                                    </div>
                                    <div className="ticket-header-content">
                                        <p>Waiting for response</p>
                                        <div className="ticket-value"><p>12</p></div>
                                    </div>
                                    <div className="ticket-header-content">
                                        <p>On Priority</p>
                                        <div className="ticket-value"><p>6</p></div>
                                    </div>
                                </div>

                                <div className="side-navbar-content">
                                    <div className="status-header">
                                        <p>Status</p>
                                    </div>
                                    <div className="status-header-content">
                                        <Fab>All</Fab>
                                        <div className="ticket-value"><p>42</p></div>
                                    </div>
                                    <div className="status-header-content">
                                        <p>New</p>
                                        <div className="ticket-value"><p>12</p></div>
                                    </div>
                                    <div className="status-header-content">
                                        <p>Open</p>
                                        <div className="ticket-value"><p>6</p></div>
                                    </div>
                                    <div className="status-header-content">
                                        <p>In Process</p>
                                        <div className="ticket-value"><p>12</p></div>
                                    </div>
                                    <div className="status-header-content">
                                        <p>Resolved</p>
                                        <div className="ticket-value"><p>6</p></div>
                                    </div>
                                    <div className="status-header-content">
                                        <p>Reopen</p>
                                        <div className="ticket-value"><p>6</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="ticket-body">
                            <div className="sub-header" >
                                <div className="sub-header-left">
                                    <div className="sub-header-left-content">
                                        <p className="sub-header-text">Tickets</p>
                                        <div className="dropdown-button">
                                            <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">Today</button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="#">yesterday</a>
                                                <a className="dropdown-item active" href="#">Tomorrow</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="sub-header-left-bottom-text">300 tickets for today</p>
                                    </div>
                                </div>

                                <div className="sub-header-right">
                                    <div
                                        className={`${this.state.listView ? "sub-header-icon-one active-class" : 'sub-header-icon-one'}`}
                                        onClick={this.handleListView}
                                    >
                                        <img src={Group134}></img>
                                    </div>
                                    <div
                                        className={`${this.state.gridView ? "sub-header-icon active-class" : "sub-header-icon"}`}
                                        onClick={this.handleGridView}
                                    >
                                        <img src={Group133}></img>
                                    </div>
                                    <div className="sub-header-icon">
                                        <img src={IconFeather}></img>
                                    </div>
                                    <div className="sub-header-icon">
                                        <img src={IconFeatherCalender}></img>
                                    </div>
                                    <div className="sub-header-icon">
                                        <img src={IconMaterialTimeLine}></img>
                                    </div>
                                    <div className="sub-header-icon" onClick={this.isFDrawerToggler}>
                                        <img src={FilterIcon}></img>
                                    </div>
                                    <div className="sub-header-icon"
                                        onClick={this.sortPopup}>
                                        <img src={SortIcon}></img>
                                    </div>
                                    {
                                        this.state.isShowPopupOne ? (
                                            <div className="sort-popup-for-one">
                                                <div className='sort-popup-one'>
                                                    <p onClick={(e) => this.handleSort(e, "createdDate")}>
                                                        Created date
                                                    </p>
                                                    <p onClick={(e) => this.handleSort(e, "dueDate")}>
                                                        Due by time
                                                    </p>
                                                    <p onClick={(e) => this.handleSort(e, "lastModified")}>
                                                        last modified
                                                    </p>
                                                    <p onClick={(e) => this.handleSort(e, "priority")}>
                                                        Priority
                                                    </p>
                                                    <p onClick={(e) => this.handleSort(e, "status")}>
                                                        Status
                                                    </p>
                                                    <div className="sort-popup-for-ascending">
                                                        <p> Ascending</p>
                                                        <Switch
                                                            checked={this.state.ascending}
                                                            onChange={this.handleAscending}
                                                            value={this.state.switchCheck}
                                                            color="primary"
                                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                        />
                                                    </div>

                                                    <div className="sort-popup-for-ascending">
                                                        <p> Descending</p>
                                                        <Switch
                                                            checked={this.state.descending}
                                                            onChange={this.handleDescending}
                                                            value={this.state.switchCheck}
                                                            color="secondary"
                                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        ) : null
                                    }
                                    <div className="sub-header-icon" onClick={this.sortPopupColor}>
                                        <img src={TagIcon}></img>
                                    </div>

                                    {
                                        this.state.isShowPopupColor ? (
                                            <div className="popup-for-tag-pick-color">


                                                <div className='pic-color-for-tag-pop-up'>
                                                    <p className="pic-color-header-text">MY TAGS</p>
                                                    <div className="color-pic-tags-container">
                                                        <div className="color-picker-section">
                                                            <Checkbox
                                                                value="checkedB"
                                                                color="primary"
                                                            />
                                                            <span className="color-picker-text">Risk</span>
                                                        </div>
                                                        <div className="color-picker-risk">

                                                        </div>
                                                    </div>
                                                    <div className="color-pic-tags-container">
                                                        <div className="color-picker-section">
                                                            <Checkbox
                                                                value="checkedB"
                                                                color="primary"
                                                            />
                                                            <span className="color-picker-text">Critical Customer</span>
                                                        </div>
                                                        <div className="color-picker-critical-customer">

                                                        </div>
                                                    </div>
                                                    <div className="color-pic-tags-container">
                                                        <div className="color-picker-section">
                                                            <Checkbox
                                                                value="checkedB"
                                                                color="primary"
                                                            />
                                                            <span className="color-picker-text">Phase1</span>
                                                        </div>
                                                        <div className="color-picker-phase1">

                                                        </div>
                                                    </div>
                                                    <div className="color-pic-tags-container">
                                                        <div className="color-picker-section">
                                                            <Checkbox
                                                                value="checkedB"
                                                                color="primary"
                                                            />
                                                            <span className="color-picker-text">Technical</span>
                                                        </div>
                                                        <div className="color-picker-technical">

                                                        </div>
                                                    </div>
                                                    <div className="color-pic-tags-container">
                                                        <div className="color-picker-section">
                                                            <Checkbox
                                                                value="checkedB"
                                                                color="primary"
                                                            />
                                                            <span className="color-picker-text">Server Issue</span>
                                                        </div>
                                                        <div className="color-picker-server-issue">

                                                        </div>
                                                    </div>
                                                    <hr></hr>
                                                    <div className="color-picker-search-and-add">
                                                        <InputBase
                                                            placeholder="Enter tag name"
                                                            className="search-input"
                                                            inputProps={{ 'aria-label': 'search' }}
                                                        />
                                                        <Fab className='pick-color-add' size="small" aria-label="add">
                                                            <img src={TicketListAddIcon} className="add-color-icon"></img>
                                                        </Fab>
                                                    </div>
                                                    <div className="color-picker-color-container">

                                                        <div className="circle-picker-one">
                                                            <CirclePicker

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="pick-color-make-it-private">
                                                        <img src={PickColorLock}></img>
                                                        <p>Make it private</p>
                                                        <Checkbox
                                                            value="checkedB"
                                                            color="primary"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        ) : null
                                    }


                                    <div className="sub-header-icon">
                                        <img src={IconAwesomeEllipsis}></img>
                                    </div>
                                </div>
                            </div>

                            <ChartBar />
                            {
                                this.state.listView ?
                                    <TicketTable
                                        sortData={this.state.responseData}
                                    />
                                    : ''
                            }

                            {
                                this.state.gridView ?
                                    <GridView
                                        sortData={this.state.responseData}
                                        client={this.props.client}
                                    /> : ''
                            }
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default TicketingSystem;
