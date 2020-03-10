import React, { Component } from 'react';
import "./NewTaskListing.scss";
import moment from 'moment';
import Checkbox from '@material-ui/core/Checkbox';
import { Scrollbars } from 'react-custom-scrollbars';
import MainLayout from '../../containers/MainLayout/MainLayout';
import NewTaskCollapsable from '../../containers/NewTaskListing/NewTaskCollapsable/NewTaskCollapsable';
import DatePicker from 'react-date-picker';
import Header from '../../containers/Header/Header';
import SubHeader from '../../containers/SubHeaderNew/SubHeaderNew';
import featherChevronRight from '../../assets/icons/01-10-2019/Icon feather-chevron-right.svg'
import CreateTaskDrawer from '../../containers/CreateTaskDrawer/CreateTaskDrawer';
import EditTaskDrawer from '../../components/TicketingSystem/TasksList/EditTaskDrawer/EditTaskDrawer';
import CreateTicketDrawer from '../../components/TicketingSystem/TicketTable/SideDrawers/CreateTicketUpdated/CreateTicketDrawer';
import Fab from '@material-ui/core/Fab';
import readMore from '../../assets/icons/SVG/Iconawesome-ellipsis-v.svg'
import Button from '@material-ui/core/Button';
import TasksListingAddIcon from "../../assets/create-habit/Group 11382.svg";
import TasksListingUpArrow from "../../assets/icons/task-listing-more-icons/Task list icons/tsk_lstng_up.svg";
import TasksListingDownArrow from "../../assets/icons/task-listing-more-icons/Task list icons/task_lstng_down_arrow.svg";
import TasksListEditIcon from "../../assets/icons/task/icon-material-edit.svg";
import TasksListingMoreIcon from "../../assets/icons/task/icon-awesome-ellipsis-more.svg";
import TaskListRectangleGray from "../../assets/icons/task/group-11441.svg";
import TaskListRectangleGreen from "../../assets/icons/task/completed.svg";
import TaskListRectangleBlue from "../../assets/icons/01-10-2019/Rectangle 530.svg";
import TaskListVerticalEllipse from "../../assets/icons/task-listing-more-icons/Task list icons/ellipse.svg";
import TaskListLowPriority from "../../assets/icons/task-listing-more-icons/Task list icons/low-priority-1.svg";
import TaskListOpenTimer from "../../assets/icons/assets_Task list_2019-11-20/Icon open-timer.svg";
import TaskListExlamation from "../../assets/icons/task-listing-more-icons/Task list icons/exclamation-circle-1.svg";
import TaskListGroupMessage from "../../assets/icons/task-listing-more-icons/Task list icons/gorup_message.svg";
import TaskListSubdirectory from "../../assets/icons/task-listing-more-icons/Task list icons/subdirectory-arrow.svg";
import TaskListLink from "../../assets/icons/task-listing-more-icons/Task list icons/link-1.svg";
import TaskListBellIcon from "../../assets/icons/task-listing-more-icons/Task list icons/notifications.svg";
import TaskListBidirection from "../../assets/icons/task-listing-more-icons/Task list icons/bidirection.svg";
import TaskListAttachment from "../../assets/icons/task-listing-more-icons/Task list icons/attachment.svg";
import TaskListReportProblem from "../../assets/icons/assets_Task list_2019-11-20/Icon material-report-problem.svg";
import TaskListProfile from "../../assets/icons/assets_Task list_2019-11-20/rectangle_profile.png";
import TaskListStarIcon from "../../assets/icons/01-10-2019/Icon ionic-md-star-outline.svg";
import TaskListRedExclamation from "../../assets/icons/01-10-2019/Icon awesome-exclamation-circle.svg";
import TaskListPopupEye from "../../assets/icons/task-listing-more-icons/Icon feather-eye.svg";
import TasksListPopupEdit from "../../assets/icons/task-listing-more-icons/feather-edit.svg";
import TasksListPopupAssign from "../../assets/icons/task-listing-more-icons/assignment.svg";
import TasksListPopupBulk from "../../assets/icons/task-listing-more-icons/mail-bulk.svg";
import TasksListPopupMerge from "../../assets/icons/task-listing-more-icons/merge.svg";
import TasksListPopupProblem from "../../assets/icons/task-listing-more-icons/report-problem.svg"
import TasksListPopupConvert from "../../assets/icons/task-listing-more-icons/convert.svg";
import TasksListPopupLink from "../../assets/icons/task-listing-more-icons/link.svg";
import TasksListPopupDuplicate from "../../assets/icons/task-listing-more-icons/duplicate.svg";
import TasksListPopupDelete from "../../assets/icons/task-listing-more-icons/delete-sweep.svg";
import CompanyLogo from "../../assets/icons/01-10-2019/company-logo.svg";
import CompanyEditIcon from "../../assets/icons/SVG/Iconfeather-edit-3.svg";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItemImage from "../../assets/images/profile.png";
import gql from "graphql-tag";
import dropdownIcon from '../../assets/icons/01-10-2019/Icon ionic-md-arrow-dropdown.svg'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import sidebarToggleIcon from '../../assets/Sidenavbar-icons/Group 11332.svg';
import profile from "../../assets/images/profile.png";
import EditIcon from "../../assets/icons/task/Group 11531.svg";
import DeleteIcon from "../../assets/icons/task/DeleteIcon.svg";
import calendarIcon from "../../assets/icons/SVG/Icon metro-calendar.svg"
import MergeTask from "../../components/TicketingSystem/TasksList/MergeDrawer/MergeTaskDrawer";
import TaskListCriticalButton from "../../assets/icons/SVG/Ellipse 23.svg";
import { baseUrl } from "../../constants";
import StopWatch from "../../components/TicketingSystem/TasksList/StoperWatch/StopWatch";
import {
    getTodayData, getTomorrowData, getAllStatus1, getAllTags, getAllTasks,
    getAllProj, getAllTickets, getAllCompanies, getAllObjectives, getBacklogData,
    getUserById,getAllUsers,getAllReminder,
    addReminderMutation,deleteReminderMutation,
    updateReminder,assignTaskToUser,duplicateTask,deleteTasks

} from "./NewTaskListingQuery";
import activeIcon1 from "../../assets/icons/assets_Task list_2019-11-20/group-11588.svg";
import inActiveIcon1 from "../../assets/icons/task/icon-awesome-ellipsis-more.svg"
import searchIcon from '../../assets/Sidenavbar-icons/Icon feather-search-small.svg'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import TopLeft from "../../assets/icons/chat/top-right.svg";
import AssgnSrchIcn from "../../assets/icons/create-ticket/Icon feather-search.svg";
import tskLstngClrAdd from "../../assets/icons/assets_Task list_2019-11-20/Tsk_lst_tgs/Group 11594.svg";
import ClrPckrTray from "../../assets/icons/assets_Task list_2019-11-20/Tsk_lst_tgs/ionic-ios-color-palette.svg"
import { CirclePicker, TwitterPicker } from 'react-color';
import PrvcyIcn from "../../assets/icons/assets_Task list_2019-11-20/Tsk_lst_tgs/Icon feather-lock.svg";
import TaskListingAttachmentsDrawer from './TaskListingAttachmentsDrawer/TaskListingAttachmentsDrawer';
import TaskCommentsDrawer from './TaskCommentsDrawer/TaskCommentsDrawer';
import TaskLinkWithDrawer from './TaskLinkWithDrawer/TaskLinkWithDrawer';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TskRmdrCls from "../../assets/icons/assets_Task list_2019-11-20/Tsk_lst_tgs/Icon ionic-ios-close.svg";
import TskRmdrCal from "../../assets/icons/assets_Task list_2019-11-20/Tsk_lst_tgs/Icon metro-calendar.svg";
import profileIcon from '../../assets/profile.png';
import decrementIcon from '../../assets/icons/SVG/Group 11399.svg';
import edit from '../../assets/icons/assets_Task list_2019-11-20/Tsk_lst_tgs/Group 11531.svg';
import delet from '../../assets/icons/assets_Task list_2019-11-20/Tsk_lst_tgs/Group 11530.svg';
import AddRmdrIcn from '../../assets/icons/assets_Task list_2019-11-20/Tsk_lst_tgs/Icon feather-plus.svg';
import { Link } from 'react-router-dom';
import { async } from 'q';
import history from "../../Routes/history";
import ArrowTooltip from "../ToolTip/ToolTip";
import TaskListingStatusRight from '../../components/TaskListingComponents/TaskListingStatusRight';
import TaskListingTitleHeader from '../../components/TaskListingComponents/TaskListingTitleHeader'
import TaskListingActualEstimate from '../../components/TaskListingComponents/TaskListingActualEstimated'
import {RemainderModal, AddRemainderModal, ListOfRemainders} from '../../components/TaskListingComponents/TaskListingModal'
import NewEditTaskDrawer from './CreateEditTask';
import HoverIcons from '../../components/TaskListingComponents/HoverIcon'
import DependencyPop from '../../components/TaskListingComponents/Dependency'
import ColorPcikerPop from '../../components/TaskListingComponents/ColorPicker'
import AssignPopup from '../../components/TaskListingComponents/AssignPopup'
import {TaskListingObj} from '../../components/TaskListingComponents/TaskListingsObj'
import ToogglerIcn from '../../assets/Sidenavbar-icons/Group 11332.svg'

const colors = ['#1abc9c', '#17a085', '#2ecc71', '#27ae60', '#3498db', '#2980b9',
    '#9b59b6', '#8e44ad', '#34495e', '#2c3e50', '#f1c40e', '#f39c12',
    '#ecf1f9', '#c8c8c8', '#656565', '#464646']
const imgscr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"

// const userRemainders = [{ id: 0, icon: profile, name: 'Ram', date: '11/08/2019', time: '09:00 AM', mail: 'Email', editIcon: edit, deleteIcon: delet },
// { id: 1, icon: profile, name: 'Varun', date: '11/08/2019', time: '09:00 AM', mail: 'Email', editIcon: edit, deleteIcon: delet }
// ]

// const quickCreateIcons = [
//     { id: 0, icon: '', title: 'email' },
//     { id: 1, icon: '', title: 'sms' },
// ]


const tasksList = [
    { isCheck: false, taskName: 'Daily Stand-up meeting Daily Stan...', phase: 'PHASE1', dueDays: '2 DAYS PAST DUE', sevearity: 'Risk', customerType: 'Critical Customer', avatharIcon: imgscr, countDownTime: '00H 00M', countDownActualTime: '01H 59M' },
    { isCheck: true, taskName: 'Matrix1 onboarding process', phase: 'PHASE1', dueDays: '2 DAYS PAST DUE', sevearity: 'Phase1', customerType: 'Critical Customer', avatharIcon: imgscr, countDownTime: '22H 30M', countDownActualTime: '03H 59M' }
]


const color = ['#feb1b2', '#7ac9ff', '#ffc089', '#41e590', '#ea5455', '#c8c8c8', '#656565', '#ecf1f9']

const colorPicker = [
    { id: 0, title: 'Risk', color: '#b4e0ff' },
    { id: 1, title: 'Critical Customer', color: '#feb1b2' },
    { id: 2, title: 'Phase1', color: '#ffc089' },
    { id: 3, title: 'Technical', privacy: PrvcyIcn, color: '#57ffa8' },
    { id: 4, title: 'Server Issue', color: '#feb1b2' },
    { id: 5, title: 'Risk', color: '#b4e0ff' },
    { id: 6, title: 'Phase1', color: '#ffc089' }
]

// const dependency = [
//     { id: 0, title: 'Daily Stand-up meeting' },
//     { id: 1, title: 'Matrix! onboarding process' },
//     { id: 2, title: 'Daily Stand-up meeting' },
//     { id: 3, title: 'Matrix! onboarding process' },
//     { id: 4, title: 'Daily Stand-up meeting' },
// ]


// const demoTags = [
//     { id: 1, name: 'RISK' },
//     { id: 2, name: 'PHASE1' }
// ]

// const usersList = [
//     { id: 0, avatharImg: '', name: 'John doe' },
//     { id: 1, avatharImg: '', name: 'Ryan pazos' },
//     { id: 2, avatharImg: '', name: 'John doe' },
//     { id: 3, avatharImg: '', name: 'Mark' },
//     { id: 4, avatharImg: '', name: 'John doe' },
//     { id: 5, avatharImg: '', name: 'Ryan pazos' },
//     { id: 6, avatharImg: '', name: 'John doe' },
// ]

// const tsksLstngIcons = [
//     { id: 0, activeIcon: '', inactiveIcon: '', title: '' }
// ]

let time = ['12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM']
let wrapperRef;



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
  
class NewTasksListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            stateChecked: false,
            isShowPopup1: false,
            setShowPopup1: false,
            isShowPopup: false,
            setShowPopup: false,
            popupId: null,
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
            isShowColorPickerPopUp: false,
            isShowDependencyPopUp: false,
            isShowPopupTwo: false,
            isShowPopupThree: false,
            isShowPopupColor: false,
            moreIcons: [],
            tasksList: [],
            backlogData: [],
            todayData: [],
            tomorrowData: [],
            isOpenCreateTask: false,
            isAssignPopUp: false,
            ismanagerpopup: false,
            isshowaddreminderPopUp: false,
            isCTaskDrawerOpen: false,
            reminderTime: '',
            isEtdtaskDrawerOpen: false,
            isMergeDrawerOpen: false,
            isCheckArray: [],
            selectedTaskMerge: {},
            isShowPopupClone: false,
            popId: null,
            colorPicPopId: null,
            taskRmdrPopId: null,
            DependencyPopId: null,
            isShowPopup1Clone: false,
            reminder: [],
            assignedUser: 0,
            allStatus: [],
            allTags: [],
            modalOpen: false,
            addRmdrModalOpen: false,
            assignToSelection: [],
            users: [],
            popUpForTask: 0,
            fromDate: new Date(),
            // isShowAddRemainderPopup: false,
            isShowTaskRemainderModal: false,
            allTasks: [],
            allProjects: [],
            allTickets: [],
            allObjectives: [],
            allCompanies: [],
            clickedLinkTask: {},
            taskEditData: [],
            reminderType: 0,
            id: null,
            isShowColorPallet: false,
            isCollapse: false,
            isTodayCollapse: false,
            isTomorrowCollapse: false,
            moreOptions: [
                { id: 0, icon: TaskListPopupEye, title: 'View details', path: '/taskDetails' },
                { id: 1, icon: TasksListPopupEdit, title: 'Edit task', path: '', onMoreClick: this.onclickedittask },
                { id: 2, icon: TasksListPopupAssign, title: 'Assign / Transfer', path: '', onMoreClick: this.assignClickedPopup },
                { id: 3, icon: TasksListPopupBulk, title: 'Bulk update', path: '', onMoreClick: this.bulkUpdate },
                { id: 4, icon: TasksListPopupMerge, title: 'Merge', path: '', onMoreClick: this.isMergeTicketToggler },
                { id: 5, icon: TasksListPopupProblem, title: 'Report a challenge', path: '', onMoreClick: this.bulkUpdate},
                { id: 6, icon: TasksListPopupConvert, title: 'Convert task to habit', path: '', onMoreClick: this.bulkUpdate },
                { id: 7, icon: TasksListPopupLink, title: 'Link with ticket', path: '', onMoreClick: this.taskLinkDrawer },
                { id: 8, icon: TasksListPopupLink, title: 'Link with Task', path: '', onMoreClick: this.taskLinkDrawer },
                { id: 9, icon: TasksListPopupLink, title: 'Link with Objective', path: '', onMoreClick: this.taskLinkDrawer },
                { id: 10, icon: TasksListPopupLink, title: 'Link with project', path: '', onMoreClick: this.taskLinkDrawer },
                { id: 11, icon: TasksListPopupDelete, title: 'Delete', path: '', onMoreClick: this.bulkUpdate }
            ],
            moreIconId: 1,
            isCreateEditTaskDrawerOpen: false,
            isCreateTask: false,
            isEditTask: false,
            }
    }
    componentDidMount() {
        const token = localStorage.getItem('jwtToken');
        const client = this.props.client;
        if (token === null || token === undefined || token === '') {
            history.push('/');
        }
        document.addEventListener('mousedown', this.handleClickOutsideBody);
        this.fetchReminder();
        getUserById(res=>{
            this.setState({ logedUser: res.data.getUserById })
            if (res.data.getUserById != null && res.data.getUserById != undefined) {
                if (res.data.getUserById.companyId != null) {
                    var tagByCmpId = res.data.getUserById.companyId
                } else if (res.data.getUserById.tenantId != null) {
                    var tagByCmpId = res.data.getUserById.tenantId
                }
                getAllTags(
                    client, tagByCmpId, data => {
                        this.setState({ allTags: data.data.allTags })
                    }
                )
            }
            return res;
        })


        getAllUsers(client,res=>{
            this.setState({ users: res })
            return res
        })


        // let client = this.props.client;
        this.getAllBackLogsData();
        this.getAllTodayData();
        this.getTomorrowData();
        this.getAllStatus1Data();

        getAllTasks(
            client, data => {
                this.setState({ allTasks: data.data.tasksList })
            }
        );
        getAllProj(
            client, data => {
                this.setState({ allProjects: data.data.getAllProjects })
            }
        );
        getAllTickets(
            client, data => {
                this.setState({ allTickets: data.data.ticketsList })
            }
        );
        getAllCompanies(
            client, data => {
                this.setState({ allCompanies: data.data.getAllCompany })
            }
        );
        getAllObjectives(
            client, data => {
                this.setState({ allObjectives: data.data.getAllObjectives })
            }
        );
    };

    allDataRefresh = () => {
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
    }
    fetchReminder = () => {
        let client  = this.props.client;
        getAllReminder(client,res=>{
            let reminderData = res.data.remonderList;
            this.setState({ reminderData: reminderData });
        })
    };
    dateChangeHandler = (date, dateType) => {
        this.setState({ [dateType]: date })
    }
    getTaskStartTime = (time) => {
        let date = new Date(time)
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    }
    getAllBackLogsData = () => {
        let client = this.props.client;
        getBacklogData(
            client, 1, backlogData => {
                return this.setState({ backlogData: backlogData.data.getBacklogTasks });
            }
        );
    }

    getAllTodayData = () => {
        let client = this.props.client;
        getTodayData(
            client, 1, todayData => {
                this.setState({ todayData: todayData.data.getTodayTasks });
            }
        );
    }
    getTomorrowData = () => {
        let client = this.props.client;
        getTomorrowData(
            client, 1, tomorrowData => {
                this.setState({ tomorrowData: tomorrowData.data.getTomorrowTasks });
            }
        );
    }
    getAllStatus1Data = () => {
        let client = this.props.client;
        getAllStatus1(
            client, data => {
                this.setState({ allStatus: data.data.getAllStatus });
            }
        );
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

    dateChangeHandler = (date, dateType) => {
        this.setState({ [dateType]: date })
    }

    cloneButtonOnCLick = () => {
        this.setState({
            isShowPopupClone: !this.state.isShowPopupClone,
        })
    }



    array = []
    checkBox = (id) => {
        if (this.array.includes(id)) {
            let index = this.array.indexOf(id)
            this.array.splice(index, 1);
            this.setState({ isCheckArray: this.array })
        } else {
            this.array.push(id)
            this.setState({ isCheckArray: this.array })
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
    taskLinkDrawer = () => {
        this.setState({ isTaskLinkWithDrawer: !this.state.isTaskLinkWithDrawer, clickedLinkTask: tasksList })
    }

    showTaskListPopup = (index) => {
        this.setState({ isAssignPopUp: false, isShowPopupClone: false, isShowPopup: !this.state.isShowPopup });
        this.setState({ ismanagerPopUp: false, isShowPopup1Clone: false, isShowPopup1: !this.state.isShowPopup1 });
        this.setState({ popupId: index })

    };

    buttonOneOnCLick = async(index, userId) => {
        await this.setState({ isShowPopupOne: !this.state.isShowPopupOne });
        this.setState({ popId: index, assignedUser: userId, popUpForTask: index })
    }
    assignClickedPopup = (index, userId) => {
        console.log('assignClickedPopup_assignClickedPopup', this.state.isAssignPopUp)
        this.setState({ isAssignPopUp: !this.state.isAssignPopUp, isShowPopupClone: false, assignedUser: userId, popUpForTask: index })
    }

    buttonColorPickerOnCLick = (index) => {
        this.setState({ isShowColorPickerPopUp: !this.state.isShowColorPickerPopUp });
        this.setState({ colorPicPopId: index })
    }

    buttonDependencyOnCLick = (index) => {
        this.setState({ isShowDependencyPopUp: !this.state.isShowDependencyPopUp });
        this.setState({ DependencyPopId: index })
    }


    managerClickedPopup = async (e) => {
        this.setState({ ismanagerPopUp: true, isShowPopup1Clone: false })
        let variables = {
            reminderDependecyId: this.state.reminderDependecyId,
            reminderType: this.state.reminderType,
            reminderTime: this.state.reminderTime,
        }
        addReminderMutation(this.props.client,variables,res=>{
            return res
        })
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

    handleChangeComplete = (e) => {
        this.setState({ selectedNewTagColor: e.hex, isShowColorPallet: false })

    }
    onclickedittask = (taskdetails) => {
        this.setState({ 
            isCreateEditTaskDrawerOpen: true, 
            isEditTask: true,
            taskEditData: taskdetails 
        });
    }
    bulkUpdate = (e) => {
        return;
    }

    changeSearch = (e) => {
    }
    sidebarToggler = () => {
        this.setState({ isAssignPopUp: false })
        this.setState({ ismanagerPopUp: false })
    }
    addreminder = (index, id) => {
        this.setState({
            listRmdrModalOpen: !this.state.listRmdrModalOpen,
            addRmdrModalOpen: true,
            taskRmdrPopId: index,
            id: id
        });
    }

    editreminder = (id) => {
        this.setState({ ismanagerPopUp: false })
        let variables = {
            reminderDependecyId: this.state.reminderDependecyId,
            reminderType: this.state.reminderType,
            reminderTime: this.state.reminderTime,
        }
        updateReminder(this.props.client,variables,res=>{
            return res
        })
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
                isShowMoreOptions: false,

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
    }

    handleChangeAssignTo = async (data, user) => {
        this.setState({ assignedUser: user });
        const client = this.props.client;

        let variables= {
            id: data.id,
            assignTo: user,
        }
        assignTaskToUser(client,variables,res=>{
            return res;
        });
        this.getAllBackLogsData();
        this.getAllTodayData();
        this.getTomorrowData();
    };


    handleOpen = (title, id) => {
        this.setState({
            modalOpen: !this.state.modalOpen,
            isShowTaskRemainderModal: true,
            taskRmdrPopId: title,
            id: id
        });
    };

    handleClose = () => {
        this.setState({ isShowTaskRemainderModal: false, addRmdrModalOpen: false, listRmdrModalOpen: false, modalOpen: false });
    };

    addRmdrOpen = async (title, id) => {
        // this.setState({ isShowAddRemainderPopup: true })  
        this.setState({
            addRmdrModalOpen: !this.state.addRmdrModalOpen,
            isShowTaskRemainderModal: false,
            taskRmdrPopId: title,
            id: id

        });
    };

    listRmdrOpen = async (title, id) => {
        // this.setState({ isShowAddRemainderPopup: true })  
        this.setState({
            listRmdrModalOpen: !this.state.listRmdrModalOpen,
            addRmdrModalOpen: false,
            taskRmdrPopId: title,
            id: id
        });
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

    handleClickOutsideBody = async (event) => {
        if (wrapperRef && !wrapperRef.contains(event.target)) {
            await this.setState({
                isShowColorPickerPopUp: false,
                isShowDependencyPopUp: false,
                isShowPopupOne: false,
                isShowPopup: false,
                isAssignPopUp: false
            })
            //   this.refreshCells()
        }
    }
    setWrapperRef = (node) => wrapperRef = node;
    // addRmdrOpen = async (index) => {
    //     // this.setState({ isShowAddRemainderPopup: true })  
    //     this.setState({
    //         addRmdrModalOpen: !this.state.addRmdrModalOpen,
    //         isShowTaskRemainderModal: false,
    //         taskRmdrPopId: index
    //     });
    //   };
    arrayToAssign = [];
    listRmdrOpen = async (taskList, id) => {
        // this.setState({ isShowAddRemainderPopup: true })  
        this.setState({
            listRmdrModalOpen: !this.state.listRmdrModalOpen,
            addRmdrModalOpen: false,
            taskRmdrPopId: taskList,
            id: id
        });

        let variables= {
            reminderTitle: this.state.taskRmdrPopId,
            reminderDependecyId: this.state.id,
            reminderType:this.state.reminderType,
            reminderTime:this.state.fromDate,
            reminderFor:"tasks"
        }
        addReminderMutation(this.props.client,variables,res=>{
            return res;
        })
      
      };
      
      deletereminder=(id)=>{
        this.setState({ismanagerPopUp:true})

        deleteReminderMutation(this.props.client,id,res=>{
            this.arrayRem = this.state.reminderData
            if (this.arrayRem.length != 0) {
                let index = this.arrayRem.indexOf(res.data.removereminder)
                this.arrayRem.splice(index, 1);
            }
            this.setState({reminderData:this.arrayRem})
            return res;
        })
    }
    iscommentToggler = (id) => {
        this.setState({ selectedTaskcomment: id, isTaskCommentsDrawerOpen: !this.state.isTaskCommentsDrawerOpen })
    }
    isAttachmentToggler = (id) => {
        this.setState({ selectedTaskattachment: id, isTaskAttachmentDrawerOpen: !this.state.isTaskAttachmentDrawerOpen })
    }

    arrayToAssign = [];
    quickHandleClick = (icon) => {
        this.setState({ reminderType: icon.title })

    }
    colorPalletPopup = () => (
        <div className='task-lstng-tag-color-pallet-popup' ref={this.setWrapperRef}>
            <span>Color palette</span>
            <TwitterPicker className="tsk-lstng-twt-pckr" colors={colors} onChangeComplete={this.handleChangeComplete} />
        </div>
    )
//! conflict accepted incoming by sagar******************************
// taskduplicate =(id) =>{

    //     duplicateTask(this.props.client,id,res=>{
    //         let tasksduplicate = res.data.duplicateTask;
    //         this.setState({ tasksduplicate: tasksduplicate });
    //         return res
    //     })
    // }
    // taskdelete = (id) => {


    //     deleteTasks(this.props.client,id,res=>{
    //         let tasksdelete = res.data.removeTasks;
    //         this.setState({ tasksdelete: tasksdelete });
    //         return res;
    //     })
    //   };
    // taskRemainderModelBody =(task,id)=> {
    //    return (
    //        <div className="tsk-rmdr-section">
    //            <div className="tsk-rmdr-hdr-nm-cls-icn d-flex justify-space-between">
    //                <p className="tsk-rmdr-hdr-txt">TASK REMAINDERS</p>
    //                <img src={TskRmdrCls} alt="" className="tsk-rmdr-cls-icn" onClick={this.handleClose}></img>
    //            </div>
    //            <div className="tsk-rmdr-daly-stnd-mtng d-flex align-items-center">
    //                <p className="tsk-rmdr-tak">Task:</p><span className="tsk-rmdr-tak-daly-std">{this.state.taskRmdrPopId}</span>
    //            </div>
    //            <div className="tsk-rmd-cal-txt-btn d-flex justify-content-center align-items-center flex-column">
    //                    <img src={TskRmdrCal} alt="cal" className="tsk-rmdr-cal"></img>
    //                    <p className="no-rmdr-txt">NO REMAINDERS</p>
    //                    <p className="no-rmdr-tsk">There are no remainders on this task yet</p>
    //                    <Button className="tsk-rmd-add-rmd" onClick={() => this.addRmdrOpen(this.state.taskRmdrPopId,this.state.id) }>Add Remainders</Button>
    //                </div>
    //            </div>
   
    //        )
    //    }
   
    //    addRemainderModalBody = (tasksList,id) => {
    //        return (
    //            <div className="tsk-rmdr-section">
    //                <div className="tsk-rmdr-hdr-nm-cls-icn d-flex justify-space-between">
    //                    <p className="tsk-rmdr-hdr-txt">TASK REMAINDERS</p>
    //                    <img src={TskRmdrCls} alt="" className="tsk-rmdr-cls-icn" onClick={this.handleClose}></img>
    //                </div>
    //                <div className="tsk-rmdr-daly-stnd-mtng d-flex align-items-center">
    //                    <p className="tsk-rmdr-tak">Task:</p><span className="tsk-rmdr-tak-daly-std" >{this.state.taskRmdrPopId}</span>
    //                </div>
    //                <div>
    //                    <div className='tsk-rmdr-assignTo-dropdown-container'>
    //                        <div className='tsk-rmdr-assignTo-non-library-dropdown'>
    //                            <div className='tsk-rmdr-selected-item-container'>
    //                                {this.state.assignToSelection.length == 0 ? 'Task Remainder' :
    //                                    this.state.assignToSelection.map(item =>
    //                                        <div className='tsk-rmdr-selected-item-template'>
    //                                            <img id='avathar-img' src={profileIcon} alt='profileIcon' />
    //                                            <span>{item.firstName} {item.lastName}</span>
    //                                            <img id='remove-img' src={decrementIcon} alt='decrementIcon' onClick={() => this.assignToCheck(item)} />
    //                                        </div>
    //                                    )}
    //                            </div><img className='tsk-rmdr-drop-toggler' src={dropdownIcon} alt='dropdownIcon' onClick={() => this.setState({ isShowAssignToDrop: !this.state.isShowAssignToDrop })} />
    //                        </div>
   
    //                        <div className={`tsk-rmdr-assignTo-custome-dropdown-menu-container ${this.state.isShowAssignToDrop ? 'tsk-rmdr-assignTo-custome-open-dropdown zIndex' : 'tsk-rmdr-assignTo-custome-close-dropdown'}`} ref={this.setWrapperRef} >
    //                            <div className='assign-to-list-container'>
    //                                {this.state.users.map(assignTo => {
    //                                    return (
    //                                        <div className='assign-to-item'>
    //                                            <div className='assign-item-avatar'>
    //                                                <img src={profileIcon} alt='profileIcon' />
    //                                                <span>{assignTo.firstName} {assignTo.lastName}</span>
    //                                                <Checkbox className='avatar-item-checkbox' name='assignToChecked' onChange={() => this.assignToCheck(assignTo)} checked={this.state.assignToSelection.includes(assignTo)} />
    //                                            </div>
    //                                        </div>
    //                                    )
    //                                })}
    //                            </div>
    //                        </div>
    //                    </div>
    //                </div>
    //                <p className="hw-snd-rmdr">When and how will we send the remainder?</p>
    //                <div className="tsk-rmdr-dte-nd-tym">
    //                    <div className='tsk-rmd-dte-tym'>
    //                        <div id='tsk-dtpckt-btn'>
    //                            <Button variant="contained" className={'Crt-tsk-custome-button'} onClick={'onClick'}>{this.state.fromDate ? moment(this.state.fromDate).format("MMM, DD YYYY") : 'From Date'}</Button>
    //                            <DatePicker showYearDropdown yearDropdownItemNumber={15} onChange={(date) => this.dateChangeHandler(date, 'fromDate')} value={this.state.fromDate} clearIcon={null} />
    //                        </div>
    //                        {
    //                            !this.state.isAllDay ?
    //                                (
    //                                    <div className='CT-time-setter'>
    //                                        <Button variant="contained" className={'Crt-tsk-custome-button Crt-tsk-time-btn'} onClick={() => this.setState({ isShowFromSetTimePopup: !this.state.isShowFromSetTimePopup })}>{this.state.fromTime ? this.state.fromTime : 'HH:MM'}</Button>
    //                                        {this.state.isShowFromSetTimePopup ? this.setTimePopup(time, 'fromTime') : null}
    //                                    </div>
    //                                ) : null
    //                        }
   
    //                    </div>
    //                    <div className='tsk-rmdr-eml-rmdr-sctn'>
    //                        <div className='tsk-rmdr-eml'>
    //                            <div className='selected-item-container'>
    //                                <p>{this.state.reminderType ? this.state.reminderType : 'Email Remainder'}</p>
    //                            </div>
    //                            <div className="eml-drp-dwn-img">
    //                                <img src={dropdownIcon} onClick={() => this.setState({ isQuickCreateDropdown: !this.state.isQuickCreateDropdown })} />
    //                            </div>
    //                        </div>
    //                        <div className={`dropdown-menu-container ${this.state.isQuickCreateDropdown ? 'open-dropdown' : 'close-dropdown'}`} ref={this.setWrapperRef}>
                              
    //                            <Scrollbars className="custom-scroll" style={{ height: 160 }}>
    //                                {
    //                                    quickCreateIcons.map(icon =>
    //                                        <StyledMenuItem className="customized-ticket-list" onClick={() => this.quickHandleClick(icon)} onClose={this.handleClose}>
    //                                            <div className="quick-create-ticket-one d-flex">
    //                                                {/* <img src={icon.icon} alt='icon'/> */}
    //                                                <p>{icon.title}</p>
    //                                            </div>
   
    //                                        </StyledMenuItem>
    //                                    )}
    //                            </Scrollbars>
    //                        </div>
    //                    </div>
    //                </div>
    //                <div className="tsk-rmdr-add-btn">
    //                    <Button className="tsk-rmd-add-rmd-btn" onClick={() => this.listRmdrOpen(this.state.taskRmdrPopId,this.state.id)}>Add Remainder</Button>
    //                </div>
    //            </div>
    //        )
    //    }
   
     
    //  listOfTskRemainders=(tasksList,id)=> {
    //    return(
    //      <div className="tsk-rmdr-section">
    //      <div className="tsk-rmdr-hdr-nm-cls-icn d-flex justify-space-between">
    //          <p className="tsk-rmdr-hdr-txt">TASK REMAINDERS</p>
    //          <img src={TskRmdrCls} alt="" className="tsk-rmdr-cls-icn" onClick={this.handleClose}></img>
    //      </div>
    //      <div className="tsk-rmdr-daly-stnd-mtng d-flex align-items-center">
    //          <p className="tsk-rmdr-tak">Task:</p><span className="tsk-rmdr-tak-daly-std">{this.state.taskRmdrPopId}</span>
    //      </div>
    //      <div>
    //          <div className="who-whn-hw-section">
    //              <div className="remind-who">
    //                  <p>Remind Who?</p>
    //              </div>
    //              <div className="remind-whn">
    //                  <p>When?</p>
    //              </div>
    //              <div className="remind-hw">
    //                  <p>How</p>
    //              </div>
    //          </div>
    //          <div className="users-who-whn-hw-section ">
    //          { 
    //            this.state.reminderData ? this.state.reminderData.map(users => {
    //             if(users.reminderDependecyId== this.state.id){
    //                  return <div className="users-who-whn-hw d-flex">
    //                              <div className="user-name-profile">
    //                                  <div className="usr-dtls">
    //                                      <img src={users.icon}></img>
    //                                      <span>{users.reminderTitle}</span>
    //                                  </div>
    //                              </div>
    //                              <div className="user-name-dte d-flex">
    //                                  <p value= {users.reminderTime}>{users.reminderTime}</p>
    //                              </div>
    //                              <div className="user-name-eml d-flex">
    //                                  <p value={users.reminderType}>{users.reminderType}</p>
    //                                  <div className="edit-dlt-btn d-flex">
    //                                  <img src={EditIcon} onClick={() => this.editreminder(users.id)} ></img>
                             
    //                                      <img src={DeleteIcon} onClick={() => this.deletereminder(users.id)}></img>
    //                                  </div>
                                 
    //                              </div> 
   
    //                          </div>
    //             }
    //              }):null
//! conflict accepted incoming by sagar******************************

taskduplicate =(id) =>{

    duplicateTask(this.props.client,id,res=>{
        let tasksduplicate = res.data.duplicateTask;
        this.setState({ tasksduplicate: tasksduplicate });
        return res
    })
}
taskdelete = (id) => {


    deleteTasks(this.props.client,id,res=>{
        let tasksdelete = res.data.removeTasks;
        this.setState({ tasksdelete: tasksdelete });
        return res;
    })
  };
    taskRemainderModelBody = (task, id) => {
        return (
            <RemainderModal
                tskRmdrCls = {TskRmdrCls}
                closeHandle = {this.handleClose}
                taskRmdrPop = {this.state.taskRmdrPopId}
                tskRmdrCldnr = {TskRmdrCal}
                addRmdrOpn = {() => this.addRmdrOpen(this.state.taskRmdrPopId, this.state.id)}
            />

        )
    }

    addRemainderModalBody = (tasksList, id) => {
        return (
            <AddRemainderModal
                tskRmdrCls = {TskRmdrCls}
                closeHandle = {this.handleClose}
                taskRmdrPop = {this.state.taskRmdrPopId}
                profileIcon = {profileIcon}
                decrementIcon = {decrementIcon}
                dropdownIcon = {dropdownIcon}
                assignToDrop = {() => this.setState({ isShowAssignToDrop: !this.state.isShowAssignToDrop })}
                showAssign = {this.state.isShowAssignToDrop}
                assignToCheck = {() => this.assignToCheck}
                assignToSelection = {this.state.assignToSelection}
                users = {this.state.users}
                lstRmdrOpen = {() => this.listRmdrOpen(this.state.taskRmdrPopId, this.state.id)}
                setTimePopup = {this.state.isShowFromSetTimePopup ? this.setTimePopup(time, 'fromTime') : null}
                fromDate = {this.state.fromDate}
                dateChange= {(date) => this.dateChangeHandler(date, 'fromDate')}
                setTimePop={() => this.setState({ isShowFromSetTimePopup: !this.state.isShowFromSetTimePopup })}
                fromTime={this.state.fromTime}
                allDay= {!this.state.isAllDay}
                reminderType={this.state.reminderType}
                quickCreate ={() => this.setState({ isQuickCreateDropdown: !this.state.isQuickCreateDropdown })}
                createQuick ={this.state.isQuickCreateDropdown}
                handleQuick = {() => this.quickHandleClick}
                
           />
          
        )
    }


    listOfTskRemainders = (tasksList, id) => {
        return (
            <ListOfRemainders
                tskRmdrCls = {TskRmdrCls}
                handleClose = {this.handleClose}
                tskRmdrPop = {this.state.taskRmdrPopId}
                editIcon = {EditIcon}
                deleteIcon = {DeleteIcon}
                addRmdrIcn = {AddRmdrIcn}
                edit = {() => this.editreminder}
                delete = {() => this.deletereminder}
                add = {(e) => this.addreminder(e)}
            />
        )
    }

//! conflict accepted incoming by sagar******************************

    linkWithDrawer = () => {
        this.setState({ isTaskLinkWithDrawer: !this.state.isTaskLinkWithDrawer, clickedLinkTask: tasksList })
    }

    openCreateTaskHandler=()=> {
        this.setState({ 
            isCreateEditTaskDrawerOpen: !this.state.isCreateEditTaskDrawerOpen, 
            isEditTask: false 
        })
    }

    bodySection = () => {
        let { isShowTaskRemainderModal, addRmdrModalOpen, listRmdrModalOpen } = this.state;
        return (
            <div className="tsks-lstng-body-section">
                {/* <CreateTaskDrawer isOpenCreateTask={this.state.isOpenCreateTask} thisObj={this} /> */}
                { this.state.isTaskAttachmentDrawerOpen?<TaskListingAttachmentsDrawer isTaskAttachmentDrawerOpen={this.state.isTaskAttachmentDrawerOpen} selectedattachment={this.state.selectedTaskattachment} thisObj={this}/>:null }
                {/* {this.state.isCTaskDrawerOpen ? <CreateTaskDrawer isCTaskDrawerOpen={this.state.isCTaskDrawerOpen} thisObj={this} /> : null} */}
                {/* {this.state.isCreateTaskDrawerOpen ? <NewEditTaskDrawer open={this.state.isCreateTaskDrawerOpen} thisObj={this} /> : null} */}
                
                
                { this.state.isCreateEditTaskDrawerOpen ? <NewEditTaskDrawer open={this.state.isCreateEditTaskDrawerOpen} thisObj={this} client={this.props.client} dataToBeEdit={ this.state.isEditTask ? this.state.taskEditData : '' } /> : <></>}

                
                { this.state.isTaskCommentsDrawerOpen?<TaskCommentsDrawer isTaskCommentsDrawerOpen={this.state.isTaskCommentsDrawerOpen} selectedcomment={this.state.selectedTaskcomment} thisObj={this}/>:null }
                { this.state.isTaskLinkWithDrawer ? <TaskLinkWithDrawer isTaskLinkWithDrawer={this.state.isTaskLinkWithDrawer} client={this.props.client} linkTask={this.state.clickedLinkTask} thiState={this.state} thisObj={this} /> : null}

                <Header />
                <SubHeader />
                {this.state.isMergeDrawerOpen ?
                    <MergeTask isMergeDrawerOpen={this.state.isMergeDrawerOpen} selectedTask={this.state.isCheckArray} selectedMergeTask={this.state.selectedTaskMerge} thisObj={this} />
                    : null}

                <div className='tsks-lstng-body-container'>

                    <div className="tasks-listing-heading">
                        <span>BACKLOG</span>
                        <TaskListingTitleHeader
                            tasksListingAddIcon={TasksListingAddIcon}
                            tasksListingDownArrow={TasksListingDownArrow}
                            tasksListingUpArrow={TasksListingUpArrow}
                            collapse={this.state.isCollapse}
                            listOpen={() => this.setState({ isBackLogOpen: !this.state.isBackLogOpen, isCollapse: !this.state.isCollapse })}
                            ctaskDrawerOpen={this.openCreateTaskHandler}
                        />

                    </div>
                    <div className={`tsks-lstngs-bckglg-dtls ${!this.state.isBackLogOpen ? 'tsk-open-dropdown' : 'tsk-close-dropdown'}`}>
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

                                            <TaskListingStatusRight
                                                tasksListingMoreIcon={TasksListingMoreIcon}
                                                tasksListEditIcon={TasksListEditIcon}
                                                taskListRectangleGreen={TaskListRectangleGreen}
                                                taskListRectangleGray={TaskListRectangleGray}
                                                isCheckedArray={this.state.isCheckArray.includes(tasksList)}
                                                checkedBox={() => this.checkBox(tasksList)}
                                                editTask={() => this.onclickedittask(tasksList)}
                                                taskData={tasksList}
                                                startTime={this.getTaskStartTime(tasksList.startTime)}
                                                taskListVerticalEllipse={TaskListVerticalEllipse}
                                                statusNameData={this.state.allStatus}
                                                tagsData={this.state.allTags}
                                            />

                                            <div className='tasks-listing-icon-show-on-hover'>
                                                    <HoverIcons
                                                       commentToggler = {() => this.iscommentToggler(tasksList)}
                                                       dependency = {() => this.buttonDependencyOnCLick(tasksList.id)}
                                                    //    linkWithDrawer = {() => this.linkWithDrawer}
                                                       linkWithDrawer = {() => this.taskLinkDrawer(tasksList, tasksList.id, tasksList.assignTo)}
                                                       openHandle = {() => this.handleOpen(tasksList.taskTitle, tasksList.id)}
                                                       attachment = {() => this.isAttachmentToggler(tasksList)}
                                                       buttonOne = {() => this.buttonOneOnCLick(tasksList.id, tasksList.assignTo)}
                                                       colorPicker = {() => this.buttonColorPickerOnCLick(tasksList.id)}
                                                    />
                                                
                                                {
                                                    <Modal
                                                        className="tsk-rmd-mdl"
                                                        aria-labelledby="simple-modal-title"
                                                        aria-describedby="simple-modal-description"
                                                        open={this.state.modalOpen}
                                                        onClose={this.handleClose}
                                                    >
                                                        <div className="tsk-rmdr-paper">
                                                            {isShowTaskRemainderModal ? this.taskRemainderModelBody(this.state.taskRmdrPopId, this.state.id) : null}
                                                            {addRmdrModalOpen ? this.addRemainderModalBody(this.state.taskRmdrPopId, this.state.id) : null}
                                                            {listRmdrModalOpen ? this.listOfTskRemainders(this.state.taskRmdrPopId, this.state.id) : null}

                                                        </div>
                                                    </Modal>
                                                }

                                                {
                                                    this.state.colorPicPopId === tasksList.id && this.state.isShowColorPickerPopUp ? (
                                                        <ColorPcikerPop
                                                        colorPicker = {colorPicker}
                                                        handleChange ={this.handleChange}
                                                        isShowColorPallet = {(e) => {
                                                                                e.stopPropagation()
                                                                                {this.setState({isShowColorPallet: !this.state.isShowColorPallet})}
                                                                            }}
                                                        pallet = {this.state.isShowColorPallet}
                                                        palletPop = {this.colorPalletPopup()}
                                                        color = {color}
                                                        handleChangeComplete ={this.handleChangeComplete}
                                                        styles={TaskListingObj.colorPickerStls}
                                                        />

                                                    ) : null
                                                }

                                                {
                                                    this.state.DependencyPopId === tasksList.id && this.state.isShowDependencyPopUp ? (
                                                        <DependencyPop
                                                            backlogData={this.state.backlogData}
                                                            taskData={tasksList}
                                                            changeHandle={this.handleChange}
                                                            styles = {TaskListingObj.dependencyPopup}
                                                            header = {TaskListingObj.dependencyTxt}       
                                                        />
                                                        ) : null
                                                }

                                                {
                                                    this.state.popId === tasksList.id && this.state.isShowPopupOne ? (
                                            
                                                        <AssignPopup
                                                            taskListProfile = {TaskListProfile}
                                                            searchIcon = {searchIcon}
                                                            handleChangeAssignTo = {() => this.handleChangeAssignTo}
                                                            users = {this.state.users}
                                                            assignedUser = {this.state.assignedUser}
                                                            taskData = {tasksList}
                                                            assignText= {TaskListingObj.AssignText}
                                                            styles = {TaskListingObj.AssignStyles}
                                                            
                                                        />

                                                    ) : null
                                                }

                                            </div>

                                        </div>


                                        <div className='tasks-listing-right-section'>

                                            <TaskListingActualEstimate
                                                taskData={tasksList}
                                                progressEstimatedTime={moment(tasksList.progressEstimatedTime).format('hh[H] mm[M]')}
                                            />


                                            <div className="tsk-lstng-mr-str">
                                                <img src={TaskListStarIcon}></img>

                                                <div className='tasks-listing-click-more-button'>


                                                    <Fab className='task-listing-menu' size="small" aria-label="add">
                                                        <img className='more-icon' src={readMore} onClick={() => this.showTaskListPopup(tasksList.id)} />
                                                        {
                                                            this.state.popupId === tasksList.id && this.state.isShowPopup ? (this.state.isAssignPopUp) ?
                                                                (
                                                                    <AssignPopup
                                                                        taskListProfile = {TaskListProfile}
                                                                        searchIcon = {searchIcon}
                                                                        handleChangeAssignTo = {() => this.handleChangeAssignTo}
                                                                        users = {this.state.users}
                                                                        assignedUser = {this.state.assignedUser}
                                                                        taskData = {tasksList}
                                                                        assignText= {TaskListingObj.AssignText}
                                                                        styles = {TaskListingObj.MoreAssignStyles}
                                                                        toogglerIcn = {ToogglerIcn }
                                                                        sidebarToggler = {this.sidebarToggler}
                                                                        changeSearch={this.changeSearch}
                                                                    />
                                                                )
                                                                : (
                                                                    <div className='tasks-listing-popup' ref={this.setWrapperRef}>
                                                                        <ul>
                                                                            {
                                                                                this.state.moreOptions.map(more => {

                                                                                    return <Link
                                                                                        to={{
                                                                                            pathname: more.path,
                                                                                            state: { taskData: tasksList }
                                                                                        }}
                                                                                    >
                                                                                        <li key={more.id} className='tasks-listing-icon'
                                                                                            onClick={() => more.onMoreClick(tasksList, tasksList.id, tasksList.assignTo)}
                                                                                        >
                                                                                            <img src={more.icon} alt=""></img>
                                                                                            <span>{more.title}</span>
                                                                                        </li>
                                                                                    </Link>
                                                                                })
                                                                            }

                                                                        </ul>
                                                                    </div>
                                                                                      
                                                                ) : null
                                                        }
                                                    </Fab>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <div className='tsk-lstng-data-null'><span>No Data Found</span></div>
                        }
                    </div>
                    <div className="tasks-listing-heading">
                        <span>TODAY</span>

                        <TaskListingTitleHeader
                            tasksListingAddIcon={TasksListingAddIcon}
                            tasksListingDownArrow={TasksListingDownArrow}
                            tasksListingUpArrow={TasksListingUpArrow}
                            collapse={this.state.isTodayCollapse}
                            listOpen={() => this.setState({ isTodayOpen: !this.state.isTodayOpen, isTodayCollapse: !this.state.isTodayCollapse })}
                            ctaskDrawerOpen={this.openCreateTaskHandler}
                        />

                    </div>
                    <div className={`tsks-lstngs-bckglg-dtls ${!this.state.isTodayOpen ? 'tsk-open-dropdown' : 'tsk-close-dropdown'}`}>
                        {
                            this.state.todayData != null || this.state.todayData != undefined ? this.state.todayData.map((tasksList, index) => {
                                return (
                                    <div className='tasks-listing-task'>
                                        <div className='tasks-listing-left-section'>
                                            <TaskListingStatusRight
                                                tasksListingMoreIcon={TasksListingMoreIcon}
                                                tasksListEditIcon={TasksListEditIcon}
                                                taskListRectangleGreen={TaskListRectangleGreen}
                                                taskListRectangleGray={TaskListRectangleGray}
                                                isCheckedArray={this.state.isCheckArray.includes(tasksList)}
                                                checkedBox={() => this.checkBox(tasksList)}
                                                editTask={() => this.onclickedittask(tasksList)}
                                                taskData={tasksList}
                                                startTime={this.getTaskStartTime(tasksList.startTime)}
                                                taskListVerticalEllipse={TaskListVerticalEllipse}
                                                statusNameData={this.state.allStatus}
                                                tagsData={this.state.allTags}
                                            />
                                            <div className='tasks-listing-icon-show-on-hover'>
                                                    <HoverIcons
                                                       commentToggler = {() => this.iscommentToggler(tasksList)}
                                                       dependency = {() => this.buttonDependencyOnCLick(tasksList.id)}
                                                       linkWithDrawer = {() => this.linkWithDrawer}
                                                       openHandle = {() => this.handleOpen(tasksList.taskTitle, tasksList.id)}
                                                       attachment = {() => this.isAttachmentToggler(tasksList)}
                                                       buttonOne = {() => this.buttonOneOnCLick(tasksList.id, tasksList.assignTo)}
                                                       colorPicker = {() => this.buttonColorPickerOnCLick(tasksList.id)}
                                                    />

                                                {
                                                    <Modal
                                                        className="tsk-rmd-mdl"
                                                        aria-labelledby="simple-modal-title"
                                                        aria-describedby="simple-modal-description"
                                                        open={this.state.modalOpen}
                                                        onClose={this.handleClose}
                                                    >
                                                        <div className="tsk-rmdr-paper">
                                                            {isShowTaskRemainderModal ? this.taskRemainderModelBody() : null}
                                                            {addRmdrModalOpen ? this.addRemainderModalBody() : null}
                                                            {listRmdrModalOpen ? this.listOfTskRemainders() : null}
                                                        </div>
                                                    </Modal>
                                                }

                                                {
                                                    this.state.colorPicPopId === tasksList.id && this.state.isShowColorPickerPopUp ? (
                                                        <ColorPcikerPop
                                                        colorPicker = {colorPicker}
                                                        handleChange ={this.handleChange}
                                                        isShowColorPallet = {(e) => {
                                                                                e.stopPropagation()
                                                                                {this.setState({isShowColorPallet: !this.state.isShowColorPallet})}
                                                                            }}
                                                        pallet = {this.state.isShowColorPallet}
                                                        palletPop = {this.colorPalletPopup()}
                                                        color = {color}
                                                        handleChangeComplete ={this.handleChangeComplete}
                                                        styles={TaskListingObj.colorPickerStls}
                                                        />

                                                    ) : null
                                                }

                                                {
                                                    this.state.DependencyPopId === tasksList.id && this.state.isShowDependencyPopUp ? (
                                                        <DependencyPop
                                                        backlogData={this.state.backlogData}
                                                        taskData={tasksList}
                                                        changeHandle={this.handleChange}
                                                        styles = {TaskListingObj.dependencyPopup}
                                                        header = {TaskListingObj.dependencyTxt}       
                                                    />                                                    
                                                    ) : null
                                                }

                                                {
                                                    this.state.popId === tasksList.id && this.state.isShowPopupOne ? (
                                                        <AssignPopup
                                                            taskListProfile = {TaskListProfile}
                                                            searchIcon = {searchIcon}
                                                            handleChangeAssignTo = {() => this.handleChangeAssignTo}
                                                            users = {this.state.users}
                                                            assignedUser = {this.state.assignedUser}
                                                            taskData = {tasksList}
                                                            assignText= {TaskListingObj.AssignText}
                                                            styles = {TaskListingObj.AssignStyles}
                                                        />

                                                    ) : null
                                                }

                                            </div>


                                        </div>
                                        <div className='tasks-listing-right-section'>
                                            <TaskListingActualEstimate
                                                taskData={tasksList}
                                                progressEstimatedTime={moment(tasksList.progressEstimatedTime).format('hh[H] mm[M]')}
                                            />

                                            <div className="tsk-lstng-mr-str">
                                                <img src={TaskListStarIcon}></img>

                                                <div className='tasks-listing-click-more-button'>


                                                    <Fab className='task-listing-menu' size="small" aria-label="add">
                                                        <img className="more-icon" src={readMore} onClick={() => this.showTaskListPopup(tasksList.id)} />
                                                        {
                                                            this.state.popupId === tasksList.id && this.state.isShowPopup ? (this.state.isAssignPopUp) ?
                                                                (
                                                                    <AssignPopup
                                                                        taskListProfile = {TaskListProfile}
                                                                        searchIcon = {searchIcon}
                                                                        handleChangeAssignTo = {() => this.handleChangeAssignTo}
                                                                        users = {this.state.users}
                                                                        assignedUser = {this.state.assignedUser}
                                                                        taskData = {tasksList}
                                                                        assignText= {TaskListingObj.AssignText}
                                                                        styles = {TaskListingObj.MoreAssignStyles}
                                                                        toogglerIcn = {ToogglerIcn }
                                                                        sidebarToggler = {this.sidebarToggler}
                                                                        changeSearch={this.changeSearch}
                                                                    />
                                                                )
                                                                : (
                                                                    <div className='tasks-listing-popup' ref={this.setWrapperRef}>
                                                                        <ul>
                                                                            {
                                                                                this.state.moreOptions.map(more => {

                                                                                    return <Link
                                                                                        to={{
                                                                                            pathname: more.path,
                                                                                            state: { taskData: tasksList }
                                                                                        }}
                                                                                    >
                                                                                        <li key={more.id} className='tasks-listing-icon'
                                                                                            onClick={() => more.onMoreClick(tasksList, tasksList.id, tasksList.assignTo)}
                                                                                        >
                                                                                            <img src={more.icon} alt=""></img>
                                                                                            <span>{more.title}</span>
                                                                                        </li>
                                                                                    </Link>
                                                                                })
                                                                            }

                                                                        </ul>
                                                                    </div>
                                                                ) : null
                                                        }
                                                    </Fab>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <div className='tsk-lstng-data-null'><span>No Data Found</span></div>
                        }
                    </div>



                    <div className="tasks-listing-heading">
                        <span>TOMORROW</span>

                        <TaskListingTitleHeader
                            tasksListingAddIcon={TasksListingAddIcon}
                            tasksListingDownArrow={TasksListingDownArrow}
                            tasksListingUpArrow={TasksListingUpArrow}
                            collapse={this.state.isTomorrowCollapse}
                            listOpen={() => this.setState({ isTomorrowOpen: !this.state.isTomorrowOpen, isTomorrowCollapse: !this.state.isTomorrowCollapse })}
                            ctaskDrawerOpen={this.openCreateTaskHandler}
                        />

                    </div>
                    <div className={`tsks-lstngs-bckglg-dtls ${!this.state.isTomorrowOpen ? 'tsk-open-dropdown' : 'tsk-close-dropdown'}`}>
                        {
                            this.state.tomorrowData != null || this.state.tomorrowData != undefined ? this.state.tomorrowData.map((tasksList, index) => {
                                return (
                                    <div className='tasks-listing-task'>
                                        <div className='tasks-listing-left-section'>
                                            <TaskListingStatusRight
                                                tasksListingMoreIcon={TasksListingMoreIcon}
                                                tasksListEditIcon={TasksListEditIcon}
                                                taskListRectangleGreen={TaskListRectangleGreen}
                                                taskListRectangleGray={TaskListRectangleGray}
                                                isCheckedArray={this.state.isCheckArray.includes(tasksList)}
                                                checkedBox={() => this.checkBox(tasksList)}
                                                editTask={() => this.onclickedittask(tasksList)}
                                                taskData={tasksList}
                                                startTime={this.getTaskStartTime(tasksList.startTime)}
                                                taskListVerticalEllipse={TaskListVerticalEllipse}
                                                statusNameData={this.state.allStatus}
                                                tagsData={this.state.allTags}
                                            />

                                            <div className='tasks-listing-icon-show-on-hover'>
                                                    <HoverIcons
                                                       commentToggler = {() => this.iscommentToggler(tasksList)}
                                                       dependency = {() => this.buttonDependencyOnCLick(tasksList.id)}
                                                       linkWithDrawer = {() => this.linkWithDrawer}
                                                       openHandle = {() => this.handleOpen(tasksList.taskTitle, tasksList.id)}
                                                       attachment = {() => this.isAttachmentToggler(tasksList)}
                                                       buttonOne = {() => this.buttonOneOnCLick(tasksList.id, tasksList.assignTo)}
                                                       colorPicker = {() => this.buttonColorPickerOnCLick(tasksList.id)}
                                                    />

                                                {
                                                    <Modal
                                                        className="tsk-rmd-mdl"
                                                        aria-labelledby="simple-modal-title"
                                                        aria-describedby="simple-modal-description"
                                                        open={this.state.modalOpen}
                                                        onClose={this.handleClose}
                                                    >
                                                        <div className="tsk-rmdr-paper">
                                                            {isShowTaskRemainderModal ? this.taskRemainderModelBody(tasksList) : null}
                                                            {addRmdrModalOpen ? this.addRemainderModalBody() : null}
                                                            {listRmdrModalOpen ? this.listOfTskRemainders() : null}
                                                        </div>
                                                    </Modal>
                                                }

                                                {
                                                    this.state.colorPicPopId === tasksList.id && this.state.isShowColorPickerPopUp ? (
                                                        <ColorPcikerPop
                                                        colorPicker = {colorPicker}
                                                        handleChange ={this.handleChange}
                                                        isShowColorPallet = {(e) => {
                                                                                e.stopPropagation()
                                                                                {this.setState({isShowColorPallet: !this.state.isShowColorPallet})}
                                                                            }}
                                                        pallet = {this.state.isShowColorPallet}
                                                        palletPop = {this.colorPalletPopup()}
                                                        color = {color}
                                                        handleChangeComplete ={this.handleChangeComplete}
                                                        styles={TaskListingObj.colorPickerStls}
                                                        />

                                                    ) : null
                                                }

                                                {
                                                    this.state.DependencyPopId === tasksList.id && this.state.isShowDependencyPopUp ? (
                                                        <DependencyPop
                                                        backlogData={this.state.backlogData}
                                                        taskData={tasksList}
                                                        changeHandle={this.handleChange}
                                                        styles = {TaskListingObj.dependencyPopup}
                                                        header = {TaskListingObj.dependencyTxt}       
                                                    />
                                                    ) : null
                                                }

                                                {
                                                    this.state.popId === tasksList.id && this.state.isShowPopupOne ? (
                                                        <AssignPopup
                                                            taskListProfile = {TaskListProfile}
                                                            searchIcon = {searchIcon}
                                                            handleChangeAssignTo = {() => this.handleChangeAssignTo}
                                                            users = {this.state.users}
                                                            assignedUser = {this.state.assignedUser}
                                                            taskData = {tasksList}
                                                            assignText= {TaskListingObj.AssignText}
                                                            styles = {TaskListingObj.AssignStyles}
                                                        />

                                                    ) : null
                                                }

                                            </div>
                                        </div>


                                        <div className='tasks-listing-right-section'>
                                            <TaskListingActualEstimate
                                                taskData={tasksList}
                                                progressEstimatedTime={moment(tasksList.progressEstimatedTime).format('hh[H] mm[M]')}
                                            />

                                            <div className="tsk-lstng-mr-str">
                                                <img src={TaskListStarIcon}></img>

                                                <div className='tasks-listing-click-more-button'>


                                                    <Fab className='task-listing-menu' size="small" aria-label="add">
                                                        <img className='more-icon' src={readMore} onClick={() => this.showTaskListPopup(tasksList.id)} />
                                                        {
                                                            this.state.popupId === tasksList.id && this.state.isShowPopup ? (this.state.isAssignPopUp) ?
                                                               
                                                            (
                                                                                                                                        
                                                                    <AssignPopup
                                                                        taskListProfile = {TaskListProfile}
                                                                        searchIcon = {searchIcon}
                                                                        handleChangeAssignTo = {() => this.handleChangeAssignTo}
                                                                        users = {this.state.users}
                                                                        assignedUser = {this.state.assignedUser}
                                                                        taskData = {tasksList}
                                                                        assignText= {TaskListingObj.AssignText}
                                                                        styles = {TaskListingObj.MoreAssignStyles}
                                                                        toogglerIcn = {ToogglerIcn }
                                                                        sidebarToggler = {this.sidebarToggler}
                                                                        changeSearch={this.changeSearch}
                                                                    />
                                                                )
                                                                : (
                                                                    <div className='tasks-listing-popup' ref={this.setWrapperRef}>
                                                                        <ul>   
                                                                            {
                                                                                this.state.moreOptions.map(more => {

                                                                                    return <Link
                                                                                        to={{
                                                                                            pathname: more.path,
                                                                                            state: { taskData: tasksList }
                                                                                        }}
                                                                                    >
                                                                                        <li key={more.id} className='tasks-listing-icon'
                                                                                            onClick={() => more.onMoreClick(tasksList, tasksList.id, tasksList.assignTo)}
                                                                                        >
                                                                                            <img src={more.icon} alt=""></img>
                                                                                            <span>{more.title}</span>
                                                                                        </li>
                                                                                    </Link>
                                                                                })
                                                                            }

                                                                        </ul>
                                                                    </div>
                                                                ) : null
                                                               
                                                        }
                                                        { console.log()}
                                                    </Fab>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )

                            }) : <div className='tsk-lstng-data-null'><span>No Data Found</span></div>
                        }
                    </div>
                    {
                    // this.state.isEtdtaskDrawerOpen ? <EditTaskDrawer
                    //     isEtdtaskDrawerOpen={this.state.isEtdtaskDrawerOpen}
                    //     thisObj={this}
                    //     client={this.props.client}
                    //     taskEData={this.state.taskEditData}
                    // /> : null


                    
                    }
                </div>

            </div>
        );
    }


    render() {
        return <MainLayout secondSidebar={<NewTaskCollapsable thisObj={this} refreshData={this.refreshData} client={this.props.client} />} bodySection={this.bodySection()} />
    }
}

export default NewTasksListing;

