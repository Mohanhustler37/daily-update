import React, { Component } from "react";
import "./CreateTaskDrawer.scss";

import Drawer from '@material-ui/core/Drawer';
import gql from 'graphql-tag';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';
//import SearchIcon from '@material-ui/icons/Search';
import TaskTitleImage from "../../../../../assets/icons/01-10-2019/Icon-material-subtitles.svg";
import TaskTitleColorIcon from "../../../../../assets/icons/01-10-2019/Icon-material-color-lens.svg";
import MenuItemImage from "../../../../../assets/images/profile.png";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CompanyLogo from "../../../../../assets/icons/01-10-2019/company-logo.svg";
import CompanyEditIcon from "../../../../../assets/icons/SVG/Iconfeather-edit-3.svg";
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import AttachmentAddIcon from "../../../../../assets/icons/01-10-2019/Icon feather-plus-circle.svg";
import TimePicker from 'react-time-picker';
import CreateTaskTimeIcon from "../../../../../assets/icons/01-10-2019/Icon material-access-time.svg";
import axios from 'axios';
import { baseUrl } from "../../../../../constants";
import DatePicker from 'react-date-picker';
import moment from 'moment';
// import featherChevronRight from '../../../../../assets/icons/01-10-2019/Icon feather-chevron-right.svg'
import featherChevronRight from '../../../../../assets/icons/01-10-2019/Icon feather-chevron-right.svg'
// import { QueryTypes } from "sequelize/types";
import { Scrollbars } from 'react-custom-scrollbars';
import profile from "../../../../../assets/images/profile.png";
import DrpDwnIcn from "../../../../../assets/icons/create-ticket/Icon ionic-md-arrow-dropdown.svg";
import CreateEmailIcon from "../../../../../assets/icons/create-ticket/Icon feather-mail.svg";
import EditCompanyDetails from '../../../../../components/TicketingSystem/CreateTicket/EditCompanyDetails/EditCompanyDetails';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import closeCreateHabitIcon from '../../../../../assets/create-habit/Icon ionic-ios-close.svg'
import DropDwnIcon from "../../../../../assets/icons/SVG/Icon ionic-ios-arrow-down.svg";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
const teamTabPanel = []

const peopleTabPanel = []
// const queryUsers = gql`
//     {
//         getAllUsers {
//             id,
//             firstName,
//             lastName,
//             emailIs,
//             password,
//             userRollId
//         } 
//     }
// `
// const getUserData = (client, callback) => {
//     client
//         .query({
//             query: queryUsers
//         })
//         .then(res => {
//             console.log("userData==",res);
//             callback(res)
//         })
// }


// const queryPriorityLevels = gql`
//     {
//         priorities {
//             id,
//             priorityname,
//         }
//     }
// `
// const getPriorities = (client, callback) => {
//     client.query({ query: queryPriorityLevels }).then(res => {
//         console.log('user_Query', res)
//         callback(res)
//     })
// }


// const queryTags = gql`
//     query allTags($companyId: Int!) {
//         allTags(companyId: $companyId) {
//             id,
//             tagTitle
//         }
//     }
// `
// const getTags = (client, callback) => {
//     client.query({ query: queryTags, variables: { companyId: 1 } }).then(res => {
//         console.log('queryTags_queryTags', res)
//         callback(res)
//     })
// }

// const queryLinkToRelated = gql`
//     {
//         tasksList {
//             id,
//             taskTitle
//         }
//     }
// `
// const getLinkToRelated = (client, callback) => {
//     client.query({ query: queryLinkToRelated }).then(res => {
//         console.log('getRelatedToLink', res)
//         callback(res)
//     })
// }
const Email = [
    {id: 1, icon: profile, title: "John Dan"},
    {id: 2, icon: profile, title: "John Doe"},
    {id: 3, icon: profile, title: "John pazos"},
    {id: 4, icon: profile, title: "Mark John"},
    {id: 5, icon: profile, title: "John Dan"},
    {id: 6, icon: profile, title: "John Doe"},
    {id: 7, icon: profile, title: "John pazos"},
    {id: 8, icon: profile, title: "Mark John"},
     
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
class CreateTaskBody extends Component {
    constructor(props) {
        super()
        this.state = {
            taskTitle: '',
            taskAssignTo: '',
            taskDescription: '',
            taskPriority: '',
            taskTags: [],
            taskrelatedRecord: '',
            taskLinkTo: '',
            taskisBillable: false,
            taskEmailCopyTo: '',
            taskStartDate: new Date(),
            taskDueDate: new Date(),
            taskEstimatedTime: '00:00',
            isSendCopy: false,
            followers: [],
            selecteIdTwo: '',
            usersData: '',
            priorityData: '',
            tagsData: '',
            followersData: '',
            linkToRelated: '',
            users:[],
            open: false,
            linkOpen: false,
            topen: false,
            selectedItems:[],
            isEditCompDtlsOpen: false,
            isShowDropdown: false,
            selectedPeople: [],
            selectedTeams:[],
            valueTab: 0,
            assignedToPeople:null,
            assignedToTeam:null,
            isEmailDropdown: false,
            teams:[],
            fDepartment: 'department',
            fTeam: 'team',
            fManager: 'manager',
            fAssignedTo: 'assignedTo',
        }


    }
    

    componentDidMount() {
        let client = this.props.client;
        
        //getUserData(client, usersData => this.setState({ usersData }));
        //getPriorities(client, priorityData => this.setState({ priorityData }));
        //getTags(client, tagsData => this.setState({ tagsData }));
        //getLinkToRelated(client, linkToRelated => this.setState({ linkToRelated }));
        this.fetchUsers();
    }
    fetchUsers = () => {
        const requestBody = {
            query: `
              query {
                getAllUsers {
                  id,
                  firstName,
                  lastName,
                  emailIs,
                  password,
                  userRollId,
                  companyId,
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
                let users = resData.data.getAllUsers;
                this.setState({ users: users });
            })
            .catch(err => {
                console.log(err);
            });
      };
      
    closeDrawerHandler =()=> this.props.thisObj.setState({ isOpenCreateTask: false });
    openEditCompDtlsOpen=()=> this.setState({ isEditCompDtlsOpen: true })
    chooseStartHandler = date => {
        this.setState({ taskStartDate: date })
    }
    toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        this.setState({ ...this.state, [side]: open });
      };

    chooseDueHandler = date => {
        this.setState({ taskDueDate: date })
    }

    onChange = taskEstimatedTime => {
        this.setState({ taskEstimatedTime })
    }
    taskEmailCopyTo = (e, index) => {
        this.setState({selecteIdTwo : index});
        
      
      }

    handleInputChange = (event) => {
        console.log(event.target.name, event.target.value);
        this.setState({ [event.target.name]: event.target.value })
    }

    selectMenuHandler = (event) => {
    }

    multipleHandleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    showDropdown=()=> {
        this.setState({ isShowDropdown: !this.state.isShowDropdown })
      }
      


    submitCreateTaskHandler = async (e) => {
        e.preventDefault();

        let requestBody = {
            query: `
              mutation addTask( 
                    $taskTitle: String!,
                    $assignTo: Int!
                    $taskDescription: String!, 
                    $priority: Int!,
                    $relatedTo: Int!,
                    $startTime: Date!,
                    $dueTime: Date!,
                    $billable: Boolean!,
                    $sendCopyTo: Int!,
                ) {
                    addTask(
                        taskTitle: $taskTitle, 
                        assignTo: $assignTo,
                        taskDescription: $taskDescription
                        priority: $priority,
                        relatedTo: $relatedTo,
                        startTime: $startTime,
                        dueTime: $dueTime,
                        billable: $billable,
                        sendCopyTo: $sendCopyTo,
                ) {
                    id,
                    taskTitle,

                }
              }
            `,
            variables: {
                taskTitle: this.state.taskTitle,
                assignTo: this.state.taskAssignTo ? this.state.taskAssignTo : 1,
                taskDescription: this.state.taskDescription,
                priority: this.state.taskPriority ? this.state.taskPriority : 1,
                // tags: this.state.taskTags,
                relatedTo: this.state.taskLinkTo ? this.state.taskLinkTo: 1,
                // linkWithTicket: this.state.taskLinkTo,
                startTime: this.state.taskStartDate ? this.state.taskStartDate : moment().format(),
                dueTime: this.state.taskDueDate ? this.state.taskDueDate : moment().format(),
                billable: this.state.taskisBillable ? this.state.taskisBillable : false,
                sendCopyTo: this.state.taskEmailCopyTo ? this.state.taskEmailCopyTo : 1,
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
            console.log("response==",res)
            if (res.status === 200) {
                return res
            }
        }).catch(err => {
            return err;
        });
        if (resData.status == 200) {
            // window.location.href = '/ticketlisting';
        } else {
            // window.location.href = '/createticket';
        }
        console.log("RESPONSE", resData);
    }

    handleAssignToOpenClose = (event) => {

        this.setState({ open: !this.state.open });
    };

    // handlePriorityOpenClose = () => {
    //     this.setState({ linkOpen: !this.state.linkOpen });
    // };


    teamHandleClickfunction = (e, index,name) => {
        this.setState({assignedToTeam : index});
        if(this.state.selectedTeams.includes(name)){}else{
        this.state.selectedTeams.push(index)
        this.state.selectedItems.push(name)
        }
      }
      
      peopleHandleClickfunction1 = (e, index,name) => {
        this.setState({[e.target.name] : index});
        if(this.state.selectedPeople.includes(name)){}else{
        this.state.selectedPeople.push(name)
        this.state.selectedItems.push(name)
        }
      
      }
    radioHandleChange = event => {
        this.setState(event.target.value);
      };
      
       tabHandleChange = (event, newValue) => {
        this.setState({valueTab: newValue});
      };
    handlePriorityOpenClose = () => {
        this.setState({ topen: !this.state.topen });
    };

    handleRelatedRecordOpenClose = () => {
        this.setState({ isRelatedRecord: !this.state.isRelatedRecord });
    }

    handleLinkToOpenClose = () => {
        this.setState({ isLinkToOpen: !this.state.isLinkToOpen });
    }

    handleEnterEmailOpenClose = () => {
        this.setState({ isEnterEmail: !this.state.isEnterEmail });
    }

    handleCheckBoxChange = (event) => {
        console.log(event.target.name, event.target.checked)
        this.setState({ [event.target.name]: event.target.checked })
    }
    showEmailDropdown=()=> {
        this.setState({ isEmailDropdown: !this.state.isEmailDropdown })
      }
      
quickHandleClick=(selectedObject) =>{
    //set selection to the value selected
    console.log("selection", selectedObject);
    this.setState({selected: selectedObject,ticketTitle:`${selectedObject.ticketPrefix}-${selectedObject.title}`,ticketDescription:selectedObject.ticketDescription,isQuickCreateDropdown:!this.state.isQuickCreateDropdown,quickTemplate:selectedObject.title})
    // this.setState({ });
  
  }

  sideList= side => (
            <div className="create-task-body-container">
                  {<EditCompanyDetails isEditCompDtlsOpen={this.state.isEditCompDtlsOpen} thisObj={this}/>}
                  <div className="create-task-close-icon" onClick={this.closeDrawerHandler}>
          <img src={closeCreateHabitIcon} alt='close-icon' />
        </div>
                <div className="create-task-body-left">


                    <div className="create-task-first-field-section">
                        <div className="create-task-title">
                            <div className="create-task-title-input-field">
                                <div className="create-task-title-img">
                                    {/* <SearchIcon /> */}
                                    <img src={TaskTitleImage}></img>
                                </div>
                                <InputBase
                                    name='taskTitle'
                                    placeholder="Task title"
                                    className="search-input"
                                    onChange={this.handleInputChange}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                                <img src={TaskTitleColorIcon}></img>
                            </div>
                        </div>


                        <div className="create-assign-to">
                            <div className="create-task-assign-field">
                                <FormControl>
                                    <InputLabel htmlFor="demo-controlled-open-select">Assign To</InputLabel>
                                    <div className="create-assign-to-menu-item">
                                        <Select
                                            name='taskAssignTo'
                                            open={this.state.open}
                                            onClose={this.handleAssignToOpenClose}
                                            onOpen={this.handleAssignToOpenClose}
                                            value={this.state.taskAssignTo}
                                            onChange={e => this.setState({ taskAssignTo: e.target.value })}
                                        >
                                            {
                                                this.state.usersData ? this.state.usersData.data.getAllUsers.map(user => {
                                                    return <MenuItem value={user.id} className="create-task-menu-list">
                                                        <img src={MenuItemImage}></img>
                                                        <div className="create-task-menu-list-name">
                                                            <p className="first-text">Assign To</p>
                                                            <p className="second-text">{user.firstName + ' ' + user.lastName}</p>
                                                        </div>
                                                    </MenuItem>
                                                }) : null
                                            }

                                        </Select>
                                    </div>
                                </FormControl>
                            </div>

                        </div>
                    </div>

                    <div className="create-task-text-area">
                        <TextareaAutosize value={this.state.taskDescription} onChange={e => this.setState({ taskDescription: e.target.value })} aria-label="minimum height" rows={3} placeholder="Task description" />
                    </div>

                    <div className="create-task-second-field-section">
                        <div className="create-task-priority">
                            <div className="create-task-priority-field">
                                <FormControl>
                                    <InputLabel htmlFor="demo-controlled-open-select">Priority</InputLabel>
                                    <div className="create-assign-to-menu-item">
                                        <Select
                                            name='taskPriority'
                                            open={this.state.topen}
                                            onClose={this.handlePriorityOpenClose}
                                            onOpen={this.handlePriorityOpenClose}
                                            value={this.state.taskPriority}
                                            onChange={e => this.setState({ taskPriority: e.target.value })} >
                                            {
                                                this.state.priorityData ? this.state.priorityData.data.priorities.map(priority => {
                                                    console.log('this.state.priorityData.data.priorities', priority)
                                                    return <MenuItem value={priority.id}>{priority.priorityname}</MenuItem>
                                                }) : <MenuItem value="low">No Priorities found</MenuItem>
                                            }
                                        </Select>
                                    </div>
                                </FormControl>
                            </div>

                        </div>

                        <div className="ct-multipleselect-container">
                            <FormControl className="">
                                <InputLabel htmlFor="select-multiple">Tags</InputLabel>
                                <div className="tags-multipleselect-menu-item">
                                    <Select
                                        multiple
                                        name='taskTags'
                                        value={this.state.taskTags}
                                        onChange={this.multipleHandleChange}
                                        input={<Input id="select-multiple" />}
                                    >
                                        {
                                            this.state.tagsData ? this.state.tagsData.data.allTags.map(tag => {
                                                return <MenuItem value={tag.id}>{tag.tagTitle}</MenuItem>
                                            }) : <MenuItem value="low">No tags found</MenuItem>
                                        }

                                        {/* <MenuItem value="risk">Risk</MenuItem>
                                <MenuItem value="criticalCustomer">Critical Customer</MenuItem>
                                <MenuItem value="phase1">Phase1</MenuItem>
                                <MenuItem value="serviceRequest">Service Request</MenuItem>
                                <MenuItem value="technical">Technical</MenuItem> */}
                                    </Select>
                                </div>
                            </FormControl>
                        </div>
                    </div>

                    <div className="create-task-third-field-section">
                        <div className="create-task-related-record">
                            <div className="create-task-related-record-field">
                                <FormControl>


                                    <InputLabel htmlFor="demo-controlled-open-select">Related record</InputLabel>

                                    <div className="create-assign-to-menu-item">

                                        <Select
                                            name='relatedRecord'
                                            open={this.state.isRelatedRecord}
                                            onClose={this.handleRelatedRecordOpenClose}
                                            onOpen={this.handleRelatedRecordOpenClose}
                                            value={this.state.relatedRecord}
                                            onChange={e => this.setState({ relatedRecord: e.target.value })}
                                        >
                                            <MenuItem value="1" className="create-task-menu-list">
                                                Ticket
                                </MenuItem>
                                            <MenuItem value="2" className="create-task-menu-list">
                                                Task
                                </MenuItem>
                                            <MenuItem value="3" className="create-task-menu-list">
                                                Project
                                </MenuItem>

                                            <MenuItem value="4" className="create-task-menu-list">
                                                Objectives
                                </MenuItem>
                                            <MenuItem value="5" className="create-task-menu-list">
                                                Key result
                                </MenuItem>
                                        </Select>
                                    </div>
                                </FormControl>
                            </div>

                        </div>




                        <div className="create-task-link">
                            <div className="create-task-link-field">
                                <FormControl>


                                    <InputLabel htmlFor="demo-controlled-open-select">Link to</InputLabel>

                                    <div className="create-assign-to-menu-item">

                                        <Select
                                            name='taskLinkTo'
                                            open={this.state.isLinkToOpen}
                                            onClose={this.handleLinkToOpenClose}
                                            onOpen={this.handleLinkToOpenClose}
                                            value={this.state.taskLinkTo}
                                            onChange={e => this.setState({ taskLinkTo: e.target.value })}
                                        >

                                            {
                                                this.state.linkToRelated && this.state.relatedRecord == 2 ? this.state.linkToRelated.data.tasksList.map(linkTo => {
                                                    return <MenuItem value={linkTo.id}>{linkTo.taskTitle}</MenuItem>
                                                }) : <MenuItem value="1">No related records found</MenuItem>
                                            }
                                            {/* <MenuItem value="small" className="create-task-menu-list">
                                   Small
                                </MenuItem>
                                <MenuItem value="medium" className="create-task-menu-list">
                                    Medium
                                </MenuItem>
                                <MenuItem value="large" className="create-task-menu-list">
                                   Large
                                </MenuItem> */}
                                        </Select>
                                    </div>
                                </FormControl>
                            </div>

                        </div>

                    </div>
                    <div className='create-task-date-range-container'>
                        <div className='create-task-date-picker-container'>
                            <div className='create-task-calender-icon-date-container'>
                                <DatePicker onChange={this.chooseStartHandler} value={this.state.startDate} clearIcon={null} />
                                <div className='label-date-container'>
                                    <p>Start date & Time</p>
                                    <p>{moment(this.state.taskStartDate).format("MMM DD, YYYY")}</p>
                                    <p>{moment(this.state.taskStartDate).format("hh:mm A")}</p>
                                </div>
                            </div>
                        </div>
                        <img className='start-end-date-seperator' src={featherChevronRight} alt='' />
                        <div className='create-task-date-picker-container'>
                            <div className='create-task-calender-icon-date-container'>
                                <DatePicker onChange={this.chooseDueHandler} value={this.state.dueDate} clearIcon={null} />
                                <div className='label-date-container'>
                                    <p>Due date & Time</p>
                                    <p>{moment(this.state.taskDueDate).format("MMM DD, YYYY")}</p>
                                    <p>{moment(this.state.taskDueDate).format("hh:mm A")}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="create-task-time-picker-section">
                        <div className="create-task-time-picker">
                            <img src={CreateTaskTimeIcon}></img>
                            <p>Estimated Time</p>
                            <TimePicker
                                onChange={this.onChange}
                                value={this.state.taskEstimatedTime}
                            />
                        </div>
                        <div className="create-task-billable">
                            <Checkbox
                                value="checkedB"
                                name='taskisBillable'
                                color="primary"
                                onChange={this.handleCheckBoxChange}
                            />
                            <span>Billable</span>
                        </div>
                    </div>

                    <div className="create-task-attachment-container">
                        <p>ATTACHMENTS</p>
                        {/* <div className="create-task-attachment-container-field">
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                            <p>Drag attach file.</p>
                            <p>or <span>browse</span></p>
                        </div> */}
                        <div className="create-task-custom-file-upload">
                            <Button>
                                <input type="file" className="custom-file-input" id="inputGroupFile01" />
                            </Button>
                            <div className="create-task-custom-file-label-upload-image-icon">
                                <img src={AttachmentAddIcon}></img>
                                <p className="create-task-custom-file-label-upload-text-one">Drag attach file.</p>
                                <p className="create-task-custom-file-label-upload-text-two">or <span>browse</span></p>
                            </div>

                            <label className="create-task-custom-file-label-upload" htmlFor="inputGroupFile01">

                            </label>
                        </div>
                    </div>

                    <div className="create-task-break-for-submit-section"></div>
                    <div className="create-task-save-template-submit-button">
                        <Button variant="outlined" color="primary" className="" onClick={this.submitCreateTaskHandler}>
                            Submit
                            {/* <span><img src={RegistrationButtonIcon}></img></span> */}
                        </Button>
                    </div>

                </div>

                <div className="create-task-body-right">
                {this.state.users.map(user=>{
                    return<div className="create-task-company-details">
                   
                        <div className="create-task-company-description">
                            <img src={CompanyLogo}></img>
                            <div className="create-task-company-text">
                                

                               
                                <p className="create-task-company-text-one">{user.companyId}</p>
                                <p className="create-task-company-text-two">short description</p>
                           
                            </div>
                            <div className="create-task-company-details-edit">
                            <img src={CompanyEditIcon} onClick={this.openEditCompDtlsOpen}></img>
                            </div>
                        </div>
                        
                        <div className="create-task-department-and-team-name">
                            <p>{user.departmentId}</p>
                            <p className="create-task-team-name">Team Name</p>
                        </div>
                        
                    </div>
 })}

                  <div className='menu-taskcontainer'>
                        <div className={`dropdown-menu-taskcontainer ${this.state.isShowDropdown ? 'open-dropdown' : 'close-dropdown'}`}>
                          <Tabs value={this.state.valueTab} onChange={this.tabHandleChange} aria-label="simple tabs example">
                              <Tab label="Teams"/>
                              <Tab label="People"/>
                            </Tabs>
                              <TabPanel value={this.state.valueTab} index={0}>
                                <div className="tab-panel-taskcontainer-search-bar d-flex">
                                  <InputBase
                                    placeholder="Search teams"
                                    className="search-input"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                                <SearchIcon />
                                </div>
                              
                                <div className="tab-panel-taskcontainer">
                                <Scrollbars className="custom-taskscroll" style={{height: 130 }}>
                                    { this.state.teams.map((team, index)=>(

                                            <div className="tab-taskpanel-one d-flex justify-space-between">
                                              <div className="tab-taskpanel-one-img d-flex justify-content-center align-items-center">
                                                <img src={profile}></img>
                                                <p className="assign-to-taskprofile-name">{team.teamName}</p>
                                              </div>
                                              <Radio
                                                  checked={this.state.assignedToTeam === team.id}
                                                  onChange={(e) => this.teamHandleClickfunction(e, team.id,team.teamName)}
                                                  value=""
                                                  name="radio-button-demo"
                                                  color="primary"
                                                  inputProps={{ 'aria-label': '' }}
                                                />
                                            </div>
                                            ))
                                    }
                                  </Scrollbars>
                                  </div>
                              </TabPanel>
                            
                          
                          <TabPanel value={this.state.valueTab} index={1}>
                              <div className="tab-taskpanel-container-search-bar d-flex">
                                  <InputBase
                                      placeholder="Search people"
                                      className="search-input"
                                      inputProps={{ 'aria-label': 'search' }}
                                  />
                                  <SearchIcon />
                              </div>
                              <div className="tab-taskpanel-container">
                                <Scrollbars className="custom-taskscroll" style={{height: 130 }}>
                                    { this.state.users.map((user, index)=>(

                                            <div className="tab-taskpanel-one d-flex justify-space-between">
                                              <div className="tab-taskpanel-one-img d-flex justify-content-center align-items-center">
                                                <img src={profile}></img>
                                                <p className="assign-to-taskprofile-name">{user.firstName}</p>
                                              </div>
                                              <Radio
                                                  checked={this.state.assignedToPeople === user.id}
                                                  onChange={(e) => this.peopleHandleClickfunction1(e, user.id,user.firstName)}
                                                  value=""
                                                  name="assignedToPeople"
                                                  color="primary"
                                                  inputProps={{ 'aria-label': '' }}
                                                />
                                            </div>
                                            ))
                                    }
                                  </Scrollbars>
                                  </div>
                          </TabPanel>
                        </div>
                      <div className='custome-non-tasklibrary-multi'>
                        <div className='selected-item-taskcontainer'>
                        <p className="create-drop-taskassign-to">Assign To</p>
                              {this.state.selectedItems.map( item=>
                                    <div className='selected-taskitem-template d-flex'>
                                      <img src={profile} />
                                      <div>
                                          <p className="create-drop-taskprofile-name">{item}</p>
                                      </div>
                                    </div>
                                  )}
                        </div>
                        <img src={DropDwnIcon} onClick={this.showDropdown}/>
                      </div>

                      </div>
                      

                    <div className="create-task-email-section">
                        <div className="email-section-check-box">
                            <Checkbox
                                name='isSendCopy'
                                value="checkedB"
                                color="primary"
                                onChange={this.handleCheckBoxChange}
                            />
                            <span>Send a copy</span>
                        </div>
                        <div className="create-ticket-drawer-email">
                      <div className='menu-container'>

                  <div className='create-ticket-email'>
                      <div className='selected-item-container'>
                        <img src={CreateEmailIcon} alt=""></img>
                        <p >EMAIL</p>
                      </div>
                      <div className="email-drp-dwn-img">
                        <img src={DrpDwnIcn} onClick={this.showEmailDropdown}/>
                      </div>
                      
                    </div>
                    <div className={`dropdown-menu-container ${this.state.isEmailDropdown ? 'open-dropdown' : 'close-dropdown'}`}>
                        <Scrollbars className="custom-scroll" style={{height: 150 }}>
                        {this.state.usersData && this.state.isSendCopy ? this.state.usersData.data.getAllUsers.map((icon,index) => {
                                                if (icon.id !== this.state.taskAssignTo) {
                                  return<StyledMenuItem className="customized-ticket-source" onClick={()=> this.quickHandleClick(icon)} onClose={this.handleClose}>
                                    <div className="create-ticket-one-email d-flex">
                                      <div className="create-ticket-email-img-text d-flex">
                                          
                                        <img src={icon.icon}></img>
                                        <p value={icon.id}>{icon.firstName}</p>
                                      </div>
                                        
                                      <div className="create-ticket-email-radio">
                                        <Radio
                                          checked={this.state.selecteIdTwo === index}
                                          onChange={(e) => this.taskEmailCopyTo(e, index)}
                                           value={this.state.taskEmailCopyTo}
                                          name='taskEmailCopyTo'
                                          color="primary"
                                          inputProps={{ 'aria-label': '' }}
                                          className="email-radio-button"
                                        />
                                      </div>
                                    </div>
                                    
                                  </StyledMenuItem>
                               
                            }
                        }): <MenuItem className="create-task-menu-list">Please enable the check box</MenuItem>
                        }
                        </Scrollbars>
                    </div>

              </div>
                      {/* <FormControl required className="">
                              <InputLabel htmlFor="email">Email</InputLabel>
                        
                              <Select
                              value={this.state.email}
                              onChange={this.changeHandler}
                              name="email"
                              inputProps={{
                                  id: 'age-required',
                              }}
                              className=""
                              >
                                {
                                  this.state.users.map(user=>{
                                  return <MenuItem value={user.emailIs}>{user.emailIs}</MenuItem>
                                  })
                                }
                              </Select>
                              
                      </FormControl> */}
                      </div>
                        {/* <div className="create-task-enter-email">
                            <FormControl>


                                <InputLabel htmlFor="demo-controlled-open-select">Enter email</InputLabel>

                                <div className="create-assign-to-menu-item">

                                    <Select
                                        name='taskEmailCopyTo'
                                        open={this.state.isEnterEmail}
                                        onClose={this.handleEnterEmailOpenClose}
                                        onOpen={this.handleEnterEmailOpenClose}
                                        value={this.state.taskEmailCopyTo}
                                        onChange={e => this.setState({ taskEmailCopyTo: e.target.value })}
                                    >
                                        {
                                            this.state.usersData && this.state.isSendCopy ? this.state.usersData.data.getAllUsers.map(user => {
                                                if (user.id !== this.state.taskAssignTo) {
                                                    return (
                                                        <MenuItem value={user.id} className="create-task-menu-list">
                                                            {user.firstName}
                                                        </MenuItem>
                                                    )
                                                }
                                            }) : <MenuItem className="create-task-menu-list">Please enable the check box</MenuItem>
                                        }

                                    </Select>
                                </div>
                            </FormControl>
                        </div> */}
                    </div>

                    <div className="create-task-followers-section">
                        <div className="followers-section-check-box">
                            <Checkbox
                                value="checkedB"
                                color="primary"
                            />
                            <span>Followers</span>
                        </div>
                        <div className="create-task-followers-input">
                            <FormControl className="">
                                <InputLabel htmlFor="select-multiple">Followers</InputLabel>
                                <div className="followers-multipleselect-menu-item">
                                    <Select
                                        multiple
                                        value={this.state.followers}
                                        onChange={this.multipleHandleChange}
                                        input={<Input id="select-multiple" />}
                                    >
                                        {
                                            this.state.followersData.length > 0 ? this.state.followersData.map(tag => {
                                                return <MenuItem value={tag.id}>{tag.tagTitle}</MenuItem>
                                            }) : <MenuItem value="low">No Followers Found</MenuItem>
                                        }

                                        {/* <MenuItem value="risk">Risk</MenuItem>
                                        <MenuItem value="criticalCustomer">Critical Customer</MenuItem>
                                        <MenuItem value="phase1">Phase1</MenuItem>
                                        <MenuItem value="serviceRequest">Service Request</MenuItem>
                                        <MenuItem value="technical">Technical</MenuItem> */}
                                    </Select>
                                </div>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </div>
            
        )
        
  render() {
    return (
      <Drawer anchor="right" open={this.props.isOpenCreateTask}onClose={this.toggleDrawer('right', false)} className='create-ticket-drawer'>
        {this.sideList('right')}
      </Drawer>
    )
  }
    
}
export default CreateTaskBody;
