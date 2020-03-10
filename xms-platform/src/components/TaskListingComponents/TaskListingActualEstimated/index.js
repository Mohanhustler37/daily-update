import React from 'react'
import './theme.scss'
import StopWatch from "../../../components/TicketingSystem/TasksList/StoperWatch/StopWatch";
import Fab from '@material-ui/core/Fab';

const TaskListingActualEstimate = props => {
    return(
            <div className="tsk-lstng-tmr">
                <div className='tasks-listing-estimate-timer'>
                    <Fab className={`tasks-listing-countdown-button-one ${props.taskData.countDownTime === '00H 00M' ? 'gray' : props.taskData.countDownTime === '22H 30M' ? 'blue-border' : null}`}>
                        <p className="tasks-listing-estimate-timer-value">{props.progressEstimatedTime}</p>
                    </Fab>
                </div>

                <div className='tasks-listing-actual-timer'>
                    <StopWatch taskId={props.taskData.id} data={props.taskData.taskHours} />
                </div>
            </div>
    )
}
export default TaskListingActualEstimate;