import React, { Component } from 'react';
import './TasksList.scss';
import moment from 'moment';
import Checkbox from '@material-ui/core/Checkbox';
import { Scrollbars } from 'react-custom-scrollbars';
import MainLayout from '../../../containers/MainLayout/MainLayout';
import TaskCollapsable from '../../../containers/TaskTable/TaskCollapsible/TaskCollapsable';
import axios from "axios";
import DatePicker from 'react-date-picker';
import Header from '../../../containers/Header/Header';
import SubHeader from '../../../containers/SubHeaderNew/SubHeaderNew';
import featherChevronRight from '../../../assets/icons/01-10-2019/Icon feather-chevron-right.svg'
import CreateTaskDrawer from '../../../containers/CreateTaskDrawer/CreateTaskDrawer';
import CreateTicketDrawer from '../../../components/TicketingSystem/TicketTable/SideDrawers/CreateTicketUpdated/CreateTicketDrawer';
import Fab from '@material-ui/core/Fab';
import readMore from '../../../assets/icons/SVG/Iconawesome-ellipsis-v.svg'
import Button from '@material-ui/core/Button';
import TasksListingAddIcon from "../../../assets/create-habit/Group 11382.svg";
import TasksListingUpArrow from "../../../assets/icons/create-ticket/Group 11332.svg";
import TasksListEditIcon from "../../../assets/icons/task/icon-material-edit.svg";
import TasksListingMoreIcon from "../../../assets/icons/task/icon-awesome-ellipsis-more.svg";
import TaskListRectangleGray from "../../../assets/icons/task/group-11441.svg";
import TaskListRectangleGreen from "../../../assets/icons/task/completed.svg";
import TaskListRectangleBlue from "../../../assets/icons/01-10-2019/Rectangle 530.svg";
import TaskListVerticalEllipse from "../../../assets/icons/assets_Task list_2019-11-20/vertical_ellipse.svg";
import TaskListLowPriority from "../../../assets/icons/assets_Task list_2019-11-20/Icon material-low-priority.svg";
import TaskListOpenTimer from "../../../assets/icons/assets_Task list_2019-11-20/Icon open-timer.svg";
import TaskListExlamation from "../../../assets/icons/assets_Task list_2019-11-20/Icon awesome-exclamation-circle.svg";
import TaskListGroupMessage from "../../../assets/icons/assets_Task list_2019-11-20/Group 11544.svg";
import TaskListSubdirectory from "../../../assets/icons/assets_Task list_2019-11-20/Icon material-subdirectory-arrow-right.svg";
import TaskListLink from "../../../assets/icons/assets_Task list_2019-11-20/Icon feather-link.svg";
import TaskListBellIcon from "../../../assets/icons/assets_Task list_2019-11-20/Icon ionic-ios-notifications-outline.svg";
import TaskListBidirection from "../../../assets/icons/assets_Task list_2019-11-20/Group 10943.svg";
import TaskListAttachment from "../../../assets/icons/assets_Task list_2019-11-20/attachment.svg";
import TaskListReportProblem from "../../../assets/icons/assets_Task list_2019-11-20/Icon material-report-problem.svg";
import TaskListProfile from "../../../assets/icons/assets_Task list_2019-11-20/rectangle_profile.png";
import TaskListStarIcon from "../../../assets/icons/01-10-2019/Icon ionic-md-star-outline.svg";
import TaskListRedExclamation from "../../../assets/icons/01-10-2019/Icon awesome-exclamation-circle.svg";
import TaskListPopupEye from "../../../assets/icons/assets_Task list_2019-11-20/Icon feather-eye.svg";
import TasksListPopupEdit from "../../../assets/icons/assets_Task list_2019-11-20/Icon feather-edit.svg";
import TasksListPopupAssign from "../../../assets/icons/assets_Task list_2019-11-20/Icon material-assignment.svg";
import TasksListPopupBulk from "../../../assets/icons/assets_Task list_2019-11-20/Icon awesome-mail-bulk.svg";
import TasksListPopupMerge from "../../../assets/icons/assets_Task list_2019-11-20/Icon material-call-merge.svg";
import TasksListPopupProblem from "../../../assets/icons/assets_Task list_2019-11-20/Icon material-popup-report-problem.svg"
import TasksListPopupConvert from "../../../assets/icons/assets_Task list_2019-11-20/Icon material-leak-remove.svg";
import TasksListPopupLink from "../../../assets/icons/assets_Task list_2019-11-20/Icon feather-link.svg";
import TasksListPopupDuplicate from "../../../assets/icons/assets_Task list_2019-11-20/Icon material-control-point-duplicate.svg";
import TasksListPopupDelete from "../../../assets/icons/assets_Task list_2019-11-20/Icon material-delete-sweep.svg";
import CompanyLogo from "../../../assets/icons/01-10-2019/company-logo.svg";
import CompanyEditIcon from "../../../assets/icons/SVG/Iconfeather-edit-3.svg";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItemImage from "../../../assets/images/profile.png";
import gql from "graphql-tag";
import dropdownIcon from '../../../assets/icons/01-10-2019/Icon ionic-md-arrow-dropdown.svg'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import sidebarToggleIcon from '../../../assets/Sidenavbar-icons/Group 11332.svg';
import profile from "../../../assets/images/profile.png";
import EditIcon from "../../../assets/icons/task/Group 11531.svg";
import DeleteIcon from "../../../assets/icons/task/DeleteIcon.svg";
import calendarIcon from "../../../assets/icons/SVG/Icon metro-calendar.svg"
import MergeTask from "../../TicketingSystem/TasksList/MergeDrawer/MergeTaskDrawer";
import TaskListCriticalButton from "../../../assets/icons/SVG/Ellipse 23.svg";
import { baseUrl } from "../../../constants";
import StopWatch from "./StoperWatch/StopWatch";
import { getTodayData, getTomorrowData } from "./taskListsQuerys";
import activeIcon1 from "../../../assets/icons/assets_Task list_2019-11-20/group-11588.svg";
import inActiveIcon1 from "../../../assets/icons/task/icon-awesome-ellipsis-more.svg"
import searchIcon from '../../../assets/Sidenavbar-icons/Icon feather-search-small.svg'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import TopLeft from "../../../assets/icons/chat/top-right.svg";
import TaskListingAttachmentsDrawer from '../../../containers/NewTaskListing/TaskListingAttachmentsDrawer/TaskListingAttachmentsDrawer';
import TaskCommentsDrawer from '../../../containers/NewTaskListing/TaskCommentsDrawer/TaskCommentsDrawer';
import {Link} from 'react-router-dom'
import  Taskdetails from "../../../containers/Taskdetails/Taskdetails"
import history from '../../../Routes/history';
const imgscr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"
const tasksList = [
    { isCheck: false, taskName: 'Daily Stand-up meeting Daily Stan...', phase: 'PHASE1', dueDays: '2 DAYS PAST DUE', sevearity: 'Risk', customerType: 'Critical Customer', avatharIcon: imgscr, countDownTime: '00H 00M', countDownActualTime: '01H 59M' },
    { isCheck: true, taskName: 'Matrix1 onboarding process', phase: 'PHASE1', dueDays: '2 DAYS PAST DUE', sevearity: 'Phase1', customerType: 'Critical Customer', avatharIcon: imgscr, countDownTime: '22H 30M', countDownActualTime: '03H 59M' }
]

const Assign = [
    { id: 0, name: 'Jhon doe' },
    { id: 1, name: 'Ryan pazos' },
    { id: 2, name: 'Jhon doe' },
    { id: 3, name: 'Mark' },
    { id: 4, name: 'Ryan pazos' },
    { id: 5, name: 'Mark' },
    { id: 6, name: 'Jhon doe' },
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
let time = ['12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM']
let wrapperRef;


const getBackLogs = gql`
    query GetBacklogTasks($pageNo:Int!)
    {
        getBacklogTasks(pageNo:$pageNo){
            id,
            taskTitle,
            taskDescription,
            dueTime,
            startTime,
            statusId,
            priority,
            tags,
            progressPercent,
            taskHours
        }
    }
`;
var getBacklogData = (client, pageNo, callback) => {
    client
        .query({
            query:
                getBackLogs, variables: { pageNo: pageNo }
        })
        .then(res => {
            callback(res)
        })
}

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

class TaskListing extends Component {


  constructor(props) {
    super(props);
    this.state = {
        users:[],
        stateChecked: false,
        isShowPopup1: false,
        setShowPopup1: false,
        isShowPopup: false,
        isShownotificationPopup: false,
        setShowPopup: false,
        popupId: null,
        popupnotificationId: null,
        updatePopupId: null,
        isnotificationPopup: false,
        notificationPopupId: null,
        isTodayPopup: false,
        todayPopupId: null,
        updateTodayPopupId: null,
        isTomorrowPopup: false,
        setTomorrowPopup: false,
        tomorrowPopupId: null,
        updateTomorrowPopupId: null,
        isShowPopupOne: false,
        isShowPopupTwo: false,
        isShowPopupThree: false,
        isShowPopupColor: false,
        moreIcons : [],
        tasksList: [],
        backlogData: [],
        todayData: [],
        tomorrowData: [],
        isOpenCreateTask:false,
        isAssignPopUp:false,
        ismanagerpopup:false,
        isshowaddreminderPopUp:false,
        isCTaskDrawerOpen:false,
        reminderTime: '',
        isCTaskDrawerOpen:false,
        isMergeDrawerOpen: false,
        isCheckArray:[],
        selectedTaskMerge:{},
        isShowPopupClone: false,
        popId: null,
        isShownotificationPopupClone: false,
        isShowPopup1Clone:false,
        reminder:[],
        reminderData:[],
       // isEditCompDtlsOpen: false,
       isViewCompDtlsOpen: false,
       isId:'',
       isTaskAttachmentDrawerOpen: false

        }
    }
    componentDidMount() {
        const token = localStorage.getItem('jwtToken');
        if (token === null || token === undefined || token === '') {
            history.push('/');
        }
        this.fetchReminder();

        let allTaskData = {
            query: `
          query tasksList 
            {
                tasksList{
                id
                taskTitle,
              }
            }
            `,
        };

        axios({
            method: 'post',
            url: baseUrl.server,
            data: allTaskData,
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => {
            this.setState({ logedUser: res.data.data.getUserById })
            return res
        }).catch(err => {
            console.log("Error in user==", err)
            return err;
        });

        let usersList = {
            query: `
          query getAllUsers 
            {
                getAllUsers{
                    id
                    emailIs
                    firstName
                    lastName
                    phoneNumber
                    status
              }
            }
            `,
        };

        axios({
            method: 'post',
            url: baseUrl.server,
            data: usersList,
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => {
            this.setState({ users: res.data.data.getAllUsers })
            return res
        }).catch(err => {
            console.log("Error in user==", err)
            return err;
        });

        let client = this.props.client;
        getBacklogData(
            client, 1, backlogData => {
                return this.setState({ backlogData: backlogData.data.getBacklogTasks });
            }
        );
        getTodayData(
            client, 1, todayData => {
                this.setState({ todayData: todayData.data.getTodayTasks });
            }
        );
        getTomorrowData(
            client, 1, tomorrowData => {
                this.setState({ tomorrowData: tomorrowData.data.getTomorrowTasks });
            }
        );
    };
    fetchReminder = () => {
        const requestBody = {
            query: `
          query remonderList
             {
                remonderList{
              id,
              reminderType,
              reminderTitle,
              reminderTime
              }
            }
          `
        };

        axios({
            method: 'post',
            url: baseUrl.server,
            data: requestBody,
            headers: {
                'Content-type': 'application/json'
            }
        }).then(resData => {
            let reminderData = resData.data.data.remonderList;
            this.setState({ reminderData: reminderData });
        })
            .catch(err => {
                console.log(err);
            });
    };
    dateChangeHandler = (date, dateType) => {
        this.setState({ [dateType]: date })
    }
    setTimePopup = (time, timeType) => (
        <div className='CT-set-time-popup' ref={this.setWrapperRef}>
            <Scrollbars className='time-scroll-container'>
                {time.map(timeToSet => <li onClick={() => this.setState({ [timeType]: timeToSet, isShowFromSetTimePopup: false, isShowToSetTimePopup: false })}>{timeToSet}</li>)}
            </Scrollbars>
        </div>
    )



    cloneButtonOnCLick = () => {
        this.setState({
            isShowPopupClone: !this.state.isShowPopupClone,
        })
    }
    // isEditCompDtlsOpen=(e)=>{
    //     e.stopPropagation()
    //      this.setState({ isEditCompDtlsOpen: true })
    //     }
    isViewCompDtlsOpen=(e,id)=>{
        e.stopPropagation()
        var idval=id;
         this.setState({ isViewCompDtlsOpen: true },{isId:idval})
        }
array = []
  checkBox=(id)=>{
    if(this.array.includes(id)){
        let index = this.array.indexOf(id)
        this.array.splice(index,1);
        this.setState({isCheckArray:this.array})
    }else{
        this.array.push(id)
        this.setState({isCheckArray:this.array})
    }
    }
    isMergeTicketToggler = (data) => {
        if (this.array.includes(data)) {
            // let index = this.array.indexOf(data)
            // this.array.splice(index,1);
            this.setState({ isCheckArray: this.array })
        } else {
            this.array.push(data)
            this.setState({ isCheckArray: this.array })
        }
        this.setState({ selectedTaskMerge: data, isMergeDrawerOpen: !this.state.isMergeDrawerOpen })
    }


    showTaskListPopup = (id) => {
        this.setState({ isAssignPopUp: false, isShowPopupClone: false, isShowPopup: !this.state.isShowPopup });
        this.setState({ ismanagerPopUp: false, isShowPopup1Clone: false, isShowPopup1: !this.state.isShowPopup1 });
        this.setState({ popupId: id })

    };
    showNotificationListPopup = (id) => {
        this.setState({ isAssignPopUp: false, isShownotificationPopupClone: false, isShownotificationPopup: !this.state.isShownotificationPopup });
        this.setState({ ismanagerPopUp: false, isShowPopup1Clone: false, isShowPopup1: !this.state.isShowPopup1 });
        this.setState({ popupId: id })

    };

    buttonOneOnCLick = (index) => {
        this.setState({ isShowPopupOne: !this.state.isShowPopupOne });
        this.setState({ popId: index })
    }

    assignClickedPopup = () => {
        this.setState({ isAssignPopUp: true, isShowPopupClone: false })

    }
    managerClickedPopup = async (e) => {
        this.setState({ ismanagerPopUp: true, isShowPopup1Clone: false })

        let requestBody = {
            query: `
            mutation addReminder(
                $reminderTitle:String,
                $reminderDependecyId: Int,
                $reminderType: String,
                $reminderTime: JSON,
              ) 
              {
                addReminder(
                    reminderTitle:$reminderTitle
                    reminderDependecyId: $reminderDependecyId,
                    reminderType:$reminderType,
                    reminderTime:$reminderTime,
                  )
                  {
                    id,
                    reminderTitle
                    reminderDependecyId,
                    reminderType,
                    reminderTime,
                  }
              }
          `,
        variables: {
            reminderTitle: "login",
            reminderDependecyId: this.state.reminderDependecyId,
            reminderType:this.state.reminderType,
            reminderTime:this.state.reminderTime,
        }
      };
  
      let resData = await axios({
        method: 'post',
        url: baseUrl.server,
        data: requestBody,
        headers: {
          'Content-type': 'application/json'
        }
      }).then(res => {
        return res
      }).catch(err => {
        return err;
      });
  
    }

    showaddreminderListPopup = () => {
        this.setState({ isshowaddreminderPopUp: true })
    }

    refreshData = (data) => {
        let dueTask123 = [], todayTask123 = [], tomorrowTask123 = [];
        let dateNow = new Date();
        if (data == null || data == undefined || data == []) return null;
        data.map(task => {
            let dueTime = new Date(task.dueTime);
            let startTime = new Date(task.startTime);
            if (dateNow.getTime() > dueTime.getTime()) {
                dueTask123.push(task);
            } else
                if (dateNow.getDate() == startTime.getDate() &&
                    dateNow.getMonth() == startTime.getMonth() &&
                    dateNow.getFullYear() == startTime.getFullYear()) {
                    todayTask123.push(task);
                } else
                    if (dateNow.getDate() < startTime.getDate() ||
                        dateNow.getMonth() < startTime.getMonth() ||
                        dateNow.getFullYear() < startTime.getFullYear()) {
                        tomorrowTask123.push(task)
                    }
        })
        if (dueTask123 != null) { this.setState({ backlogData: dueTask123 }) } else { this.setState({ backlogData: [] }) }
        if (todayTask123 != null) { this.setState({ todayData: todayTask123 }) } else { this.setState({ todayData: [] }) }
        if (tomorrowTask123 != null) { this.setState({ tomorrowData: tomorrowTask123 }) } else { this.setState({ tomorrowData: [] }) }

    }

changeSearch=(e)=>{
}
sidebarToggler=()=>{
    this.setState({isAssignPopUp:false})
    this.setState({ismanagerPopUp:false})
}

deletereminder=(id)=>{
    this.setState({ismanagerPopUp:true})
    let requestBody = {
        query: `
            mutation removereminder(
                $id:Int
                $reminderDependecyId: Int,
                $reminderType: String,
                $reminderTime: JSON,
              ) 
              {
                removereminder(
                    id:$id
                    reminderDependecyId: $reminderDependecyId,
                    reminderType:$reminderType,
                    reminderTime:$reminderTime,
                  )
                  {
                    id,
                    reminderDependecyId,
                    reminderType,
                    reminderTime,
                  }
              }
          `,
            variables: {
                id: id,
                reminderDependecyId: this.state.reminderDependecyId,
                reminderType: this.state.reminderType,
                reminderTime: this.state.reminderTime,
            }
        };

        let resData = axios({
            method: 'post',
            url: baseUrl.server,
            data: requestBody,
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => {
            // reminderData
            this.arrayRem = this.state.reminderData
            if (this.arrayRem.length != 0) {
                let index = this.arrayRem.indexOf(res.data.removereminder)
                this.arrayRem.splice(index, 1);
            }
            this.setState({ reminderData: this.arrayRem })
            return res
        }).catch(err => {
            return err;
        });


}
arrayRem=[]
editreminder=(id)=>{
    this.setState({ismanagerPopUp:false})

        let requestBody = {
            query: `
        mutation addReminder(
            $id:Int
            $reminderDependecyId: Int,
            $reminderType: String,
            $reminderTime: JSON,
          ) 
          {
            addReminder(
                id:$id,
                reminderDependecyId: $reminderDependecyId,
                reminderType:$reminderType,
                reminderTime:$reminderTime,
              )
              {
                id,
                reminderDependecyId,
                reminderType,
                reminderTime,
              }
          }
          `,
            variables: {
                id: 14,
                reminderDependecyId: this.state.reminderDependecyId,
                reminderType: "email",
                reminderTime: "2019-11-22T18:30:00.000Z",
            }
        };

        let resData = axios({
            method: 'post',
            url: baseUrl.server,
            data: requestBody,
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => {
            return res
        }).catch(err => {
            return err;
        });

    }

    showTodayListPopup = (index) => {
        this.setState({ isTodayPopup: !this.state.isTodayPopup });
        this.setState({ todayPopupId: index })
    };

    showTomorrowListPopup = (index) => {
        this.setState({ isTomorrowPopup: !this.state.isTomorrowPopup });
        this.setState({ tomorrowPopupId: index })
    };
    shownotificationListPopup = (index) => {
        this.setState({ isnotificationPopup: !this.state.isnotificationPopup });
        this.setState({ notificationPopupId: index })
    };


    // closePopups=()=>{
    //     this.setState({isShowPopup:false,isTodayPopup:false,isTomorrowPopup:false,popupId:null,todayPopupId:null,tomorrowPopupId:null})
    // }
    showTodayListPopup = (index) => {
         this.setState({ isTodayPopup: !this.state.isTodayPopup });
         this.setState({ todayPopupId: index })
     };
     
     showTomorrowListPopup = (index) => {
         this.setState({ isTomorrowPopup: !this.state.isTomorrowPopup });
         this.setState({ tomorrowPopupId: index })
     };
     shownotificationListPopup = (index) => {
         this.setState({ isnotificationPopup:  !this.state.isnotificationPopup });
         this.setState({ notificationPopupId: index })
     };

    ticketHandleClick = async (event, index) => {
        this.setState({ isShowBtnPopup: !this.state.isShowBtnPopup, popupId: index });

        this.setState({ isShowMoreOptions: !this.state.isShowMoreOptions });
    }

    onSelectionChanged = () => {
        let selectedRows = this.gridApi.getSelectedRows();
        let checkBoxCheckedValues = [];
        selectedRows.forEach(function (selectedRow, index) {
            checkBoxCheckedValues.push(selectedRow.id);
        });
        if (checkBoxCheckedValues.length > 0) {
            this.setState({ isTicketBtnActive: true })
        } else {
            this.setState({ isTicketBtnActive: false })
        }
        this.setState({ checkBoxValue: checkBoxCheckedValues })
    }



    handleClickOutside = async (event) => {
        if (wrapperRef && !wrapperRef.contains(event.target)) {
            await this.setState({
                isShowTktStsPopup: false,
                isShowTktPriorityPopup: false,
                isShowPickColor: false,
                isShowAssignToPopup: false,
                isShowMoreOptions: false
            })
        }
    }


    setWrapperRef = (node) => wrapperRef = node;

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.columnApi.autoSizeColumns()
    };

    HandleClickFunction = (index) => this.setState({ assignToSelected: index })
    isCreateTaskToggler = () => this.setState({ isCTaskDrawerOpen: !this.state.isCTaskDrawerOpen })

    colorPickerPopupToggler = async (rowIndex) => {
        await this.setState({ isShowPickColor: !this.state.isShowPickColor, rowIndex: rowIndex })
    }

    setShowTktStsPopup = async (rowIndex) => {
        await this.setState({ isShowTktStsPopup: !this.state.isShowTktStsPopup, rowIndex: rowIndex })
    }
    setShowTktPriorityPopup = async (rowIndex) => {
        await this.setState({ isShowTktPriorityPopup: !this.state.isShowTktPriorityPopup, rowIndex: rowIndex })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    };

    bodySection = () => {
        return (
            <div className="task-listing-component-body">
                {/* <CreateTaskDrawer isOpenCreateTask={this.state.isOpenCreateTask} thisObj={this} /> */}
                <CreateTaskDrawer isCTaskDrawerOpen={this.state.isCTaskDrawerOpen} thisObj={this} />
                {this.state.isViewCompDtlsOpen ? <Taskdetails isViewCompDtlsOpen={this.state.isViewCompDtlsOpen,this.state.isId} client={this.props.client}   thisObj={this}/>:null}
                <TaskListingAttachmentsDrawer isTaskAttachmentDrawerOpen={this.state.isTaskAttachmentDrawerOpen} thisObj={this}/>
                <TaskCommentsDrawer isTaskCommentsDrawerOpen={true} thisObj={this}/>

                <Header />
                <SubHeader />
                {this.state.isMergeDrawerOpen ?
                    <MergeTask isMergeDrawerOpen={this.state.isMergeDrawerOpen} selectedTask={this.state.isCheckArray} selectedMergeTask={this.state.selectedTaskMerge} thisObj={this} />
                    : null}

                <div className='ticket-listing-body'>

                    <div className="tasks-listing-heading">
                        <span>BACKLOG BACKLOG BACKLOG</span>
                        <div className="tasks-listing-heading-right">
                            <Button className="tasks-listing-add-icon">
                                <img src={TasksListingAddIcon}></img>
                            </Button>
                            <Button className="tasks-listing-up-arrow">
                                <img src={TasksListingUpArrow}></img>
                            </Button>
                        </div>

                    </div>
                    <div className="">
                        <div className="tasks-listing-status-section">
                            <div className="tasks-listing-status">
                                <p className="tasks-listing-status-text">STATUS</p>
                            </div>
                            <div className="tasks-listing-estimated-actual">
                                <p className="task-listing-estimated">ESTIMATED</p>
                                <p className="task-listing-actual">ACTUAL</p>

                            </div>

                        </div>
                        {
                            this.state.backlogData != null || this.state.backlogData != undefined ? this.state.backlogData.map((tasksList, index) => {
                                return (
                                    <div className='tasks-listing-task'>
                                        <div className='tasks-listing-left-section'>
                                            <div className="tasks-listing-more-icon-image">
                                                <img className="tasks-listing-more-icon" src={TasksListingMoreIcon} alt="editmore"></img>
                                            </div>
                                            <div className="tasks-listing-edit-icon-image">
                                                <img className="tasks-listing-edit-icon" src={TasksListEditIcon}></img>
                                            </div>

                                            
                                            <img className="tasks-listing-checked-icon" src={this.state.isCheckArray.includes(tasksList) ? TaskListRectangleGreen : TaskListRectangleGray} onClick={() => this.checkBox(tasksList)}></img>
                                            <span className=''></span>
                                            <div className="tasks-listing-task-name-and-time-section" onClick={}>
                                                <p className='tasks-listing-task-name'>{tasksList.taskTitle}</p>
                                                <div className="tasks-listing-time-section">
                                                    <p className='tasks-listing-time'>PROJECT NAME</p>
                                                    <p className='tasks-listing-time'>PHASE 1</p>
                                                    <p className='tasks-listing-due-days'>DUE DAYS</p>
                                                </div>
                                            </div>

                                            {
                                                <div className="tasks-listing-task-name-hover">
                                                    <div className='tasks-listing-name-time'>
                                                        <div className="tasks-listing-name-display">

                                                            <p className='tasks-listing-name'>{tasksList.taskTitle}</p>
                                                            {/* <p className='tasks-list-name'>{new Date(tasksList.startTime)} - {tasksList.dueTime}</p> */}
                                                        </div>
                                                        <p className="tasks-listing-date">Sep 24 2019 <span>6:30 - 9:30PM</span></p>

                                                        <div className="tasks-listing-status-progress">
                                                            <p className="tasks-listing-status-in-progress">STATUS : <span>Done</span> </p>

                                                        </div>
                                                        <div className="tasks-listing-tags">
                                                            <p className="tasks-listing-tags-text">TAGS :</p>
                                                            <div className="tasks-listing-tags-section">
                                                                <div className="risk-critical-server">
                                                                    <div className="tasks-listing-critical">
                                                                        <p className="tasks-listing-critical-text">Critical</p>
                                                                    </div>
                                                                    <div className="tasks-listing-tech">
                                                                        <p className="tasks-listing-tech-text">Tech</p>
                                                                    </div>

                                                                    {/* <p className="tasks-list-server">Server</p> */}
                                                                    <img src={TaskListVerticalEllipse} alt="" className="task-listing-tags-img"></img>
                                                                </div>
                                                                {/* <div className="phase-technical">
                                                                        <p className="tasks-list-phase">Phase1</p>
                                                                        <p className="tasks-list-technical">Technical</p>
                                                                    </div> */}

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>


                                            }

                                            <span className={`tasks-listing-seviarity ${tasksList.sevearity === 'Risk' ? 'risk' : tasksList.sevearity === 'Phase1' ? 'phase1' : null}`}>{tasksList.sevearity}</span>
                                            <span className='tasks-listing-customer-type'>{tasksList.customerType}</span>
                                            <div className='tasks-listing-icon-show-on-hover'>

                                                <img className="tasks-listing-hover-icons" src={tasksList.isCheck ? TaskListVerticalEllipse : TaskListVerticalEllipse} ></img>
                                                <img className="tasks-listing-hover-icons" src={tasksList.isCheck ? TaskListRedExclamation : TaskListLowPriority}></img>
                                                <img className="tasks-listing-hover-images" src={tasksList.isCheck ? TaskListAttachment : TaskListOpenTimer}></img>
                                                <img className="tasks-listing-hover-icons" src={tasksList.isCheck ? null : TaskListExlamation}></img>
                                                <img className="tasks-listing-hover-icons" src={tasksList.isCheck ? null : TaskListGroupMessage}></img>
                                                <img className="tasks-listing-hover-icons" src={tasksList.isCheck ? null : TaskListSubdirectory}></img>
                                                <img className="tasks-listing-hover-icons" src={tasksList.isCheck ? null : TaskListLink}></img>
                                                <img className="tasks-listing-hover-icons" src={tasksList.isCheck ? null : TaskListBellIcon} onClick={() => this.showTodayListPopup(tasksList.id)}></img>
                                                <img className="tasks-listing-hover-icons" src={tasksList.isCheck ? null : TaskListBidirection}></img>
                                                <img className="tasks-listing-hover-images" src={tasksList.isCheck ? null : TaskListAttachment} ></img>
                                                <img className="tasks-listing-hover-icons" src={tasksList.isCheck ? null : TaskListReportProblem}></img>
                                                <img className="tasks-listing-hover-icons" src={tasksList.isCheck ? null : TaskListProfile} onClick={() => this.buttonOneOnCLick(tasksList.id)}></img>
                                                {
                                                    this.state.popId === tasksList.id && this.state.isShowPopupOne ? (
                                                        <div className="tasks-listing-assgn-popup-for-one">
                                                            <img className="top-left-arrow" src={TopLeft} alt=""></img>
                                                            <div className='tasks-listing-assgn-details'>
                                                                <p className="tsk-lstng-assgn-dtls-hdr-txt">ASSIGN/TRANSFER</p>
                                                                <div className="tsk-lstng-assgn-searchbar">
                                                                    <TextField name="searchOption" className='sidebar-search-field' placeholder='Search Tasks' variant="outlined" />
                                                                    <img className="task-lstng-srch-icn" src={searchIcon} alt='searchIcon' />
                                                                </div>
                                                                <div className="task-lstng-asgn-profile">
                                                                    <Scrollbars className="custom-scroll" style={{ height: 132 }}>
                                                                        <ul>

                                                                            {
                                                                                Assign.map(user => {
                                                                                    return <li className="tasks-lstng-assgn-menu d-flex justify-space-between">

                                                                                        <div className="tsk-lst-prfl-name d-flex align-items-center">
                                                                                            <img className="menu-profile" src={TaskListProfile} alt=""></img>
                                                                                            <p className="profile-name">{user.name}</p>
                                                                                        </div>
                                                                                        <Checkbox
                                                                                            className="tsk-lstng-asgn-chckbx"
                                                                                            onChange={this.handleChange}
                                                                                            value="checkedA"
                                                                                            inputProps={{
                                                                                                'aria-label': 'primary checkbox',
                                                                                            }}
                                                                                        />

                                                                                        {/* <img src={profile}></img>
                                                                                            <span className="profile-name">{user.firstName} {user.lastName}</span>
                                                                                            <span><img src={tasksList.isCheck ? TaskListRectangleBlue : TaskListRectangleGray}></img></span> */}
                                                                                    </li>
                                                                                })

                                                                            }

                                                                        </ul>
                                                                    </Scrollbars>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    ) : null
                                                }
                                                <div className='tasks-list-clicl-more-button'>
                                                    <Fab className='task-list-menu' size="small" aria-label="add">

                                                        {
                                                            this.state.todayPopupId === tasksList.id && this.state.isTodayPopup ? (this.state.isAssignPopUp) ? (this.state.ismanagerPopUp) ?
                                                                (
                                                                    <div className='notification-task-list-popup'>
                                                                        <div className="close-icon-sec1">
                                                                            <img className='sidebar-close-icon' src={sidebarToggleIcon} alt='sidebarToggleIcon' onClick={this.sidebarToggler} />
                                                                            <div className="tasks-remainder">
                                                                                <label>TASK REMINDERS</label>

                                                                            </div>
                                                                            <div className="tasks-remainder1">
                                                                                <span>TASK: {tasksList.taskTitle}</span>
                                                                            </div>
                                                                            <div className="reminder"><span>Remainder Who?</span><span>when?</span><span>How?</span></div>

                                                                            {/* {this.state.reminderData.map(reminder=>{
                                                                return<div>{tasksList.taskTitle}{reminder.reminderTime} {reminder.reminderType} <img src={EditIcon} onClick={() => this.editreminder(reminder.id)} ></img> <img src={DeleteIcon} onClick={() => this.deletereminder(reminder.id)} ></img></div>
                                                                })} */}
                                                                            <hr></hr>

                                                                        </div>

                                                                    </div>


                                                                )
                                                                : (
                                                                    <div className='notification-task-list-popup'>
                                                                        <div className="close-icon-sec1">
                                                                            <img className='sidebar-close-icon' src={sidebarToggleIcon} alt='sidebarToggleIcon' onClick={this.sidebarToggler} />
                                                                            <div className="tasks-remainder">
                                                                                <span>TASK REMINDERS</span>

                                                                            </div>
                                                                            <div className="tasks-remainder1">
                                                                                <span value={this.state.reminderTitle}>TASK: {tasksList.taskTitle}</span>
                                                                            </div>
                                                                        </div>

                                                                        <div className="tasks-list-reminder">
                                                                            <FormControl>
                                                                                <InputLabel htmlFor="demo-controlled-open-select">Reminder</InputLabel>
                                                                                <div className="tasks-list-assign-to-menu-item">
                                                                                    <Select
                                                                                        open={this.state.open}
                                                                                        onClose={this.handleOpenClose}
                                                                                        onOpen={this.handleOpenClose}
                                                                                        value={this.state.reminderDependecyId}
                                                                                        onChange={e => this.setState({ reminderDependecyId: e.target.value })}
                                                                                    >
                                                                                        {this.state.users != null || this.state.users != undefined ?
                                                                                            this.state.users.map(user => {

                                                                                                return <MenuItem value={1} className="tasks-list-menu-list">
                                                                                                    <img src={MenuItemImage}></img>
                                                                                                    <div className="task-list-menu-list-name">
                                                                                                        <p className="first-text">{user.firstName}</p>
                                                                                                    </div>
                                                                                                </MenuItem>
                                                                                            }) : null}

                                                                                    </Select>



                                                                                </div>


                                                                            </FormControl>
                                                                        </div>
                                                                        <div>
                                                                        </div>
                                                                        <div className="reminder-help">
                                                                            <span className="sent-reminder">When and how will you send the reminder ?</span>
                                                                        </div>


                                                                        <div className='task-date-time'>

                                                                            <div id='task-datepicket-btn'>

                                                                                <Button variant="contained" className={'CT-custome-button'} onClick={'onClick'}>{this.state.reminderTime ? moment(this.state.reminderTime).format("MMM, DD YYYY") : 'From Date'}</Button>

                                                                                <DatePicker showYearDropdown yearDropdownItemNumber={15} onChange={(date) => this.dateChangeHandler(date, 'reminderTime')} value={this.state.reminderTime} clearIcon={null} />

                                                                            </div>
                                                                            {
                                                                                !this.state.isAllDay ?
                                                                                    (
                                                                                        <div className='CT-time-setter'>
                                                                                            <Button variant="contained" className={'CT-custome-button CT-time-btn'} onClick={() => this.setState({ isShowFromSetTimePopup: !this.state.isShowFromSetTimePopup })}>{this.state.auditJson ? this.state.auditJson : 'Start Time'}</Button>
                                                                                            {this.state.isShowFromSetTimePopup ? this.setTimePopup(time, 'auditJson') : null}
                                                                                        </div>
                                                                                    ) : null
                                                                            }

                                                                        </div>
                                                                        <div className="tasks-list-field1"> <FormControl>
                                                                            <InputLabel htmlFor="demo-controlled-open-select">Email Reminder</InputLabel>
                                                                            <div className="tasks-list-assign-to-menu-item">

                                                                                <Select
                                                                                    open={this.state.open}
                                                                                    onClose={this.handleOpenClose}
                                                                                    onOpen={this.handleOpenClose}
                                                                                    value={this.state.reminderType}
                                                                                    onChange={e => this.setState({ reminderType: e.target.value })}
                                                                                >
                                                                                    <MenuItem value="email" className="tasks-list-menu-list">

                                                                                        <div className="task-list-menu-list-name">
                                                                                            <p className="first-text">Email</p>

                                                                                        </div>
                                                                                    </MenuItem>
                                                                                    <MenuItem value="Sms" className="tasks-list-menu-list">

                                                                                        <div className="task-list-menu-list-name">
                                                                                            <p className="second-text">Sms</p>

                                                                                        </div>
                                                                                    </MenuItem>
                                                                                </Select>
                                                                            </div>
                                                                        </FormControl></div>
                                                                        <div className="addreminder">
                                                                            <button className="button-addreminder" onClick={this.managerClickedPopup(tasksList.taskTitle)} >AddReminder</button></div>
                                                                    </div>

                                                                )
                                                                : (

                                                                    <div className='notification-task-list-popup'>
                                                                        <div>
                                                                            <div className="tasks-remainder">
                                                                                <span>TASK REMINDERS</span>

                                                                            </div>
                                                                            <div className="tasks-remainder1">
                                                                                <span>TASK: {tasksList.taskTitle}</span></div>
                                                                            <div className="calendericon"><img className="img" src={calendarIcon} alt="calendarIcon" /></div>
                                                                            <div className="task-reminderdescription">
                                                                                <h2 className="heading"><b>NO REMINDERS</b></h2>
                                                                                <span>There are no reminders on this task yet</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="add-reminder">
                                                                            <button className="button-reminder" onClick={this.assignClickedPopup}>AddReminders</button></div>
                                                                    </div>

                                                                ) : null
                                                        }
                                                    </Fab>
                                                </div>
                                            </div>

                                        </div>



                                        <Fab className='tasks-listing-right-section'>
                                            <div className='tasks-listing-estimate-timer'>
                                                <Fab
                                                    variant="extended"
                                                    size="small"
                                                    color="primary"
                                                    aria-label="add"
                                                    className={`tasks-listing-countdown-button-one ${tasksList.countDownTime === '00H 00M' ? 'gray' : tasksList.countDownTime === '22H 30M' ? 'blue-border' : null}`}
                                                >

                                                    {tasksList.countDownTime}
                                                </Fab>
                                            </div>







                                            <div className='tasks-listing-actual-timer'>
                                                <StopWatch taskId={tasksList.id} data={tasksList.taskHours} />
                                            </div>

                                            <img src={TaskListStarIcon}></img>

                                            <div className='tasks-listing-click-more-button' >
                                                <Fab className='task-listing-menu' size="small" aria-label="add" >
                                                    <img src={readMore}   />
                                                    {
                                                        this.state.popupId === tasksList.id && this.state.isShowPopup ? (this.state.isAssignPopUp) ?
                                                            (
                                                                <div className='task-list-popup'>
                                                                    <div className="close-icon-sec">
                                                                        <img className='sidebar-close-icon' src={sidebarToggleIcon} alt='sidebarToggleIcon' onClick={this.sidebarToggler} />
                                                                        <span>Assign/tranfer</span>
                                                                    </div>
                                                                    <div className="search-people">
                                                                        <InputBase
                                                                            placeholder="Search people"
                                                                            className="search-input"
                                                                            inputProps={{ 'aria-label': 'search' }}
                                                                            onClick={this.changeSearch}
                                                                        />
                                                                        <SearchIcon className="search-people-icon" />
                                                                    </div>
                                                                    <ul>
                                                                    onClick={() => this.showTaskListPopup(tasksList.id)}                 {this.state.users != null || this.state.users != undefined ?
                                                                            this.state.users.map(user => {
                                                                                return <li className="tasks-list-icon people-check">
                                                                                    <img src={profile}></img>
                                                                                    <span className="profile-name">{user.firstName} {user.lastName}</span>
                                                                                    <span><img src={tasksList.isCheck ? TaskListRectangleBlue : TaskListRectangleGray}></img></span>
                                                                                </li>
                                                                            }) : null

                                                                        }

                                                                    </ul>
                                                                </div>
                                                            )
                                                            : (
                                                                <div className='tasks-listing-popup'>
                                                                    <ul>
                                                                        <li className="tasks-listing-icon">
                                                                            {/* <i class="fa fa-eye" aria-hidden="true"></i> */}
                                                                            <img src={TaskListPopupEye} alt="edit"></img>
                                                                            <span>View details</span>
                                                                        </li>
                                                                        <li className="tasks-listing-icon">

                                                                            <img src={TasksListPopupEdit} alt="edit"></img>
                                                                            <span>Edit ticket</span>
                                                                        </li>
                                                                        <li className="tasks-listing-icon" onClick={this.assignClickedPopup}>
                                                                            <img src={TasksListPopupAssign} alt="edit"></img>
                                                                            <span>Assign / Transfer</span>
                                                                        </li>
                                                                        <li className="tasks-listing-icon">

                                                                            <img src={TasksListPopupBulk} alt="edit"></img>
                                                                            <span>Bulk update</span>
                                                                        </li>
                                                                        <li className="tasks-listing-icon" onClick={() => this.isMergeTicketToggler(tasksList)} >
                                                                            <img src={TasksListPopupMerge} alt="edit"></img>
                                                                            <span>Merge</span>
                                                                        </li>
                                                                        <li className="tasks-listing-icon">
                                                                            <img src={TasksListPopupProblem} alt="edit"></img>
                                                                            <span>Report a challenge</span>
                                                                        </li>
                                                                        <li className="tasks-listing-icon">

                                                                            <img src={TasksListPopupConvert} alt="edit"></img>
                                                                            <span>Convert task to habit</span>
                                                                        </li>
                                                                        <li className="tasks-listing-icon">

                                                                            <img src={TasksListPopupLink} alt="edit"></img>
                                                                            <span>Link with ticket</span>
                                                                        </li>
                                                                        <li className="tasks-listing-icon">

                                                                            <img src={TasksListPopupLink} alt="edit"></img>
                                                                            <span>Link with project</span>
                                                                        </li>
                                                                        <li className="tasks-listing-icon">

                                                                            <img src={TasksListPopupLink} alt="edit"></img>
                                                                            <span>Link with project</span>
                                                                        </li>
                                                                        {
                                                                            this.state.isShowPopupClone ? (
                                                                                <div className="button-popup-clone-container">
                                                                                    <div className='button-popup-clone'>
                                                                                        {
                                                                                            <div className='button-popup-clone-content'>
                                                                                                <p className="button-popup-clone-content-close-tickets">DUPLICATES TICKETS</p>
                                                                                                <p className="button-popup-clone-content-ask-question">Are you sure you want to duplicate these ticket?</p>
                                                                                                <div className="popup-clone-button-section">
                                                                                                    <div className="popup-clone-button">
                                                                                                        <Button
                                                                                                        // onClick={this.clickclone} 
                                                                                                        >Clone</Button>
                                                                                                    </div>
                                                                                                    <div className="popup-cancel-button">
                                                                                                        <Button onClick={this.cloneButtonOnCLick}>Cancel</Button>
                                                                                                    </div>

                                                                                                </div>
                                                                                            </div>
                                                                                        }
                                                                                    </div>
                                                                                </div>

                                                                            ) : null
                                                                        }
                                                                        <li className="tasks-listing-icon" onClick={this.cloneButtonOnCLick}>
                                                                            <img src={TasksListPopupDuplicate} alt="edit"></img>
                                                                            <span>Duplicate</span>
                                                                        </li>
                                                                        <li className="tasks-listing-icon">
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
                            }) : <div className='data-null'><span>No Data Found</span></div>
                        }
                    </div>

                    <div className="tasks-list-heading"><span>TODAY</span>
                        <div className="tasks-list-heading-right">
                            <Button className="tasks-list-add-icon">
                                <img src={TasksListingAddIcon}></img>
                            </Button>
                            <Button className="tasks-list-up-arrow">
                                <img src={TasksListingUpArrow}></img>
                            </Button>
                        </div>

                    </div>

                    {
                        this.state.todayData != null || this.state.todayData != undefined ? this.state.todayData.map((tasksList, index) => {
                            return (
                                <div className='tasks-list-task'>
                                    <div className='tasks-list-left-section'>

                                        <img src={TasksListEditIcon}></img>
                                        <img src={tasksList.isCheck ? TaskListRectangleBlue : TaskListRectangleGray}></img>
                                        <span className=''></span>
                                        <div className="tasks-list-task-name-and-time-section">
                                            <p className='tasks-list-task-name'>{tasksList.taskTitle}</p>
                                            <div className="tasks-list-time-section">
                                                <p className='tasks-list-time'>PROJECT NAME</p>
                                                <p className='tasks-list-time'>PHASE</p>
                                                <p className='tasks-list-due-days'>DUE DAYS</p>
                                            </div>
                                        </div>


                                        {
                                            <div className="tasks-list-task-name-hover">
                                                <div className='tasks-list-name-time'>
                                                    <div className="tasks-list-name-display">
                                                        <div>
                                                            <p className='tasks-list-name'>{tasksList.taskTitle}</p>
                                                            <p className="tasks-list-date">Sep 24 2019 <span>6:30 - 9:30PM</span></p>
                                                        </div>
                                                        <Button className="tasks-list-critical-button">
                                                            <img src={TaskListCriticalButton}></img>critical
                                                                </Button>
                                                    </div>

                                                    <div className="tasks-list-status-progress">
                                                        <p className="tasks-listing-status-in-progress">STATUS : <span>IN PROGRESS</span> </p>
                                                        <Button className="tasks-listing-status-percentage">50%</Button>
                                                    </div>
                                                    <div className="tasks-list-tags">
                                                        <p className="tasks-list-tags-text">TAGS :</p>
                                                        <div className="tasks-list-tags-section">
                                                            <div className="risk-critical-server">
                                                                <p className="tasks-list-risk">Risk</p>
                                                                <p className="tasks-list-critical">Critical Customer</p>
                                                                <p className="tasks-list-server">Server</p>
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

                                            <img className="tasks-list-hover-icons" src={tasksList.isCheck ? TaskListVerticalEllipse : TaskListVerticalEllipse} ></img>
                                            <img className="tasks-list-hover-icons" src={tasksList.isCheck ? TaskListRedExclamation : TaskListLowPriority}></img>
                                            <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListOpenTimer}></img>
                                            <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListExlamation}></img>
                                            <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListGroupMessage}></img>
                                            <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListSubdirectory}></img>
                                            <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListLink} onClick={() => this.showTaskListPopup(tasksList.id)}></img>

                                            <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListBellIcon} onClick={() => this.showTaskListPopup(tasksList.id)} ></img>
                                            <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListBidirection}></img>
                                            <img className="tasks-list-hover-images" src={tasksList.isCheck ? null : TaskListAttachment}></img>
                                            {/* <div className='tasks-list-clicl-more-button'>
                                                    <Fab className='task-list-menu' size="small" aria-label="add">
                                                       
                                                        {
                                                            this.state.notificationPopupId === tasksList.id && this.state.notificationPopupId ? (this.state.showaddreminderListPopup) ? 
                                                            (
                                                                <div className='task-list-popup'>
        
                                                                </div>
                                                            )
                                                            : (
                                                                <div className='notification-task-list-popup'>
                                                                    <ul>
                                                                        <li className="tasks-remainder">
                                                                          <span>TASK REMINDERS</span>

                                                                        </li>
                                                                        <li className="tasks-remainder1">
                                                                        <span>TASK: Daily stand up meeting</span></li>
                                                                        <img className="calendaricon" src ={calendarIcon} alt="calendarIcon"/>
                                                                      <h2>NO REMINDERS</h2>
                                                                      <span>There are no reminders on this task yet</span>
                                                               
                                                                    </ul>
                                                                    <button className="button-reminder" onClick={() => this.showreminderPopup}>AddReminders</button>
                                                                </div>
                                                                
                                                            ) : null
                                                        }
                                                    </Fab>
                                                   
                                                </div> */}

                                            {



                                                this.state.popupId === tasksList.id && this.state.isShowPopup ? (this.state.isAssignPopUp) ? (this.state.ismanagerPopUp) ?
                                                    (
                                                        <div className='notification-task-list-popup'>
                                                            <div className="close-icon-sec1">
                                                                <img className='sidebar-close-icon' src={sidebarToggleIcon} alt='sidebarToggleIcon' onClick={this.sidebarToggler} />
                                                                <div className="tasks-remainder">
                                                                    <label>TASK REMINDERS</label>

                                                                </div>
                                                                <div className="tasks-remainder1">
                                                                    <span>TASK: {tasksList.taskTitle}</span>
                                                                </div>
                                                                <div className="reminder"><span>Remainder Who?</span><span>when?</span><span>How?</span></div>

                                                                {this.state.reminderData.map(reminder => {
                                                                    return <div> {tasksList.taskTitle}  {reminder.reminderTime} {reminder.reminderType} <img src={EditIcon} onClick={() => this.editreminder(reminder.id)} ></img> <img src={DeleteIcon} onClick={() => this.deletereminder(reminder.id)} ></img></div>
                                                                })}
                                                                <hr></hr>

                                                            </div>

                                                        </div>


                                                    )
                                                    : (
                                                        <div className='notification-task-list-popup'>
                                                            <div className="close-icon-sec1">
                                                                <img className='sidebar-close-icon' src={sidebarToggleIcon} alt='sidebarToggleIcon' onClick={this.sidebarToggler} />
                                                                <div className="tasks-remainder">
                                                                    <span>TASK REMINDERS</span>

                                                                </div>
                                                                <div className="tasks-remainder1">
                                                                    <span value={this.state.reminderTitle}>TASK: {tasksList.taskTitle}</span>
                                                                </div>
                                                            </div>

                                                            <div className="tasks-list-reminder">
                                                                <FormControl>
                                                                    <InputLabel htmlFor="demo-controlled-open-select">Reminder</InputLabel>
                                                                    <div className="tasks-list-assign-to-menu-item">
                                                                        {this.state.users != null || this.state.users != undefined ?
                                                                            this.state.users.map(user => {
                                                                                return <Select
                                                                                    open={this.state.open}
                                                                                    onClose={this.handleOpenClose}
                                                                                    onOpen={this.handleOpenClose}
                                                                                    value={this.state.reminderDependecyId}
                                                                                    onChange={e => this.setState({ reminderDependecyId: e.target.value })}
                                                                                >

                                                                                    return<MenuItem value={1} className="tasks-list-menu-list">
                                                                                        <img src={MenuItemImage}></img>
                                                                                        <div className="task-list-menu-list-name">
                                                                                            <p className="first-text">{user.firstName} {user.lastName}</p>
                                                                                        </div>
                                                                                    </MenuItem>

                                                                                </Select>
                                                                            }) : null

                                                                        }
                                                                    </div>


                                                                </FormControl>
                                                            </div>
                                                            <div>
                                                            </div>
                                                            <div className="reminder-help">
                                                                <span className="sent-reminder">When and how will you send the reminder ?</span>
                                                            </div>


                                                            <div className='task-date-time'>

                                                                <div id='task-datepicket-btn'>

                                                                    <Button variant="contained" className={'CT-custome-button'} onClick={'onClick'}>{this.state.reminderTime ? moment(this.state.reminderTime).format("MMM, DD YYYY") : 'From Date'}</Button>

                                                                    <DatePicker showYearDropdown yearDropdownItemNumber={15} onChange={(date) => this.dateChangeHandler(date, 'reminderTime')} value={this.state.reminderTime} clearIcon={null} />

                                                                </div>
                                                                {
                                                                    !this.state.isAllDay ?
                                                                        (
                                                                            <div className='CT-time-setter'>
                                                                                <Button variant="contained" className={'CT-custome-button CT-time-btn'} onClick={() => this.setState({ isShowFromSetTimePopup: !this.state.isShowFromSetTimePopup })}>{this.state.auditJson ? this.state.auditJson : 'Start Time'}</Button>
                                                                                {this.state.isShowFromSetTimePopup ? this.setTimePopup(time, 'auditJson') : null}
                                                                            </div>
                                                                        ) : null
                                                                }

                                                            </div>
                                                            <div className="tasks-list-field1"> <FormControl>
                                                                <InputLabel htmlFor="demo-controlled-open-select">Email Reminder</InputLabel>
                                                                <div className="tasks-list-assign-to-menu-item">

                                                                    <Select
                                                                        open={this.state.open}
                                                                        onClose={this.handleOpenClose}
                                                                        onOpen={this.handleOpenClose}
                                                                        value={this.state.reminderType}
                                                                        onChange={e => this.setState({ reminderType: e.target.value })}
                                                                    >
                                                                        <MenuItem value="email" className="tasks-list-menu-list">

                                                                            <div className="task-list-menu-list-name">
                                                                                <p className="first-text">Email</p>

                                                                            </div>
                                                                        </MenuItem>
                                                                        <MenuItem value="Sms" className="tasks-list-menu-list">

                                                                            <div className="task-list-menu-list-name">
                                                                                <p className="second-text">Sms</p>

                                                                            </div>
                                                                        </MenuItem>
                                                                    </Select>
                                                                </div>
                                                            </FormControl></div>
                                                            <div className="addreminder">
                                                                <button className="button-addreminder" onClick={this.managerClickedPopup} >AddReminder</button></div>
                                                        </div>

                                                    )
                                                    : (

                                                        <div className='notification-task-list-popup'>
                                                            <div>
                                                                <div className="tasks-remainder">
                                                                    <span>TASK REMINDERS</span>

                                                                </div>
                                                                <div className="tasks-remainder1">
                                                                    <span>TASK: {tasksList.taskTitle}</span></div>
                                                                <div className="calendericon"><img className="img" src={calendarIcon} alt="calendarIcon" /></div>
                                                                <div className="task-reminderdescription">
                                                                    <h2 className="heading"><b>NO REMINDERS</b></h2>
                                                                    <span>There are no reminders on this task yet</span>
                                                                </div>
                                                            </div>
                                                            <div className="add-reminder">
                                                                <button className="button-reminder" onClick={this.assignClickedPopup}>AddReminders</button></div>
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
                                            <StopWatch taskId={tasksList.id} data={tasksList.taskHours} />
                                        </div>

                                        <img src={TaskListStarIcon}></img>
                                        <div className='tasks-list-clicl-more-button'>
                                            <Fab className='task-list-menu' size="small" aria-label="add">
                                                <img src={readMore} alt="" onClick={() => this.showTodayListPopup(tasksList.id)} />
                                                {
                                                    this.state.todayPopupId === tasksList.id && this.state.isTodayPopup ? (this.state.isAssignPopUp) ?
                                                        (
                                                            <div className='task-list-popup'>
                                                                <div className="close-icon-sec">
                                                                    <img className='sidebar-close-icon' src={sidebarToggleIcon} alt='sidebarToggleIcon' onClick={this.sidebarToggler} />
                                                                    <span>Assign/tranfer</span>
                                                                </div>
                                                                <div className="search-people">
                                                                    <InputBase
                                                                        placeholder="Search people"
                                                                        className="search-input"
                                                                        inputProps={{ 'aria-label': 'search' }}
                                                                        onClick={this.changeSearch}
                                                                    />
                                                                    <SearchIcon className="search-people-icon" />
                                                                </div>
                                                                <ul>
                                                                    {this.state.users != null || this.state.users != undefined ?
                                                                        this.state.users.map(user => {
                                                                            return <li className="tasks-list-icon people-check">
                                                                                <img src={profile}></img>
                                                                                <span className="profile-name">{user.firstName} {user.lastName}</span>
                                                                                <span><img src={tasksList.isCheck ? TaskListRectangleBlue : TaskListRectangleGray}></img></span>
                                                                            </li>
                                                                        }) : null

                                                                    }

                                                                </ul>
                                                            </div>
                                                        )
                                                        : (
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
                                                                    <li className="tasks-list-icon" onClick={this.assignClickedPopup}>

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

                        }) : <div className='data-null'><span>No Data Found</span></div>

                    }



                    <div className="tasks-list-heading"><span>TOMORROW</span>
                        <div className="tasks-list-heading-right">
                            <Button className="tasks-list-add-icon">
                                <img src={TasksListingAddIcon}></img>
                            </Button>
                            <Button className="tasks-list-up-arrow">
                                <img src={TasksListingUpArrow}></img>
                            </Button>
                        </div>

                    </div>

                    {
                        this.state.tomorrowData != null || this.state.tomorrowData != undefined ? this.state.tomorrowData.map((tasksList, index) => {
                            return (
                                <div className='tasks-list-task'>
                                    <div className='tasks-list-left-section'>

                                        <img src={TasksListEditIcon}></img>
                                        <img src={tasksList.isCheck ? TaskListRectangleBlue : TaskListRectangleGray}></img>
                                        <span className=''></span>
                                        <div className="tasks-list-task-name-and-time-section">
                                            <p className='tasks-list-task-name'>{tasksList.taskTitle}</p>
                                            <div className="tasks-list-time-section">
                                                <p className='tasks-list-time'>PROJECT NAME</p>
                                                <p className='tasks-list-time'>PHASE</p>
                                                <p className='tasks-list-due-days'>DUE DAYS</p>
                                            </div>
                                        </div>

                                        {
                                            <div className="tasks-list-task-name-hover">
                                                <div className='tasks-list-name-time'>
                                                    <div className="tasks-list-name-display">
                                                        <div>
                                                            <p className='tasks-list-name'>{tasksList.taskTitle}</p>
                                                            <p className="tasks-list-date">Sep 24 2019 <span>6:30 - 9:30PM</span></p>
                                                        </div>
                                                        <Button className="tasks-list-critical-button">
                                                            <img src={TaskListCriticalButton}></img>critical
                                                                </Button>
                                                    </div>

                                                    <div className="tasks-list-status-progress">
                                                        <p className="status-in-progress">STATUS : <span>IN PROGRESS</span> </p>
                                                        <Button className="tasks-list-status-percentage">50%</Button>
                                                    </div>
                                                    <div className="tasks-list-tags">
                                                        <p className="tasks-list-tags-text">TAGS :</p>
                                                        <div className="tasks-list-tags-section">
                                                            <div className="risk-critical-server">
                                                                <p className="tasks-list-risk">Risk</p>
                                                                <p className="tasks-list-critical">Critical Customer</p>
                                                                <p className="tasks-list-server">Server</p>
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

                                            <img className="tasks-list-hover-icons" src={tasksList.isCheck ? TaskListVerticalEllipse : TaskListVerticalEllipse} ></img>
                                            <img className="tasks-list-hover-icons" src={tasksList.isCheck ? TaskListRedExclamation : TaskListLowPriority}></img>
                                            <img className="tasks-list-hover-images" src={tasksList.isCheck ? TaskListAttachment : TaskListOpenTimer}></img>
                                            <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListExlamation}></img>
                                            <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListGroupMessage}></img>
                                            <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListSubdirectory}></img>
                                            <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListLink}></img>
                                            <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListBellIcon}></img>
                                            <img className="tasks-list-hover-icons" src={tasksList.isCheck ? null : TaskListBidirection}></img>
                                            <img className="tasks-list-hover-images" src={tasksList.isCheck ? null : TaskListAttachment}></img>
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
                                            <StopWatch taskId={tasksList.id} data={tasksList.taskHours} />
                                        </div>

                                        <img src={TaskListStarIcon}></img>
                                        <div className='tasks-list-clicl-more-button'>

                                            <Fab className='task-list-menu' size="small" aria-label="add">
                                                <img src={readMore} alt="" onClick={() => this.showTomorrowListPopup(tasksList.id)} />
                                                {
                                                    this.state.tomorrowPopupId === tasksList.id && this.state.isTomorrowPopup ? (this.state.isAssignPopUp) ?
                                                        (
                                                            <div className='task-list-popup'>
                                                                <div className="close-icon-sec">
                                                                    <img className='sidebar-close-icon' src={sidebarToggleIcon} alt='sidebarToggleIcon' onClick={this.sidebarToggler} />
                                                                    <span>Assign/tranfer</span>
                                                                </div>
                                                                <div className="search-people">
                                                                    <InputBase
                                                                        placeholder="Search people"
                                                                        className="search-input"
                                                                        inputProps={{ 'aria-label': 'search' }}
                                                                        onClick={this.changeSearch}
                                                                    />
                                                                    <SearchIcon className="search-people-icon" />
                                                                </div>
                                                                <ul>
                                                                    {this.state.users != null || this.state.users != undefined ?
                                                                        this.state.users.map(user => {
                                                                            return <li className="tasks-list-icon people-check">
                                                                                <img src={profile}></img>
                                                                                <span className="profile-name">{user.firstName} {user.lastName}</span>
                                                                                <span><img src={tasksList.isCheck ? TaskListRectangleBlue : TaskListRectangleGray}></img></span>
                                                                            </li>
                                                                        }) : null

                                                                    }

                                                                </ul>
                                                            </div>
                                                        )
                                                        : (
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
                                                                    <li className="tasks-list-icon" onClick={this.assignClickedPopup}>
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

                        }) : <div className='data-null'><span>No Data Found</span></div>
                    }
                </div>
            </div>
        );
    }
    render() {
        return <MainLayout secondSidebar={<TaskCollapsable thisObj={this} refreshData={this.refreshData} client={this.props.client} />} bodySection={this.bodySection()} />
    }
}

export default TaskListing;
