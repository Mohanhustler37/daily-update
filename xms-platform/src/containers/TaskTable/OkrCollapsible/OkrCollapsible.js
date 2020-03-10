import React from "react";
import "./OkrCollapsible.scss";
import history from "../../../Routes/history";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import CreateTaskDrawer from "../../../components/TicketingSystem/TicketTable/SideDrawers/CreateTaskDrawer/CreateTaskDrawer";
import Avatar from "@material-ui/core/Avatar";
import DropDwnIcon from "../../../assets/icons/SVG/Icon ionic-ios-arrow-down.svg";
import addIcon from '../../../assets/Sidenavbar-icons/Addl2icon.svg'
import sidebarToggleIcon from "../../../assets/Sidenavbar-icons/Group 11332.svg";
import searchIcon from "../../../assets/Sidenavbar-icons/Icon feather-search-small.svg";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import { baseUrl } from "../../../constants";



function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.95em",
      width: "2em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${color} transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.95em",
      width: "2em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${color} transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: -2,
      marginLeft: "-0.95em",
      height: "2em",
      width: "2em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent #ffffff transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.95em",
      height: "2em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${color}`
      }
    }
  };
}

const useStylesArrow = makeStyles(theme => ({
  tooltip: {
    position: "relative",
    fontSize: 10,
    borderRadius: 100,
    backgroundColor: "#ffffff",
    color: "#656565",
    boxShadow: "0 3px 12px 0 #d2d2d2",
    marginLeft: "0.1em",
    padding: "4px 12px 4px 12px",
    textAlign: "center"
  },
  arrow: {
    position: "absolute",
    fontSize: 4,
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid"
    }
  },
  popper: arrowGenerator(theme.palette.grey[700])
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
              element: arrowRef
            }
          }
        }
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
      logedUser: {},
      myTickets: [],
      allTickets: [],
      statusInProgress: [],
      statusOpen: [],
      statusReOpen: [],
      statusResolve: [],
      ticketByCompany: [],
      ticketByAgent: [],
      highPriorityTickets: [],
      dueTicket: [],
      searchOption: "",
      taskByStatusInprogress: [],
      taskByStatusTodo: [],
      taskByStatusCompleted: [],
      taskByStatusChallanges: [],
      taskByUser: []
    };
  }

  sidebarSections = [
    {
      id: 1,
      heading: "Object Explorer",
      addIcon: addIcon,
      subheading: [
        { id: 1, name: "All", count: "24", tooltip: "All OKR" },
        { id: 2, name: "My Objectives", count: "12", path: "okrobjectives", tooltip: "My objective" },
        { id: 3, name: "Org. OKRs", count: "6", tooltip: "Org. OKRs" },
        { id: 4, name: "Team OKRs", count: "6", tooltip: "Team OKRs" },
        { id: 5, name: "Overdue OKRs", count: "6", tooltip: "Overdue OKRs" },
        { id: 6, name: "At-Risks OKRs", count: "6", tooltip: "AT-Risk OKRs" },
        { id: 7, name: "Recently completed OKRs", count: "6", tooltip: "Recently Completed OKRs" },
        { id: 8, name: "Unaligned OKRs", count: "6", tooltip: "Unaligned OKRs" }
      ]
    },
    {
      id: 2,
      heading: "Duration View",
      addIcon: "",
      subheading: [
        { id: 1, name: "Today Planning", count: "42", tooltip: "Today Planning" },
        { id: 2, name: "Weekly Planning", count: "12", tooltip: "Weekly Planning" },
        { id: 3, name: "Monthly Planning", count: "6", tooltip: "Monthly Planning" },
        { id: 4, name: "Quarterly Planning", count: "12", tooltip: "Quarterly Planning" }
      ]
    },
    {
      id: 3,
      heading: "My Teams",
      addIcon: "",
      subheading: [
        { id: 1, name: "Product Team", count: "42", avatar: "PT", tooltip: "Product Team"},
        { id: 2, name: "Marketing Team", count: "12", avatar: "PT", tooltip: "Marketing Team"}
      ]
    }
  ];

  componentDidMount() {
    var client = this.props.client;
    let requestBodyAllTkt2 = {
      query: `
          query tasksList 
            {
              tasksList{
                  id,
                  taskTitle,
                  taskDescription,
                  priority
              }
            }
        `
    };

    axios({
      method: "post",
      url: baseUrl.server,
      data: requestBodyAllTkt2,
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => {
        this.setState({ allTickets: res.data.data.tasksList });
        var data = res.data.data.tasksList;
        if (data != null) {
          this.sidebarSections[0].subheading[0].count = data.length;
          this.sidebarSections[1].subheading[0].count = data.length;
          this.sidebarSections[2].subheading[0].count = data.length;
          this.sidebarSections[0].subheading[0].data = data;
          this.sidebarSections[1].subheading[0].data = data;
          this.sidebarSections[0].subheading[0].data = data;
        }
        return res;
      })
      .catch(err => {
        console.log("Error in user==", err);
        return err;
      });
  }

  changeHndler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchTicketHere = () => {
    let searchTicket = {
      query: `
        mutation searchTicket($searchOption:String,$tenantId:Int,$companyId:Int) 
          {
            searchTicket(searchOption:$searchOption,tenantId:$tenantId,companyId:$companyId){name,id,statusId}
          }
      `,
      variables: { searchOption: this.state.searchOption,tenantId:parseInt(localStorage.getItem('tenantId')),companyId:parseInt(localStorage.getItem('companyId')) }
    };

    axios({
      method: "post",
      url: baseUrl.server,
      data: searchTicket,
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => {
        this.setState({ searchTickets: res.data.data.searchTicket });
        return res;
      })
      .catch(err => {
        console.log("Error in user==", err);
        return err;
      });
  };

  subheadingClickHandler = (heading, subheading) => {
    // this.props.refreshData(subheading);
    // this.sidebarIconClickHandler(subheading.path);
    // this.setState({ headingId: heading.id, subheadingId: subheading.id });
    this.setState({ headingId: heading.id, subheadingId: subheading.id })
    if (subheading.onClick) { subheading.onClick(subheading.id) }
    // this.props.refreshData(subheading.data);
  };
  sidebarIconClickHandler = path => {
    history.push(path);
  };

  OkrListingCollapse = () => (
    <>
      <div className="okr-listing-sidebar-header">
        OKR / <span>Objective</span>
      </div>
      <div className="innerl3searchsection">
      <div className="okr-lstng-sidebar-search-container">
        <TextField
          value={this.state.searchOption}
          name="searchOption"
          onChange={this.changeHndler}
          className="okr-listing-sidebar-search-field"
          placeholder="Search Habits"
          variant="outlined"
        />
        <img
          src={searchIcon}
          alt="searchIcon"
          onClick={this.searchTicketHere}
        />
      </div>
      </div>
      <div className="tasks-scrollable-section">
      {this.sidebarSections.map(section => (
        <div className="okr-sidebar-section">
          <div className="okr-section-header">
            <span className="okr-section-header-name">{section.heading}</span>{" "}
            {section.addIcon ? (
              <img
                src={section.addIcon}
                alt="addIcon"
                className="okr-section-header-icon"
                onClick={() =>
                  this.props.thisObj.setState({
                    isOpenCreateHabit: !this.props.thisObj.state
                      .isOpenCreateHabit
                  })
                }
              />
            ) : null}
          </div>
          {section.subheading.map(subheading => (
            <ArrowTooltip title={subheading.tooltip} placement="right">
              <div
                className={`okr-section-elements ${
                  section.id === this.state.headingId &&
                  subheading.id === this.state.subheadingId
                    ? "okr-active-section-element"
                    : null
                }`}
                onClick={() =>
                  this.subheadingClickHandler(section, subheading)
                }
              >
                <span
                  className="okr-element-name "
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {subheading.avatar ? (
                    <Avatar
                      style={{
                        marginRight: 10,
                        fontSize: 10,
                        height: 25,
                        width: 25
                      }}
                    >
                      {subheading.avatar}
                    </Avatar>
                  ) : null}
                  {subheading.name}
                </span>

                <span
                  className={`${
                    section.id === this.state.headingId &&
                    subheading.id === this.state.subheadingId
                      ? "okr-while-active-element-count"
                      : "okr-while-non-element-count"
                  }`}
                >
                  {subheading.count}
                </span>
              </div>
            </ArrowTooltip>
          ))}
        </div>
      ))}
      </div>
    </>
  );
  render() {
    return this.OkrListingCollapse();
  }
}

export default SideBarNew;
