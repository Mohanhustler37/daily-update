import React, {Component} from "react";
import Fab from '@material-ui/core/Fab';
import "./ButtonRenderer.css";
import TicketListTimeIcon from "../../assets/Icon open-timer.svg";

class ButtonRenderer extends Component{
    constructor(props){
        super(props)
        this.invokeParentMethod = this.invokeParentMethod.bind(this);
    }
    invokeParentMethod() {
        this.props.context.componentParent.methodFromParent(`Row: ${this.props.node.rowIndex}, Col: ${this.props.colDef.headerName}`)
    }
    render(){
        // console.log('thius.props', this.props)
        return(
            // <span><button style={{height: 20, lineHeight: 0.5}}  className="btn btn-info">Invoke Parent</button></span>
            <span className="response-time-button"><Fab><img src={TicketListTimeIcon}></img>{this.props.data.response}</Fab></span>
        )
    }
}
export default ButtonRenderer;
