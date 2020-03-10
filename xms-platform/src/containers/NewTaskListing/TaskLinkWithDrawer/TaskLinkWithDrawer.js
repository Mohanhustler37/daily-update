import React from "react";
import "./TaskLinkWithDrawer.scss";

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import searchIcon from '../../../assets/Sidenavbar-icons/Icon feather-search-small.svg';
import greyLinkIcon from '../../../assets/icons/SVG/Icon-grey-link.svg';
import blueLinkIcon from '../../../assets/icons/SVG/Icon-link.svg';

import subdirectoryArrowRightIcon from '../../../assets/icons/SVG/material-subdirectory-arrow-right.svg';
import profileIcon from '../../../assets/profile.png'
import { baseUrl } from "../../../constants";
import axios from "axios";
import {getSearchedObjectives,getSearchedTasks,getSearchedTickets,getsearchedProjects} from "../NewTaskListingQuery"

    
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        <Box p={4}>{children}</Box>
      </Typography>
    );
  }

class TaskLinkWithDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            allProjects:[],
            allTickets:[],
            allTasks:[],
            allObjectives:[],
            allUsers:[],
            allCompanies:[],
            selectedTask:{},
            searchOption:""
        }
    }
    
    componentDidMount(){
        // console.log(this.props.thiState.allProjects)
        if(this.props.thiState){
        this.setState({
            allProjects:this.props.thiState.allProjects,
            allTickets:this.props.thiState.allTickets,
            allTasks:this.props.thiState.allTasks,
            allCompanies:this.props.thiState.allCompanies,
            allUsers:this.props.thiState.users,
            selectedTask:this.props.thiState.clickedLinkTask,
            allObjectives:this.props.thiState.allObjectives
        }) 
    }
    }

    closeEditDrawerHandler = () => {
        this.props.thisObj.setState({ isTaskLinkWithDrawer: false })
    }


    handleChange = (event, newValue) => {
        this.setState({value: newValue})
    };
    handleChangeIndex = index => {
        this.setState({value: index})
    };
    searchTicket= async (e)=>{
        await this.setState({[e.target.name]:e.target.value})
        var client = this.props.client;
        getSearchedTickets(client,this.state.searchOption,parseInt(localStorage.getItem('tenantId')),parseInt(localStorage.getItem('companyId')),data=>{
            this.setState({allTickets:data.data.searchTicket})
        })
    }

    searchProject= async (e)=>{
        await this.setState({[e.target.name]:e.target.value})
        var client = this.props.client;
        getsearchedProjects(client,this.state.searchOption,parseInt(localStorage.getItem('companyId')),parseInt(localStorage.getItem('tenantId')),data=>{
            this.setState({allProjects:data.data.searchProject})
        })
    }

    searchObjective= async (e)=>{
        await this.setState({[e.target.name]:e.target.value})
        var client = this.props.client;
        getSearchedObjectives(client,this.state.searchOption,parseInt(localStorage.getItem('companyId')),data=>{
            this.setState({allObjectives:data.data.searchObjective})
        })
    }
    searchTask= async (e)=>{
        await this.setState({[e.target.name]:e.target.value})
        var client = this.props.client;
        getSearchedTasks(client,this.state.searchOption,parseInt(localStorage.getItem('companyId')),data=>{
            this.setState({allTasks:data.data.searchTask})
        })
    }


    linkItem = async (taskId,linkedItemId,linkedTo) => {
        // e.preventDefault();
        let requestBody = {
          query: `
            mutation updateTask(
                $id:Int!
                $linkWithTicket:Int
                $linkWithProject:Int
                $linkWithTask:Int
                $linkWithObjective:Int
              )
              {
                updateTask(
                    id:$id
                    linkWithTicket:$linkWithTicket,
                    linkWithProject:$linkWithProject,
                    linkWithTask:$linkWithTask,
                    linkWithObjective:$linkWithObjective,
                  )
                  {
                    id
                    taskTitle
                    assignTo
                    startTime
                    dueTime
                    companyId
                    departmentId
                    teamId
                    sendCopyTo
                    taskHours
                    taskDescription
                    priority
                    relatedTo
                    linkWithTicket
                    linkWithProject
                    linkWithTask
                    linkWithObjective
                    tags,
                    statusId
                  }
              }
          `,
          variables: {
            id:taskId,
            linkWithTicket:linkedTo == "Ticket" ? linkedItemId : null,
            linkWithProject:linkedTo == "Project" ? linkedItemId : null,
            linkWithTask:linkedTo =="Task" ? linkedItemId: null,
            linkWithObjective:linkedTo == "Objective" ? linkedItemId : null,
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
            this.setState({selectedTask:res.data.data.updateTask})
            this.props.thisObj.allDataRefresh()
          return res
        }).catch(err => {
          return err;
        });
    }
    

    listingAttachmentsSidePanel = (side, ticket, index) => (
        <div className="taskListingAttachmentContainer" role="presentation">
            <div className="edit-tkt-sidebar-container">
                <div className="edit-tkt-sidebar-header">
                    <div className="attchmentsHeading  edit-tkt-heading">LINK WITH <span>{this.state.selectedTask.taskTitle}</span></div>
                </div>
                <div className='sideDrawerBodySection'>
                    <AppBar className='taskListTabsHeader' position="static" color="default">
                        <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        >
                            <Tab className='taskLinkTab' label="PROJECT"  />
                            <Tab className='taskLinkTab' label="TICKET" />
                            <Tab className='taskLinkTab' label="TASK"  />
                            <Tab className='taskLinkTab' label="OBJECTIVE"  />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        className='taskListTabPanelsWrapper'
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <TabPanel className='taskLinkTabPanel' value={this.state.value} index={0} >
                            <div className='linkWithSearchBar'>
                                <TextField value={this.state.searchOption} name="searchOption" onChange={this.searchProject}
                                className='sidebar-search-field' placeholder='Search for Projects' variant="outlined"
                                />
                                <img src={searchIcon} alt='searchIcon'/>
                            </div>
                            <div className='taskLinkListContainer'>
                                {this.state.allProjects.length != 0 ?
                                    this.state.allProjects.map(proj => {
                                        return <div className='taskListItem' onClick={()=>this.linkItem(this.state.selectedTask.id,proj.id,"Project")}>
                                        <img src={this.state.selectedTask.linkWithProject == proj.id ? blueLinkIcon : greyLinkIcon } alt='greyLinkIcon'/>
                                        <div className='itemDescriptionContainer'>
                                            <p>{proj.projectName}</p>
                                            <div className='d-flex'>
                                                {this.state.allCompanies!=null || this.state.allCompanies != undefined ?
                                                    this.state.allCompanies.map(cmp => {
                                                        if(proj.companyId == cmp.id) {
                                                            return <label>{cmp.companyName}</label>
                                                        }
                                                    }) : null }
                                                <div className='taskAssignedTo'>
                                                    <img id='avathar-img' src={profileIcon} alt='profileIcon'/>
                                                    {
                                                        this.state.allUsers != null || this.state.allUsers != undefined ?
                                                        this.state.allUsers.map(user => {
                                                            if(proj.createdBy == user.id) {
                                                            return <span>{`${user.firstName} ${user.lastName != null ?user.lastName:""}`}</span>
                                                            }
                                                        }) : null 
                                                    }
                                                </div>
                                            </div>
    
                                        </div>
                                        <img src={subdirectoryArrowRightIcon} alt='subdirectoryArrowRightIcon'/>
                                    </div>
                                    })

                                :null }
                            </div>
                        </TabPanel>



                        <TabPanel className='taskLinkTabPanel' value={this.state.value} index={1} >
                            <div className='linkWithSearchBar'>
                                <TextField value={this.state.searchOption} name="searchOption" onChange={this.searchTicket}
                                className='sidebar-search-field' placeholder='Search for Projects' variant="outlined"
                                />
                                <img src={searchIcon} alt='searchIcon' />
                            </div>
                            <div className='taskLinkListContainer'>
                            {this.state.allTickets.length != 0 ?
                                    this.state.allTickets.map(ticket => {
                                        return <div className='taskListItem' onClick={()=>this.linkItem(this.state.selectedTask.id,ticket.id,"Ticket")}>
                                        <img src={this.state.selectedTask.linkWithTicket == ticket.id ? blueLinkIcon : greyLinkIcon } alt='greyLinkIcon'/>
                                        <div className='itemDescriptionContainer'>
                                            <p>{ticket.name}</p>
                                            <div className='d-flex'>
                                                {this.state.allCompanies!=null || this.state.allCompanies != undefined ?
                                                    this.state.allCompanies.map(cmp => {
                                                        if(ticket.companyId == cmp.id) {
                                                            return <label>{cmp.companyName}</label>
                                                        }
                                                    }) : null }
                                                <div className='taskAssignedTo'>
                                                    <img id='avathar-img' src={profileIcon} alt='profileIcon'/>
                                                    {
                                                        this.state.allUsers != null || this.state.allUsers != undefined ?
                                                        this.state.allUsers.map(user => {
                                                            if(ticket.createdBy == user.id) {
                                                            return <span>{`${user.firstName} ${user.lastName != null ?user.lastName:""}`}</span>
                                                            }
                                                        }) : null 
                                                    }
                                                </div>
                                            </div>
    
                                        </div>
                                        <img src={subdirectoryArrowRightIcon} alt='subdirectoryArrowRightIcon'/>
                                    </div>
                                    })

                                :null }
                            </div>
                        </TabPanel>



                        <TabPanel className='taskLinkTabPanel' value={this.state.value} index={2} >
                            <div className='linkWithSearchBar'>
                                <TextField value={this.state.searchOption} name="searchOption" onChange={this.searchTask}
                                className='sidebar-search-field' placeholder='Search for Projects' variant="outlined"
                                />
                                <img src={searchIcon} alt='searchIcon' />
                            </div>
                            <div className='taskLinkListContainer'>
                            {this.state.allTasks.length != 0 ?
                                    this.state.allTasks.map(task => {
                                        return <div className='taskListItem' onClick={()=>this.linkItem(this.state.selectedTask.id,task.id,"Task")}>
                                        <img src={this.state.selectedTask.linkWithTask == task.id ? blueLinkIcon : greyLinkIcon } alt='greyLinkIcon'/>
                                        <div className='itemDescriptionContainer'>
                                            <p>{task.taskTitle}</p>
                                            <div className='d-flex'>
                                                {this.state.allCompanies!=null || this.state.allCompanies != undefined ?
                                                    this.state.allCompanies.map(cmp => {
                                                        if(task.companyId == cmp.id) {
                                                            return <label>{cmp.companyName}</label>
                                                        }
                                                    }) : null }
                                                <div className='taskAssignedTo'>
                                                    <img id='avathar-img' src={profileIcon} alt='profileIcon'/>
                                                    {
                                                        this.state.allUsers != null || this.state.allUsers != undefined ?
                                                        this.state.allUsers.map(user => {
                                                            if(task.createdBy == user.id) {
                                                            return <span>{`${user.firstName} ${user.lastName != null ?user.lastName:""}`}</span>
                                                            }
                                                        }) : null 
                                                    }
                                                </div>
                                            </div>
    
                                        </div>
                                        <img src={subdirectoryArrowRightIcon} alt='subdirectoryArrowRightIcon'/>
                                    </div>
                                    })

                                :null }
                            </div>
                        </TabPanel>



                        <TabPanel className='taskLinkTabPanel' value={this.state.value} index={3} >
                            <div className='linkWithSearchBar'>
                                <TextField value={this.state.searchOption} name="searchOption" onChange={this.searchObjective}
                                className='sidebar-search-field' placeholder='Search for Projects' variant="outlined"
                                />
                                <img src={searchIcon} alt='searchIcon' />
                            </div>
                            <div className='taskLinkListContainer'>
                            {this.state.allObjectives.length != 0 ?
                                    this.state.allObjectives.map(obj => {
                                        return <div className='taskListItem' onClick={()=>this.linkItem(this.state.selectedTask.id,obj.id,"Objective")}>
                                        <img src={this.state.selectedTask.linkWithObjective == obj.id ? blueLinkIcon : greyLinkIcon } alt='greyLinkIcon'/>
                                        <div className='itemDescriptionContainer'>
                                            <p>{obj.objectiveTitle}</p>
                                            <div className='d-flex'>
                                                {this.state.allCompanies!=null || this.state.allCompanies != undefined ?
                                                    this.state.allCompanies.map(cmp => {
                                                        if(obj.companyID == cmp.id) {
                                                            return <label>{cmp.companyName}</label>
                                                        }
                                                    }) : null }
                                                <div className='taskAssignedTo'>
                                                    <img id='avathar-img' src={profileIcon} alt='profileIcon'/>
                                                    {
                                                        this.state.allUsers != null || this.state.allUsers != undefined ?
                                                        this.state.allUsers.map(user => {
                                                            if(obj.assignedBy == user.id) {
                                                            return <span>{`${user.firstName} ${user.lastName != null ?user.lastName:""}`}</span>
                                                            }
                                                        }) : null 
                                                    }
                                                </div>
                                            </div>
    
                                        </div>
                                        <img src={subdirectoryArrowRightIcon} alt='subdirectoryArrowRightIcon'/>
                                    </div>
                                    })

                                :null }
                            </div>
                        </TabPanel>      



                    </SwipeableViews>
                </div>


                <div className="sideDrawerFooter">
                    <div>
                        <Button
                            variant="outlined"
                            className="cancel-button"
                            onClick={this.closeEditDrawerHandler}
                            onKeyDown={this.closeEditDrawerHandler}
                        >
                            cancel
                        </Button>
                    </div>
                    <div>
                        <Button
                            size="large"
                            className="update-button"
                            // onClick={(e) => this.handleUpdateTicket(e)}
                            onClick={this.closeEditDrawerHandler}

                        >
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
    render() {
        return (
            <div className="taskListingAttachement">
                <Drawer className="tckt-lst-edit-drawer" anchor="right" open={this.props.isTaskLinkWithDrawer} >
                    <div className="editdrawer d-flex">
                        <div className="drawer-full-width" onClick={this.closeEditDrawerHandler}></div>
                        {this.listingAttachmentsSidePanel("right")}
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default TaskLinkWithDrawer;