import React, { Component } from "react";
import "./Type.css";

class Type extends Component {
    constructor(props) {
        super(props)
        this.invokeParentMethod = this.invokeParentMethod.bind(this);
    }
    invokeParentMethod() {
        this.props.context.componentParent.methodFromParent(`Row: ${this.props.node.rowIndex}, Col: ${this.props.colDef.headerName}`)
    }
    render() {
        return (
            <p className={`ticket-type ${this.props.data.ticketType == 1 ? "service-request" :
                this.props.data.ticketType == 2 ? "incident" :
                    this.props.data.ticketType == 3 ? "problem" : null} `}
            >

                {this.props.data.ticketType == 1 ? "Service Request" :
                    this.props.data.ticketType == 2 ? "Incident" :
                        this.props.data.ticketType == 3 ? "Problem" : null}
            </p>
        )
    }

}
export default Type;