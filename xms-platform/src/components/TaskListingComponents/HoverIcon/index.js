import React, {COmponet} from 'react'
import './theme.scss'
import TaskListVerticalEllipse from "../../../assets/icons/task-listing-more-icons/Task list icons/ellipse.svg";
import TaskListLowPriority from "../../../assets/icons/task-listing-more-icons/Task list icons/low-priority-1.svg";
import TaskListOpenTimer from "../../../assets/icons/assets_Task list_2019-11-20/Icon open-timer.svg";
import TaskListExlamation from "../../../assets/icons/task-listing-more-icons/Task list icons/exclamation-circle-1.svg";
import TaskListGroupMessage from "../../../assets/icons/task-listing-more-icons/Task list icons/gorup_message.svg";
import TaskListSubdirectory from "../../../assets/icons/task-listing-more-icons/Task list icons/subdirectory-arrow.svg";
import TaskListLink from "../../../assets/icons/task-listing-more-icons/Task list icons/link-1.svg";
import TaskListBellIcon from "../../../assets/icons/task-listing-more-icons/Task list icons/notifications.svg";
import TaskListBidirection from "../../../assets/icons/task-listing-more-icons/Task list icons/bidirection.svg";
import TaskListAttachment from "../../../assets/icons/task-listing-more-icons/Task list icons/attachment.svg";
import TaskListReportProblem from "../../../assets/icons/assets_Task list_2019-11-20/Icon material-report-problem.svg";
import TaskListProfile from "../../../assets/icons/assets_Task list_2019-11-20/rectangle_profile.png";
import ArrowTooltip from '../../../containers/ToolTip/ToolTip'

 const HoverIcons = props => {
    return (
            <div className="">
                <ArrowTooltip title="Manage Tags" placement="top">
                    <img className="tasks-listing-hover-icons" src={TaskListVerticalEllipse} onClick={props.colorPicker} ></img>
                </ArrowTooltip>
                <ArrowTooltip title="Sub Task" placement="top">
                    <img className="tasks-listing-hover-images" src={TaskListLowPriority}></img>
                </ArrowTooltip>
                <ArrowTooltip title="Progress" placement="top">
                    <img className="tasks-listing-hover-icons" src={TaskListOpenTimer}></img>
                </ArrowTooltip>
                <ArrowTooltip title="Priority" placement="top">
                    <img className="tasks-listing-hover-images" src={TaskListExlamation}></img>
                </ArrowTooltip>
                <ArrowTooltip title="Comments" placement="top">
                    <img className="tasks-listing-hover-icons" src={TaskListGroupMessage} onClick={props.commentToggler}></img>
                </ArrowTooltip>
                <ArrowTooltip title="Dependency" placement="top">
                    <img className="tasks-listing-hover-icons" src={TaskListSubdirectory} onClick={props.dependency}></img>
                </ArrowTooltip>
                <ArrowTooltip title="Link to" placement="top">
                    <img className="tasks-listing-hover-icons" src={TaskListLink} onClick={props.linkWithDrawer}></img>
                </ArrowTooltip>
                <ArrowTooltip title="Remainder" placement="top">
                    <img className="tasks-listing-hover-icons" src={TaskListBellIcon} onClick={props.openHandle}></img>
                </ArrowTooltip>
                <ArrowTooltip title="Repeat" placement="top">
                    <img className="tasks-listing-hover-icons" src={TaskListBidirection}></img>
                </ArrowTooltip>
                <ArrowTooltip title="Attachment" placement="top">
                    <img className="tasks-listing-hover-icons" src={TaskListAttachment} onClick={props.attachment}></img>
                </ArrowTooltip>
                <ArrowTooltip title="Report an issue" placement="top">
                    <img className="tasks-listing-hover-icons" src={TaskListReportProblem}></img>
                </ArrowTooltip>
                <ArrowTooltip title="Assigned" placement="top">
                    <img className="tasks-listing-hover-images" src={TaskListProfile} onClick={props.buttonOne}></img>
                </ArrowTooltip>
            </div>
    )
}
export default HoverIcons;