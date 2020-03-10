import React, { Component } from 'react';
// import "../../../containers/TicketTable/TicketTable.scss";
import './HabitList.scss';

import MainLayout from '../../../containers/MainLayout/MainLayout';
import HabitCollapsable from '../../../containers/TaskTable/HabitCollapsible/HabitCollapsible';
import axios from "axios";

import Header from '../../../containers/Header/Header';
import SubHeader from '../../../containers/SubHeaderNew/SubHeaderNew';
import Fab from '@material-ui/core/Fab';
import readMore from '../../../assets/icons/SVG/Iconawesome-ellipsis-v.svg'
import Button from '@material-ui/core/Button';
import TasksListAddIcon from "../../../assets/icons/01-10-2019/Group 10948.svg";
import TasksListUpArrow from "../../../assets/icons/01-10-2019/Group 10952.svg";
import TasksListEditIcon from "../../../assets/icons/01-10-2019/Icon feather-edit-3.svg";
import TaskListRectangleGray from "../../../assets/icons/01-10-2019/Rectangle 526.svg";
import TaskListRectangleBlue from "../../../assets/icons/01-10-2019/Rectangle 530.svg";
import TaskListAccessTime from "../../../assets/icons/01-10-2019/Icon material-access-time.svg";
import TaskListTag from "../../../assets/icons/01-10-2019/Icon awesome-tags1.svg";
import TaskListExclamation from "../../../assets/icons/01-10-2019/Icon awesome-exclamation-circle1.svg";
import TaskListGroupMessage from "../../../assets/icons/01-10-2019/Group 10951.svg";
import TaskListSubdirectory from "../../../assets/icons/01-10-2019/Icon material-subdirectory-arrow-right.svg";
import TaskListLink from "../../../assets/icons/01-10-2019/Icon feather-link.svg";
import TaskListNotification from "../../../assets/icons/01-10-2019/Icon ionic-ios-notifications-outline.svg";
import TaskListRepeat from "../../../assets/icons/01-10-2019/Icon feather-repeat.svg";
import TaskListAttachment from "../../../assets/icons/01-10-2019/Icon metro-attachment.svg";
import TaskListProfile from "../../../assets/images/profile.png";
import TaskListStarIcon from "../../../assets/icons/01-10-2019/Icon ionic-md-star-outline.svg";
import TaskListRedExclamation from "../../../assets/icons/01-10-2019/Icon awesome-exclamation-circle.svg";
import TasksListPopupEdit from "../../../assets/icons/01-10-2019/Icon feather-edit.svg";
import TasksListPopupAssign from "../../../assets/icons/01-10-2019/Icon material-description.svg";
import TasksListPopupBulk from "../../../assets/icons/01-10-2019/Icon feather-mail.svg";
import TasksListPopupMerge from "../../../assets/icons/01-10-2019/Icon material-call-merge.svg";
import TasksListPopupConvert from "../../../assets/icons/01-10-2019/Icon ionic-ios-options.svg";
import TasksListPopupLink from "../../../assets/icons/01-10-2019/Icon feather-link.svg";
import TasksListPopupDuplicate from "../../../assets/icons/15-10-2019/Icon material-control-point-duplicate.svg";
import TasksListPopupDelete from "../../../assets/icons/01-10-2019/Icon material-delete-sweep.svg";
import CompanyLogo from "../../../assets/icons/01-10-2019/company-logo.svg";
import CompanyEditIcon from "../../../assets/icons/SVG/Iconfeather-edit-3.svg";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItemImage from "../../../assets/images/profile.png";
import gql from "graphql-tag";

import TaskListPlayIcon from "../../../assets/icons/01-10-2019/Icon awesome-play.svg";
import TaskListPauseIcon from "../../../assets/icons/01-10-2019/Icon material-pause-red.svg";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import sidebarToggleIcon from '../../../assets/Sidenavbar-icons/Group 11332.svg';
import profile from "../../../assets/images/profile.png";


import TaskListCriticalButton from "../../../assets/icons/SVG/Ellipse 23.svg";
import TaskListReverseBranch from "../../../assets/icons/15-10-2019/Icon metro-flow-tree.svg";
import { baseUrl } from "../../../constants";
import { getHabitsBacklogData, getHabitsTodayData, getHabitTomorrowData ,GetProjects} from "./habitListQueries";


const imgscr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"

const tasksList = [
    { isCheck: false, taskName: 'Daily Stand-up meeting Daily Stan...',  phase: 'PHASE1', dueDays: '2 DAYS PAST DUE', sevearity: 'Risk', customerType: 'Critical Customer', avatharIcon: imgscr, countDownTime: '00H 00M', countDownActualTime: '01H 59M' },
    { isCheck: true, taskName: 'Matrix1 onboarding process', phase: 'PHASE1', dueDays: '2 DAYS PAST DUE', sevearity: 'Phase1', customerType: 'Critical Customer', avatharIcon: imgscr, countDownTime: '22H 30M', countDownActualTime: '03H 59M' }
]

const demoTags = [
  { id: 1, name: 'RISK' },
  { id: 2, name: 'PHASE1' }
]

const usersList = [
  { id: 0, avatharImg: '', name: 'John doe' },
  { id: 1, avatharImg: '', name: 'Ryan pazos' },
  { id: 2, avatharImg: '', name: 'John doe' },
  { id: 3, avatharImg: '', name: 'Mark' },
  { id: 4, avatharImg: '', name: 'John doe' },
  { id: 5, avatharImg: '', name: 'Ryan pazos' },
  { id: 6, avatharImg: '', name: 'John doe' },
]

let wrapperRef;
class HabitListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateChecked: false,
            isShowPopup: false,
            setShowPopup: false,
            popupId: null,
            updatePopupId: null,
            isTodayPopup: false,
            setTodayPopup: false,
            todayPopupId: null,
            updateTodayPopupId: null,
            isTomorrowPopup: false,
            setTomorrowPopup: false,
            tomorrowPopupId: null,
            updateTomorrowPopupId: null,
            isShowPopupOne: false,
            isShowPopupTwo: false,
            habits: [],
            backlogHabitData: [],
            todayHabitData: [],
            tomorrowHabitData: [],
            projectApiData:[],
            project:[],
            projectName:'',
            prioritylevels:[],
            Tags:[],
            status:[]
            
        }
        
       
       
    
    }
    componentDidMount() {
        this.fetchprioritylevels();
        this.fetchstatus();
        let client = this.props.client;
        getHabitsBacklogData(
            client, 1, backlogData => {
                this.setState({ backlogHabitData: backlogData.data.getBacklogHabit });
            }
            
        );
        getHabitsTodayData(
            client, 1, todayData => {
                this.setState({ todayHabitData: todayData.data.getTodayHabit });
            }
        );
        getHabitTomorrowData(
            client, 1, tomorrowData => {
                this.setState({ tomorrowHabitData: tomorrowData.data.getTomorrowHabit });
            }
        );
        GetProjects(client, projectData => {
            if (this.projectApiData == '' || this.projectApiData == undefined || this.projectApiData == null) {
                this.setState({
                    projectApiData: projectData.data.getAllProjects
                })
            }
        })
        
    }
    fetchprioritylevels = () => {
        const requestBody = {
            query: `
              query {
                priorities {
                    priorityname,
                    description,
                }
              }
            `
        };

        fetch(baseUrl.server, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                let prioritylevels = resData.data.priorities;
                this.setState({ prioritylevels: prioritylevels });
            })

            .catch(err => {
                console.log(err);
            });
    };
    fetchstatus = () => {
        const requestBody = {
            query: `
              query {
                getAllStatus {
                    statusName,
                    statusDescription,
                }
              }
            `
        };

        fetch(baseUrl.server, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                let status = resData.data.getAllStatus;
                this.setState({ status: status });
            })

            .catch(err => {
                console.log(err);
            });
    };

    fetchHabits = () => {
        const requestBody = {
            query: `
              query {
                habitsList {
                    habitTitle,
                    habitDescription,
                    startTime
                }
              }
            `
        };

        fetch(baseUrl.server, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                let habits = resData.data.habitsList;
                this.setState({ habits: habits });
            })
            .catch(err => {
                console.log(err);
            });
    };

    // handleChange=()=>{

    // }

    buttonOneOnCLick = () => {
        this.setState({
            isShowPopupOne: !this.state.isShowPopupOne,
            isShowPopupTwo: false
        })
    }

    showTaskListPopup = (index) => {
        this.setState({ isShowPopup: !this.state.isShowPopup });
        this.setState({ popupId: index })
    };

    showTodayListPopup = (index) => {
        this.setState({ isTodayPopup: !this.state.isTodayPopup });
        this.setState({ todayPopupId: index })
    };

    showTomorrowListPopup = (index) => {
        this.setState({ isTomorrowPopup: !this.state.isTomorrowPopup });
        this.setState({ tomorrowPopupId: index })
    };


  bodySection = () => {
    return (
      <div className="ag-theme-balham">
        {/* <CreateTaskDrawer isOpenCreateTask={this.state.isOpenCreateTask} thisObj={this} /> */}
        {/* <CreateTaskDrawer isCTaskDrawerOpen={this.state.isCTaskDrawerOpen} thisObj={this} /> */}
          <div className='ticket-table-body1  scroll-style1' >
          {/* <Chartbar /> */}
          <div className='ticket-listing-table-section1'>

          <div className="tasks-list-heading"><span>Backlog</span>
                                <div className="tasks-list-heading-right">
                                    <Button className="tasks-list-add-icon">
                                        <img src={TasksListAddIcon}></img>
                                    </Button>
                                    <Button className="tasks-list-up-arrow">
                                        <img src={TasksListUpArrow}></img>
                                    </Button>
                                </div>
                            </div>
                            <div className="tasks-list-status-section">
                                <div className="tasks-list-status">
                                    <p>STATUS</p>
                                </div>
                                <div className="tasks-list-estimated-actual">
                                    <p>Estimated</p>
                                    <p>Actual</p>
                                </div>
                            </div>
                            {
                                this.state.backlogHabitData ? this.state.backlogHabitData.map((habitList, index) => {
                                return (
                                    <div className='tasks-list-task'>
                                        <div className='tasks-list-left-section'>

                                            <img src={TasksListEditIcon}></img>
                                            <img src={tasksList.isCheck ? TaskListRectangleBlue : TaskListRectangleGray}></img>
                                            <span className=''></span>
                                            <div className="tasks-list-task-name-and-time-section">
                                                <p className='tasks-list-task-name'>{habitList.habitTitle}</p>
                                                <div className="tasks-list-time-section">
                                                    <p className='tasks-list-time'>PHASE 1</p>
                                                    <p className='tasks-list-due-days'>{}</p>
                                                </div>
                                            </div>

                                            {
                                                <div className="tasks-list-task-name-hover">
                                                    <div className='tasks-list-name-time'>
                                                        <div className="tasks-list-name-display">
                                                            <div>
                                                                <p className='tasks-list-name'>{habitList.habitTitle}</p>
                                                                <p className="tasks-list-date">{habitList.startTime}</p>
                                                            </div>
                                                           
                                                            <Button className="tasks-list-critical-button">
                                                            {this.state.prioritylevels.map((priorities, index) => {
                                                                return <p value={priorities.id}>{priorities.priorityname}</p>
                                                                 
                                                                })}
                                                                </Button>
                                                                 
                                                        </div>

                                                        <div className="tasks-list-status-progress">
                                                        {this.state.status.map((status, index) => {
                                                                return <p className="status-in-progress" value={status.id}>STATUS : >{status.statusName}</p>
                                                                 
                                                                })}
                                                            <p className="status-in-progress">STATUS : <span>NEW</span> </p>
                                                            <Button className="tasks-list-status-percentage">{habitList.progressPercent}%</Button>
                                                        </div>
                                                        <div className="tasks-list-tags">
                                                            <p className="tasks-list-tags-text">TAGS :</p>
                                                            <div className="tasks-list-tags-section">
                                                                <div className="risk-critical-server">
                                                                    <p className="tasks-list-risk">Risk</p>
                                                                </div>
                                                                <div className="phase-technical">
                                                                    <p className="tasks-list-phase">Phase1</p>
                                                                    <p className="tasks-list-technical">Technical</p>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            }

                                            <span className={`tasks-list-seviarity ${tasksList.sevearity === 'Risk' ? 'risk' : tasksList.sevearity === 'Phase1' ? 'phase1' : null}`}>{tasksList.sevearity}</span>
                                            <span className='tasks-list-customer-type'>{tasksList.customerType}</span>
                                            <div className='icon-show-on-hover'>

                                                <img className="tasks-list-hover-icons" src={tasksList.isCheck ? TaskListAccessTime : TaskListAccessTime} ></img>
                                                <img className="tasks-list-hover-icons" src={tasksList.isCheck ? TaskListRedExclamation : TaskListTag}></img>
                                                <img className="tasks-list-hover-icons" src={tasksList.isCheck ? TaskListProfile : TaskListExclamation}></img>
                                                <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListGroupMessage}></img>
                                                <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListSubdirectory}></img>
                                                <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListLink}></img>
                                                <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListNotification}></img>
                                                <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListRepeat}></img>
                                                <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListAttachment}></img>
                                                <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListReverseBranch} onClick={this.buttonOneOnCLick}></img>
                                                <img className="tasks-list-hover-images" src={tasksList.isCheck ? null : TaskListProfile} ></img>

                                                {
                                                    this.state.isShowPopupOne ? (
                                                        <div className="tasks-button-popup-for-one">
                                                            <div className='tasks-list-company-details'>
                                                                <div className="tasks-list-company-description">
                                                                    <img src={CompanyLogo}></img>
                                                                    <div className="tasks-list-company-text">
                                                                        <p className="tasks-list-company-text-one">Company name</p>
                                                                        <p className="tasks-list-company-text-two">short description</p>
                                                                    </div>
                                                                    <div className="tasks-list-company-details-edit">
                                                                        <img src={CompanyEditIcon}></img>
                                                                    </div>
                                                                </div>
                                                                <div className="tasks-list-department-and-team-name">
                                                                    <p>Department Name</p>
                                                                    <p className="tasks-list-team-name">Team Name</p>
                                                                </div>
                                                                <p className="tasks-list-project-name">Project name</p>

                                                                <div className="tasks-list-field">
                                                                    <FormControl>
                                                                        <InputLabel htmlFor="demo-controlled-open-select"></InputLabel>
                                                                        <div className="tasks-list-assign-to-menu-item">
                                                                            <Select
                                                                                open={this.state.open}
                                                                                onClose={this.handleOpenClose}
                                                                                onOpen={this.handleOpenClose}
                                                                                value={this.state.priority}
                                                                                onChange={e => this.setState({ priority: e.target.value })}
                                                                            >
                                                                                <MenuItem value="">
                                                                                    <em>None</em>
                                                                                </MenuItem>
                                                                                <MenuItem value="1" className="tasks-list-menu-list">
                                                                                    <img src={MenuItemImage}></img>
                                                                                    <div className="task-list-menu-list-name">
                                                                                        <p className="first-text">Assign To</p>
                                                                                        <p className="second-text">John Doe</p>
                                                                                    </div>
                                                                                </MenuItem>
                                                                                <MenuItem value="2" className="tasks-list-menu-list">
                                                                                    <img src={MenuItemImage}></img>
                                                                                    <div className="task-list-menu-list-name">
                                                                                        <p className="first-text">Assign To</p>
                                                                                        <p className="second-text">Rakesh</p>
                                                                                    </div>
                                                                                </MenuItem>
                                                                                <MenuItem value="3" className="tasks-list-menu-list">
                                                                                    <img src={MenuItemImage}></img>
                                                                                    <div className="task-list-menu-list-name">
                                                                                        <p className="first-text">Assign To</p>
                                                                                        <p className="second-text">Rajesh</p>
                                                                                    </div>
                                                                                </MenuItem>
                                                                            </Select>
                                                                        </div>
                                                                    </FormControl>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    ) : null
                                                }

                                            </div>
                                        </div>


                                        <div className='tasks-list-right-section'>
                                            <div className='tasks-list-estimate-timer'>
                                                <Fab
                                                    variant="extended"
                                                    size="small"
                                                    color="primary"
                                                    aria-label="add"
                                                    className={`tasks-list-countdown-button-one ${tasksList.countDownTime === '00H 00M' ? 'gray' : tasksList.countDownTime === '22H 30M' ? 'blue-border' : null}`}>

                                                    {tasksList.countDownTime}
                                                </Fab>
                                            </div>

                                            <div className='tasks-list-actual-timer'>
                                                <Fab
                                                    variant="extended"
                                                    size="small"
                                                    color="primary"
                                                    aria-label="add"
                                                    className={`tasks-list-countdown-button-two ${tasksList.countDownActualTime === '01H 59M' ? 'gray' : tasksList.countDownActualTime === '03H 59M' ? 'red-border' : null}`}>

                                                    <img src={tasksList.isCheck ? TaskListPauseIcon : TaskListPlayIcon}></img>
                                                    {tasksList.countDownActualTime}
                                                </Fab>
                                            </div>

                                            <img src={TaskListStarIcon}></img>
                                            <div className='tasks-list-clicl-more-button'>
                                                <Fab className='task-list-menu' size="small" aria-label="add"

                                                    onClick={() => this.showTaskListPopup(index)}
                                                >
                                                    <img src={readMore} alt="" onClick={'mutate'} />
                                                    {
                                                        this.state.popupId === index && this.state.isShowPopup ? (
                                                            <div className='task-list-popup'>
                                                                <ul>
                                                                    <li className="tasks-list-icon">
                                                                        <i class="fa fa-eye" aria-hidden="true"></i>
                                                                        <span>View details</span>
                                                                    </li>
                                                                    <li className="tasks-list-icon">

                                                                        <img src={TasksListPopupEdit} alt="edit"></img>
                                                                        <span>Edit ticket</span>
                                                                    </li>
                                                                    <li className="tasks-list-icon">

                                                                        <img src={TasksListPopupAssign} alt="edit"></img>
                                                                        <span>Assign / Transfer</span>
                                                                    </li>
                                                                    <li className="tasks-list-icon">

                                                                        <img src={TasksListPopupBulk} alt="edit"></img>
                                                                        <span>Bulk update</span>
                                                                    </li>
                                                                    <li className="tasks-list-icon">

                                                                        <img src={TasksListPopupMerge} alt="edit"></img>
                                                                        <span>Merge</span>
                                                                    </li>
                                                                    <li className="tasks-list-icon">

                                                                        <img src={TasksListPopupConvert} alt="edit"></img>
                                                                        <span>Convert task to habit</span>
                                                                    </li>
                                                                    <li className="tasks-list-icon">

                                                                        <img src={TasksListPopupLink} alt="edit"></img>
                                                                        <span>Link with ticket</span>
                                                                    </li>
                                                                    <li className="tasks-list-icon">

                                                                        <img src={TasksListPopupLink} alt="edit"></img>
                                                                        <span>Link with project</span>
                                                                    </li>
                                                                    <li className="tasks-list-icon">

                                                                        <img src={TasksListPopupLink} alt="edit"></img>
                                                                        <span>Link with project</span>
                                                                    </li>

                                                                    <li className="tasks-list-icon">

                                                                        <img src={TasksListPopupDuplicate} alt="edit"></img>
                                                                        <span>Duplicate</span>
                                                                    </li>
                                                                    <li className="tasks-list-icon">

                                                                        <img src={TasksListPopupDelete} alt="edit"></img>
                                                                        <span>Delete</span>
                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        ) : null
                                                    }

                                                </Fab>


                                            </div>
                                        </div>
                                    </div>
                                )
                            }):''
                            }
                                                

                                                <div className="tasks-list-heading"><span>Today</span>
                                <div className="tasks-list-heading-right">
                                    <Button className="tasks-list-add-icon">
                                        <img src={TasksListAddIcon}></img>
                                    </Button>
                                    <Button className="tasks-list-up-arrow">
                                        <img src={TasksListUpArrow}></img>
                                    </Button>
                                </div>

                            </div>
                            {
                                this.state.todayHabitData ? this.state.todayHabitData.map((tasksList, index) => {
                                    return (
                                        <div className='tasks-list-task'>
                                            <div className='tasks-list-left-section'>
                                                <img src={TasksListEditIcon}></img>
                                                <img src={tasksList.isCheck ? TaskListRectangleBlue : TaskListRectangleGray}></img>
                                                <span className=''></span>
                                                <div className="tasks-list-task-name-and-time-section">
                                                    <p className='tasks-list-task-name'>{tasksList.habitTitle}</p>
                                                    <div className="tasks-list-time-section">
                                                    {
                                           this. projectApiData ? this.projectApiData.this.projectApiData.map(pData => {
                                                return <MenuItem value={pData.id}>{pData.projectName}</MenuItem>
                                            }) : ''
                                        }
                                                     
                                                        <p className='tasks-list-time'>PHASE 1</p>
                                                        <p className='tasks-list-due-days'>DUE DAYS</p>
                                                    </div>
                                                </div>

                                                {
                                                    <div className="tasks-list-task-name-hover">
                                                        <div className='tasks-list-name-time'>
                                                            <div className="tasks-list-name-display">
                                                                <div>
                                                                    <p className='tasks-list-name'>{tasksList.habitTitle}</p>
                                                                    <p className="tasks-list-date">{tasksList.startTime}</p>
                                                                </div>
                                                                <Button className="tasks-list-critical-button">
                                                                    <img src={TaskListCriticalButton}></img>critical
                                                                </Button>
                                                            </div>

                                                            <div className="tasks-list-status-progress">
                                                                <p className="status-in-progress">STATUS : <span>IN PROGRESS</span> </p>
                                                                <Button className="tasks-list-status-percentage">{tasksList.progressPercent}</Button>
                                                            </div>
                                                            <div className="tasks-list-tags">
                                                                <p className="tasks-list-tags-text">TAGS :</p>
                                                                <div className="tasks-list-tags-section">
                                                                    <div className="risk-critical-server">
                                                                        <p className="tasks-list-risk"></p>
                                                                    </div>
                                                                    <div className="phase-technical">
                                                                        <p className="tasks-list-phase">Phase1</p>
                                                                        <p className="tasks-list-technical">Technical</p>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                }

                                                <span className={`tasks-list-seviarity ${tasksList.sevearity === 'Risk' ? 'risk' : tasksList.sevearity === 'Phase1' ? 'phase1' : null}`}>{tasksList.sevearity}</span>
                                                <span className='tasks-list-customer-type'>{tasksList.customerType}</span>
                                                <div className='icon-show-on-hover'>
                                                    <img className="tasks-list-hover-icons" src={tasksList.isCheck ? TaskListAccessTime : TaskListAccessTime} ></img>
                                                    <img className="tasks-list-hover-icons" src={tasksList.isCheck ? TaskListRedExclamation : TaskListTag}></img>
                                                    <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListExclamation}></img>
                                                    <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListGroupMessage}></img>
                                                    <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListSubdirectory}></img>
                                                    <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListLink}></img>
                                                    <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListNotification}></img>
                                                    <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListRepeat}></img>
                                                    <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListAttachment}></img>
                                                    <img className="tasks-list-hover-images" src={tasksList.isCheck ? null : TaskListProfile}></img>
                                                </div>
                                            </div>

                                            <div className='tasks-list-right-section'>

                                                <div className='tasks-list-estimate-timer'>
                                                    <Fab
                                                        variant="extended"
                                                        size="small"
                                                        color="primary"
                                                        aria-label="add"
                                                        className={`tasks-list-countdown-button-one ${tasksList.countDownTime === '00H 00M' ? 'gray' : tasksList.countDownTime === '22H 30M' ? 'blue-border' : null}`}>

                                                        {tasksList.countDownTime}
                                                    </Fab>
                                                </div>

                                                <div className='tasks-list-actual-timer'>
                                                    <Fab
                                                        variant="extended"
                                                        size="small"
                                                        color="primary"
                                                        aria-label="add"
                                                        className={`tasks-list-countdown-button-two ${tasksList.countDownActualTime === '01H 59M' ? 'gray' : tasksList.countDownActualTime === '03H 59M' ? 'red-border' : null}`}>

                                                        <img src={tasksList.isCheck ? TaskListPauseIcon : TaskListPlayIcon}></img>
                                                        {tasksList.countDownActualTime}
                                                    </Fab>
                                                </div>

                                                <img src={TaskListStarIcon}></img>
                                                <div className='tasks-list-clicl-more-button'>



                                                    <Fab className='task-list-menu' size="small" aria-label="add"

                                                        onClick={() => this.showTodayListPopup(index)}
                                                    >
                                                        <img src={readMore} alt="" onClick={'mutate'} />
                                                        {
                                                            this.state.todayPopupId === index && this.state.isTodayPopup ? (
                                                                <div className='today-task-list-popup'>
                                                                    <ul>
                                                                        <li className="tasks-list-icon">
                                                                            <i class="fa fa-eye" aria-hidden="true"></i>
                                                                            <span>View details</span>
                                                                        </li>
                                                                        <li className="tasks-list-icon">

                                                                            <img src={TasksListPopupEdit} alt="edit"></img>
                                                                            <span>Edit ticket</span>
                                                                        </li>
                                                                        <li className="tasks-list-icon">

                                                                            <img src={TasksListPopupAssign} alt="edit"></img>
                                                                            <span>Assign / Transfer</span>
                                                                        </li>
                                                                        <li className="tasks-list-icon">

                                                                            <img src={TasksListPopupBulk} alt="edit"></img>
                                                                            <span>Bulk update</span>
                                                                        </li>
                                                                        <li className="tasks-list-icon">

                                                                            <img src={TasksListPopupMerge} alt="edit"></img>
                                                                            <span>Merge</span>
                                                                        </li>
                                                                        <li className="tasks-list-icon">

                                                                            <img src={TasksListPopupConvert} alt="edit"></img>
                                                                            <span>Convert task to habit</span>
                                                                        </li>
                                                                        <li className="tasks-list-icon">

                                                                            <img src={TasksListPopupLink} alt="edit"></img>
                                                                            <span>Link with ticket</span>
                                                                        </li>
                                                                        <li className="tasks-list-icon">

                                                                            <img src={TasksListPopupLink} alt="edit"></img>
                                                                            <span>Link with project</span>
                                                                        </li>
                                                                        <li className="tasks-list-icon">

                                                                            <img src={TasksListPopupLink} alt="edit"></img>
                                                                            <span>Link with project</span>
                                                                        </li>

                                                                        <li className="tasks-list-icon">

                                                                            <img src={TasksListPopupDuplicate} alt="edit"></img>
                                                                            <span>Duplicate</span>
                                                                        </li>
                                                                        <li className="tasks-list-icon">
                                                                            <img src={TasksListPopupDelete} alt="edit"></img>
                                                                            <span>Delete</span>
                                                                        </li>

                                                                    </ul>
                                                                </div>
                                                            ) : null
                                                        }

                                                    </Fab>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }):''
                            }
                            
                            <div className="tasks-list-heading"><span>Tomorrow</span>
                                <div className="tasks-list-heading-right">
                                    <Button className="tasks-list-add-icon">
                                        <img src={TasksListAddIcon}></img>
                                    </Button>
                                    <Button className="tasks-list-up-arrow">
                                        <img src={TasksListUpArrow}></img>
                                    </Button>
                                </div>

                            </div>

                            {
                                this.state.tomorrowHabitData ? this.state.tomorrowHabitData.map((tasksList, index) => {
                                    return (
                                        <div className='tasks-list-task'>
                                            <div className='tasks-list-left-section'>

                                                <img src={TasksListEditIcon}></img>
                                                <img src={tasksList.isCheck ? TaskListRectangleBlue : TaskListRectangleGray}></img>
                                                <span className=''></span>
                                                <div className="tasks-list-task-name-and-time-section">
                                                    <p className='tasks-list-task-name'>{tasksList.habitTitle}</p>
                                                    <div className="tasks-list-time-section">
                                                        <p className='tasks-list-time'></p>
                                                        <p className='tasks-list-time'>PHASE 1</p>
                                                        <p className='tasks-list-due-days'>DUE DAYS</p>
                                                    </div>
                                                </div>

                                                {
                                                    <div className="tasks-list-task-name-hover">
                                                        <div className='tasks-list-name-time'>
                                                            <div className="tasks-list-name-display">
                                                                <div>
                                                                    <p className='tasks-list-name'>{tasksList.habitTitle}</p>
                                                                    <p className="tasks-list-date">{tasksList.startTime}</p>
                                                                </div>
                                                                <Button className="tasks-list-critical-button">
                                                                    <img src={TaskListCriticalButton}></img>critical
                                                                </Button>
                                                            </div>

                                                            <div className="tasks-list-status-progress">
                                                                <p className="status-in-progress">STATUS : <span>NEW</span> </p>
                                                                <Button className="tasks-list-status-percentage">{tasksList.progressPercent}%</Button>
                                                            </div>
                                                            <div className="tasks-list-tags">
                                                                <p className="tasks-list-tags-text">TAGS :</p>
                                                                <div className="tasks-list-tags-section">
                                                                    <div className="risk-critical-server">
                                                                        <p className="tasks-list-critical">Critical Customer</p>
                                                                    </div>
                                                                    <div className="phase-technical">
                                                                        <p className="tasks-list-phase">Phase1</p>
                                                                        <p className="tasks-list-technical">Technical</p>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>


                                                }
                                                <span className={`tasks-list-seviarity ${tasksList.sevearity === 'Risk' ? 'risk' : tasksList.sevearity === 'Phase1' ? 'phase1' : null}`}>{tasksList.sevearity}</span>
                                                <span className='tasks-list-customer-type'>{tasksList.customerType}</span>
                                                <div className='icon-show-on-hover'>

                                                    <img className="tasks-list-hover-icons" src={tasksList.isCheck ? TaskListAccessTime : TaskListAccessTime} ></img>
                                                    <img className="tasks-list-hover-icons" src={tasksList.isCheck ? TaskListRedExclamation : TaskListTag}></img>
                                                    <img className="tasks-list-hover-icons" src={tasksList.isCheck ? TaskListProfile : TaskListExclamation}></img>
                                                    <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListGroupMessage}></img>
                                                    <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListSubdirectory}></img>
                                                    <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListLink}></img>
                                                    <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListNotification}></img>
                                                    <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListRepeat}></img>
                                                    <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListAttachment}></img>
                                                    <img className="tasks-list-hover-images" src={tasksList.isCheck ? null : TaskListProfile}></img>
                                                </div>
                                            </div>


                                            <div className='tasks-list-right-section'>
                                                <div className='tasks-list-estimate-timer'>
                                                    <Fab
                                                        variant="extended"
                                                        size="small"
                                                        color="primary"
                                                        aria-label="add"
                                                        className={`tasks-list-countdown-button-one ${tasksList.countDownTime === '00H 00M' ? 'gray' : tasksList.countDownTime === '22H 30M' ? 'blue-border' : null}`}>
                                                        {tasksList.countDownTime}
                                                    </Fab>
                                                </div>

                                                <div className='tasks-list-actual-timer'>
                                                    <Fab
                                                        variant="extended"
                                                        size="small"
                                                        color="primary"
                                                        aria-label="add"
                                                        className={`tasks-list-countdown-button-two ${tasksList.countDownActualTime === '01H 59M' ? 'gray' : tasksList.countDownActualTime === '03H 59M' ? 'red-border' : null}`}>
                                                        <img src={tasksList.isCheck ? TaskListPauseIcon : TaskListPlayIcon}></img>

                                                        {tasksList.countDownActualTime}
                                                    </Fab>
                                                </div>
                                                <img src={TaskListStarIcon}></img>
                                                <div className='tasks-list-clicl-more-button'>

                                                    <Fab className='task-list-menu' size="small" aria-label="add"
                                                        onClick={() => this.showTomorrowListPopup(index)}
                                                    >
                                                        <img src={readMore} alt="" onClick={'mutate'} />
                                                        {
                                                            this.state.tomorrowPopupId === index && this.state.isTomorrowPopup ? (
                                                                <div className='tomorrow-task-list-popup'>
                                                                    <ul>
                                                                        <li className="tasks-list-icon">
                                                                            <i class="fa fa-eye" aria-hidden="true"></i>
                                                                            <span>View details</span>
                                                                        </li>
                                                                        <li className="tasks-list-icon">
                                                                            <img src={TasksListPopupEdit} alt="edit"></img>
                                                                            <span>Edit ticket</span>
                                                                        </li>
                                                                        <li className="tasks-list-icon">
                                                                           
                                                                            <img src={TasksListPopupAssign} alt="edit"></img>
                                                                            <span>Assign / Transfer</span>
                                                                        </li>
                                                                        <li className="tasks-list-icon">
                                                                            <img src={TasksListPopupBulk} alt="edit"></img>
                                                                            <span>Bulk update</span>
                                                                        </li>
                                                                        <li className="tasks-list-icon">
                                                                            <img src={TasksListPopupMerge} alt="edit"></img>
                                                                            <span>Merge</span>
                                                                        </li>
                                                                        <li className="tasks-list-icon">
                                                                            <img src={TasksListPopupConvert} alt="edit"></img>
                                                                            <span>Convert task to habit</span>
                                                                        </li>
                                                                        <li className="tasks-list-icon">
                                                                            <img src={TasksListPopupLink} alt="edit"></img>
                                                                            <span>Link with ticket</span>
                                                                        </li>
                                                                        <li className="tasks-list-icon">
                                                                            <img src={TasksListPopupLink} alt="edit"></img>
                                                                            <span>Link with project</span>
                                                                        </li>
                                                                        <li className="tasks-list-icon">
                                                                            <img src={TasksListPopupLink} alt="edit"></img>
                                                                            <span>Link with project</span>
                                                                        </li>

                                                                        <li className="tasks-list-icon">
                                                                            <img src={TasksListPopupDuplicate} alt="edit"></img>
                                                                            <span>Duplicate</span>
                                                                        </li>
                                                                        <li className="tasks-list-icon">
                                                                            <img src={TasksListPopupDelete} alt="edit"></img>
                                                                            <span>Delete</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            ) : null
                                                        }
                                                    </Fab>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : ''
                            }
                        </div>
                        </div>
                        </div>
                   
    );
  }






  render() {
    return <MainLayout secondSidebar={<HabitCollapsable thisObj={this} refreshData={this.refreshData} client={this.props.client} />} bodySection={this.bodySection()}  />
  }
}

export default HabitListing;
