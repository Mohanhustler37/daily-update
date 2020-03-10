import React, { Component } from "react";
import "./CreateTask.scss";


import Button from '@material-ui/core/Button';
import CreateTaskTag from "../../../assets/icons/01-10-2019/Icon-awesome-tags.svg";
import CreateTicketDownload from "../../../assets/icons/01-10-2019/Icon-awesome-tags.svg";
import CreateTaskMore from "../../../assets/icons/SVG/Iconawesome-ellipsis-v.svg";
import CreateTaskBody from "./CreateTaskBody";
import Logo from "../../../assets/images/logo.png"
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
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
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import history from "../../../Routes/history";

class CreateTask extends Component {
    constructor(props) {
        super()
        this.state = {
            ticket_type: '',
            name: '',
            ticket_description: '',
            priority: '',
            tags: '',
            attachment: '',
            notify_others: '',
            user_id: 1,
            team_id: 1,
            open: false
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('jwtToken');
        if (token === null || token === undefined || token === '') {
            history.push('/');
        }
    }


    handleChange = event => {
        this.setState({ priority: event.target.value });
    };

    handleOpenClose = () => {
        this.setState({ open: !this.state.open });
    };
    render() {
        return (
            <div className="create-task-overall-body">
                <div className="create-task-body-container row">
                    <div className="col-sm-9">
                        <div className="create-task">
                            <div className="create-task-container">
                                <div className="create-ticket-sub-header">
                                    <div className="create-ticket-left-side">
                                        <div className="create-ticket-left-side-text-one">
                                            <p>CREATE TASK</p>
                                        </div>
                                        <div className="create-ticket-left-side-text-two">
                                            <p >Create task in 30 seconds or less</p>
                                        </div>
                                    </div>
                                    <div className="create-ticket-right-side">
                                        <div className="create-ticket-sub-header-icon-one">
                                            <Button variant="contained" className="">
                                                <img src={CreateTaskTag} alt="tag"></img>
                                            </Button>
                                        </div>
                                        <div className="create-ticket-sub-header-icon">
                                            <Button variant="contained" className="">

                                                <i class="fa fa-download" aria-hidden="true"></i>
                                            </Button>
                                        </div>
                                        <div className="create-ticket-sub-header-icon-two">
                                            <Button variant="contained" className="">
                                                <img src={CreateTaskMore} alt="more"></img>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <CreateTaskBody client={this.props.client} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )

    }
}

export default CreateTask;
