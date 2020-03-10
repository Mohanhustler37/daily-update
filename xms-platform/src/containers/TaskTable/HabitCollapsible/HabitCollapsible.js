import React from 'react';
import history from '../../../Routes/history'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { getHabitsTodayData,getTomorrowData, getHabitBytatus,getHabitBygoalweekly,
 
  getBackLogData, } from "../../../components/TicketingSystem/HabitList/habitListQueries";
import CreateTaskDrawer from '../../../components/TicketingSystem/TicketTable/SideDrawers/CreateTaskDrawer/CreateTaskDrawer';
import "./HabitCollapsible.scss";
import {getHabitsByDuration,getHabitsByAssignee,getAllHabits,getHabitsBacklogData} from "../../../components/TicketingSystem/HabitList/habitListQueries"




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

import addIcon from '../../../assets/Sidenavbar-icons/Addl2icon.svg'
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
      isOpenCreateHabit: false,
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
      habitweekly:[],
        taskByStatusTodo:[],
        taskByStatusCompleted:[],
        taskByStatusChallanges:[],
        taskByUser:[],
        isTicketTypeDropdown:false,
        habitgoal:[],
        habittoday:[],
        searchHabit:[],
    }
  }

  sidebarSections = [
  {id: 1, heading: 'HABITS', addIcon: addIcon, subheading: [
    {id: 1, name: 'All', count: '0', tooltip:"All Habits",data:[]},
    {id: 2, name: 'My Habits', count: '0', tooltip:"My Habits",data:[]},
    {id: 3, name: 'Due Today', count: '0', tooltip:"Due today",data:[]},
    // {id: 4, name: 'On Priority', count: '6', tooltip:"On priority",data:[]},
  ]},
  {id: 2, heading: 'DURATIONS', addIcon: '', subheading: [
    {id: 1, name: 'All', count: '0', tooltip:"All status",data:[]},
    {id: 2, name: 'Daily', count: '0', tooltip:"To-do",data:[]},
    {id: 3, name: 'Weekly', count: '0', tooltip:"In-progress",data:[]},
    {id: 4, name: 'Monthly', count: '0', tooltip:"Completed",data:[]},
    {id: 5, name: 'Yearly', count: '0', tooltip:"Challenges",data:[]},
  ]},
    {id: 3, heading: 'GROUPING', addIcon: '', subheading: [
      {id: 1, name: 'All', count: '0', tooltip:"Grouping",data:[]},
      {id: 2, name: 'Habits by project', count: '12', tooltip:"Project",data:[]},
      {id: 3, name: 'Habits by company', count: '6'},
      {id: 4, name: 'Habits by Team/Dept', count: '12', tooltip:"Team/Dept",data:[]},
    ]},
  ];

  componentDidMount(){
    var client = this.props.client;
    // let requestBodyAllTkt2 = {
    //     query: `
    //       query habitsList 
    //         {
    //           habitsList{
    //               id,
    //               habitTitle,
    //               habitDescription,
    //               goal,
    //               startTime,
    //               progressPercent,
    //               statusId,

    //           }
    //         }
    //     `,
  
    //   };
  
    //   axios({
    //   method: 'post',
    //   url: baseUrl.server,
    //   data: requestBodyAllTkt2,
    //   headers: {
    //       'Content-type': 'application/json'
    //   }
    //   }).then(res => {
    //   this.setState({allTickets:res.data.data.habitsList})
    //   var data = res.data.data.habitsList;
    //   if(data!=null){
    //   this.sidebarSections[0].subheading[0].count=data.length;
    //   this.sidebarSections[1].subheading[0].count=data.length;
    //   this.sidebarSections[2].subheading[0].count=data.length;
    //   this.sidebarSections[0].subheading[0].data=data;
    //   this.sidebarSections[1].subheading[0].data=data;
    //   this.sidebarSections[0].subheading[0].data=data;
    //   }
    //   return res
    //   }).catch(err => {
    //   console.log("Error in user==",err)
    //   return err;
    //   });

      getHabitsByAssignee(client,parseInt(localStorage.getItem('id')),data=>{
        let data1 = data.data.habitsByAssignee;
        if(data1 != null){
        this.sidebarSections[0].subheading[1].count=data1.length;
        this.sidebarSections[0].subheading[1].data=data1;
        }
      })
      getHabitsByDuration(client,1,data=>{
        let data1 = data.data.getHabitsByDuration;
        if(data1 != null){
        this.sidebarSections[1].subheading[1].count=data1.length;
        this.sidebarSections[1].subheading[1].data=data1;
        }
      })
      getHabitsByDuration(client,2,data=>{
        let data1 = data.data.getHabitsByDuration;
        if(data1 != null){
        this.sidebarSections[1].subheading[2].count=data1.length;
        this.sidebarSections[1].subheading[2].data=data1;
        }
      })
      getHabitsByDuration(client,3,data=>{
        let data1 = data.data.getHabitsByDuration;
        if(data1 != null){
        this.sidebarSections[1].subheading[3].count=data1.length;
        this.sidebarSections[1].subheading[3].data=data1;
        }
      })
      getHabitsByDuration(client,4,data=>{
        let data1 = data.data.getHabitsByDuration;
        if(data1 != null){
        this.sidebarSections[1].subheading[4].count=data1.length;
        this.sidebarSections[1].subheading[4].data=data1;
        }
      })
      getAllHabits(client,data=>{
        let data2 = data.data.habitsList;
        if(data2 != null){
        this.sidebarSections[0].subheading[0].count=data2.length;
        this.sidebarSections[0].subheading[0].data=data2;
        this.sidebarSections[1].subheading[0].count=data2.length;
        this.sidebarSections[2].subheading[0].count=data2.length;
        this.sidebarSections[1].subheading[0].data=data2;
        this.sidebarSections[2].subheading[0].data=data2;
        }
      })
      getHabitsBacklogData(client,data => {
        let data3 = data.data.getBacklogHabit;
        if(data3.length != 0){
          this.sidebarSections[0].subheading[2].count=data3.length;
          this.sidebarSections[0].subheading[2].data=data3;

        }
      })

    //   getHabitsTodayData(
    //     client, 1, getTodayData => {
    //          this.setState({ getTodayData: getTodayData.data.GetTodayHabit });
    //          var data = getTodayData.data.GetTodayHabit;
    //          if(data!=null){ this.sidebarSections[0].subheading[2].count=data.length;
    //            this.sidebarSections[0].subheading[2].data=data
    //          }else{
    //              this.sidebarSections[0].subheading[2].count=0
    //              this.sidebarSections[0].subheading[2].data=data
    //          }
    //     }
    // );
    

// taskByStatusInprogress
// getHabitBytatus(
//   client, 2, getHabitBystatus => {
//       this.setState({ habitweekly: getHabitBystatus.data.getHabitBystatus });
//       var data = getHabitBystatus.data.getHabitBystatus;
//       if(data!=null){ this.sidebarSections[1].subheading[2].count=data.length;
//         this.sidebarSections[1].subheading[2].data=data;              
//       }else{
//           this.sidebarSections[1].subheading[2].count=0
//       }
//   }
// )
// getHabitBygoalweekly(
//   client, 1, getHabitBygoal => {
//       this.setState({ habittoday: getHabitBygoal.data.getHabitBygoal });
//       var data = getHabitBygoal.data.getHabitBygoal;
//       if(data!=null){ this.sidebarSections[1].subheading[2].count=data.length;
//         this.sidebarSections[1].subheading[2].data=data;              
//       }else{
//           this.sidebarSections[1].subheading[2].count=0
//       }
//   }
// )


}

  changeHndler=async (e)=>{
    await this.setState({[e.target.name]:e.target.value})
    this.searchHabit();
  }

  searchHabit=()=>{
    let searchHabit = {
      query: `
        query searchHabit1($habitTitle:String,$tenantId:Int!,$companyId:Int!) 
          {
            searchHabit1(habitTitle:$habitTitle,tenantId:$tenantId,companyId:$companyId){
              id
              habitId
              habitTitle
              habitDescription
              startTime
              progressPercent
              statusId
              progressEstimatedTime
              tags
              comments
              assignTo
              logTime
              reminder
              linkWithTask
              departmentId
              companyId
              teamId
              tenantId
              taskId
              projectId
              habitTemplate
              location
              goal
              frequency
              parentHabitId
              groupHabitId
              assignBy
              data
              habitCount
              setTime
              count
              subHabitId
              completedHabit
              totalSubHabit
              saveTemplate
              ticketId
              file
            }
          }
      `,
      variables: {
        habitTitle:this.state.searchOption,
        tenantId:parseInt(localStorage.getItem('tenantId')),
        companyId:parseInt(localStorage.getItem('companyId'))
      }
    };
    
    axios({
      method: 'post',
      url: baseUrl.server,
      data: searchHabit,
      headers: {
          'Content-type': 'application/json'
      }
    }).then(res => {
      this.setState({searchHabit:res.data.data.searchHabit1})
      this.props.refreshData(res.data.data.searchHabit1);
      return res
    }).catch(err => {
      console.log("Error in user==",err)
      return err;
    });
  }
  

  subheadingClickHandler =(heading, subheading)=> {
     this.props.refreshData(subheading.data);
    this.setState({ headingId: heading.id, subheadingId: subheading.id })
    // if (subheading.onClick) { subheading.onClick(subheading.id) }
  }



  HabitListingCollapse=()=> (
    <>
      <div className='habit-listing-sidebar-header'>Support / <span>Habits</span></div>
      <div className="habit-innerl-searchsection">
        <div className='habit-listing-sidebar-search-container'>
          <TextField value={this.state.searchOption} name="searchOption" onChange={this.changeHndler} className='habit-listing-sidebar-search-field' placeholder='Search Habits' variant="outlined" />
          <img src={searchIcon} alt='searchIcon'/>
        </div>
      </div>
      <div className="hbt-lstng-scrollable-section">
      {
        this.sidebarSections.map(section => (
          <div className='habit-listing-sidebar-section'>
            <div className='habit-listing-section-header'><span className='habit-listing-section-header-name'>{section.heading}</span> {section.addIcon ? <img className="habit-section-header-icon" src={section.addIcon} alt='addIcon' onClick={()=> this.props.thisObj.setState({isOpenCreateHabit: !this.props.thisObj.state.isOpenCreateHabit})}/> : null}</div>
            {
              section.subheading.map(subheading => (
                <ArrowTooltip title={subheading.tooltip} placement="right">
                  <div className={`habit-listing-section-elements ${section.id === this.state.headingId && subheading.id === this.state.subheadingId ? 'habit-lstng-active-section-element' : null }`} onClick={()=> this.subheadingClickHandler(section,subheading)}>
                    <span className='habit-listing-element-name '>{subheading.name}</span>
                    <span className={`${section.id === this.state.headingId && subheading.id === this.state.subheadingId ? 'habit-listing-while-active-element-count' : 'habit-listing-while-non-element-count' }`}>{subheading.count}</span>
                  </div>
                </ArrowTooltip>
              ))
            }
          </div>
        ))
      }
      </div>
    </>
  )
  render(){
    return this.HabitListingCollapse()
  }
}

export default SideBarNew;
