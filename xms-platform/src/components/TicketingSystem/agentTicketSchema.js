import React from 'react';
import './Appbar/Appbar.scss'
import Logo from "../../assets/images/logo.png"
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Profile from "../../assets/images/profile.png";
import SubHeader from "./Appbar/SubHeader/SubHeader";
import NotificationsIcon from "../../assets/icons/SVG/Iconfeather-bell.svg";
import NotificationsEllipse from "../../assets/icons/SVG/Ellipse 23.svg";
import DotsIcon from "../../assets/icons/SVG/9dots.svg";
import ChartBar from "./ChartBar/ChartBar";
import TicketTable from "./AgentTable/AgentTable";
import SideNavbar from "./Appbar/SideNavbar/SideNavbar";

export default function agentTicketSchema() {

    return (
        <div>
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
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </div>
                    <div className="appbar-icon">
                        <img src={DotsIcon} alt=""></img>
                    </div>

                    <div className="profile-image">
                        <img src={Profile}></img>
                    </div>

                </div>
            </div>

            <div className="ticketing-side-navbar-table-merge">
                <SideNavbar />
                <div className="ticket-body">
                    <SubHeader />
                    <ChartBar />
                    <TicketTable />
                </div>
            </div>
        </div>
    );
}