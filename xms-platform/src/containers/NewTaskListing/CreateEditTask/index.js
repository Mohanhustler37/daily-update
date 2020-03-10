import React from 'react'
import './theme.scss';
import CompanyDetails from '../../../components/CompanyDetails/CompanyDetails';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { CirclePicker, TwitterPicker } from 'react-color'
import { withStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars'; 
import dropdownIcon from '../../../assets/icons/01-10-2019/Icon ionic-md-arrow-dropdown.svg'
import colorPallet from '../../../assets/create-habit/Icon material-color-lens.svg'
import closeCreateHabitIcon from '../../../assets/create-habit/Icon ionic-ios-close.svg'
import emailIcon from '../../../assets/icons/01-10-2019/Icon feather-mail.svg'
import profileIcon from '../../../assets/profile.png'
import assignToProfileIcon from '../../../assets/icons/SVG/Icon-awesome-user-circle.svg'
import decrementIcon from '../../../assets/icons/SVG/Group 11399.svg'
import estimatedTimeIcon from '../../../assets/icons/SVG/Icon material-access-time.svg'
import addNewIcon from '../../../assets/icons/SVG/Group 11382.svg';
import InputBase from '@material-ui/core/InputBase';
import SearchTagAdd from "../../../assets/icons/create-ticket/Group 11349.svg";
import ClrPckrTray from "../../../assets/icons/create-ticket/Icon ionic-ios-color-palette.svg";
import LowIcon from "../../../assets/icons/create-ticket/Rectangle 261.svg";
import HighIcon from "../../../assets/icons/create-ticket/Rectangle 242.svg";
import CriticalIcon from "../../../assets/icons/create-ticket/Rectangle 643.svg";
import DrpDwnIcn from "../../../assets/icons/create-ticket/Icon ionic-md-arrow-dropdown.svg";
import Radio from '@material-ui/core/Radio';
import MediumIcon from "../../../assets/icons/create-ticket/Path 887.svg";
import linkToTaskIcon from '../../../assets/icons/SVG/Group11262.svg'
import linkToProjectIcon from '../../../assets/icons/SVG/Group-11374.svg'
import linkToTicketIcon from '../../../assets/icons/SVG/Group-11260.svg'
import linkToObjectiveIcon from '../../../assets/icons/SVG/Icon-feather-target.svg'
import selectLinkToIcon from '../../../assets/icons/SVG/Icon-feather-link.svg'
import linkToRelatedIcon from '../../../assets/icons/SVG/Icon-ionic-ios-options.svg'
import DropDwnIcon from "../../../assets/icons/SVG/Group-11332.svg";
import SearchIcon from '@material-ui/icons/Search';
import CompanyLogo from "../../../assets/icons/task/company_logo.svg";
import { baseUrl } from "../../../constants";
import tagsIcon from '../../../assets/icons/SVG/Icon awesome-tags.svg'
import priorityIcon from '../../../assets/icons/SVG/Icon-awesome-exclamation-circle.svg'
import EditCompanyDetails from '../../../components/TicketingSystem/CreateTicket/EditCompanyDetails/EditCompanyDetails';
import removeAttachedFile from '../../../assets/icons/create-ticket/Group 11407.svg'
import dpfIcon from '../../../assets/icons/SVG/337946.png'
import removeIcon from '../../../assets/icons/SVG/Group-11399 (1).svg';
import 'date-fns';
import loadingSpinner from '../../../assets/icons/SVG/loadingSpinner.gif';
import materialDescription from '../../../assets/icons/SVG/Icon material-description.svg';
import Dropdown from '../../../components/Dropdown';
import AssignToAvathar from '../../../components/AssignToAvathar';
import ProfileItemWithCheckBox from '../../../components/ProfileItemWithCheckBox';
import ProfileItemWithRadio from '../../../components/ProfileItemWithRadio';
import { utils } from '../../../utilFunctions/utils';
import FooterButton from '../../../components/FooterButtonWithCheckBox';
import dropdownStyles from './dropdownStyles';


import priorityColor1 from '../../../assets/icons/SVG/Rectangle-261.svg'
import { getAllCompanies } from "../../../graphQl/companyDetailQueries";
import { 
  updateTaskData, 
  getAllTeams,
  getAllTask,
  getAllProjects,
  getAllPriorities,
} from "../../../components/TicketingSystem/TasksList/EditTaskDrawer/editTaskQueries";
import {
  getTodayData,
  getTomorrowData,
  getBacklogData,
  getUserById,
  getAllTasks,
  getAllProj,
  getAllTickets,
  getAllObjectives,
} from "../../NewTaskListing/NewTaskListingQuery"
import { getAllTaskTemplates, addTask,
  searchTemplateMutation, } from "../../CreateTaskDrawer/CreateTaskDrawerQueries"

import { 
  getTeams,
  getCompanyById,
  getDepartments,
  getTags,
  getAllUsers,
} from "../../../components/CreateHabitDrawer/createHabitQuery"

import { getLogedUser } from "../../TicketTable/TicketTableQueries"
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from "apollo-boost";
// import { getAllPriorities } from '../../../components/TicketingSystem/TasksList/EditTaskDrawer/editTaskQueries';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  uri: baseUrl.server,
});

const fileIcons = [{ pdf: dpfIcon }]
const imageFormats = ['jpg', 'jpeg', 'jpg', 'bmp', 'png', 'svg'];
const fileFormats = ['doc', 'docx', 'odt', 'txt', 'pdf', 'ppt', 'pptx'];
const taskFrequency = [
  {id: 0, value: 'Daily'},
  {id: 1, value: 'Weekly'},
  {id: 2, value: 'Monthly'},
  {id: 3, value: 'Custom'},

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
      taskTitle: this.props.dataToBeEdit ? this.props.dataToBeEdit.taskTitle : '',
      usersList: [],
      fromDate: new Date(),
      toDate: new Date(),
      fromTime: moment(new Date()).format('LT'),
      toTime: moment(new Date()).format('LT'),
      assignToSelection: [],
      estimatedTime: this.props.dataToBeEdit ? this.props.dataToBeEdit.taskHours : '',
      taskDescription: this.props.dataToBeEdit ? this.props.dataToBeEdit.taskDescription : '',
      priorities: [],
      selectedPriority: this.props.dataToBeEdit ? this.props.dataToBeEdit.priority : '',
      DoesNotRepeat: '',
      tags: [],
      selectedTags: this.props.dataToBeEdit ? this.props.dataToBeEdit.tags : [],
      selectedListOfRelatedTo: [],
      emailListToShare: [],
      attachedFiles: [],
      isAllDay: false,
      selectedLinkedToExist: '',
      linkToExistSelection: [],
      isShowColorPallet: false,
      isShowTaskColorPallet: false,
      isShowFromSetTimePopup: false,
      isShowToSetTimePopup: false,
      isShareThroughEmail: false,
      taskFrequency:'',
      // relatedTo: 
      isShowDontRepeat: false,
      isShowAssignToDrop: false,
      isShowTagsDrop: false,
      isSelectLinkToExist: false,
      isRelatedDropOpen: false,
      isPriorityDropdown: false,
      tagsToBeUpdated: [],

      selectedPeople: [],

      buildQuitBtnId: 1,
      goalPeriodBtnId: 4,
      weekDaysBtnId: 3,
      selectedDate: '',
      
      taskTitleColor: '',
      setTimeBtnId: null,
      setTimeBtns: [],
      weekDaysBtns: weekDaysBtns,

      count: 1,
      setTime: [],
      location: "",
      
      tags1: [],
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

      tagsSelect: "",
 
      relatedSelect: "",
   
      selectedQuick: {},
      
      templatesData: [],

      isMandatoryFieldsMissing: false,
      isSpinnerLoading: false,
      

    }
  }
  
  componentDidMount() {
    const client = this.props.thisObj.props.client;
    this.fetchUsers()
    this.fetchPriorities();
    this.getAllCompaniesData();
    this.getAllTeamData();

    getLogedUser(client,parseInt(localStorage.getItem("id")),res=>{
      this.setState({ logedUser: res })
      this.fetchTeams(res.companyId, res.departmentId, res.tenantId);
      this.fetchcompany(res.companyId);
      this.fetchDepartment(res.departmentId);
      this.fetchTags(res.companyId);
      this.getTemplatesData(res.tenantId);
      return res;
    })
  }
  fetchUsers = (companyId) => {
    const client = this.props.thisObj.props.client;
    getAllUsers(client,res=>{
      let userAll = res.data.getAllUsers;
      let mapUser = '';
      if(this.props.dataToBeEdit.assignTo) {
        userAll.map(user => {
          if(user.id === this.props.dataToBeEdit.assignTo)
          //  mapUser = user
           this.setState({  assignToSelection: [user]  })
        })   
      }
        this.setState({ 
          usersList: userAll,
         
        });
    })
  };
  mapAssignTouser = userToBeMap => {
      this.state.usersList.map( user => {
        console.log('user_user_user00', user)
        if(user.id === userToBeMap)
          this.setState({ assignToSelection: [...this.state.assignToSelection, user] })
      })
  }

  getTemplatesData = async (id) => {
    const client = this.props.thisObj.props.client;

    getAllTaskTemplates(client,id,res=>{
      this.setState({ templatesData: res.data.taskTemplate })
      return res;
    })
  }

  getAllTeamData = async () => {
    const client = this.props.client;
    const result = await getAllTeams(client);
    if (result) {
        this.setState({ editTeamName: result })
    }
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
    this.setState({ selectedTags: this.array, tagsSelect: tagString })
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
    this.setState({ selectedListOfRelatedTo: this.arrayRelatedTo, relatedSelect: relatedSelect })
  }

  assignToCheck = (data) => {
    let temp = this.state.assignToSelection;
    if (temp.includes(data)) {
      let index = temp.indexOf(data)
      temp.splice(index, 1);
      this.setState({ assignToSelection: temp })
    } else {
      temp = [...temp, data]
      this.setState({ assignToSelection: temp })
    }
  }
  handleChangeShare = (e, user) => {
    let temp = this.state.emailListToShare;
    if (temp.includes(user)) {
      let index = temp.indexOf(user)
      temp.splice(index, 1);
      this.setState({ shareMail: e.target.value, isShareThroughEmail: true, emailListToShare: temp })
    } else {
      temp = [...temp, user]
      this.setState({ shareMail: e.target.value, isShareThroughEmail: true, emailListToShare: temp })
    }
  }
  getAllCompaniesData = async () => {
    const result = await getAllCompanies(this.props.client);
    if (result) {
        this.setState({ editCompanyName: result })
    }
  }
  checkBoxLinkTo = (data) => {
    if (data != this.state.selectedLinkedToExist) {
      this.setState({ selectedLinkedToExist: data, isSelectLinkToExist: false, isRelatedDropOpen: false, relatedSelect: "" })
    } else {
      this.setState({ selectedLinkedToExist: data, isSelectLinkToExist: false, isRelatedDropOpen: false })
    }
    if (data.id == 0) {
      this.fetchTasks()
    } else if (data.id == 1) { this.fetchProject() } else if (data.id == 2) { this.fetchTicket() } else if (data.id == 3) { this.fetchObjective() }

  }

  submitTask = async (e) => {
    // selectedTags :Array
    // taskFrequency:int
    // fromDate:date String
    // fromTime : String
    // toDate:date string
    // toTime : string    
    // taskTitle : String
    // habitColor : String
    // isAllDay : Boolean
    // isShareThroughEmail
    // selectedLinkedToExist : {title}
    // listTorelatedTo:array
    // logedUser : {}
    // selectedCompany : {}
    // selectedDepartment : {}
    // selectedPriority : {}
    // selectedProject : {}
    // selectedTeam : {}
    // shareMail : string

    if (this.state.assignToSelection.length > 0)
    var assignTo = this.state.assignToSelection.map((usr, index) => {
      return usr.id;
    })
    var tagsId = []
    if (this.state.selectedTags != null || this.state.selectedTags.length != 0) {
      tagsId = this.state.selectedTags.map(tag => {
        return tag.id;
      })
    }
    var relatedTypes = []
    if (this.state.selectedListOfRelatedTo.length > 0) {
      relatedTypes = this.state.selectedListOfRelatedTo.map(obj => {
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
      departmentId: this.state.selectedDepartment ? this.state.selectedDepartment.id : null,
      teamId: this.state.selectedTeam ? this.state.selectedTeam.id : null,
      sendCopyTo: this.state.isShareThroughEmail ? sendCopyEmail[0] : null,
      taskDescription: this.state.taskDescription,
      priority: this.state.selectedPriority.id,
      relatedTo: this.state.selectedLinkedToExist.id,
      linkWithTicket: this.state.selectedLinkedToExist.id == 2 ? relatedTypes[0] : null,
      linkWithProject: this.state.selectedLinkedToExist.id == 1 ? relatedTypes[0] : null,
      linkWithTask: this.state.selectedLinkedToExist.id == 0 ? relatedTypes[0] : null,
      linkWithObjective: this.state.selectedLinkedToExist.id == 3 ? relatedTypes[0] : null,
      tags: tagsId,
      taskHours: this.state.estimatedTime,
      createdBy: this.state.logedUser.id,
      saveTemplate: this.state.saveTemplate,
      billable:true
    }
    e.preventDefault();
    const client = this.props.thisObj.props.client;
    if(this.state.taskTitle && assignTo && this.state.estimatedTime && this.state.selectedPriority && tagsId && this.state.selectedLinkedToExist && relatedTypes) {
      this.setState({ isSpinnerLoading: true })
    addTask(client, variables, res=>{
      getTomorrowData(
        client, 1, tomorrowData => {
            return this.props.thisObj.setState({ tomorrowData: tomorrowData.data.getTomorrowTasks });
        }
      );
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


  updateTask = async (e) => {
    // const client = this.props.client;
    // if (this.state.assignToSelection.length > 0) {
    //     var assignTo = this.state.assignToSelection.map((usr, index) => {
    //         return usr.id;
    //     })
    // }

    // var relatedTypes = []
    // if (this.state.selectedListOfRelatedTo.length > 0) {
    //     relatedTypes = this.state.selectedListOfRelatedTo.map(obj => {
    //         return obj.id
    //     })
    // }
    const data = {
        id: this.props.dataToBeEdit.id,
        taskTitle: this.state.taskTitle,
        assignTo: this.state.assignToSelection[0],
        taskHours: this.state.estimatedTime,
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        taskDescription: this.state.taskDescription,
        priorityId: this.state.selectedPriority.id,
        tags: this.state.tagsToBeUpdated,
        sendCopyTo: this.state.emailListToShare.length !==0 ? this.state.emailListToShare[0].id : '',

        relatedTo: this.state.selectedLinkedToExist.id ? this.state.selectedLinkedToExist.id : this.props.dataToBeEdit.relatedTo,
        // linkWithTicket: this.state.selectedLinkedToExist.id == 2 ? relatedTypes[0] : this.props.dataToBeEdit.linkWithTicket,
        // linkWithProject: this.state.selectedLinkedToExist.id == 1 ? relatedTypes[0] : this.props.dataToBeEdit.linkWithProject,
        // linkWithTask: this.state.selectedLinkedToExist.id == 0 ? relatedTypes[0] : this.props.dataToBeEdit.linkWithTask,
        // linkWithObjective: this.state.selectedLinkedToExist.id == 3 ? relatedTypes[0] : this.props.dataToBeEdit.linkWithObjective,

        companyDataId: this.state.selectedCompany ? this.state.selectedCompany.id : this.props.dataToBeEdit.companyId,
        departmentDataId: this.state.departmentDataId ? this.state.departmentDataId : this.props.dataToBeEdit.departmentDataId,
        teamDataId: this.state.teamDataId ? this.state.teamsData : this.props.dataToBeEdit.teamDataId,
        projectDataId: this.state.projectDataId ? this.state.projectDataId : this.props.dataToBeEdit.projectId
    }
    console.log('Update_Task_data', data)
    if(
        !data.taskTitle ||
        data.estimatedTime === '' ||
        data.taskDescription === '' ||
        !data.relatedTo ||
        // !this.state.relatedSelect ||
        !data.priorityId ||
        !data.tags 
    ){
        alert('fill all fields')
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
      let mapPriority = ''
      if(this.props.dataToBeEdit.priority) {
        priorities.map(item => {
          if(item.id === this.props.dataToBeEdit.priority)
            mapPriority = item
        })
      }
        this.setState({ 
          priorities : priorities,
          selectedPriority: mapPriority 
        });
    })
  };

  fetchcompany = (companyId) => {
    const client = this.props.thisObj.props.client;
    getCompanyById(client,res=>{
      let company = res.data.getAllCompany;
        if (company != null || company != undefined) {
          company.map(cmp => {
            if (companyId == cmp.id) {
              console.log('selectedCompany_selectedCompany', cmp)
              this.setState({ selectedCompany: cmp });
            }
          });
        }
        this.setState({ company: company });
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
    let mapTags = [];
    getTags(client,companyId,res=>{
      if(this.props.dataToBeEdit){
        res.data.allTags.map( item => {
          this.props.dataToBeEdit.tags.map(propTag => {
            if(propTag === item.id) {
              mapTags = [ ...mapTags, propTag ]
            }
          })
        })
      }
      this.setState({ 
        tags: res.data.allTags, 
        selectedTags: mapTags
      });
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
      this.setState({isShowColorPallet: false})
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
  closeDrawerHandler = () => this.props.thisObj.setState({ isCreateEditTaskDrawerOpen: false });
  buildQuitBtnClickHandler = button => this.setState({ buildQuitBtnId: button.btnId });
  goalPeriodBtnClickHandler = button => this.setState({ goalPeriodBtnId: button.btnId });
  handleDateChange = date => this.setState({ selectedDate: date });
  showTaskColorPalletPopup = (e) => {
    e.stopPropagation()
    this.setState({ isShowTaskColorPallet: !this.state.isShowTaskColorPallet });
  }
  showSetTimePopup = (id) => this.setState({ isShowSetTimePopup: !this.state.isShowSetTimePopup, setTimeBtnId: id });
  handleChangeComplete = (color, event) => {
    this.setState({ taskTitleColor: color.hex, isShowTaskColorPallet: !this.state.isShowTaskColorPallet })
  };
  weekDaysBtnClickHandler = button => {
    let tempWeekDaysBtns = this.state.weekDaysBtns;
    tempWeekDaysBtns[button.btnId].isActive = !tempWeekDaysBtns[button.btnId].isActive
    this.setState({ weekDaysBtnId: button.btnId, frequency: tempWeekDaysBtns });
  }
  priorityHandleClick = (selectedObject) => {
    this.setState({ selectedPriority: selectedObject, isPriorityDropdown: !this.state.isPriorityDropdown });
  }
  peopleHandleClickfunction = (e, index, name) => {
    this.setState({ [e.target.name]: index });
    if (this.state.selectedPeople.includes(name)) { } else {
      this.state.selectedPeople.push(name)
      this.state.selectedItems.push(name)
    }
  }

  taskFrequencyHandler = (taskFreq) => {
    this.setState({ taskFrequency: taskFreq })
  }
  onChangeEstimateTime =e=> this.setState({ [e.target.name]: e.target.value })

  quickHandleClick = (selectedObject) => {
    this.setState({
      selectedQuick: selectedObject, taskTitle: `${selectedObject.taskPrefix}-${selectedObject.templateName}`,
      taskDesc: selectedObject.taskDescription, isQuickCreateDropdown: !this.state.isQuickCreateDropdown,
      quickTemplate: selectedObject.templateName
    })
  }

  taskColorPalletPopup = () => (
    <div className='color-pallet-popup' ref={this.setWrapperRef}>
      <span>Color palette</span>
      <TwitterPicker colors={colors} onClick={() => this.setState({
        isShowTaskColorPallet: !this.state.isShowTaskColorPallet,
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
        utils.imageToBase64Converter(event.target.files[i], result => {
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
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  onChangeTaskDesc = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  sideList = () => (
    <div className="crt-tsk-drwr-section">
      {this.state.isEditCompDtlsOpen ? <EditCompanyDetails isEditCompDtlsOpen={this.state.isEditCompDtlsOpen} allState={this.state} thisObj={this} /> : null}
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
                  <p className="pclasstask">{this.props.dataToBeEdit ? 'EDIT TASK' : 'Create Task'}</p>
                  <p>Lorem ipsum is simply dummy text of the printing and <br></br>typesetting industry</p>
                </div>

                {
                  !this.props.dataToBeEdit ? 
                  <Dropdown 
                    toggleIcon={DropDwnIcon} 
                    styles={dropdownStyles.quickCreateDropdown} 
                    selected={this.state.quickTemplate ? this.state.quickTemplate : 'Quick create using template' }
                    >
                    <div className='quickCreateDropdownBody'>
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
                      {this.state.templatesData != null || this.state.templatesData != undefined ?
                        this.state.templatesData.map(icon =>
                          <StyledMenuItem className="customized-ticket-list" onClick={() => this.quickHandleClick(icon)} onClose={this.handleClose}>
                            <div className="quick-create-ticket-one d-flex">
                              <p>{icon.templateName}</p>
                            </div>

                          </StyledMenuItem>
                        ) : null
                      }
                    </div>
                  </Dropdown>
                  : <></>
                }
              </div>

              <div className={`create-task-title-container ${this.state.taskTitle == '' && this.state.isMandatoryFieldsMissing ? 'error-title-input-field' : ''} `}>
                <>
                  <TextField
                    id="standard-basic"
                    className={''}
                    name='taskTitle'
                    inputProps={{ style: { color: `${this.state.taskTitleColor}`}}}
                    value={this.state.taskTitle}
                    margin="normal"
                    placeholder='Task title'
                    onChange={this.onChangeHandler}
                  />
                  {/* <label className="star-img">*</label> */}
                  <div className='color-pallet-container'>
                    <img src={colorPallet} alt='colorPallet' className='colorPallet' onClick={this.showTaskColorPalletPopup} />
                    {this.state.isShowTaskColorPallet ? this.taskColorPalletPopup() : null}
                  </div>
                </>
              </div>

              <div className='task-date-time-container'>
                <div className='task-date-time'>
                  <div id='task-datepicket-btn'>
                    { console.log('this.state.fromDate_this.state.fromDate', this.state.fromDate) }
                    <Button variant="contained" className={`CT-custome-button CT-for-date`} onClick={'onClick'}>{this.state.fromDate ? '' : 'From Date'}</Button>
                    <DatePicker dateFormat="dd/MM/yyyy" value={this.state.fromDate} showYearDropdown yearDropdownItemNumber={15} onChange={(date) => this.dateChangeHandler(date, 'fromDate')}  clearIcon={null} />
                  </div>
                  {
                    !this.state.isAllDay ?
                      (
                        <div className='CT-time-setter'>
                          <Button autoOk label="12 hours" variant="contained" className={`CT-custome-button CT-time-btn ${this.state.fromTime == '' && this.state.isMandatoryFieldsMissing ? 'errorInputNotify' : null}`} onClick={(e) => {
                            e.stopPropagation()
                            this.setState({isShowFromSetTimePopup: !this.state.isShowFromSetTimePopup})
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
                    <Button variant="contained" className={'CT-custome-button CT-for-date'} onClick={'onClick'}>{this.state.toDate ? '' : 'To Date'}</Button>
                    <DatePicker dateFormat="dd/MM/yyyy" onChange={(date) => this.dateChangeHandler(date, 'toDate')} value={this.state.toDate} clearIcon={null} />
                  </div>
                  {
                    !this.state.isAllDay ?
                      (
                        <div className='CT-time-setter'>
                          <Button variant="contained" className={ `CT-custome-button CT-time-btn ${this.state.fromTime == '' && this.state.isMandatoryFieldsMissing ? 'errorInputNotify' : null}`} onClick={(e) => {
                            e.stopPropagation()
                            this.setState({
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

                <Dropdown 
                  dropdownIcon={''}
                  styles={dropdownStyles.dontRepeatDropdown}
                  toggleIcon={dropdownIcon} 
                  selected={this.state.taskFrequency !== '' ? this.state.taskFrequency.value : 'Do not repeat'} 
                >{
                  taskFrequency.map(item => { return <label onClick={() => this.taskFrequencyHandler(item)}>{item.value}</label>})
                  
                }</Dropdown>
              </div>
              <div className='ct-flex-container leftdfullsection' >
                <Dropdown 
                  dropdownIcon={assignToProfileIcon}
                  styles={dropdownStyles.assignToDropdown}
                  toggleIcon={dropdownIcon}
                  openDown={true} 
                  selected={this.state.assignToSelection.length === 0 ? 'Assign to' : this.state.assignToSelection.map(item => (
                    <AssignToAvathar profileIcon={profileIcon} firstName={item.firstName} lastName={item.lastName} 
                      onClick={() => this.assignToCheck(item)}
                    />
                  ))} 
                >
                  {
                    this.state.usersList ?this.state.usersList.map(assignTo => {
                      return (
                        <ProfileItemWithCheckBox 
                          profileIcon={profileIcon} 
                          firstName={assignTo.firstName}
                          lastName={assignTo.lastName}    
                          onClick={() => this.assignToCheck(assignTo)}
                          onChange={() => this.assignToCheck(assignTo)}
                          checked={this.state.assignToSelection.includes(assignTo)}
                        /> 
                      )
                    }) : null
                  }
                </Dropdown>
                <div className={`CT-estimated-time ${this.state.estimatedTime == '' && this.state.isMandatoryFieldsMissing ? 'errorInputNotify' : ''}`  } >
                  <img id='estimatedTimeIcon' src={estimatedTimeIcon} alt='estimatedTimeIcon' />
                  <TextField
                    className={''}
                    name="estimatedTime"
                    label="Estimated time (HH:MM)"
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChangeEstimateTime}
                  />
                </div>
              </div>

              <div className='CT-text-area'>
                <img src={materialDescription} alt="edit"></img>
                <TextareaAutosize className={`notes-text-area ${this.state.taskDescription == '' && this.state.isMandatoryFieldsMissing ? 'errorInputNotify' : ''}`}  placeholder="Task description" name="taskDescription" value={this.state.taskDescription} onChange={this.onChangeHandler} />
              </div>
              <div className='ct-flex-container leftdfullsection'>
                <Dropdown 
                  dropdownIcon={priorityIcon}
                  styles={dropdownStyles.priorityDropdown}
                  toggleIcon={dropdownIcon} 
                  selected={this.state.selectedPriority !== '' ? this.state.selectedPriority.priorityname : 'Priority'} 
                >{
                  this.state.priorities.map(item => {
                    return (
                      <ProfileItemWithRadio 
                        styles={dropdownStyles.priorityItemStyle}
                        profileIcon={priorityColor1} 
                        valueOne={item.priorityname}
                        onClick={() => this.priorityHandleClick(item)}
                        onChange={() => this.priorityHandleClick(item)}
                        checked={item.id === this.state.selectedPriority.id}
                      /> 
                    )
                  })
                }</Dropdown>
                <div className="CT-drawer-tags widthfifty">
                    <Dropdown 
                      dropdownIcon={tagsIcon}
                      styles={dropdownStyles.tagsDropdownStyles}
                      toggleIcon={addNewIcon} 
                      selected={this.state.selectedTags.length === 0 ? 'Tags' : this.state.selectedTags.map(tag => <p className={this.state.tagsSelect ? 'selectedTag' : null}>{tag.tagTitle} <img className='removeTagIcon' src={removeIcon} alt='' onClick={()=> utils.elementPopHandler(this.state.selectedTags, tag)}/></p>)} 
                    >{
                      <>
                      <div className='tagsListContainer'>
                        {
                          this.state.tags.map(item => {
                          return <ProfileItemWithCheckBox 
                            profileIcon={item.tagTitle == "Risk" ? MediumIcon : (item.tagTitle == "Completed") ? HighIcon : null}
                            firstName={item.tagTitle}
                            lastName={''}    
                            onClick={()=> this.checkedTags(item)}
                            onChange={()=> this.checkedTags(item)}
                            checked={this.state.selectedTags.includes(item)}
                          /> 
                          })
                        }
                      </div>
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
                        <img src={ClrPckrTray} alt="" />
                        {this.state.isShowColorPallet ? this.colorPalletPopup() : null}
                        <div className="task-circle-color-picker">
                          <CirclePicker colors={color} circleSize={18} circleSpacing={12} onChangeComplete={this.handleChangeComplete} />
                        </div>
                      </div>
                    </>
                    }</Dropdown>
                </div>
              </div>
              <div className='ct-flex-container leftdfullsection'>
                <Dropdown 
                  dropdownIcon={ this.state.selectedLinkedToExist.title == 'Tasks' ? linkToTaskIcon   
                  : this.state.selectedLinkedToExist.title == 'Projects' ? linkToProjectIcon 
                  : this.state.selectedLinkedToExist.title == 'Tickets' ? linkToTicketIcon 
                  : this.state.selectedLinkedToExist.title == 'Objectives' ? linkToObjectiveIcon 
                  : selectLinkToIcon}
                  styles={dropdownStyles.priorityDropdown}
                  toggleIcon={dropdownIcon} 
                  selected={this.state.selectedLinkedToExist.title ? this.state.selectedLinkedToExist.title : 'Select link to existing'} 
                >{
                  selectLinkToExisting.map(item => {
                    return (
                      <ProfileItemWithCheckBox 
                        profileIcon={item.icon} 
                        firstName={item.title}
                        lastName={item.lastName}    
                        onClick={() => {this.checkBoxLinkTo(item)}}
                        onChange={() => {this.checkBoxLinkTo(item)}}
                        checked={this.state.selectedListOfRelatedTo.includes(item)}
                      /> 
                    )
                  })
                }</Dropdown>
              <Dropdown 
                dropdownIcon={linkToRelatedIcon}
                styles={ dropdownStyles.priorityDropdown}
                toggleIcon={dropdownIcon} 
                selected={this.state.relatedSelect ? this.state.relatedSelect 
                  : <span className="link-content">Link to <span>{this.state.selectedLinkedToExist.id == 0 ? '<Related Tasks>'
                  : this.state.selectedLinkedToExist.id == 1 ? '<Related Projects>' : this.state.selectedLinkedToExist.id == 2 ? '<Related Tickets>' :
                    this.state.selectedLinkedToExist.id == 3 ? '<Related Objectives>' : '<Related Record>'}
                </span> </span>
                } 
              >{
                linkRelatedRecords.map(item => {
                  return (
                    <ProfileItemWithCheckBox 
                      profileIcon={item.icon} 
                      firstName={item.title}
                      lastName={item.lastName}    
                      onClick={() => this.checkBoxRelatedTo(item)}
                      onChange={() => this.checkBoxRelatedTo(item)}
                      checked={this.state.relatedSelect === item.title}
                    /> 
                  )
                })
              }</Dropdown>
              </div>
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
                    <Dropdown 
                      dropdownIcon={emailIcon}
                      styles={ dropdownStyles.shareEmailSelectionDropdown}
                      toggleIcon={dropdownIcon}
                      openDown={true} 
                      selected={this.state.emailListToShare.length === 0 ? 'Assign to' : this.state.emailListToShare.map(item => (
                        <AssignToAvathar profileIcon={profileIcon} firstName={item.firstName} lastName={item.lastName} 
                          onClick={()=> utils.elementPopHandler(this.state.emailListToShare, item)}
                          onClick={(e)=> this.handleChangeShare(e, item)}
                        />
                      ))} 
                    >
                        {
                          this.state.usersList ? this.state.usersList.map( user => {
                            return (
                              <ProfileItemWithCheckBox 
                                profileIcon={profileIcon} 
                                firstName={user.firstName}
                                lastName={user.lastName}    
                                onClick={(e)=> this.handleChangeShare(e, user)}
                                onChange={(e)=> this.handleChangeShare(e, user)}
                                checked={this.state.emailListToShare.includes(user)}
                              /> 
                            )
                          }) : null
                        }
                    </Dropdown>
                  ) : null
                }
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
          <div className='create-task-footer-section'>
            <div className="crt-tsk-sv-chck-bx">
              <Checkbox className='Save-as-an-Idea-checkbox' checked={this.state.saveTemplate} onChange={this.checkBoxHandlerTemplate} value={this.state.saveTemplate} />
              <span className="ctr-tsk-text">Save as an Idea for future use</span>
            </div>
            <div className="crt-tsk-sbmt-btn">
              <Button variant="contained" className="ch-submit-button" onClick={ this.props.dataToBeEdit ? this.updateTask : this.submitTask }>
                {!this.state.isSpinnerLoading ? this.props.dataToBeEdit ? 'Update' : 'Submit' : <img src={loadingSpinner} alt='loadingSpinner' /> }
              </Button>
            </div>
          </div>

          </div>
        </div>
        </div>
  )
  render() {
    return (
      <Drawer anchor="right" open={this.props.open} className='create-ticket-drawer'>
        {this.sideList('right')}
      </Drawer>
    )
  }
}

export default CreateTaskDrawer;
