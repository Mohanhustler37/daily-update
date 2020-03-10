import React, { Component } from 'react';
import "./Habittemplate.scss";
import IconAwesomeEllipsis from "../../assets/icons/SVG/Iconawesome-ellipsis-v.svg";
import IconAwesomeSort from "../../assets/icons/SVG/Icon awesome-sort.svg";
import FilterImage from "../../assets/icons/SVG/Iconmaterial-filter-list.svg";
import Addimage from "../../assets/icons/01-10-2019/Group 10948.svg";
import Bookoneimage from "../../assets/icons/LoginAndRegistration_icons/books.png";
import Facewashimage from "../../assets/icons/LoginAndRegistration_icons/wash-face.png";
import Sleepimage from "../../assets/icons/LoginAndRegistration_icons/sleep.png";
import Timeimage from "../../assets/icons/LoginAndRegistration_icons/time-management.png";
import Yogaimage from "../../assets/icons/LoginAndRegistration_icons/yoga.png";
import Book2image from "../../assets/icons/LoginAndRegistration_icons/books (1).png";
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
import Fab from '@material-ui/core/Fab';

import BottomPopupAvatar from "../../assets/icons/01-10-2019/Rectangle 527.svg";
import { Scrollbars } from 'react-custom-scrollbars';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import history from '../../Routes/history';

const usersList = [
    { id: 0, avatharImg: '', name: 'A Company' },
    { id: 1, avatharImg: '', name: 'B Company' },
    { id: 2, avatharImg: '', name: 'C Company' },
    { id: 3, avatharImg: '', name: 'D Company' },
    { id: 4, avatharImg: '', name: 'E Company' },
    { id: 5, avatharImg: '', name: 'F Company' },
    { id: 6, avatharImg: '', name: 'G Company' },
    { id: 7, avatharImg: '', name: 'H Company' },
    { id: 8, avatharImg: '', name: 'I Company' },
    { id: 9, avatharImg: '', name: 'J Company' },
    { id: 10, avatharImg: '', name: 'K Company' },

]

class Habittemplate extends Component {
    constructor(props) {
        super();
        this.state = {
            isShowMorePopUp: false,
            isShowCmpToHabit: false,
            isShowHbtToTicket: false,
            searchCompKey: null,
            selectedCompanyRadio: '',
            selectedTicket: '',
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('jwtToken');
        if (token === null || token === undefined || token === '') {
            history.push('/');
        }
    }
    showMorePopUp = () => {
        this.setState({
            isShowMorePopUp: !this.state.isShowMorePopUp,
            isShowCmpToHabit: false,
            isShowHbtToTicket: false

        })
    }

    habitsMorePopup = () => {
        return (
            <div className='habits-more-popup'>
                <ul>
                    <li className={`${this.state.isShowCmpToHabit ? 'list-selected' : null} `} onClick={this.showLinkCmpWithHabit}>Link with company</li>
                    {this.state.isShowCmpToHabit ? this.companyListPopup() : null}
                    <li className={`${this.state.isShowHbtToTicket ? 'list-selected' : null} `} onClick={this.showLinkTktWithHabit}>Link with ticket</li>
                </ul>
            </div>
        )
    }



    searchCompanyHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    radioButtonEnabler = event => {
        this.setState({ [event.target.name]: event.target.value })
    };


    showLinkCmpWithHabit = () => {
        this.setState({
            isShowCmpToHabit: !this.state.isShowCmpToHabit

        })
    }

    listOfMenuItems = (company) => {
        return (
            <div className='button-popup-content'>
                <div>
                    {/* <img className="button-popup-avathar" src={BottomPopupAvatar} alt='BottomPopupAvatar'></img> */}
                    <span>{company.name}</span>
                </div>
                <FormControl component="fieldset" >
                    <RadioGroup aria-label="gender" name='selectedCompanyRadio' value={this.state.selectedCompanyRadio} onChange={this.radioButtonEnabler}>
                        <FormControlLabel
                            value={company.id}
                            className='button-popup-radio-button'
                            control={<Radio color="primary" />}
                            labelPlacement="start"
                        />
                    </RadioGroup>
                </FormControl>
            </div>
        )
    }

    companyListPopup = () => {
        return (
            <div className="habit-show-company-list-popup">
                <div className='hbt-cmp-popup'>
                    <Scrollbars style={{ width: 180, height: 150 }}>
                        {
                            // !this.state.searchCompKey ? 
                            //     usersList.map(company => {
                            //         return company.name.includes(this.state.searchCompKey) ? this.listOfMenuItems(company) : null
                            //     }) 
                            // :
                            usersList.map(company => {
                                return this.listOfMenuItems(company)
                            })
                        }
                    </Scrollbars>
                    <div className="ticket-list-btm-pop-search">
                        <InputBase
                            name='searchCompKey'
                            value={this.state.searchCompKey}
                            placeholder="Search company"
                            className="search-input"
                            onChange={this.searchCompanyHandler}
                        />
                        <div className=".ticket-list-btm-pop-search-icon">
                            <SearchIcon />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    showLinkTktWithHabit = () => {
        this.setState({
            isShowHbtToTicket: !this.state.isShowHbtToTicket,
            isShowMorePopUp: false,
            isShowCmpToHabit: false
        })
    }
    linkHabitWithTicketHandler = () => {
        this.setState({ isShowHbtToTicket: false })
    }
    linkHabitToTicket = () => {
        return (
            <div className='link-habit-with-ticket-popup'>
                <span classname='se'>Selected ticket name here</span>
                <FormControl variant="outlined" className='custome-menu-select-component'>
                    <InputLabel htmlFor="outlined-age-simple">Select ticket</InputLabel>
                    <Select value={this.state.selectedTicket} onChange={this.selectMenuHandler} >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" className={'habit-to-ticket-button'} onClick={this.linkHabitWithTicketHandler}>Cancel</Button>
                <Button variant="contained" className={'habit-to-ticket-button'} onClick={this.linkHabitWithTicketHandler}>Click to link</Button>
            </div>
        )
    }
    render() {
        return (
            <div className="habit-template-overall-body">
                {this.state.isShowHbtToTicket ? this.linkHabitToTicket() : null}
                <div className="ticketing-appBar">
                    <div className="header-logo">
                        <img src={Logo}></img> <span className="ticketing-text">Tickets</span>
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

                <div className="habit-template-body-container row">
                    <div className="col-sm-3">
                        <div className="side-navbar-container">

                            <div className="side-navbar-container1">
                                <div className="side-navbar-container1-icons ">
                                    <img src={HomeIcon}></img>
                                </div>
                                <div className="side-navbar-container1-icons">
                                    <img src={TicketAlt}></img>
                                </div>
                                <div className="side-navbar-container1-icons">
                                    <img src={ProjectDiagram}></img>
                                </div>
                                <div className="side-navbar-container1-icons">
                                    <img src={UserIcon}></img>
                                </div>
                                <div className="side-navbar-container1-icons">
                                    <img src={ChatBubble}></img>
                                </div>
                                <div className="side-navbar-container1-icons">
                                    <img src={HeartIcon}></img>
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
                                        <img src={SideNavbarAddIcon} className="side-navbar-add-icon"></img>
                                    </div>
                                    <div className="ticket-header-content-one">
                                        {/* <p>All</p> */}<Fab>All</Fab>
                                        <div className="ticket-value"><p>42</p></div>
                                    </div>
                                    <div className="ticket-header-content">
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
                                        {/* <p>All</p> */}<Fab>All</Fab>
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
                        <div className="mainclass">
                            <div className="header">
                                <div className="header-left">
                                    <div className="header-left-content">
                                        <p className="header-text">HABIT TEMPLATES</p>
                                        <div>
                                            <p className="header-left-bottom-text">300 habit template for me</p>
                                        </div>
                                    </div>
                                </div>



                                <div className="header-right">
                                    <div className="header-icon-one">
                                        <img src={FilterImage}></img>
                                    </div>
                                    <div className="header-icon-one1">
                                        <div><img src={IconAwesomeSort}></img></div>
                                        <div className="imgtext">SORT</div>
                                    </div>

                                    <div className="spacing">
                                        <div className="header-icon-two">
                                            <img src={IconAwesomeSort}></img>
                                        </div>
                                        <div className="header-icon-two">
                                            <img src={IconAwesomeSort}></img>
                                        </div>
                                    </div>
                                    <div className="header-icon">
                                        <img src={IconAwesomeEllipsis}></img>
                                    </div>
                                </div>

                            </div><hr />

                            <div className="articlesection">
                                <div className="leftsection">
                                    <img src={Bookoneimage}></img>
                                    <div className="leftsectioncontent">
                                        <p className="lefttext">Must-have habits</p>
                                    </div>
                                    <div>
                                        <p className="leftsectionbottomtext">Small habits, big results</p>
                                    </div>
                                </div>

                                <div className="rightsection">
                                    {/* <div> */}
                                    <img src={Addimage} ></img>
                                    {/* </div> */}
                                    <div className="awesomeicon" onClick={this.showMorePopUp}>
                                        <img src={IconAwesomeEllipsis}></img>
                                    </div>
                                    {this.state.isShowMorePopUp ? this.habitsMorePopup() : null}

                                </div>

                            </div> <hr />

                            <div className="articlesection">
                                <div className="leftsection">
                                    <img src={Facewashimage}></img>
                                    <div className="leftsectioncontent">
                                        <p className="lefttext">Morning routine</p>
                                    </div>
                                    <div>
                                        <p className="leftsectionbottomtext">Open the door to be productive day</p>
                                    </div>
                                </div>

                                <div className="rightsection">
                                    {/* <div className=""> */}
                                    <img src={Addimage}></img>
                                    {/* </div> */}
                                    <div className="awesomeicon" >
                                        <img src={IconAwesomeEllipsis}></img>
                                    </div>
                                </div>

                            </div> <hr />
                            <div className="articlesection">
                                <div className="leftsection">
                                    <img src={Sleepimage}></img>
                                    <div className="leftsectioncontent">
                                        <p className="lefttext">Better sleep</p>
                                    </div>
                                    <div>
                                        <p className="leftsectionbottomtext">It's a key of healthly lifestyle</p>
                                    </div>
                                </div>

                                <div className="rightsection">
                                    {/* <div > */}
                                    <img src={Addimage}></img>
                                    {/* </div> */}
                                    <div className="awesomeicon" >
                                        <img src={IconAwesomeEllipsis}></img>
                                    </div>
                                </div>

                            </div> <hr />
                            <div className="articlesection">
                                <div className="leftsection">
                                    <img src={Timeimage}></img>
                                    <div className="leftsectioncontent">
                                        <p className="lefttext">Getting stuff done</p>
                                    </div>
                                    <div>
                                        <p className="leftsectionbottomtext">Boost your productivity</p>
                                    </div>
                                </div>

                                <div className="rightsection">
                                    {/* <div> */}
                                    <img src={Addimage}></img>
                                    {/* </div> */}
                                    <div className="awesomeicon" >
                                        <img src={IconAwesomeEllipsis}></img>
                                    </div>
                                </div>

                            </div> <hr />
                            <div className="articlesection">
                                <div className="leftsection">
                                    <img src={Yogaimage}></img>
                                    <div className="leftsectioncontent">
                                        <p className="lefttext">Stress relief</p>
                                    </div>
                                    <div>
                                        <p className="leftsectionbottomtext">Calm down and release tension</p>
                                    </div>
                                </div>

                                <div className="rightsection">
                                    {/* <div> */}
                                    <img src={Addimage}></img>
                                    {/* </div> */}
                                    <div className="awesomeicon">
                                        <img src={IconAwesomeEllipsis}></img>
                                    </div>
                                </div>

                            </div> <hr />
                            <div className="articlesection">
                                <div className="leftsection">
                                    <img src={Book2image}></img>
                                    <div className="leftsectioncontent">
                                        <p className="lefttext">Learn and explore</p>
                                    </div>
                                    <div>
                                        <p className="leftsectionbottomtext">Stay hungry for knowledge</p>
                                    </div>
                                </div>

                                <div className="rightsection">
                                    {/* <div> */}
                                    <img src={Addimage}></img>
                                    {/* </div> */}
                                    <div className="awesomeicon">
                                        <img src={IconAwesomeEllipsis}></img>
                                    </div>
                                </div>

                            </div> <hr />

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
export default Habittemplate;
