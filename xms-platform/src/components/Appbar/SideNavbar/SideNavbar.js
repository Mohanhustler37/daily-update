import React from 'react';
import "./SideNavbar.scss";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from "../../../assets/icons/SVG/Iconfeather-home.svg";
import TicketAlt from "../../../assets/icons/SVG/Iconawesome-ticket-alt.svg";
import ProjectDiagram from "../../../assets/icons/SVG/Iconawesome-project-diagram.svg";
import UserIcon from "../../../assets/icons/SVG/Iconawesome-user-alt.svg";
import ChatBubble from "../../../assets/icons/SVG/Iconmaterial-chat_bubble_outline.svg";
import HeartIcon from "../../../assets/icons/SVG/Iconfeather-heart.svg";
import HelpIcon from "../../../assets/icons/SVG/Iconmaterial-help-outline.svg";
import SideNavbarAddIcon from "../../../assets/icons/01-10-2019/Icon feather-plus-circle.svg";
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';

export default function SideNavbar() {
    return (
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
                    <nav><Link to="/"><img src={HeartIcon}></img></Link></nav>
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
                    <div className="side-nav-ticket-header">
                        <p>TICKETS999</p>
                        <img src={SideNavbarAddIcon} className="side-navbar-add-icon"></img>
                        {/* <i class="fa fa-plus-circle" aria-hidden="true"></i> */}
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
    )
}