import React, { Component } from "react";
import "./TicketTable.scss";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import MainLayout from "../MainLayout/MainLayout";
import TicketsCollapsableSection from "./TicketsCollapsableSection/TicketsCollapsableSection";
import CreateTicketDrawer from "../../components/TicketingSystem/TicketTable/SideDrawers/CreateTicketUpdated/CreateTicketDrawer";
// import CreateTaskDrawer from '../CreateTaskDrawer/CreateTaskDrawer';
import { AgGridReact } from "ag-grid-react";
import ButtonRenderer from "./ButtonRenderer";
import Type from "./Type";
import Radio from "@material-ui/core/Radio";
import { Scrollbars } from "react-custom-scrollbars";
import dropdownIcon from "../../assets/icons/SVG/Icon ionic-ios-arrow-down.svg";
import Checkbox from "@material-ui/core/Checkbox";
import Fab from "@material-ui/core/Fab";
import InputBase from "@material-ui/core/InputBase";
import { CirclePicker } from "react-color";
import PickColorLock from "../../assets/icons/01-10-2019/color-pick-lock.svg";
import TicketListAddIcon from "../../assets/icons/01-10-2019/Icon feather-plus-circle.svg";
import Chartbar from "../../components//TicketingSystem/ChartBar/ChartBar";
import Header from "../Header/Header";
import SubHeader from "../SubHeaderNew/SubHeaderNew";
import AssignToProfile from "../../assets/profile.png";
import searchicon from "../../assets/icons/SVG/Icon feather-search.svg";
import BottomPopupAvatar from "../../assets/icons/01-10-2019/Rectangle 527.svg";
import moreOptionsIcon from "../../assets/subheader-icon/Icon awesome-ellipsis-v-light.svg";
import moreTagsIcon from "../../assets/subheader-icon/Icon awesome-ellipsis-v-light.svg";
// import TicketListBtmPopup from "../TicketListBtmPopup/TicketListBtmPopup";
import TicketListBtmPopup from "../../components/TicketingSystem/TicketListBtmPopup/TicketListBtmPopup";
import AddNewIcon from "../../assets/Sidenavbar-icons/Group 11382.svg";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { baseUrl } from "../../constants";
import {
  priorities,
  getAllStatus,
  updateStatus,
  assignTicket,
  getAllUsers,
  updatepriority,
  getTicketUnderManager,
  updatePriority,
  getAllTags,getAllTkts,
  getAllTickets,
  ticketTagsUpdate,
  addTagFromTicket,
  getLogedUser,
  getTicketByStatus,
  getAllTicketByAgent,
  getAllTicketByHighPriority,
  getAllTicketByDue,
  duplicateTicket,
  deleteThisTicket,
  ticketClose,
} from "./TicketTableQueries";
import history from "../../Routes/history";

import TasksListPopupEdit from "../../assets/icons/01-10-2019/Icon feather-edit.svg";
import TasksListPopupAssign from "../../assets/icons/01-10-2019/Icon material-description.svg";
import TasksListPopupBulk from "../../assets/icons/01-10-2019/Icon feather-mail.svg";
import TasksListPopupMerge from "../../assets/icons/01-10-2019/Icon material-call-merge.svg";
import TasksListPopupForward from "../../assets/icons/LoginAndRegistration_icons/Icon ionic-md-arrow-forward.svg";
import TasksListPopupDuplicate from "../../assets/icons/15-10-2019/Icon material-control-point-duplicate.svg";
import TasksListPopupDelete from "../../assets/icons/01-10-2019/Icon material-delete-sweep.svg";
import TasksListPopupClose from "../../assets/icons/01-10-2019/Icon ionic-ios-close-circle-outline.svg";
import CreateHabitDrawer from "../../components/CreateHabitDrawer/CreateHabitDrawer";
import EditTicket from "../../components/TicketingSystem/TicketTable/EditTicket";

const demoTags = [
  { id: 1, name: "RISK" },
  { id: 2, name: "PHASE1" }
];
const colors = [
  "#1abc9c",
  "#17a085",
  "#2ecc71",
  "#27ae60",
  "#3498db",
  "#2980b9"
];

const usersList = [
  { id: 0, avatharImg: "", name: "John doe" },
  { id: 1, avatharImg: "", name: "Ryan pazos" },
  { id: 2, avatharImg: "", name: "John doe" },
  { id: 3, avatharImg: "", name: "Mark" },
  { id: 4, avatharImg: "", name: "John doe" },
  { id: 5, avatharImg: "", name: "Ryan pazos" },
  { id: 6, avatharImg: "", name: "John doe" }
];
let wrapperRef;
class TicketTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: "TICKET NO",
          field: "ticket_Id",
          sortable: true,
          headerCheckboxSelection: true,
          checkboxSelection: true,
          rowDrag: true,
          minWidth: 150,
          maxWidth: 250
        },
        { headerName: "Customer", field: "customer_Name" },
        {
          headerName: "SUBJECT",
          field: "name",
          minWidth: 120,
          maxWidth: 250,
          cellStyle: {
            "text-overflow": "ellipsis",
            "white-space": "nowrap",
            overflow: "hidden"
          }
        },
        {
          headerName: "STATUS",
          field: "statusId",
          cellRenderer: "StatusColumnElement"
        },
        {
          headerName: "TAGS",
          field: "tags",
          cellRenderer: "TagsColumnElement"
        },
        {
          headerName: "PRIORITY",
          field: "priorityId",
          cellRenderer: "PriorityColumnElement"
        },
        {
          headerName: "TYPE",
          field: "ticketType",
          cellRenderer: "Type",
          colId: "params"
        },
        {
          headerName: "ASSIGN TO",
          field: "assignedToAgentId",
          cellRenderer: "AssignToColumnElement",
          colId: "params"
        },
        {
          headerName: "RESPONSE",
          field: "value",
          cellRenderer: "ButtonRenderer",
          colId: "params"
        },
        {
          headerName: "",
          field: "price",
          cellRenderer: "MoreOptionsIconElement",
          colId: "params",
          headerComponent: "headerMoreIcon",
          width: 70
        }
      ],
      defaultColDef: { resizable: true },
      rowData: [
        {
          id: 0,
          Ticket_Nor: "ALP0828193",
          model: "CodeMatrix",
          status: "Open",
          tags: demoTags,
          priority: "Critical",
          ticketType: "INCIDENT",
          sub: "Need one more licensing...",
          assign: "Ram Murthy",
          response: "12:09",
          more: "12:09"
        },
        {
          id: 1,
          Ticket_Nor: "ALP0828190",
          model: "CodeMatrix",
          status: "Open",
          tags: demoTags,
          priority: "Low",
          ticketType: "SERVICE REQUEST",
          sub: "Need one more licensing...",
          assign: "Sugata Maji",
          response: "12:09",
          more: "12:09"
        },
        {
          id: 2,
          Ticket_Nor: "ALP0828191",
          model: "CodeMatrix",
          status: "Open",
          tags: demoTags,
          priority: "Medium",
          ticketType: "INCIDENT",
          sub: "Need one more licensing...",
          assign: "Varun Suresh",
          response: "01:45",
          more: "12:09"
        },
        {
          id: 3,
          Ticket_Nor: "ALP08281902",
          model: "CodeMatrix",
          status: "Open",
          tags: demoTags,
          priority: "High",
          ticketType: "PROBLEM",
          sub: "Need one more licensing...",
          assign: "Sugata Maji",
          response: "15:59",
          more: "12:09"
        }
      ],
      getRowHeight: function(params) {
        if (params.node.level === 0) return 50;
        else return 40;
      },
      context: { componentParent: this },

      frameworkComponents: {
        Type: Type,
        ButtonRenderer: ButtonRenderer,
        headerMoreIcon: this.headerMoreIcon,
        StatusColumnElement: this.StatusColumnElement,
        PriorityColumnElement: this.PriorityColumnElement,
        TagsColumnElement: this.TagsColumnElement,
        AssignToColumnElement: this.AssignToColumnElement,
        MoreOptionsIconElement: this.MoreOptionsIconElement
      },
      isChartSectionOpen: true,

      allStatusTickets: [],
      isShowAllStatusTkts: false,

      isShowOpenSatusTkts: false,
      openStatusTickets: [],

      isShowInProgSatusTkts: false,
      inProgessStatusTickets: [],

      isShowResolvedSatusTkts: false,
      resolvedStatusTickets: [],

      isShowClosedSatusTkts: false,
      closedStatusTickets: [],

      rowIndex: null,
      isShowTktStsPopup: false,
      isShowTktPriorityPopup: false,
      tagSelected: "",
      isCTDrawerOpen: false,
      isShowPickColor: false,
      isShowAssignToPopup: false,
      assignToSelected: null,
      isShowMoreOptions: false,
      isCTaskDrawerOpen: false,

      overlayNoRowsTemplate: "No Tickets",
      statusApiData: "",
      statusRadioId: "",
      userApiData: "",
      tagsApiData: [],
      updateStatusReturnData: "",
      ticketList: [],
      allTickets:[],
      statusSelectedId: "",
      isShowBtnPopup: false,
      popupId: null,
      isTicketBtnActive: false,
      checkBoxValue: [],
      ticketId: "",
      assigneeUserId: "",
      managerId: "",
      statusId: "",
      isEditDrawerOpen: false,

      prioritySelectedId: "",
      priorityApiData: "",
      priorityRadioId: "",

      ticketEData: "",
      ticketDayData: "",
      enterTag: "",
      logedUser: {},
      searchTicketTrue: false,
      searchTicketData: [],
      ticketFromDayDropdown: [],
      isDataFromDropdown: false,

      isShowHeaderColumnDropDown: false,
      ticketNoColumn: false,
      columnHeaderObj: [
        { id: 1, colName: "Ticket no" },
        { id: 2, colName: "Customer" },
        { id: 3, colName: "Subject" },
        { id: 4, colName: "Status" },
        { id: 5, colName: "Tags" },
        { id: 6, colName: "Priority" },
        { id: 7, colName: "Type" },
        { id: 8, colName: "Assign to" },
        { id: 9, colName: "Response" }
      ],
      ticketsDataAll:[],
    };
  }
  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    params.columnApi.autoSizeColumns();
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    const token = localStorage.getItem("jwtToken");
    if (token === null || token === undefined || token === "") {
      history.push("/");
    }

    let client = this.props.client;
    getLogedUser(client, parseInt(localStorage.getItem("id")), logedUser => {
      this.setState({ logedUser: logedUser });
      this.getTicketUnderManagerData();
    });
    getAllStatus(client, statusData => {
      if (
        this.state.statusApiData == "" ||
        this.state.statusApiData == undefined ||
        this.state.statusApiData == null
      ) {
        this.setState({ statusApiData: statusData.data.getAllStatus });
      }
    });
    priorities(client, priorityData => {
      if (
        this.state.priorityApiData == "" ||
        this.state.priorityApiData == undefined ||
        this.state.priorityApiData == null
      ) {
        this.setState({ priorityApiData: priorityData.data.priorities });
      }
    });

    getAllUsers(client, userData => {
      if (
        this.state.userApiData == "" ||
        this.state.userApiData == undefined ||
        this.state.userApiData == null
      ) {
        this.setState({ userApiData: userData.data.getAllUsers });
      }
    });
    this.getAllTagsData();
    getAllTkts(
      client, data => {
          this.setState({ ticketsDataAll: data.data.ticketsList })
      }
  );
  }

  /** Custom Headers */
  headerMoreIcon = () => {
    this.refreshCells();
    return (
      <div className="column-header-container">
        <img
          className="table-addnew-header-icon"
          src={AddNewIcon}
          alt="AddNewIcon"
          onClick={this.showHeaderColumnList}
        />
        <div className="header-column-dropdown">
          {this.state.isShowHeaderColumnDropDown ? (
            <div className="top-text" ref={this.setWrapperRef}>
              <Scrollbars style={{ width: 127, height: 120 }}>
                {this.state.columnHeaderObj.map((column, index) => {
                  return (
                    <div className="top-text-popup-content" key={index}>
                      <div>
                        <span>{column.colName}</span>
                      </div>
                      {/* CHECKBOX WILL COME HERE */}
                    </div>
                  );
                })}
              </Scrollbars>
            </div>
          ) : null}
        </div>
      </div>
    );
  };
  showHeaderColumnList = async () => {
    await this.setState({
      isShowHeaderColumnDropDown: !this.state.isShowHeaderColumnDropDown
    });
    this.refreshCells();
    await this.headerMoreIcon();
  };
  /** Custom Headers */

  getAllTagsData = async () => {
    let client = this.props.client;
    // const result = await getAllTags(client, data => {
    //   this.setState({ tagsApiData: data.data.allTags })
    // });
    const result = await getAllTags(client);
    if (result) {
      if (
        this.state.tagsApiData == "" ||
        this.state.tagsApiData == undefined ||
        this.state.tagsApiData == null
      ) {
        this.setState({ tagsApiData: result });
      }
    }
  };
  // getAllTicketsData = async () => {
  //   let client = this.props.client;
  //   const ticketDayData = "yesterday";
  //   const result = await getAllTickets(client, ticketDayData);
  //   if (result) {
  //     if (this.state.ticketDayData == '' || this.state.ticketDayData == undefined
  //       || this.state.ticketDayData == null) {
  //       this.setState({ ticketDayData: result });
  //     }
  //   }
  // }
  getTicketUnderManagerData = async () => {
    let client = this.props.client;
    const data = {
      // ! This line is to list tickets based on logedUser id as manager Id
      // managerId: this.state.logedUser ? this.state.logedUser.id : 4,
      managerId: 4,
      pageNo: 1
    };

    const result = await getTicketUnderManager(client, data);
    if (result) {
      if (
        this.state.ticketList == "" ||
        this.state.ticketList == undefined ||
        this.state.ticketList == null
      ) {
        await this.setState({
          ticketList: result.data.getTicketUnderManager,
          allTickets: result.data.getTicketUnderManager
        });
        this.refreshCells();
      }
    }
  };

  handleUpdateStatus = async event => {
    for (let i = 0; i < this.state.ticketList.length; i++) {
      if (this.state.ticketList[i].id == this.state.ticketId) {
        this.state.ticketList[i].statusId = Number(event.target.value);
        break;
      }
    }

    const data = {
      id: this.state.ticketId,
      managerId:4,
      statusId: Number(event.target.value)
    };
    // Normal query
    const result = await updateStatus(this.props.client, data);
    if (result) {
      await this.setState({
        updateStatusReturnData: result,
        isShowTktStsPopup: false
      });
    }
  };
  handleAssignTo = async event => {
    this.setState({ assignToSelected: Number(event.target.value) });

    for (let i = 0; i < this.state.ticketList.length; i++) {
      if (this.state.ticketList[i].id == this.state.ticketId) {
        this.state.ticketList[i].assignedToAgentId = Number(event.target.value);
        break;
      }
    }
    const data = {
      id: this.state.ticketId,
      assignedToAgentId: Number(event.target.value),
      managerId: this.state.managerId,
      statusId: this.state.statusId
    };
    const result = await assignTicket(this.props.client, data);
    if (result) {
      await this.setState({
        isShowAssignToPopup: false
      });
      this.refreshCells();
    }
  };
  handleUpdatePriority = async event => {
    this.setState({ prioritySelectedId: Number(event.target.value) });
    if (this.state.ticketList != null) {
      for (let i = 0; i < this.state.ticketList.length; i++) {
        if (this.state.ticketList[i].id == this.state.ticketId) {
          this.state.ticketList[i].priorityId = Number(event.target.value);
          break;
        }
      }
    }
    const data = {
      id: this.state.ticketId,
      managerId: this.state.managerId,
      priorityId: Number(event.target.value)
    };
    // Normal query
    const result = await updatePriority(this.props.client, data);
    if (result) {
      this.setState({ isShowTktPriorityPopup: false });
      this.refreshCells();
    }
  };

  ticketHandleClick = async (event, index) => {
    this.setState({
      isShowBtnPopup: !this.state.isShowBtnPopup,
      popupId: index
    });

    this.setState({ isShowMoreOptions: !this.state.isShowMoreOptions });
  };
  
  

  onSelectionChanged = () => {
    let selectedRows = this.gridApi.getSelectedRows();
    let checkBoxCheckedValues = [];
    selectedRows.forEach(function(selectedRow, index) {
      checkBoxCheckedValues.push(selectedRow.id);
    });
    if (checkBoxCheckedValues.length > 0) {
      this.setState({ isTicketBtnActive: true, isDataFromDropdown: false });
    } else {
      this.setState({
        isTicketBtnActive: false,
        isDataFromDropdown: false,
        isShowBtnPopup: false
      });
    }
    this.setState({ checkBoxValue: checkBoxCheckedValues });
  };

  handleClickOutside = async event => {
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      await this.setState({
        isShowTktStsPopup: false,
        isShowTktPriorityPopup: false,
        isShowPickColor: false,
        isShowAssignToPopup: false,
        isShowMoreOptions: false
      });
      this.refreshCells();
    }
  };

  setWrapperRef = node => (wrapperRef = node);
  refreshCells = () => {
    var params = { force: true };
    if (this.gridApi) {
      this.gridApi.refreshCells(params);
    }
  };

  sizeToFit(gridApi) {
    gridApi.sizeColumnsToFit();
  }

  HandleClickFunction = (e, index) => {
    this.setState({
      assignToSelected: index
    });
  };
  isCreateTicketToggler = () =>
    this.setState({ isCTDrawerOpen: !this.state.isCTDrawerOpen });

  colorPickerPopupToggler = async rowIndex => {
    await this.setState({
      isShowPickColor: !this.state.isShowPickColor,
      rowIndex: rowIndex.rowIndex,
      ticketId: rowIndex.data.id
    });
    this.refreshCells();
    this.array = [];
  };
  array = [];
  selectTag = async (tags, props) => {
    let ticketTags = props.tags;
    if (ticketTags == null) {
      this.array = [];
    } else {
      this.array = ticketTags;
    }
    let tagsTitle = tags.tagTitle;
    if (ticketTags != null) {
      if (this.array.includes(tagsTitle)) {
        let index = this.array.indexOf(tagsTitle);
        this.array.splice(index, 1);
      } else {
        this.array.push(tagsTitle);
      }
    } else {
      this.array.push(tagsTitle);
    }
    const data = {
      id: this.state.ticketId,
      tags: this.array
    };
    const result = await ticketTagsUpdate(this.props.client, data);
    this.refreshCells();
  };

  submitTag = async () => {
    const data = {
      tagTitle: this.state.enterTag,
      companyId: this.state.logedUser.companyId,
      tenantId: this.state.logedUser.tenantId
    };
    await addTagFromTicket(this.props.client, data, result => {
      this.state.tagsApiData.push(result.data.addTag);
      this.refreshCells();
    });
  };

  submitTag1 = async (tagName, color1, callback) => {
    const data = {
      tagTitle: tagName,
      companyId: this.state.logedUser.companyId,
      tenantId: this.state.logedUser.tenantId,
      color: color1
    };
    await addTagFromTicket(this.props.client, data, result => {
      this.state.tagsApiData.push(result.data.addTag);
      this.refreshCells();
    }).then(res => callback(res));
  };

  setShowTktStsPopup = async propsData => {
    await this.setState({
      isShowTktStsPopup: !this.state.isShowTktStsPopup,
      rowIndex: propsData.rowIndex,
      ticketId: propsData.data.id
    });
    this.refreshCells();
  };
  setShowTktPriorityPopup = async propsData => {
    await this.setState({
      isShowTktPriorityPopup: !this.state.isShowTktPriorityPopup,
      rowIndex: propsData.rowIndex,
      ticketId: propsData.data.id,
      managerId: propsData.data.managerId
    });
    this.refreshCells();
  };

  /*****************Tickets filter handlers *****************/
  ticketsFilterHandler = (id,name) => {
    let client = this.props.client
    if(name == "All"){
    getTicketByStatus(client,name,data=>{
      this.setState({ticketList:data.data.getTicketsByStatus});
    })
  }
  if(name == "My Tickets"){
    getAllTicketByAgent(client,parseInt(localStorage.getItem('id')),data=>{
      this.setState({ticketList:data.data.getTicketByAgent});
    })
  }
if(name == "On Priority"){
  getAllTicketByHighPriority(client,data=>{
    this.setState({ticketList:data.data.highPriorityTickets});
  })
}
if(name == "Due Today"){
  getAllTicketByDue(client,data=>{
    this.setState({ticketList:data.data.DueTickets});
  })
}
  };
  /*****************Tickets filter handlers *****************/
  /*****************Status filter handlers *****************/
  resetTicketStatusHandler = () => {
    // this.setState({
    // })
  };

  statusFilterHandler = (statusId,statusName) => {
    let client = this.props.client
    getTicketByStatus(client,statusName,data=>{
      this.setState({ticketList:data.data.getTicketsByStatus});
    })
    // if (this.state.allTickets) {
    //   this.state.allTickets.map(ticket => {
    //     if (statusId === 0 && statusId === ticket.statusId) {
    //       if (this.state.allStatusTickets.length === 0)
    //         this.setState({
    //           isShowAllStatusTkts: true,
    //           isShowOpenSatusTkts: false,
    //           isShowInProgSatusTkts: false,
    //           isShowResolvedSatusTkts: false,
    //           isShowClosedSatusTkts: false,
    //           isDataFromDropdown: false,
    //           allStatusTickets: [...this.state.allStatusTickets, ticket]
    //         });
    //     } else if (statusId === 2 && statusId === ticket.statusId) {
    //       if (this.state.openStatusTickets.length === 0)
    //         this.setState({
    //           isShowAllStatusTkts: false,
    //           isShowOpenSatusTkts: true,
    //           isShowInProgSatusTkts: false,
    //           isShowResolvedSatusTkts: false,
    //           isShowClosedSatusTkts: false,
    //           isDataFromDropdown: false,
    //           openStatusTickets: [...this.state.openStatusTickets, ticket]
    //         });
    //     } else if (statusId === 3 && statusId === ticket.statusId) {
    //       if (this.state.inProgessStatusTickets.length === 0) {
    //         this.setState({
    //           isShowAllStatusTkts: false,
    //           isShowOpenSatusTkts: false,
    //           isShowInProgSatusTkts: true,
    //           isShowResolvedSatusTkts: false,
    //           isShowClosedSatusTkts: false,
    //           isDataFromDropdown: false,
    //           inProgessStatusTickets: [
    //             ...this.state.inProgessStatusTickets,
    //             ticket
    //           ]
    //         });
    //       }
    //     } else if (statusId === 4 && statusId === ticket.statusId) {
    //       if (this.state.resolvedStatusTickets.length === 0) {
    //         this.setState({
    //           isShowAllStatusTkts: false,
    //           isShowOpenSatusTkts: false,
    //           isShowInProgSatusTkts: false,
    //           isShowResolvedSatusTkts: true,
    //           isShowClosedSatusTkts: false,
    //           isDataFromDropdown: false,
    //           resolvedStatusTickets: [
    //             ...this.state.resolvedStatusTickets,
    //             ticket
    //           ]
    //         });
    //       }
    //     } else if (statusId === 6 && statusId === ticket.statusId) {
    //       if (this.state.closedStatusTickets.length === 0) {
    //         this.setState({
    //           isShowAllStatusTkts: false,
    //           isShowOpenSatusTkts: false,
    //           isShowInProgSatusTkts: false,
    //           isShowResolvedSatusTkts: false,
    //           isShowClosedSatusTkts: true,
    //           isDataFromDropdown: false,
    //           closedStatusTickets: [...this.state.closedStatusTickets, ticket]
    //         });
    //       }
    //     }
    //   });
    // }
  };
  /*****************Status filter handlers *****************/

  StatusColumnElement = props => {
    return (
      <div className="ticket-status-container">
        {this.state.statusApiData
          ? this.state.statusApiData.map((status, index) => {
              if (status.id == props.data.statusId)
                return <p>{status.statusName}</p>;
            })
          : ""}
        <div
          className="ticket-popup-placeholder"
          onClick={() => this.setShowTktStsPopup(props)}
        >
          <img src={dropdownIcon} alt="" />
          {this.state.isShowTktStsPopup &&
          this.state.rowIndex === props.rowIndex ? (
            <div className="top-text" ref={this.setWrapperRef}>
              <Scrollbars style={{ width: 127, height: 120 }}>
                {this.state.statusApiData.map((status, index) => {
                  return (
                    <div className="top-text-popup-content">
                      <div>
                        <span>{status.statusName}</span>
                      </div>
                      <Radio
                        checked={this.state.statusSelectedId == status.id}
                        onChange={this.handleUpdateStatus}
                        value={status.id}
                        name="statusRadioId"
                        color="primary"
                        inputProps={{ "aria-label": "" }}
                      />
                    </div>
                  );
                })}
              </Scrollbars>
            </div>
          ) : null}
        </div>
      </div>
    );
  };
  TagsColumnElement = props => {
    let tags = [
      { id: 0, name: "Risk" },
      { id: 1, name: "Critical Customer" },
      { id: 2, name: "Phase1" },
      { id: 3, name: "Technical" },
      { id: 4, name: "Server Issue" }
    ];
    let ticketArrayTag = [];
    ticketArrayTag = props.data.tags;
    return (
      <div className="ticket-tags-container">
        <div className="tags-elements-holder">
          {//! storing tag Id in tag field
          // props.data.tags != null || props.data.tags != undefined ?
          //   props.data.tags.map((tag,index) =>{
          //     if(index<2){
          //    return <div className={`tag-element ${tag == '1' ? 'risk-tag' : tag == '2' ? 'critical-tag' : tag == '3' ? 'phase1-tag' : null}`}>
          //       {tag == '1' ? 'RISK' : tag == '2' ? 'CRITICAL CUSTOMER' : tag == '3' ? 'PHASE 1' : tag == '4' ? 'TECHNICAL' : ''}
          //     </div>
          //     }else{
          //       if(index==2){
          //         return <div>
          //           +{props.data.tags.length-parseInt(2)}
          //         </div>
          //       }
          //     }
          //   }) : null

          //! storing tag name in tag field

          props.data.tags != null || props.data.tags != undefined
            ? props.data.tags.map((tag, index) => {
                if (index < 2) {
                  // return <div className="" style={{backgroundColor:"blue"}}>
                  return <div className="">&nbsp;{tag}</div>;
                } else {
                  if (index == 2) {
                    return (
                      <div>&nbsp; +{props.data.tags.length - parseInt(2)}</div>
                    );
                  }
                }
              })
            : null
          //! storing tag id in tag field and getting tag color

          // props.data.tags != null || props.data.tags != undefined ?
          //     props.data.tags.map(tag =>{
          //      return <div className="">
          //  {     this.state.tagsApiData !=null ?
          //       this.state.tagsApiData.map(el=>{
          //         if(el.id == tag){
          //         return  <div className={`tag-element ${tag == '1' ? 'risk-tag' : tag == '2' ? 'critical-tag' : tag == '3' ? 'phase1-tag' : null}`} style={{backgroundColor:el.color+"30",color:el.color}}>
          //         {el.tagTitle}
          //       </div>
          //         }
          //       }) :null
          //   }
          //   </div>
          //   }):null

          //! storing tag name in tag field
          //   props.data.tags != null || props.data.tags != undefined ?
          //     props.data.tags.map(tag =>{
          //      return <div className="sagarJ">
          //  {     this.state.tagsApiData !=null ?
          //       this.state.tagsApiData.map(el=>{
          //         if(el.tagTitle == tag){
          //         console.log("tags and title==",el.tagTitle,"==",tag)
          //         return  <div className={`tag-element ${tag == '1' ? 'risk-tag' : tag == '2' ? 'critical-tag' : tag == '3' ? 'phase1-tag' : null}`} style={{backgroundColor:el.color}}>
          //         {tag}
          //       </div>
          //         }
          //       }) :null
          //   }
          //   </div>
          //   }):null

          // this.state.tagsApiData!=null || this.state.tagsApiData.length!=0 ?
          // this.state.tagsApiData.map(tag=>{
          //  return ticketArrayTag.length!=0 ?
          //  ticketArrayTag.includes(tag.tagTitle) ? "sagar" : null
          //   : null
          // })
          // : null
          }
        </div>
        <div className="tags-popup-placeholder">
          {this.state.isShowPickColor &&
          this.state.rowIndex === props.rowIndex ? (
            <div className="pic-color-for-pop-up" ref={this.setWrapperRef}>
              <p className="pic-color-header-text">MY TAGS</p>
              {this.state.tagsApiData
                ? this.state.tagsApiData.map(tag => (
                    <div className="color-pic-tags-container">
                      <div className="color-picker-section">
                        <Checkbox
                          value="checkedB"
                          checked={
                            props.data.tags != null
                              ? props.data.tags.includes(tag.tagTitle)
                              : false
                          }
                          color="primary"
                          onClick={() => this.selectTag(tag, props.data)}
                        />
                        <span className="color-picker-text">
                          {tag.tagTitle}
                        </span>
                      </div>
                      <div
                        className="color-picker-risk"
                        style={{ backgroundColor: tag.color }}
                      ></div>
                    </div>
                  ))
                : ""}

              <hr></hr>
              <div className="color-picker-search-and-add">
                <InputBase
                  placeholder="Enter tag name"
                  className="search-input"
                  onChange={e => {
                    this.setState({ enterTag: e.target.value });
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onKeyPress={event => {
                    if (event.key == "Enter") {
                      event.target.value = "";
                      this.submitTag();
                    }
                  }}
                />
                <Fab className="pick-color-add" size="small" aria-label="add">
                  <img
                    src={TicketListAddIcon}
                    className="add-color-icon"
                    onClick={this.submitTag}
                    alt="TicketListAddIcon"
                  ></img>
                </Fab>
              </div>
              <div className="tags-color-picker-color-container">
                <div className="tags-circle-picker-one">
                  <CirclePicker
                    colors={colors}
                    width={"100px"}
                    circleSize={12}
                    circleSpacing={1}
                  />
                </div>
              </div>
              <div className="pick-color-make-it-private">
                <img src={PickColorLock} alt="PickColorLock"></img>
                <p>Make it private</p>
                <Checkbox value="checkedB" color="primary" />
              </div>
            </div>
          ) : null}
          <img
            className=""
            src={moreTagsIcon}
            alt="moreTagsIcon"
            onClick={() => this.colorPickerPopupToggler(props)}
          />
        </div>
      </div>
    );
  };

  PriorityColumnElement = props => {
    return (
      <div
        className={`ticket-priority-container
        ${
          props.value === 1
            ? "low-priority"
            : props.value === 2
            ? "medium-priority"
            : props.value === 3
            ? "high-priority"
            : props.value === 4
            ? "critical-priority"
            : null
        }`}
        onClick={() => this.setShowTktPriorityPopup(props)}
      >
        {this.state.priorityApiData
          ? this.state.priorityApiData.map(priority => {
              if (props.data.priorityId == priority.id) {
                return <div>{priority.priorityname}</div>;
              }
            })
          : ""}
        {this.state.isShowTktPriorityPopup &&
        this.state.rowIndex === props.rowIndex ? (
          <div className="ticket-table-priority-popup" ref={this.setWrapperRef}>
            <Scrollbars style={{ width: 127, height: 120 }}>
              {this.state.priorityApiData.map((priority, index) => {
                return (
                  <div className="top-text-popup-content">
                    <div>
                      <span>{priority.priorityname}</span>
                    </div>
                    <Radio
                      checked={this.prioritySelectedId === index}
                      onChange={this.handleUpdatePriority}
                      value={priority.id}
                      name="priorityRadioId"
                      color="primary"
                      inputProps={{ "aria-label": "" }}
                    />
                  </div>
                );
              })}
            </Scrollbars>
          </div>
        ) : null}
      </div>
    );
  };
  showAssignToPopup = async propsData => {
    await this.setState({
      isShowAssignToPopup: !this.state.isShowAssignToPopup,
      rowIndex: propsData.rowIndex,
      ticketId: propsData.data.id,
      managerId: propsData.data.managerId,
      statusId: propsData.data.statusId
    });
    this.refreshCells();
  };
  AssignToColumnElement = props => {
    return (
      <div className="assign-Profile-element">
        <div
          className="assign-Profile"
          onClick={() => this.showAssignToPopup(props)}
        >
          <img src={AssignToProfile} alt="AssignToProfile" />
          {this.state.userApiData
            ? this.state.userApiData.map(user => {
                if (user.id == props.data.assignedToAgentId) {
                  return <p>{user.firstName}</p>;
                }
              })
            : ""}
        </div>
        {this.state.isShowAssignToPopup &&
        this.state.rowIndex === props.rowIndex ? (
          <div className="top-text-popup-one" ref={this.setWrapperRef}>
            <div className="top-text-search-field">
              <InputBase
                placeholder="Search people"
                type="text"
                className="registration-input"
                inputProps={{ "aria-label": "search" }}
              />
              <img src={searchicon} alt="searchicon"></img>
            </div>
            <Scrollbars style={{ width: 180, height: 150 }}>
              {this.state.userApiData.map((user, index) => {
                return (
                  <div key={index} className="top-text-popup-content">
                    <div>
                      <img
                        className="top-text-popup-avathar"
                        src={BottomPopupAvatar}
                        alt="BottomPopupAvatar"
                      ></img>
                      <span>{user.firstName}</span>
                    </div>
                    <Radio
                      checked={this.state.assignToSelected === index}
                      // onChange={(e) => this.HandleClickFunction(e, index, props.data)}
                      onChange={this.handleAssignTo}
                      value={user.id}
                      name="radio-button-demo"
                      color="primary"
                      inputProps={{ "aria-label": "" }}
                    />
                  </div>
                );
              })}
            </Scrollbars>
          </div>
        ) : null}
      </div>
    );
  };

  showMoreOptions = async rowIndex => {
    await this.setState({
      isShowMoreOptions: !this.state.isShowMoreOptions,
      rowIndex: rowIndex
    });
    this.refreshCells();
  };

  isEditTicketToggler = propsData => {
    this.setState({
      isEditDrawerOpen: !this.state.isEditDrawerOpen,
      ticketEData: propsData.data
    });
  };

  chartSectionToggler = () => {
    this.setState({ isChartSectionOpen: !this.state.isChartSectionOpen });
  };

  toTicketDetails = propsData => {
    history.push({
      pathname: "/ticketDetails",
      state: { ticketData: propsData }
    });
  };
  ticketclose = propsData =>{
    let id=propsData.id;
    const client = this.props.client;
    ticketClose(client, id, res=>{
      let ticketsclosed = res.data.closeTicket;
      this.setState({ ticketsclosed: ticketsclosed });
      return res
    })
  }
  ticketduplicate= propsData =>{
    const client = this.props.client;
    let id=propsData.id;
    duplicateTicket(client,id,res=>{
      let ticketsduplicate = res.data.isDuplicate;
      this.setState({ ticketsduplicate: ticketsduplicate });
      return res;
    })    
  }
  ticketdelete = propsData => {
    let id=propsData.id;
    const client = this.props.client;
    deleteThisTicket(client,id, async res=>{
      let tickets = res.data.removeTicket;
      await this.setState({ tickets: tickets });
      return res
    })   
  };

  handleClickAway = () => {
    this.setState({ isShowMoreOptions: false });
  };

  MoreOptionsIconElement = props => {
    return (
         <ClickAwayListener onClickAway={this.handleClickAway}>
      <div className="tickets-more-options">
        <div
          className="more-options-popup-placeholder"
          onClick={() => this.showMoreOptions(props.rowIndex)}
        >
          <img src={moreOptionsIcon} alt="moreOptionsIcon" />

          {this.state.isShowMoreOptions &&
          this.state.rowIndex == props.rowIndex ? (
            <div className="ticket-list-more-popup" ref={this.setWrapperRef}>
              <ul>
                <li onClick={() => this.toTicketDetails(props.data)}>
                  <i class="fa fa-eye fa-lg" aria-hidden="true"></i>
                  <span>View details</span>
                </li>
                <li
                  className="ticket-listing-icon"
                  // onClick={'editTicketDrawer("right", true, ticket)'}
                  onClick={() => this.isEditTicketToggler(props)}
                >
                  <img src={TasksListPopupEdit} alt="edit"></img>
                  <span>Edit ticket</span>
                </li>
                <li className="ticket-listing-icon">
                  <img src={TasksListPopupAssign} alt="edit"></img>
                  <span>Assign / Transfer</span>
                </li>

                <li
                  className="ticket-listing-icon"
                  onClick={event => this.ticketHandleClick(event)}
                >
                  <img src={TasksListPopupBulk} alt="edit"></img>
                  <span>Bulk update</span>
                </li>

                <li
                  className="ticket-listing-icon"
                  onClick={event => this.ticketHandleClick(event)}
                >
                  <img src={TasksListPopupMerge} alt="edit"></img>
                  <span>Merge</span>
                </li>
                <li
                  className="ticket-listing-icon"
                  onClick={'forwardDrawer("right", true)'}
                >
                  <img src={TasksListPopupForward} alt="edit"></img>
                  <span>Forward</span>
                </li>
                <li className="ticket-listing-icon"   onClick={() => this.ticketclose(props.data)}>
                  <img src={TasksListPopupClose} alt="edit"></img>
                  <span>Close</span>
                </li>
                <li className="ticket-listing-icon"
                 onClick={() => this.ticketduplicate(props.data)}>
                  <img src={TasksListPopupDuplicate} alt="edit"></img>
                  <span>Duplicate</span>
                </li>
                <li className="ticket-listing-icon" 
                 onClick={() => this.ticketdelete(props.data)}
                >

                  <img src={TasksListPopupDelete} alt="edit"></img>
                  <span>Delete</span>
                </li>
                <li
                  className="ticket-listing-icon"
                  onClick={"() => openAddNoteToTicketHandler(ticket)"}
                >
                  <img src={TasksListPopupAssign} alt="edit"></img>
                  <span>Add Note</span>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
     </ClickAwayListener>
    );
  };

  rowStyleHandler = params => {
    if (params.node.rowIndex % 2 !== 0) {
      return { background: "#F9F9F9" };
    }
  };

  autoSizeColumns = params => {
    const colIds = params.columnApi
      .getAllDisplayedColumns()
      .map(col => col.getColId());

    params.columnApi.autoSizeColumns(colIds);
  };
  refreshTicketData = data => {
    this.setState({ isDataFromDropdown: true, ticketFromDayDropdown: data });
  };
  bodySection = () => {
    return (
      <div className="ticket-listing-component-body ">
        {this.state.isCTDrawerOpen ? (
          <CreateTicketDrawer
            client={this.props.client}
            propState={this.state.tagsApiData}
            user={this.state.logedUser}
            isCTDrawerOpen={this.state.isCTDrawerOpen}
            thisObj={this}
          />
        ) : null}
        <CreateHabitDrawer isOpenCreateHabit={false} thisObj={this} />
        <Header />
        <SubHeader refresh={data => this.refreshTicketData(data)} />
        {/* <SubHeader
          // totalCount={this.state.ticketDayData.length}
        /> */}
        <div className={`ticket-table-body`}>
          {!!this.state.logedUser ? (
            <Chartbar
              chartSectionToggler={this.chartSectionToggler}
              client={this.props.client}
              user={this.state.logedUser}
            />
          ) : (
            ""
          )}

          <div
            className={`ticket-listing-table-section ag-theme-balham 
            ${
              this.state.isChartSectionOpen
                ? "compress-ticket-table"
                : "expand-ticket-table"
            }`}
          >
            <AgGridReact
              // onFirstDataRendered={this.autoSizeColumns}
              getRowStyle={this.rowStyleHandler}
              rowSelection="multiple"
              columnDefs={this.state.columnDefs}
              modules="AllModules"
              rowDragManaged={true}
              animateRows={true}
              domLayout={this.state.domHeight}
              defaultColDef={this.state.defaultColDef}
              rowData={
                this.state.searchTicketTrue ? this.state.searchTicketData 
                  : this.state.isDataFromDropdown ? this.state.ticketFromDayDropdown
                  : this.state.isShowAllStatusTkts ? this.state.allStatusTickets
                  : this.state.isShowOpenSatusTkts ? this.state.openStatusTickets
                  : this.state.isShowInProgSatusTkts ? this.state.inProgessStatusTickets
                  : this.state.isShowResolvedSatusTkts ? this.state.resolvedStatusTickets
                  : this.state.isShowClosedSatusTkts ? this.state.closedStatusTickets
                  : this.state.ticketList ? this.state.ticketList
                  : ""
              }
              onSelectionChanged={this.onSelectionChanged}
              groupSelectsChildren={true}
              context={this.state.context}
              frameworkComponents={this.state.frameworkComponents}
              overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
              onGridReady={this.onGridReady}
              getRowHeight={this.state.getRowHeight}
            ></AgGridReact>
            {this.state.isShowBtnPopup ? (
              <TicketListBtmPopup
                isTicketBtnActive={!this.state.isTicketBtnActive}
                ticketIds={this.state.checkBoxValue}
                client={this.props.client}
                thisObj={this}
              />
            ) : null}
          </div>
        </div>
        <EditTicket
          isEditDrawerOpen={this.state.isEditDrawerOpen}
          thisObj={this}
          client={this.props.client}
          ticketEData={this.state.ticketEData}
        />
      </div>
    );
  };

  render() {
    return (

      <MainLayout
        secondSidebar={
          <TicketsCollapsableSection allState={this.state} client={this.props.client} thisObj={this} />
        }
        bodySection={this.bodySection()}
      />
      
    );
  }
}

export default TicketTable;
