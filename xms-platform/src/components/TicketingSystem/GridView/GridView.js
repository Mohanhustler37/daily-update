import React, { Component } from 'react';
//import SubHeader from "../SubHeader/SubHeader";
import ChartBar from "../ChartBar/ChartBar";
// import TicketTable from "./AgentTable";
import GridTable from "./GridTable";
import './GridView.scss';

class GridView extends Component {
    render() {
        return (
            <div className="ticketing-system-page" >
                <div className="ticket-body">
                    {/* <SubHeader /> */}
                    {/* <ChartBar /> */}
                    <GridTable
                        client={this.props.client}
                    />
                </div>
            </div>
        );
    }
}

export default GridView;