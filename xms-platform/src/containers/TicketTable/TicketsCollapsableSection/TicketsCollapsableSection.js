import React from 'react';
import './TicketsCollapsableSection.scss';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import addIcon from '../../../assets/Sidenavbar-icons/Group 11382.svg';
import addl2icon from '../../../assets/Sidenavbar-icons/Addl2icon.svg';
import searchIcon from '../../../assets/Sidenavbar-icons/Icon feather-search-small.svg';
import {getLogedUser,getTicketByStatus,getTicketByStatusById,searchTicketMutation,
  getAllTkts,getAllTicketByAgent,getAllTicketByDue,getAllTicketByHighPriority
} from "../TicketTableQueries"
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
      isCTDrawerOpen: false,
      headingId: 1,
      subheadingId: 1,
      logedUser: {},
      myTickets: [],
      allTickets: [],
      statusInProgress: [],
      statusOpen: [],
      statusReOpen: [],
      statusResolve: [],
      statusClose:[],
      ticketByCompany: [],
      ticketByAgent: [],
      highPriorityTickets: [],
      dueTicket: [],
      searchOption: "",
      searchTickets: [],
    }
  }

  sidebarSections = [
    {
      id: 1, heading: 'TICKETS', addIcon: addl2icon, tooltip: "Add ticket", subheading: [
        { id: 1, name: 'All', count: '24', tooltip: "All tickets", onClick: this.props.thisObj.ticketsFilterHandler },
        { id: 2, name: 'My Tickets', count: '12', tooltip: "My tickets", onClick: this.props.thisObj.ticketsFilterHandler },
        { id: 3, name: 'Due Today', count: '6', tooltip: "Due today", onClick: this.props.thisObj.ticketsFilterHandler },
        { id: 4, name: 'On Priority', count: '6', tooltip: "On priority", onClick: this.props.thisObj.ticketsFilterHandler },
      ]
    },
    {
      id: 2, heading: 'STATUS', addIcon: '', subheading: [
        { id: 0, name: 'All', count: '42', tooltip: "All status", onClick: this.props.thisObj.statusFilterHandler },
        { id: 2, name: 'Open', count: '12', tooltip: "Open", onClick: this.props.thisObj.statusFilterHandler },
        { id: 3, name: 'In Progress', count: '6', tooltip: "In-progress", onClick: this.props.thisObj.statusFilterHandler },
        { id: 4, name: 'Resolved', count: '12', tooltip: "Resolved", onClick: this.props.thisObj.statusFilterHandler },
        { id: 6, name: 'Closed', count: '6', tooltip: "Closed", onClick: this.props.thisObj.statusFilterHandler },
      ]
    },
    {
      id: 3, heading: 'GROUPING', addIcon: '', subheading: [
        { id: 1, name: 'All', count: '42', tooltip: "Grouping" },
        { id: 2, name: 'Tasks by project', count: '12', tooltip: "Project" },
        // {id: 3, name: 'Ticket by company', count: '6'},
        { id: 4, name: 'Tasks by Team/Dept', count: '12', tooltip: "Team/Dept" },
      ]
    },
  ];

  componentDidMount() {
    const client = this.props.client
    getLogedUser(this.props.client,parseInt(localStorage.getItem('id')),res=>{
      this.setState({ logedUser: res})
    })

    getTicketByStatus(this.props.client,"Open",res=>{
      this.setState({ statusOpen: res.data.getTicketsByStatus })
      var data = res.data.getTicketsByStatus;
      this.sidebarSections[1].subheading[1].count = data.length;
      return res
    })

    getTicketByStatus(client,"In Progress",res=>{
      this.setState({ statusInProgress: res.data.getTicketsByStatus })
      var data = res.data.getTicketsByStatus;
      this.sidebarSections[1].subheading[2].count = data.length;
      return res
    })
    getTicketByStatus(client,"Resolved",res=>{
      this.setState({ statusResolve: res.data.getTicketsByStatus })
      var data = res.data.getTicketsByStatus;
      this.sidebarSections[1].subheading[3].count = data.length;
      return res
    })
    getTicketByStatus(client,"Closed",res=>{
      this.setState({statusClose:res.data.getTicketsByStatus});
      var data = res.data.getTicketsByStatus;
      this.sidebarSections[1].subheading[4].count = data.length;
      return res
    })

    // getTicketByStatusById(client,1,res=>{
    //   this.setState({ statusOpen: res.data.getTicketByStatus })
    //   var data = res.data.getTicketByStatus;
    //   alert(data.length)
    //   this.sidebarSections[1].subheading[1].count = data.length;
    //   return res
    // })
    // getTicketByStatusById(client,2,res=>{
    //   this.setState({ statusInProgress: res.data.getTicketByStatus })
    //   var data = res.data.getTicketByStatus;
    //   this.sidebarSections[1].subheading[2].count = data.length;
    //   return res
    // })
    // getTicketByStatusById(client,3,res=>{
    //   this.setState({ statusOpen: res.data.getTicketByStatus })
    //   var data = res.data.getTicketByStatus;
    //   this.sidebarSections[1].subheading[3].count = data.length;
    //   return res
    // })

    getAllTkts(client,res=>{
      this.setState({ allTickets: res.data.ticketsList })
      var data = res.data.ticketsList;
      this.sidebarSections[0].subheading[0].count = data.length;
      this.sidebarSections[1].subheading[0].count = data.length;
      this.sidebarSections[2].subheading[0].count = data.length;

      return res
    })

    getAllTicketByAgent(client,parseInt(localStorage.getItem('id')),res=>{
      this.setState({ ticketByAgent: res.data.getTicketByAgent })
      var data = res.data.getTicketByAgent;
      this.sidebarSections[0].subheading[1].count = data.length;
      return res;
    })

    getAllTicketByDue(client,res=>{
      this.setState({ dueTickets: res.data.DueTickets })
      var data = res.data.DueTickets;
      this.sidebarSections[0].subheading[2].count = data.length;
      return res
    })


    getAllTicketByHighPriority(client,res=>{
      this.setState({ highPriorityTickets: res.data.highPriorityTickets })
      var data = res.data.highPriorityTickets;
      this.sidebarSections[0].subheading[3].count = data.length;
      return res
    })
  }

  changeHandler = async(e) => {
    await this.setState({ [e.target.name]: e.target.value })
    this.searchTicketHere();
  }

  searchTicketHere = () => {
    let variables= { 
      searchOption: this.state.searchOption,
      managerId:4,tenantId:parseInt(localStorage.getItem('tenantId')),
      companyId:parseInt(localStorage.getItem('companyId')) 
    }

    searchTicketMutation(this.props.client,variables,res=>{
      this.setState({ searchTickets: res.data.searchTicket})
      this.props.thisObj.setState({searchTicketTrue:true,isDataFromDropdown:false,searchTicketData:res.data.searchTicket})
      return res
    })

  }

  subheadingClickHandler = (heading, subheading) => {
    this.setState({ headingId: heading.id, subheadingId: subheading.id })
    if (subheading.onClick) { subheading.onClick(subheading.id,subheading.name) }

  }

  tableListingCollapse = () => (
    <>
      <div className='tckt-sidebar-header'><p>Support&nbsp;/&nbsp;<span>Tickets</span></p></div>
      <div className="innerl2searchsection">
      <div className='sidebar-search-container'>
        <TextField value={this.state.searchOption} name="searchOption" onChange={this.changeHandler}
          className='sidebar-search-field' placeholder='Search Tickets' variant="outlined"
        />
        <img src={searchIcon} alt='searchIcon' onClick={this.searchTicketHere} />
      </div>
      </div>
      <div className='tickets-scrollable-section' onClick={()=>this.props.thisObj.setState({searchTicketTrue:false})}>
      {
        this.sidebarSections.map(section => (
          <div className='sidebar-ticket-section'>
            <div className='section-header'>
              <span className='section-header-name'>{section.heading}</span> {section.addIcon ?
              <ArrowTooltip title={section.tooltip} placement="right"> 
                <img className="section-header-icon" src={section.addIcon} alt='addIcon'
                  onClick={() => this.props.thisObj.setState({ isCTDrawerOpen: !this.props.thisObj.state.isCTDrawerOpen })} /> 
                  </ArrowTooltip>: null}
          
            </div>
            {/* {
              <ArrowTooltip title="Add ticket" placement="right"></ArrowTooltip>
            } */}
            {
              section.subheading.map(subheading => (
                <ArrowTooltip title={subheading.tooltip} placement="right">
                  <div className={`section-elements ${section.id === this.state.headingId && subheading.id === this.state.subheadingId ? 'active-section-element' : null}`} onClick={() => this.subheadingClickHandler(section, subheading)}>
                    <span className='element-name '>{subheading.name}</span>
                    <span className={`${section.id === this.state.headingId && subheading.id === this.state.subheadingId ? 'while-active-element-count' : 'while-non-element-count'}`}>{subheading.count}</span>
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
  render() {
    return this.tableListingCollapse()
  }
}

export default SideBarNew;
