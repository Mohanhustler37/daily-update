import React from 'react';
// import './Appbar/Appbar.scss'
import Logo from "../../../assets/images/logo.png"
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Profile from "../../../assets/images/profile.png";
import NotificationsIcon from "../../../assets/icons/SVG/Iconfeather-bell.svg";
import NotificationsEllipse from "../../../assets/icons/SVG/Ellipse 23.svg";
import DotsIcon from "../../../assets/icons/SVG/9dots.svg";
import SubHeader from "../../Appbar/SubHeader/SubHeader";
import ChartBar from "../ChartBar/ChartBar";
import TicketTable from "./AgentTable";
import Appbar from "../../Appbar/Appbar";
import SideNavbar from "../../Appbar/SideNavbar/SideNavbar";
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from "apollo-boost";
import { baseUrl } from "../../../constants";
import gql from "graphql-tag";
import { ApolloProvider, useQuery, useMutation } from "@apollo/react-hooks";
import axios from "axios";

const cache = new InMemoryCache();

const client = new ApolloClient({
    cache,
    uri: baseUrl.server,
});


const Get_Ticket_Under_Agent = gql`
    query{
        getTicketByAgent(assigned_to_agent_id:2){
            id,
            name,
            ticket_description,
            user_id,
            status_id,
            assigned_to_agent_id
        }
    }
`;

export default function AgentTicketSchema() {

    const [searchText, setSearchText] = React.useState();
    const [responseData, setResponseData] = React.useState();

    const handleSearchText = event => {
        setSearchText({ searchText: event.target.value });
    };
    
     const { data, error } = useQuery(
        Get_Ticket_Under_Agent,
        { fetchPolicy: "network-only" }
    );
    const submitSearchText = async (e) => {
        let requestBody = {
            query: `
              mutation searchTag(
                  $name: String,
                ) {
                searchTag(
                    name: $name,
                ) {
                  id
                  tag_title,
                  data
                }
              }
            `,
            variables: {
                name: searchText && searchText.searchText != '' ? searchText.searchText: ''
            }
        };

        let resData = await axios({
            method: 'post',
            url: baseUrl.server,
            data: requestBody,
        }).then(res => {
            return res
        }).catch(err => {
            setResponseData({ responseData: '' });
            return err;
        });
        // console.log("SEARCH RESPONSE", JSON.stringify(resData.data.data.searchTag));
        setResponseData({ responseData: resData.data.data.searchTag ?
                JSON.parse(resData.data.data.searchTag.data):'' });
    }
    console.log("SEARCH RESPONSE",responseData);
    console.log("DATA",responseData != "" && responseData != null 
        && responseData != undefined
    ? responseData:'');
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
                            onChange={(e) => handleSearchText(e)}
                            onKeyPress={(e) => submitSearchText(e)}
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
                <div className="main-app-wrapper">
                    <div className="ticket-body">
                        <SubHeader />
                        <ChartBar />
                        <TicketTable 
                            tableData={
                                responseData && responseData.responseData != '' 
                                    ? responseData.responseData
                                    : data && data.getTicketByAgent !=null ? data.getTicketByAgent:''
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
