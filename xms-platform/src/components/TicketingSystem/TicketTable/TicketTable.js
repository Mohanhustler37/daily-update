import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import more from "../../../assets/icons/SVG/Iconawesome-ellipsis-v.svg";
import "./TicketTable.scss";
import axios from "axios";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { InMemoryCache } from "apollo-cache-inmemory";
import TicketEditIcon from "../../../assets/icons/SVG/Iconfeather-edit-3.svg";
import AssignToImage from "../../../assets/images/profile.png";
import { baseUrl } from "../../../constants";
import Fab from "@material-ui/core/Fab";
import Drawer from "@material-ui/core/Drawer";
import BulkUpdate from "./SideDrawers/BulkUpdate";
import MergerDrawer from "./SideDrawers/MergeDrawer/MergeDrawer";
import ForwardDrawer from "./SideDrawers/ForwardDrawer/ForwardDrawer";
import TicketListBtmPopup from "../TicketListBtmPopup/TicketListBtmPopup";
import TicketListTimeIcon from "../../../assets/icons/01-10-2019/Icon feather-check-circle.svg";
import TicketListCriticalIcon from "../../../assets/icons/SVG/Ellipse 23.svg";
import TicketListAddIcon from "../../../assets/icons/01-10-2019/Icon feather-plus-circle.svg";
import TasksListPopupEdit from "../../../assets/icons/01-10-2019/Icon feather-edit.svg";
import TasksListPopupAssign from "../../../assets/icons/01-10-2019/Icon material-description.svg";
import TasksListPopupBulk from "../../../assets/icons/01-10-2019/Icon feather-mail.svg";
import TasksListPopupMerge from "../../../assets/icons/01-10-2019/Icon material-call-merge.svg";
import TasksListPopupForward from "../../../assets/icons/LoginAndRegistration_icons/Icon ionic-md-arrow-forward.svg";
import TasksListPopupDuplicate from "../../../assets/icons/15-10-2019/Icon material-control-point-duplicate.svg";
import TasksListPopupDelete from "../../../assets/icons/01-10-2019/Icon material-delete-sweep.svg";
import TasksListPopupClose from "../../../assets/icons/01-10-2019/Icon ionic-ios-close-circle-outline.svg";
import PickColorLock from "../../../assets/icons/01-10-2019/color-pick-lock.svg";
import { CirclePicker } from "react-color";
import InputBase from "@material-ui/core/InputBase";
import useStyles from "./useStyles";
import LazyLoad from "react-lazyload";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Dragula from "react-dragula";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import searchicon from "../../../assets/icons/SVG/Icon feather-search.svg";
import BottomPopupAvatar from "../../../assets/icons/01-10-2019/Rectangle 527.svg";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { Scrollbars } from "react-custom-scrollbars";
import Slider from "@material-ui/core/Slider";
import LogTimerIcon from "../../../assets/icons/01-10-2019/Icon open-timer.svg";
import ticketStatusArrow from "../../../assets/icons/SVG/Icon ionic-ios-arrow-back.svg";

import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {
  GetDepartments,
  GetCompanies,
  GetStatus,
  GetPriority,
  GetTeams,
  GetProjects
} from "./EditTicketQueries";

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: baseUrl.server
});

// API CODE STARTS

const ASSIGN_TO_AGENT = gql`
  mutation UpdateStatus($id: Int!, $agentId: Int!) {
    assignTicketByManager(id: $id, assigned_to_agent_id: $agentId) {
      id
      name
      ticketDescription
      statusId
      assignedToAgentId
    }
  }
`;

const Get_Tickets = gql`
  query {
    ticket(id: 7) {
      id
      name
      ticketDescription
      statusId
    }
  }
`;

const Get_Ticket_under_manager = gql`
  query GetTicketUnderManager($managerId: Int, $pageNo: Int) {
    getTicketUnderManager(managerId: $managerId, pageNo: $pageNo) {
      id
      name
      ticketDescription
      userId
      statusId
      tenantId
      companyId
    }
  }
`;
const Get_All_Tickets = gql`
  query {
    ticketsList {
      id
      name
      ticketDescription
      userId
      tenantId
      companyId
      statusId
      priorityId
    }
  }
`;
const UPDATE_PRIORITY = gql`
  mutation UpdatePriority($id: Int!, $priorityId: Int!) {
    ticketpriorityupdate(id: $id, priorityId: $priorityId) {
      id
      priorityId
    }
  }
`;
const UPDATE_ASSIGNEDTO = gql`
  mutation UpdatePriority($id: Int!, $assignedToAgentId: Int!) {
    assignTicketByManager(id: $id, assignedToAgentId: $assignedToAgentId) {
      id
      assignedToAgentId
    }
  }
`;

// API CODE ENDS

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

function EnhancedTableHead(props, index) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  const [ischeckboxPopup, setcheckboxPopup] = React.useState(false);
  const [checkboxpopupId, updatecheckboxPopupId] = React.useState(null);

  const [state, setState] = React.useState({});

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const showcheckboxListPopup = index => {
    setcheckboxPopup(!ischeckboxPopup);
    updatecheckboxPopupId(index);
  };

  return (
    <TableHead id="ticket-table-header">
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox />
        </TableCell>

        <TableCell align="right">TICKET NO.</TableCell>
        <TableCell align="right">CUSTOMER</TableCell>
        <TableCell align="right">SUBJECT</TableCell>
        <TableCell align="right">STATUS</TableCell>
        <TableCell align="right">TAGS</TableCell>
        <TableCell align="right">PRIORITY</TableCell>
        <TableCell align="right">TYPE</TableCell>
        <TableCell align="right">ASSIGNTO</TableCell>
        <TableCell align="right">RESPONSE</TableCell>
        <TableCell style={{ textAlign: "left" }}>
          <Fab
            className="ticket-table-edit-icon"
            size="small"
            aria-label="add"
            onClick={() => showcheckboxListPopup(index)}
          >
            <img src={TicketEditIcon} alt="" />
          </Fab>
          {checkboxpopupId === index && ischeckboxPopup ? (
            <div className="ticket-popup-main">
              <div className="ticket-popup-sub">
                <div className="ticket-popup-heading">
                  <div className="edit-text ">
                    <p>EDIT</p>
                  </div>
                  <div className="visible-text">
                    <p>VISIBLE</p>
                  </div>
                </div>

                <div>
                  <div className="ticket-popup-list">
                    <div className="popup-text">
                      <p>Customer</p>
                    </div>
                    <div className="popup-checkbox">
                      <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={state.checkedA}
                            onChange={handleChange("checkedA")}
                            value="checkedA"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="ticket-popup-list">
                    <div className="popup-text">
                      <p>Subject</p>
                    </div>
                    <div className="popup-checkbox">
                      <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={state.checkedB}
                            onChange={handleChange("checkedB")}
                            value="checkedB"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="ticket-popup-list">
                    <div className="popup-text">
                      <p>Status</p>
                    </div>
                    <div className="popup-checkbox">
                      <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={state.checkedC}
                            onChange={handleChange("checkedC")}
                            value="checkedC"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="ticket-popup-list">
                    <div className="popup-text">
                      <p>Manager</p>
                    </div>
                    <div className="popup-checkbox">
                      <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={state.checkedD}
                            onChange={handleChange("checkedD")}
                            value="checkedD"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="ticket-popup-list">
                    <div className="popup-text">
                      <p>Priority</p>
                    </div>
                    <div className="popup-checkbox">
                      <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={state.checkedE}
                            onChange={handleChange("checkedE")}
                            value="checkedE"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="ticket-popup-list">
                    <div className="popup-text">
                      <p>Types</p>
                    </div>
                    <div className="popup-checkbox">
                      <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={state.checkedF}
                            onChange={handleChange("checkedF")}
                            value="checkedF"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="ticket-popup-list">
                    <div className="popup-text">
                      <p>Response time(RT)</p>
                    </div>
                    <div className="popup-checkbox">
                      <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={state.checkedG}
                            onChange={handleChange("checkedG")}
                            value="checkedG"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="ticket-popup-list">
                    <div className="popup-text">
                      <p>Assign to</p>
                    </div>
                    <div className="popup-checkbox">
                      <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={state.checkedH}
                            onChange={handleChange("checkedH")}
                            value="checkedH"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="ticket-popup-list">
                    <div className="popup-text">
                      <p>Tags</p>
                    </div>
                    <div className="popup-checkbox">
                      <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={state.checkedI}
                            onChange={handleChange("checkedI")}
                            value="checkedI"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="ticket-popup-list-one">
                    <div className="popup-text">
                      <p>Company</p>
                    </div>
                    <div className="popup-checkbox1">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedJ}
                            onChange={handleChange("checkedJ")}
                            value="checkedJ"
                            //    color="primary"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="ticket-popup-list-one">
                    <div className="popup-text">
                      <p>Created at</p>
                    </div>
                    <div className="popup-checkbox1">
                      <FormControlLabel
                        control={
                          <Checkbox
                            //   className="popupicon"
                            checked={state.checkedK}
                            onChange={handleChange("checkedK")}
                            value="checkedK"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="ticket-popup-list-one">
                    <div className="popup-text">
                      <p>First response time</p>
                    </div>
                    <div className="popup-checkbox1">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedL}
                            onChange={handleChange("checkedL")}
                            value="checkedL"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="ticket-popup-list-one">
                    <div className="popup-text">
                      <p>Response time</p>
                    </div>
                    <div className="popup-checkbox1">
                      <FormControlLabel
                        control={
                          <Checkbox
                            //   className="popupicon"
                            checked={state.checkedM}
                            onChange={handleChange("checkedM")}
                            value="checkedM"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="ticket-popup-list-one">
                    <div className="popup-text">
                      <p>Resolution time</p>
                    </div>
                    <div className="popup-checkbox1">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedN}
                            onChange={handleChange("checkedN")}
                            value="checkedN"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="ticket-popup-list-one">
                    <div className="popup-text">
                      <p>Type waiting since</p>
                    </div>
                    <div className="popup-checkbox1">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedO}
                            onChange={handleChange("checkedO")}
                            value="checkedO"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="ticket-popup-list-one">
                    <div className="popup-text">
                      <p>Business hours</p>
                    </div>
                    <div className="popup-checkbox1">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedP}
                            onChange={handleChange("checkedP")}
                            value="checkedP"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="ticket-popup-list-one">
                    <div className="popup-text">
                      <p>Contact</p>
                    </div>

                    <div className="popup-checkbox1">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedQ}
                            onChange={handleChange("checkedGQ")}
                            value="checkedQ"
                          />
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickD = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Ticket NO");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isShowPopup, setShowPopup] = React.useState(false);
  const [popupId, updatePopupId] = React.useState(null);
  const [state, setState] = React.useState({ right: false });
  const [id, setId] = React.useState(0);
  const [ticketpriorityupdate, { data1 }] = useMutation(UPDATE_PRIORITY);
  const [assignTicketByManager, { data2 }] = useMutation(UPDATE_ASSIGNEDTO);
  const [isTicketBtnActive, setTicketBtn] = React.useState(false);
  const [ischeckActive, setTicketcheck] = React.useState(false);
  const [isShowBtnPopup, setBtnPopup] = React.useState(false);
  const [checkBoxValue, checkBoxSetState] = React.useState([]);
  const [isAddNoteTktOpen, setAddNoteTktOpen] = React.useState(false);
  const [ticketAddNote, setTicketAddNote] = React.useState(null);
  const [isNotesPrivate, setTktNotePrivate] = React.useState(false);
  const [addTktNoteObj, setAddTktNoteObj] = React.useState({});

  // Edit related state starts 26th Oct
  const [editState, setEditState] = React.useState({ right: false });
  const [recordData, setRecordData] = React.useState();
  const [name, setName] = React.useState();
  const [ticket_description, setTextArea] = React.useState();
  const [company, setCompanyState] = React.useState({ companyName: "" });
  const [status, setStatusState] = React.useState({ statusName: "" });
  const [priority, setPriorityState] = React.useState({ priorityName: "" });
  const [tags, setTagsState] = React.useState({ tagsName: [] });
  const [ticketType, setTicketTypeState] = React.useState({
    ticketTypeName: ""
  });
  const [manager, setManagerState] = React.useState({ managerName: "" });
  const [assignedTo, setAssignedToState] = React.useState({
    assignedToName: ""
  });
  const [department, setDepartmentState] = React.useState({
    departmentName: ""
  });
  const [team, setTeamState] = React.useState({ teamName: "" });
  const [project, setProjectState] = React.useState({ projectName: "" });
  const [contact, setContactState] = React.useState({ contactName: "" });

  // Edit related state ends 26th Oct

  const [merge, setMerge] = React.useState({ right: false });

  const [forward, setForward] = React.useState({ right: false });
  const [departMentApiData, setDepartMentData] = React.useState();
  const [companyApiData, setCompanyData] = React.useState();
  const [statusApiData, setStatusData] = React.useState();
  const [priorityApiData, setPriorityData] = React.useState();
  const [teamApiData, setTeamData] = React.useState();
  const [projectApiData, setProjectData] = React.useState();

  const { data, error } = useQuery(Get_Ticket_under_manager, {
    variables: { managerId: 2, pageNo: 1 }
  });

  GetDepartments(client, departData => {
    if (
      departMentApiData == "" ||
      departMentApiData == undefined ||
      departMentApiData == null
    ) {
      setDepartMentData({
        departMentApiData: departData.data.getAllDepartments
      });
    }
  });
  GetCompanies(client, compData => {
    if (
      companyApiData == "" ||
      companyApiData == undefined ||
      companyApiData == null
    ) {
      setCompanyData({
        companyApiData: compData.data.getAllCompany
      });
    }
  });
  GetStatus(client, statusData => {
    if (
      statusApiData == "" ||
      statusApiData == undefined ||
      statusApiData == null
    ) {
      setStatusData({
        statusApiData: statusData.data.getAllStatus
      });
    }
  });
  GetPriority(client, priorityData => {
    if (
      priorityApiData == "" ||
      priorityApiData == undefined ||
      priorityApiData == null
    ) {
      setPriorityData({
        priorityApiData: priorityData.data.priorities
      });
    }
  });
  GetTeams(client, teamData => {
    if (teamApiData == "" || teamApiData == undefined || teamApiData == null) {
      setTeamData({
        teamApiData: teamData.data.getAllTeams
      });
    }
  });
  GetProjects(client, projectData => {
    if (
      projectApiData == "" ||
      projectApiData == undefined ||
      projectApiData == null
    ) {
      setProjectData({
        projectApiData: projectData.data.getAllProjects
      });
    }
  });

  let samePageData =
    data &&
    data.getTicketUnderManager != null &&
    data.getTicketUnderManager != undefined
      ? data.getTicketUnderManager
      : "";

  let propsData =
    props.sortData != "" &&
    props.sortData != null &&
    props.sortData != undefined
      ? props.sortData
      : "";

  let mapData = propsData ? propsData : samePageData;

  let checkedList = [];

  const [mutate] = useMutation(ASSIGN_TO_AGENT, {
    variables: { agentId: 3, id: 24 }
  });

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = mapData.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  function Example() {
    useEffect(() => console.log("mounted"), []);
    return null;
  }
  Example();

  const ticketHandleClick = (event, index) => {
    setBtnPopup(!isShowBtnPopup);
    updatePopupId(index);
  };

  const handleClick = (event, index, ticketId) => {
    if (event.target.checked) {
      checkedList.push(index);
    } else if (!event.target.checked) {
      checkedList.pop();
    }
    if (checkedList.length > 0) {
      setTicketBtn(true);
    } else {
      setTicketBtn(false);
    }
  };
  // const handleCheck = name => event => {
  //      setState({ ...state, [name]: event.target.checked });
  //    };
  //    var multicheck=JSON.stringify(state)
  const handleCheckBox = event => {
    if (event.target.checked) {
      checkBoxSetState([...checkBoxValue, Number(event.target.value)]);
      return;
    }
    checkBoxSetState([]);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const showTicketListPopup = index => {
    setShowPopup(!isShowPopup);
    updatePopupId(index);
  };

  const toggleDrawer = (side, open) => event => {
    setState({ ...state, [side]: open });
  };
  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, true)}
      onKeyDown={toggleDrawer(side, true)}
    >
      <BulkUpdate />
    </div>
  );

  const mergeDrawer = (side, open) => event => {
    setMerge({ ...merge, [side]: open });
  };
  const mergeList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={mergeDrawer(side, true)}
      onKeyDown={mergeDrawer(side, true)}
    >
      <MergerDrawer />
    </div>
  );

  const forwardDrawer = (side, open, id, ticketType) => event => {
    setId(id, ticketType);
  };
  var checkvalue = id;
  const forwardList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={forwardDrawer(side, true)}
      onKeyDown={forwardDrawer(side, true)}
    >
      <ForwardDrawer value={checkvalue}></ForwardDrawer>
    </div>
  );
  const [isShowPopupTime, setPopupTime] = React.useState(false);
  //const [popupTime, updatePopupTime] = React.useState(null);
  const TimeOnCLick = () => {
    setPopupTime(!isShowPopupTime);
  };

  const usersList = [
    { id: 0, avatharImg: "", name: "John doe" },
    { id: 1, avatharImg: "", name: "Ryan pazos" },
    { id: 2, avatharImg: "", name: "John doe" },
    { id: 3, avatharImg: "", name: "Mark" },
    { id: 4, avatharImg: "", name: "John doe" },
    { id: 5, avatharImg: "", name: "Ryan pazos" },
    { id: 6, avatharImg: "", name: "John doe" }
  ];

  const ticketStatus = [
    { id: 0, avatharImg: "", name: "New" },
    { id: 1, avatharImg: "", name: "Open" },
    { id: 2, avatharImg: "", name: "Inprogres" },
    { id: 3, avatharImg: "", name: "Resolved" },
    { id: 4, avatharImg: "", name: "Reopen" }
  ];

  const [isShowPickColor, setPickColor] = React.useState(false);
  const [pickColor, updatePickColor] = React.useState(null);
  const [isShowPopupthree, setPopupthree] = React.useState(false);
  const [popupthree, updatePopupthree] = React.useState(null);
  const [isShowTktStsPopup, setShowTktStsPopup] = React.useState(false);

  const popupThreeOnCLick = index => {
    setPopupthree(!isShowPopupthree);
    updatePopupthree(index);
  };

  const [selecteId, updateSelectedValue] = React.useState();

  const HandleClickfunction = (e, index) => {
    updateSelectedValue(index);
  };

  const popUpPickColor = index => {
    setPickColor(!isShowPickColor);
    updatePickColor(index);
  };
  const dragulaDecorator = componentBackingInstance => {
    if (componentBackingInstance) {
      let options = {};
      Dragula([componentBackingInstance], options);
    }
  };

  const makeNotePrivateHandler = event => {
    setTktNotePrivate(event.target.checked);
  };
  const textAreaChangeHandler = event => {
    setTicketAddNote(event.target.value);
  };

  const openAddNoteToTicketHandler = ticket => {
    setAddTktNoteObj(ticket);
    setAddNoteTktOpen(true);
  };

  const addNoteTotktHandler = async () => {
    let requestBody = {
      query: `
                mutation createNote(
                    $ticketId: Int!,
                    $userId: Int!
                                    $tenantId: Int!,
                    $companyId: Int!,
                    $notesDescription: String!
                ) {
                    createNote(
                        ticketId: $ticketId,
                        userId: $userId,
                        tenantId: $tenantId,
                        companyId: $companyId,
                        notesDescription: $notesDescription

                    ) {
                        id,
                            notesDescription,

                                }
                }
                `,
      variables: {
        ticketId: addTktNoteObj.id,
        userId: addTktNoteObj.userId,
        tenantId: addTktNoteObj.tenantId,
        companyId: 1,
        notesDescription: ticketAddNote
      }
    };

    let resData = await axios({
      method: "post",
      url: baseUrl.server,
      data: requestBody,
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => {
        setAddNoteTktOpen(false);
        return res;
      })
      .catch(err => {
        return err;
      });
  };

  // Edit related code starts 26th Oct
  const editTicketDrawer = (side, open, ticket) => event => {
    if (
      event.type === "keydown" &&
      event.key === "Tab" &&
      event.key === "Shift"
    ) {
      return;
    }
    setEditState({ ...editState, [side]: open });
    setRecordData({ recordData: ticket });
  };
  const handleChangeCompany = companyName => event => {
    setCompanyState({ ...company, [companyName]: event.target.value });
  };
  const handleChangeStatus = statusName => event => {
    setStatusState({ ...status, [statusName]: event.target.value });
  };
  const handleChangePriority = priorityName => event => {
    setPriorityState({ ...priority, [priorityName]: event.target.value });
  };
  const handleChangeTags = tagsName => event => {
    setTagsState({ ...tags, [tagsName]: event.target.value });
  };
  const handleChangeTicketType = ticketTypeName => event => {
    setTicketTypeState({ ...ticketType, [ticketTypeName]: event.target.value });
  };
  const handleChangeManager = managerName => event => {
    setManagerState({ ...manager, [managerName]: event.target.value });
  };
  const handleChangeAssignedTo = assignedToName => event => {
    setAssignedToState({ ...assignedTo, [assignedToName]: event.target.value });
  };
  const handleChangeDepartment = departmentName => event => {
    setDepartmentState({ ...department, [departmentName]: event.target.value });
  };
  const handleChangeTeam = teamName => event => {
    setTeamState({ ...team, [teamName]: event.target.value });
  };
  const handleChangeContact = contactName => event => {
    setContactState({ ...contact, [contactName]: event.target.value });
  };
  const handleChangeProject = projectName => event => {
    setProjectState({ ...project, [projectName]: event.target.value });
  };
  const handleChangeText = event => {
    setName({ name: event.target.value });
  };

  const handleChangeTextarea = event => {
    setTextArea({ ticket_description: event.target.value });
  };
  const updateTicket = async e => {
    let requestBody = {
      query: `
              mutation UpdateTicket(
                  $name: String, $ticket_description: String,$id:Int!,$company:Int!,$status:Int,$priority:Int,$tags:JSON,
                  $ticketType:String!,$manager:Int!,$assignedTo:Int!,$department:Int!,$team:Int!,$project:Int!,
                ) {
                updateTicket(
                    id:$id,
                    name: $name, 
                    ticketDescription: $ticket_description,
                    companyId:$company,
                    statusId:$status,
                    priorityId:$priority,
                    tags:$tags,ticketType:$ticketType,
                    managerId:$manager,
                    assignedToAgentId:$assignedTo,
                    departmentId:$department,
                    teamId:$team,
                    projectId:$project,
                ) {
                  id
                  name
                  ticketDescription
                  userId
                  ticketType
                  priorityId
                }
              }
            `,
      variables: {
        id: recordData.recordData.id,
        name: name && name.name ? name.name : recordData.recordData.name,
        ticket_description:
          ticket_description && ticket_description.ticket_description
            ? ticket_description.ticket_description
            : recordData.recordData.ticketDescription,
        company: Number(
          company &&
            company.companyName != null &&
            company.companyName != undefined
            ? company.companyName
            : recordData.recordData.companyId
        ),
        status: Number(
          status && status.statusName != null && status.statusName != undefined
            ? status.statusName
            : recordData.recordData.statusId
        ),
        priority: Number(
          priority &&
            priority.priorityName != null &&
            priority.priorityName != undefined
            ? priority.priorityName
            : recordData.recordData.priorityId
        ),
        tags:
          tags && tags.tagsName != null && tags.tagsName != undefined
            ? tags.tagsName
            : recordData.recordData.tags,
        ticketType:
          ticketType &&
          ticketType.ticketTypeName != null &&
          ticketType.ticketTypeName != undefined
            ? ticketType.ticketTypeName
            : recordData.recordData.ticketType,
        manager: Number(
          manager &&
            manager.managerName != null &&
            manager.managerName != undefined
            ? manager.managerName
            : recordData.recordData.managerId
        ),
        assignedTo: Number(
          assignedTo &&
            assignedTo.assignedToName != null &&
            assignedTo.assignedToName != undefined
            ? assignedTo.assignedToName
            : recordData.recordData.assignedToAgentId
        ),
        department: Number(
          department &&
            department.departmentName != null &&
            department.departmentName != undefined
            ? department.departmentName
            : recordData.recordData.departmentId
        ),
        team: Number(
          team && team.teamName != null && team.teamName != undefined
            ? team.teamName
            : recordData.recordData.teamId
        ),
        project: Number(
          project &&
            project.projectName != null &&
            project.projectName != undefined
            ? project.projectName
            : project.projectId
        )
        // contact: contact.contactName
      }
    };

    let resData = await axios({
      method: "post",
      url: baseUrl.server,
      data: requestBody
    })
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
    if (resData.status == 200) {
      setState({ ...editState, ["right"]: false });
      window.location.href = "/ticketlisting";
    } else {
      // window.location.href = '/createticket';
    }
  };
  const editSidePanel = (side, ticket, index) => (
    <div className={classes.list} role="presentation">
      <div className="edit-sidebar-container">
        <div className="edit-sidebar-header">
          <div className="edit-heading">
            EDIT TICKET{" "}
            <span>
              (
              {recordData && recordData.recordData
                ? recordData.recordData.id
                : ""}
              )
            </span>
          </div>
          <div
            className="cancel-x"
            onClick={editTicketDrawer(side, false)}
            onKeyDown={editTicketDrawer(side, false)}
          >
            X
          </div>
        </div>
        <div>
          <div className="create-ticket-body-input-base-two">
            <div className="ticket-type-container">
              <FormControl>
                <InputLabel htmlFor="demo-controlled-open-select">
                  Company
                </InputLabel>
                <div className="edit-ticket-menu-item">
                  <Select
                    // value={recordData && recordData.recordData? recordData.recordData.company:''}
                    value={company.companyName}
                    onChange={handleChangeCompany("companyName")}
                    disableUnderline
                    inputProps={{
                      companyName: "companyName",
                      id: "age-native-simple"
                    }}
                  >
                    {companyApiData
                      ? companyApiData.companyApiData.map(cData => {
                          return (
                            <MenuItem value={cData.id}>
                              {cData.companyName}
                            </MenuItem>
                          );
                        })
                      : ""}
                  </Select>
                </div>
              </FormControl>
            </div>
            <div className="ticket-title-container">
              <TextField
                label="SUBJECT"
                id="margin-none"
                variant="outlined"
                placeholder={
                  recordData && recordData.recordData
                    ? recordData.recordData.name
                    : ""
                }
                className={classes.textField}
                // name=''
                defaultValue={
                  recordData && recordData.recordData
                    ? recordData.recordData.name
                    : ""
                }
                onChange={e => handleChangeText(e)}
              />
            </div>
          </div>
          <div className="create-ticket-body-input-base-two">
            <div className="ticket-type-container">
              <FormControl>
                <InputLabel htmlFor="demo-controlled-open-select">
                  Status
                </InputLabel>
                <div className="edit-ticket-menu-item">
                  <Select
                    // value={recordData && recordData.recordData? recordData.recordData.company:''}
                    value={status.statusName}
                    onChange={handleChangeStatus("statusName")}
                    disableUnderline
                    inputProps={{
                      companyName: "statusName",
                      id: "age-native-simple"
                    }}
                  >
                    {statusApiData
                      ? statusApiData.statusApiData.map(sData => {
                          return (
                            <MenuItem value={sData.id}>
                              {sData.statusName}
                            </MenuItem>
                          );
                        })
                      : ""}
                  </Select>
                </div>
              </FormControl>
            </div>
            <div className="ticket-type-container">
              <FormControl>
                <InputLabel htmlFor="demo-controlled-open-select">
                  Priority
                </InputLabel>
                <div className="edit-ticket-menu-item">
                  <Select
                    // value={recordData && recordData.recordData? recordData.recordData.company:''}
                    value={priority.priorityName}
                    onChange={handleChangePriority("priorityName")}
                    disableUnderline
                    inputProps={{
                      companyName: "priorityName",
                      id: "age-native-simple"
                    }}
                  >
                    {priorityApiData
                      ? priorityApiData.priorityApiData.map(pData => {
                          return (
                            <MenuItem value={pData.id}>
                              {pData.priorityname}
                            </MenuItem>
                          );
                        })
                      : ""}
                  </Select>
                </div>
              </FormControl>
            </div>
          </div>
          <div className="create-ticket-text-area">
            <TextareaAutosize
              label="DESCRIPTION"
              id="margin-none"
              variant="outlined"
              aria-label="minimum height"
              rows={3}
              placeholder="Ticket description"
              onChange={e => handleChangeTextarea(e)}
            >
              {recordData && recordData.recordData
                ? recordData.recordData.ticketDescription
                : ""}
            </TextareaAutosize>
          </div>
          <div className="create-ticket-body-input-base-two">
            <div className="ticket-type-container">
              <FormControl>
                <InputLabel htmlFor="demo-controlled-open-select">
                  Tags
                </InputLabel>
                <div className="edit-ticket-menu-item">
                  <Select
                    multiple
                    // value={recordData && recordData.recordData? recordData.recordData.company:''}
                    value={tags.tagsName}
                    onChange={handleChangeTags("tagsName")}
                    disableUnderline
                    inputProps={{
                      companyName: "tagsName",
                      id: "age-native-simple"
                    }}
                  >
                    <MenuItem value="1">Risk</MenuItem>
                    <MenuItem value="2">Critical Customer</MenuItem>
                    <MenuItem value="3">Phase1</MenuItem>
                    <MenuItem value="4">Technical</MenuItem>
                  </Select>
                </div>
              </FormControl>
            </div>
            <div className="ticket-type-container">
              <FormControl>
                <InputLabel htmlFor="demo-controlled-open-select">
                  Type
                </InputLabel>
                <div className="edit-ticket-menu-item">
                  <Select
                    // value={recordData && recordData.recordData? recordData.recordData.company:''}
                    value={ticketType.ticketTypeName}
                    onChange={handleChangeTicketType("ticketTypeName")}
                    disableUnderline
                    inputProps={{
                      companyName: "ticketTypeName",
                      id: "age-native-simple"
                    }}
                  >
                    <MenuItem value="1">Service Request</MenuItem>
                    <MenuItem value="2">Incident</MenuItem>
                    <MenuItem value="3">Problem</MenuItem>
                  </Select>
                </div>
              </FormControl>
            </div>
          </div>
          <div className="create-ticket-body-input-base-two">
            <div className="ticket-type-container">
              <FormControl>
                <InputLabel htmlFor="demo-controlled-open-select">
                  Manager
                </InputLabel>
                <div className="edit-ticket-menu-item">
                  <Select
                    // value={recordData && recordData.recordData? recordData.recordData.company:''}
                    value={manager.managerName}
                    onChange={handleChangeManager("managerName")}
                    disableUnderline
                    inputProps={{
                      companyName: "managerName",
                      id: "age-native-simple"
                    }}
                  >
                    <MenuItem value="1">Sugata Maji</MenuItem>
                    <MenuItem value="2">Mohan</MenuItem>
                  </Select>
                </div>
              </FormControl>
            </div>
            <div className="ticket-type-container">
              <FormControl>
                <InputLabel htmlFor="demo-controlled-open-select">
                  Assigned To
                </InputLabel>
                <div className="edit-ticket-menu-item">
                  <Select
                    // value={recordData && recordData.recordData? recordData.recordData.company:''}
                    value={assignedTo.assignedToName}
                    onChange={handleChangeAssignedTo("assignedToName")}
                    disableUnderline
                    inputProps={{
                      companyName: "assignedToName",
                      id: "age-native-simple"
                    }}
                  >
                    <MenuItem value="1">John Doe</MenuItem>
                    <MenuItem value="2">Sugata Maji</MenuItem>
                    <MenuItem value="3">Mohan</MenuItem>
                  </Select>
                </div>
              </FormControl>
            </div>
          </div>
          <div className="create-ticket-body-input-base-two">
            <div className="ticket-type-container">
              <FormControl>
                <InputLabel htmlFor="demo-controlled-open-select">
                  Department
                </InputLabel>
                <div className="edit-ticket-menu-item">
                  <Select
                    // value={recordData && recordData.recordData? recordData.recordData.company:''}
                    value={department.departmentName}
                    onChange={handleChangeDepartment("departmentName")}
                    disableUnderline
                    inputProps={{
                      companyName: "departmentName",
                      id: "age-native-simple"
                    }}
                  >
                    {departMentApiData
                      ? departMentApiData.departMentApiData.map(dData => {
                          return (
                            <MenuItem value={dData.id}>
                              {dData.departmentName}
                            </MenuItem>
                          );
                        })
                      : ""}
                  </Select>
                </div>
              </FormControl>
            </div>
            <div className="ticket-type-container">
              <FormControl>
                <InputLabel htmlFor="demo-controlled-open-select">
                  Team
                </InputLabel>
                <div className="edit-ticket-menu-item">
                  <Select
                    // value={recordData && recordData.recordData? recordData.recordData.company:''}
                    value={team.teamName}
                    onChange={handleChangeTeam("teamName")}
                    disableUnderline
                    inputProps={{
                      companyName: "teamName",
                      id: "age-native-simple"
                    }}
                  >
                    {teamApiData
                      ? teamApiData.teamApiData.map(tData => {
                          return (
                            <MenuItem value={tData.id}>
                              {tData.teamName}
                            </MenuItem>
                          );
                        })
                      : ""}
                    {/* <MenuItem value="1">Product Team</MenuItem>
                                        <MenuItem value="2">Product</MenuItem> */}
                  </Select>
                </div>
              </FormControl>
            </div>
          </div>
          <div className="create-ticket-body-input-base-two">
            <div className="ticket-type-container">
              <FormControl>
                <InputLabel htmlFor="demo-controlled-open-select">
                  Project
                </InputLabel>
                <div className="edit-ticket-menu-item">
                  <Select
                    // value={recordData && recordData.recordData? recordData.recordData.company:''}
                    value={project.projectName}
                    onChange={handleChangeProject("projectName")}
                    disableUnderline
                    inputProps={{
                      companyName: "projectName",
                      id: "age-native-simple"
                    }}
                  >
                    {projectApiData
                      ? projectApiData.projectApiData.map(pData => {
                          return (
                            <MenuItem value={pData.id}>
                              {pData.projectName}
                            </MenuItem>
                          );
                        })
                      : ""}
                  </Select>
                </div>
              </FormControl>
            </div>
            <div className="ticket-type-container">
              <FormControl>
                <InputLabel htmlFor="demo-controlled-open-select">
                  Contact
                </InputLabel>
                <div className="edit-ticket-menu-item">
                  <Select
                    // value={recordData && recordData.recordData? recordData.recordData.company:''}
                    value={contact.contactName}
                    onChange={handleChangeContact("contactName")}
                    disableUnderline
                    inputProps={{
                      companyName: "contactName",
                      id: "age-native-simple"
                    }}
                  >
                    <MenuItem value="1">Ryan Pazos</MenuItem>
                    <MenuItem value="2">Mohan Raj</MenuItem>
                  </Select>
                </div>
              </FormControl>
            </div>
          </div>
          <div style={{ border: "0.05rem solid #d6d5d5", margin: "5%" }}></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Button
                variant="outlined"
                className="cancel-button"
                onClick={editTicketDrawer(side, false)}
                onKeyDown={editTicketDrawer(side, false)}
              >
                cancel
              </Button>
            </div>
            <div>
              <Button
                size="large"
                className="update-button"
                onClick={e => updateTicket(e)}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Edit related code ends 26th Oct
  return (
    <div className={classes.root} id="table-header-text">
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table
            
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={mapData.length}
            />
            <TableBody ref={dragulaDecorator}>
              {/* Dynamic Table data starts */}

              {mapData && mapData.length != 0
                ? mapData.map((ticket, index) => {
                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, index, ticket.id)}
                        role="checkbox"
                        tabIndex={-1}
                        // key={index}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            value={ticket.id}
                            onChange={handleCheckBox}
                          />
                        </TableCell>

                        <TableCell align="right" className="ticket-id">
                          {ticket.id}
                        </TableCell>
                        <TableCell align="right">Code Matrix</TableCell>
                        <TableCell align="right" className="need-one-more-body">
                          {ticket.name}
                        </TableCell>
                        <TableCell align="right">
                          {/* <div className="dropdown-toggle" data-toggle="dropdown">
                                            {
                                                ticket.statusId == 1 ? 'New' : '' ||
                                                    ticket.statusId == 2 ? 'Open' : '' ||
                                                        ticket.statusId == 3 ? 'In Progress' : '' ||
                                                            ticket.statusId == 4 ? 'Resolved' : '' ||
                                                                ticket.statusId == 5 ? 'Reopen' : ''
                                            }
                                        </div> */}
                          <div className="ticket-status-popup">
                            <span>
                              {ticket.statusId == 1
                                ? "New"
                                : "" || ticket.statusId == 2
                                ? "Open"
                                : "" || ticket.statusId == 3
                                ? "In Progress"
                                : "" || ticket.statusId == 4
                                ? "Resolved"
                                : "" || ticket.statusId == 5
                                ? "Reopen"
                                : ""}
                            </span>
                            <img
                              className="ticket-status-arrow"
                              src={ticketStatusArrow}
                              alt=""
                              onClick={() =>
                                setShowTktStsPopup(!isShowTktStsPopup)
                              }
                            />
                            {isShowTktStsPopup && index == 0 ? (
                              <div className="top-text-popup-for-one">
                                <div className="ticket-status-popup-element">
                                  <Scrollbars
                                    style={{ width: 127, height: 120 }}
                                  >
                                    {ticketStatus.map((user, index) => {
                                      return (
                                        <div className="top-text-popup-content">
                                          <div>
                                            {/* <img className="top-text-popup-avathar" src={BottomPopupAvatar} alt='BottomPopupAvatar'></img> */}
                                            <span>{user.name}</span>
                                          </div>
                                          <Radio
                                            checked={selecteId === index}
                                            onChange={e =>
                                              HandleClickfunction(e, index)
                                            }
                                            value=""
                                            name="radio-button-demo"
                                            color="primary"
                                            inputProps={{ "aria-label": "" }}
                                          />
                                        </div>
                                      );
                                    })}
                                  </Scrollbars>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </TableCell>
                        <TableCell align="right" className="tags-body">
                          <div className="tags-container">
                            <div className="tags-container-value-one">
                              <div className="risk-container">Risk</div>
                              <div className="critical-customer-container">
                                Critical Customer
                              </div>
                            </div>
                            <div className="tags-container-value-two">
                              {/* <div className="phase-container">Phase1</div>
                                                <div className="technical-container">Technical</div> */}
                              <div className="add-container">
                                <Fab
                                  className="pick-color-popup"
                                  size="small"
                                  aria-label="add"
                                  onClick={() => popUpPickColor(index)}
                                >
                                  <img
                                    src={TicketListAddIcon}
                                    className="add-color-icon"
                                  ></img>
                                </Fab>
                                {pickColor === index && isShowPickColor ? (
                                  <div className="popup-for-pick-color">
                                    <div className="pic-color-for-pop-up">
                                      <p className="pic-color-header-text">
                                        MY TAGS
                                      </p>
                                      <div className="color-pic-tags-container">
                                        <div className="color-picker-section">
                                          <Checkbox
                                            value="checkedB"
                                            color="primary"
                                          />
                                          <span className="color-picker-text">
                                            Risk
                                          </span>
                                        </div>
                                        <div className="color-picker-risk"></div>
                                      </div>
                                      <div className="color-pic-tags-container">
                                        <div className="color-picker-section">
                                          <Checkbox
                                            value="checkedB"
                                            color="primary"
                                          />
                                          <span className="color-picker-text">
                                            Critical Customer
                                          </span>
                                        </div>
                                        <div className="color-picker-critical-customer"></div>
                                      </div>
                                      <div className="color-pic-tags-container">
                                        <div className="color-picker-section">
                                          <Checkbox
                                            value="checkedB"
                                            color="primary"
                                          />
                                          <span className="color-picker-text">
                                            Phase1
                                          </span>
                                        </div>
                                        <div className="color-picker-phase1"></div>
                                      </div>
                                      <div className="color-pic-tags-container">
                                        <div className="color-picker-section">
                                          <Checkbox
                                            value="checkedB"
                                            color="primary"
                                          />
                                          <span className="color-picker-text">
                                            Technical
                                          </span>
                                        </div>
                                        <div className="color-picker-technical"></div>
                                      </div>
                                      <div className="color-pic-tags-container">
                                        <div className="color-picker-section">
                                          <Checkbox
                                            value="checkedB"
                                            color="primary"
                                          />
                                          <span className="color-picker-text">
                                            Server Issue
                                          </span>
                                        </div>
                                        <div className="color-picker-server-issue"></div>
                                      </div>
                                      <hr></hr>
                                      <div className="color-picker-search-and-add">
                                        <InputBase
                                          placeholder="Enter tag name"
                                          className="search-input"
                                          inputProps={{
                                            "aria-label": "search"
                                          }}
                                        />
                                        <Fab
                                          className="pick-color-add"
                                          size="small"
                                          aria-label="add"
                                        >
                                          <img
                                            src={TicketListAddIcon}
                                            className="add-color-icon"
                                          ></img>
                                        </Fab>
                                      </div>
                                      <div className="color-picker-color-container">
                                        <div className="circle-picker-one">
                                          <CirclePicker />
                                        </div>
                                      </div>
                                      <div className="pick-color-make-it-private">
                                        <img src={PickColorLock}></img>
                                        <p>Make it private</p>
                                        <Checkbox
                                          value="checkedB"
                                          color="primary"
                                        />
                                      </div>
                                    </div>
                                    {/* <hr></hr>
                                                            <div className="color-picker-search-and-add">
                                                                <InputBase
                                                                    placeholder="Enter tag name"
                                                                    className="search-input"
                                                                    inputProps={{ 'aria-label': 'search' }}
                                                                />
                                                                <Fab className='pick-color-add' size="small" aria-label="add">
                                                                    <img src={TicketListAddIcon} className="add-color-icon"></img>
                                                                </Fab>
                                                            </div>
                                                                <div className="color-picker-color-container">

                                                                    <div className="circle-picker-one">
                                                                        <CirclePicker

                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="pick-color-make-it-private">
                                                                    <img src={PickColorLock}></img>
                                                                    <p>Make it private</p>
                                                                    <Checkbox
                                                                        value="checkedB"
                                                                        color="primary"
                                                                    />
                                                                </div> */}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <FormLabel
                            component="legend"
                            value={ticket.priorityId}
                          >
                            Select
                          </FormLabel>
                          <div
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                          >
                            {ticket.priority_id == 1
                              ? "Critical"
                              : "" || ticket.priority_id == 2
                              ? "high"
                              : "" || ticket.priority_id == 3
                              ? "low"
                              : "" || ticket.priority_id == 4
                              ? "medium"
                              : ""}
                          </div>
                          <ClickAwayListener onClickAway={handleClickAway}>
                            <div className="dropdown-menu">
                              {open ? (
                                <RadioGroup
                                  aria-label="priority"
                                  name="priority"
                                  onChange={e => {
                                    e.preventDefault();
                                    ticketpriorityupdate({
                                      variables: { id: 1, priorityId: 2 }
                                    });
                                  }}
                                >
                                  <FormControlLabel
                                    value="1"
                                    control={<Radio />}
                                    label="Critical"
                                  />
                                  <FormControlLabel
                                    value="2"
                                    control={<Radio />}
                                    label="High"
                                  />
                                  <FormControlLabel
                                    value="3"
                                    control={<Radio />}
                                    label="Low"
                                  />
                                  <FormControlLabel
                                    value="4"
                                    control={<Radio />}
                                    label="Medium"
                                  />
                                </RadioGroup>
                              ) : null}
                            </div>
                          </ClickAwayListener>
                        </TableCell>
                        <TableCell
                          align="right"
                          className="button-in-ticket-table"
                        >
                          <Button
                            size="large"
                            style={{
                              backgroundColor: "#7AC9FF",
                              fontSize: "8px",
                              color: "#fff"
                            }}
                            className={classes.btnClr}
                          >
                            Service Request
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          {/* <img src={AssignToImage} className="assign-to-image-icon"></img>Sugata Maji
                           */}

                          <Fab
                            className="top-text-popup"
                            size="small"
                            aria-label="add"
                            onClick={() => popupThreeOnCLick(index)}
                          >
                            <img
                              src={AssignToImage}
                              className="assign-to-image-icon"
                            ></img>
                            Sugata Maji
                          </Fab>

                          {popupthree === index && isShowPopupthree ? (
                            <div className="top-text-popup-for-one">
                              <div className="top-text-popup-one">
                                <div className="top-text-search-field">
                                  <InputBase
                                    placeholder="Search people"
                                    type="text"
                                    className="registration-input"
                                    inputProps={{ "aria-label": "search" }}
                                  />
                                  <img src={searchicon}></img>
                                </div>
                                <Scrollbars style={{ width: 180, height: 150 }}>
                                  {usersList.map((user, index) => {
                                    return (
                                      <div className="top-text-popup-content">
                                        <div>
                                          <img
                                            className="top-text-popup-avathar"
                                            src={BottomPopupAvatar}
                                          ></img>
                                          <span>{user.name}</span>
                                        </div>
                                        <Radio
                                          checked={selecteId === index}
                                          onChange={e =>
                                            HandleClickfunction(e, index)
                                          }
                                          value=""
                                          name="radio-button-demo"
                                          color="primary"
                                          inputProps={{ "aria-label": "" }}
                                        />
                                      </div>
                                    );
                                  })}
                                </Scrollbars>
                              </div>
                            </div>
                          ) : null}
                        </TableCell>
                        <TableCell
                          align="right"
                          className="ticket-table-response-time"
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            style={{
                              border: "1px solid #2DCD7A"
                            }}
                            className={classes.btnClr}
                            onClick={TimeOnCLick}
                          >
                            <img src={TicketListTimeIcon}></img>15.59
                          </Button>

                          {isShowPopupTime ? (
                            <div className="log-time-popup-container">
                              <div className="log-time-popup">
                                {
                                  <div className="log-time-section">
                                    <p className="log-time-tracking">
                                      Time tracking
                                    </p>
                                    <div className="log-time-slider-section d-flex justify-space-between">
                                      <img src={LogTimerIcon} alt=""></img>
                                      <div className="log-time-slider">
                                        <Slider
                                          defaultValue={20}
                                          aria-labelledby="discrete-slider"
                                          valueLabelDisplay="auto"
                                          step={10}
                                          marks
                                          min={10}
                                          max={80}
                                        />
                                        <div className="log-time-slider-text d-flex justify-space-between">
                                          <p className="log-timer-logged-text">
                                            No time logged
                                          </p>
                                          <p className="log-timer-remaining-text">
                                            3h remaining
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <p className="log-timer-original-estimate">
                                      The original estimate for this issue was{" "}
                                      <span>3H</span>.
                                    </p>
                                    <div className="time-spent-remaining-section d-flex justify-space-between">
                                      <div className="time-spent">
                                        <p>Time Spent</p>
                                        <InputBase
                                          placeholder="2w 2d 6h 45m"
                                          className="search-input"
                                          inputProps={{
                                            "aria-label": "search"
                                          }}
                                        />
                                      </div>
                                      <div className="time-remaining">
                                        <p>Time remaining</p>
                                        <InputBase
                                          placeholder="3h"
                                          className="search-input"
                                          inputProps={{
                                            "aria-label": "search"
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="log-timer-save-cancel-button d-flex justify-flex-end">
                                      <div className="log-timer-save">
                                        <Button>Save</Button>
                                      </div>
                                      <div className="log-timer-remaining">
                                        <Button onClick={TimeOnCLick}>
                                          Cancel
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                }
                              </div>
                            </div>
                          ) : null}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", cursor: "pointer" }}
                        >
                          <Fab
                            className="ticket-list-click-menu"
                            size="small"
                            aria-label="add"
                            onClick={() => showTicketListPopup(index)}
                          >
                            <img src={more} alt="" onClick={"mutate"} />
                            {popupId === index && isShowPopup ? (
                              <div className="ticket-list-popup">
                                <ul>
                                  <li>
                                    <i class="fa fa-eye" aria-hidden="true"></i>
                                    <span>View details</span>
                                  </li>
                                  <li
                                    className="ticket-listing-icon"
                                    onClick={editTicketDrawer(
                                      "right",
                                      true,
                                      ticket
                                    )}
                                  >
                                    <img
                                      src={TasksListPopupEdit}
                                      alt="edit"
                                    ></img>
                                    <span>Edit ticket</span>
                                  </li>
                                  <li className="ticket-listing-icon">
                                    <img
                                      src={TasksListPopupAssign}
                                      alt="edit"
                                    ></img>
                                    <span>Assign / Transfer</span>
                                  </li>

                                  <li
                                    className="ticket-listing-icon"
                                    onClick={event =>
                                      ticketHandleClick(event, index)
                                    }
                                  >
                                    <img
                                      src={TasksListPopupBulk}
                                      alt="edit"
                                    ></img>
                                    <span>Bulk update</span>
                                  </li>

                                  <li
                                    className="ticket-listing-icon"
                                    onClick={event =>
                                      ticketHandleClick(event, index)
                                    }
                                  >
                                    <img
                                      src={TasksListPopupMerge}
                                      alt="edit"
                                    ></img>
                                    <span>Merge</span>
                                  </li>
                                  <li
                                    className="ticket-listing-icon"
                                    onClick={forwardDrawer("right", true)}
                                  >
                                    <img
                                      src={TasksListPopupForward}
                                      alt="edit"
                                    ></img>
                                    <span>Forward</span>
                                  </li>
                                  <li className="ticket-listing-icon">
                                    <img
                                      src={TasksListPopupClose}
                                      alt="edit"
                                    ></img>
                                    <span>Close</span>
                                  </li>
                                  <li className="ticket-listing-icon">
                                    <img
                                      src={TasksListPopupDuplicate}
                                      alt="edit"
                                    ></img>
                                    <span>Duplicate</span>
                                  </li>
                                  <li className="ticket-listing-icon">
                                    <img
                                      src={TasksListPopupDelete}
                                      alt="edit"
                                    ></img>
                                    <span>Delete</span>
                                  </li>
                                  <li
                                    className="ticket-listing-icon"
                                    onClick={() =>
                                      openAddNoteToTicketHandler(ticket)
                                    }
                                  >
                                    <img
                                      src={TasksListPopupAssign}
                                      alt="edit"
                                    ></img>
                                    <span>Add Note</span>
                                  </li>
                                </ul>
                              </div>
                            ) : null}
                          </Fab>
                        </TableCell>
                      </TableRow>
                    );
                    // </LazyLoad>
                  })
                : ""}
              {/* Merg and bulk code */}

              {/* <Drawer
                                anchor="right"
                                open={merge.right}
                                onClose={mergeDrawer("right", false)}
                            >
                                {mergeList("right")}
                            </Drawer> */}
              <Drawer
                anchor="right"
                open={state.right}
                onClose={toggleDrawer("right", false)}
              >
                {sideList("right")}
              </Drawer>

              <Drawer
                anchor="right"
                open={forward.right}
                onClose={forwardDrawer("right", false)}
              >
                {forwardList("right")}
              </Drawer>
              {/* Merge and bulk code ends */}
              {/* Dynamic Table data Ends */}
            </TableBody>
          </Table>
        </div>
      </Paper>
      {isShowBtnPopup ? (
        <TicketListBtmPopup
          isTicketBtnActive={!isTicketBtnActive}
          ticketIds={checkBoxValue}
        />
      ) : null}
      <div>
        {isAddNoteTktOpen ? (
          <div className="ticket-add-note-popup-container">
            <TextareaAutosize
              name="ticketAddNote"
              placeholder="Enter your note here"
              aria-label="empty textarea"
              onChange={textAreaChangeHandler}
            />
            <div className="check-box-flex-container">
              <Checkbox
                name="isNotesPrivate"
                checked={isNotesPrivate}
                onChange={makeNotePrivateHandler}
                value="checkedA"
                inputProps={{
                  "aria-label": "primary checkbox"
                }}
              />{" "}
              <span>Private</span>
            </div>
            <div className="flex-container">
              <div
                className="ticket-add-note-button"
                onClick={addNoteTotktHandler}
              >
                <Button>Add Note</Button>
              </div>
              <div
                className="ticket-add-note-button"
                onClick={() => setAddNoteTktOpen(false)}
              >
                <Button>Close</Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <Drawer
        anchor="right"
        open={editState.right}
        onClose={editTicketDrawer("right", false)}
      >
        {editSidePanel("right")}
      </Drawer>
    </div>
  );
}
