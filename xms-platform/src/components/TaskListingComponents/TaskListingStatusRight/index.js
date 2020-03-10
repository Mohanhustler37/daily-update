import React from 'react';
import './theme.scss';
import ArrowTooltip from '../../../containers/ToolTip/ToolTip'


const TaskListingStatusRight = props =>{
    // console.log("PROPS IN INdex", props.tagsData);
    return(
        <div className="task-listing-body-header">
            <div className="tasks-listing-more-icon-image">
                <img className="tasks-listing-more-icon" 
                     src={props.tasksListingMoreIcon} alt="editmore"
                />
            </div>
            <div className="tasks-listing-edit-icon-image">
                <ArrowTooltip title="Edit Task" placement="top">
                    <img className="tasks-listing-edit-icon" 
                        src={props.tasksListEditIcon} alt="Edit task"
                        onClick={props.editTask} 
                    />
                </ArrowTooltip>
            </div>

            <img className="tasks-listing-checked-icon" alt="checkedIcon"
                src={props.isCheckedArray ? props.taskListRectangleGreen : props.taskListRectangleGray} 
                onClick={props.checkedBox}
            />   
                <span className=''></span>
            <div className="tasks-listing-task-name-and-time-section">
                <p className='tasks-listing-task-name'>{props.taskData.taskTitle}</p>
                <div className="tasks-listing-time-section">
                    <p className='tasks-listing-time'>PROJECT NAME</p>
                    <p className='tasks-listing-time'>PHASE 1</p>
                    <p className='tasks-listing-due-days'>DUE DAYS</p>
                </div>
            </div>

            {
                <div className="tsks-lstng-tsk-nme-hvr">
                    <div className='tsks-lstng-nme-tme'>
                        <div className="tsks-lstng-nme-dsply">
                            <p className='tsks-lstng-nme'>{props.taskData.taskTitle}</p>
                        </div>
                        <p className="tsks-lstng-dte">{props.startTime} <span>6:30 - 9:30PM</span></p>

                        <div className="tsks-lstng-sttus-prgrs">
                            
                            <p className="tsks-lstng-stts-in-prgrs">STATUS :
                            {
                                props.statusNameData ?
                                    props.statusNameData.map(status => {
                                        if (status.id == props.taskData.statusId) return <span>{status.statusName}</span>
                                    })
                                    : <span>not found</span>
                            } 
                            </p>
                        </div>
                        
                        <div className="tsks-lstng-tgs">
                            <p className="tsks-lstng-tgs-txt">TAGS :</p>
                            <div className="tsks-lstng-tgs-sctn">
                                <div className="rsk-crticl-srvr">
                                    {
                                        props.tagsData ? props.taskData.tags != null ? props.taskData.tags.length > 0 ?
                                        props.tagsData.map(tag => {
                                                if (props.taskData.tags.includes(tag.id)) return <div style={{ backgroundColor: tag.color + "30", color: tag.color }}>
                                                    <p >{tag.tagTitle}</p>
                                                </div>
                                            }) : null : null
                                            : <p className="tsks-lstng-crtcal-txt">No Tags</p>
                                    } 
                                    <img src={props.taskListVerticalEllipse} 
                                         alt="" className="tsk-lstng-pop-tgs-img"></img>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            }
            <span className={`tasks-listing-seviarity ${props.taskData.sevearity === 'Risk' ? 'risk' : props.taskData.sevearity === 'Phase1' ? 'phase1' : null}`}>{props.taskData.sevearity}</span>
            <span className='tasks-listin-customer-type'>{props.taskData.customerType}</span>
        </div>
    )
}

export default TaskListingStatusRight;