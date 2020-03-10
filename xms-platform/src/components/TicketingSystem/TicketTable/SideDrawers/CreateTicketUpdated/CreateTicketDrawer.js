import React from 'react';
// import '../FiltersDrawer/FiltersDrawer.scss';
import './CreateTicketDrawer.scss';
import Drawer from '@material-ui/core/Drawer';
import CreateTicketDrawerClose from '../../../../../assets/icons/01-10-2019/Icon ionic-ios-close.svg';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AttachmentAddIcon from "../../../../../assets/icons/01-10-2019/Icon feather-plus-circle.svg";
import CompanyLogo from "../../../../../assets/icons/create-ticket/Group 10506.svg";
import CompanyDetails from '../../../../../components/CompanyDetails/CompanyDetails';
import CompanyEditIcon from "../../../../../assets/icons/SVG/Icon-feather-edit.svg";
import RequestorProfile from "../../../../../assets/images/profile.png";
import RequestorDropDown from "../../../../../assets/icons/LoginAndRegistration_icons/Icon-ionic-md-arrow-dropdown.svg";
import KnowledgeIcon from "../../../../../assets/icons/create-ticket/Icon material-content-paste.svg";
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import DropDwnIcon from "../../../../../assets/icons/SVG/Icon ionic-ios-arrow-down.svg";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import QckCreateChck from "../../../../../assets/icons/01-10-2019/Icon feather-check-circle.svg";
import { Scrollbars } from 'react-custom-scrollbars';
import profile from "../../../../../assets/images/profile.png";
// import AddMultipleTag from "../../../../../assets/icons/01-10-2019/Icon feather-plus-circle.svg"
import AddMultipleTag from '../../../../../assets/icons/SVG/Group 11382.svg'
import { baseUrl } from "../../../../../constants";
// import tagsIcon from '../../assets/create-habit/Icon awesome-tags.svg'
import EditCompanyDetails from '../../../../../components/TicketingSystem/CreateTicket/EditCompanyDetails/EditCompanyDetails';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import WebAppIcon from "../../../../../assets/icons/create-ticket/globe-asia.svg";
import ChatIcon from "../../../../../assets/icons/create-ticket/chat_bubble_outline.svg";
import PhoneIcon from "../../../../../assets/icons/create-ticket/phone-alt.svg";
import EmailIcon from "../../../../../assets/icons/create-ticket/email.svg";
import SMSIcon from "../../../../../assets/icons/create-ticket/chat_bubble_outline.svg";
import MobileIcon from "../../../../../assets/icons/create-ticket/mobile-app.svg";
import CriticalIcon from "../../../../../assets/icons/create-ticket/Rectangle 643.svg";
import HighIcon from "../../../../../assets/icons/create-ticket/Rectangle 242.svg";
import MediumIcon from "../../../../../assets/icons/create-ticket/Path 887.svg";
import LowIcon from "../../../../../assets/icons/create-ticket/Rectangle 261.svg";
import CreateEmailIcon from "../../../../../assets/icons/create-ticket/Icon feather-mail.svg";
import DrpDwnIcn from "../../../../../assets/icons/create-ticket/Icon ionic-md-arrow-dropdown.svg";
import KnowledgeSearch from "../../../../../assets/icons/create-ticket/Icon feather-search.svg";
import CriticalCustomerIcon from "../../../../../assets/icons/create-ticket/Ellipse 3149.svg";
import SearchTagAdd from "../../../../../assets/icons/create-ticket/Group 11349.svg";
import { CirclePicker, TwitterPicker } from 'react-color';
import ClrPckrTray from "../../../../../assets/icons/create-ticket/Icon ionic-ios-color-palette.svg";
import { getTicketTemplatesData, getUserEmails, getAllPriority, 
  getAllTicketTypes, 
  getAllTags,
  searchTicketTemplatesData,
  getAllTeams,
  addTicket,
  getTeams,
  getAllTicketSource,
  getAllTicketType,
  getAllCompanies,
  getAlldepartments,
 } from "./createTicketQueries";
import { getLogedUser } from "../../../../../containers/TicketTable/TicketTableQueries";
// import { getAllPriority } from "../../../HabitList/habitListQueries"
import { getTicketUnderManager } from "../../../../../containers/TicketTable/TicketTableQueries"
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from "apollo-boost";


import sourceEmailIcon from '../../../../../assets/icons/SVG/Icon-material-email.svg';
import sourceChatIcon from '../../../../../assets/icons/SVG/Icon-material-chat_bubble_outline.svg'
import sourcePhoneIcon from '../../../../../assets/icons/SVG/Icon-awesome-phone-alt.svg'
import sourceSMSIcon from '../../../../../assets/icons/SVG/Icon-material-chat_bubble_outline.svg'
import sourceMobileApplIcon from '../../../../../assets/icons/SVG/Icon-ionic-ios-apps.svg'
import sourceWebAppIcon from '../../../../../assets/icons/SVG/Iconawesome-globe-asia.svg'

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: baseUrl.server,
});


const teamTabPanel = []

const peopleTabPanel = []

const QuickCreateIcons = []

const Tags = [
  // { id: 1, icon: MediumIcon, title: "Risk" },
  // { id: 2, icon: CriticalCustomerIcon, title: "Critical Customer" },
  // { id: 3, icon: HighIcon, title: "Phase1" },
  // { id: 4, icon: LowIcon, title: "Technical" },
  // { id: 5, icon: MediumIcon, title: "Risk" },
]


const Source = [
  { id: 1, icon: WebAppIcon, title: "Web App" },
  { id: 2, icon: ChatIcon, title: "Chat" },
  { id: 3, icon: PhoneIcon, title: "Phone" },
  { id: 4, icon: EmailIcon, title: "Email" },
  { id: 5, icon: SMSIcon, title: "SMS" },
  { id: 6, icon: MobileIcon, title: "Mobile App" },

]

const Email = []

const Priority = [
  { id: 1, icon: CriticalIcon, title: "Critical" },
  { id: 2, icon: HighIcon, title: "High" },
  { id: 3, icon: MediumIcon, title: "Medium" },
  { id: 4, icon: LowIcon, title: "Low" },
]
// const Priority = [
//   {id: 1, icon: CriticalIcon, title: "Critical"},
//   {id: 2, icon: HighIcon, title: "High"},
//   {id: 3, icon: MediumIcon, title: "Medium"},
//   {id: 4, icon: LowIcon, title: "Low"},
// ]



const color = ['#feb1b2', '#7ac9ff', '#ffc089', '#41e590', '#ea5455', '#c8c8c8', '#656565']

const colors = ['#1abc9c', '#17a085', '#2ecc71', '#27ae60', '#3498db', '#2980b9', '#9b59b6', '#8e44ad', '#34495e', '#2c3e50', '#f1c40e', '#f39c12', '#d35400', '#e74c3c', '#c0392b', '#9b0000', '#f28a8a', '#00edff', '#1aa0bc', '#1cd8ff', '#ff92f4', '#d500a3', '#ffb300', '#d0cfec', '#ecf1f9', '#c8c8c8', '#656565', '#464646']


const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

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


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

let wrapperRef;
let checkedList = [];
let checkTagsDataValue = [];
class CreateTicketDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      dueDate: new Date(),
      fCustomer: 'customer',
      fContact: 'contact',
      fDepartment: 'department',
      fTeam: 'team',
      fManager: 'manager',
      fAssignedTo: 'assignedTo',
      fCreatedBy: 'createdBy',
      personName: [],
      ticket_Type:[],
      age: '',
      priority: '',
      tagsName: [],
      ticketTitle: "",
      priorities: [],
      ticketDescription: "",
      tags: [],
      tags1:[],
      users: [],
      user: 0,
      email: "",
      priority123: "",
      anchorEl: null,
      selected: '',
      selectedTemplate:{},
      selectedpriority:'',
      text: 'before change',
      isShowDropdown: false,
      isMultiTagDropdown: false,
      isQuickCreateDropdown: false,
      isSourceDropdown: false,
      isPriorityDropdown: false,
      selectedItems: [],
      selectedPeople: [],
      selectedsource:[],
      selectedTeams: [],
      valueTab: 0,
      SelectedValue: 'a',
      selectedsourcevalue:'',
      selecteId: '',
      selecteIdTwo: '',
      ticket_source: [],
      quickTemplate: "Quick create using template",
      assignedToPeople: null,
      assignedToTeam: null,
      source:null,
      isEmailDropdown: false,
      teams: [],
      isEditCompDtlsOpen: false,
      isShowColorPallet: false,
      isTicketTypeDropdown: false,
      file: null,
      uploadFile: [],

      userEmailCopy: '',
      isSendEmailCopy: false,

      priorityApiData: [],
      priorityId: '',
      ticketTypeApiData: [],
      ticketTypeId: '',
      tagsApiData: [],
      checkBoxValue: [],
      assignToPlaceHolder: true,
      checkTags: true,
      checkTagsData: [],
      //  source:'',
       tickettype:'',
      company: [],
      selectedCompany: {},
      departments: [],
      selectedDepartment: {},
      teamsData: [],
      selectedTeam: {},
      logedUser: {},
      selectedProject: {},
      checkedTagsArray: [],
      tagsSelect: "",
      selectedNewTagColor:"",
      isAssignToOpen: false, 
    }
    this.onChange = this.onChange.bind(this);
  }



  componentDidMount() {
    var client = this.props.client;
    this.fetchTicket_source();
    this.getUserEmailsData();
     this.fetchTicket_Type();
    this.getAllPriorityData();

    getLogedUser(client,parseInt(localStorage.getItem('id')),res=>{
      this.setState({ logedUser: res })
      this.fetchTeams(res.companyId, res.departmentId, res.tenantId);
      this.fetchcompany(res.companyId);
      this.fetchDepartment(res.departmentId);
      this.getTemplatesData(res.tenantId);
      this.getAllTagsData(res.companyId);

      return res;
    })

    getAllTeams(1,res=>{
      this.setState({ teams: res.data.getAllTeamsUnderTenant })
      res.data.getAllTeamsUnderTenant.map(team => {
        teamTabPanel.push({ id: team.id, name: team.teamName, activeIcon: profile })
      })
      return res
    })


//     getAllPriority(client,res=>{
//       alert(JSON.stringify(res.data.priorities))
//       this.setState({ priorities: res.data.priorities })
//       return res
//     })

// alert("working")
// // if(this.props.propState != null){
//   getAllTags(client,this.props.user.companyId,res=>{
//     this.setState({ tags: res })
//     alert("tags=="+JSON.stringify(res))
//       return res
//   })

  // }else{
  //   this.setState({ tags: this.props.propState })
  // }
  getUserEmails(res=>{
    this.setState({ users: res.data.getAllUsers })
    res.data.getAllUsers.map(user => {
      // alert("user"+user.id+"ho")
      peopleTabPanel.push({ id: user.id, name: user.firstName, activeIcon: profile })

    })
    return res
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



  fetchDepartment = async (deptId) => {
    let allDepts = await getAlldepartments();
    if(allDepts){
      let departments = allDepts;
      if (departments != null || departments != undefined) {
        departments.map(depart => {
          if (deptId == depart.id) {
            this.setState({ selectedDepartment: depart })
          }
        })
      }
      this.setState({ departments: departments });
    }
  };

  fetchcompany = async (companyId) => {
    let allCompany = await getAllCompanies();
    if(allCompany){
      let company = allCompany;
      if (company != null || company != undefined) {
        company.map(cmp => {
          if (companyId == cmp.id) {
            this.setState({ selectedCompany: cmp })
          }
        })
      }
      this.setState({ company: company });
    }
  };

  fetchTeams = (a, b, c) => {
    getTeams(a,b,c,res=>{
      let teamsData = res.data.getTeamByCompanyIdAndDepartmentId;
      this.setState({ teamsData: teamsData, selectedTeam: teamsData[0] });
    })
  };
  fetchTicket_source = async () => {
    //this.setState({ isLoading: true });
    let ticketSourceData1 = await getAllTicketSource();
    if(ticketSourceData1){
      const ticket_source = ticketSourceData1;
        this.setState({ ticket_source: ticket_source });
    }
  };

  fetchTicket_Type = async () => {
    //this.setState({ isLoading: true });
    let ticketTypeData = await getAllTicketType();
    if(ticketTypeData){
      const ticket_Type = ticketTypeData;
      this.setState({ ticket_Type: ticket_Type });
    }

  };

  getTemplatesData = async (id) => {
    const data = {
      tenantId: id
    }
    const result = await getTicketTemplatesData(data);
    if (result) {
      this.setState({ templates: result })
      result.map(template => {
        QuickCreateIcons.push({ id: template.id, icon: QckCreateChck, title: template.templateName, ticketDescription: template.ticketDescription, ticketPrefix: template.ticketPrefix, tenantId: template.tenantId })
      })
    }
  }
  getUserEmailsData = async () => {
    const data = {
      companyId: 1
    }
    const result = await getUserEmails();
    if (result) {
      result.map(email => {
        Email.push({ id: email.id, icon: profile, title: email.email })
      })
    }
  }

  getAllPriorityData = async () => {
    const result = await getAllPriority(client);
    if (result) {
      if (this.state.priorityApiData == '' || this.state.priorityApiData == undefined
        || this.state.priorityApiData == null) {
        this.setState({ priorityApiData: result,priorities: result });

      }
    }
  }

  getAllTagsData = async (id) => {
    const result = await getAllTags(this.props.client,id);
    if (result) {
      this.setState({ tags: result })
      if (this.state.tagsApiData == '' || this.state.tagsApiData == undefined
        || this.state.tagsApiData == null) {
        this.setState({ tagsApiData: result });
//     alert("tags=="+JSON.stringify(res))
//       return res
      }
    }
  }

  getAllTicketTypeData = async () => {
    const result = await getAllTicketTypes(client);
    if (result) {
      if (this.state.ticketTypeApiData == '' || this.state.ticketTypeApiData == undefined
        || this.state.ticketTypeApiData == null) {
        this.setState({ ticketTypeApiData: result });
      }
    }
  }

  handleCheckBoxSendCopy = () => {
    this.setState({ isSendEmailCopy: !this.state.isSendEmailCopy })
  }
  submitTicket = async (e) => {
    e.preventDefault();
    if(this.state.ticketTitle === '' && this.state.selected === '') {
      alert('Ticket title and Ticket type fields are mandatory')
    } else {
      // let assignedTo=[];
      // if(this.state.assignedToPeople){
      //   assignedTo = this.state.assignedToPeople.map(user=>{
      //     return user.id
      //   })
      // }
      // alert(this.state.assignedToPeople)
      let tags=[];
      if(this.state.checkedTagsArray.length>0){ 
      tags = this.state.checkedTagsArray.map(tag=> tag.tagTitle)
      }

      let variables= {
        name: this.state.ticketTitle,
        ticketDescription: this.state.ticketDescription,
        ticketType: this.state.selected,
        priorityId: this.state.priorities[0].id,
        tenantId: 27,
        userId: parseInt(localStorage.getItem('id')),
        managerId: 4,
        assignedToAgentId: this.state.assignedToPeople,
        tags1: tags,
        ticketSource: this.state.selectedsourcevalue
      }

      addTicket(variables,async res=>{
        const data = {
          managerId: 4,
          pageNo: 1
        };
        const result = await getTicketUnderManager(client, data);
       if(result.data.getTicketUnderManager!=undefined || result.data.getTicketUnderManager != null){
          await this.props.thisObj.setState({
          ticketList: result.data.getTicketUnderManager,
          allTickets: result.data.getTicketUnderManager 
        });
      }
        this.closeFDrawerHandler();
        return res
      })
    }

  }
  openEditCompDtlsOpen = (e) => {
    e.stopPropagation()
    this.setState({ isEditCompDtlsOpen: true })
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  closeFDrawerHandler = () => {
    this.props.thisObj.setState({ isCTDrawerOpen: false })
  }
  chooseStartHandler = date => {
    this.setState({ startDate: date })
  }

  chooseDueHandler = date => {
    this.setState({ dueDate: date })
  }
  toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ ...this.state, [side]: open });
  };

  handleChange = event => {
    this.setState({ age: event.target.value })
  };

  priorityHandleChange = event => {
    this.setState({ priority: event.target.value })
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  multipleHandleChange = event => {
    this.setState({ tagsName: event.target.value });
  };

  quickHandleClick = (selectedObject) => {
    this.setState({
      selectedTemplate: selectedObject,
      ticketTitle: `${selectedObject.ticketPrefix}-${selectedObject.templateName}`,
      ticketDescription: selectedObject.ticketDescription,
      quickTemplate: selectedObject.templateName,
      isQuickCreateDropdown: false
    })
  }
  quickHandleClick2 = (selectedObject) => {
    this.setState({selectedsourcevalue:selectedObject})

  }
  priorityHandleClick = (selectedObject1) => {
    this.setState({ selectedpriority: selectedObject1 });
  }
  tickettypeHandleClick=(selectedObject) =>{
    this.setState({selected: selectedObject});
  }

  teamHandleClickfunction = (e, index, name) => {
    this.setState({ assignedToTeam: index, assignToPlaceHolder: false });
    if (this.state.selectedTeams.includes(name)) { } else {
      this.state.selectedTeams.push(index)
      this.state.selectedItems.push(name)
      this.setState({ assignToPlaceHolder: false })
    }
  }

  peopleHandleClickfunction1 = (e, index, name) => {
    this.setState({ [e.target.name]: index, assignToPlaceHolder: false });
    this.setState({ assignToPlaceHolder: false })
    if (this.state.selectedPeople.includes(name)) { } else {
      this.state.selectedPeople.push(name)
      this.state.selectedItems.push(name)
      this.setState({ assignToPlaceHolder: false })
    }
  }
  sourceHandleClickfunction=(e, index, name) => {
    this.setState({  source: index, assignToPlaceHolder: false });
    this.setState({ assignToPlaceHolder: false })
    if (this.state.selectedsource.includes(name)) { } else {
      this.state.selectedsource.push(name)
      this.state.selectedItems.push(name)
      this.setState({ assignToPlaceHolder: false })
    }
  }
  selectEmails = (e, index, data) => {
    this.setState({
      userEmailCopy: data.firstName,
      userEmailCopyId: data.id,
      isEmailDropdown: false,
    })
  }
  radioHandleChange = event => {
    this.setState(event.target.value);
  };
  tabHandleChange = (event, newValue) => {
    event.stopPropagation();
    this.setState({ valueTab: newValue });
  };
  doChange = () => {
    this.setState({
      text: 'After change',
    })
  }


  dropdownToggleHandler =(event, dropdownToggle)=> {
    console.log('dropdownToggleHandler_dropdownToggleHandler')
    event.stopPropagation();
    if(dropdownToggle) {
      this.setState({ 
        isQuickCreateDropdown: false,
        isTicketTypeDropdown: false,
        isMultiTagDropdown: false,
        isSourceDropdown: false,
        isPriorityDropdown: false,
        isEmailDropdown: false,
        isShowDropdown: false,
        isAssignToOpen: false,
        [dropdownToggle[Object.keys(dropdownToggle)[0]]]: !this.state[dropdownToggle[Object.keys(dropdownToggle)[0]]]
       })
    }
    else {
      event.stopPropagation();
      this.setState({
        isQuickCreateDropdown: false,
        isTicketTypeDropdown: false,
        isMultiTagDropdown: false,
        isSourceDropdown: false,
        isPriorityDropdown: false,
        isEmailDropdown: false,
        isShowDropdown: false,
        isAssignToOpen: false
      })
    }
  }



  handleChangeComplete = (e)=>{
    this.setState({selectedNewTagColor:e.hex,isShowColorPallet:false})
  }

  colorPalletPopup = () => (
    <div className='color-pallet-popup-for-tags' ref={this.setWrapperRef}>
      <span>Color palette</span>
      <TwitterPicker colors={colors} onChangeComplete={this.handleChangeComplete} />
    </div>
  )
  onChange = (event) => {
    let imageList = [];
    let extension = null;
    for (let i = 0; i < event.target.files.length; i++) {
      extension = event.target.files[i].name.split('.')[1];
      if (extension === 'jpg' || extension === 'jpeg' || extension === 'jpg' || extension === 'bmp' || extension === 'png' || extension === 'svg') {
        this.imageToBase64Converter(event.target.files[i], result => {

          imageList = [...imageList, result]
          this.setState({
            uploadFile: [...this.state.uploadFile, result]
          })
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
 submitTag=(event)=>{
    if(this.state.selectedNewTagColor){
    this.props.thisObj.submitTag1(event.target.value,this.state.selectedNewTagColor,result=>{
      let array =[]
      array = this.state.tags
      array.push(result.data.addTag);
      this.setState({tags:array})
    })
    this.setState({enterTag:"",selectedNewTagColor:""})
  }else{
      alert("select color for new tag")
    }
  
}
submitTag1=()=>{
  if(this.state.selectedNewTagColor){
    this.props.thisObj.submitTag1(this.state.enterTag,this.state.selectedNewTagColor,result=>{
      let array =[]
      array = this.state.tags
      array.push(result.data.addTag);
      this.setState({tags:array})
    })
    this.setState({enterTag:"",selectedNewTagColor:""})
  }else{
      alert("select color for new tag")
    }
}
  // Added on Nov 18th
  handleChangePriority = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      isPriorityDropdown: false,
      isTicketTypeDropdown: false
    });
  }
  handleChangeticketType=(event) =>{
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleCheckBoxTags = (event, data) => {
    if (event.target.checked) {
      checkedList.push(Number(event.target.value));
      checkTagsDataValue.push(data.tagTitle);
      this.setState({ checkBoxValue: checkedList, checkTags: false, checkTagsData: checkTagsDataValue });
    } else if (!event.target.checked) {
      checkedList.pop(Number(event.target.value));
      checkTagsDataValue.pop(data.tagTitle);
      this.setState({ checkBoxValue: checkedList, checkTagsData: checkTagsDataValue });
    }
  }
  searchTemplate=async(e)=>{
    var searchData = searchTicketTemplatesData(e.target.value,this.state.logedUser.tenantId,data=>{
      this.setState({templates:data})
    })
  }
  sideList = side => (
    <div className={'create-ticket-drawer-bodySection'} role="presentation">
      {this.state.isEditCompDtlsOpen ? <EditCompanyDetails onClick={(e) => e.stopPropagation()} isEditCompDtlsOpen={this.state.isEditCompDtlsOpen} allState={this.state} thisObj={this} /> : null}
      <div className="create-ticket-left-section">
        <img src={CreateTicketDrawerClose} alt='' onClick={this.closeFDrawerHandler} />
      </div>
      <div className="crete-ticket-body">
        <div className="create-ticket-body-component">
          <div className='create-ticket-drawer-middle-section'>
            <div className="create-ticket-header-section d-flex justify-space-between">
              <div className="create-ticket-header-text">
                <p className="create-ticket-logo-text">CREATE TICKET</p>
                <p className="create-ticket-logo-sub-text">Lorem ipsum is simply dummy text of the printing and <br></br>typesetting industry</p>
              </div>
              <div className="create-ticket-header-drop-down d-flex justify-flex-end">
                <div className='menu-container'>
                  <div className='quick-create-template' onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isQuickCreateDropdown' })}>
                    <div className='selected-item-container'>
                      <p className="quck-templt-text">{this.state.quickTemplate}</p>
                    </div>
                    <div className="quick-drp-dwn-img">
                      <img src={DropDwnIcon} onClick={(e)=> this.dropdownToggleHandler(e,{ dropdownToggle: 'isQuickCreateDropdown' })} />
                    </div>
                  </div>
                  <div className={`dropdown-menu-container ${this.state.isQuickCreateDropdown ? 'quickCreateDropDOwnOpen' : 'close-dropdown'}`} ref={this.setWrapperRef}>
                    <div className="quick-create-search-bar d-flex align-items-center">
                      <InputBase
                        placeholder="Search of template"
                        className="search-input"
                        onClick={(e)=>e.stopPropagation()}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e)=>{this.searchTemplate(e)}}
                      />
                      <SearchIcon onClick={(e)=>e.stopPropagation()}/>
                    </div>
                    <Scrollbars className="custom-scroll" style={{ height: 160 }}>
                      {this.state.templates ? this.state.templates.map(template =>
                        <StyledMenuItem className="customized-ticket-list" onClick={() => this.quickHandleClick(template)}>
                          <div className="quick-create-ticket-one d-flex">
                            <img src={QckCreateChck}></img>
                            <p>{template.templateName}</p>
                          </div>

                        </StyledMenuItem>
                      ) : ''}
                    </Scrollbars>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-ticket-drawer-title">
              <form noValidate autoComplete="off" className="ticket-title-form">
                <TextField
                  required
                  id="outlined-error"
                  placeholder={'Ticket title' }
                  name="ticketTitle"
                  className=""
                  value={this.state.ticketTitle}
                  margin="normal"
                  onChange={this.changeHandler}
                />
              </form>
            </div>
            <div className="create-ticket-drawer-ticket-type-priority d-flex justify-space-between">
              <div className="create-ticket-drawer-ticket-type">
                <div className='menu-container'>
                  <div className='ticket-drawer-container' onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isTicketTypeDropdown' })}>
                    <div className='selected-item-container'>
                      
                      
                        {/* {
                          this.state.ticketTypeId == 1 ? "Service request" :
                            this.state.ticketTypeId == 2 ? "Incident" :
                              this.state.ticketTypeId == 3 ? "Problem" : "Ticket Type"
                        } */}
                        
                        <p>{this.state.selected ? this.state.selected : 'Ticket Type' } </p>
                    
                    </div>
                    <div className="ticket-drp-dwn-img">
                      <img src={DrpDwnIcn} onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isTicketTypeDropdown' })} />
                    </div>

                  </div>

                  <div className={`ticket-type-dropdown-menu-container 
                    ${this.state.isTicketTypeDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
                    ref={this.setWrapperRef}
                  >
                    {
                      this.state.ticket_Type!=null || this.state.ticket_Type != undefined ? this.state.ticket_Type.map((icon, index) =>
                      <StyledMenuItem className="customized-ticket-source"
                        onClick={() => this.tickettypeHandleClick(icon.title)} onClose={this.handleClose}
                      >
                        <div className="create-ticket-one-tckt-typ d-flex">
                        { console.log('this.state.selected', this.state.selected, icon) }
                        <label 
                              className='labelStyle'
                              style={{ background:  
                                icon.title === 'service_request' ? '#53d7e3' 
                                : icon.title === 'Problem' ? '#ffc50c'
                                : icon.title === 'Incident' ? '#fd673a'
                                : '#53d7e3' 
                              }}
                          ></label>
                          <div className="create-ticket-tckt-img-text d-flex">
                            <p>{icon.title}</p>
                          </div>

                          <div className="create-ticket-src-radio">
                            <Radio
                               checked={this.state.selected == icon.title}
                               
                              // onChange={(e) => this.peopleHandleClickfunction(e, index)}
                              value={icon.id}
                              name="ticketTypeId"
                              color="primary"
                              inputProps={{ 'aria-label': '' }}
                              onChange={(e) => this.handleChangeticketType(e, icon.id, icon.title)}
                            />
                          </div>
                        </div>

                      </StyledMenuItem>
                    ) : null
                    }

                  </div>
                </div>
              </div>
              <div className="create-ticket-drawer-priority">
                <div className='menu-container'>
                  <div className='priority-container'onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isPriorityDropdown' })}>
                    <div className='selected-item-container'>
                     
                      <p htmlFor="priority" name="priority">
                        { this.state.selectedpriority != "" ?  this.state.selectedpriority : 'Priority'}
                      </p>
                    </div>
                    <div className="priority-drp-dwn-img">
                      <img src={DrpDwnIcn} onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isPriorityDropdown' })} />
                    </div>

                  </div>

                  <div className={`priority-dropdown-menu-container ${this.state.isPriorityDropdown ? 'priority-open-dropdown' : 'close-dropdown'}`} ref={this.setWrapperRef}>
                    {
                      this.state.priorityApiData ? this.state.priorityApiData.map((icon, index) =>
                        <StyledMenuItem className="customized-ticket-source"
                          onClick={() => this.priorityHandleClick(icon.priorityname)} onClose={this.handleClose}
                        >
                          <div className="create-ticket-one-priority d-flex">
                          
                            <div className="create-ticket-prio-img-text d-flex">
                              <label 
                              className='labelStyle'
                              style={{ background:  
                                icon.priorityname === 'High' ? '#ffc50c' 
                                : icon.priorityname === 'Critical' ? '#fd673a'
                                : icon.priorityname === 'Medium' ? '#53d7e3'
                                : icon.priorityname === 'Low' ? '#41e590'
                                : ''
                              }}
                              ></label>
                              <p value={icon.id}>{icon.priorityname}</p>
                            </div>

                            <div className="create-ticket-src-radio">
                              <Radio
                                checked={icon.priorityname == this.state.selectedpriority}
                                onChange={this.handleChangePriority}
                                value={icon.id}
                                name="priorityId"
                                color="primary"
                                inputProps={{ 'aria-label': '' }}
                              />
                            </div>
                          </div>

                        </StyledMenuItem>
                      ) : ''
                    }

                  </div>
                </div>
              </div>
            </div>

            <div className="create-ticket-drawer-text-area">
              <TextareaAutosize
                // aria-label="minimum height"
                rows={3}
                placeholder="Ticket description"
                name="ticketDescription"
                value={this.state.ticketDescription}
                onChange={this.changeHandler}
              />
            </div>

            <div className="create-ticket-drawer-tags-source d-flex justify-space-between">
              <div className="create-ticket-drawer-tags">
                <div className='menu-container'>
                  <div className='tags-container' onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isMultiTagDropdown' })}>
                    <div className='selected-item-container'>
                      {console.log('this.state.tagsSelects', this.state.tagsSelect)}
                      {this.state.tagsSelect != "" ?
                        <p className="tag-text">{this.state.tagsSelect}</p>
                        : <p>Tags</p>}
                    </div>
                    <div className="tag-drp-dwn-img" >
                      <img src={AddMultipleTag} onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isMultiTagDropdown' })} />
                    </div>

                  </div>

                  <div className={`tag-dropdown-menu-container ${this.state.isMultiTagDropdown ? 'tag-open-dropdown' : 'close-dropdown'}`}>

                    <Scrollbars className="custom-scroll">
                      {this.state.tags ? this.state.tags.map((icon, index) =>
                        <StyledMenuItem className="customized-ticket-source" onClose={this.handleClose}>
                          <div className="create-ticket-one-tag d-flex">
                            <div className="create-ticket-tag-img-text d-flex" >
                              <div className="create-ticket-tag-check" onClick={()=>this.checkedTags(icon)}>
                                <Checkbox
                                  className="create-ticket-tags-chck"
                                  name="checkedTagsArray"
                                  value={this.state.checkedTagsArray}
                                  color="primary"
                                  onClick={(e) =>{ 
                                    e.stopPropagation();
                                    this.checkedTags(icon)
                                  }}
                                />
                              </div>
                              <p>{icon.tagTitle}</p>
                            </div>
                            <img 
                              src={''
                                // icon.id == 1 ? MediumIcon : icon.id == 2 ?
                                // CriticalCustomerIcon : icon.id == 3 ? HighIcon : icon.id == 4 ?
                                //   LowIcon : icon.id == 5 ? MediumIcon : null
                              }>
                            </img>
                            {/* <img src={icon.tagTitle == "Risk" ? MediumIcon : (icon.tagTitle == "Completed") ? HighIcon : null }></img> */}
                          </div>

                        </StyledMenuItem>
                      ) : null}
                    </Scrollbars>
                    <hr></hr>
                   
                    <div className="create-ticket-search-tag d-flex justify-space-between" onClick={this.submitTag1}>
                      <InputBase
                        value={this.state.enterTag}
                        placeholder="Enter tag name"
                        inputProps={{'aria-label': 'search' , style:{color:`${this.state.selectedNewTagColor}`}}}
                        className="search-input"
                        onChange={(e)=>this.setState({enterTag:e.target.value})}
                        onKeyPress={(event) =>{ if(event.key=="Enter"){this.submitTag(event)
                        }
                      }}
                      />
                      <img src={SearchTagAdd} alt="" onClick={this.submitTag1}></img>
                    </div>
                    <div className="create-tckt-drawer-color-picker d-flex">
                      <img src={ClrPckrTray} alt="" onClick={this.showColorPalletPopup}></img>
                      {this.state.isShowColorPallet ? this.colorPalletPopup() : null}
                      <div className="ticket-circle-color-picker">
                        <CirclePicker colors={color} circleSize={18} width="260px" circleSpacing={10} onChangeComplete={this.handleChangeComplete} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="create-ticket-drawer-source">
                <div className='menu-container'>
                  <div className='Source-container' onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isSourceDropdown' })}>
                    <div className='selected-item-container' >
                      {this.state.selectedsourcevalue != "" ?
                        <p>{this.state.selectedsourcevalue}</p>
                        : <p>Source</p>}
                      
                    </div>
                    <div className="src-drp-dwn-img">
                      <img src={DrpDwnIcn} onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isSourceDropdown' })} />
                    </div>
                  </div>
                  <div className={`dropdown-menu-container ${this.state.isSourceDropdown ? 'open-dropdown' : 'close-dropdown'}`} ref={this.setWrapperRef}>
                    {this.state.ticket_source != null || this.state.ticket_source != undefined ?
                      this.state.ticket_source.map((icon, index) =>{
                        return<StyledMenuItem className="customized-ticket-source"   onClick={() => this.quickHandleClick2(icon.name)} onClose={this.handleClose}>
                          <div className="create-ticket-one-source d-flex">
                            <div className="create-ticket-src-img-text d-flex">
                              <img src={
                                icon.name === "Email" ?  sourceEmailIcon 
                                : icon.name === "Chat" ? sourceChatIcon 
                                : icon.name === "Web App" ? sourceWebAppIcon 
                                : icon.name === "Phone" ? sourcePhoneIcon 
                                : icon.name === "SMS" ? sourceSMSIcon 
                                : icon.name === "SMS" ? sourceChatIcon 
                                : null
                               } alt='' /><p>{icon.name}</p>
                            </div>
                            <div className="create-ticket-src-radio">
                              <Radio
                              name="ticketsourceId"
                                checked={this.state.selectedsourcevalue === icon.name}
                                value={icon.id}
                                name="radio-button-demo"
                                color="primary"
                                inputProps={{ 'aria-label': '' }}
                               onChange={(e) => this.sourceHandleClickfunction(e, icon.id, icon.name)}
                              />
                            </div>
                          </div>
                        </StyledMenuItem>
                       }) : null}
                  </div>
                </div>
              </div>

            </div>
              <div className='create-ticket-attachment'>
                <p className="create-ticket-attachment-header-text">Attachments</p>

                <div className="uploaded-image-and-attach">
                  {this.state.uploadFile ? this.state.uploadFile.map((file) => {
                    return <img src={file}></img>
                  }) : ''}
                  <div className='create-tckt-file-attach-section'>

                    <div className={`create-ticket-file-upload-field ${this.state.uploadFile.length === 0 ? 'file-attach-full-width' : 'file-upload-after-width'} `}>
                      <Button className='create-ticket-file-attach-button'>
                        <input
                          type='file'
                          className="custom-attach-file-input "
                          id="inputGroupFile01"
                          onChange={this.onChange}
                          multiple={true}
                        />
                        <p className="drag-attach-text">Drag attach file, <br />or <span>browse</span></p>
                      </Button>
                    </div>

                  </div>
                  <div className="attach-drg-text-container">
                  </div>
                </div>

              </div>
            
          </div>

          <div className='create-ticket-drawer-right-section'>
            <div className="create-ticket-drawer-body-right">
              <CompanyDetails 
                companyLogo={CompanyLogo} 
                companyName={this.state.selectedCompany.companyName} 
                companyDescription={this.state.selectedCompany.companyDescription}
                departmentName={this.state.selectedDepartment.departmentName}
                teamName={this.state.selectedTeam.teamName}
                onClick={this.openEditCompDtlsOpen}
              />

              <div className="create-ticket-drawer-assign-to">
                <div className='menu-container' >
                  <div className={`dropdown-menu-container ${this.state.isAssignToOpen ? 'ticketAssignToOpenDropdown' : 'close-dropdown'}`} ref={this.setWrapperRef}>
                    <Tabs value={this.state.valueTab} onChange={this.tabHandleChange} aria-label="simple tabs example">
                      <Tab label="Teams" />
                      <Tab label="People" />
                    </Tabs>
                    <TabPanel value={this.state.valueTab} index={0}>
                      <div className="tab-panel-container-search-bar d-flex">
                        <InputBase
                          placeholder="Search teams"
                          className="search-input"
                          inputProps={{ 'aria-label': 'search' }}
                          onClick={(e)=>e.stopPropagation()}
                        />
                        <SearchIcon />
                      </div>

                      <div className="tab-panel-container">
                        <Scrollbars className="tabPanelCustomScroll" >
                          {this.state.teams != null || this.state.teams != undefined ?
                            this.state.teams.map((team, index) => (

                              <div className="tab-panel-one d-flex justify-space-between" onClick={(e)=>e.stopPropagation()}>
                                <div className="tab-panel-one-img d-flex justify-content-center align-items-center">
                                  <img src={profile}></img>
                                  <p className="assign-to-profile-name">{team.teamName}</p>
                                </div>
                                <Radio
                                  checked={this.state.assignedToTeam === team.id}
                                  onChange={(e) => this.teamHandleClickfunction(e, team.id, team.teamName)}
                                  value=""
                                  name="radio-button-demo"
                                  color="primary"
                                  inputProps={{ 'aria-label': '' }}
                                />
                              </div>
                            )) : null
                          }
                        </Scrollbars>
                      </div>
                    </TabPanel>


                    <TabPanel value={this.state.valueTab} index={1}>
                      <div className="tab-panel-container-search-bar d-flex">
                        <InputBase
                          placeholder="Search people"
                          className="search-input"
                          inputProps={{ 'aria-label': 'search' }}
                          onClick={(e)=>e.stopPropagation()}
                        />
                        <SearchIcon />
                      </div>
                      <div className="tab-panel-container">
                        <Scrollbars className="tabPanelCustomScroll" >
                          {this.state.users != null || this.state.users != undefined ?
                            this.state.users.map((user, index) => (

                              <div className="tab-panel-one d-flex justify-space-between" onClick={(e) => this.peopleHandleClickfunction1(e, user.id, user.firstName)} name="assignedToPeople">
                                <div className="tab-panel-one-img d-flex justify-content-center align-items-center">
                                  <img src={profile}></img>
                                  <p className="assign-to-profile-name">{user.firstName}</p>
                                </div>
                                <Radio
                                  checked={this.state.assignedToPeople === user.id}
                                  onChange={(e) => this.peopleHandleClickfunction1(e, user.id, user.firstName)}
                                  value=""
                                  name="assignedToPeople"
                                  color="primary"
                                  inputProps={{ 'aria-label': '' }}
                                />
                              </div>
                            )) : null
                          }
                        </Scrollbars>
                      </div>
                    </TabPanel>
                  </div>
                  <div className='custome-non-library-multi' onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isAssignToOpen' })}>
                    <div className='selected-item-container'>
                      {
                        this.state.selectedItems.length != 0 ? 
                          <div className='selected-item-template d-flex'>
                            <img src={profile} />
                            <div className='assigneeText'>
                              <label >Assign to</label>
                              <label >{this.state.selectedItems[this.state.selectedItems.length - 1]}</label>
                            </div>
                          </div>
                         : (
                          <div className='selected-item-template d-flex'>
                            
                            <img src={profile} />
                            <div className='assigneeText'>
                              <label >Assign to</label>
                              <label >Assignee Name</label>
                            </div>
                          </div>
                        )

                        }
                    </div>
                    <img src={DropDwnIcon} onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isAssignToOpen' })} />
                  </div>
                </div>
              </div>


              <div className="snd-cpy-check-box">
                <Checkbox
                  value="checkedB"
                  color="primary"
                  checked={this.state.isSendEmailCopy}
                  onChange={this.handleCheckBoxSendCopy}
                />
                <span className="snd-cpy">Send a copy</span>
              </div>


              {
                this.state.isSendEmailCopy ? (
                  <div className="create-ticket-drawer-email">
                  <div className='menu-container' onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isEmailDropdown' })}>
  
                    <div className='create-ticket-email'>
                      <div className={`${this.state.isSendEmailCopy == false ? 'disabled' : ''} selected-item-container`}>
                        <img src={CreateEmailIcon} alt=""></img>
                        <p className="eml-text">{this.state.userEmailCopy ? this.state.userEmailCopy : 'Enter Email'}</p>
                      </div>
                      <div className="email-drp-dwn-img">
                        <img src={DrpDwnIcn} onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isEmailDropdown' })} />
                      </div>
  
                    </div>
                    <div className={`dropdown-menu-container ${this.state.isEmailDropdown ? 'open-dropdown' : 'close-dropdown'}`}>
                      <Scrollbars className="custom-scroll" style={{ height: 155 }}>
                        {this.state.users.length > 0 ? this.state.users.map((icon, index) =>
                          <StyledMenuItem className="customized-ticket-source"
                            // onClick={() => this.quickHandleClick(icon)} 
                            onClick={(e) => this.selectEmails(e, index, icon)}
                            onClose={this.handleClose}
                          >
                            { console.log('this.state.userEmailCopy', this.state.userEmailCopy, icon) }
                            <div className="create-ticket-one-email d-flex">
                              <div className="create-ticket-email-img-text d-flex">
                                <img src={profile}></img>
                                <p>{icon.firstName || icon.lastName ? icon.firstName +' '+ icon.lastName : 'No email-id'}</p>
                              </div>
  
                              <div className="create-ticket-email-radio">
                                <Radio
                                  checked={this.state.userEmailCopyId === icon.id}
                                  onChange={(e) => this.selectEmails(e, index, icon)}
                                  value=""
                                  name="radio-button-demo"
                                  color="primary"
                                  inputProps={{ 'aria-label': '' }}
                                  className="email-radio-button"
                                />
                              </div>
                            </div>
                          </StyledMenuItem>
                        ) : null}
                      </Scrollbars>
                    </div>
                  </div>
                 </div>
                ) : null
              }
              <div className="create-ticket-drawer-knowledge-container">
                <div className="create-ticket-drawer-knowledge-container-two">
                  <div className="midmarginsection">
                  <div className="knowledge-base d-flex justify-space-between">
                    <div className="knowledge-base-header d-flex">
                      <img src={KnowledgeIcon} alt="knowledge"></img>
                      <p className="knowledge-header-text">KNOWLEDGE BASE</p>
                    </div>

                    <div className="knowledge-search">
                      <img src={KnowledgeSearch} alt=""></img>
                    </div>
                  </div>
                  <div className="knowledge-questions">
                    <div className="knowledge-base-value"><p>01</p></div>
                    <div className="knwldg-text">
                      <p className="knwldg-text-1st">How to create a new project for </p>
                      <p className="knwldg-text-next">implementation?</p>
                    </div>
                  </div>
                  <div className="knowledge-questions">
                    <div className="knowledge-base-value"><p>02</p></div>
                    <div className="knwldg-text">
                      <p className="knwldg-text-1st">How to invite a new user for support</p>
                      <p className="knwldg-text-next">management tool?</p>
                    </div>
                  </div>
                  <div className="knowledge-questions">
                    <div className="knowledge-base-value"><p>03</p></div>
                    <div className="knwldg-text">
                      <p className="knwldg-text-1st">How to create a new project for </p>
                      <p className="knwldg-text-next">implementation?</p>
                    </div>

                  </div>
                  <div className="knowledge-questions">
                    <div className="knowledge-base-value"><p>04</p></div>
                    <div className="knwldg-text">
                      <p className="knwldg-text-1st">How to invite a new user for support </p>
                      <p className="knwldg-text-next">management tool?</p>
                    </div>
                  </div>
                  <div className="create-drawer-sell-All">
                    <p>See All</p>
                  </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="createTicketFooter">
            <div>
                <Button variant="outlined" className="leftButton" >
                    Save as Template
                </Button>
            </div>
            <div>
                <Button size="large" className="rightButton update-button" onClick={this.submitTicket}>
                    Submit
                </Button>
            </div>
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <Drawer  onClick={this.dropdownToggleHandler}  anchor="right" open={this.props.isCTDrawerOpen} className='create-ticket-drawer'>
        {this.sideList('right')}
      </Drawer>
    )
  }
}

export default CreateTicketDrawer;
