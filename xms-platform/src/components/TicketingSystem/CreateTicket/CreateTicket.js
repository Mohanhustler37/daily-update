import React, { Component } from "react";
import "./CreateTicket.scss";
import Button from "@material-ui/core/Button";
import CreateTicketTag from "../../../assets/icons/01-10-2019/Icon-awesome-tags.svg";
import CreateTicketDownload from "../../../assets/icons/01-10-2019/Icon-awesome-tags.svg";
import CreateTicketMore from "../../../assets/icons/SVG/Iconawesome-ellipsis-v.svg";
import CreateTicketBody from "./CreateTicketBody";
import Logo from "../../../assets/images/logo.png";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Profile from "../../../assets/images/profile.png";
import NotificationsIcon from "../../../assets/icons/SVG/Iconfeather-bell.svg";
import NotificationsEllipse from "../../../assets/icons/SVG/Ellipse 23.svg";
import DotsIcon from "../../../assets/icons/SVG/9dots.svg";
import HeaderAddIcon from "../../../assets/icons/01-10-2019/Icon feather-plus-circle.svg";
import HomeIcon from "../../../assets/icons/SVG/Iconfeather-home.svg";
import TicketAlt from "../../../assets/icons/SVG/Iconawesome-ticket-alt.svg";
import ProjectDiagram from "../../../assets/icons/SVG/Iconawesome-project-diagram.svg";
import UserIcon from "../../../assets/icons/SVG/Iconawesome-user-alt.svg";
import ChatBubble from "../../../assets/icons/SVG/Iconmaterial-chat_bubble_outline.svg";
import HeartIcon from "../../../assets/icons/SVG/Iconfeather-heart.svg";
import HelpIcon from "../../../assets/icons/SVG/Iconmaterial-help-outline.svg";
import SideNavbarAddIcon from "../../../assets/icons/01-10-2019/Icon feather-plus-circle.svg";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import EditCompanyDetails from "../CreateTicket/EditCompanyDetails/EditCompanyDetails";
import history from "../../../Routes/history";

class CreateTicket extends Component {
  constructor(props) {
    super();
    this.state = {
      isEditCompDtlsOpen: true
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("jwtToken");
    if (token === null || token === undefined || token === "") {
      history.push("/");
    }
  }
  render() {
    return (
      <div className="create-ticket-overall-body">
        <div className="ticketing-appBar">
          <div className="header-logo">
            <img src={Logo}></img>{" "}
            <span className="ticketing-text">Tickets</span>
          </div>

          <div className="header-search">
            <div className="search-bar">
              <div className="search-icon">
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search anything…"
                className="search-input"
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>

          <div className="header-icon">
            <div className="dropdown-button">
              <button
                type="button"
                className="btn dropdown-toggle"
                data-toggle="dropdown"
              >
                XCELPROS
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  Normal
                </a>
                <a className="dropdown-item active" href="#">
                  Active
                </a>
                <a className="dropdown-item disabled" href="#">
                  Disabled
                </a>
              </div>
            </div>
            <div className="appbar-icon">
              <img src={NotificationsIcon} alt=""></img>
              <img
                src={NotificationsEllipse}
                className="notification-ellipse"
              ></img>
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
        <div className="create-ticket-body-container row">
          <div className="col-sm-3">
            <div className="side-navbar-container">
              <div className="side-navbar-container1">
                <div className="side-navbar-container1-icons">
                  {/* <img src={HomeIcon}></img> */}
                  <nav>
                    <Link to="/ticketlisting">
                      <img src={HomeIcon}></img>
                    </Link>
                  </nav>
                </div>
                <div className="side-navbar-container1-icons">
                  <img src={TicketAlt}></img>
                </div>
                <div className="side-navbar-container1-icons">
                  {/* <img src={ProjectDiagram}></img> */}
                  <nav>
                    <Link to="/tasksList">
                      <img src={ProjectDiagram}></img>
                    </Link>
                  </nav>
                </div>
                <div className="side-navbar-container1-icons">
                  <img src={UserIcon}></img>
                </div>
                <div className="side-navbar-container1-icons">
                  <img src={ChatBubble}></img>
                </div>
                <div className="side-navbar-container1-icons">
                  {/* <img src={HeartIcon}></img> */}
                  <nav>
                    <Link to="/habitList">
                      <img src={HeartIcon}></img>
                    </Link>
                  </nav>
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
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
                <div className="side-navbar-content">
                  <div className="ticket-header">
                    <p>TICKETS</p>
                    <img
                      src={SideNavbarAddIcon}
                      className="side-navbar-add-icon"
                    ></img>
                  </div>
                  <div className="ticket-header-content-one">
                    {/* <p>All</p> */}
                    <Fab>All</Fab>
                    <div className="ticket-value">
                      <p>42</p>
                    </div>
                  </div>
                  <div className="ticket-header-content">
                    <p>My Tickets</p>
                    <div className="ticket-value">
                      <p>12</p>
                    </div>
                  </div>
                  <div className="ticket-header-content">
                    <p>Due today</p>
                    <div className="ticket-value">
                      <p>6</p>
                    </div>
                  </div>
                  <div className="ticket-header-content">
                    <p>Waiting for response</p>
                    <div className="ticket-value">
                      <p>12</p>
                    </div>
                  </div>
                  <div className="ticket-header-content">
                    <p>On Priority</p>
                    <div className="ticket-value">
                      <p>6</p>
                    </div>
                  </div>
                </div>

                <div className="side-navbar-content">
                  <div className="status-header">
                    <p>Status</p>
                  </div>
                  <div className="status-header-content">
                    {/* <p>All</p> */}
                    <Fab>All</Fab>
                    <div className="ticket-value">
                      <p>42</p>
                    </div>
                  </div>
                  <div className="status-header-content">
                    <p>New</p>
                    <div className="ticket-value">
                      <p>12</p>
                    </div>
                  </div>
                  <div className="status-header-content">
                    <p>Open</p>
                    <div className="ticket-value">
                      <p>6</p>
                    </div>
                  </div>
                  <div className="status-header-content">
                    <p>In Process</p>
                    <div className="ticket-value">
                      <p>12</p>
                    </div>
                  </div>
                  <div className="status-header-content">
                    <p>Resolved</p>
                    <div className="ticket-value">
                      <p>6</p>
                    </div>
                  </div>
                  <div className="status-header-content">
                    <p>Reopen</p>
                    <div className="ticket-value">
                      <p>6</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-9">
            <div className="create-ticket-container">
              <div className="create-ticket-sub-header">
                <div className="create-ticket-left-side">
                  <div className="create-ticket-left-side-text-one">
                    <span>CREATE TICKET</span>
                  </div>
                  <div className="create-ticket-left-side-text-two">
                    <span>Create ticket using template</span>
                  </div>
                </div>
                <div className="create-ticket-right-side">
                  <div className="create-ticket-sub-header-icon-one">
                    <Button variant="contained" className="">
                      <img src={CreateTicketTag} alt="tag"></img>
                    </Button>
                  </div>
                  <div className="create-ticket-sub-header-icon">
                    <Button variant="contained" className="">
                      {/* <img src={CreateTicketTag} alt="download"></img> */}
                      <i class="fa fa-download" aria-hidden="true"></i>
                    </Button>
                  </div>
                  <div className="create-ticket-sub-header-icon-two">
                    <Button variant="contained" className="">
                      <img src={CreateTicketMore} alt="more"></img>
                    </Button>
                  </div>
                </div>
              </div>
              <CreateTicketBody client={this.props.client} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateTicket;
