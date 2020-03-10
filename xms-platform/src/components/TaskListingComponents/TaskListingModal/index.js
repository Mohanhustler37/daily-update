import React from 'react'
import './theme.scss'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import moment from 'moment';
import DatePicker from 'react-date-picker';
import { Scrollbars } from 'react-custom-scrollbars';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const quickCreateIcons = [
    { id: 0, icon: '', title: 'email' },
    { id: 1, icon: '', title: 'sms' },
]

const StyledMenuItem = withStyles(theme => ({
    root: {
    },
}))(MenuItem);


export const RemainderModal = props => {
    return(
        <div className="tsk-rmdr-section">
            <div className="tsk-rmdr-hdr-nm-cls-icn d-flex justify-space-between">
                <p className="tsk-rmdr-hdr-txt">TASK REMAINDERS</p>
                <img src={props.tskRmdrCls} alt="" className="tsk-rmdr-cls-icn" onClick={props.closeHandle}></img>
            </div>
            <div className="tsk-rmdr-daly-stnd-mtng d-flex align-items-center">
                <p className="tsk-rmdr-tak">Task:</p><span className="tsk-rmdr-tak-daly-std">{props.taskRmdrPop}</span>
            </div>
            <div className="tsk-rmd-cal-txt-btn d-flex justify-content-center align-items-center flex-column">
                <img src={props.tskRmdrCldnr} alt="cal" className="tsk-rmdr-cal"></img>
                <p className="no-rmdr-txt">NO REMAINDERS</p>
                <p className="no-rmdr-tsk">There are no remainders on this task yet</p>
                <Button className="tsk-rmd-add-rmd" onClick={props.addRmdrOpn}>Add Remainders</Button>
            </div>
        </div>
    )
}


export const AddRemainderModal = props => {
    return(
        <div className="tsk-rmdr-section">
        <div className="tsk-rmdr-hdr-nm-cls-icn d-flex justify-space-between">
            <p className="tsk-rmdr-hdr-txt">TASK REMAINDERS</p>
            <img src={props.tskRmdrCls} alt="" className="tsk-rmdr-cls-icn" onClick={props.closeHandle}></img>
        </div>
        <div className="tsk-rmdr-daly-stnd-mtng d-flex align-items-center">
            <p className="tsk-rmdr-tak">Task:</p><span className="tsk-rmdr-tak-daly-std" >{props.taskRmdrPopId}</span>
        </div>
        <div>
            <div className='tsk-rmdr-assignTo-dropdown-container'>
                <div className='tsk-rmdr-assignTo-non-library-dropdown'>
                    <div className='tsk-rmdr-selected-item-container'>
                        {props.assignToSelection.length == 0 ? 'Task Remainder' :
                            props.assignToSelection.map(item =>
                                <div className='tsk-rmdr-selected-item-template'>
                                    <img id='avathar-img' src={props.profileIcon} alt='profileIcon' />
                                    <span>{item.firstName} {item.lastName}</span>
                                    <img id='remove-img' src={props.decrementIcon} alt='decrementIcon' onClick={props.assignToCheck(item)} />
                                </div>
                            )}
                    </div>
                    <img className='tsk-rmdr-drop-toggler' src={props.dropdownIcon} alt='dropdownIcon' onClick={props.assignToDrop} />
                </div>

                <div className={`tsk-rmdr-assignTo-custome-dropdown-menu-container ${props.showAssign ? 'tsk-rmdr-assignTo-custome-open-dropdown zIndex' : 'tsk-rmdr-assignTo-custome-close-dropdown'}`} >
                    <div className='assign-to-list-container'>
                        {props.users.map(assignTo => {
                            return (
                                <div className='assign-to-item'>
                                    <div className='assign-item-avatar'>
                                        <img src={props.profileIcon} alt='profileIcon' />
                                        <span>{assignTo.firstName} {assignTo.lastName}</span>
                                        <Checkbox className='avatar-item-checkbox' name='assignToChecked' onChange={props.assignToCheck(assignTo)} checked={props.assignToSelection.includes(assignTo)} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
        <p className="hw-snd-rmdr">When and how will we send the remainder?</p>
        <div className="tsk-rmdr-dte-nd-tym">
            <div className='tsk-rmd-dte-tym'>
                <div id='tsk-dtpckt-btn'>
                    <Button variant="contained" className={'Crt-tsk-custome-button'} onClick={'onClick'}>{props.fromDate ? moment(props.fromDate).format("MMM, DD YYYY") : 'From Date'}</Button>
                    <DatePicker showYearDropdown yearDropdownItemNumber={15} onChange={props.dateChange} value={props.fromDate} clearIcon={null} />
                </div>
                {
                    props.allDay ?
                        (
                            <div className='CT-time-setter'>
                                <Button variant="contained" className={'Crt-tsk-custome-button Crt-tsk-time-btn'} onClick={props.setTimePop}>{props.fromTime ? props.fromTime : 'HH:MM'}</Button>
                                {/* {this.state.isShowFromSetTimePopup ? this.setTimePopup(time, 'fromTime') : null} */}
                                {props.setTimePopup}
                            </div>
                        ) : null
                }

            </div>
            <div className='tsk-rmdr-eml-rmdr-sctn'>
                <div className='tsk-rmdr-eml'>
                    <div className='selected-item-container'>
                        <p>{props.reminderType ? props.reminderType : 'Email Remainder'}</p>
                    </div>
                    <div className="eml-drp-dwn-img">
                        <img src={props.dropdownIcon} onClick={props.quickCreate} />
                    </div>
                </div>
                <div className={`dropdown-menu-container ${props.createQuick ? 'open-dropdown' : 'close-dropdown'}`}>

                    <Scrollbars className="custom-scroll" style={{ height: 160 }}>
                        {
                            quickCreateIcons.map(icon =>
                                <StyledMenuItem className="customized-ticket-list" onClick={props.handleQuick(icon)} onClose={props.closeHandle}>
                                    <div className="quick-create-ticket-one d-flex">
                                        <p>{icon.title}</p>
                                    </div>

                                </StyledMenuItem>
                            )}
                    </Scrollbars>
                </div>
            </div>
        </div>
        <div className="tsk-rmdr-add-btn">
            <Button className="tsk-rmd-add-rmd-btn" onClick={props.lstRmdrOpen}>Add Remainder</Button>
        </div>
    </div>
    )
}

export const ListOfRemainders = props =>{
    return(
        <div className="tsk-rmdr-section">
        <div className="tsk-rmdr-hdr-nm-cls-icn d-flex justify-space-between">
            <p className="tsk-rmdr-hdr-txt">TASK REMAINDERS</p>
            <img src={props.tskRmdrCls} alt="" className="tsk-rmdr-cls-icn" onClick={props.handleClose}></img>
        </div>
        <div className="tsk-rmdr-daly-stnd-mtng d-flex align-items-center">
            <p className="tsk-rmdr-tak">Task:</p><span className="tsk-rmdr-tak-daly-std">{props.tskRmdrPop}</span>
        </div>
        <div>
            <div className="who-whn-hw-section">
                <div className="remind-who">
                    <p>Remind Who?</p>
                </div>
                <div className="remind-whn">
                    <p>When?</p>
                </div>
                <div className="remind-hw">
                    <p>How</p>
                </div>
            </div>
            <div className="users-who-whn-hw-section ">
                {
                    props.reminderData ? props.reminderData.map(users => {
                        if (users.reminderDependecyId == props.id) {
                            return <div className="users-who-whn-hw d-flex">
                                <div className="user-name-profile">
                                    <div className="usr-dtls">
                                        <img src={users.icon}></img>
                                        <span>{users.reminderTitle}</span>
                                    </div>
                                </div>
                                <div className="user-name-dte d-flex">
                                    <p value={users.reminderTime}>{users.reminderTime}</p>
                                </div>
                                <div className="user-name-eml d-flex">
                                    <p value={users.reminderType}>{users.reminderType}</p>
                                    <div className="edit-dlt-btn d-flex">
                                        <img src={props.editIcon} onClick={props.edit(users.id)} ></img>

                                        <img src={props.deleteIcon} onClick={props.delete(users.id)}></img>
                                    </div>

                                </div>

                            </div>
                        }
                    }) : null

                }
                <div className="add-rmdrs-btn">
                    <Button className="add-icn-rmdrs"><img src={props.addRmdrIcn} onClick={props.add} ></img>Add Remainders</Button>
                </div>
            </div>
        </div>
    </div>
    )
}