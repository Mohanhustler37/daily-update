import React from "react";
import "./CreateHabitDrawer.scss";
import Drawer from "@material-ui/core/Drawer";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import DatePicker from "react-date-picker";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { CirclePicker, TwitterPicker } from "react-color";
import { Scrollbars } from "react-custom-scrollbars";

import colorPallet from "../../assets/create-habit/Icon material-color-lens.svg";
import locationIcon from "../../assets/create-habit/Icon material-my-location.svg";
import tagsIcon from "../../assets/create-habit/Icon awesome-tags.svg";
import startIcon from "../../assets/create-habit/Icon material-star.svg";
import profileIcon from "../../assets/create-habit/Icon awesome-user-alt.svg";
import incrementorIcon from "../../assets/create-habit/Icon feather-plus.svg";
import decrementorIcon from "../../assets/create-habit/Icon feather-minus.svg";
import closeCreateHabitIcon from "../../assets/create-habit/Icon ionic-ios-close.svg";
import emailIcon from "../../assets/icons/01-10-2019/Icon feather-mail.svg";

import habbitIdeas from "../../assets/images/books.png";

import hTemplateBooks from "../../assets/icons/LoginAndRegistration_icons/books.png";
import hTemplateWashFace from "../../assets/icons/LoginAndRegistration_icons/wash-face.png";
import hTemplateSleep from "../../assets/icons/LoginAndRegistration_icons/sleep.png";
import hTemplateTimeManagement from "../../assets/icons/LoginAndRegistration_icons/time-management.png";

import CompanyLogo from "../../assets/icons/01-10-2019/company-logo.svg";
import CompanyEditIcon from "../../assets/icons/SVG/Iconfeather-edit-3.svg";
import EditCompanyDetails from "../../components/TicketingSystem/CreateTicket/EditCompanyDetails/EditCompanyDetails";
import CompanyDetails from "../CompanyDetails/CompanyDetails";

import addNewIcon from "../../assets/icons/SVG/Group 11382.svg";
import removeIcon from "../../assets/icons/SVG/Group-11399 (1).svg";
import MediumIcon from "../../assets/icons/create-ticket/Path 887.svg";
import HighIcon from "../../assets/icons/create-ticket/Rectangle 242.svg";
import SearchTagAdd from "../../assets/icons/create-ticket/Group 11349.svg";
import ClrPckrTray from "../../assets/icons/create-ticket/Icon ionic-ios-color-palette.svg";
import DrpDwnIcn from "../../assets/icons/create-ticket/Icon ionic-md-arrow-dropdown.svg";
import decrementIcon from "../../assets/icons/SVG/Group 11399.svg";
import removeAttachedFile from "../../assets/icons/create-ticket/Group 11407.svg";
import dpfIcon from '../../assets/icons/SVG/337946.png'

import DropDwnIcon from "../../assets/icons/SVG/Icon ionic-ios-arrow-down.svg";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import QckCreateChck from "../../assets/icons/01-10-2019/Icon feather-check-circle.svg";
import profile from "../../assets/images/profile.png";
import AddMultipleTag from "../../assets/icons/01-10-2019/Icon feather-plus-circle.svg";
import NoteIcon from "../../assets/icons/SVG/Icon material-description.svg";

import { baseUrl } from "../../constants";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import history from "../../Routes/history";
import { getUserById,
  getAllUsers,
  getAllTemplates,
  getCompanyById,
  getDepartments,
  getTags,
  getTeams,
  createHabit,
 } from "./createHabitQuery"
const fileIcons = [{ pdf: dpfIcon }];
const imageFormats = ['jpg', 'jpeg', 'jpg', 'bmp', 'png', 'svg'];
const teamTabPanel = [];

const peopleTabPanel = [];

const QuickCreateIcons = [];

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder"
];
const buildQuitBtns = [
  { btnId: 1, btnName: "BUILD" },
  { btnId: 2, btnName: "QUIT" }
];
const goalPeriodBtns = [
  { btnId: 1, btnName: "DAILY" },
  { btnId: 2, btnName: "WEEKLY" },
  { btnId: 3, btnName: "MONTHLY" },
  { btnId: 4, btnName: "YEARLY" }
];
const weekDaysBtns = [
  { btnId: 0, isActive: false, btnName: "SUN" },
  { btnId: 1, isActive: false, btnName: "MON" },
  { btnId: 2, isActive: false, btnName: "TUE" },
  { btnId: 3, isActive: false, btnName: "WED" },
  { btnId: 4, isActive: false, btnName: "THU" },
  { btnId: 5, isActive: false, btnName: "FRI" },
  { btnId: 6, isActive: false, btnName: "SAT" }
];
const habittemplate = [];
const color = [
  "#feb1b2",
  "#7ac9ff",
  "#ffc089",
  "#41e590",
  "#ea5455",
  "#c8c8c8",
  "#656565",
  "#ecf1f9",
  "#7AC9FF"
];
const colors = [
  "#1abc9c",
  "#17a085",
  "#2ecc71",
  "#27ae60",
  "#3498db",
  "#2980b9",
  "#9b59b6",
  "#8e44ad",
  "#34495e",
  "#2c3e50",
  "#f1c40e",
  "#f39c12",
  "#d35400",
  "#e74c3c",
  "#c0392b",
  "#9b0000",
  "#f28a8a",
  "#00edff",
  "#1aa0bc",
  "#1cd8ff",
  "#ff92f4",
  "#d500a3",
  "#ffb300",
  "#d0cfec",
  "#ecf1f9",
  "#c8c8c8",
  "#656565",
  "#464646"
];

const StyledMenuItem = withStyles(theme => ({
  root: {
    // '&:focus': {
    //   backgroundColor: theme.palette.primary.main,
    //   '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
    //     color: theme.palette.common.white,
    //   },
    // },
  }
}))(MenuItem);

let wrapperRef;
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

class CreateHabitDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.colorPallet = null;
    this.state = {
      personName: [],
      nmbTimesPerDay: 1,
      buildQuitBtnId: 1,
      goalPeriodBtnId: 4,
      weekDaysBtnId: 3,
      selectedDate: "",
      isShareThroughEmail: false,
      isShowColorPallet: false,
      habitTitleColor: "",
      isShowSetTimePopup: false,
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
      selectedResponsible: [],
      shareMail: "",
      saveTemplate: false,
      frequency: [],
      responsibleUsers: [],
      getAllHabitTemplates: [],
      isEditCompDtlsOpen: false,
      assignToSelection: [],
      isShowDropdown: false,
      isMultiTagDropdown: false,
      selectedItems: [],
      selectedPeople: [],
      selectedTeams: [],
      valueTab: 0,
      SelectedValue: "a",
      assignedToPeople: null,
      assignedToTeam: null,
      teams: [],
      attachedFiles: [],
      userData: [],
      selectedCompany: {},
      departments: [],
      selectedDepartment: {},
      teamsData: [],
      selectedTeam: {},
      logedUser: {},
      habittemplate: [],
      selectedProject: {},
      anchorEl: null,
      isResponsibleDropdown: false,
      selected: "",
      responsibleName: "",
      checkedTagsArray: [],
      tagsSelect: "",
      emailListToShare: []
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("jwtToken");
    console.log("this.props.thisObj",this.props)
    const client = this.props.thisObj.props.client;
    if (token === null || token === undefined || token === "") {
      history.push("/");
    }
    this.addNewTimerBtn();
    document.addEventListener("mousedown", this.handleClickOutside);
    this.fetchHabittemplate();
    
    getUserById(client,res=>{
      this.setState({ logedUser: res.data.getUserById });
      this.fetchTeams(
        res.data.getUserById.companyId,
        res.data.getUserById.departmentId,
        res.data.getUserById.tenantId
      );
      this.fetchcompany(res.data.getUserById.companyId);
      this.fetchDepartment(res.data.getUserById.departmentId);
      this.fetchTags(res.data.getUserById.companyId);
      return res;
    })

    getAllUsers(client,res=>{
      this.setState({ users: res.data.getAllUsers });
      return res;
    })
  }

  fetchHabittemplate = () => {
    const client = this.props.thisObj.props.client;
    getAllTemplates(client,res=>{
      let habittemplate = res.data.getAllHabitTemplates;
        this.setState({ habittemplate: habittemplate });
    })
  };

  fetchcompany = companyId => {
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

  fetchDepartment = deptId => {
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

  fetchTags = companyId => {
    const client = this.props.thisObj.props.client;
    getTags(client,companyId,res=>{
      this.setState({ tags: res.data.allTags });
        return res;
    })
  };

  fetchTeams = (a, b, c) => {
    const client = this.props.thisObj.props.client;
    getTeams(client,a,b,c,res=>{
      let teamsData = res.data.getTeamByCompanyIdAndDepartmentId;
      this.setState({ teamsData: teamsData, selectedTeam: teamsData[0] });
    })
  };
  openEditCompDtlsOpen = e => {
    e.stopPropagation();
    this.setState({ isEditCompDtlsOpen: true });
  };

  // componentWillMount() {
  //   document.removeEventListener('mousedown', this.handleClickOutside);
  // }


  
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

  handleClickOutside = event => {
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      this.setState({
        isShowColorPallet: false,
        isShowSetTimePopup: false,
        isResponsibleDropdown: false,
        isEmailDropdown: false
        // isMultiTagDropdown: false
      });
    }
  };
  closeCompanyDrawer = () => {
    this.setState({ isEditCompDtlsOpen: false });
  };
  setWrapperRef = node => (wrapperRef = node);
  button = (btnName, style, onClick) => (
    <Button variant="contained" className={style} onClick={onClick}>
      {btnName}
    </Button>
  );
  addNewTimerBtn = () => {
    let length = this.state.setTimeBtns.length;
    let timeObj = {
      id: length,
      setTime: "12:00 AM",
      time: [
        "12:00 AM",
        "01:00 AM",
        "02:00 AM",
        "03:00 AM",
        "04:00 AM",
        "05:00 AM",
        "06:00 AM",
        "07:00 AM",
        "08:00 AM",
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
        "06:00 PM",
        "07:00 PM",
        "08:00 PM",
        "09:00 PM",
        "10:00 PM",
        "11:00 PM"
      ]
    };
    if (this.state.setTimeBtns.length < 4)
      this.setState({ setTimeBtns: [...this.state.setTimeBtns, timeObj] });
  };
  removeOneTimerBtn = id => {
    let setTimeBtns = this.state.setTimeBtns;
    setTimeBtns.splice(id, 1);
    this.setState({ setTimeBtns: setTimeBtns });
  };

  teamHandleClickfunction = (e, index, name) => {
    this.setState({ assignedToTeam: index });
    if (this.state.selectedTeams.includes(name)) {
    } else {
      this.state.selectedTeams.push(index);
      this.state.selectedItems.push(name);
    }
  };

  peopleHandleClickfunction1 = (e, index, name) => {
    this.setState({ [e.target.name]: index });
    if (this.state.selectedPeople.includes(name)) {
    } else {
      this.state.selectedPeople.push(name);
      this.state.selectedItems.push(name);
    }
  };

  radioHandleChange = event => {
    this.setState(event.target.value);
  };

  tabHandleChange = (event, newValue) => {
    this.setState({ valueTab: newValue });
  };

  doChange = () => {
    this.setState({
      text: "After change"
    });
  };
  showDropdown = () => {
    this.setState({ isShowDropdown: !this.state.isShowDropdown });
  };

  showMultiTagDropdown = () => {
    this.setState({ isMultiTagDropdown: !this.state.isMultiTagDropdown });
  };

  SelectMenuChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  SelectMenuChangeResponsible = event => {
    let data = event.target.value;
    this.state.users.map(data1 => {
      if (data == data1.firstName) {
        this.state.responsibleUsers.push(data1.id);
      }
    });
    this.setState({ [event.target.name]: event.target.value });
  };
  checkBoxHandler = event =>
    this.setState({ isShareThroughEmail: event.target.checked });
  checkBoxHandlerTemplate = event => {
    this.setState({ saveTemplate: event.target.checked });
  };
  closeDrawerHandler = () =>
    this.props.thisObj.setState({ isOpenCreateHabit: false });
  buildQuitBtnClickHandler = button =>
    this.setState({ buildQuitBtnId: button.btnId });
  goalPeriodBtnClickHandler = button =>
    this.setState({ goalPeriodBtnId: button.btnId });
  handleDateChange = date => this.setState({ selectedDate: date });
  showColorPalletPopup = () =>
    this.setState({ isShowColorPallet: !this.state.isShowColorPallet });
  showSetTimePopup = id =>
    this.setState({
      isShowSetTimePopup: !this.state.isShowSetTimePopup,
      setTimeBtnId: id
    });
  handleChangeComplete = (color, event) => {
    this.setState({
      habitTitleColor: color.hex,
      isShowColorPallet: !this.state.isShowColorPallet
    });
  };
  weekDaysBtnClickHandler = button => {
    let tempWeekDaysBtns = this.state.weekDaysBtns;
    tempWeekDaysBtns[button.btnId].isActive = !tempWeekDaysBtns[button.btnId]
      .isActive;
    this.setState({ weekDaysBtnId: button.btnId, frequency: tempWeekDaysBtns });
  };

  incrementHandler = () => {
    if (this.state.nmbTimesPerDay < 4) {
      this.setState({ nmbTimesPerDay: this.state.nmbTimesPerDay + 1 });
      this.addNewTimerBtn();
    }
  };
  decrementHandler = () => {
    if (this.state.nmbTimesPerDay > 1) {
      this.setState({ nmbTimesPerDay: this.state.nmbTimesPerDay - 1 });
      this.removeOneTimerBtn(this.state.nmbTimesPerDay - 1);
    }
  };

  colorPalletPopup = () => (
    <div className="color-pallet-popup color-picker-popup" ref={this.setWrapperRef}>
      <span>Color palette</span>
      <TwitterPicker
        colors={colors}
        onClick={() =>
          this.setState({ isShowColorPallet: !this.state.isShowColorPallet })
        }
        onChangeComplete={this.handleChangeComplete}
      />
    </div>
  );
  array = [];
  setTimeHandler = (time, timeToSet) => {
    this.state.setTime[time.id] = timeToSet;
    let temp = this.state.setTimeBtns;
    temp[time.id].setTime = timeToSet;
  };
  setTimePopup = time => (
    <div className="set-time-popup" ref={this.setWrapperRef}>
      <Scrollbars className="time-scroll-container">
        {time
          ? time.time.map(indTime => (
              <li onClick={() => this.setTimeHandler(time, indTime)}>
                {indTime}
              </li>
            ))
          : ""}
      </Scrollbars>
    </div>
  );

  changeSetTime = e => {
    let setTime1 = this.state.setTime;
    setTime1.push(e.target.value);
  };
  changeLocation = e => {
    e.preventDefault();
    this.setState({ location: e.target.value });
  };

  arrayToAssign = [];
  assignToCheck = data => {
    if (this.arrayToAssign.includes(data)) {
      let index = this.arrayToAssign.indexOf(data);
      this.arrayToAssign.splice(index, 1);
    } else {
      this.arrayToAssign.push(data);
    }
    this.setState({ assignToSelection: this.arrayToAssign });
  };

  submitHandler = async e => {
    // console.log("OnSubmit=",)
    e.preventDefault();
    const client  = this.props.thisObj.props.client;
    let prjId = null;
    if (this.state.selectedProject) {
      prjId = this.state.selectedProject.id;
    }

    let resUsr = []
    if(this.state.assignToSelection.length > 0){
    resUsr = this.state.assignToSelection.map(usr=>{
      return usr.id
    })
  }

  let variables = {
    habitTitle: this.state.habitTitle,
    tenantId: this.state.logedUser.tenantId,
    count: this.state.nmbTimesPerDay,
    setTime: this.state.setTime,
    location: this.state.location,
    assignBy: this.state.logedUser.id,
    goal: this.state.goalPeriodBtnId,
    shareMail: this.state.shareMail,
    isShareThroughEmail: this.state.isShareThroughEmail,
    saveTemplate: this.state.saveTemplate,
    frequency: this.state.frequency ? this.state.frequency : [],
    responsibleUsers: resUsr,
    tags1: this.state.tags1,
    companyId: this.state.selectedCompany.id,
    departmentId: this.state.selectedDepartment.id,
    teamId: this.state.selectedTeam.id,
    projectId: prjId
  }

  createHabit(client,variables,res=>{
    this.closeDrawerHandler();
    return res;
  })

  };

  handleChangeShare = (e, user) => {
    console.log("user_user", user);
    let temp = this.state.emailListToShare;
    temp = [...temp, user];
    console.log("emailListToShare", temp);
    this.setState({
      shareMail: e.target.value,
      isShareThroughEmail: true,
      emailListToShare: temp
    });
  };

  onChangeHabitTitle = e => {
    this.setState({ habitTitle: e.target.value });
  };

  sideList = () => (
    <div>
      {this.state.isEditCompDtlsOpen ? (
        <EditCompanyDetails
          onClick={e => e.stopPropagation()}
          isEditCompDtlsOpen={this.state.isEditCompDtlsOpen}
          allState={this.state}
          thisObj={this}
        />
      ) : null}
      <div className="create-habit-layout">
        <div
          className="create-habit-close-icon"
          onClick={this.closeDrawerHandler}
        >
          <img src={closeCreateHabitIcon} alt="close-icon" />
        </div>

        <div className="create-habit-main-section">
          <div className="create-habit-header-section">
            <p>Create Habits</p>
            <p>
              Lorem ipsum is simply dummy text of the printing and <br></br>
              typesetting industry
            </p>
          </div>

          <div className="create-habit-title-container">
            <>
              <img
                src={colorPallet}
                alt="colorPallet"
                className="colorPallet"
                onClick={this.showColorPalletPopup}
              />
              {this.state.isShowColorPallet ? this.colorPalletPopup() : null}
              <TextField
                id="standard-basic"
                className={""}
                value={this.state.habitTitle}
                margin="normal"
                placeholder="Habit title *"
                onChange={this.onChangeHabitTitle}
                inputProps={{
                  style: { color: `${this.state.habitTitleColor}` }
                }}
              />
            </>
            {/* <label className="star-icon">*</label> */}
            {/* <Fab
              variant="extended"
              aria-label="delete"
              className="create-habit-fav-button"
            >
              <img src={startIcon} alt="startIcon" />
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
              />
              <span>ICON</span>
            </Fab> */}

            <label className="create-habit-fav-button ">
              <img src={startIcon} alt="startIcon" />
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
              />
              <span>ICON</span>
            </label>
          </div>

          <div className="flex-container">
            {/* <FormControl className="multi-select-dropdown-menu">
              <InputLabel htmlFor="age-simple">
                <img src={profileIcon} alt="profileIcon" />
                <span>Responsible</span>{" "}
                <i class="fa fa-asterisk edtCmp-icon" aria-hidden="true"></i>
              </InputLabel>
              <Select
                name="users1"
                multiple
                value={this.state.users1}
                onChange={this.SelectMenuChangeResponsible}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => selected.join(", ")}
                MenuProps={"MenuProps"}
              >
                {this.state.users
                  ? this.state.users.map(name => (
                      <MenuItem key={name.firstName} value={name.firstName}>
                        <Checkbox
                          checked={
                            this.state.users1.indexOf(name.firstName) > -1
                          }
                        />
                        <ListItemText primary={name.firstName} />
                      </MenuItem>
                    ))
                  : ""}
              </Select>
            </FormControl> */}

            <div className="responsible-drawer-type">
              <div className="menu-container">
                <div
                  className="responsible-drawer-container"
                  onClick={this.handleOutsideClickClosedResp}
                >
                  <div className="selected-item-container">
                    {/* {
                          this.state.ticketTypeId == 1 ? "Service request" :
                            this.state.ticketTypeId == 2 ? "Incident" :
                              this.state.ticketTypeId == 3 ? "Problem" : "Ticket Type"
                        } */}
                    <img src={profileIcon} alt="profileIcon" />
                    {this.state.assignToSelection.length == 0 ? (
                      <p>
                        Responsible <span>*</span>
                      </p>
                    ) : (
                      this.state.assignToSelection.map(item => (
                        <div className="CT-selected-item-template">
                          <img
                            id="avathar-img"
                            src={profileIcon}
                            alt="profileIcon"
                          />
                          <span>
                            {item.firstName} {item.lastName}
                          </span>
                          <img
                            id="remove-img"
                            src={decrementIcon}
                            alt="decrementIcon"
                            onClick={() =>
                              this.elementPopHandler(
                                this.state.assignToSelection,
                                item
                              )
                            }
                          />
                        </div>
                      ))
                    )}
                  </div>
                  <div className="responsible-drp-dwn-img">
                    <img
                      src={DrpDwnIcn}
                      onClick={this.handleOutsideClickClosedResp}
                    />
                  </div>
                </div>

                <div
                  className={`responsible-type-dropdown-menu-container 
                    ${
                      this.state.isResponsibleDropdown
                        ? "responsible-type-open-dropdown"
                        : "close-dropdown"
                    }`}
                  ref={this.setWrapperRef}
                >
                  {this.state.users != null || this.state.users != undefined
                    ? this.state.users.map((name, index) => (
                        <StyledMenuItem
                          className="customized-ticket-source"
                          onClick={e => {
                            e.stopPropagation();
                            this.assignToCheck(name);
                          }}
                          onClose={this.handleClose}
                        >
                          <div className="create-resp-one d-flex">
                            <label
                              className="labelStyle"
                              style={{ background: "#53d7e3" }}
                            ></label>
                            <div className="create-ticket-tckt-img-text d-flex">
                              <p>{name.firstName}</p>
                            </div>

                            <div className="create-ticket-src-radio">
                              <Radio
                                checked={this.state.assignToSelection.includes(name)}
                                // onChange={(e) => this.peopleHandleClickfunction(e, index)}
                                value={name.firstName}
                                name="responsibleName"
                                color="primary"
                                inputProps={{ "aria-label": "" }}
                                // onChange={e =>
                                //   this.handleChangeRespType(e, name.firstName)
                                // }
                                onClick={e => {
                                  e.stopPropagation();
                                  this.assignToCheck(name);
                                }}
                              />
                            </div>
                          </div>
                        </StyledMenuItem>
                      ))
                    : null}
                </div>
              </div>
            </div>

            <div className="create-habit-start-date">
              <DatePicker
                className={`date-picker-style`}
                onChange={this.handleDateChange}
                clearIcon={null}
              />
              <TextField
                className={""}
                value={
                  this.state.selectedDate
                    ? moment(this.state.selectedDate).format("MMM Do, YYYY")
                    : null
                }
                label={this.state.selectedDate ? null : "Start date"}
                margin="normal"
              />
            </div>
          </div>

          <div className="build-quit-section">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div>
                  <span>Build or quit this habit?</span>{" "}
                </div>
              </Grid>
              <Grid item xs={8}>
                <div>
                  {buildQuitBtns.map(button =>
                    this.button(
                      button.btnName,
                      `custome-button ${
                        button.btnId === this.state.buildQuitBtnId
                          ? "custome-button-active"
                          : "custome-button-dashed"
                      }`,
                      () => this.buildQuitBtnClickHandler(button)
                    )
                  )}
                </div>
              </Grid>
            </Grid>
          </div>

          <div className="build-quit-section">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div>
                  <span>Choose your goal period:</span>{" "}
                </div>
              </Grid>
              <Grid item xs={8}>
                <div>
                  {goalPeriodBtns.map(button =>
                    this.button(
                      button.btnName,
                      `custome-button ${
                        button.btnId === this.state.goalPeriodBtnId
                          ? "custome-button-active"
                          : "custome-button-dashed"
                      }`,
                      () => this.goalPeriodBtnClickHandler(button)
                    )
                  )}
                </div>
              </Grid>
            </Grid>
          </div>

          <div className="set-your-goal-section">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div className="left-section">
                  <span>Set your goal:</span>
                  <div className="left-section-content">
                    <div className="number-times-perday">
                      <div onClick={this.decrementHandler}>
                        <img src={decrementorIcon} alt="decrementorIcon" />
                      </div>
                      <div>{this.state.nmbTimesPerDay}</div>
                      <div onClick={this.incrementHandler}>
                        <img src={incrementorIcon} alt="decrementorIcon" />
                      </div>
                    </div>
                    <span>or more times per day</span>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="right-section">
                  <span>Set time:</span>
                  <div
                    className="right-section-content"
                    onChange={this.changeSetTime}
                  >
                    {this.state.setTimeBtns
                      ? this.state.setTimeBtns.map(time => (
                          <div
                            className="timer-section"
                            onClick={() => this.showSetTimePopup(time.id)}
                          >
                            {time.setTime}{" "}
                            {this.state.isShowSetTimePopup &&
                            this.state.setTimeBtnId === time.id
                              ? this.setTimePopup(time)
                              : null}
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>

          <div className="goals-on-which-days-section">
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <span>Track goals on which days?</span>
              </Grid>
              <Grid item xs={7}>
                <div className="days-button-container">
                  {this.state.weekDaysBtns.map(weekBtn => (
                    <div
                      className={`day-button ${
                        weekBtn.isActive
                          ? "active-day-button"
                          : "non-active-day-button"
                      }`}
                      onClick={() => this.weekDaysBtnClickHandler(weekBtn)}
                    >
                      <span>{weekBtn.btnName}</span>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </div>

          <div className="location-tags-notes-section">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div className="left-section">
                  <div className="location-tags-div">
                    <div className="create-habit-location">
                      <img src={locationIcon} alt="" />
                      <TextField
                        className={""}
                        value={this.state.location}
                        onChange={this.changeLocation}
                        label={"Location"}
                        margin="normal"
                      />
                    </div>

                    {/* <FormControl className="multi-select-dropdown-menu">
                      <InputLabel htmlFor="age-simple">
                        <img src={tagsIcon} alt="tagsIcon" />
                        <span>Tags</span>{" "}
                        <i
                          class="fa fa-asterisk edtCmp-icon"
                          aria-hidden="true"
                        ></i>
                      </InputLabel>
                      <Select
                        name="tags1"
                        multiple
                        value={this.state.tags1}
                        onChange={this.SelectMenuChangeHandler}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(", ")}
                        MenuProps={"MenuProps"}
                      >
                        {this.state.tags
                          ? this.state.tags.map(name => (
                              <MenuItem key={name.id} value={name.tagTitle}>
                                <Checkbox
                                  checked={
                                    this.state.tags1.indexOf(name.tagTitle) > -1
                                  }
                                />
                                <ListItemText primary={name.tagTitle} />
                              </MenuItem>
                            ))
                          : ""}
                      </Select>
                    </FormControl> */}

                    <div className="CT-drawer-tags">
                      <div className={`menu-container`}>
                        <div
                          className={`tags-container ${
                            this.state.isMultiTagDropdown
                              ? "field-z-index"
                              : null
                          }`}
                          onClick={e => {
                            e.stopPropagation();
                            this.setState({
                              isMultiTagDropdown: !this.state
                                .isMultiTagDropdown,
                              isResponsibleDropdown: false
                            });
                          }}
                        >
                          <div className="selected-item-container">
                            <img
                              className="tagsIcon"
                              src={tagsIcon}
                              alt="tagsIcon"
                            />
                            {this.state.checkedTagsArray.length === 0
                              ? "Tags"
                              : this.state.checkedTagsArray.map(tag => (
                                  <p
                                    className={
                                      this.state.tagsSelect
                                        ? "selectedTag"
                                        : null
                                    }
                                  >
                                    {tag.tagTitle}
                                    <img
                                      className="removeTagIcon"
                                      src={removeIcon}
                                      alt=""
                                      onClick={() =>
                                        this.elementPopHandler(
                                          this.state.checkedTagsArray,
                                          tag
                                        )
                                      }
                                    />
                                  </p>
                                ))}
                          </div>
                          <div className="tag-drp-dwn-img">
                            <img
                              src={addNewIcon}
                              onClick={e => {
                                e.stopPropagation();
                                this.setState({
                                  isMultiTagDropdown: !this.state
                                    .isMultiTagDropdown,
                                  isResponsibleDropdown: false
                                });
                              }}
                              alt="AddMultipleTag"
                            />
                          </div>
                        </div>
                        {console.log(
                          "listOfRelatedTo_listOfRelatedTo",
                          this.state.listOfRelatedTo
                        )}
                        <div
                          className={`tag-dropdown-menu-container ${
                            this.state.isMultiTagDropdown
                              ? "dropdown-z-index tag-open-dropdown"
                              : "dropdown-z-index close-dropdown"
                          }`}
                        >
                          <Scrollbars
                            className="custom-scroll"
                            style={{ height: 115 }}
                          >
                            {this.state.tags != null ||
                            this.state.tags != undefined
                              ? this.state.tags.map((icon, index) => (
                                  <StyledMenuItem
                                    className="customized-ticket-source"
                                    onClose={this.handleClose}
                                  >
                                    <div className="create-ticket-one-tag d-flex">
                                      <div
                                        className="create-ticket-tag-img-text d-flex"
                                        onClick={() => this.checkedTags(icon)}
                                      >
                                        <div className="create-ticket-tag-check">
                                          <Checkbox
                                            className="create-ticket-tags-chck"
                                            name="checkedTagsArray"
                                            value={this.state.checkedTagsArray}
                                            color="primary"
                                            checked={this.state.checkedTagsArray.includes(
                                              icon
                                            )}
                                            onClick={e => {
                                              e.stopPropagation();
                                              this.checkedTags(icon);
                                            }}
                                          />
                                        </div>
                                        <p>{icon.tagTitle}</p>
                                      </div>
                                      <img
                                        src={
                                          icon.tagTitle == "Risk"
                                            ? MediumIcon
                                            : icon.tagTitle == "Completed"
                                            ? HighIcon
                                            : null
                                        }
                                      ></img>
                                    </div>
                                  </StyledMenuItem>
                                ))
                              : null}
                          </Scrollbars>
                          <hr></hr>
                          <div className="create-ticket-search-tag d-flex">
                            <InputBase
                              placeholder="Enter tag name"
                              className="search-input"
                              inputProps={{ "aria-label": "search" }}
                            />
                            <img src={SearchTagAdd} alt=""></img>
                          </div>
                          <div className="create-task-drawer-color-picker d-flex">
                            <img
                              src={ClrPckrTray}
                              alt=""
                              onClick={this.showColorPalletPopup}
                            ></img>
                            {this.state.isShowColorPallet
                              ? this.colorPalletPopup()
                              : null}
                            <div className="task-circle-color-picker">
                              {/* <CirclePicker/> */}
                              <CirclePicker
                                colors={color}
                                circleSize={18}
                                width="300px"
                                circleSpacing={10}
                                onChangeComplete={this.handleChangeComplete}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="right-section">
                  <img src={NoteIcon} alt="edit"></img>
                  <TextareaAutosize
                    className="notes-text-area"
                    placeholder="Note"
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="create-habit-body-right">
          <div className="create-habit-sub-section">
            {/* <div className="create-ticket-drawer-company-details">
              <div className="create-ticket-company-description d-flex justify-space-between">
                <div className="d-flex">
                  <img src={CompanyLogo} alt="CompanyLogo" /> */}
            {/* {this.state.company.map(company=>{
                if(this.state.logedUser.companyId == company.id){ */}
            {/* <div className="create-ticket-drawer-company-text">
                    <p className="create-ticket-drawer-company-text-one">
                      {this.state.selectedCompany.companyName}
                    </p>
                    <p className="create-ticket-drawer-company-text-two">
                      {this.state.selectedCompany.companyDescription}
                    </p>
                  </div> */}
            {/* }} )} */}
            {/* </div>
                <div className="create-ticket-drawer-company-details-edit">
                  <img
                    src={CompanyEditIcon}
                    onClick={e => this.openEditCompDtlsOpen(e)}
                    alt="CompanyEditIcon"
                  />
                </div>
              </div>
              <div className="department-and-team-name">
                {this.state.selectedDepartment ? (
                  <p>{this.state.selectedDepartment.departmentName}</p>
                ) : (
                  <p>Department Name</p>
                )}
                {this.state.selectedTeam.teamName ? (
                  <p className="team-name">
                    {this.state.selectedTeam.teamName}
                  </p>
                ) : (
                  <p className="team-name">Team Name</p>
                )}
              </div>
            </div> */}

            <CompanyDetails
              companyLogo={CompanyLogo}
              companyName={this.state.selectedCompany.companyName}
              companyDescription={this.state.selectedCompany.companyDescription}
              departmentName={this.state.selectedDepartment.departmentName}
              teamName={this.state.selectedTeam.teamName}
              onClick={this.openEditCompDtlsOpen}
            />

            <div className="create-habit-templates-section">
              <div className="create-habit-templates-heading">
                <span>Habit ideas</span>
                <span>See all</span>
              </div>

              {this.state.habittemplate != null ||
              this.state.habittemplate != undefined
                ? this.state.habittemplate.map(template => {
                    return (
                      <div className="habit-templates-card">
                        <div className="habit-templates-card-details">
                          <p>{template.templateName}</p>
                          <p>{template.habitDescription}</p>
                        </div>
                        <div className="habbit-ideas-img">
                          <img src={habbitIdeas} />
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>

            <div className="create-habit-attachment">
              <span>Attachments</span>
              <div
                className={`CT-attached-files-container ${
                  !this.state.attachedFiles ? "align-center" : "space-equaly "
                }`}
              >
                {this.state.attachedFiles != null ||
                this.state.attachedFiles != undefined
                  ? this.state.attachedFiles.map((file, index) => {
                      return (
                        <div className="attached-file-template">
                          <img
                            className="attached-file-remove"
                            src={removeAttachedFile}
                            alt=""
                            onClick={() =>
                              this.removeAttachedFileHandler(index)
                            }
                          />
                          {file.base64 ? (
                            <img src={file.base64} alt="file" />
                          ) : file ? (
                            <img
                              src={fileIcons.map(
                                icon => icon[file.name.split(".")[1]]
                              )}
                              alt=""
                            />
                          ) : null}
                        </div>
                      );
                    })
                  : null}
                {console.log(
                  "this.state.attachedFiles",
                  this.state.attachedFiles
                )}
                <div
                  className={`create-ticket-file-upload-field ${
                    this.state.attachedFiles.length === 0
                      ? "preButtonStyle"
                      : "postButtonStyle"
                  } `}
                >
                  <Button className="create-ticket-file-attach-button">
                    <input
                      type="file"
                      className="custom-attach-file-input"
                      // className="custom-attach-file-input "
                      id="inputGroupFile01"
                      onChange={this.fileAttachmentHandler}
                      multiple={true}
                    />
                    <p className="drag-attach-text">
                      Drag attach file, <br />
                      or <span>browse</span>
                    </p>
                  </Button>
                </div>
              </div>
            </div>

            {/* <div className="create-habit-attachment">
              <span>Attachments</span>
              <div>
                <label className="file-attach-button-label ">
                  <Button className="file-attach-button"></Button>
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                  />
                  <p>
                    Drag attach file, <br />
                    or <span>browse</span>
                  </p>
                </label> */}

            {/* <Button className="file-attach-button">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                  />
                </Button> */}
            {/* <p>
                  Drag attach file, <br />
                  or <span>browse</span>
                </p> */}
            {/* </div>
            </div> */}

            <div className="share-through-email-section">
              {/* <div>
                <span>Share</span>
                <Checkbox
                  className="share-through-email-checkbox"
                  checked={this.state.isShareThroughEmail}
                  onChange={this.checkBoxHandler}
                  value="checkedA"
                />
              </div>

              <FormControl
                disabled={this.state.isShareThroughEmail ? false : true}
                variant="outlined"
                className="create-habit-customised-dropdown-menu"
              >
                <InputLabel htmlFor="name-disabled">Enter email</InputLabel>
                <div className="">
                  <img src={emailIcon} alt="emailIcon" />
                  <Select
                    value={this.state.shareMail}
                    onChange={this.handleChangeShare}
                    inputProps={{}}
                  >
                    {this.state.users
                      ? this.state.users.map(user => {
                          return (
                            <MenuItem value={user.emailIs}>
                              {user.emailIs}
                            </MenuItem>
                          );
                        })
                      : ""}
                  </Select>
                </div>
              </FormControl> */}

              <div className="share-through-email-section">
                <div className="sharethecheckbox">
                  <span>SHARE</span>
                  <Checkbox
                    className="share-through-email-checkbox"
                    checked={this.state.isShareThroughEmail}
                    onChange={this.checkBoxHandler}
                    value=""
                  />
                </div>

                {this.state.isShareThroughEmail ? (
                  <div className="createTaskEmailDrawer">
                    <div className="menu-container">
                      <div
                        className="create-ticket-email"
                        onClick={this.showEmailDropdown}
                      >
                        <img src={emailIcon} alt="emailIcon"></img>
                        <div
                          className={`${
                            this.state.checkboxCopy == false ? "disabled" : ""
                          } selected-item-container`}
                        >
                          {this.state.emailListToShare.length > 0 ? (
                            this.state.emailListToShare.map(email => (
                              <div className="CT-selected-item-template">
                                <img
                                  id="avathar-img"
                                  src={profileIcon}
                                  alt="profileIcon"
                                />
                                <span>
                                  {email.firstName} {email.lastName}
                                </span>
                                <img
                                  id="remove-img"
                                  src={decrementIcon}
                                  alt="decrementIcon"
                                  onClick={e => {
                                    this.elementPopHandler(
                                      this.state.emailListToShare,
                                      email
                                    );
                                  }}
                                />
                              </div>
                            ))
                          ) : (
                            <p className="eml-text">Enter email</p>
                          )}
                        </div>
                        <div className="email-drp-dwn-img">
                          <img src={DrpDwnIcn} />
                        </div>
                      </div>
                      <div
                        className={`dropdown-menu-container ${
                          this.state.isEmailDropdown
                            ? "open-dropdown"
                            : "close-dropdown"
                        }`}
                      >
                        <Scrollbars
                          className="emailListCustomScroll"
                          style={{ height: 155 }}
                        >
                          {this.state.users
                            ? this.state.users.map((user, index) => (
                                <StyledMenuItem
                                  className="customized-ticket-source"
                                  onClose={this.handleClose}
                                >
                                  <div
                                    className="create-ticket-one-email d-flex"
                                    onClick={e =>
                                      this.handleChangeShare(e, user)
                                    }
                                  >
                                    <img src={profileIcon} alt="profileIcon" />
                                    <div className="create-ticket-email-img-text d-flex">
                                      <p>
                                        {user.firstName || user.lastName
                                          ? user.firstName + " " + user.lastName
                                          : "No email-id"}
                                      </p>
                                    </div>

                                    <Checkbox
                                      className="emailSelectCheckBox"
                                      checked={this.state.emailListToShare.includes(
                                        user
                                      )}
                                      onClick={e =>
                                        this.handleChangeShare(e, user)
                                      }
                                      value=""
                                    />
                                  </div>
                                </StyledMenuItem>
                              ))
                            : null}
                        </Scrollbars>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="create-habit-footer-section">
        <div className="footer-inner-container">
        <div>
          <Checkbox
            className="Save-as-an-Idea-checkbox"
            checked={this.state.saveTemplate}
            onChange={this.checkBoxHandlerTemplate}
            value={this.state.saveTemplate}
          />
          <span className="save-text">Save as an Idea for future use</span>
        </div>

        <Button
          variant="contained"
          className="ch-submit-button"
          onClick={this.submitHandler}
        >
          Submit
        </Button>
      </div>
      </div>
    </div>
  );

  //Responsible Dropdown Methods

  responsibleHandleClick = selectedObject => {
    this.setState({ selected: selectedObject });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleOutsideClickClosedResp = e => {
    e.stopPropagation();
    this.setState({
      isResponsibleDropdown: !this.state.isResponsibleDropdown,
      isEmailDropdown: false,
      isMultiTagDropdown: false
    });
  };

  handleChangeRespType = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  //Tags Dropdown Methods

  array = [];

  checkedTags = id => {
    var tagString = "";
    if (this.array.includes(id)) {
      let index = this.array.indexOf(id);
      this.array.splice(index, 1);
    } else {
      this.array.push(id);
    }
    this.array.map(uniq => {
      if (this.array.length > 1) {
        tagString += " " + uniq.tagTitle;
      } else {
        tagString = uniq.tagTitle;
      }
    });
    this.setState({ checkedTagsArray: this.array, tagsSelect: tagString });
  };

  elementPopHandler = (array, element) => {
    let index = array.indexOf(element);
    let temp = array.splice(index, 1);
  };

  //Email
  showEmailDropdown = () =>
    this.setState({ isEmailDropdown: !this.state.isEmailDropdown });

  render() {
    return (
      <Drawer
        anchor="right"
        onClick={this.closeCompanyDrawer}
        open={this.props.isOpenCreateHabit}
        className="create-ticket-drawer"
      >
        {this.sideList("right")}
      </Drawer>
    );
  }
}

export default CreateHabitDrawer;