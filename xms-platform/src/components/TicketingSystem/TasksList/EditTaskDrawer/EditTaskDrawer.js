import React from 'react'
import './EditTaskDrawer.scss';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { CirclePicker, TwitterPicker } from 'react-color'
import { withStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import dropdownIcon from '../../../../assets/icons/01-10-2019/Icon ionic-md-arrow-dropdown.svg'
import colorPallet from '../../../../assets/create-habit/Icon material-color-lens.svg'
import closeCreateHabitIcon from '../../../../assets/icons/SVG/edit_task_close_icon.svg';
import emailIcon from '../../../../assets/icons/01-10-2019/Icon feather-mail.svg'
import profileIcon from '../../../../assets/profile.png'
import decrementIcon from '../../../../assets/icons/SVG/Group 11399.svg'
import estimatedTimeIcon from '../../../../assets/icons/SVG/Icon material-access-time.svg'
import tagsIcon from '../../../../assets/icons/SVG/Icon awesome-tags.svg'
import addNewIcon from '../../../../assets/icons/SVG/Group 11382.svg';
import InputBase from '@material-ui/core/InputBase';
import SearchTagAdd from "../../../../assets/icons/create-ticket/Group 11349.svg";
import ClrPckrTray from "../../../../assets/icons/create-ticket/Icon ionic-ios-color-palette.svg";
import LowIcon from "../../../../assets/icons/create-ticket/Rectangle 261.svg";
import HighIcon from "../../../../assets/icons/create-ticket/Rectangle 242.svg";
import CriticalIcon from "../../../../assets/icons/create-ticket/Rectangle 643.svg";
import DrpDwnIcn from "../../../../assets/icons/create-ticket/Icon ionic-md-arrow-dropdown.svg";
import Radio from '@material-ui/core/Radio';
import MediumIcon from "../../../../assets/icons/create-ticket/Path 887.svg";
import linkToTaskIcon from '../../../../assets/icons/SVG/Group11262.svg'
import linkToProjectIcon from '../../../../assets/icons/SVG/Group-11374.svg'
import linkToTicketIcon from '../../../../assets/icons/SVG/Group-11260.svg'
import linkToObjectiveIcon from '../../../../assets/icons/SVG/Icon-feather-target.svg'
import selectLinkToIcon from '../../../../assets/icons/SVG/Icon-feather-link.svg'
import linkToRelatedIcon from '../../../../assets/icons/SVG/Icon-ionic-ios-options.svg'
import DropDwnIcon from "../../../../assets/icons/SVG/Icon ionic-ios-arrow-down.svg";
import SearchIcon from '@material-ui/icons/Search';
import CompanyLogo from "../../../../assets/icons/task/company_logo.svg";
import { baseUrl } from "../../../../constants";
import axios from "axios";
import TagTemplate from '../.././../TagTemplate';
import AssignToAvathar from '../../../AssignToAvathar';
import EstimatedTime from '../../../EstimatedTime'
import CompanyEditIcon from "../../../../assets/icons/SVG/feather-edit.svg";
// import EditCompanyDetails from '../../../TicketingSystem/CreateTicket/EditCompanyDetails/EditCompanyDetails';
import EditTaskCompany from "./EditTaskCompany";
import removeAttachedFile from '../../../../assets/icons/create-ticket/Group 11407.svg'
import dpfIcon from '../../../../assets/icons/SVG/337946.png'
import { 
    updateTaskData, 
    getAllTeams,
    getUserById,
    getAllTask,
    getAllProjects,
    getAllTickets,
    getAllObjectives,
    getAllPriorities,
    getAllUsers,
 } from "./editTaskQueries";

 import {
    getTeams,
    getCompanyById,
    getDepartments,
    getTags,

 } from "../../../CreateHabitDrawer/createHabitQuery"
import { getAllCompanies } from "../../../../graphQl/companyDetailQueries";
import loadingSpinner from '../../../../assets/icons/SVG/loadingSpinner.gif';
import CompanyDetails from '../../../CompanyDetails/CompanyDetails';
import ProfileItemWithCheckBox from '../../../ProfileItemWithCheckBox'
import { utils } from '../../../../utilFunctions/utils'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import MultipleSelectDropdown from './MultipleSelectDropdown';



const fileIcons = [{ pdf: dpfIcon }]
const imageFormats = ['jpg', 'jpeg', 'jpg', 'bmp', 'png', 'svg'];
const fileFormats = ['doc', 'docx', 'odt', 'txt', 'pdf', 'ppt', 'pptx'];

const quickCreateIcons = [
    { id: 0, icon: '', title: 'File attachment is not working' },
    { id: 1, icon: '', title: 'Getting error when doing drag-drop..' },
    { id: 2, icon: '', title: 'File attachment is not working' },
    { id: 3, icon: '', title: 'User permission issues' },
    { id: 4, icon: '', title: 'Error popup is showing to create a..' },
    { id: 5, icon: '', title: 'File attachment is not working' },
    { id: 1, icon: '', title: 'Getting error when doing drag-drop..' },
    { id: 2, icon: '', title: 'File attachment is not working' },
    { id: 3, icon: '', title: 'User permission issues' },
    { id: 4, icon: '', title: 'Error popup is showing to create a..' },
]

let time = ['12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM']
const selectLinkToExisting = [
    { id: 0, title: 'Tasks', icon: linkToTaskIcon },
    { id: 1, title: 'Projects', icon: linkToProjectIcon },
    { id: 2, title: 'Tickets', icon: linkToTicketIcon },
    { id: 3, title: 'Objectives', icon: linkToObjectiveIcon },
]
const weekDaysBtns = [
    { btnId: 0, isActive: false, btnName: 'SUN', }, 
    { btnId: 1, isActive: false, btnName: 'MON', },
    { btnId: 2, isActive: false, btnName: 'TUE', },
    { btnId: 3, isActive: false, btnName: 'WED', },
    { btnId: 4, isActive: false, btnName: 'THU', },
    { btnId: 5, isActive: false, btnName: 'FRI', },
    { btnId: 6, isActive: false, btnName: 'SAT', },
]
const assignToData = [
    { id: 0, name: 'John Dan', profile: '' },
    { id: 1, name: 'John Doe', profile: '' },
    { id: 2, name: 'John pazos', profile: '' },
    { id: 3, name: 'Mark John', profile: '' },
    { id: 4, name: 'John Dan', profile: '' },
    { id: 5, name: 'John Doe', profile: '' },
    { id: 6, name: 'John pazos', profile: '' },
    { id: 7, name: 'Mark John', profile: '' },
]
const tagsData = [
    { id: 0, title: 'Risk', },
    { id: 1, title: 'Critical Customer', },
    { id: 2, title: 'Phase1', },
    { id: 3, title: 'Technical', },
]
const TicketType = [
    { id: 1, icon: LowIcon, title: "Service request" },
    { id: 2, icon: HighIcon, title: "Incident" },
    { id: 3, icon: CriticalIcon, title: "Problem" },
]
const priorities = [
    { id: 1, icon: CriticalIcon, title: "Critical" },
    { id: 2, icon: HighIcon, title: "High" },
    { id: 3, icon: MediumIcon, title: "Medium" },
    { id: 4, icon: LowIcon, title: "Low" },
]
var linkRelatedRecords = [
    { id: 0, title: 'Project Management' },
    { id: 1, title: 'Metrik1 - marketing' },
    { id: 2, title: 'UI/UX design' },
    { id: 3, title: 'R&D on product1' },
    { id: 4, title: 'HR & Recruitment' },
    { id: 5, title: 'Project Management' },
    { id: 6, title: 'Project Management' },
]

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
const color = ['#feb1b2', '#7ac9ff', '#ffc089', '#41e590', '#ea5455', '#c8c8c8', '#656565', '#ecf1f9', '#7AC9FF']
const colors = ['#1abc9c', '#17a085', '#2ecc71', '#27ae60', '#3498db', '#2980b9', '#9b59b6', '#8e44ad', '#34495e', '#2c3e50', '#f1c40e', '#f39c12', '#d35400', '#e74c3c', '#c0392b', '#9b0000', '#f28a8a', '#00edff', '#1aa0bc', '#1cd8ff', '#ff92f4', '#d500a3', '#ffb300', '#d0cfec', '#ecf1f9', '#c8c8c8', '#656565', '#464646']

let wrapperRef;
class EditTaskDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.colorPallet = null;
        this.state = {
            attachedFiles: [],
            isShowColorPallet: false,
            isShowTaskColorPallet: false,
            isShowFromSetTimePopup: false,
            isShowToSetTimePopup: false,
            isShowDontRepeat: false,
            isEtdtaskDrawerOpen: false,
            isAllDay: false,
            fromDate: new Date(),
            toDate: new Date(),
            fromTime: moment(new Date()).format('LT'),
            toTime: '',
            DoesNotRepeat: '',
            isShowAssignToDrop: false,
            isShowTagsDrop: false,
            isSelectLinkToExist: false,
            isRelatedDropOpen: false,
            assignToSelection: [],
            assignToChecked: '',
            // selectedTags: [
            //   {id: 0, title: 'Risk', },
            //   {id: 2, title: 'Phase1', },
            // ],
            isPriorityDropdown: false,
            priorities: [],
            selectedPriorId: 0,
            selectedPeople: [],
            linkedTo: '',
            linkToExistSelection: [],


            // selectedItems: [
            //   {id: 0, name: 'Ram'},
            //   {id: 1, name: 'Murthy'}
            // ],
            buildQuitBtnId: 1,
            goalPeriodBtnId: 4,
            weekDaysBtnId: 3,
            selectedDate: '',
            isShareThroughEmail: false,
            habitTitleColor: '',
            setTimeBtnId: null,
            setTimeBtns: [],
            weekDaysBtns: weekDaysBtns,
            habitTitle: "",
            count: 1,
            setTime: [],
            location: "",
            tags: [],
            tags1: [],  
            users: [],
            users1: [],
            shareMail: "",
            saveTemplate: false,
            frequency: {},
            responsibleUsers: [],
            isEditCompDtlsOpen: false,
            company: [],
            teamsData: [],
            departments: [],
            selectedDepartment: {},
            anchorEl: null,
            selectedCompany: {},
            selectedTeam: {},
            logedUser: {},
            selectedProject: {},
            checkedTagsArray: [],
            tagsSelect: "",
            listOfRelatedTo: [],
            relatedSelect: "",
            taskFrequency: 0,
            selectedQuick: {},
            taskDesc: this.props.taskEData ? this.props.taskEData.taskDescription : '',
            estimateTime: this.props.taskEData.taskHours ? this.props.taskEData.taskHours : '' ,
            assignNameData: false,
            tagNameData: false,
            priorityNameData: false,
            fromDateData: false,
            toDateData: false,
            tagArrayData: [],
            taskTitle: this.props.taskEData ? this.props.taskEData.taskTitle : "",
            textAreaData: false,
            editCompanyName: [],
            companyDataId: '',
            departmentDataId: '',
            teamDataId: '',
            projectDataId: '',
            isMandatoryFieldsMissing: false,
            isSpinnerLoading: false,
            emailListToShare: [],
            isEmailDropdown: false,

            assignToBeUpdated: this.props.taskEData.assignTo ? this.props.taskEData.assignTo : [],
            tagsToBeUpdated: this.props.taskEData.tags ? this.props.taskEData.tags : [],

            newElementList: [],
            dropdownsStates: {
                isTagsDropDownOpen: false
            }

        }
    }
    componentDidMount() {
        const client = this.props.client;
        this.fetchUsers()
        this.fetchPriorities();
        this.getAllCompaniesData();
        this.getAllTeamData();
        this.getUserById();
        getUserById(client,res=>{
            this.setState({ logedUser: res.data.getUserById })
            this.fetchTeams(res.data.getUserById.companyId, res.data.getUserById.departmentId, res.data.getUserById.tenantId);
            this.fetchcompany(res.data.getUserById.companyId);
            this.fetchDepartment(res.data.getUserById.departmentId);
            this.fetchTags(res.data.getUserById.companyId);
            return res;
        })


    }
    createTagsRef = node => this.tagsDropdownRef = node;
    closeDropdownsHandler =event=> {
        if(this.tagsDropdownRef.contains(event.target) ) {
            this.setState({ isShowTagsDrop: true })
        } else {
            this.setState({ isShowTagsDrop: false })
        }
    }
    getAllCompaniesData = async () => {
        const result = await getAllCompanies(this.props.client);
        if (result) {
            this.setState({ editCompanyName: result })
        }
    }
    getAllTeamData = async () => {
        const client = this.props.client;
        const result = await getAllTeams(client);
        if (result) {
            this.setState({ editTeamName: result })
        }
    }
    array = [];

    checkedTags = async (id) => {
        let tagArray = []
        var tagString = ""
        if (this.array.includes(id)) {
            let index = this.array.indexOf(id)
            this.array.splice(index, 1);
        } else {
            this.array.push(id);
        }
        await this.array.map(uniq => {
            if (this.array.length > 1) {
                tagString += " " + uniq.tagTitle;
                tagArray.push(uniq.tagTitle);
            } else {
                tagString = uniq.tagTitle;
                tagArray.push(uniq.tagTitle);
            }

        })
        await this.setState({ checkedTagsArray: this.array, tagsSelect: tagString, tagNameData: true, tagArrayData: tagArray })
    }

    arrayRelatedTo = [];
    checkBoxRelatedTo = (data) => {
        var relatedSelect = ""
        if (this.arrayRelatedTo.includes(data)) {
            let index = this.arrayRelatedTo.indexOf(data)
            this.arrayRelatedTo.splice(index, 1);
        } else {
            this.arrayRelatedTo.push(data)
        }
        this.arrayRelatedTo.map(uniq => {
            if (this.arrayRelatedTo.length > 1) {
                relatedSelect += " " + uniq.title
            } else {
                relatedSelect = "" + uniq.title
            }
        })
        this.setState({ listOfRelatedTo: this.arrayRelatedTo, relatedSelect: relatedSelect })
    }

    arrayToAssign = [];
    assignToCheck = (data) => {
        if (this.arrayToAssign.includes(data)) {
            let index = this.arrayToAssign.indexOf(data)
            this.arrayToAssign.splice(index, 1);
        } else {
            this.arrayToAssign.push(data)
        }
        this.setState({ assignToSelection: this.arrayToAssign, assignNameData: true })
    }

    checkBoxLinkTo = (data) => {
        if (data != this.state.linkedTo) {
            this.setState({ linkedTo: data, isSelectLinkToExist: false, isRelatedDropOpen: false, relatedSelect: "" })
        } else {
            this.setState({ linkedTo: data, isSelectLinkToExist: false, isRelatedDropOpen: false })
        }
        if (data.id == 0) {
            this.fetchTasks()
        } else if (data.id == 1) {
            this.fetchProject()
        } else if (data.id == 2) {
            this.fetchTicket()
        } else if (data.id == 3) {
            this.fetchObjective()
        }
    }

    updateTask = async (e) => {
        const client = this.props.client;
        if (this.state.assignToSelection.length > 0) {
            var assignTo = this.state.assignToSelection.map((usr, index) => {
                return usr.id;
            })
        }

        var relatedTypes = []
        if (this.state.listOfRelatedTo.length > 0) {
            relatedTypes = this.state.listOfRelatedTo.map(obj => {
                return obj.id
            })
        }
        const data = {
            id: this.props.taskEData.id,
            taskTitle: this.state.taskTitle ? this.state.taskTitle : this.props.taskEData.taskTitle,
            assignTo: assignTo && assignTo[0] != undefined ? assignTo[0] : this.props.taskEData.assignTo,
            taskHours: this.state.estimateTime ? this.state.estimateTime : this.props.taskEData.taskHours,
            fromDate: this.state.fromDate ? this.state.fromDate : this.props.taskEData.startTime,
            toDate: this.state.toDate ? this.state.toDate : this.props.taskEData.dueTime,
            taskDescription: this.state.taskDesc ? this.state.taskDesc : this.props.taskEData.taskDescription,
            priorityId: this.state.selectedPriorId.id ? this.state.selectedPriorId.id : this.props.taskEData.priority,
            tags: this.state.tagsToBeUpdated,
            sendCopyTo: this.state.sendCopyTo ? this.state.sendCopyTo : this.props.taskEData.sendCopyTo,

            relatedTo: this.state.linkedTo.id ? this.state.linkedTo.id : this.props.taskEData.relatedTo,
            linkWithTicket: this.state.linkedTo.id == 2 ? relatedTypes[0] : this.props.taskEData.linkWithTicket,
            linkWithProject: this.state.linkedTo.id == 1 ? relatedTypes[0] : this.props.taskEData.linkWithProject,
            linkWithTask: this.state.linkedTo.id == 0 ? relatedTypes[0] : this.props.taskEData.linkWithTask,
            linkWithObjective: this.state.linkedTo.id == 3 ? relatedTypes[0] : this.props.taskEData.linkWithObjective,

            companyDataId: this.state.companyDataId ? this.state.companyDataId : this.props.taskEData.companyId,
            departmentDataId: this.state.departmentDataId ? this.state.departmentDataId : this.props.taskEData.departmentDataId,
            teamDataId: this.state.teamDataId ? this.state.teamsData : this.props.taskEData.teamDataId,
            projectDataId: this.state.projectDataId ? this.state.projectDataId : this.props.taskEData.projectId
        }
        if(
            !this.state.taskTitle ||
            this.state.estimateTime == '' ||
            !this.state.taskDescription ||
            !this.state.linkedTo ||
            !this.state.relatedSelect ||
            !this.state.selectedPriorId ||
            this.state.tagsToBeUpdated.length == 0 
        ){
            this.setState({ isSpinnerLoading: false })
            this.setState({ isMandatoryFieldsMissing: true })
        } else {
            const result = await updateTaskData(client, data);
            if (result) {
                this.closeDrawerHandler();
                this.props.thisObj.getAllBackLogsData();
                this.props.thisObj.getAllTodayData();
                this.props.thisObj.getTomorrowData();
                this.props.thisObj.getAllStatus1Data();
            }
        }
    }
    openEditCompDtlsOpen = (e) => {
        e.stopPropagation()
        this.setState({ isEditCompDtlsOpen: true })
    }
    closeCompanyDrawer = () => {
        this.setState({ isEtdtaskDrawerOpen: false })
    }

    toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({ ...this.state, [side]: open });
    };

    fetchPriorities = () => {
        const client = this.props.client
        getAllPriorities(client,res=>{
            let priorities = res.data.priorities;
            this.setState({ priorities: priorities });
        })
    };

    fetchcompany = (companyId) => {
        const client = this.props.client;
        getCompanyById(client,res=>{
          let company = res.data.getAllCompany;
            if (company != null || company != undefined) {
              company.map(cmp => {
                if (companyId == cmp.id) {
                  this.setState({ selectedCompany: cmp });
                }
              });
            }
            this.setState({ company: company });
        })
    };

    fetchUsers = (companyId) => {
        const client = this.props.client;
        getAllUsers(client,res=>{
            let userAll = res.data.getAllUsers;
            this.setState({ users: userAll });
        })
    };


    fetchDepartment = (deptId) => {
        const client = this.props.client;
        getDepartments(client,res=>{
          let departments = res.data.getAllDepartments;
          if (departments != null || departments != undefined) {
            departments.map(depart => {
              if (deptId == depart.id) {
                this.setState({ selectedDepartment: depart });
              }
            });
          }
          this.setState({ departments: departments });
        })
    };

    fetchTags = (companyId) => {
        const client = this.props.thisObj.props.client;
        getTags(client,companyId,res=>{
          this.setState({ tags: res.data.allTags });
            return res;
        })
    }

    fetchTasks = () => {

        let client = this.props.client;
        getAllTask(client, res =>{
            let array = res.data.tasksList;
            linkRelatedRecords = [];
            this.setState({ linkToExistSelection: res.data.tasksList })
            array.map(arr1 => {
                linkRelatedRecords.push({ id: arr1.id, title: arr1.taskTitle })
            })
            return res
        }) 
    };

    fetchProject = () => {
        const client = this.props.client;
        getAllProjects(client, res=>{
            let array = res.data.getAllProjects;
            linkRelatedRecords = [];
            this.setState({ linkToExistSelection: res.data.getAllProjects })
            array.map(arr1 => {
                linkRelatedRecords.push({ id: arr1.id, title: arr1.projectName })
            })
            return res
        })
    };

    fetchTicket = () => {
        const client = this.props.client; 
        getAllTickets(client,res=>{
            let array = res.data.ticketsList
            linkRelatedRecords = [];
            this.setState({ linkToExistSelection: res.data.ticketsList })
            array.map(arr1 => {
                linkRelatedRecords.push({ id: arr1.id, title: arr1.name })
            })
            return res  
        })
    };


    fetchObjective = () => {
        const client = this.props.client;
        getAllObjectives(client,res=>{
            let array = res.data.getAllObjectives;
            linkRelatedRecords = [];
            this.setState({ linkToExistSelection: res.data.getAllObjectives })
            array.map(arr1 => {
                linkRelatedRecords.push({ id: arr1.id, title: arr1.objectiveTitle })
            })
            return res
        })
    };

    fetchTeams = (a, b, c) => {
        const client = this.props.client;
        getTeams(client,a,b,c,res=>{
          let teamsData = res.data.getTeamByCompanyIdAndDepartmentId;
          this.setState({ teamsData: teamsData, selectedTeam: teamsData[0] });
        })
    };

    editDropdownToggleHandler =(event, editDropdownToggle)=> {
        console.log('dropdownToggleHandler_dropdownToggleHandler')
        event.stopPropagation();
        if(editDropdownToggle) {
          this.setState({ 
                isShowFromSetTimePopup: false,
                isShowToSetTimePopup: false,
                isShowFromSetTimePopup: false,
                isShowToSetTimePopup: false,
                isShowDontRepeat: false,
                isShowAssignToDrop: false,
                isPriorityDropdown: false,
                isSelectLinkToExist: false,
                isRelatedDropOpen: false,
                isShowAssignToDrop: false,
                isShowTagsDrop: false,
                isShowColorPallet:false,
                isShowDontRepeat: false,
                isEmailDropdown: false,
            [editDropdownToggle[Object.keys(editDropdownToggle)[0]]]: !this.state[editDropdownToggle[Object.keys(editDropdownToggle)[0]]]
           })
        }
        else {
          event.stopPropagation();
          this.setState({
                isShowFromSetTimePopup: false,
                isShowToSetTimePopup: false,
                isShowDontRepeat: false,
                isShowAssignToDrop: false,
                isPriorityDropdown: false,
                isSelectLinkToExist: false,
                isRelatedDropOpen: false,
                isShowAssignToDrop: false,
                isShowTagsDrop: false,
                isShowColorPallet:false,
                isShowFromSetTimePopup: false,
                isShowToSetTimePopup: false,
                isShowDontRepeat: false,
                isEmailDropdown: false
          })
        }
      }



    handleClickOutside = (event) => {
        console.log('wrapperRef_wrapperRef', wrapperRef)
        console.log('wrapperRef_event_target', event.target)
        if (wrapperRef && !wrapperRef.contains(event.target)) {
            this.setState({
                isShowColorPallet: false,
                isShowFromSetTimePopup: false,
                isShowToSetTimePopup: false,
                isShowDontRepeat: false,
                isShowAssignToDrop: false,
                isPriorityDropdown: false,
                isSelectLinkToExist: false,
                isRelatedDropOpen: false,
                isQuickCreateDropdown: false,
                
            })
        }
    }

    
    setWrapperRef = (node) => wrapperRef = node;
    button = (btnName, style, onClick) => (
        <Button variant="contained" className={style} onClick={onClick}>
            {btnName}
        </Button>
    )

    removeOneTimerBtn = (id) => {
        let setTimeBtns = this.state.setTimeBtns;
        setTimeBtns.splice(id, 1);
        this.setState({ setTimeBtns: setTimeBtns })
    }

    SelectMenuChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    SelectMenuChangeResponsible = event => {
        this.setState({ [event.target.name]: event.target.value })

    }
    checkBoxHandler = event => this.setState({ [event.target.name]: event.target.checked });
    onChangeHandler = event => this.setState({ [event.target.name]: event.target.value })
    checkBoxHandlerTemplate = event => this.setState({ saveTemplate: event.target.checked })
    closeDrawerHandler = () => this.props.thisObj.setState({ isEtdtaskDrawerOpen: false });
    buildQuitBtnClickHandler = button => this.setState({ buildQuitBtnId: button.btnId });
    goalPeriodBtnClickHandler = button => this.setState({ goalPeriodBtnId: button.btnId });
    handleDateChange = date => this.setState({ selectedDate: date });
    showColorPalletPopup = () => this.setState({ isShowColorPallet: !this.state.isShowColorPallet });
    showTaskColorPalletPopup = () => this.setState({ isShowTaskColorPallet: !this.state.isShowTaskColorPallet });
    showSetTimePopup = (id) => this.setState({ isShowSetTimePopup: !this.state.isShowSetTimePopup, setTimeBtnId: id });
    handleChangeComplete = (color, event) => {
        this.setState({ habitTitleColor: color.hex, isShowTaskColorPallet: !this.state.isShowTaskColorPallet })
    };
    weekDaysBtnClickHandler = button => {
        let tempWeekDaysBtns = this.state.weekDaysBtns;
        tempWeekDaysBtns[button.btnId].isActive = !tempWeekDaysBtns[button.btnId].isActive
        this.setState({ weekDaysBtnId: button.btnId, frequency: tempWeekDaysBtns });
    }
    showPriorityDropdown = () => this.setState({ isPriorityDropdown: !this.state.isPriorityDropdown, isShowTagsDrop: false })
    priorityHandleClick = (selectedObject) => {
        this.setState({ selectedPriorId: selectedObject, isPriorityDropdown: !this.state.isPriorityDropdown, priorityNameData: true });
    }
    peopleHandleClickfunction = (e, index, name) => {
        this.setState({ [e.target.name]: index });
        if (this.state.selectedPeople.includes(name)) { } else {
            this.state.selectedPeople.push(name)
            this.state.selectedItems.push(name)
        }
    }

    submitFreq = (e) => {
        this.setState({ taskFrequency: e.target.value, isShowDontRepeat: !this.state.isShowDontRepeat })
    }
    onChangeEstimateTime = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    quickHandleClick = (selectedObject) => {
        this.setState({
            selectedQuick: selectedObject, ticketTitle: `${selectedObject.ticketPrefix}-${selectedObject.title}`,
            ticketDescription: selectedObject.ticketDescription, isQuickCreateDropdown: !this.state.isQuickCreateDropdown,
            quickTemplate: selectedObject.title
        })
    }

    taskColorPalletPopup = () => (
        <div className='color-pallet-popup' ref={this.setWrapperRef}>
            <span>Color palette</span>
            <TwitterPicker colors={colors} onClick={() => this.setState({ isShowTaskColorPallet: !this.state.isShowTaskColorPallet })} onChangeComplete={this.handleChangeComplete} />
        </div>
    )

    colorPalletPopup = () => (
        <div className='create-task-tag-color-pallet-popup' ref={this.setWrapperRef}>
            <span>Color palette</span>
            <TwitterPicker colors={colors} onChangeComplete={this.handleChangeComplete} />
        </div>
    )
    dateChangeHandler = (date, dateType, dateFromToData) => {
        this.setState({ [dateType]: date, })
        if (dateFromToData == 'fromDateData') {
            this.setState({ fromDateData: true })
        } else if (dateFromToData == 'toDateData') {
            this.setState({ toDateData: true })
        }
    }
    setTimePopup = (time, timeType) => (
        <div className='ET-set-time-popup CT-set-time-popup' ref={this.setWrapperRef}>
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

    handleChangeShare = (e, user) => {
        let temp = this.state.emailListToShare;
        temp = [...temp, user]
        this.setState({ shareMail: e.target.value, isShareThroughEmail: true, emailListToShare: temp })
    }


    // handleChangeShare = (e) => {
    //     this.setState({ shareMail: e.target.value, isShareThroughEmail: true })
    // }
    onChangeTaskTitle = (e) => {
        this.setState({ taskTitle: e.target.value })
    }
    removeAttachedFileHandler = (id) => {
        let removeAttachedFile = this.state.attachedFiles;
        removeAttachedFile.splice(id, 1)
        this.setState({ attachedFiles: removeAttachedFile })
    }
    fileAttachmentHandler = event => {
        let imageList = [];
        let extension = null;
        for (let i = 0; i < event.target.files.length; i++) {
            extension = event.target.files[i].name.split('.')[1];
            if (imageFormats.includes(extension)) {
                this.imageToBase64Converter(event.target.files[i], result => {
                    imageList = [...imageList, result]
                    this.setState({
                        attachedFiles: [...this.state.attachedFiles, { base64: result }]
                    })
                })
            } else {
                this.setState({
                    attachedFiles: [...this.state.attachedFiles, event.target.files[i]]
                })
            }
        }
    }
    imageToBase64Converter = (image, callback) => {
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
            callback(reader.result)
        }
    }
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    onChangeTaskDesc = (e) => {
        this.setState({ [e.target.name]: e.target.value, textAreaData: true })
    }

    sideList = () => (
        <div className="edit-tsk-drwr-section">
            {console.log('assignToSelection', this.state.assignToSelection)}
            {/* <MultipleSelectDropdown 
                placeholder={'Enter Email'}
                dropdownIcon={emailIcon}
                dropdownTogglerIcon={dropdownIcon}
                emailListToShare={this.state.emailListToShare.length > 0 ? this.state.emailListToShare : []}
                itemList={this.state.users}
                checkboxCopy={this.state.checkboxCopy} 
                selectedElementsHandler={ data => {
                    if(this.state.newElementList.length < data.length) {
                        this.setState({newElementList: data})
                    }
                }}
            /> */}
            {
                this.state.isEditCompDtlsOpen ?
                    <EditTaskCompany
                        onClick={(e) => e.stopPropagation()}
                        isEditCompDtlsOpen={this.state.isEditCompDtlsOpen}
                        allState={this.state} thisObj={this}
                        taskCompanyData={this.props.taskEData}
                        client={this.props.client}
                    /> : null
            }
            
            <div className='edit-tsk-layout'>
            
                <div className="edit-tsk-drwr-cls-icon" onClick={this.closeDrawerHandler}>
                    <img src={closeCreateHabitIcon} alt='close-icon' />
                </div>
                <div className="edit-tsk-mddl-sctn">
                    <div className="edit-tsk-bdy-cmpnt">
                        <div className='edit-tsk-main-sctn'>
                            <div className="edit-tsk-hdr-sctn">
                                <div className="tsk-hdr-txt">
                                    <p class="pclasstask">Edit Task</p>
                                    <p>Lorem ipsum is simply dummy text of the printing and <br></br>typesetting industry</p>
                                </div>

                                {/* <div className='quick-create-using-template'>
                  <div className='quick-create-template'>
                    <div className='selected-item-container'>
                      <p>{this.state.quickTemplate ? this.state.quickTemplate : 'Quick create using template'}</p>
                    </div>
                    <div className="quick-drp-dwn-img">
                      <img src={DropDwnIcon} onClick={()=> this.setState({ isQuickCreateDropdown: !this.state.isQuickCreateDropdown })}/>
                    </div>
                  </div>
                  <div className={`dropdown-menu-container ${this.state.isQuickCreateDropdown ? 'open-dropdown' : 'close-dropdown'}`} ref={this.setWrapperRef}>
                    <div className="quick-create-search-bar d-flex align-items-center">                        
                        <InputBase
                            placeholder="Search of template"
                            className="search-input"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <SearchIcon />
                    </div>
                    <Scrollbars className="custom-scroll" style={{height: 160 }}>
                    {
                      quickCreateIcons.map(icon => 
                        <StyledMenuItem className="customized-ticket-list" onClick={()=> this.quickHandleClick(icon)} onClose={this.handleClose}>
                          <div className="quick-create-ticket-one d-flex">
                            {/* <img src={icon.icon} alt='icon'/> */}
                                {/* <p>{icon.title}</p>
                          </div>
                          
                        </StyledMenuItem>
                    )}
                    </Scrollbars>
                  </div>
                </div> */}
                            </div>

                            <div className={`edit-task-title-container ${this.state.taskTitle == '' && this.state.isMandatoryFieldsMissing ? 'errorTitleInputField': ''}`} >
                                <TextField
                                    id="standard-basic"
                                    className={``}
                                    placeholder='Edit task title'
                                    name='taskTitle'
                                    inputProps={{ style: { color: `${this.state.habitTitleColor}` } }}
                                    value={this.state.taskTitle}
                                    margin="normal"
                                    // defaultValue={this.props.taskEData ? this.props.taskEData.taskTitle : "Task title *"}
                                    onChange={this.onChangeTaskTitle}
                                />
                                <div className='color-pallet-container'>
                                    <img src={colorPallet} alt='colorPallet' className='colorPallet' onClick={this.showTaskColorPalletPopup} />
                                    {this.state.isShowTaskColorPallet ? this.taskColorPalletPopup() : null}
                                </div>
                            </div>
                            <div className='task-date-time-container editTaskDateTimeContainer'>
                                <div className='task-date-time'>
                                    <div id='task-datepicket-btn'>
                                        <Button
                                            variant="contained"
                                            className={'ET-custome-button'}
                                            onClick={'onClick'}
                                        >
                                            {
                                                this.state.fromDateData == false && this.props.taskEData.startTime != null ?
                                                    moment(this.props.taskEData.startTime).format("MMM, DD YYYY") : this.state.fromDate ?
                                                        moment(this.state.fromDate).format("MMM, DD YYYY") : 'From Date'
                                            }
                                        </Button>
                                        <DatePicker showYearDropdown yearDropdownItemNumber={15}
                                            onChange={(date) => this.dateChangeHandler(date, 'fromDate', 'fromDateData')}
                                            value={this.state.fromDate} clearIcon={null}
                                        />
                                    </div>
                                    {
                                        !this.state.isAllDay ?
                                            (
                                                <div className='ET-time-setter'>
                                                    <Button variant="contained" className={'ET-custome-button ET-time-btn'}
                                                        onClick={(e)=> this.editDropdownToggleHandler(e, { editDropdownToggle: 'isShowFromSetTimePopup' })}
                                                        // onClick={(e) => {e.stopPropagation(); this.setState({ isShowFromSetTimePopup: !this.state.isShowFromSetTimePopup })}}
                                                        >{this.state.fromTime ? this.state.fromTime : 'Start Time'}</Button>
                                                    {this.state.isShowFromSetTimePopup ? this.setTimePopup(time, 'fromTime') : null}
                                                </div>
                                            ) : null
                                    }
                                </div>
                                <span id='to'>to</span>
                                <div className='task-date-time'>
                                    <div id='task-datepicket-btn'>
                                        <Button variant="contained" className={'ET-custome-button'} onClick={'onClick'}>
                                            {
                                                this.state.toDateData == false && this.props.taskEData.toDate != null ?
                                                    moment(this.props.taskEData.toDate).format("MMM, DD YYYY") : this.state.toDate ?
                                                        moment(this.state.toDate).format("MMM, DD YYYY") : 'To Date'
                                            }
                                        </Button>
                                        <DatePicker onChange={(date) => this.dateChangeHandler(date, 'toDate', 'toDateData')} value={this.state.toDate} clearIcon={null} />
                                    </div>
                                    {
                                        !this.state.isAllDay ?
                                        (
                                            <div className='ET-time-setter'>
                                                <Button variant="contained" className={'ET-custome-button ET-time-btn'} 
                                                onClick={(e)=> this.editDropdownToggleHandler(e, { editDropdownToggle: 'isShowToSetTimePopup' })}
                                                // onClick={e =>{e.stopPropagation(); this.setState({ isShowToSetTimePopup: !this.state.isShowToSetTimePopup })} }
                                                >{this.state.toTime ? this.state.toTime : 'To Time'}</Button>
                                                {this.state.isShowToSetTimePopup ? this.setTimePopup(time, 'toTime') : null}
                                            </div>
                                        ) : null
                                    }

                                </div>

                                <div className='ET-all-day'>
                                    <Checkbox name='isAllDay' className='ET-all-day-checkbox' checked={this.state.isAllDay} onChange={this.checkBoxHandler} value="checkedA" />
                                    <span>ALL DAY</span>
                                </div>

                                <div className='DNR-dropdown-container'>
                                    <div className='DNR-custome-non-library-dropdown' onClick={(e)=> this.editDropdownToggleHandler(e, { editDropdownToggle: 'isShowDontRepeat' })}>
                                        <div className='DNR-selected-item-container'>
                                            {this.state.taskFrequency == "0" ? 'Does not repeat' : this.state.taskFrequency == "1" ? 'Daily' :
                                                this.state.taskFrequency == "2" ? 'Weekly' : this.state.taskFrequency == "3" ? 'Monthly' : 'Custom'
                                            }
                                        </div><img src={dropdownIcon} alt='dropdownIcon'                                         
                                        />
                                    </div>

                                    <div className={`DNR-custome-dropdown-menu-container ${this.state.isShowDontRepeat ?
                                        'DNR-custome-open-dropdown zIndex' : 'DNR-custome-close-dropdown'}`} ref={this.setWrapperRef}
                                    >
                                        <ul onClick={(e) => this.submitFreq(e)}>
                                            <li value="0">Does not repeat</li>
                                            <li value="1">Daily</li>
                                            <li value="2">Weekly</li>
                                            <li value="3">Monthly</li>
                                            <li value="4">Custom</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='edit-flex-container' >
                                <div className='CT-assignTo-dropdown-container'>
                                    <MultipleSelectDropdown 
                                        placeholder={'Assign To'}
                                        dropdownIcon={''}
                                        dropdownTogglerIcon={dropdownIcon}
                                        itemList={this.state.users}
                                        checkboxCopy={this.state.checkboxCopy} 
                                        selectedElements={this.props.taskEData.assignTo}
                                        selectedElementsHandler={ data => {
                                            if(this.state.assignToSelection.length < data.length) {
                                                this.setState({assignToSelection: data})
                                            }
                                        }}
                                    />
                                    {/* <div className='CT-assignTo-non-library-dropdown' onClick={(e)=> this.editDropdownToggleHandler(e, { editDropdownToggle: 'isShowAssignToDrop' })}>
                                        <div className='CT-selected-item-container'>
                                            {   
                                                this.state.assignNameData == false && this.props.taskEData.assignTo != null ?
                                                    this.state.users ? this.state.users.map((data, index) => {
                                                        if (this.props.taskEData.assignTo == data.id)
                                                            return <AssignToAvathar 
                                                                        profileIcon={profileIcon} 
                                                                        firstName={data.firstName} 
                                                                        lastName={data.lastName}
                                                                        onClick={''}
                                                                    />
                                                    }) : <p>Assign To</p> :
                                                    this.state.assignToSelection.length == 0 ? this.state.users && this.props.taskEData.assignTo != null ?
                                                        this.state.users.map((data, index) => {
                                                            if (this.props.taskEData.assignTo == data.id)
                                                                return <AssignToAvathar 
                                                                            profileIcon={profileIcon} 
                                                                            firstName={data.firstName} 
                                                                            lastName={data.lastName}
                                                                            onClick={() => this.assignToCheck(data)}
                                                                        />

                                                        }) : <p>Assign To</p> :
                                                        this.state.assignToSelection.map(item =>
                                                            <AssignToAvathar 
                                                                profileIcon={profileIcon} 
                                                                firstName={item.firstName} 
                                                                lastName={item.lastName}
                                                                onClick={() => this.assignToCheck(item)}
                                                            />
                                                        )
                                            }
                                        </div><img className='ctm-drop-toggler' src={dropdownIcon} alt='dropdownIcon' onClick={(e)=> this.editDropdownToggleHandler(e, { editDropdownToggle: 'isShowAssignToDrop' })}/>
                                    </div> */}

                                    <div className={`CT-assignTo-custome-dropdown-menu-container ${this.state.isShowAssignToDrop ? 'CT-assignTo-custome-open-dropdown zIndex' : 'CT-assignTo-custome-close-dropdown'}`} ref={this.setWrapperRef} >
                                        <div className='assign-to-list-container'>
                                            {this.state.users ? this.state.users.map(assignTo => {
                                            return  <ProfileItemWithCheckBox 
                                                        profileIcon={profileIcon} 
                                                        firstName={assignTo.firstName}
                                                        lastName={assignTo.lastName}    
                                                        onClick={() => this.assignToCheck(assignTo)}
                                                        onChange={() => this.assignToCheck(assignTo)}
                                                        checked={this.state.assignToSelection.includes(assignTo)}
                                                    /> 
                                            }) : null}
                                        </div>
                                    </div>
                                </div>
                                <EstimatedTime />
                                {/* <div className={`CT-estimated-time ${this.state.estimateTime == '' && this.state.isMandatoryFieldsMissing ? 'errorInputNotify' : null}`}>
                                    <img id='estimatedTimeIcon' src={estimatedTimeIcon} alt='estimatedTimeIcon' />
                                    <TextField
                                        className={''}
                                        // value={this.state.estimateTime}
                                        name="estimateTime"
                                        label="Estimated time (HH:MM)"
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.estimateTime}
                                        onChange={this.onChangeEstimateTime}
                              
                              >
                                    </TextField>
                                </div> */}
                            </div>
                            <div className='ET-text-area'>
                                <TextareaAutosize
                                    className={`notes-text-area ${this.state.taskDesc == '' && this.state.isMandatoryFieldsMissing ? 'errorInputNotify' : ''}`}
                                    placeholder="Task description"
                                    name="taskDesc"
                                    value={this.state.taskDesc}
                                    onChange={this.onChangeTaskDesc}
                                >

                                    {
                                        this.state.textAreaData == false && this.props.taskEData.taskDescription != null ?
                                            this.props.taskEData.taskDescription : this.state.taskDesc
                                    }
                                </TextareaAutosize>
                                {/* <div className={`CT-assignTo-custome-dropdown-menu-container ${this.state.isShowAssignToDrop ? 'CT-assignTo-custome-open-dropdown zIndex' : 'CT-assignTo-custome-close-dropdown'}`} ref={this.setWrapperRef} >
                                    <div className='assign-to-list-container'>
                                    {this.state.users.length > 0 ? this.state.users.map(assignTo => {
                                        return (
                                        <div className='assign-to-item'>
                                            <div className='assign-item-avatar'>
                                            <img src={profileIcon} alt='profileIcon' />
                                            <span>{assignTo.firstName} {assignTo.lastName}</span>
                                            <Checkbox className='avatar-item-checkbox' name='assignToChecked' onChange={() => this.assignToCheck(assignTo)} checked={this.state.assignToSelection.includes(assignTo)} /> */}
                            </div>


                            {/*****************************************Priotiy and Tags drop down****************************************** */}
                            <div className='edit-flex-container leftdfullsection'>
                                <div className={`ET-menu-container widthfifty`} onClick={(e)=> this.editDropdownToggleHandler(e, { editDropdownToggle: 'isPriorityDropdown' })}>
                                    <div className={`CT-priority-container 
                                    ${this.state.isPriorityDropdown ? 'edit-field-z-index' : null} 
                                    ${this.state.isPriorityDropdown ? 'edit-field-z-index' : null} 
                                    `}>
                                        <div className='CT-selected-item-container'>
                                            {console.log('this.state.priorities', this.state.priorities)  }

                                            {console.log('this.state.selectedPriorId', this.state.selectedPriorId)  }
                                            
                                            {
                                                this.state.priorityNameData == false && this.props.taskEData.priority != null ?
                                                    this.state.priorities ? this.state.priorities.map((data, index) => {
                                                        if (this.props.taskEData.priority == data.id)
                                                            return <p htmlFor="priority" name="priority">{data.priorityname}</p>
                                                    }) : <p>Priority</p> :
                                                    this.state.selectedPriorId ? <p>{this.state.selectedPriorId.priorityname}</p> : <p>Priority</p>
                                            }
                                        </div>
                                        <div className="CT-priority-drp-dwn-img">
                                            <img src={DrpDwnIcn} onClick={(e)=> this.editDropdownToggleHandler(e, { editDropdownToggle: 'isPriorityDropdown' })} alt='DrpDwnIcn' />
                                        </div>
                                    </div>

                                    <div className={`CT-priority-dropdown-menu-container ${this.state.isPriorityDropdown ? 'dropdown-z-index CT-priority-open-dropdown' : 'dropdown-z-index close-dropdown'}`} ref={this.setWrapperRef}>
                                        {this.state.priorities != null || this.state.priorities != undefined ?
                                            this.state.priorities.map((icon, index) =>
                                                <StyledMenuItem className="customized-ticket-source" onClick={(e) => {
                                                    e.stopPropagation();
                                                    this.priorityHandleClick(icon)
                                                }} onClose={this.handleClose}>
                                                    <div className="create-ticket-one-priority d-flex">
                                                        <div className="create-ticket-prio-img-text d-flex">
                                                            <img src={priorities[0].icon} alt='icon'></img>
                                                            <p value={icon}>{icon.priorityname}</p>
                                                        </div>

                                                        <div className="create-ticket-src-radio">
                                                            <Radio
                                                                checked={this.state.selectedPriorId.id === icon.id}
                                                                value={icon.id}
                                                                name="radio-button-demo"
                                                                color="primary"
                                                                inputProps={{ 'aria-label': '' }}
                                                            />
                                                        </div>
                                                    </div>
                                                </StyledMenuItem>
                                            ) : null
                                        }
                                    </div>
                                </div>
                                <div className="ET-drawer-tags widthfifty">
                                    <div className={`menu-container`}  ref={this.createTagsRef}>
                                        <div className={`tags-container 
                                            ${this.state.isShowTagsDrop ? 'field-z-index' : null}
                                            ${this.props.taskEData.tags ?this.props.taskEData.tags.length == 0 && this.state.tagsSelect == '' && this.state.isMandatoryFieldsMissing ? 'errorInputNotify' : null : null}
                                        `} >
                                            
                                            <div className='selected-item-container'>
                                                {
                                                    this.state.tagsToBeUpdated.length > 0 ? this.state.tagsToBeUpdated.map(tag => {
                                                        return <TagTemplate tagTitle={tag} removeHandler={ ()=> utils.elementPopHandler(this.state.tagsToBeUpdated, tag) }/>
                                                    }) : <p>Tags</p>
                                                }


                                                {/* {
                                                    this.state.tagNameData == false && this.props.taskEData.tags != null ?
                                                        <p>&nbsp;{this.props.taskEData.tags} &nbsp;</p>
                                                        : this.state.tagsSelect != "" ?
                                                            <p>{this.state.tagsSelect}</p>
                                                            : this.props.taskEData.tags != null ? <TagTemplate tagTitle={this.props.taskEData.tags}/>  : <p>Tags</p>
                                                } */}
                                            </div>
                                            <div className="tag-drp-dwn-img">
                                                <img src={addNewIcon}  alt='AddMultipleTag'/>
                                            </div>
                                        </div>

                                        <div className={`tag-dropdown-menu-container ${this.state.isShowTagsDrop ? 'dropdown-z-index tag-open-dropdown' : 'dropdown-z-index close-dropdown'}`} >
                                            <Scrollbars className="custom-scroll" style={{ height: 115 }}>
                                                {this.state.tags != null || this.state.tags != undefined ?
                                                    this.state.tags.map((icon, index) =>
                                                        <StyledMenuItem className="customized-ticket-source" onClose={this.handleClose}>
                                                            <div className="create-ticket-one-tag d-flex">
                                                                <div className="create-ticket-tag-img-text d-flex" onClick={() => this.checkedTags(icon)}>
                                                                    <div className="create-ticket-tag-check">
                                                                        { console.log('this.state.checkedTagsArray', this.state.checkedTagsArray) }
                                                                        <Checkbox
                                                                            className="create-ticket-tags-chck"
                                                                            name="checkedTagsArray"
                                                                            checked={this.state.checkedTagsArray.includes(icon)}
                                                                            color="primary"
                                                                            onClick={() => this.checkedTags(icon)}
                                                                        />
                                                                    </div>
                                                                    <p>{icon.tagTitle}</p>
                                                                </div>
                                                                <img src={icon.tagTitle == "Risk" ? MediumIcon : (icon.tagTitle == "Completed") ? HighIcon : null}></img>
                                                            </div>

                                                        </StyledMenuItem>
                                                    ) : null
                                                }
                                            </Scrollbars>
                                            <hr></hr>
                                            <div className="create-ticket-search-tag d-flex justify-space-around">
                                                <InputBase
                                                    placeholder="Enter tag name"
                                                    className="search-input"
                                                    inputProps={{ 'aria-label': 'search' }}
                                                />
                                                <img src={SearchTagAdd} alt=""></img>
                                            </div>
                                            <div className="create-task-drawer-color-picker d-flex">
                                                <img src={ClrPckrTray} alt="" 
                                                // onClick={(e)=> this.editDropdownToggleHandler(e, { editDropdownToggle: 'isShowColorPallet'})}
                                                onClick={(e) => {
                                                e.stopPropagation()
                                                this.setState({
                                                  isShowColorPallet: !this.state.isShowColorPallet, isShowTagsDrop: true
                                                })
                                              }}
                                                ></img>
                                                {this.state.isShowColorPallet ? this.colorPalletPopup() : null}
                                                <div className="task-circle-color-picker">
                                                    <CirclePicker colors={color} circleSize={18} circleSpacing={10} onChangeComplete={this.handleChangeComplete} />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/*****************************************Priotiy and Tags drop down****************************************** */}




                            {/*****************************************Link to Section****************************************** */}
                            <div className='edit-flex-container leftdfullsection'>
                                <div className='edit-tsk-link-to-exist-dropdown-container' onClick={(e)=> this.editDropdownToggleHandler(e, { editDropdownToggle: 'isSelectLinkToExist' })}>
                                    <div className={`LTE-non-library-dropdown 
                                        ${this.state.isSelectLinkToExist ? 'field-z-index' : null}
                                        ${this.state.linkedTo == '' && this.state.isMandatoryFieldsMissing ? 'errorInputNotify' : null}
                                    `}>
                                        <div className='LTE-selected-item-container'>
                                            <div className='link-to-selected-template'>
                                                <img src={selectLinkToIcon} alt='selectLinkToIcon' />
                                                {
                                                    this.state.linkedTo.title != null ?
                                                        <span>{this.state.linkedTo.title}</span> :
                                                        <span>Select link to existing</span>
                                                }
                                            </div>
                                        </div>
                                        <img className='LTE-drop-toggler' src={dropdownIcon} alt='dropdownIcon'
                                            // onClick={() => this.setState({ isSelectLinkToExist: !this.state.isSelectLinkToExist, isRelatedDropOpen: false })}
                                            onClick={(e)=> this.editDropdownToggleHandler(e, { editDropdownToggle: 'isSelectLinkToExist' })}
                                        />
                                    </div>

                                    <div className={`LTE-custome-dropdown-menu-container ${this.state.isSelectLinkToExist ? 'dropdown-z-index LTE-custome-open-dropdown ' : 'LTE-custome-close-dropdown'}`} ref={this.setWrapperRef} >
                                        <div className='LTE-list-container'>
                                            {selectLinkToExisting.map(linkTo => {
                                                return (
                                                    <div className='LTE-item' onClick={() => this.checkBoxLinkTo(linkTo)}>
                                                        <div className='LTE-item-avatar'>
                                                            <img className='link-to-icon' src={linkTo.icon} alt='profileIcon' />
                                                            <span>{linkTo.title}</span>
                                                                <Checkbox className='LTE-item-checkbox' value={linkTo} name='linkedTo'
                                                                checked={this.state.linkedTo.id == linkTo.id ? true : false}
                                                                onClick={() => this.checkBoxLinkTo(linkTo)}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className='edit-tsk-link-to-record-dropdown-container' onClick={(e)=> this.editDropdownToggleHandler(e, { editDropdownToggle: 'isRelatedDropOpen' })}>
                                    <div className={`LTR-non-library-dropdown 
                                        ${this.state.isRelatedDropOpen ? 'field-z-index' : null}
                                        ${this.state.relatedSelect == '' && this.state.isMandatoryFieldsMissing ? 'errorInputNotify' : null}
                                    `}>
                                        <div className='LTR-selected-item-container'>
                                            <div className='link-to-related-selected-template'>
                                                <img src={linkToRelatedIcon} alt='selectLinkToIcon' />
                                                {
                                                    this.state.relatedSelect != "" ?
                                                        <span>{`${this.state.relatedSelect}`} </span>
                                                        : <span>Link to <span>{this.state.linkedTo.id == 0 ? '<Related Tasks>'
                                                            : this.state.linkedTo.id == 1 ? '<Related Projects>' : this.state.linkedTo.id == 2 ? '<Related Tickets>' :
                                                                this.state.linkedTo.id == 3 ? '<Related Objectives>' : '<Related Record>'}
                                                        </span> </span>
                                                }
                                            </div>
                                        </div><img className='LTR-drop-toggler' src={dropdownIcon} alt='dropdownIcon' 
                                                    // onClick={() => this.setState({ isRelatedDropOpen: !this.state.isRelatedDropOpen, isSelectLinkToExist: false })} 
                                                    onClick={(e)=> this.editDropdownToggleHandler(e, { editDropdownToggle: 'isRelatedDropOpen' })}
                                                    />
                                    </div>

                                    <div className={`LTR-custome-dropdown-menu-container ${this.state.isRelatedDropOpen ? 'dropdown-z-index LTR-custome-open-dropdown ' : 'LTR-custome-close-dropdown'}`} ref={this.setWrapperRef} >
                                        <div className='LTR-list-container'>
                                            {linkRelatedRecords.map(linkTo => {
                                                return (
                                                    <ProfileItemWithCheckBox 
                                                        firstName={linkTo.title}
                                                        lastName={''}    
                                                        onClick={() => this.checkBoxRelatedTo(linkTo)}
                                                        onChange={() => this.checkBoxRelatedTo(linkTo)}
                                                        checked={''}
                                                    />


                                                    // // <div className='LTR-item' onChange={() => this.checkBoxRelatedTo(linkTo)}>
                                                    //     <div className='LTR-item'>
                                                    //     <div className='LTR-item-avatar' onChange={() => this.checkBoxRelatedTo(linkTo)}>
                                                    //         {/* <img className='link-to-icon' src={linkTo.icon} alt='profileIcon'/> */}
                                                    //         <span>{linkTo.title}</span>
                                                    //         <Checkbox className='LTR-item-checkbox' name='assignToChecked' onChange={() => this.checkBoxRelatedTo(linkTo)} value={linkTo} />
                                                    //     </div>
                                                    // </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*****************************************Link to Section****************************************** */}

                        </div>
                        <div className='edit-task-sub-section'>
                            <CompanyDetails 
                                companyLogo={CompanyLogo} 
                                companyName={this.state.selectedCompany.companyName} 
                                companyDescription={this.state.selectedCompany.companyDescription}
                                departmentName={this.state.selectedDepartment.departmentName}
                                teamName={this.state.selectedTeam.teamName}
                                onClick={this.openEditCompDtlsOpen}
                            />  
                            <div className='share-through-email-section'>
                                <div className='sharethecheckbox'>
                                    <Checkbox className='share-through-email-checkbox'
                                        checked={this.state.isShareThroughEmail}
                                        onChange={() => this.setState({ isShareThroughEmail: !this.state.isShareThroughEmail })} value="" />
                                    <span>Send a copy</span>
                                </div>
                                {
                                    this.state.isShareThroughEmail ? 
                                    (
                                        <MultipleSelectDropdown 
                                            placeholder={'Enter Email'}
                                            dropdownIcon={emailIcon}
                                            dropdownTogglerIcon={dropdownIcon}
                                            itemList={this.state.users}
                                            checkboxCopy={this.state.checkboxCopy}
                                            selectedElements={[]} 
                                            selectedElementsHandler={ data => {
                                                if(this.state.newElementList.length < data.length) {
                                                    this.setState({newElementList: data})
                                                }
                                            }}
                                        />


                                    //     <div className="editTaskEmailDrawer">
                                    //     <div className='menu-container'>
                                    //     <div className='create-ticket-email' 
                                    //         onClick={(e)=> this.editDropdownToggleHandler(e, { editDropdownToggle: 'isEmailDropdown' })}
                                    //     >
                                    //         <img src={emailIcon} alt="emailIcon"></img>
                                    //         <div className={`${this.state.checkboxCopy == false ? 'disabled' : ''} selected-item-container`}>
                                    //         {
                                    //             this.state.emailListToShare.length > 0 ? this.state.emailListToShare.map(email => (
                                    //                 <AssignToAvathar 
                                    //                     profileIcon={profileIcon} 
                                    //                     firstName={email.firstName} 
                                    //                     lastName={email.lastName}
                                    //                     onClick={e => { utils.elementPopHandler(this.state.emailListToShare, email) }}
                                    //                 />
                                    //             )) : <p className="eml-text">Enter email</p>
                                    //         }
                                    //         </div>
                                    //         <div className="email-drp-dwn-img">
                                    //         <img src={DrpDwnIcn}  />
                                    //         </div>
                                    //     </div>
                                    //     <div className={`dropdown-menu-container ${this.state.isEmailDropdown ? 'open-dropdown' : 'close-dropdown'}`}>
                                    //         {/* <Scrollbars className="emailListCustomScroll" style={{ height: 155 }}> */}
                                    //         {this.state.users ? this.state.users.map((user, index) =>
                                    //         <ProfileItemWithCheckBox 
                                    //             profileIcon={profileIcon} 
                                    //             firstName={user.firstName}
                                    //             lastName={user.lastName}    
                                    //             onClick={(e)=> this.handleChangeShare(e, user)}
                                    //             onChange={(e)=> this.handleChangeShare(e, user)}
                                    //             checked={this.state.emailListToShare.includes(user)}
                                    //         />
                                    //         ) : null}
                                    //     </div>
                                    //     </div>
                                    // </div>
                                    ) : null
                                }
                            </div>

                            <div className='edit-task-attachment'>
                            <span>Attachments</span>
                            <div className={`ET-attached-files-container ${!this.state.attachedFiles ? 'align-center' : 'space-equaly '}`}>
                            {this.state.attachedFiles != null || this.state.attachedFiles != undefined ?
                                this.state.attachedFiles.map((file, index) => {
                                return (
                                    <div className='attached-file-template'>
                                    <img className='attached-file-remove' src={removeAttachedFile} alt='' onClick={() => this.removeAttachedFileHandler(index)} />
                                    {
                                        file.base64 ?
                                        <img src={file.base64} alt='file' />
                                        :
                                        file ?
                                            <img src={fileIcons.map(icon => icon[file.name.split('.')[1]])} alt='' />
                                            : null
                                    }

                                    </div>
                                )
                                }) : null
                            }
                            <div className={`edit-tsk-file-upload-field ${ this.state.attachedFiles.length === 0 ? 'preButtonStyle' : 'postButtonStyle' } `} >
                                <Button className='edit-tsk-file-attach-button'>
                                    <input
                                    type='file'
                                    className="custom-attach-file-input"
                                    // className="custom-attach-file-input "
                                    id="inputGroupFile01"
                                    onChange={this.fileAttachmentHandler}
                                    multiple={true}
                                    />
                                    <p className="drag-attach-text">Drag attach file, <br />or <span>browse</span></p>
                                </Button>
                                </div>                  
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className='edit-task-footer-section'>
                        <div className="saveforlatertext">
                            <Checkbox className='Save-as-an-Idea-checkbox' checked={this.state.saveTemplate} onChange={this.checkBoxHandlerTemplate} value={this.state.saveTemplate} />
                            <span className="saveforlater">Save as an Idea for future use</span>
                        </div>
                        <Button variant="contained" className="ch-submit-button" onClick={this.updateTask}>
                            Update
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )

    render() {
        console.log('this.state.newElementList', this.state.newElementList)
        return (
            <Drawer  anchor="right" open={this.props.isEtdtaskDrawerOpen} onClose={this.toggleDrawer('right', false)} className='edit-ticket-drawer'>
                {this.sideList('right')}
            </Drawer>
        )
    }
}

export default EditTaskDrawer;