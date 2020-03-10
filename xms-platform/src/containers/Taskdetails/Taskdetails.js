import React, { Component } from 'react';
// import "../../../containers/TicketTable/TicketTable.scss";
 import './Taskdetails.scss';

 import Checkbox from '@material-ui/core/Checkbox';
import MainLayout from '../../containers/MainLayout/MainLayout';
import TaskCollapsable from '../../containers/TaskTable/TaskCollapsible/TaskCollapsable';
import axios from "axios";
import { CirclePicker, TwitterPicker } from 'react-color'
import { withStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import dropdownIcon from '../../assets/icons/01-10-2019/Icon ionic-md-arrow-dropdown.svg'
import colorPallet from '../../assets/create-habit/Icon material-color-lens.svg'
import Header from '../../containers/Header/Header';
import SubHeader from '../../containers/SubHeaderNew/SubHeaderNew';
import CreateTaskDrawer from '../../containers/CreateTaskDrawer/CreateTaskDrawer';
import CreateTicketDrawer from '../../components/TicketingSystem/TicketTable/SideDrawers/CreateTicketUpdated/CreateTicketDrawer';
import Fab from '@material-ui/core/Fab';
import readMore from '../../assets/icons/SVG/Iconawesome-ellipsis-v.svg'
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ClrPckrTray from "../../assets/icons/create-ticket/Icon ionic-ios-color-palette.svg";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import profileIcon from '../../assets/profile.png'
import decrementIcon from '../../assets/icons/SVG/Group 11399.svg'
import estimatedTimeIcon from '../../assets/icons/SVG/Icon material-access-time.svg'
import tagsIcon from '../../assets/icons/SVG/Icon awesome-tags.svg'
import addNewIcon from '../../assets/icons/SVG/Group 11382.svg';
import InputBase from '@material-ui/core/InputBase';
import SearchTagAdd from "../../assets/icons/create-ticket/Group 11349.svg";
import AttachmentAddIcon from "../../assets/icons/01-10-2019/Icon feather-plus-circle.svg";
import TasksListAddIcon from "../../assets/icons/01-10-2019/Group 10948.svg";
import TasksListUpArrow from "../../assets/icons/01-10-2019/Group 10952.svg";
import TasksListEditIcon from "../../assets/icons/01-10-2019/Icon feather-edit-3.svg";
import TaskListRectangleGray from "../../assets/icons/01-10-2019/Rectangle 526.svg";
import TaskListRectangleBlue from "../../assets/icons/01-10-2019/Rectangle 530.svg";
import TaskListAccessTime from "../../assets/icons/01-10-2019/Icon material-access-time.svg";
import TaskListTag from "../../assets/icons/01-10-2019/Icon awesome-tags1.svg";
import TaskListExclamation from "../../assets/icons/01-10-2019/Icon awesome-exclamation-circle1.svg";
import TaskListGroupMessage from "../../assets/icons/01-10-2019/Group 10951.svg";
import TaskListSubdirectory from "../../assets/icons/01-10-2019/Icon material-subdirectory-arrow-right.svg";
import TaskListLink from "../../assets/icons/01-10-2019/Icon feather-link.svg";
import TaskListNotification from "../../assets/icons/01-10-2019/Icon ionic-ios-notifications-outline.svg";
import TaskListRepeat from "../../assets/icons/01-10-2019/Icon feather-repeat.svg";
import TaskListAttachment from "../../assets/icons/01-10-2019/Icon metro-attachment.svg";
import TaskListProfile from "../../assets/images/profile.png";
import TaskListStarIcon from "../../assets/icons/01-10-2019/Icon ionic-md-star-outline.svg";
import TaskListRedExclamation from "../../assets/icons/01-10-2019/Icon awesome-exclamation-circle.svg";
import TasksListPopupEdit from "../../assets/icons/01-10-2019/Icon feather-edit.svg";
import TasksListPopupAssign from "../../assets/icons/01-10-2019/Icon material-description.svg";
import TasksListPopupBulk from "../../assets/icons/01-10-2019/Icon feather-mail.svg";
import TasksListPopupMerge from "../../assets/icons/01-10-2019/Icon material-call-merge.svg";
import TasksListPopupConvert from "../../assets/icons/01-10-2019/Icon ionic-ios-options.svg";
import TasksListPopupLink from "../../assets/icons/01-10-2019/Icon feather-link.svg";
import TasksListPopupDuplicate from "../../assets/icons/15-10-2019/Icon material-control-point-duplicate.svg";
import TasksListPopupDelete from "../../assets/icons/01-10-2019/Icon material-delete-sweep.svg";
import CompanyLogo from "../../assets/icons/01-10-2019/company-logo.svg";
import CompanyEditIcon from "../../assets/icons/SVG/Iconfeather-edit-3.svg";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItemImage from "../../assets/images/profile.png";
import gql from "graphql-tag";
import AttachmentIcon from "../../assets/icons/task/Icon metro-attachment.svg";
import { getTodayData,getTomorrowData } from "../../components/TicketingSystem/TasksList/taskListsQuerys";
import SubtaskIcon from "../../assets/icons/task/Icon open-task.svg";
import CommentMoreIcon from "../../assets/icons/task/CommentMoreIcon.svg";
import ReportAChallenge from "../../assets/icons/task/Icon material-report-problem.svg";
import startIcon from "../../assets/icons/task/Icon ionic-md-star-outline.svg";
import subdirectoryarrow from "../../assets/icons/task/Icon material-subdirectory-arrow-right.svg";
import notifications from "../../assets/icons/task/Icon ionic-ios-notifications-outline.svg";
import backTotasklist from "../../assets/icons/task/Icon ionic-ios-arrow-back.svg";
import LinkWith from "../../assets/icons/task/link-with.svg";
import Radio from '@material-ui/core/Radio';
import { baseUrl } from "../../constants";
import { green } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import removeAttachedFile from '../../assets/icons/create-ticket/Group 11407.svg'
import dpfIcon from '../../assets/icons/SVG/337946.png'

const fileIcons = [{pdf: dpfIcon}]
const imageFormats = ['jpg', 'jpeg', 'jpg', 'bmp', 'png', 'svg'];
const fileFormats = ['doc', 'docx', 'odt', 'txt', 'pdf', 'ppt', 'pptx'];
const imgscr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"
const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);
const assignToData =[
    {id: 0, name: 'John Dan', profile: ''},
    {id: 1, name: 'John Doe', profile: ''},
    {id: 2, name: 'John pazos', profile: ''},
    {id: 3, name: 'Mark John', profile: ''},
    {id: 4, name: 'John Dan', profile: ''},
    {id: 5, name: 'John Doe', profile: ''},
    {id: 6, name: 'John pazos', profile: ''},
  ]

  const tagsData = [
    {id: 0, title: 'Risk', },
    {id: 1, title: 'Critical Customer', },
    {id: 2, title: 'Phase1', },
    {id: 3, title: 'Technical', },
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


class TaskListing extends Component {


  constructor(props) {
    super(props);
    this.state = {
      ticketsList:[],
      attachedFiles: [],
      assignToSelection: [],
      assignToChecked: '',
      users:[],
      tasksList:[],
      backlogData: [],
      todayData: [],
      tomorrowData: [],
      priorities:[],
        DoesNotRepeat: '', 
        isShowAssignToDrop: false,
        isShowReporterToDrop: false,
        isShowTagsDrop: false,
        assignToSelection: [
          {id: 0, name: 'John Dan', profile: ''},
        ],
        assignToReporter:[],
        assignToChecked: '',
        reporterToChecked:'',
      isShowDontRepeat: false,

        }
  }
  componentDidMount() {
    let client = this.props.client;
    //let idval=this.props.isId;
    this.fetchUsers();
    this.fetchtickets();
    this.fetchpriorities();
    let allTaskData = {
      query: `
        query tasksList 
          {
              tasksList{
              id
              taskTitle,
              taskDescription,
              priority,
              assignTo,
              taskHours,
              linkWithTicket
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
      //this.setState({tasksList:res.data.data.tasksList})
      this.setState({ taskTitle: res.data.taskTitle
         })
        return res
    }).catch(err => {
      console.log("Error in user==",err)
        return err;
    });
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
  removeAttachedFileHandler=(id)=> {
    let removeAttachedFile = this.state.attachedFiles;
    removeAttachedFile.splice(id, 1)
    this.setState({ attachedFiles: removeAttachedFile })
  }
  fileAttachmentHandler =event=> {
    let imageList = [];
    let extension = null;
    for(let i = 0; i < event.target.files.length; i++){
      extension = event.target.files[i].name.split('.')[1];
      if( imageFormats.includes(extension) ){
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
  imageToBase64Converter =(image, callback) =>{
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = ()=> {
      callback(reader.result)
    }
  }
  arrayToAssign = [];
  arrayToReporter =[];
  assignToCheck=(data)=>{
    
    if(this.arrayToAssign.includes(data)){
      let index = this.arrayToAssign.indexOf(data)
      this.arrayToAssign.splice(index,1);
  }else{
    this.arrayToAssign.push(data)
  }
  this.setState({assignToSelection:this.arrayToAssign})
  }
  reporterToCheck=(data)=>{
    if(this.arrayToReporter.includes(data)){
      let index = this.arrayToReporter.indexOf(data)
      this.arrayToReporter.splice(index,1);
  }else{
    this.arrayToReporter.push(data)
  }
  this.setState({assignToReporter:this.arrayToReporter})
  }
  
  fetchtickets=()=>{
    const getAlltickets ={
     query: `
     query {
      ticketsList {
         id,
         name,
       }
     }
   `
};

fetch(baseUrl.server, {
   method: 'POST',
   body: JSON.stringify(getAlltickets),
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
       let ticketsList = resData.data.ticketsList;
       this.setState({ ticketsList:ticketsList });
   })  
   .catch(err => {
       console.log(err);
   });
    
  }
   fetchpriorities=()=>{
     const getAllpriorities ={
      query: `
      query {
        priorities {
          id,
          priorityname,
        }
      }
    `
};

fetch(baseUrl.server, {
    method: 'POST',
    body: JSON.stringify(getAllpriorities),
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
        let priorities = resData.data.priorities;
        this.setState({ priorities:priorities });
    })  
    .catch(err => {
        console.log(err);
    });
     
   }
  fetchUsers = (companyId) => {
    const getAllUsers = {
        query: `
          query {
            getAllUsers {
              id,
              username,
              emailIs
              firstName
              lastName
            }
          }
        `
    };
  
    fetch(baseUrl.server, {
        method: 'POST',
        body: JSON.stringify(getAllUsers),
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
            let userAll = resData.data.getAllUsers;
            this.setState({ users:userAll });
        })  
        .catch(err => {
            console.log(err);
        });
  };

  bodySection = () => {
    return (
      <div className="ag-theme-balham">
       
        <Header />
        <SubHeader />
        <div className='task-details-container row' >
          <div>
       
        <div className='task-details-left  col-md-9' >
          
            <div className="department-and-team-name">
            <div className="task-sort-details"><span><img src={backTotasklist} alt={backTotasklist}/>Back to list</span><span>ProjectName</span><span>Phase</span></div>
            </div>
            <div className="task-title">
            <h2 >{this.props.isViewCompDtlsOpen}</h2>
            </div>
            <div className="task-quick-action">
            
            <span className="task-critical">High</span> 
         
            <span className="attach"><img src={AttachmentIcon}/>Attach</span>
            <span className="subtask"><img src={SubtaskIcon}/>Sub Task</span>
             <span className="report-a-challenge"><img src={ReportAChallenge}/>Report a Challenge</span>
             <span  className="task-quick-action-icon">
             <span ><img src={startIcon}></img></span>
             <span><img src={subdirectoryarrow}></img></span>
             <span><img src={notifications}></img></span>
            </span>
            </div>
                <div className='task-body'>
                <p className="Description">DESCRIPTION</p>
                <div className="task-details-description">
                <p>abc</p>
                <p><b>Find the below attached image for the animation guidelines in the list view.</b></p>
                </div>
                </div>

            
              <div className='create-task-attachment'>
            <span>Attachments</span>
            <div className={`CT-attached-files-container ${!this.state.attachedFiles ? 'align-center' : 'space-equaly '}`}>
              {this.state.attachedFiles!=null || this.state.attachedFiles!=undefined ?
                this.state.attachedFiles.map((file, index) => {
                return (
                  <div className='attached-file-template'>
                    <img className='attached-file-remove' src={removeAttachedFile} alt=''onClick={()=> this.removeAttachedFileHandler(index)}/>
                    {
                      file.base64 ? 
                      <img src={file.base64} alt='file'/> 
                      : 
                      file ? 
                        <img src={ fileIcons.map(icon=> icon[file.name.split('.')[1]]) } alt=''/>
                      : null
                    }
                    
                  </div>
                )
              }): null
              }
              <div className='CT-attachment-button'>
                <Button className='file-attach-button'>
                  <input
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                      multiple={true}
                      onChange={this.fileAttachmentHandler}
                  />
                </Button>
                <p>Drag attach file, <br/>or <span>browse</span></p>
              </div>                          
            </div>
          </div>

<div className="add-comment-sec">
<div className="profile-pic"><img src={profileIcon} alt='profileIcon'/></div>
<TextareaAutosize
                            aria-label="minimum height"
                            rows={3} placeholder="Add a comment"
                            
                        />
<img className="commentmoreicon" src={CommentMoreIcon} alt='CommentMoreIcon'/>
</div>
</div>
</div>

<div className='task-details-right col-md-3' >

<div className='flex-container1'>
  
<p className="label">ASSIGN TO</p>
<div className='CT-assignTo-dropdown-container'>
                <div className='CT-assignTo-non-library-dropdown'>
                  <div className='CT-selected-item-container'>
                    {this.state.assignToSelection.length == 0 ? 'Assign To':  
                      this.state.assignToSelection.map( item=> 
                        <div className='CT-selected-item-template'>
                          <img id='avathar-img' src={profileIcon} alt='profileIcon'/>
                          <span value="Sugatha">Sugatha</span>
                          
                          <img id='remove-img' src={decrementIcon} alt='decrementIcon' onClick={()=>this.assignToCheck(item)}/>
                        </div>
                    )}
                  </div><img className='ctm-drop-toggler' src={dropdownIcon} alt='dropdownIcon' onClick={()=> this.setState({ isShowReporterToDrop: !this.state.isShowReporterToDrop })}/>
                </div>

                <div className={`CT-assignTo-custome-dropdown-menu-container ${this.state.isShowReporterToDrop ? 'CT-assignTo-custome-open-dropdown zIndex' : 'CT-assignTo-custome-close-dropdown'}`} ref={this.setWrapperRef} >
                  <div className='assign-to-list-container'>
                    {this.state.users.map(assignTo => {
                      return (
                        <div className='assign-to-item'>
                          <div className='assign-item-avatar'> 
                            <img src={profileIcon} alt='profileIcon'/>
                            <span>{assignTo.firstName} {assignTo.lastName}</span>
                            <Checkbox className='avatar-item-checkbox' name='assignToChecked' onChange={()=>this.assignToCheck(assignTo)} checked={this.state.assignToSelection.includes(assignTo)} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
               
              </div> 
          </div>
          <div className='flex-container1'>
              <p className="label">REPORTER</p>
            <div className='CT-assignTo-dropdown-container'>
                <div className='CT-assignTo-non-library-dropdown'>
                  <div className='CT-selected-item-container'>
                    {this.state.assignToReporter.length == 0 ? 'Reporter':  
                      this.state.assignToReporter.map( item=> 
                        <div className='CT-selected-item-template'>
                          <img id='avathar-img' src={profileIcon} alt='profileIcon'/>
                         
                          <span value="sugatha">sugatha</span>
                         
                          <img id='remove-img' src={decrementIcon} alt='decrementIcon' onClick={()=>this.reporterToCheck(item)}/>
                        </div>
                    )}
                  </div><img className='ctm-drop-toggler' src={dropdownIcon} alt='dropdownIcon' onClick={()=> this.setState({ isShowAssignToDrop: !this.state.isShowAssignToDrop })}/>
                </div>

                <div className={`CT-assignTo-custome-dropdown-menu-container ${this.state.isShowAssignToDrop ? 'CT-assignTo-custome-open-dropdown zIndex' : 'CT-assignTo-custome-close-dropdown'}`} ref={this.setWrapperRef} >
                  <div className='assign-to-list-container'>
                    {this.state.users.map(assignTo => {
                      return (
                        <div className='assign-to-item'>
                          <div className='assign-item-avatar'> 
                            <img src={profileIcon} alt='profileIcon'/>
                            <span>{assignTo.firstName} {assignTo.lastName}</span>
                            <Checkbox className='avatar-item-checkbox' name='reporterToChecked' onChange={()=>this.reporterToCheck(assignTo)} checked={this.state.assignToReporter.includes(assignTo)} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
               
              </div> 
             
          </div>
    
          <div className="task-estimation">
          <p className="estimated">Estimated</p>
     <span className="task-details-estimated">2:00</span>
 </div>

 <div className="link">
      <p className="link-task">LINK WITH</p>
     <div className="link-list">
     <img src={LinkWith} alt={LinkWith}/>
          <span>Ticket</span>
    
     <span>ticket</span>
     </div>
 </div>

</div>

          </div>


        
        </div>
        
    );
  }






  render() {
    return ( <MainLayout secondSidebar={
      
    <TaskCollapsable thisObj={this} refreshData={this.refreshData} client={this.props.client} />
    
  }
  
   bodySection={this.bodySection() }    />
  
    )
    
  }
    
}

export default TaskListing;
