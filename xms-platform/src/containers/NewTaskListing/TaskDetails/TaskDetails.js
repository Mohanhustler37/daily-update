import React, { Component } from 'react';
import "./TaskDetails.scss";
import MainLayout from '../../../containers/MainLayout/MainLayout';
import NewTaskCollapsable from '../../../containers/NewTaskListing/NewTaskCollapsable/NewTaskCollapsable';
import Header from '../../../containers/Header/Header';
import TaskDetailsSubHeader from './TaskDetailsSubHeader';
import LeftArrow from '../../../assets/icons/assets_Task list_2019-11-20/Task details/right.svg';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AttachIcn from "../../../assets/icons/assets_Task list_2019-11-20/Task details/attachment.svg";
import SubTskIcon from "../../../assets/icons/assets_Task list_2019-11-20/Task details/open-task.svg";
import ReportIcon from "../../../assets/icons/assets_Task list_2019-11-20/Task details/report-problem.svg";
import FavoriteIcn from "../../../assets/icons/assets_Task list_2019-11-20/Task details/star-outline.svg";
import ReturnIcon from "../../../assets/icons/assets_Task list_2019-11-20/Task details/subdirectory-arrow-right.svg";
import NotificatiponIcon from "../../../assets/icons/assets_Task list_2019-11-20/Task details/notifications-outline.svg";
import history from "../../../Routes/history";
import ChatImg from '../../../assets/icons/chat/metro-attachment.svg';
import ChatMoreEllipsis from "../../../assets/icons/chat/awesome-ellipsis-h.svg";
import BottomLeft from "../../../assets/icons/chat/bottom-left.svg";
import More1 from "../../../assets/icons/chat/more-1.svg";
import More2 from "../../../assets/icons/chat/more-2.svg";
import More3 from "../../../assets/icons/chat/more-3.svg";
import More4 from "../../../assets/icons/chat/more-4.svg";
import More5 from "../../../assets/icons/chat/more-5.svg";
import More6 from "../../../assets/icons/chat/more-6.svg";
import More7 from "../../../assets/icons/chat/more-7.svg";
import More8 from "../../../assets/icons/chat/more-8.svg";
import TextareaAttach from "../../../assets/icons/chat/Icon metro-attachment-2.svg";
import TextareaSmileIcon from "../../../assets/icons/chat/Icon material-tag-faces.svg";
import Profile from "../../../assets/profile.png";
import Profile1 from "../../../assets/icons/01-10-2019/attachmentProfile1.jpg";
import Profile2 from "../../../assets/icons/01-10-2019/attachmentProfile2.jpg";
import AttachmentAddIcon from "../../../assets/icons/01-10-2019/Icon feather-plus-circle.svg";
import metroFileIcon from "../../../assets/icons/01-10-2019/Icon metro-attachment.svg";
import groupIcon from "../../../assets/icons/SVG/Group 11509.svg";
import Group11420 from "../../../assets/icons/SVG/Group 11420.svg";
import Group11519 from "../../../assets/icons/SVG/Group 11519.svg";
import IconLinkimg from "../../../assets/icons/SVG/Icon-link.svg";
import profileIcon from "../../../assets/profile.png";
import decrementIcon from "../../../assets/icons/SVG/Group 11399.svg";
import dropdownIcon from '../../../assets/icons/create-ticket/Icon feather-chevron-down.svg';
import tickIcon from '../../../assets/icons/01-10-2019/Icon feather-check.svg';
import Checkbox from '@material-ui/core/Checkbox';
import drpdwnprofile from "../../../assets/images/profile.png";
import { getAllStatus1, getAllUsers } from "../NewTaskListingQuery";
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import removeAttachedFile from '../../../assets/icons/create-ticket/Group 11407.svg'
import dpfIcon from '../../../assets/icons/SVG/337946.png'
import axios from "axios";
import { baseUrl } from "../../../constants";
import EditIcon from "../../../assets/icons/task/Group 11531.svg";
import DeleteIcon from "../../../assets/icons/task/DeleteIcon.svg";
import Modal from '@material-ui/core/Modal';
import TskRmdrCls from "../../../assets/icons/assets_Task list_2019-11-20/Tsk_lst_tgs/Icon ionic-ios-close.svg";
import TskRmdrCal from "../../../assets/icons/assets_Task list_2019-11-20/Tsk_lst_tgs/Icon metro-calendar.svg";
import moment from 'moment';
import AddRmdrIcn from '../../../assets/icons/assets_Task list_2019-11-20/Tsk_lst_tgs/Icon feather-plus.svg';
import { Scrollbars } from 'react-custom-scrollbars';
import DatePicker from 'react-date-picker';

let wrapperRef;

const fileIcons = [{ pdf: dpfIcon }]
const imageFormats = ['jpg', 'jpeg', 'jpg', 'bmp', 'png', 'svg'];

const quickCreateIcons = [
    {id: 0, icon: '', title: 'email'},
    {id: 1, icon: '', title: 'sms'},
  ]
const TaskButtons = [
    { id: 0, title: 'Attach', icon: AttachIcn },
    { id: 1, title: 'Sub task', icon: SubTskIcon },
    { id: 2, title: 'Report a Challenge', icon: ReportIcon }
]

// const TaskIcons = [
//     { id: 0, icon: FavoriteIcn },
//     { id: 1, icon: ReturnIcon },
//     { id: 2, icon: NotificatiponIcon }

// ]
const QuickCreateIcons = []

// const User = [
//     {id:0, title1:"ASSIGN", title2:"TO"},
//     {id:0, title1:"REPORTER"}
// ]
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

const users = [
    { id: 0, firstName: "john", lastName: "Doe", profile: "drpdwnprofile" },
    { id: 1, firstName: "Ryan", lastName: "Pazos", profile: "drpdwnprofile" },
    { id: 2, firstName: "john", lastName: "Doe", profile: "drpdwnprofile" },
    { id: 3, firstName: "Ryan", lastName: "Pazos", profile: "drpdwnprofile" },
    { id: 4, firstName: "john", lastName: "Doe", profile: "drpdwnprofile" },
    { id: 5, firstName: "Ryan", lastName: "Pazos", profile: "drpdwnprofile" }
]
let clientData = '';

let time = ['12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM']

class TaskDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textMessage: "",
            assignToSelection: [],
            isShowAssignToDrop: false,
            isShowReporterDrop: false,
            users: [],
            statusApiData: [],
            isShowstatusDrop: false,
            statusSelectedId: '',
            sName: 'IN PROGRESS',
            sNameData: false,
            attachedFiles: [],
            taskRmdrPopId: null,
            DependencyPopId: null,
            isShowPopup1Clone: false,
            reminder: [],
            assignedUser: 0,
            allStatus: [],
            allTags: [],
            modalOpen: false,
            addRmdrModalOpen: false,
            id:null,
            reminderData:[]
        }
    }
    handleOpen = (title,id) => {
        this.setState({
            modalOpen: !this.state.modalOpen,
            isShowTaskRemainderModal: true,
            taskRmdrPopId: title,
            id:id
        });
      };
      handleClose = () => {
        this.setState({ isShowTaskRemainderModal: false, addRmdrModalOpen: false, listRmdrModalOpen: false, modalOpen: false });
    };

    addRmdrOpen = async (title,id) => {
        // this.setState({ isShowAddRemainderPopup: true })  
        this.setState({
            addRmdrModalOpen: !this.state.addRmdrModalOpen,
            isShowTaskRemainderModal: false,
            taskRmdrPopId: title,
            id:id

        });
    };

    listRmdrOpen = async (title,id) => {
        // this.setState({ isShowAddRemainderPopup: true })  
        this.setState({
            listRmdrModalOpen: !this.state.listRmdrModalOpen,
            addRmdrModalOpen: false,
            taskRmdrPopId: title,
            id:id
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
    listRmdrOpen = async (taskList,id) => {
        // this.setState({ isShowAddRemainderPopup: true })  
        this.setState({
            listRmdrModalOpen: !this.state.listRmdrModalOpen,
            addRmdrModalOpen: false,
            taskRmdrPopId: taskList,
            id:id
        });
        let requestBody = {
            query: `
                mutation addReminder(
                    $reminderTitle:String,
                    $reminderDependecyId: Int,
                    $reminderType: String,
                    $reminderTime: JSON,
                    $reminderFor: String
                  ) 
                  {
                    addReminder(
                        reminderTitle:$reminderTitle
                        reminderDependecyId: $reminderDependecyId,
                        reminderType:$reminderType,
                        reminderTime:$reminderTime,
                        reminderFor:$reminderFor
                      )
                      {
                        id,
                        reminderTitle
                        reminderDependecyId,
                        reminderType,
                        reminderTime,
                        reminderFor
                      }
                  }
              `,
            variables: {
                reminderTitle: this.state.taskRmdrPopId,
                reminderDependecyId: this.state.id,
                reminderType:this.state.reminderType,
                reminderTime:this.state.fromDate,
                reminderFor:"tasks"
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
      
      };
      
      deletereminder=(id)=>{
          
        this.setState({ismanagerPopUp:true})
        let requestBody = {
            query: `
                mutation removereminder(
                    $id:Int
                  ) 
                  {
                    removereminder(
                        id:$id
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
                id:id,
            }
          };
      
          let resData =  axios({
            method: 'post',
            url: baseUrl.server,
            data: requestBody,
            headers: {
              'Content-type': 'application/json'
            }
          }).then(res => {
            // reminderData
            this.arrayRem = this.state.reminderData
            if(this.arrayRem.length!=0){
                let index = this.arrayRem.indexOf(res.data.removereminder)
                this.arrayRem.splice(index,1);
            }
            this.setState({reminderData:this.arrayRem})
            return res
          }).catch(err => {
            return err;
          });
    
    
    }

    openEditCompDtlsOpen = (e) => {
        e.stopPropagation()
        this.setState({ isEditCompDtlsOpen: true })
    }
        fetchReminder = () => {
        const requestBody = {
            query: `
          query remonderList
             {
                remonderList{
              id,
              reminderType,
              reminderTitle,
              reminderTime,
              reminderDependecyId
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
    componentDidMount() {
        const token = localStorage.getItem('jwtToken');
        if (token === null || token === undefined || token === '') {
            history.push('/');
        }
        clientData = this.props.client;
        this.getAllStatusData();
        this.getAllUsersData();
        this.fetchReminder();
    }

    getAllStatusData = () => {
        const client = this.props.client;
        getAllStatus1(client, data => {
            this.setState({ statusApiData: data.data.getAllStatus })
        });

    }
    getAllUsersData = () => {
        getAllUsers(clientData, data => {
            this.setState({ userApiData: data })
        })
    }
    fetchReminder = () => {
        const requestBody = {
            query: `
          query remonderList
             {
                remonderList{
              id,
              reminderType,
              reminderTitle,
              reminderTime,
              reminderDependecyId
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

    handleChangeStatus = (event, sdata) => {
        this.setState({
            statusSelectedId: event.target.value,
            sName: sdata.statusName,
            sNameData: true,
            isShowstatusDrop: false
        });
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

    taskRemainderModelBody =(task,id)=> {
        return (
            <div className="tsk-rmdr-section">
                <div className="tsk-rmdr-hdr-nm-cls-icn d-flex justify-space-between">
                    <p className="tsk-rmdr-hdr-txt">TASK REMAINDERS</p>
                    <img src={TskRmdrCls} alt="" className="tsk-rmdr-cls-icn" onClick={this.handleClose}></img>
                </div>
                <div className="tsk-rmdr-daly-stnd-mtng d-flex align-items-center">
                    <p className="tsk-rmdr-tak">Task:</p><span className="tsk-rmdr-tak-daly-std">{this.state.taskRmdrPopId}</span>
                </div>
                <div className="tsk-rmd-cal-txt-btn d-flex justify-content-center align-items-center flex-column">
                        <img src={TskRmdrCal} alt="cal" className="tsk-rmdr-cal"></img>
                        <p className="no-rmdr-txt">NO REMAINDERS</p>
                        <p className="no-rmdr-tsk">There are no remainders on this task yet</p>
                        <Button className="tsk-rmd-add-rmd" onClick={() => this.addRmdrOpen(this.state.taskRmdrPopId,this.state.id) }>Add Remainders</Button>
                    </div>
                </div>
    
            )
        }
        addRemainderModalBody = (tasksList,id) => {
            return (
                <div className="tsk-rmdr-section">
                    <div className="tsk-rmdr-hdr-nm-cls-icn d-flex justify-space-between">
                        <p className="tsk-rmdr-hdr-txt">TASK REMAINDERS</p>
                        <img src={TskRmdrCls} alt="" className="tsk-rmdr-cls-icn" onClick={this.handleClose}></img>
                    </div>
                    <div className="tsk-rmdr-daly-stnd-mtng d-flex align-items-center">
                        <p className="tsk-rmdr-tak">Task:</p><span className="tsk-rmdr-tak-daly-std" >{this.state.taskRmdrPopId}</span>
                    </div>
                    <div>
                        <div className='tsk-rmdr-assignTo-dropdown-container'>
                            <div className='tsk-rmdr-assignTo-non-library-dropdown'>
                                <div className='tsk-rmdr-selected-item-container'>
                                    {this.state.assignToSelection.length == 0 ? 'Task Remainder' :
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
                        <Button className="tsk-rmd-add-rmd-btn" onClick={() => this.listRmdrOpen(this.state.taskRmdrPopId,this.state.id)}>Add Remainder</Button>
                    </div>
                </div>
            )
        }
    
      
      listOfTskRemainders=(tasksList,id)=> {
        return(
          <div className="tsk-rmdr-section">
          <div className="tsk-rmdr-hdr-nm-cls-icn d-flex justify-space-between">
              <p className="tsk-rmdr-hdr-txt">TASK REMAINDERS</p>
              <img src={TskRmdrCls} alt="" className="tsk-rmdr-cls-icn" onClick={this.handleClose}></img>
          </div>
          <div className="tsk-rmdr-daly-stnd-mtng d-flex align-items-center">
              <p className="tsk-rmdr-tak">Task:</p><span className="tsk-rmdr-tak-daly-std">{this.state.taskRmdrPopId}</span>
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
                this.state.reminderData ? this.state.reminderData.map(users => {
                 if(users.reminderDependecyId== this.state.id){
                      return <div className="users-who-whn-hw d-flex">
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
        let { textMessage } = this.state;
        const taskDataProps = this.props.location.state.taskData ? this.props.location.state.taskData : null;
        return (
            <div className="tsk-dtls-bdy-cmpnnt">
                <div className="hdr-sb-hdr-sctn">
                    <Header />
                    <TaskDetailsSubHeader />
                </div>
                <div className="tsk-dtls-body-cmpnnt">
                    <div className="tsk-dtls-body-cmpnnt-left">
                        <div className="tsk-dtls-body-cmpnnt-left-scroll-container">
                            <div className="tsk-dtls-bcklg-prjt-nm d-flex">
                                <div className="tsk-dtls-rgt-bcklg d-flex justify-space-between">
                                    <Link to="/tasks">
                                        <img className="left-arrw-icn" src={LeftArrow} alt="leftArrow"></img>
                                        <label className="tsk-dtls-bck-lst">BACK TO LIST</label>
                                    </Link>
                                </div>
                                <label className="tsk-dtls-prjt-nm">
                                    {
                                        taskDataProps.projectId != null ?
                                            this.state.projectsApiData ? this.state.projectsApiData.map(data => {
                                                if (this.props.location.state.taskData.projectId == data.id) {
                                                    return <p>
                                                        {data.projectName}
                                                    </p>
                                                }
                                            }) : "PROJECT NAME" : "PROJECT NAME"
                                    }
                                </label>
                                <label className="tsk-dtls-phs">
                                    {
                                        taskDataProps.tags ? taskDataProps.tags[0] : "TAGS"
                                    }
                                </label>
                                <label className="tsk-dtls-du">2 DAYS DUE</label>
                            </div>
                            <div className="tsk-dtls-rgstn-prcss-txt">
                                <p>{this.props.location.state.taskData.taskTitle}</p>
                            </div>
                            <div className="crtcl-atch-sb-tsk-rprt-chlng-btn-sctn">
                                <div className="tsk-atch-tsk-rprt-btn d-flex justify-space-between">
                                    <Button className="crtcl-btn">
                                        {
                                            taskDataProps.tags ? taskDataProps.tags[0] : "TAGS"
                                        }
                                    </Button>
                                    {
                                        TaskButtons.map(tasks => (
                                            <Button className="atch-sb-tsk-rprt d-flex"><img className="atch-sb-tsk-rprt-icns" src={tasks.icon}></img><label>{tasks.title}</label></Button>
                                        ))
                                    }

                                </div>
                                <div className="fav-bck-ntfctn-icn">
                                    {/* {
                                        TaskIcons.map(icon => (
                                            <img src={icon.icon} alt="icons"></img>
                                        ))
                                    } */}
                                    <img src={FavoriteIcn}></img>
                                    <img src={ReturnIcon}></img>
                                    <img src={NotificatiponIcon} onClick={()=>this.handleOpen(this.props.location.state.taskData.taskTitle,this.props.location.state.taskData.id)} ></img>
                                </div>
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
                            <div className="tsk-dtls-dscrtn">
                                <h3 className="tsk-dtls-dscrptn-hdr">DESCREPTION</h3>
                                <p className="tsk-dtls-dscrptn-txt">
                                    {this.props.location.state.taskData ? this.props.location.state.taskData.taskDescription : ""}
                                </p>
                                <h4 className="tsk-dtls-dscrptn-qus">Where does it comes from?</h4>
                                <p className="tsk-dtls-dscrptn-txt">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                                    ever since the 1500s.</p>
                                <ul class="tsks-dtls-in-lst">
                                    <li className="tsk-dtls-dscrptn-txt">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,
                                        making it over 2000 years old.
                                        </li>
                                    <li className="tsk-dtls-dscrptn-txt">
                                        here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected
                                        humour, or randomised words which don't look even slightly believable.
                                        </li>
                                </ul>
                                <p className="atch-anmtn-gudlns">Find the below attached image for the animation guidelines in the list view</p>
                               
                            </div>
                            <div className="detailstaskattachment">
                                <div className='task-details-attachment'>
                                    <span>Attachments</span>
                                    <div className={`td-attached-files-container ${!this.state.attachedFiles ? 'align-center' : 'space-equaly '}`}>
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
                                    <div className={`task-details-file-upload-field ${ this.state.attachedFiles.length === 0 ? 'preButtonStyle' : 'postButtonStyle' } `} >
                                        <Button className='task-details-file-attach-button'>
                                            <input
                                            type='file'
                                            className="custom-attach-file-input"
                                            // className="custom-attach-file-input "
                                            id="inputGroupFile01"
                                            onChange={this.fileAttachmentHandler}
                                            multiple={true}
                                            />
                                            <p className="drag-attach-text">Drag & drop to attach a file, <br />or <span>click to choose</span></p>
                                        </Button>
                                        </div>                  
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sectionfortaskcomment">
                                <div className="textAreaSection">
                                    <div className="insidethecomment">
                                        <span className="more-icon d-flex align-items-center justify-content-center">
                                            <img className="profileimgcommenttask" src={Profile} alt="ChatMoreEllipsis"></img>

                                        </span>
                                        <div>
                                            <textarea value={textMessage} onChange={event => this.setState({ textMessage: event.target.value })} placeholder='Add a comment' />
                                        </div>
                                        <span className="more-icon d-flex align-items-center justify-content-center">
                                            <img src={ChatMoreEllipsis} alt="ChatMoreEllipsis"></img>
                                        </span>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="tsk-dtls-body-cmpnnt-right">
                        <div className="task-details-inner-container">

                            <div className='right-section-task-assign-dropdown-field' >
                                <div className='task-status-dropdown-container'>
                                    <p className="task-status-text">STATUS</p>
                                    <div className='task-status-library-dropdown'
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            this.setState({
                                                isShowstatusDrop: !this.state.isShowstatusDrop,
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
                                        }}
                                    >
                                        <div className='task-status-selected-item-container'>
                                            <img src={tickIcon} alt="tickIcon" className="tick-icon-img"></img>
                                            {/* <p className="in-progress-text" >IN PROGRESS</p> */}
                                            {
                                                this.state.sNameData == false && this.props.location.state.taskData.statusId != null ?
                                                    this.state.statusApiData ? this.state.statusApiData.map((data, index) => {
                                                        if (this.props.location.state.taskData.statusId == data.id) {
                                                            return <p className="in-progress-text">{data.statusName}</p>
                                                        }
                                                    }) : <p className="in-progress-text">{this.state.sName}</p> : <p className="in-progress-text">{this.state.sName}</p>
                                            }
                                            {/* 
                                            {
                                                this.state.sNameData == false && this.props.location.state.taskData.statusId != null ?
                                                    this.state.statusApiData ? this.state.statusApiData.map((data, index) => {
                                                        if (this.props.location.state.taskData.statusId == data.id) {
                                                            return <p className="in-progress-text" >{data.statusName}</p>
                                                        }
                                                    }) : <p>{this.state.sName}</p> : <p>{this.state.sName}</p>
                                            } 
                                            */}
                                        </div>
                                        <img className='task-status-list-drop-toggler'
                                            src={dropdownIcon} alt='dropdownIcon'
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                this.setState({ isShowstatusDrop: !this.state.isShowstatusDrop })
                                            }}
                                        />
                                    </div>

                                    {/* <div className={`task-status-custome-dropdown-menu-container ${this.state.isShowstatusDrop ? 'task-status-custome-open-dropdown zIndex' : 'task-status-custome-close-dropdown'}`} ref={this.setWrapperRef} >
                                        <div className='task-status-to-list-container'> */}
                                    {/* {
                                                this.state.statusApiData != null || this.state.statusApiData != undefined ?
                                                    this.state.statusApiData.map(status => {
                                                        return (
                                                            <div className='task-status-to-item'>
                                                                <div className='task-status-item-avatar'>
                                                                    <img src={drpdwnprofile} alt='drpdwnprofile' />
                                                                    <span>{status.statusName}</span>
                                                                    <Radio className='task-status-item-checkbox'
                                                                        name='assignToChecked'
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        this.assignToCheck(assignTo)
                                                                    }}
                                                                    checked={this.state.assignToSelection.includes(assignTo)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    }) : null
                                            } */}

                                    {/* {this.state.statusApiData ? this.state.statusApiData.map((sData, index) =>
                                                <StyledMenuItem className="customized-ticket-source"
                                                    onClose={this.handleClose}
                                                >
                                                    <div className="create-ticket-one-tckt-typ d-flex">
                                                        <div className="create-ticket-tckt-img-text d-flex">
                                    
                                                            <p>{sData.statusName}</p>
                                                        </div>

                                                        <div className="create-ticket-src-radio">
                                                            <Radio
                                                                checked={sData.id == this.state.statusSelectedId}
                                                                value={sData.id}
                                                                name="ticketTypeId"
                                                                color="primary"
                                                                inputProps={{ 'aria-label': '' }}
                                                                onChange={(e) => this.handleChangeStatus(e, sData)}
                                                            />
                                                        </div>
                                                    </div>

                                                </StyledMenuItem>
                                            ) : null}
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            <div className='right-section-task-assign-dropdown-field-one'>
                                <div className='task-assign-dropdown-container'>
                                    <p className="task-assign-text">ASSIGN TO</p>
                                    <div className='task-assign-library-dropdown'>
                                        <div className='task-assign-selected-item-container'>

                                            <div className='task-assign-selected-item-template'>
                                                <img id='avathar-image' src={profileIcon} alt='profileIcon' />
                                                <span>
                                                    {
                                                        this.props.location.state.taskData.assignTo != null ?
                                                            this.state.userApiData ? this.state.userApiData.map((data, index) => {
                                                                if (this.props.location.state.taskData.assignTo == data.id) {
                                                                    return data.firstName
                                                                }
                                                            }) : <p>{this.state.assigneeName}</p> : <p>{this.state.assigneeName}</p>
                                                    }
                                                </span>
                                                <img id='remove-image' src={decrementIcon} alt='decrementIcon' />
                                            </div>
                                        </div>
                                        <img className='task-assign-list-drop-toggler' src={dropdownIcon} alt='dropdownIcon'></img>
                                        {/* <div className='task-assign-selected-item-container'>
                                
                                         <img className='task-reporter-list-drop-toggler' src={dropdownIcon}
                                            alt='dropdownIcon'></img>
                                        <div className='task-selected-item-container'>
                                             {this.state.assignToSelection.length == 0 ? '' :
                                                this.state.assignToSelection.map(item =>
                                                    <div className='task-selected-item-template'>
                                                        <img id='avathar-image' src={profileIcon} alt='profileIcon' />
                                                        <span>{item.firstName} {item.lastName}</span>
                                                        <img id='remove-image' src={decrementIcon} alt='decrementIcon' onClick={(e) => {
                                                            e.stopPropagation();
                                                            this.assignToCheck(item)
                                                        }} />
                                                    </div>
                                                )}
                                        </div>
                                            <img className='task-list-drop-toggler' src={dropdownIcon} 
                                                alt='dropdownIcon' 
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    this.setState({ isShowAssignToDrop: !this.state.isShowAssignToDrop })
                                                }} 
                                            />
                                    </div> */}
                                    </div>


                                    {/* <div className={`task-assign-custome-dropdown-menu-container ${this.state.isShowAssignToDrop ? 'task-assign-custome-open-dropdown zIndex' : 'task-assign-custome-close-dropdown'}`} ref={this.setWrapperRef} >
                                        <div className='task-assign-to-list-container'>

                                            {
                                                this.state.userApiData != null || this.state.userApiData != undefined ?
                                                    this.state.userApiData.map(assignTo => {
                                                        return (
                                                            <div className='task-assign-to-item'>
                                                                <div className='task-assign-item-avatar'>
                                                                    <img src={drpdwnprofile} alt='drpdwnprofile' />
                                                                    <span>{assignTo.firstName} {assignTo.lastName}</span>
                                                                    <Checkbox className='task-avatar-item-checkbox' name='assignToChecked' onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        this.assignToCheck(assignTo)
                                                                    }} checked={this.state.assignToSelection.includes(assignTo)} />
                                                                </div>
                                                            </div>
                                                        )
                                                    }) : null
                                            }
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            <div className='right-section-task-assign-dropdown-field-two'>
                                <div className='task-reporter-dropdown-container'>
                                    <p className="task-reporter-text">REPORTER</p>
                                    <div className='task-reporter-library-dropdown'>
                                        <div className='task-reporter-selected-item-container'>
                                            <div className='task-reporter-selected-item-template'>
                                                <img id='avathar-image' src={profileIcon} alt='profileIcon'/>
                                                <span>Reporter Name</span>
                                                <img id='remove-image' src={decrementIcon} alt='decrementIcon'
                                                // onClick={(e) => {
                                                //     e.stopPropagation();
                                                //     this.reporterToCheck(item)
                                                // }}
                                                />
                                            </div>
                                        </div>
                                        <img className='task-reporter-list-drop-toggler' src={dropdownIcon}
                                            alt='dropdownIcon'
                                        // onClick={(e) => {
                                        //     e.stopPropagation()
                                        //     this.setState({ isShowReporterDrop: !this.state.isShowReporterDrop })
                                        // }}
                                        />
                                    </div>

                                    {/* <div className={`task-reporter-custome-dropdown-menu-container ${this.state.isShowReporterDrop ? 'task-reporter-custome-open-dropdown zIndex' : 'task-reporter-custome-close-dropdown'}`} ref={this.setWrapperRef} >
                                        <div className='task-reporter-to-list-container'>
                                            {
                                                this.state.users != null || this.state.users != undefined ?
                                                    users.map(assignTo => {
                                                        return (
                                                            <div className='task-reporter-to-item'>
                                                                <div className='task-reporter-item-avatar'>
                                                                    <img src={drpdwnprofile} alt='drpdwnprofile' />
                                                                    <span>{assignTo.firstName} {assignTo.lastName}</span>
                                                                    <Checkbox
                                                                    className='task-reporter-avatar-item-checkbox' name='assignToChecked' onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        this.reporterToCheck(assignTo)
                                                                    }} checked={this.state.assignToSelection.includes(assignTo)} />
                                                                </div>
                                                            </div>
                                                        )
                                                    }) : null
                                            }
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="task-details-tag-list">
                                <p className="tsk-tg-hdng">TAGS</p>
                                <div className="task-tag-title">
                                    <p className="task-critical-title">CRITICAL</p>
                                    <p className="task-tech-title">TECH</p>
                                    <img src={Group11420} alt="edit" className="task-tag-icon"></img>
                                </div>
                        </div>
                            <div className="task-estimated-field">
                                <p className="task-estimated-field-text-one">ESTIMATED</p>
                                <p className="task-estimated-field-text-two">2hrs 30mins</p>
                            </div>
                            <div className="task-details-link-field">
                                <div className="task-details-upper-text">
                                    <p className="task-details-link-text">LINK WITH</p>
                                    <img src={Group11519}></img>
                                </div>
                                <div className="task-details-lower-text">
                                    <div className="task-details-link-with-left-section">
                                        <img src={IconLinkimg}></img>
                                        <p className="metrik-text">Metrik1 - marketing</p>
                                    </div>
                                    <p className="task-details-link-with-rigth-section">PROJECT</p>
                                </div>
                            </div>
                    </div>
                </div>
            </div >
        )
    }
    render() {
        return <MainLayout secondSidebar={<NewTaskCollapsable thisObj={this} refreshData={this.refreshData} client={this.props.client} />} bodySection={this.bodySection()} />
    }
}
export default TaskDetails;