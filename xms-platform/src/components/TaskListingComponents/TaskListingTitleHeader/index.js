import React from 'react';
import './theme.scss';
import Button from '@material-ui/core/Button';
import ArrowTooltip from '../../../containers/ToolTip/ToolTip'

const TaskListingTitleHeader = props =>{
    return(
            <div className="tasks-listing-heading-right">
                <Button className="tasks-listing-add-icon">
                    <ArrowTooltip title="Add Task" placement="top">
                        <img className="tsk-lstng-add-icn" src={props.tasksListingAddIcon} onClick={props.ctaskDrawerOpen} alt="addIcon"></img>
                    </ArrowTooltip>
                </Button>
                <Button className="tasks-listing-up-arrow">
                    <ArrowTooltip title="Collapse" placement="top">
                        <img className="tsk-lstng-arw" src={props.collapse ? props.tasksListingDownArrow : props.tasksListingUpArrow} alt="arrow" onClick={props.listOpen}></img>
                    </ArrowTooltip>
                </Button>
            </div>
    )
}
export default TaskListingTitleHeader;
