import React from 'react'
import './CreateTaskDrawer.scss';
import CompanyDetails from '../../components/CompanyDetails/CompanyDetails';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { TimePicker } from "@material-ui/pickers";
import DatePicker from 'react-date-picker';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { CirclePicker, TwitterPicker } from 'react-color'
import { withStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars'; 
import dropdownIcon from '../../assets/icons/01-10-2019/Icon ionic-md-arrow-dropdown.svg'
import colorPallet from '../../assets/create-habit/Icon material-color-lens.svg'
import closeCreateHabitIcon from '../../assets/create-habit/Icon ionic-ios-close.svg'
import emailIcon from '../../assets/icons/01-10-2019/Icon feather-mail.svg'
import profileIcon from '../../assets/profile.png'
import assignToProfileIcon from '../../assets/icons/SVG/Icon-awesome-user-circle.svg'
import decrementIcon from '../../assets/icons/SVG/Group 11399.svg'
import estimatedTimeIcon from '../../assets/icons/SVG/Icon material-access-time.svg'
import addNewIcon from '../../assets/icons/SVG/Group 11382.svg';
import InputBase from '@material-ui/core/InputBase';
import SearchTagAdd from "../../assets/icons/create-ticket/Group 11349.svg";
import ClrPckrTray from "../../assets/icons/create-ticket/Icon ionic-ios-color-palette.svg";
import LowIcon from "../../assets/icons/create-ticket/Rectangle 261.svg";
import HighIcon from "../../assets/icons/create-ticket/Rectangle 242.svg";
import CriticalIcon from "../../assets/icons/create-ticket/Rectangle 643.svg";
import DrpDwnIcn from "../../assets/icons/create-ticket/Icon ionic-md-arrow-dropdown.svg";
import Radio from '@material-ui/core/Radio';
import MediumIcon from "../../assets/icons/create-ticket/Path 887.svg";
import linkToTaskIcon from '../../assets/icons/SVG/Group11262.svg'
import linkToProjectIcon from '../../assets/icons/SVG/Group-11374.svg'
import linkToTicketIcon from '../../assets/icons/SVG/Group-11260.svg'
import linkToObjectiveIcon from '../../assets/icons/SVG/Icon-feather-target.svg'
import selectLinkToIcon from '../../assets/icons/SVG/Icon-feather-link.svg'
import linkToRelatedIcon from '../../assets/icons/SVG/Icon-ionic-ios-options.svg'
import DropDwnIcon from "../../assets/icons/SVG/Icon ionic-ios-arrow-down.svg";
import SearchIcon from '@material-ui/icons/Search';
import CompanyLogo from "../../assets/icons/task/company_logo.svg";
import { baseUrl } from "../../constants";
import tagsIcon from '../../assets/icons/SVG/Icon awesome-tags.svg'
import priorityIcon from '../../assets/icons/SVG/Icon-awesome-exclamation-circle.svg'
import CompanyEditIcon from "../../assets/icons/SVG/feather-edit.svg";
import EditCompanyDetails from '../../components/TicketingSystem/CreateTicket/EditCompanyDetails/EditCompanyDetails';
import removeAttachedFile from '../../assets/icons/create-ticket/Group 11407.svg'
import dpfIcon from '../../assets/icons/SVG/337946.png'
import removeIcon from '../../assets/icons/SVG/Group-11399 (1).svg';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker} from '@material-ui/pickers';
import loadingSpinner from '../../assets/icons/SVG/loadingSpinner.gif';
import materialDescription from '../../assets/icons/SVG/Icon material-description.svg';
// import TimeField from 'react-simple-timefield';
import FooterButton from '../../components/FooterButtonWithCheckBox/index';


import {
  getTodayData,
  getTomorrowData,
  getBacklogData,
  getAllTasks,
  getAllProj,
  getAllTickets,
  getAllObjectives,

} from "../NewTaskListing/NewTaskListingQuery"
import { getAllTaskTemplates, addTask,
  searchTemplateMutation, } from "./CreateTaskDrawerQueries"
import { 
  getTeams,
  getCompanyById,
  getDepartments,
  getTags,
  getAllUsers,
} from "../../components/CreateHabitDrawer/createHabitQuery"
import { getLogedUser } from "../TicketTable/TicketTableQueries"
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from "apollo-boost";
import { getAllPriorities } from '../../components/TicketingSystem/TasksList/EditTaskDrawer/editTaskQueries';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  uri: baseUrl.server,
});

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
const Email = [
  {id: 1, firstName: 'ram', lastName: 'qwew'},
  {id: 1, firstName: 'ram', lastName: 'qwew'},
  {id: 1, firstName: 'ram', lastName: 'qwew'},
  {id: 1, firstName: 'ram', lastName: 'qwew'},
  {id: 1, firstName: 'ram', lastName: 'qwew'},

]
let time = ['12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM']
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
  },
}))(MenuItem);
const color = ['#feb1b2', '#7ac9ff', '#ffc089', '#41e590', '#ea5455', '#c8c8c8', '#656565', '#ecf1f9', '#7AC9FF']
const colors = ['#1abc9c', '#17a085', '#2ecc71', '#27ae60', '#3498db', '#2980b9', '#9b59b6', '#8e44ad', '#34495e', '#2c3e50', '#f1c40e', '#f39c12', '#d35400', '#e74c3c', '#c0392b', '#9b0000', '#f28a8a', '#00edff', '#1aa0bc', '#1cd8ff', '#ff92f4', '#d500a3', '#ffb300', '#d0cfec', '#ecf1f9', '#c8c8c8', '#656565', '#464646']

let wrapperRef;
class CreateTaskDrawer extends React.Component {
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
      isAllDay: false,
      fromDate: new Date(),
      toDate: new Date(),
      fromTime: moment(new Date()).format('LT')  ,
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
      estimateTime: '',
      buildQuitBtnId: 1,
      goalPeriodBtnId: 4,
      weekDaysBtnId: 3,
      selectedDate: '',
      isShareThroughEmail: false,
      taskTitleColor: '',
      setTimeBtnId: null,
      setTimeBtns: [],
      weekDaysBtns: weekDaysBtns,
      taskTitle: "",
      count: 1,
      setTime: [],
      location: "",
      tags: [],
      tags1: [],
      users: [],
      users1: [],
      shareMail: null,
      saveTemplate: false,
      frequency: {},
      responsibleUsers: [],
      isEditCompDtlsOpen: false,
      company: [],
      anchorEl: null,
      selectedCompany: {},
      departments: [],
      selectedDepartment: {},
      teamsData: [],
      selectedTeam: {},
      logedUser: {},
      selectedProject: {},
      checkedTagsArray: [],
      tagsSelect: "",
      listOfRelatedTo: [],
      relatedSelect: "",
      taskFrequency: 0,
      selectedQuick: {},
      taskDesc: "",
      templatesData: [],
      emailListToShare: [],
      isMandatoryFieldsMissing: false,
      isSpinnerLoading: false
    }
  }
  
  componentDidMount() {
    const client = this.props.thisObj.props.client;
    // console.log("componentDidMount+",client)
    // document.addEventListener('mousedown', this.shandleClickOutside);
    document.addEventListener('mousedown', this.handleClickOutside);
    getLogedUser(client,parseInt(localStorage.getItem("id")),res=>{
      this.setState({ logedUser: res })
      this.fetchTeams(res.companyId, res.departmentId, res.tenantId);
      this.fetchcompany(res.companyId);
      this.fetchDepartment(res.departmentId);
      this.fetchTags(res.companyId);
      this.getTemplatesData(res.tenantId);
      return res;
    })
    this.fetchUsers();
    this.fetchPriorities()
  }


  getTemplatesData = async (id) => {
    const client = this.props.thisObj.props.client;

    getAllTaskTemplates(client,id,res=>{
      this.setState({ templatesData: res.data.taskTemplate })
      return res;
    })
  }

  array = [];

  checkedTags = (id) => {
    var tagString = ""
    if (this.array.includes(id)) {
      let index = this.array.indexOf(id)
      this.array.splice(index, 1);
    } else {
      this.array.push(id)
    }
    this.array.map(uniq => {
      if (this.array.length > 1) {
        tagString += " " + uniq.tagTitle
      } else {
        tagString = uniq.tagTitle
      }
    })
    this.setState({ checkedTagsArray: this.array, tagsSelect: tagString })
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
    this.setState({ assignToSelection: this.arrayToAssign })
  }

  checkBoxLinkTo = (data) => {
    if (data != this.state.linkedTo) {
      this.setState({ linkedTo: data, isSelectLinkToExist: false, isRelatedDropOpen: false, relatedSelect: "" })
    } else {
      this.setState({ linkedTo: data, isSelectLinkToExist: false, isRelatedDropOpen: false })
    }
    if (data.id == 0) {
      this.fetchTasks()
    } else if (data.id == 1) { this.fetchProject() } else if (data.id == 2) { this.fetchTicket() } else if (data.id == 3) { this.fetchObjective() }

  }

  submitTask = async (e) => {
    // checkedTagsArray :Array
    // taskFrequency:int
    // fromDate:date String
    // fromTime : String
    // toDate:date string
    // toTime : string    
    // taskTitle : String
    // habitColor : String
    // isAllDay : Boolean
    // isShareThroughEmail
    // linkedTo : {title}
    // listTorelatedTo:array
    // logedUser : {}
    // selectedCompany : {}
    // selectedDepartment : {}
    // selectedPriorId : {}
    // selectedProject : {}
    // selectedTeam : {}
    // shareMail : string

    if (this.state.assignToSelection.length > 0)
    var assignTo = this.state.assignToSelection.map((usr, index) => {
      return usr.id;
    })
    var tagsId = []
    if (this.state.checkedTagsArray != null || this.state.checkedTagsArray.length != 0) {
      tagsId = this.state.checkedTagsArray.map(tag => {
        return tag.id;
      })
    }
    var relatedTypes = []
    if (this.state.listOfRelatedTo.length > 0) {
      relatedTypes = this.state.listOfRelatedTo.map(obj => {
        return obj.id
      })
    }
    var sendCopyEmail = []
    if(this.state.emailListToShare != null || this.state.emailListToShare.length > 0){
      sendCopyEmail = this.state.emailListToShare.map(email=>{
        return email.id
      })
    }
    let variables = {
      taskTitle: this.state.taskTitle,
      assignTo: assignTo[0],
      startTime: this.state.fromDate,
      dueTime: this.state.toDate,
      companyId: this.state.selectedCompany ? this.state.selectedCompany.id : this.state.logedUser.companyId,
      // projectId:this.state.selectedProject ? this.state.selectedProject.id : null,
      departmentId: this.state.selectedDepartment ? this.state.selectedDepartment.id : null,
      teamId: this.state.selectedTeam ? this.state.selectedTeam.id : null,
      sendCopyTo: this.state.isShareThroughEmail ? sendCopyEmail[0] : null,
      taskDescription: this.state.taskDesc,
      priority: this.state.selectedPriorId.id,
      relatedTo: this.state.linkedTo.id,
      linkWithTicket: this.state.linkedTo.id == 2 ? relatedTypes[0] : null,
      linkWithProject: this.state.linkedTo.id == 1 ? relatedTypes[0] : null,
      linkWithTask: this.state.linkedTo.id == 0 ? relatedTypes[0] : null,
      linkWithObjective: this.state.linkedTo.id == 3 ? relatedTypes[0] : null,
      tags: tagsId,
      taskHours: this.state.estimateTime,
      createdBy: this.state.logedUser.id,
      saveTemplate: this.state.saveTemplate,
      billable:true
    }
    e.preventDefault();
    const client = this.props.thisObj.props.client;
    if(this.state.taskTitle && assignTo && this.state.estimateTime && this.state.selectedPriorId && tagsId && this.state.linkedTo && relatedTypes) {
      this.setState({ isSpinnerLoading: true })
    addTask(client,variables,res=>{
      getTomorrowData(
        client, 1, tomorrowData => {
            return this.props.thisObj.setState({ tomorrowData: tomorrowData.data.getTomorrowTasks });
        });
              getBacklogData(
            client, 1, backlogData => {
                return this.props.thisObj.setState({ backlogData: backlogData.data.getBacklogTasks });
            }
        );
            getTodayData(
            client, 1, todayData => {
                return this.props.thisObj.setState({ todayData: todayData.data.getTodayTasks });
            }
        );
        this.setState({ isSpinnerLoading: false })
      this.closeDrawerHandler()
      return res;      
    })
  } else {
    this.setState({ isSpinnerLoading: false })
    this.setState({ isMandatoryFieldsMissing: true })
  }
  }


  searchTemplate = async (e) => {
    const client = this.props.thisObj.props.client;
    let variables = {
      templateName: e.target.value,
      tenantId: this.state.logedUser.tenantId
    }

    searchTemplateMutation(client,variables,res=>{
      this.setState({ templatesData: res.data.data.searchTaskTemplate })
      return res;
    })
  }


  openEditCompDtlsOpen = (e) => {
    e.stopPropagation()
    this.setState({ isEditCompDtlsOpen: true })
  }
  closeCompanyDrawer = () => {
    this.setState({ isEditCompDtlsOpen: false })
  }

  fetchPriorities = (companyId) => {
    const client = this.props.thisObj.props.client;
    getAllPriorities(client,res=>{
      let priorities = res.data.priorities;
      this.setState({ priorities : priorities });
    })
  };

  fetchcompany = (companyId) => {
    const client = this.props.thisObj.props.client;
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
    const client = this.props.thisObj.props.client;
    getAllUsers(client,res=>{
        let userAll = res.data.getAllUsers;
        this.setState({ users: userAll });
    })
  };


  fetchDepartment = (deptId) => {
    
    const client = this.props.thisObj.props.client;
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
    const client = this.props.thisObj.props.client;
    getAllTasks(client,res=>{
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
    const client = this.props.thisObj.props.client;
    getAllProj(client,res=>{
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
    const client = this.props.thisObj.props.client;
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
    const client = this.props.thisObj.props.client;
    getTeams(client,a,b,c,res=>{
      let teamsData = res.data.getTeamByCompanyIdAndDepartmentId;
      this.setState({ teamsData: teamsData, selectedTeam: teamsData[0] });
    })
  };

  handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      this.setState({
        isShowColorPallet: false,
        isShowFromSetTimePopup: false,
        isShowToSetTimePopup: false,
        isShowDontRepeat: false,
        isShowAssignToDrop: false,
        // isShowTagsDrop: false,
        isPriorityDropdown: false,
        isSelectLinkToExist: false,
        isRelatedDropOpen: false,
        isQuickCreateDropdown: false
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
  showEmailDropdown = () => this.setState({ isEmailDropdown: !this.state.isEmailDropdown })
  checkBoxHandler = event => this.setState({ [event.target.name]: event.target.checked });
  onChangeHandler = event => this.setState({ [event.target.name]: event.target.value })
  checkBoxHandlerTemplate = event => this.setState({ saveTemplate: event.target.checked })
  closeDrawerHandler = () => this.props.thisObj.setState({ isCTaskDrawerOpen: false });
  buildQuitBtnClickHandler = button => this.setState({ buildQuitBtnId: button.btnId });
  goalPeriodBtnClickHandler = button => this.setState({ goalPeriodBtnId: button.btnId });
  handleDateChange = date => this.setState({ selectedDate: date });
  showColorPalletPopup = (e) => {
    e.stopPropagation()
    this.setState({
      isShowColorPallet: !this.state.isShowColorPallet,
      isQuickCreateDropdown: false,
      isShowAssignToDrop: false,
      isShowDontRepeat: false,
      isShowFromSetTimePopup: false,
      isShowTagsDrop: false,
      isShowTaskColorPallet: false,
      isShowToSetTimePopup: false,
      isPriorityDropdown: false,
      isRelatedDropOpen: false,
      isSelectLinkToExist: false,
    });
  }
  showTaskColorPalletPopup = (e) => {
    e.stopPropagation()
    this.setState({
      isShowTaskColorPallet: !this.state.isShowTaskColorPallet,
      isQuickCreateDropdown: false,
      isShowAssignToDrop: false,
      isShowDontRepeat: false,
      isShowColorPallet: false,
      isShowFromSetTimePopup: false,
      isShowTagsDrop: false,
      isShowToSetTimePopup: false,
      isPriorityDropdown: false,
      isRelatedDropOpen: false,
      isSelectLinkToExist: false,
    });
  }
  showSetTimePopup = (id) => this.setState({ isShowSetTimePopup: !this.state.isShowSetTimePopup, setTimeBtnId: id });
  handleChangeComplete = (color, event) => {
    this.setState({
      taskTitleColor: color.hex, isShowTaskColorPallet: !this.state.isShowTaskColorPallet,
      isQuickCreateDropdown: false,
      isShowAssignToDrop: false,
      isShowDontRepeat: false,
      isShowColorPallet: false,
      isShowFromSetTimePopup: false,
      isShowTagsDrop: false,
      isShowToSetTimePopup: false,
      isPriorityDropdown: false,
      isRelatedDropOpen: false,
      isSelectLinkToExist: false,
    })
  };
  weekDaysBtnClickHandler = button => {
    let tempWeekDaysBtns = this.state.weekDaysBtns;
    tempWeekDaysBtns[button.btnId].isActive = !tempWeekDaysBtns[button.btnId].isActive
    this.setState({ weekDaysBtnId: button.btnId, frequency: tempWeekDaysBtns });
  }
  showPriorityDropdown = (e) => {
    e.stopPropagation();
    this.setState({
      isPriorityDropdown: !this.state.isPriorityDropdown, isShowTagsDrop: false,
      isQuickCreateDropdown: false,
      isShowAssignToDrop: false,
      isShowDontRepeat: false,
      isShowColorPallet: false,
      isShowFromSetTimePopup: false,
      isShowTaskColorPallet: false,
      isShowToSetTimePopup: false,
      isRelatedDropOpen: false,
      isSelectLinkToExist: false,
    })
  }
  priorityHandleClick = (selectedObject) => {
    this.setState({ selectedPriorId: selectedObject, isPriorityDropdown: !this.state.isPriorityDropdown });
  }
  peopleHandleClickfunction = (e, index, name) => {
    this.setState({ [e.target.name]: index });
    if (this.state.selectedPeople.includes(name)) { } else {
      this.state.selectedPeople.push(name)
      this.state.selectedItems.push(name)
    }
  }

  submitFreq = (e) => {
    this.setState({
      taskFrequency: e.target.value, isShowDontRepeat: !this.state.isShowDontRepeat,
      isQuickCreateDropdown: false,
      isShowAssignToDrop: false,
      isShowColorPallet: false,
      isShowFromSetTimePopup: false,
      isShowTagsDrop: false,
      isShowTaskColorPallet: false,
      isShowToSetTimePopup: false,
      isPriorityDropdown: false,
      isRelatedDropOpen: false,
      isSelectLinkToExist: false,
    })
  }
  onChangeEstimateTime = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  quickHandleClick = (selectedObject) => {
    this.setState({
      selectedQuick: selectedObject, taskTitle: `${selectedObject.taskPrefix}-${selectedObject.templateName}`,
      taskDesc: selectedObject.taskDescription, isQuickCreateDropdown: !this.state.isQuickCreateDropdown,
      isShowAssignToDrop: false,
      isShowDontRepeat: false,
      isShowColorPallet: false,
      isShowFromSetTimePopup: false,
      isShowTagsDrop: false,
      isShowTaskColorPallet: false,
      isShowToSetTimePopup: false,
      isPriorityDropdown: false,
      isRelatedDropOpen: false,
      isSelectLinkToExist: false,
      quickTemplate: selectedObject.templateName
    })
  }

  taskColorPalletPopup = () => (
    <div className='color-pallet-popup' ref={this.setWrapperRef}>
      <span>Color palette</span>
      <TwitterPicker colors={colors} onClick={() => this.setState({
        isShowTaskColorPallet: !this.state.isShowTaskColorPallet,
        isQuickCreateDropdown: false,
        isShowAssignToDrop: false,
        isShowDontRepeat: false,
        isShowColorPallet: false,
        isShowFromSetTimePopup: false,
        isShowTagsDrop: false,
        isShowToSetTimePopup: false,
        isPriorityDropdown: false,
        isRelatedDropOpen: false,
        isSelectLinkToExist: false,
      })} onChangeComplete={this.handleChangeComplete} />
    </div>
  )

  colorPalletPopup = () => (
    <div className='create-task-tag-color-pallet-popup' ref={this.setWrapperRef}>
      <span>Color palette</span>
      <TwitterPicker colors={colors} onChangeComplete={this.handleChangeComplete} />
    </div>
  )
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

  elementPopHandler =(array, element)=> {
    let index = array.indexOf(element)
    let temp = array.splice(index, 1)
  }

  handleChangeShare = (e, user) => {
    let temp = this.state.emailListToShare;
    temp = [...temp, user]
    this.setState({ shareMail: e.target.value, isShareThroughEmail: true, emailListToShare: temp })
  }
  onChangetaskTitle = (e) => {
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
    this.setState({ [e.target.name]: e.target.value })
  }
  closeOpenPopup = () => {
    this.setState({
      isQuickCreateDropdown: false,
      isShowAssignToDrop: false,
      isShowDontRepeat: false,
      isShowColorPallet: false,
      isShowFromSetTimePopup: false,
      isShowTagsDrop: false,
      isShowTaskColorPallet: false,
      isShowToSetTimePopup: false,
      isPriorityDropdown: false,
      isRelatedDropOpen: false,
      isSelectLinkToExist: false,
    })
  }

  dropdownToggleHandler =(event, dropdownToggle)=> {
    event.stopPropagation();
    if(dropdownToggle) {
      this.setState({ 
        isQuickCreateDropdown: false,
        isTicketTypeDropdown: false,
        isMultiTagDropdown: false,
        // selectedpriority: false,
        isSourceDropdown: false,
        isPriorityDropdown: false,
        isEmailDropdown: false,
        isShowDropdown: false,
        isAssignToOpen: false,
        [dropdownToggle[Object.keys(dropdownToggle)[0]]]: !this.state[dropdownToggle[Object.keys(dropdownToggle)[0]]]
       })
    }
    else {
      this.setState({
        isQuickCreateDropdown: false,
        isShowAssignToDrop: false,
        isShowColorPallet: false,
        isShowFromSetTimePopup: false,
        isShowTagsDrop: false,
        isShowTaskColorPallet: false,
        isShowToSetTimePopup: false,
        isPriorityDropdown: false,
        isRelatedDropOpen: false,
        isSelectLinkToExist: false,
        isShowDontRepeat: false,
        // isEmailDropdown: false
      })
    }
  }

  sideList = () => (
    // <div className="crt-tsk-drwr-section" onClick={this.closeOpenPopup}>
       <div className="crt-tsk-drwr-section" onClick={this.dropdownToggleHandler}>


      {this.state.isEditCompDtlsOpen ? <EditCompanyDetails onClick={(e) => {
        e.stopPropagation()
        this.setState({
          isQuickCreateDropdown: false,
          isShowAssignToDrop: false,
          isShowDontRepeat: false,
          isShowColorPallet: false,
          isShowFromSetTimePopup: false,
          isShowTagsDrop: false,
          isShowTaskColorPallet: false,
          isShowToSetTimePopup: false,
          isPriorityDropdown: false,
        })
      }
      } isEditCompDtlsOpen={this.state.isEditCompDtlsOpen} allState={this.state} thisObj={this} /> : null}
      <div className='create-tsk-layout'>
        <div className="create-tsk-drwr-cls-icon" >
          <img src={closeCreateHabitIcon} alt='close-icon' onClick={this.closeDrawerHandler}/>
        </div>
        <div className="crt-tsk-mddl-sctn">
          <div className="crt-tsk-mddl-container">
          <div className="crt-tsk-bdy-cmpnt">
            <div className='crt-tsk-main-sctn'>
              <div className="crt-tsk-hdr-sctn">
                <div className="tsk-hdr-txt">
                  <p className="pclasstask">Create Task</p>
                  <p>Lorem ipsum is simply dummy text of the printing and <br></br>typesetting industry</p>
                </div>

                <div className='quick-create-using-template'>
                  <div className='quick-create-template'onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isQuickCreateDropdown' })} 
                  onClick={(e) => {
                    e.stopPropagation();
                    this.setState({
                      isQuickCreateDropdown: !this.state.isQuickCreateDropdown,
                      isRelatedDropOpen: false,
                      isSelectLinkToExist: false,
                      isShowAssignToDrop: false,
                      isShowDontRepeat: false,
                      isShowColorPallet: false,
                      isShowFromSetTimePopup: false,
                      isShowTagsDrop: false,
                      isShowTaskColorPallet: false,
                      isShowToSetTimePopup: false,
                      isPriorityDropdown: false,
                    })
                  }
                  }>
                    <div className='selected-item-container'>
                      <p>{this.state.quickTemplate ? this.state.quickTemplate : 'Quick create using template'}</p>
                    </div>
                    <div className="quick-drp-dwn-img">
                      <img alt="" src={DropDwnIcon} />
                    </div>
                  </div>
                  <div className={`dropdown-menu-container ${this.state.isQuickCreateDropdown ? 'open-dropdown' : 'close-dropdown'}`} ref={this.setWrapperRef}>
                    <div className="quick-create-search-bar d-flex align-items-center">
                      <InputBase
                        placeholder="Search of template"
                        className="search-input"
                        inputProps={{ 'aria-label': 'search' }}
                        onClick={(e) => e.stopPropagation()}
                        onChange={this.searchTemplate}
                      />
                      <SearchIcon onClick={(e) => e.stopPropagation()} />
                    </div>
                    <Scrollbars className="custom-scroll" style={{ height: 160 }}>
                      {this.state.templatesData != null || this.state.templatesData != undefined ?
                        this.state.templatesData.map(icon =>
                          <StyledMenuItem className="customized-ticket-list" onClick={() => this.quickHandleClick(icon)} onClose={this.handleClose}>
                            <div className="quick-create-ticket-one d-flex">
                              {/* <img src={icon.icon} alt='icon'/> */}
                              <p>{icon.templateName}</p>
                            </div>

                          </StyledMenuItem>
                        ) : null
                      }
                    </Scrollbars>
                  </div>
                </div>
              </div>

              <div className={`create-task-title-container ${this.state.taskTitle == '' && this.state.isMandatoryFieldsMissing ? 'error-title-input-field' : ''} `}>
                <>
                  <TextField
                    id="standard-basic"
                    className={''}
                    inputProps={{ style: { color: `${this.state.taskTitleColor}` } }}
                    value={this.state.taskTitle}
                    margin="normal"
                    placeholder='Task title'
                    onChange={this.onChangetaskTitle}
                  />
                  <label className="star-img">*</label>
                  <div className='color-pallet-container'>
                    <img src={colorPallet} alt='colorPallet' className='colorPallet' onClick={this.showTaskColorPalletPopup} />
                    {this.state.isShowTaskColorPallet ? this.taskColorPalletPopup() : null}
                  </div>
                </>
              </div>

              <div className='task-date-time-container'>
                <div className='task-date-time'>
                  <div id='task-datepicket-btn'>
                    <Button variant="contained" className={`CT-custome-button CT-for-date`} onClick={'onClick'}>{this.state.fromDate ? moment(this.state.fromDate).format("MMM, DD YYYY") : 'From Date'}</Button>
                    <DatePicker showYearDropdown yearDropdownItemNumber={15} onChange={(date) => this.dateChangeHandler(date, 'fromDate')} value={this.state.fromDate} clearIcon={null} />
                  </div>
                  {
                    !this.state.isAllDay ?
                      (
                        <div className='CT-time-setter'>
                          <Button autoOk label="12 hours" variant="contained" className={`CT-custome-button CT-time-btn ${this.state.fromTime == '' && this.state.isMandatoryFieldsMissing ? 'errorInputNotify' : null}`} onClick={(e) => {
                            e.stopPropagation()
                            this.setState({
                              isShowFromSetTimePopup: !this.state.isShowFromSetTimePopup,
                              isQuickCreateDropdown: false,
                              isShowAssignToDrop: false,
                              isShowDontRepeat: false,
                              isShowColorPallet: false,
                              isShowTagsDrop: false,
                              isShowTaskColorPallet: false,
                              isShowToSetTimePopup: false,
                              isPriorityDropdown: false,
                              isRelatedDropOpen: false,
                              isSelectLinkToExist: false,
                            })
                          }
                          }>{this.state.fromTime ? this.state.fromTime : 'time'}</Button>
                          {this.state.isShowFromSetTimePopup ? this.setTimePopup(time, 'fromTime') : null}
                        </div>
                      ) : null
                  }

                </div>
                <span id='to'>to</span>
                <div className='task-date-time'>
                 {console.log('task-date', this.state.toTime)}
                  <div id='task-datepicket-btn'>
                    <Button variant="contained" className={'CT-custome-button CT-for-date'} onClick={'onClick'}>{this.state.toDate ? moment(this.state.toDate).format("MMM, DD YYYY") : 'To Date'}</Button>
                    <DatePicker onChange={(date) => this.dateChangeHandler(date, 'toDate')} value={this.state.toDate} clearIcon={null} />
                  </div>
                  {
                    !this.state.isAllDay ?
                      (
                        <div className='CT-time-setter'>
                          <Button variant="contained" className={ `CT-custome-button CT-time-btn ${this.state.fromTime == '' && this.state.isMandatoryFieldsMissing ? 'errorInputNotify' : null}`} onClick={(e) => {
                            e.stopPropagation()
                            this.setState({
                              isShowToSetTimePopup: !this.state.isShowToSetTimePopup,
                              isQuickCreateDropdown: false,
                              isShowAssignToDrop: false,
                              isShowDontRepeat: false,
                              isShowColorPallet: false,
                              isShowFromSetTimePopup: false,
                              isShowTagsDrop: false,   
                              isShowTaskColorPallet: false,
                              isPriorityDropdown: false,
                             isRelatedDropOpen: false,
                             isSelectLinkToExist: false,
                            })
                          }}
                          >{this.state.fromTime ? this.state.fromTime : 'To Time'}</Button>
                          {this.state.isShowToSetTimePopup ? this.setTimePopup(time, 'fromTime') : null}
                        </div>
                      ) : null
                  }

                </div>

                <div className='CT-all-day'>
                  <Checkbox name='isAllDay' className='CT-all-day-checkbox' checked={this.state.isAllDay} onChange={this.checkBoxHandler} value="checkedA" />
                  <span>ALL DAY</span>
                </div>

                <div className='DNR-dropdown-container'>
                  <div className='DNR-custome-non-library-dropdown' onClick={(e) => {
                      e.stopPropagation()
                      this.setState({
                        isShowDontRepeat: !this.state.isShowDontRepeat,
                        isQuickCreateDropdown: false,
                        isShowAssignToDrop: false,
                        isShowColorPallet: false,
                        isShowFromSetTimePopup: false,
                        isShowTagsDrop: false,
                        isShowTaskColorPallet: false,
                        isShowToSetTimePopup: false,
                        isPriorityDropdown: false,
                        isRelatedDropOpen: false,
                        isSelectLinkToExist: false,
                      })
                    }}>
                    <div className='DNR-selected-item-container' >
                      {this.state.taskFrequency == "0" ? 'Does not repeat' : this.state.taskFrequency == "1" ? 'Daily' :
                        this.state.taskFrequency == "2" ? 'Weekly' : this.state.taskFrequency == "3" ? 'Monthly' : 'Custom'
                      }
                    </div><img src={dropdownIcon} alt='dropdownIcon'  />
                  </div>

                  <div className={`DNR-custome-dropdown-menu-container ${this.state.isShowDontRepeat ? 'DNR-custome-open-dropdown zIndex' : 'DNR-custome-close-dropdown'}`} ref={this.setWrapperRef} >
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

              <div className='ct-flex-container leftdfullsection' >
                <div className='CT-assignTo-dropdown-container'>
                  <div className={`CT-assignTo-non-library-dropdown ${ this.state.assignToSelection.length == 0 && this.state.isMandatoryFieldsMissing ? 'errorInputNotify' : null }`} onClick={(e) => {
                    e.stopPropagation()
                    this.setState({
                      isShowAssignToDrop: !this.state.isShowAssignToDrop,
                      isQuickCreateDropdown: false,
                      isShowDontRepeat: false,
                      isShowColorPallet: false,
                      isShowFromSetTimePopup: false,
                      isShowTagsDrop: false,
                      isShowTaskColorPallet: false,
                      isShowToSetTimePopup: false,
                      isPriorityDropdown: false,
                      isRelatedDropOpen: false,
                      isSelectLinkToExist: false,
                    })
                  }}>
                    <img src={assignToProfileIcon} alt='assignToProfileIcon' />
                    <div className='CT-selected-item-container'>
                      {this.state.assignToSelection.length == 0 ? 'Assign to' :
                        this.state.assignToSelection.map(item =>
                          <div className='CT-selected-item-template'>
                            <img id='avathar-img' src={profileIcon} alt='profileIcon' />
                            <span>{item.firstName} {item.lastName}</span>
                            <img id='remove-img' src={decrementIcon} alt='decrementIcon' onClick={()=> this.elementPopHandler(this.state.assignToSelection, item)} />
                          </div>
                        )}
                    </div>
                    <img className='ctm-drop-toggler' src={dropdownIcon} alt='dropdownIcon' onClick={(e) => {
                      e.stopPropagation()
                      this.setState({ isShowAssignToDrop: !this.state.isShowAssignToDrop })
                    }} />
                  </div>
                  {
                    
                  }
                  <div className={`CT-assignTo-custome-dropdown-menu-container ${this.state.isShowAssignToDrop ? 'CT-assignTo-custome-open-dropdown zIndex' : 'CT-assignTo-custome-close-dropdown'}`} ref={this.setWrapperRef} >
                    <div className='assign-to-list-container'>
                      {this.state.users != null || this.state.users != undefined ?
                        this.state.users.map(assignTo => {
                          return (
                            <div className='assign-to-item'>
                              <div className='assign-item-avatar' onClick={()=> this.assignToCheck(assignTo)}>
                                <img src={profileIcon} alt='profileIcon' />
                                <span>{assignTo.firstName} {assignTo.lastName}</span>
                                <Checkbox className='avatar-item-checkbox' name='assignToChecked' onClick={(e) => {
                                  e.stopPropagation();
                                  this.assignToCheck(assignTo)
                                }} checked={this.state.assignToSelection.includes(assignTo)} />
                              </div>
                            </div>
                          )
                        }) : null
                      }
                    </div>
                  </div>
                </div>
                <div className={`CT-estimated-time ${this.state.estimateTime == '' && this.state.isMandatoryFieldsMissing ? 'errorInputNotify' : ''}`  } >
                  <img id='estimatedTimeIcon' src={estimatedTimeIcon} alt='estimatedTimeIcon' />
                  <TextField
                    className={''}
                    // value={this.state.estimateTime}
                    name="estimateTime"
                    label="Estimated time (HH:MM)"
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChangeEstimateTime}
                  />
                  {/* <TimeField
    value={time}                       
    onChange={(event, value) => {}} 
    input={<MyCustomInputElement />}  
    colon=":"                         
    showSeconds                      
/> */}
                </div>
              </div>

              <div className='CT-text-area'>
                <img src={materialDescription} alt="edit"></img>
                <TextareaAutosize className={`notes-text-area ${this.state.taskDesc == '' && this.state.isMandatoryFieldsMissing ? 'errorInputNotify' : ''}`}  placeholder="Task description" name="taskDesc" value={this.state.taskDesc} onChange={this.onChangeTaskDesc} />
              </div>


              {/*****************************************Priotiy and Tags drop down****************************************** */}
              <div className='ct-flex-container leftdfullsection'>
                <div className={`CT-menu-container widthfifty`} onClick={this.showPriorityDropdown}>
                  <div className={`CT-priority-container 
                  ${this.state.isPriorityDropdown ? 'field-z-index' : null} 
                  ${this.state.selectedPriorId == '' && this.state.isMandatoryFieldsMissing? 'errorInputNotify' : null}
                  `}>
                    <div className='CT-selected-item-container'>
                      <img src={priorityIcon} alt='priorityIcon'/>
                      {this.state.selectedPriorId ?
                        <p htmlFor="priority" name="priority" value={this.state.selectedPriorId.id}>{this.state.selectedPriorId.priorityname}</p>
                        : <p htmlFor="priority" name="priority" value="">Priority</p>
                      }
                    </div>
                    <div className="CT-priority-drp-dwn-img">
                      <img src={DrpDwnIcn} onClick={this.showPriorityDropdown} alt='DrpDwnIcn' />
                    </div>
                  </div>

                  <div className={`CT-priority-dropdown-menu-container ${this.state.isPriorityDropdown ? 'dropdown-z-index CT-priority-open-dropdown' : 'dropdown-z-index close-dropdown'}`} ref={this.setWrapperRef}>
                    {this.state.priorities != null || this.state.priorities != undefined ?
                      this.state.priorities.map((icon, index) =>
                        <StyledMenuItem className="customized-ticket-source" onClick={(e) => this.priorityHandleClick(icon)} onClose={this.handleClose}>
                          <div className="create-ticket-one-priority d-flex">
                            <div className="create-ticket-prio-img-text d-flex">
                              <img src={priorities[0].icon} alt='icon'></img>
                              <p>{icon.priorityname}</p>
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
                <div className="CT-drawer-tags widthfifty">
                  <div className={`menu-container`}>
                    <div className={`tags-container 
                    ${this.state.isShowTagsDrop ? 'field-z-index' : null}
                    ${this.state.checkedTagsArray.length === 0 &&  this.state.isMandatoryFieldsMissing ? 'errorInputNotify' : null}
                    `} 
                    
                    onClick={(e) => {
                      e.stopPropagation()
                      this.setState({
                        isShowTagsDrop: !this.state.isShowTagsDrop, isPriorityDropdown: false,
                        isQuickCreateDropdown: false,
                        isShowAssignToDrop: false,
                        isShowDontRepeat: false,
                        isShowColorPallet: false,
                        isShowFromSetTimePopup: false,
                        isShowTaskColorPallet: false,
                        isShowToSetTimePopup: false,
                        isRelatedDropOpen: false,
                        isSelectLinkToExist: false,
                      })
                    }}>
                      <div className='selected-item-container'>
                      <img className='tagsIcon' src={tagsIcon} alt='tagsIcon' /> 
                        { this.state.checkedTagsArray.length === 0 ? 'Tags' : this.state.checkedTagsArray.map(tag => <p className={this.state.tagsSelect ? 'selectedTag' : null}>{tag.tagTitle} <img className='removeTagIcon' src={removeIcon} alt='' onClick={()=> this.elementPopHandler(this.state.checkedTagsArray, tag)}/></p>) }
                      </div>
                      <div className="tag-drp-dwn-img">
                        <img src={addNewIcon} onClick={(e) => {
                          e.stopPropagation()
                          this.setState({
                            isShowTagsDrop: !this.state.isShowTagsDrop, isPriorityDropdown: false,
                            isQuickCreateDropdown: false,
                            isShowAssignToDrop: false,
                            isShowDontRepeat: false,
                            isShowColorPallet: false,
                            isShowFromSetTimePopup: false,
                            isShowTaskColorPallet: false,
                            isShowToSetTimePopup: false,
                            isRelatedDropOpen: false,
                            isSelectLinkToExist: false,
                          })
                        }} alt='AddMultipleTag' />
                      </div>
                    </div>
                    <div className={`tag-dropdown-menu-container ${this.state.isShowTagsDrop ? 'dropdown-z-index tag-open-dropdown' : 'dropdown-z-index close-dropdown'}`} >
                      <Scrollbars className="custom-scroll" style={{ height: 115 }}>
                        {this.state.tags != null || this.state.tags != undefined ?
                          this.state.tags.map((icon, index) =>
                            <StyledMenuItem className="customized-ticket-source" onClose={this.handleClose}>
                              <div className="create-ticket-one-tag d-flex">
                                <div className="create-ticket-tag-img-text d-flex" onClick={()=> this.checkedTags(icon)} >
                                  <div className="create-ticket-tag-check">
                                    <Checkbox
                                      className="create-ticket-tags-chck"
                                      name="checkedTagsArray"
                                      value={this.state.checkedTagsArray}
                                      color="primary"
                                      checked={this.state.checkedTagsArray.includes(icon)}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        this.checkedTags(icon)
                                      }
                                      }
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
                      <div className="create-ticket-search-tag d-flex">
                        <InputBase
                          placeholder="Enter tag name"
                          className="search-input"
                          inputProps={{ 'aria-label': 'search' }}
                        />
                        <img src={SearchTagAdd} alt=""></img>
                      </div>
                      <div className="create-task-drawer-color-picker d-flex">
                        {/* <img src={ClrPckrTray} alt="" onClick={this.showColorPalletPopup}></img> */}
                        <img src={ClrPckrTray} alt="" onClick={(e) => {
                          e.stopPropagation()
                          this.setState({
                            isShowTagsDrop: false,
                            isQuickCreateDropdown: false,
                            isShowAssignToDrop: false,
                            isShowDontRepeat: false,
                            isShowColorPallet: !this.state.isShowColorPallet, isShowTagsDrop: true,
                            isShowFromSetTimePopup: false,
                            isShowTaskColorPallet: false,
                            isShowToSetTimePopup: false,
                            isRelatedDropOpen: false,
                            isSelectLinkToExist: false,
                          })
                        }}></img>
                        {this.state.isShowColorPallet ? this.colorPalletPopup() : null}
                        <div className="task-circle-color-picker">
                          {/* <CirclePicker/> */}
                          <CirclePicker colors={color} circleSize={18} circleSpacing={12} onChangeComplete={this.handleChangeComplete} />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className='flex-container'>
      <div className='tags-dropdown-container'>
          <div className='CT-tags-non-library-dropdown'>
            <img id='tags-image' src={tagsIcon} alt='tagsIcon'/>
            <div className='CT-selected-tags-container'>
            {this.state.DoesNotRepeat ? 'Assign To':  
                this.state.selectedTags.map( tag => 
                  <div className='CT-selected-item-template'  style={{ background: '#b4e0ff' }}>
                    <span>{tag.title}</span>
                    <img id='remove-img' src={decrementIcon} alt='decrementIcon' />
                  </div>
                )
            }
            </div>
            <img id='add-new-icon' src={addNewIcon} alt='dropdownIcon' onClick={()=> this.setState({ isShowTagsDrop: true })}/>
          </div>

          <div className={`tags-custome-dropdown-menu-container ${this.state.isShowTagsDrop ? 'tags-custome-open-dropdown zIndex' : 'tags-custome-close-dropdown'}`} ref={this.setWrapperRef} >
            <div className='tags-list-container'>
              {tagsData.map(tag => {
                return (
                  <div className='tags-item'>
                      <Checkbox className='tags-item-checkbox' name='assignToChecked' checked={this.state.assignToChecked} onChange={this.checkBoxHandler} value="checkedA" />
                      <span>{tag.title}</span> 
                      <span className='tags-color-holder'></span>
                  </div>
                )
              })}
            </div>
              <hr/>
              <div className='tag-name-adder'>
                <TextField
                  className={''}
                  margin="normal"
                  placeholder='Enter tag name '
                />
              </div>
          </div>
        </div> 
    </div> */}



              {/*****************************************Priotiy and Tags drop down****************************************** */}




              {/*****************************************Link to Section****************************************** */}
              <div className='ct-flex-container leftdfullsection'>
                <div className='link-to-exist-dropdown-container'>
                  <div className={`LTE-non-library-dropdown 
                  ${this.state.isSelectLinkToExist ? 'field-z-index' : null}
                  ${this.state.linkedTo == '' && this.state.isMandatoryFieldsMissing ? 'errorInputNotify' : null}
                  `} onClick={(e) => {
                    e.stopPropagation()
                    this.setState({
                      isSelectLinkToExist: !this.state.isSelectLinkToExist, isRelatedDropOpen: false,
                      isQuickCreateDropdown: false,
                      isShowAssignToDrop: false,
                      isShowDontRepeat: false,
                      isShowColorPallet: false,
                      isShowFromSetTimePopup: false,
                      isShowTagsDrop: false,
                      isShowTaskColorPallet: false,
                      isShowToSetTimePopup: false,
                      isPriorityDropdown: false,
                    })
                  }}>
                    <div className='LTE-selected-item-container'>
                      <div className='link-to-selected-template'>
                        <img src={ 
                          this.state.linkedTo.title == 'Tasks' ? linkToTaskIcon   
                          : this.state.linkedTo.title == 'Projects' ? linkToProjectIcon 
                          : this.state.linkedTo.title == 'Tickets' ? linkToTicketIcon 
                          : this.state.linkedTo.title == 'Objectives' ? linkToObjectiveIcon 
                          :
                          selectLinkToIcon } 
                          alt='selectLinkToIcon' />
                        {this.state.linkedTo.title != null ? <span>{this.state.linkedTo.title}</span> : <span>Select link to existing</span>}
                      </div>
                    </div><img className='LTE-drop-toggler' src={dropdownIcon} alt='dropdownIcon' onClick={(e) => {
                      e.stopPropagation()
                      this.setState({
                        isSelectLinkToExist: !this.state.isSelectLinkToExist,
                        isRelatedDropOpen: false,
                        isQuickCreateDropdown: false,
                        isShowAssignToDrop: false,
                        isShowDontRepeat: false,
                        isShowColorPallet: false,
                        isShowFromSetTimePopup: false,
                        isShowTagsDrop: false,
                        isShowTaskColorPallet: false,
                        isShowToSetTimePopup: false,
                        isPriorityDropdown: false,
                      })
                    }} />
                  </div>

                  <div className={`LTE-custome-dropdown-menu-container ${this.state.isSelectLinkToExist ? 'dropdown-z-index LTE-custome-open-dropdown ' : 'LTE-custome-close-dropdown'}`} ref={this.setWrapperRef} >
                    <div className='LTE-list-container'>
                      {selectLinkToExisting.map(linkTo => {
                        return (
                          <div className='LTE-item'>
                            <div className='LTE-item-avatar' onClick={() => {this.checkBoxLinkTo(linkTo)}}>
                              <img className='link-to-icon' src={linkTo.icon} alt='profileIcon' />
                              <span>{linkTo.title}</span>
                              <Checkbox className='LTE-item-checkbox' value={linkTo} name='linkedTo' checked={this.state.linkedTo.id == linkTo.id ? true : false} onClick={() => {
                                this.checkBoxLinkTo(linkTo)
                              }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className='link-to-record-dropdown-container'>
                  <div className={`LTR-non-library-dropdown 
                  ${this.state.isRelatedDropOpen ? 'field-z-index' : null}
                  ${this.state.relatedSelect == '' && this.state.isMandatoryFieldsMissing ? 'errorInputNotify' : null}
                  
                  `} onClick={(e) => {
                    e.stopPropagation();
                    this.setState({
                      isRelatedDropOpen: !this.state.isRelatedDropOpen, isSelectLinkToExist: false,
                      isQuickCreateDropdown: false,
                      isShowAssignToDrop: false,
                      isShowDontRepeat: false,
                      isShowColorPallet: false,
                      isShowFromSetTimePopup: false,
                      isShowTagsDrop: false,
                      isShowTaskColorPallet: false,
                      isShowToSetTimePopup: false,
                      isPriorityDropdown: false,
                    })
                  }}>
                    <div className='LTR-selected-item-container'>
                        <img src={linkToRelatedIcon} alt='selectLinkToIcon' />
                      <div className='link-to-related-selected-template'>
                        {
                          this.state.relatedSelect != "" ?
                            <span>{`${this.state.relatedSelect}`} </span>
                            : <span className="link-content">Link to <span>{this.state.linkedTo.id == 0 ? '<Related Tasks>'
                              : this.state.linkedTo.id == 1 ? '<Related Projects>' : this.state.linkedTo.id == 2 ? '<Related Tickets>' :
                                this.state.linkedTo.id == 3 ? '<Related Objectives>' : '<Related Record>'}
                            </span> </span>
                        }
                      </div>
                    </div><img className='LTR-drop-toggler' src={dropdownIcon} alt='dropdownIcon' onClick={(e) => {
                      e.stopPropagation();
                      this.setState({
                        isRelatedDropOpen: !this.state.isRelatedDropOpen, isSelectLinkToExist: false,
                        isQuickCreateDropdown: false,
                        isShowAssignToDrop: false,
                        isShowDontRepeat: false,
                        isShowColorPallet: false,
                        isShowFromSetTimePopup: false,
                        isShowTagsDrop: false,
                        isShowTaskColorPallet: false,
                        isShowToSetTimePopup: false,
                        isPriorityDropdown: false,
                      })
                    }} />
                  </div>

                  <div className={`LTR-custome-dropdown-menu-container ${this.state.isRelatedDropOpen ? 'dropdown-z-index LTR-custome-open-dropdown ' : 'LTR-custome-close-dropdown'}`} ref={this.setWrapperRef} >
                    <div className='LTR-list-container'>
                      {linkRelatedRecords.map(linkTo => {
                        return (
                          <div className='LTR-item' onClick={ () => this.checkBoxRelatedTo(linkTo) }>
                            <div className='LTR-item-avatar' >
                              {/* <img className='link-to-icon' src={linkTo.icon} alt='profileIcon'/> */}
                              <span>{linkTo.title}</span>
                              <Checkbox checked={ this.state.listOfRelatedTo.includes(linkTo) } className='LTR-item-checkbox' name='assignToChecked' onChange={() => this.checkBoxRelatedTo(linkTo)} value={linkTo} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/*****************************************Link to Section****************************************** */}

            </div>
            <div className='create-task-sub-section'>
            <div className="create-task-sub-section-one">
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
                  <Checkbox className='share-through-email-checkbox' checked={this.state.isShareThroughEmail} onChange={() => this.setState({ isShareThroughEmail: !this.state.isShareThroughEmail })} value="" />
                  <span className="send-copy-text">Send a copy</span>
                </div>

                {
                  this.state.isShareThroughEmail ? (
                    <div className="createTaskEmailDrawer">
                    <div className='menu-container'>
                      <div className='create-ticket-email' onClick={this.showEmailDropdown}>
                          <img src={emailIcon} alt="emailIcon"></img>
                        <div className={`${this.state.checkboxCopy == false ? 'disabled' : ''} selected-item-container`}>
                          {
                            this.state.emailListToShare.length > 0 ? this.state.emailListToShare.map(email => (
                              <div className='CT-selected-item-template'>
                                <img id='avathar-img' src={profileIcon} alt='profileIcon' />
                                <span>{email.firstName} {email.lastName}</span>
                                <img id='remove-img' src={decrementIcon} alt='decrementIcon' onClick={e => { this.elementPopHandler(this.state.emailListToShare, email) }} />
                              </div>
                            )) : <p className="eml-text">Enter email</p>
                          }
                        </div>
                        <div className="email-drp-dwn-img">
                          <img src={DrpDwnIcn}  />
                        </div>
                      </div>
                      <div className={`dropdown-menu-container ${this.state.isEmailDropdown ? 'open-dropdown' : 'close-dropdown'}`}>
                        <Scrollbars className="emailListCustomScroll" style={{ height: 155 }}>
                          {this.state.users ? this.state.users.map((user, index) =>
                            <StyledMenuItem className="customized-ticket-source"   onClose={this.handleClose} >
                              <div className="create-ticket-one-email d-flex" onClick={(e)=> this.handleChangeShare(e, user)}>
                                  <img src={profileIcon} alt='profileIcon' />
                                <div className="create-ticket-email-img-text d-flex">
                                  <p>{user.firstName || user.lastName ? user.firstName+' '+user.lastName : 'No email-id'}</p>
                                </div>
    
                                <Checkbox className='emailSelectCheckBox' checked={this.state.emailListToShare.includes(user)}  onClick={(e)=> this.handleChangeShare(e, user)} value="" />
                              </div>
                            </StyledMenuItem>
                          ) : null}
                        </Scrollbars>
                      </div>
                    </div>
                  </div>
                  ) : null
                }





                {/* <FormControl disabled={this.state.isShareThroughEmail ? false : true} variant="outlined" className='create-habit-customised-dropdown-menu'>
                  <InputLabel htmlFor="name-disabled">Enter email</InputLabel>
                  <div className=''>
                    <img src={emailIcon} alt='emailIcon' />
                    <Select value={this.state.shareMail} onChange={this.handleChangeShare} inputProps={{}}>
                      {this.state.users != null || this.state.users != undefined ?
                        this.state.users.map(user => {
                          return <MenuItem value={user.id}>{user.firstName} {user.lastName}</MenuItem>
                        }) : null
                      }
                    </Select>
                  </div>
                </FormControl> */}
              </div>
              <div className='create-task-attachment'>
                <span>Attachments</span>
                <div className={`CT-attached-files-container ${!this.state.attachedFiles ? 'align-center' : 'space-equaly '}`}>
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
                  <div className={`create-ticket-file-upload-field ${ this.state.attachedFiles.length === 0 ? 'preButtonStyle' : 'postButtonStyle' } `} >
                      <Button className='create-ticket-file-attach-button'>
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
          </div>
          </div>


          {/* <div className='create-task-footer-section'>
            <div className="crt-tsk-sv-chck-bx">
              <Checkbox className='Save-as-an-Idea-checkbox' checked={this.state.saveTemplate} onChange={this.checkBoxHandlerTemplate} value={this.state.saveTemplate} />
              <span className="ctr-tsk-text">Save as an Idea for future use</span>
            </div>
            <div className="crt-tsk-sbmt-btn">
              <Button variant="contained" className="ch-submit-button" onClick={this.submitTask}>
                {!this.state.isSpinnerLoading ? 'Submit' : <img src={loadingSpinner} alt='loadingSpinner' /> }
              </Button>
            </div>
            </div> */}
          </div>
        </div>
        </div>

  )

  render() {
    return (
      <Drawer onClick={this.closeCompanyDrawer} anchor="right" open={this.props.isCTaskDrawerOpen} className='create-ticket-drawer'>
        {this.sideList('right')}
      </Drawer>
    )
  }
}

export default CreateTaskDrawer;
