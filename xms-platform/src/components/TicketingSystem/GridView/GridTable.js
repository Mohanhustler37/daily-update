import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import ThreeDots from "../../../assets/icons/SVG/Iconawesome-ellipsis-v.svg";
import './GridView.scss';
import Profile from "../../../assets/images/profile.png";
import Calender from "../../../assets/icons/SVG/Iconfeather-calendar.svg";
import StatusImg from "../../../assets/icons/SVG/Icon zocial-statusnet.svg";
import { baseUrl } from "../../../constants";
import { getGridData } from "./gridViewQuerys";

class GridTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            ticketData: []
        }
    }
    componentDidMount() {
        // this.fetchTickets();
        let client = this.props.client;
        getGridData(
            client, 2, 1, ticketData => {
                this.setState({ ticketData: ticketData });
            }
        );
    }

    render() {
        const ticketData = this.state.ticketData.data;
        let samePageData = ticketData && ticketData.getTicketUnderManager != null
            && ticketData.getTicketUnderManager != undefined ? ticketData.getTicketUnderManager : '';
        let propsData = this.props.sortData != '' && this.props.sortData !== null
            && this.props.sortData !== undefined ? this.props.sortData : '';
        console.log("SAMEPAGE DATA",samePageData);
        let mapData = propsData ? propsData : samePageData;
        console.log("PROPSData",this.props.sortData);
        return (
            <div >
                {mapData ? mapData.map((ticket, index) => (
                    <div className="grid-table">
                        <div className="grid-table-container">
                            <div className="description-section">
                                <div className="description-date-section">
                                    <div className="date-time-font">
                                        <i className="fa fa-clock-o" style={{ color: '#EA5455' }}></i>&nbsp;  DATE DATE
                                </div>
                                    <div className="full-date">SEP 22, 2019</div>
                                    <div className="date-time-font">24:00 PM
                            </div>
                                </div>
                                <div className="discription-container">
                                    <span className="ticket-no">{ticket.id}</span>
                                    <span className="ticket-heading">
                                        <strong>{ticket.name}</strong>
                                    </span>
                                    <div className="last-communication-thread">
                                        {ticket.ticketDescription}
                                    </div>
                                </div>
                            </div>
                            <div className="service-request-section">
                                <div className="service-section-header">
                                    <span>
                                        <Button
                                            size="large"
                                            className="btnClr"
                                        >
                                            Service Request
                                        </Button>
                                    </span>
                                    <span>
                                        <img src={ThreeDots} alt="Dots" />
                                    </span>
                                </div>
                                <div className="service-section-footer">
                                    <Button
                                        variant="outlined"
                                        size="small"
                                    >
                                        <i className="fa fa-clock-o" style={{ color: '#2DCD7A' }}></i>&nbsp; 15.59
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="ticket-details-section">
                            <div className="ticket-details-footer">
                                <div className="profile-img">
                                    <img src={Profile}></img>
                                </div>
                                <div>
                                    <p className="company-text">Company</p>
                                    <p className="company-text-two">Code Matrix</p>
                                </div>
                            </div>
                            <div className="ticket-details-footer">
                                <div className="profile-img">
                                    <img src={Profile}></img>
                                </div>
                                <div>
                                    <p className="company-text">Contact</p>
                                    <p className="company-text-two">John Doe</p>
                                </div>
                            </div>
                            <div className="ticket-details-footer">
                                <div className="profile-img">
                                    <img src={Profile}></img>
                                </div>
                                <div>
                                    <p className="company-text">Manager</p>
                                    <p className="company-text-two">Ryan Pazos</p>
                                </div>
                            </div>
                            <div className="ticket-details-footer">
                                <div className="profile-img">
                                    <img src={Profile}></img>
                                </div>
                                <div>
                                    <p className="company-text">Assigned To</p>
                                    <p className="company-text-two">Sugata Maji</p>
                                </div>
                            </div>
                            <div className="ticket-details-footer">
                                <div>
                                    <p className="company-text">Priority</p>
                                    <p className="company-text-two">
                                        <i className="fa fa-circle" style={{ color: '#FFC089', fontSize: '10px;' }}></i>&nbsp;
                                        High
                            </p>
                                </div>
                            </div>
                            <div className="ticket-details-footer">
                                <img src={StatusImg} className="img-width" alt="Status" />&nbsp;
                            <div>
                                    <p className="company-text">Status</p>
                                    <p className="company-text-two"> Open </p>
                                </div>
                            </div>
                            <div className="ticket-details-footer">
                                <img src={Calender} className="img-cal-width" alt="Calender" />&nbsp;
                            <div>
                                    <p className="company-text">Creation Date</p>
                                    <p className="company-text-two"> Sep 18, 2019 </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : ''
                }
            </div>
        )

    }
}

export default GridTable;