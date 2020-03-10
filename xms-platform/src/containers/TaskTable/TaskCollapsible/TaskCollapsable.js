import React from 'react';
import './TaskCollapsable.scss';

import history from '../../../Routes/history'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import CreateTaskDrawer from '../../../components/TicketingSystem/TicketTable/SideDrawers/CreateTaskDrawer/CreateTaskDrawer';
import TaskDetails from '../../../containers/Taskdetails/Taskdetails';
import { getTodayData,getTomorrowData, 
  getTaskBytatus, getTaskByAssignUser,
  getBacklogData,getTaskByPriority } from "../../../components/TicketingSystem/TasksList/taskListsQuerys";

// import CreateTicketDrawer from '../TicketingSystem/TicketTable/SideDrawers/CreateTicketUpdated/CreateTicketDrawer';
// import CreateTicketDrawer from '../../../'

// import sideBarLogo from '../../../assets/Sidenavbar-icons/logo.png';
// import activeIcon1 from '../../../assets/Sidenavbar-icons/Group 11254-active.svg'
// import inActiveIcon1 from '../../../assets/Sidenavbar-icons/Group 11254.svg'
// import activeIcon2 from '../../../assets/Sidenavbar-icons/Group 11260.svg'
// import inActiveIcon2 from '../../../assets/Sidenavbar-icons/Group 11261.svg'
// import activeIcon3 from '../../../assets/Sidenavbar-icons/Group 11262-active.svg'
// import inActiveIcon3 from '../../../assets/Sidenavbar-icons/Group 11262.svg'
// import activeIcon4 from '../../../assets/Sidenavbar-icons/Icon awesome-project-diagram-active.svg'
// import inActiveIcon4 from '../../../assets/Sidenavbar-icons/Icon awesome-project-diagram.svg'
// import activeIcon5 from '../../../assets/Sidenavbar-icons/Icon awesome-user-alt-active.svg'
// import inActiveIcon5 from '../../../assets/Sidenavbar-icons/Icon awesome-user-alt.svg'
// import activeIcon6 from '../../../assets/Sidenavbar-icons/Icon material-chat_bubble_outline-active.svg'
// import inActiveIcon6 from '../../../assets/Sidenavbar-icons/Icon material-chat_bubble_outline.svg'
// import activeIcon7 from '../../../assets/Sidenavbar-icons/Icon feather-heart-active.svg'
// import inActiveIcon7 from '../../../assets/Sidenavbar-icons/Icon feather-heart.svg'
// import activeIcon8 from '../../../assets/Sidenavbar-icons/Icon material-help-outline-active.svg'
// import inActiveIcon8 from '../../../assets/Sidenavbar-icons/Icon material-help-outline.svg'
// import footerSettingIcon from '../../../assets/Sidenavbar-icons/Group 11263.svg'

import addIcon from '../../../assets/Sidenavbar-icons/Group 11382.svg'
import sidebarToggleIcon from '../../../assets/Sidenavbar-icons/Group 11332.svg';

import searchIcon from '../../../assets/Sidenavbar-icons/Icon feather-search-small.svg'
import ReactTooltip from 'react-tooltip';

import axios from "axios";
import { baseUrl } from "../../../constants";

function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      width: '2em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      width: '2em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: -2,
      marginLeft: '-0.95em',
      height: '2em',
      width: '2em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent #ffffff transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.95em',
      height: '2em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color}`,
      },
    },
  };
}


const useStylesArrow = makeStyles(theme => ({
  tooltip: {
    position: 'relative',
    fontSize: 10, 
    borderRadius: 100,
    backgroundColor: "#ffffff",
    color: "#656565",
    boxShadow: "0 3px 12px 0 #d2d2d2",
    marginLeft: '0.1em',
    padding: "4px 12px 4px 12px",
    textAlign: 'center'
  },
  arrow: {
    position: 'absolute',
    fontSize: 4,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  popper: arrowGenerator(theme.palette.grey[700]),
}));

function ArrowTooltip(props) {
  const { arrow, ...classes } = useStylesArrow();
  const [arrowRef, setArrowRef] = React.useState(null);

  return (
    <Tooltip 
      classes={classes}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef,
            },
          },
        },
      }}
      {...props}
      title={
        <React.Fragment>
          {props.title}
          <span className={arrow} ref={setArrowRef} />
        </React.Fragment>
      }
    />
  );
}

class SideBarNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarToggle: true,
      isCTaskDrawerOpen: false,
      headingId: 1,
      subheadingId: 1,
      logedUser:{},
      myTickets:[],
      allTickets:[],
      statusInProgress:[],
      statusOpen:[],
      statusReOpen:[],
      statusResolve:[],
      ticketByCompany:[],
      ticketByAgent:[],
      highPriorityTickets:[],
      dueTicket:[],
      searchOption:"",
      taskByStatusInprogress:[],
        taskByStatusTodo:[],
        taskByStatusCompleted:[],
        taskByStatusChallanges:[],
        taskByUser:[],
    }
  }

sidebarSections = [
  {id: 1, heading: 'Tasks', addIcon: addIcon, subheading: [
    {id: 1, name: 'All', count: '24', tooltip:"All Tasks",data:[]},
    {id: 2, name: 'My Tasks', count: '12', tooltip:"My Tasks",data:[]},
    {id: 3, name: 'Due Today', count: '6', tooltip:"Due today",data:[]},
    {id: 4, name: 'On Priority', count: '6', tooltip:"On priority",data:[]},
  ]},
  {id: 2, heading: 'status', addIcon: '', subheading: [
    {id: 1, name: 'All', count: '42', tooltip:"All status",data:[]},
    {id: 2, name: 'To-do', count: '12', tooltip:"To-do",data:[]},
    {id: 3, name: 'In-Progress', count: '6', tooltip:"In-progress",data:[]},
    {id: 4, name: 'Completed', count: '12', tooltip:"Completed",data:[]},
    {id: 5, name: 'Challanges', count: '6', tooltip:"Challenges",data:[]},
  ]},
    {id: 3, heading: 'grouping', addIcon: '', subheading: [
      {id: 1, name: 'All', count: '42', tooltip:"Grouping",data:[]},
      {id: 2, name: 'Tasks by project', count: '12', tooltip:"Project",data:[]},
    //   {id: 3, name: 'Ticket by company', count: '6'},
      {id: 4, name: 'Tasks by Team/Dept', count: '12', tooltip:"Team/Dept",data:[]},
    ]},
  ];

  componentDidMount(){
    var client = this.props.client;
    console.log("props==",this.props)
    let requestBodyAllTkt2 = {
        query: `
          query tasksList 
            {
              tasksList{
                  id,
                  taskTitle,
                  taskDescription,
                  priority,
                  relatedTo
            billable
            sendCopyTo
            followers
            startTime
            dueTime
            statusId
            progressPercent
            progressEstimatedTime
            tags
            comments
            assignTo
            attachment
            privacy
            logTime
            dependencies
            remainder
            linkWithTicket
            linkWithProject
            linkWithTask
            linkWithObjective
            linkWithKeyResult
            departmentId
            companyId
            teamId
            taskWeightage
            parentTaskId
            childTaskId
            createdAt
            active,
            taskHours
              }
            }
        `,
  
      };
  
      axios({
      method: 'post',
      url: baseUrl.server,
      data: requestBodyAllTkt2,
      headers: {
          'Content-type': 'application/json'
      }
      }).then(res => {
        console.log("res.data.data.tasksList==",res.data.data.tasksList)
      this.setState({allTickets:res.data.data.tasksList})
      var data = res.data.data.tasksList;
      if(data!=null){
      this.sidebarSections[0].subheading[0].count=data.length;
      this.sidebarSections[1].subheading[0].count=data.length;
      this.sidebarSections[2].subheading[0].count=data.length;
      this.sidebarSections[0].subheading[0].data=data;
      this.sidebarSections[1].subheading[0].data=data;
      this.sidebarSections[0].subheading[0].data=data;
      }
      return res
      }).catch(err => {
      console.log("Error in user==",err)
      return err;
      });



// taskByStatusInprogress
      getTaskBytatus(
        client, 2, taskByStatus => {
            this.setState({ taskByStatusInprogress: taskByStatus.data.getTaskBystatus });
            var data = taskByStatus.data.getTaskBystatus;
            if(data!=null){ this.sidebarSections[1].subheading[2].count=data.length;
              this.sidebarSections[1].subheading[2].data=data;              
            }else{
                this.sidebarSections[1].subheading[2].count=0
            }
        }
    )
// taskByStatusTodo
    getTaskBytatus(
        client, 5, taskByStatus => {
            this.setState({ taskByStatusTodo: taskByStatus.data.getTaskBystatus });
            var data = taskByStatus.data.getTaskBystatus;
            if(data!=null){ 
              this.sidebarSections[1].subheading[1].count=data.length;
              this.sidebarSections[1].subheading[1].data=data;
            }else{
                this.sidebarSections[1].subheading[1].count=0
              this.sidebarSections[1].subheading[1].data=data;

            }
        }
    )
    // taskByStatusCompleted
    getTaskBytatus(
        client, 6, taskByStatus => {
            this.setState({ taskByStatusCompleted: taskByStatus.data.getTaskBystatus });
            var data = taskByStatus.data.getTaskBystatus;
            if(data!=null){ this.sidebarSections[1].subheading[3].count=data.length;
              this.sidebarSections[1].subheading[3].data=data
            }else{
                this.sidebarSections[1].subheading[3].count=0
                this.sidebarSections[1].subheading[3].data=data
            }
        }
    )

    // taskByStatusChallanges
    getTaskBytatus(
        client, 7, taskByStatus => {
            this.setState({ taskByStatusChallanges: taskByStatus.data.getTaskBystatus });
            var data = taskByStatus.data.getTaskBystatus;
            if(data!=null){ this.sidebarSections[1].subheading[4].count=data.length;
              this.sidebarSections[1].subheading[4].data=data
            }else{
                this.sidebarSections[1].subheading[4].count=0
                this.sidebarSections[1].subheading[4].data=data
            }
        }
    )

    getTaskByAssignUser(
      client, parseInt(localStorage.getItem('id')), taskByUser => {
          this.setState({ taskByUser: taskByUser.data.getTaskByAssignedId });
          var data = taskByUser.data.getTaskByAssignedId;
          if(data!=null){ this.sidebarSections[0].subheading[1].count=data.length;
            this.sidebarSections[0].subheading[1].data=data
          }else{
              this.sidebarSections[0].subheading[1].count=0
              this.sidebarSections[0].subheading[1].data=data
          }
      }
  )

  getBacklogData(
    client, 1, backlogData => {
         this.setState({ backlogData: backlogData.data.getBacklogTasks });
         var data = backlogData.data.getBacklogTasks;
         if(data!=null){ this.sidebarSections[0].subheading[2].count=data.length;
           this.sidebarSections[0].subheading[2].data=data
         }else{
             this.sidebarSections[0].subheading[2].count=0
             this.sidebarSections[0].subheading[2].data=data
         }
    }
);


getTaskByPriority(
  client, 1, backlogData => {
       this.setState({ taskBypriority: backlogData.data.getTaskByPriorityHigh });
       var data = backlogData.data.getTaskByPriorityHigh;
       if(data!=null){ this.sidebarSections[0].subheading[3].count=data.length;
         this.sidebarSections[0].subheading[3].data=data
       }else{
           this.sidebarSections[0].subheading[3].count=0
           this.sidebarSections[0].subheading[3].data=data
       }
  }
);
}

  changeHndler=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }

  searchTicketHere=()=>{
    let searchTicket = {
      query: `
        mutation searchTicket($searchOption:String) 
          {
            searchTicket(searchOption:$searchOption){name,id,statusId}
          }
      `,
      variables: {searchOption:this.state.searchOption}
    };
    
    axios({
      method: 'post',
      url: baseUrl.server,
      data: searchTicket,
      headers: {
          'Content-type': 'application/json'
      }
    }).then(res => {
      this.setState({searchTickets:res.data.data.searchTicket})
      // alert(JSON.stringify(res.data.data.searchTicket))
      // var data = res.data.data.getTicketByAgent;
      // this.sidebarSections[0].subheading[1].count=data.length;
      return res
    }).catch(err => {
      console.log("Error in user==",err)
      return err;
    });
  }

  subheadingClickHandler =(heading, subheading)=> {
    // alert("hey2== " + JSON.stringify(subheading))
    this.props.refreshData(subheading);
    this.setState({ headingId: heading.id, subheadingId: subheading.id })
  }


  taskListingCollapse=()=> (
    <>
      <div className='sidebar-header'>Support / <span>Tasks</span></div>
      <div className='sidebar-search-container'>
        <TextField value={this.state.searchOption} name="searchOption" onChange={this.changeHndler} className='sidebar-search-field' placeholder='Search Tasks' variant="outlined" />
        <img src={searchIcon} alt='searchIcon' onClick={this.searchTicketHere}/>
      </div>
      {
        this.sidebarSections.map(section => (
          <div className='sidebar-ticket-section'>
            <div className='section-header'><span className='section-header-name'>{section.heading}</span> {section.addIcon ? <img src={section.addIcon} alt='addIcon' onClick={()=> this.props.thisObj.setState({isCTaskDrawerOpen: !this.props.thisObj.state.isCTaskDrawerOpen})}/> : null}</div>
            {
              section.subheading.map(subheading => (
                <ArrowTooltip title={subheading.tooltip} placement="right">
                  <div className={`section-elements ${section.id === this.state.headingId && subheading.id === this.state.subheadingId ? 'active-section-element' : null }`} onClick={()=> this.subheadingClickHandler(section,subheading.data)}>
                    <span className='element-name '>{subheading.name}</span>
                    <span className={`${section.id === this.state.headingId && subheading.id === this.state.subheadingId ? 'while-active-element-count' : 'while-non-element-count' }`}>{subheading.count}</span>
                  </div>
                </ArrowTooltip>
              ))
            }
          </div>
        ))
      }
    </>
  )
  render(){
    return this.taskListingCollapse()
  }
}

export default SideBarNew;
