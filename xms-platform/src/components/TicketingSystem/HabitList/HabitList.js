import React, { Component } from 'react';
import './HabitList.scss';
import MainLayout from '../../../containers/MainLayout/MainLayout';
import HabitCollapsible from '../../../containers/TaskTable/HabitCollapsible/HabitCollapsible';
import axios from "axios";
import Header from '../../../containers/Header/Header';
import SubHeader from '../../../containers/SubHeaderNew/SubHeaderNew';
import Button from '@material-ui/core/Button';
import TaskListProfile from "../../../assets/images/profile.png";
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import CreateHabitDrawer from '../../../components/CreateHabitDrawer/CreateHabitDrawer';
import { baseUrl } from "../../../constants";
import { 
    getHabitsBacklogData, 
    getHabitsTodayData, 
    getHabitTomorrowData ,
    GetProjects,
    getAllPriority,
    getAllStatus,
    getAllHabits,
    assignUserHabit,
    addReminderMutation,
    deleteReminderMutation,
    getAllReminder,

} from "./habitListQueries";
import{ getAllUsers } from "../../CreateHabitDrawer/createHabitQuery"
//import TaskCommentsDrawer from '../../../containers/NewTaskListing/TaskCommentsDrawer/TaskCommentsDrawer';
import maskGroup1 from "../../../assets/images/MaskGroup.png";
import groupIcon from "../../../assets/icons/SVG/group-11507.svg";
import notificationIcon from "../../../assets/icons/SVG/icon-ionic-ios-notifications-outline.svg";
import optionIcon from "../../../assets/icons/SVG/icon-awesome-ellipsis-v.svg";
import featherRepeadtIcon from "../../../assets/icons/SVG/group-10943.svg";
import rigthTickIcon from "../../../assets/icons/SVG/group-11918.svg";
import rectangleProfile from "../../../assets/icons/assets_Task list_2019-11-20/rectangle_profile.png";
import ReactApexChart from "react-apexcharts";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Box from "@material-ui/core/Box";
import history from "../../../Routes/history";
import Checkbox from '@material-ui/core/Checkbox';
import { Scrollbars } from 'react-custom-scrollbars';
import HabitsCommentsDrawer from './HabitsCommentsDrawer/HabitsCommentsDrawer'
import searchIcon from '../../../assets/Sidenavbar-icons/Icon feather-search-small.svg'
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import TskRmdrCls from "../../../assets/icons/assets_Task list_2019-11-20/Tsk_lst_tgs/Icon ionic-ios-close.svg";
import TskRmdrCal from "../../../assets/icons/assets_Task list_2019-11-20/Tsk_lst_tgs/Icon metro-calendar.svg";
import profileIcon from '../../../assets/profile.png';
import decrementIcon from '../../../assets/icons/SVG/Group 11399.svg';
import EditIcon from "../../../assets/icons/task/Group 11531.svg";
import DeleteIcon from "../../../assets/icons/task/DeleteIcon.svg";
import AddRmdrIcn from '../../../assets/icons/assets_Task list_2019-11-20/Tsk_lst_tgs/Icon feather-plus.svg';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import dropdownIcon from '../../../assets/icons/01-10-2019/Icon ionic-md-arrow-dropdown.svg'
import starIcon from "../../../assets/icons/SVG/icon-material-star.svg";



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
const quickCreateIcons = [
    {id: 0, icon: '', title: 'email'},
    {id: 1, icon: '', title: 'sms'},
  ]

  let time = ['12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM']

  const StyledMenuItem = withStyles(theme => ({
    root: {
        // '&:focus': {
        //   backgroundColor: theme.palette.primary.main,
        //   '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        //     color: theme.palette.common.white,
        //   },
        // },
    },
}))(MenuItem);
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
            isShowStarIcon: true,
            habits: [],
            isTicketTypeDropdown:false,
            backlogHabitData: [],
            todayHabitData: [],
            tomorrowHabitData: [],
            projectApiData:[],
            project:[],
            projectName:'',
            prioritylevels:[],
            Tags:[],
            status:[],
            habitweekly:[],
            assignedUser:0,
            allStatusTickets: [],
            users:[],
            reminderData:[],
            assignToSelection: [],
            fromDate: new Date(),
            isShowTaskRemainderModal: false,
            modalOpen: false,
            addRmdrModalOpen: false,
            isShowAllStatusTkts: false,
            taskRmdrPopId: null,
            id:null,
            reminderTime: '',
            frequency:[],
            isshowaddreminderPopUp: false,
            options: {
                plotOptions: {
                  radialBar: {
                    hollow: {
                      size: '60%',
                      background: '#fff',
                      position: 'front',
                      strokewidth: '10px',

                    },
                     dataLabels: {
                      name: {
                        offsetY: -10,
                        show: true,
                        color: '#c8c8c8',
        

                      },
                      value: {
                          offsetY: 5,
                          formatter: function(val) {
                              return val
                          }
                      }
                    }
                  }
                },
                fill: {
                  type: 'gradient',
                  gradient: {
                    type: 'horizontal',
                    gradientToColors: ['#ffb300'],
                    inverseColors: false,
                    stops: [0, 0],
                  }
                },
                stroke: {
                  lineCap: 'round'
                },
                labels: ['TODAY'],
              },
              series: [50],

            }   
        
     }

     handleDropdownClose = e => {
        e.stopPropagation();
        this.setState({ isTicketTypeDropdown: !this.state.isTicketTypeDropdown });
      };

      setWrapperRef = node => (wrapperRef = node);

     dateChangeHandler = (date, dateType) => {
        this.setState({ [dateType]: date })
    }
    setTimePopup = (time, timeType) => (
        <div className='CT-set-time-popup' ref={this.setWrapperRef}>
            <Scrollbars className='time-scroll-container'>
                {time.map(timeToSet => <li onClick={() => {
                    if (timeType == "fromTime") {
                        if (this.state.fromDate) {
                            var fromdateHere = new Date(this.state.fromDate)
                            fromdateHere.setHours(fromdateHere.getHours() + parseInt(timeToSet));
                            this.setState({ fromDate: fromdateHere })
                            this.state.fromDate = null
                        }
                    } else {
                        if (this.state.toDate) {
                            var todateHere = new Date(this.state.toDate)
                            todateHere.setHours(todateHere.getHours() + parseInt(timeToSet));
                            this.setState({ toDate: todateHere })

                        }
                    }
                    this.setState({ [timeType]: timeToSet, isShowFromSetTimePopup: false, isShowToSetTimePopup: false })
                }}>{timeToSet}</li>)}
            </Scrollbars>
        </div>
    )
     iscommentToggler=(id) =>{
      this.setState({ selectedHabitcomment:id,isHabitsCommentsDrawerOpen: !this.state.isHabitsCommentsDrawerOpen })
    }
    buttonOneOnCLick = (index, userId) => {
        this.setState({ isShowPopupOne: !this.state.isShowPopupOne });
        this.setState({ popId: index, assignedUser: userId, popUpForTask: index })
    }

    //  progressBarHeigthHandler =(windowHeight) => {

    //     if(windowHeight >= 720 && windowHeight <= 1024) {
    //         return windowHeight -500;
    //     } 
    //     else if( windowHeight >= 1024 && windowHeight <= 1100){
    //         return windowHeight -500;
    //     }
    //     else if( windowHeight >= 1100 && windowHeight <= 1300){
    //         return windowHeight - 500;
            
    //     }
    //   }
    
   
    componentDidMount() {
        const token = localStorage.getItem('jwtToken');
        if (token === null || token === undefined || token === '') {
            history.push('/');
        }
     //   this.fetchhabitgoal();
     this.fetchReminder();
        this.fetchprioritylevels();
        this.fetchstatus();
        this.fetchHabits();
        let client = this.props.client;
        getHabitsBacklogData(
            client, backlogData => {
                this.setState({ backlogHabitData: backlogData.data.getBacklogHabit });
            }
            
        );
        // getHabitsTodayData(
        //     client, 1, todayData => {
        //         this.setState({ todayHabitData: todayData.data.getTodayHabit });
        //     }
        // );
        // getHabitTomorrowData(
        //     client, 1, tomorrowData => {
        //         this.setState({ tomorrowHabitData: tomorrowData.data.getTomorrowHabit });
        //     }
        // );
        GetProjects(client, projectData => {
            if (this.projectApiData == '' || this.projectApiData == undefined || this.projectApiData == null) {
                this.setState({
                    projectApiData: projectData.data.getAllProjects
                })
            }
        })

        getAllUsers(client,res=>{
            this.setState({ users: res.data.getAllUsers })
            return res
        })
        
    }
    refreshData = (data) => {    
         this.setState({ habits: data }) } 

    fetchprioritylevels = () => {
        const client = this.props.client;
        getAllPriority(client,res=>{
            let prioritylevels = res.data.priorities;
            this.setState({ prioritylevels: prioritylevels });
        })
    };
    fetchstatus = () => {
        const client = this.props.client;
        getAllStatus(client,res=>{
            let status = res.data.getAllStatus;
            this.setState({ status: status });
        })
    };

    fetchHabits = () => {
        const client = this.props.client;
        getAllHabits(client,res=>{
            let habits = res.data.habitsList;
            this.setState({ habits: habits });
        })
    };


    // buttonOneOnCLick = () => {
    //     this.setState({
    //         isShowPopupOne: !this.state.isShowPopupOne,
    //         isShowPopupTwo: false
    //     })
    // }

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
    
  
 
    handleChangeAssignTo = async (data,  user) => {
        await this.setState({ assignedUser: user });
        const client = this.props.client;
        let variables = {
            id: data,
            assignTo: user,
            assignBy:user
        }
        assignUserHabit(client,variables,res=>{
            return res;
        })
    };

    
    fetchReminder = () => {
        const client = this.props.client;
        getAllReminder(client,res=>{
            let reminderData = res.data.remonderList;
            this.setState({ reminderData: reminderData });
        })


        // const requestBody = {
        //     query: `
        //   query remonderList
        //      {
        //         remonderList{
        //       id,
        //       reminderType,
        //       reminderTitle,
        //       reminderTime,
        //       reminderDependecyId
        //       }
        //     }
        //   `
        // };

        // axios({
        //     method: 'post',
        //     url: baseUrl.server,
        //     data: requestBody,
        //     headers: {
        //         'Content-type': 'application/json'
        //     }
        // }).then(resData => {
        //     let reminderData = resData.data.data.remonderList;
        //     this.setState({ reminderData: reminderData });
        // })
        //     .catch(err => {
        //         console.log(err);
        //     });
    };
    handleOpen = (index,id) => {
   //  alert(JSON.stringify(id));
        this.setState({
            modalOpen: !this.state.modalOpen,
            isShowTaskRemainderModal: true,
            taskRmdrPopId: index,
            id:id
        });
      };

    handleClose = () => {
        this.setState({ isShowTaskRemainderModal: false, addRmdrModalOpen: false, listRmdrModalOpen: false, modalOpen: false });
    };
    showaddreminderListPopup = () => {
        this.setState({ isshowaddreminderPopUp: true })
    }
    addreminder=(index,id)  =>{
           this.setState({
            listRmdrModalOpen: !this.state.listRmdrModalOpen,
            addRmdrModalOpen: true,
            taskRmdrPopId: index,
            id:id
        });
      }
      addRmdrOpen = async (index,id) => {
        // this.setState({ isShowAddRemainderPopup: true })  
        this.setState({
            addRmdrModalOpen: !this.state.addRmdrModalOpen,
            isShowTaskRemainderModal: false,
            taskRmdrPopId: index,
            id:id
        });
    };

      listRmdrOpen = async (index,id) => {
        // this.setState({ isShowAddRemainderPopup: true })  
        const client = this.props.client;
        let variables = {
            reminderTitle: this.state.taskRmdrPopId,
            reminderDependecyId: this.state.id,
            reminderType:this.state.reminderType,
            reminderTime:this.state.fromDate,
            reminderFor:"habits"
        }
        this.setState({
            listRmdrModalOpen: !this.state.listRmdrModalOpen,
            addRmdrModalOpen: false,
            taskRmdrPopId: index,
            id:id
        });

        addReminderMutation(client,variables,res => {
            return res;
        })
      };
      arrayToAssign = [];

    assignToCheck = (data) => {

        if (this.arrayToAssign.includes(data)) {
            let index = this.arrayToAssign.indexOf(data)
            this.arrayToAssign.splice(index, 1);
        } else {
            this.arrayToAssign.push(data)
        }
        this.setState({ assignToSelection: this.arrayToAssign })
    }
      quickHandleClick=(icon)=>{
          this.setState({reminderType:icon.title})
    
      }
      deletereminder=(id)=>{
        this.setState({ismanagerPopUp:true})
        const client = this.props.client;
        let variables = {
            id:id,
            reminderDependecyId: this.state.reminderDependecyId,
            reminderType:this.state.reminderType,
            reminderTime:this.state.reminderTime,
        }

        deleteReminderMutation(client,variables,res=>{
            this.arrayRem = this.state.reminderData
            if(this.arrayRem.length!=0){
                let index = this.arrayRem.indexOf(res.data.removereminder)
                this.arrayRem.splice(index,1);
            }
            this.setState({reminderData:this.arrayRem})
            return res;
        })    
    }
      taskRemainderModelBody =(id,taskId)=> {
         return (
             <div className="tsk-rmdr-section">
                 <div className="tsk-rmdr-hdr-nm-cls-icn d-flex justify-space-between">
                     <p className="tsk-rmdr-hdr-txt">HABIT REMAINDERS</p>
                     <img src={TskRmdrCls} alt="" className="tsk-rmdr-cls-icn" onClick={this.handleClose}></img>
                 </div>
                 <div className="tsk-rmdr-daly-stnd-mtng d-flex align-items-center">
                     <p className="tsk-rmdr-tak">Habits:</p><span className="tsk-rmdr-tak-daly-std">{id}</span>
                 </div>
                 <div className="tsk-rmd-cal-txt-btn d-flex justify-content-center align-items-center flex-column">
                         <img src={TskRmdrCal} alt="cal" className="tsk-rmdr-cal"></img>
                         <p className="no-rmdr-txt">NO REMAINDERS</p>
                         <p className="no-rmdr-tsk">There are no remainders on this Habits yet</p>
                         <Button className="tsk-rmd-add-rmd" onClick={() => this.addRmdrOpen(id,taskId)}>Add Remainders</Button>
                     </div>
                 </div>
     
             )
         }
     
         addRemainderModalBody = (tasksList,id) => {
           //  alert(JSON.stringify(id));
             return (
                 <div className="tsk-rmdr-section">
                     <div className="tsk-rmdr-hdr-nm-cls-icn d-flex justify-space-between">
                         <p className="tsk-rmdr-hdr-txt">HABIT REMAINDERS</p>
                         <img src={TskRmdrCls} alt="" className="tsk-rmdr-cls-icn" onClick={this.handleClose}></img>
                     </div>
                     <div className="tsk-rmdr-daly-stnd-mtng d-flex align-items-center">
                         <p className="tsk-rmdr-tak">Habits:</p><span className="tsk-rmdr-tak-daly-std" value={tasksList} >{tasksList}</span>
                     </div>
                     <div>
                         <div className='tsk-rmdr-assignTo-dropdown-container'>
                             <div className='tsk-rmdr-assignTo-non-library-dropdown'>
                                 <div className='tsk-rmdr-selected-item-container'>
                                     {this.state.assignToSelection.length == 0 ? 'Habit Remainder' :
                                         this.state.assignToSelection.map(item =>
                                             <div className='tsk-rmdr-selected-item-template'>
                                                 <img id='avathar-img' src={profileIcon} alt='profileIcon' />
                                                 <span>{item.firstName} {item.lastName}</span>
                                                 <img id='remove-img' src={decrementIcon} alt='decrementIcon' onClick={() => this.assignToCheck(item)} />
                                             </div>
                                         )}
                                 </div><img className='tsk-rmdr-drop-toggler' src={dropdownIcon} alt='dropdownIcon' onClick={() => this.setState({ isShowAssignToDrop: !this.state.isShowAssignToDrop })} />
                             </div>
     
                             <div className={`tsk-rmdr-assignTo-custome-dropdown-menu-container ${this.state.isShowAssignToDrop ? 'tsk-rmdr-assignTo-custome-open-dropdown zIndex' : 'tsk-rmdr-assignTo-custome-close-dropdown'}`} ref={this.setWrapperRef} >
                                 <div className='assign-to-list-container'>
                                     {this.state.users.map(assignTo => {
                                         return (
                                             <div className='assign-to-item'>
                                                 <div className='assign-item-avatar'>
                                                     <img src={profileIcon} alt='profileIcon' />
                                                     <span>{assignTo.firstName} {assignTo.lastName}</span>
                                                     <Checkbox className='avatar-item-checkbox' name='assignToChecked' onChange={() => this.assignToCheck(assignTo)} checked={this.state.assignToSelection.includes(assignTo)} />
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
                                 <Button variant="contained" className={'Crt-tsk-custome-button'} onClick={'onClick'}>{this.state.fromDate ? moment(this.state.fromDate).format("MMM, DD YYYY") : 'From Date'}</Button>
                                 <DatePicker showYearDropdown yearDropdownItemNumber={15} onChange={(date) => this.dateChangeHandler(date, 'fromDate')} value={this.state.fromDate} clearIcon={null} />
                             </div>
                             {
                                 !this.state.isAllDay ?
                                     (
                                         <div className='CT-time-setter'>
                                             <Button variant="contained" className={'Crt-tsk-custome-button Crt-tsk-time-btn'} onClick={() => this.setState({ isShowFromSetTimePopup: !this.state.isShowFromSetTimePopup })}>{this.state.fromTime ? this.state.fromTime : 'HH:MM'}</Button>
                                             {this.state.isShowFromSetTimePopup ? this.setTimePopup(time, 'fromTime') : null}
                                         </div>
                                     ) : null
                             }
     
                         </div>
                         <div className='tsk-rmdr-eml-rmdr-sctn'>
                             <div className='tsk-rmdr-eml'>
                                 <div className='selected-item-container'>
                                     <p>{this.state.reminderType ? this.state.reminderType : 'Email Remainder'}</p>
                                 </div>
                                 <div className="eml-drp-dwn-img">
                                     <img src={dropdownIcon} onClick={() => this.setState({ isQuickCreateDropdown: !this.state.isQuickCreateDropdown })} />
                                 </div>
                             </div>
                             <div className={`dropdown-menu-container ${this.state.isQuickCreateDropdown ? 'open-dropdown' : 'close-dropdown'}`} ref={this.setWrapperRef}>
                                
                                 <Scrollbars className="custom-scroll" style={{ height: 160 }}>
                                     {
                                         quickCreateIcons.map(icon =>
                                             <StyledMenuItem className="customized-ticket-list" onClick={() => this.quickHandleClick(icon)} onClose={this.handleClose}>
                                                 <div className="quick-create-ticket-one d-flex">
                                                     {/* <img src={icon.icon} alt='icon'/> */}
                                                     <p>{icon.title}</p>
                                                 </div>
     
                                             </StyledMenuItem>
                                         )}
                                 </Scrollbars>
                             </div>
                         </div>
                     </div>
                     <div className="tsk-rmdr-add-btn">
                         <Button className="tsk-rmd-add-rmd-btn" onClick={() => this.listRmdrOpen(tasksList,id)}>Add Remainder</Button>
                     </div>
                 </div>
             )
         }
     
       
       listOfTskRemainders=(tasksList,id)=> {
         return(
           <div className="tsk-rmdr-section">
           <div className="tsk-rmdr-hdr-nm-cls-icn d-flex justify-space-between">
               <p className="tsk-rmdr-hdr-txt">HABIT REMAINDERS</p>
               <img src={TskRmdrCls} alt="" className="tsk-rmdr-cls-icn" onClick={this.handleClose}></img>
           </div>
           <div className="tsk-rmdr-daly-stnd-mtng d-flex align-items-center">
               <p className="tsk-rmdr-tak">Habits:</p><span className="tsk-rmdr-tak-daly-std">{tasksList}</span>
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
                 this.state.reminderData ? this.state.reminderData .map(users => {
                               if(users.reminderDependecyId== id){
                        return<div className="users-who-whn-hw d-flex">
                                   <div className="user-name-profile">
                                       <div className="usr-dtls">
                                           <img src={users.icon}></img>
                                           <span>{users.reminderTitle}</span>
                                       </div>
                                   </div>
                                   <div className="user-name-dte d-flex">
                                       <p value= {users.reminderTime}>{users.reminderTime}</p>
                                   </div>
                                   <div className="user-name-eml d-flex">
                                       <p value={users.reminderType}>{users.reminderType}</p>
                                       <div className="edit-dlt-btn d-flex">
                                       <img src={EditIcon} onClick={() => this.editreminder(users.id)} ></img>
                               
                                           <img src={DeleteIcon} onClick={() => this.deletereminder(users.id)}></img>
                                       </div>
                                   
                                   </div> 
     
                               </div>
                 }
                    }):null
               }
               <div className="add-rmdrs-btn">
                   <Button className="add-icn-rmdrs"><img src={AddRmdrIcn} onClick={(e) => this.addreminder(e)} ></img>Add Remainders</Button>
               </div>
               </div>
           </div>
       </div>
         )
     }
  
  bodySection = () => {
    let { isShowTaskRemainderModal, addRmdrModalOpen, listRmdrModalOpen } = this.state;
    return ( 
      <div className="ag-theme-balham">
       { this.state.isOpenCreateHabit ? <CreateHabitDrawer isOpenCreateHabit={this.state.isOpenCreateHabit} thisObj={this} /> : null }
       { this.state.isHabitsCommentsDrawerOpen?<HabitsCommentsDrawer isHabitsCommentsDrawerOpen={this.state.isHabitsCommentsDrawerOpen} selectedcomment={this.state.selectedHabitcomment} thisObj={this}/>:null }
        <Header />
        <SubHeader  />
          <div className='ticket-table-body1  scroll-style1'  onClick={this.handleDropdownClose}>
          <div className='ticket-listing-table-section1'>
          

                        
{/* ------------------------------Anusha's Code--------------------------------------------- */}


    <div className='hbt-lstng-cmpnt'>
{ 
    
this.state.habits  ? this.state.habits.map((listAll) => {
    let frequency1=listAll.frequency;
  //  let frequencyCount=listAll.frequency.length;
    let count=listAll.habitCount;
    return(
            <div className="habit-table-listing">
                 <div className="habit-left-section-listing">
                    <img src={rigthTickIcon} alt="edit" className="righttick-image"></img>
                    <img src={maskGroup1} alt="edit" className="mask-group-image"></img>
                     <div class="habit-left-section-text">
                        <div className="habit-left-section-uppertext">
                           <p>{listAll.habitTitle}</p>
                        </div>
                        <div className="habit-left-section-lowersection">
                          <p className="habit-risk-text">Risk</p>
                          {/* <p className="habit-phase-text">PHASE1</p> */}
                          {/* <button className="habit-left-section-number">2+</button> */}
                          <img src={groupIcon} alt="edit" className="habit-left-section-lowersection-icons" onClick={()=>this.iscommentToggler(listAll.habitTitle)}></img>
                          <img src={notificationIcon} alt="edit" className="habit-left-section-lowersection-icons" onClick={()=>this.handleOpen(listAll.habitTitle,listAll.id)}></img>
                          <div className="habit-left-section-lowersection-profile-icons">
                          <img src={featherRepeadtIcon} alt="edit" className="habit-left-section-lowersection-icons" ></img>
                          <img src={rectangleProfile} alt="edit" className="profile-img" onClick={()=>this.buttonOneOnCLick(listAll.id,listAll.assignTo)} ></img>
                                {/* <img className="tasks-listing-hover-images" src={listAll.isCheck ? null : TaskListProfile} onClick={()=>this.buttonOneOnCLick(listAll.id,listAll.assignTo)}></img> */}
                                {
                                                    this.state.popId === listAll.id && this.state.isShowPopupOne ? (
                                                        <div className="habits-lstng-assgn-ppup-fr-one">
                                                            {/* <img className="top-left-arrow" src={TopLeft} alt=""></img> */}
                                                            <div className='habits-lstng-assgn-dtails'>
                                                                <p className="habits-lstng-assgn-dtls-hdr-txt">ASSIGN/TRANSFER</p>
                                                                <div className="habits-lstng-assgn-srchbr">
                                                                    <TextField name="searchOption" className='sidebar-search-field' placeholder='Search Habits' variant="outlined" />
                                                                    <img className="habits-lstng-srch-icn" src={searchIcon} alt='searchIcon' />
                                                                </div>
                                                                <div className="habits-lstng-asgn-prfle">
                                                                    <Scrollbars className="custom-scroll">
                                                                        <ul className="habits-lstng-assgn-popup-prfl-lst">

                                                                            {
                                                                                
                                                                                this.state.users != null || this.state.users != undefined ?
                                                                                    this.state.users.map(user => {
                                                                                        return <li className="habits-lstng-assgn-menu d-flex justify-space-between">

                                                                                            <div className="habits-lst-prfl-name d-flex align-items-center">
                                                                                                <img className="menu-profile" src={TaskListProfile} alt=""></img>
                                                                                                <p className="profile-name">{user.firstName} {user.lastName}</p>
                                                                                            </div>
                                                                                            <div className="habits-lstng-chck-bx">
                                                                                                <Checkbox
                                                                                                    className="habits-lstng-asgn-chckbx"
                                                                                                    onChange={() => this.handleChangeAssignTo(listAll.id, user.id)}
                                                                                                    value={user.id}
                                                                                                    checked={this.state.assignedUser == user.id}
                                                                                                    inputProps={{
                                                                                                        'aria-label': 'primary checkbox',
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        </li>
                                                                                    }) : null

                                                                            }

                                                                        </ul>
                                                                    </Scrollbars>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    ) : null
                                                }
                                                               {
                                                    <Modal
                                                        className="tsk-rmd-mdl"
                                                        aria-labelledby="simple-modal-title"
                                                        aria-describedby="simple-modal-description"
                                                        open={this.state.modalOpen}
                                                        onClose={this.handleClose}
                                                    >
                                                        <div className="tsk-rmdr-paper">
                                                        {isShowTaskRemainderModal ? this.taskRemainderModelBody(this.state.taskRmdrPopId,this.state.id) : null}
                                                            {addRmdrModalOpen ? this.addRemainderModalBody(this.state.taskRmdrPopId,this.state.id) : null}
                                                            {listRmdrModalOpen ? this.listOfTskRemainders(this.state.taskRmdrPopId,this.state.id) : null}
                                                  
                                                        </div>
                                                    </Modal>
                                                }
                          </div>
                        </div>
                    </div>
                </div>

                 <div className="habit-right-section-listing">
                    <div className="habit-right-section-one">
                        <div className="habit-right-section-upperone">
                            <p className="habit-right-section-upperone-number">6</p>
                            <p className="habit-right-section-upperone-text">DAYS <br/>A WEEK</p>
                        </div>  
                        <div className="habit-right-section-lowerone">
                             <p className="habit-right-section-lowerone-number">2</p>
                             <p className="habit-right-section-lowerone-text">TIMES <br/>A DAY</p>
                        </div>
                    </div>
                     <div id="card" className="habit-right-section-two">
                    <div id="chart">
                     <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar"height="171px" className="progress-bar"/>
                    </div>
                     </div> 
                    <div className="habit-right-section-three">
                            {
                              
                              frequency1 !=null && frequency1 != undefined ? frequency1.map((item)=>{
                                var str = item.btnName
                                var array = str.split("")[0];
                                if(item.isActive==true){
                               
                                
                                  return (
                                    <div className="habit-status-container"> 
                                        <div className="status-container-list"> 
                                             
                                             {Object.keys(count).map(function(d,index) {
                                                 if(d != "id" && d != "setTime" && d != "status"){
                                             return (
                                                <div>
                                                 {count[index].status==2 ? <img className="star-icon" src={starIcon} alt="starIcon"></img> : null}
                                                <label className='statusBid' style={{background: count[index].status === 0 ? "#41e590" : count[index].status === 1 ? "#ff7700" : count[index].status === 2 ? "#d0cfec" : null}} ></label>
                                               
                                                </div>
                                              )}else{
                                               return <div>
                                                {count.status==2 ? <img className="star-icon" src={starIcon} alt="starIcon"></img> : null}
                                               <label className='statusBid' style={{background: count.status === 0 ? "#41e590" : count.status === 1 ? "#ff7700" : count.status === 2 ? "#d0cfec" : null}} ></label>
                                              
                                               </div>
                                              }
                                            })} 
                                             
                                            {/* {
                                                
                                                Object.keys(count[0]).forEach(key => {
                                                    return <div>Key: {key}, Value: {count[key]}</div>;
                                                }) }*/}
                                            {array}
                                        </div>
                                    </div>
                                  );        
                                  
                                }
                            
                                }

                                ):null
                            }
                     </div> 
                    <div className="habit-right-section-four">
                        <img src={optionIcon} slt="edit" className="habit-right-section-option-icon"></img>
                        <Box component="fieldset" mb={3} borderColor="transparent" className="habit-right-section-star-icon">
                        <Rating
                        name="customized-empty"
                        value={1}
                        precision={0.5}
                        max={1}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                         size="large"
                         />
                        </Box>
                    </div>
                </div>  
            </div>
            );

            }):null
            }
            </div>
            </div>       
             </div>           
        </div>                             
                   
    );
  }
  render() {
    return <MainLayout secondSidebar={<HabitCollapsible thisObj={this} refreshData={this.refreshData} client={this.props.client} />} bodySection={this.bodySection()}  />
  }
}

export default HabitListing;
