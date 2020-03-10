import React from 'react';
import "./BulkUpdate.scss";
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Checkbox from '@material-ui/core/Checkbox';
import AssignToImage from "../../../../assets/images/profile.png";
import {
    getAllStatus,
    getAllUsers,
    getAllPriority,
    getAllTags,
    getAllDepartments,
    getAllTeams,
    getAllProjects,
    searchTicketBasedOnCategory,
    bulkUpdate
} from "./bulkUpdateQueries";
// import DrpDwnIcn from "../../../../../assets/icons/create-ticket/Icon ionic-md-arrow-dropdown.svg";
import DrpDwnIcn from "../../../../assets/icons/create-ticket/Icon ionic-md-arrow-dropdown.svg";
import AddMultipleTag from "../../../../assets/icons/01-10-2019/Icon feather-plus-circle.svg"
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import MediumIcon from "../../../../assets/icons/create-ticket/Path 887.svg";
import CriticalCustomerIcon from "../../../../assets/icons/create-ticket/Ellipse 3149.svg";
import HighIcon from "../../../../assets/icons/create-ticket/Rectangle 242.svg";
import LowIcon from "../../../../assets/icons/create-ticket/Rectangle 261.svg";
import SearchTagAdd from "../../../../assets/icons/create-ticket/Group 11349.svg";
import ClrPckrTray from "../../../../assets/icons/create-ticket/Icon ionic-ios-color-palette.svg";
import { CirclePicker } from 'react-color';

const color = ['#feb1b2', '#7ac9ff', '#ffc089', '#41e590', '#ea5455', '#c8c8c8', '#656565', '#ecf1f9', '#7AC9FF']

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const TicketCategory = [
    { id: 1, title: "Ticket no", value: "ticketNo" },
    { id: 2, title: "Status", value: "status" },
    { id: 3, title: "Tag", value: "tags" },
    { id: 4, title: "Priority", value: "priority" }
]

let checkedList = [];
let wrapperRef;

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

class BulkUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            dueDate: new Date(),
            fCustomer: 'customer',
            fContact: 'contact',
            fDepartment: 'department',
            fTeam: 'team',
            fManager: 'manager',
            fAssignedTo: 'assignedTo',
            fCreatedBy: 'createdBy',
            personName: [],
            age: '',
            priority: '',
            tagsName: [],

            statusApiData: '',
            userApiData: '',
            priorityApiData: '',
            tagsApiData: '',
            departmentApiData: '',
            teamApiData: '',
            projectApiData: '',

            searchText: '',
            category: '',

            isTicketCategoryDropdown: false,
            selected: '',
            anchorEl: null,
            isTicketStatusDropdown: false,
            isTicketPriorityDropdown: false,
            isTicketTagsDropdown: false,
            checkedTagsArray: [],
            tagsSelect: "",
            mName: "Manager",
            assignName: "Assign To",
            dName: "Department",
            tName: "Team",
            pName: "Project"

        }
    }

    componentDidMount() {
        let client = this.props.client;
        document.addEventListener('mousedown', this.handleClickOutsideBody);
        this.getAllStatusData();
        this.getAllUsersData();
        this.getAllPriorityData();
        this.getAllTagsData();
        this.getAllDepartmentsData();
        this.getAllTeamData();
        this.getAllProjectData();
    }

    getAllStatusData = () => {
        let client = this.props.client;
        getAllStatus(
            client, statusData => {
                if (this.state.statusApiData == '' || this.state.statusApiData == undefined
                    || this.state.statusApiData == null) {
                    this.setState({ statusApiData: statusData.data.getAllStatus });
                }
            }
        );
    }
    getAllUsersData = () => {
        let client = this.props.client;
        getAllUsers(
            client, userData => {
                if (this.state.userApiData == '' || this.state.userApiData == undefined
                    || this.state.userApiData == null) {
                    this.setState({ userApiData: userData.data.getAllUsers });
                }
            }
        );
    }
    getAllPriorityData = () => {
        let client = this.props.client;
        getAllPriority(
            client, priorityData => {
                if (this.state.priorityApiData == '' || this.state.priorityApiData == undefined
                    || this.state.priorityApiData == null) {
                    this.setState({ priorityApiData: priorityData.data.priorities });
                }
            }
        );
    }

    getAllTagsData = async () => {
        const result = await getAllTags();
        if (result) {
            if (this.state.tagsApiData == '' || this.state.tagsApiData == undefined
                || this.state.tagsApiData == null) {
                this.setState({ tagsApiData: result });
            }
        }
    }
    getAllDepartmentsData = () => {
        let client = this.props.client;
        getAllDepartments(
            client, departmentsData => {
                if (this.state.departmentApiData == '' || this.state.departmentApiData == undefined
                    || this.state.departmentApiData == null) {
                    this.setState({ departmentApiData: departmentsData.data.getAllDepartments });
                }
            }
        );
    }
    getAllTeamData = () => {
        let client = this.props.client;
        getAllTeams(
            client, teamsData => {
                if (this.state.teamApiData == '' || this.state.teamApiData == undefined
                    || this.state.teamApiData == null) {
                    this.setState({ teamApiData: teamsData.data.getAllTeams });
                }
            }
        );
    }

    getAllProjectData = () => {
        let client = this.props.client;
        getAllProjects(
            client, projectData => {
                if (this.state.projectApiData == '' || this.state.projectApiData == undefined
                    || this.state.projectApiData == null) {
                    this.setState({ projectApiData: projectData.data.getAllProjects });
                }
            }
        );
    }


    submitSearchText = async (e) => {
        const data = {
            searchText: this.state.searchText && this.state.searchText != '' ? this.state.searchText : '',
            category: this.state.category
        }
        let client = this.props.client;
        searchTicketBasedOnCategory(client, data, searchData => {
            if (this.state.responseData == '' || this.state.responseData == undefined || this.state.responseData == null) {
                this.setState({
                    responseData: searchData != undefined &&
                        searchData != null
                        && searchData != '' ?
                        searchData : ''
                })
            }
        })
    }

    closeBDrawerHandler = () => {
        this.props.thisObj.setState({ isBulkDrawerOpen: false })
    }
    chooseStartHandler = date => {
        this.setState({ startDate: date })
    }

    chooseDueHandler = date => {
        this.setState({ dueDate: date })
    }
    toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({ ...this.state, [side]: open });
    };

    handleChange = event => {
        this.setState({ age: event.target.value })
    };

    priorityHandleChange = event => {
        this.setState({ priority: event.target.value })
    };

    multipleHandleChange = event => {
        this.setState({ tagsName: event.target.value });
    };

    handleCheckBoxValue = (e) => {
        if (e.target.checked) {
            checkedList.push(Number(e.target.value));
        } else if (!e.target.checked) {
            checkedList.pop();
        }
    }

    bulkUpdateData = async () => {
        let ticketAllIds = [];
        this.props.ticketIds.map(ids => {
            checkedList.push(Number(ids));
        })
        ticketAllIds = checkedList;
        const data = {
            status: Number(this.state.status),
            priorityOne: Number(this.state.priorityOne),
            tagsName: this.state.tagsName,
            manager: Number(this.state.manager),
            assignTo: Number(this.state.assignTo),
            department: Number(this.state.department),
            team: Number(this.state.team),
            project: Number(this.state.project),
            bulkStatusChangeIds: ticketAllIds

        }
        const result = await bulkUpdate(this.props.client, data);
        if (result.data.bulkTicketStatusUpdate) {
            this.props.thisObj.setState({ isBulkDrawerOpen: false })
        }

    }

    // Added on Nov 18th
    handleClickOutsideBody = async (event) => {
        if (wrapperRef && !wrapperRef.contains(event.target)) {
            await this.setState({
                isTicketCategoryDropdown: false,
            })
            // this.refreshCells()
        }
    }
    handleSearchText = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ responseData: '', isTicketCategoryDropdown: false });
    };
    setWrapperRef = (node) => wrapperRef = node;
    showTicketCategoryDropdown = () => {
        this.setState({ isTicketCategoryDropdown: !this.state.isTicketCategoryDropdown })
    }

    ticketCategoryHandleClick = (selectedObject) => {
        this.setState({ selected: selectedObject });
    }
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    showTicketStatusDropdown = () => {
        this.setState({
            isTicketStatusDropdown: !this.state.isTicketStatusDropdown,
            isTicketPriorityDropdown: false, isTicketTagsDropdown: false,
            isTicketManagerDropdown: false, isTicketAssignToDropdown: false,
            isTicketDepartmentDropdown: false,
            isTicketTeamsDropdown: false, isTicketProjectsDropdown: false
        })
    }
    handleChangeData = (event) => {
        this.setState({
            status: event.target.value,
            isTicketStatusDropdown: false, isTicketPriorityDropdown: false,
            isTicketTagsDropdown: false, isTicketManagerDropdown: false,
            isTicketAssignToDropdown: false, isTicketDepartmentDropdown: false,
            isTicketTeamsDropdown: false, isTicketProjectsDropdown: false
        })
    }
    showTicketPriorityDropdown = () => {
        this.setState({
            isTicketPriorityDropdown: !this.state.isTicketPriorityDropdown,
            isTicketStatusDropdown: false, isTicketTagsDropdown: false,
            isTicketManagerDropdown: false, isTicketAssignToDropdown: false,
            isTicketDepartmentDropdown: false,
            isTicketTeamsDropdown: false, isTicketProjectsDropdown: false
        })
    }
    handleChangePriorityData = (event) => {
        this.setState({
            priorityOne: event.target.value,
            isTicketPriorityDropdown: false, isTicketStatusDropdown: false,
            isTicketTagsDropdown: false, isTicketManagerDropdown: false,
            isTicketAssignToDropdown: false, isTicketDepartmentDropdown: false,
            isTicketTeamsDropdown: false, isTicketProjectsDropdown: false
        })
    }
    showTicketTagsDropdown = () => {
        this.setState({
            isTicketTagsDropdown: !this.state.isTicketTagsDropdown,
            isTicketStatusDropdown: false, isTicketPriorityDropdown: false,
            isTicketManagerDropdown: false, isTicketAssignToDropdown: false,
            isTicketDepartmentDropdown: false,
            isTicketTeamsDropdown: false, isTicketProjectsDropdown: false
        })
    }
    // Added on Nov 18th ends

    // Added on Nov 20th manager section
    showTicketManagerDropdown = () => {
        this.setState({
            isTicketManagerDropdown: !this.state.isTicketManagerDropdown,
            isTicketPriorityDropdown: false, isTicketStatusDropdown: false,
            isTicketTagsDropdown: false, isTicketAssignToDropdown: false,
            isTicketDepartmentDropdown: false,
            isTicketTeamsDropdown: false, isTicketProjectsDropdown: false
        })
    }
    handleChangeManagerData = (event, user) => {
        this.setState({
            manager: event.target.value,
            mName: user.firstName,
            isTicketPriorityDropdown: false, isTicketStatusDropdown: false,
            isTicketTagsDropdown: false, isTicketManagerDropdown: false,
            isTicketAssignToDropdown: false, isTicketDepartmentDropdown: false,
            isTicketTeamsDropdown: false, isTicketProjectsDropdown: false
        })
    }

    // Assign to section
    showTicketAssignToDropdown = () => {
        this.setState({
            isTicketAssignToDropdown: !this.state.isTicketAssignToDropdown,
            isTicketPriorityDropdown: false, isTicketStatusDropdown: false,
            isTicketTagsDropdown: false, isTicketManagerDropdown: false,
            isTicketDepartmentDropdown: false,
            isTicketTeamsDropdown: false, isTicketProjectsDropdown: false
        })
    }
    handleChangeAssignToData = (event, user) => {
        this.setState({
            assignTo: event.target.value,
            assignName: user.firstName,
            isTicketPriorityDropdown: false, isTicketStatusDropdown: false,
            isTicketTagsDropdown: false, isTicketManagerDropdown: false,
            isTicketAssignToDropdown: false, isTicketDepartmentDropdown: false,
            isTicketTeamsDropdown: false, isTicketProjectsDropdown: false
        })
    }

    // Department section
    showTicketDepartmentDropdown = () => {
        this.setState({
            isTicketDepartmentDropdown: !this.state.isTicketDepartmentDropdown,
            isTicketPriorityDropdown: false, isTicketStatusDropdown: false,
            isTicketTagsDropdown: false, isTicketManagerDropdown: false,
            isTicketAssignToDropdown: false,
            isTicketTeamsDropdown: false, isTicketProjectsDropdown: false
        })
    }
    handleChangeDepartmentData = (event, user) => {
        this.setState({
            department: event.target.value,
            dName: user.departmentName,
            isTicketPriorityDropdown: false, isTicketStatusDropdown: false,
            isTicketTagsDropdown: false, isTicketManagerDropdown: false,
            isTicketAssignToDropdown: false, isTicketDepartmentDropdown: false,
            isTicketTeamsDropdown: false, isTicketProjectsDropdown: false
        })
    }

    // Teams section
    showTicketTeamsDropdown = () => {
        this.setState({
            isTicketTeamsDropdown: !this.state.isTicketTeamsDropdown,
            isTicketPriorityDropdown: false, isTicketStatusDropdown: false,
            isTicketTagsDropdown: false, isTicketManagerDropdown: false,
            isTicketAssignToDropdown: false,
            isTicketDepartmentDropdown: false, isTicketProjectsDropdown: false
        })
    }
    handleChangeTeamsData = (event, user) => {
        this.setState({
            team: event.target.value,
            tName: user.teamName,
            isTicketPriorityDropdown: false, isTicketStatusDropdown: false,
            isTicketTagsDropdown: false, isTicketManagerDropdown: false,
            isTicketAssignToDropdown: false, isTicketDepartmentDropdown: false,
            isTicketTeamsDropdown: false, isTicketProjectsDropdown: false
        })
    }
    // Project section
    showTicketProjectsDropdown = () => {
        this.setState({
            isTicketProjectsDropdown: !this.state.isTicketProjectsDropdown,
            isTicketPriorityDropdown: false, isTicketStatusDropdown: false,
            isTicketTagsDropdown: false, isTicketManagerDropdown: false,
            isTicketAssignToDropdown: false, isTicketDepartmentDropdown: false,
            isTicketTeamsDropdown: false
        })
    }
    handleChangeProjectsData = (event, user) => {
        this.setState({
            project: event.target.value,
            pName: user.projectName,
            isTicketPriorityDropdown: false, isTicketStatusDropdown: false,
            isTicketTagsDropdown: false, isTicketManagerDropdown: false,
            isTicketAssignToDropdown: false, isTicketDepartmentDropdown: false,
            isTicketTeamsDropdown: false, isTicketProjectsDropdown: false
        })
    }
    // Added on Nov 20th

    array = [];
    checkedTags = async (id) => {
        var tagString = "";
        var tagData = [];
        if (this.array.includes(id)) {
            let index = this.array.indexOf(id)
            this.array.splice(index, 1);
        } else {
            this.array.push(id)
        }
        await this.array.map(uniq => {
            if (this.array.length > 1) {
                tagString += " " + uniq.tagTitle;
                tagData.push(uniq.tagTitle);
            } else {
                tagString = uniq.tagTitle;
                tagData.push(uniq.tagTitle);
            }
        })
        this.setState({ checkedTagsArray: this.array, tagsSelect: tagString, tagsName: tagData });
        this.setState({
            isTicketTagsDropdown: false, isTicketStatusDropdown: false,
            isTicketPriorityDropdown: false, isTicketManagerDropdown: false,
            isTicketAssignToDropdown: false, isTicketDepartmentDropdown: false,
            isTicketTeamsDropdown: false, isTicketProjectsDropdown: false
        })

    }

    // Added on Nov 20th ends
    sideList = side => (
        <div className="bulk-update-drawer-bodySection" role="presentation">
            <div className="bulk-update">
                <div className="bulk-update-header-text"><p>BULK UPDATE</p></div>
                <div className="bulkupdate-container d-flex justify-space-between">
                    <div className="select-ticket-drawer-ticket-type">
                        <div className='menu-container'>
                            <div className='select-drawer-container' onClick={this.showTicketCategoryDropdown}>
                                <div className='selected-item-container'>
                                    <p style={{ textTransform: 'capitalize' }}>{this.state.category ? this.state.category : 'Ticket'}</p>
                                </div>
                                <div className="selected-drp-dwn-img">
                                    <img src={DrpDwnIcn} onClick={this.showTicketCategoryDropdown} />
                                </div>
                            </div>

                            <div className={`ticket-type-dropdown-menu-container ${this.state.isTicketCategoryDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`} ref={this.setWrapperRef}>
                                {TicketCategory.map((icon, index) =>
                                    <StyledMenuItem className="customized-ticket-source"
                                        // onClick={() => this.ticketCategoryHandleClick(icon)}
                                        onClose={this.handleClose}
                                    >
                                        <div className="create-ticket-one-tckt-typ d-flex">
                                            <div className="create-ticket-tckt-img-text d-flex">
                                                {/* <img src={icon.icon}></img> */}
                                                <p>{icon.title}</p>
                                            </div>

                                            <div className="create-ticket-src-radio">
                                                <Radio
                                                    checked={icon.value === this.state.category}
                                                    name="category"
                                                    color="primary"
                                                    value={icon.value}
                                                    onChange={this.handleSearchText}
                                                    inputProps={{ 'aria-label': '' }}
                                                />
                                            </div>
                                        </div>
                                    </StyledMenuItem>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="bulk-header-search">
                        <div className="bulk-search-bar">
                            <InputBase
                                placeholder="Search tickets"
                                className="search-input"
                                inputProps={{ 'aria-label': 'search' }}
                                name="searchText"
                                onChange={this.handleSearchText}
                                onKeyPress={this.submitSearchText}
                            />
                            <div className="search-icon">
                                <SearchIcon />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="button1-popup-for-one">
                    <div className='button1-popup-one'>
                        <div className='button1-popup-content'>
                            {this.state.responseData && this.state.responseData != null &&
                                this.state.responseData.length != 0 ?
                                this.state.responseData.map(data => {
                                    return <div className="bulk-update-licensing">
                                        <Checkbox
                                            value={data.id}
                                            color="primary"
                                            onClick={this.handleCheckBoxValue}
                                        />
                                        <div className="phone-number-text">
                                            <p className="phone-number-text-one">{data.ticket_Id}</p>
                                            <p className="phone-number-text-two">{data.name}</p>
                                        </div>
                                        <div className="licensing-text">
                                            <p>{data.ticketDescription}</p>
                                            <div className="licensing-img-text">
                                                <img src={AssignToImage}></img>
                                                <p>{data.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                }) : <div className="bulk-update-licensing2">
                                    <Checkbox
                                        value="checkedB"
                                        color="primary"
                                    />
                                    <div className="phone-number-text">
                                        <p className="phone-number-text-one">#0828190</p>
                                        <p className="phone-number-text-two">Code Matrix</p>
                                    </div>
                                    <div className="licensing-text">
                                        <p>Need one more licensing</p>
                                        <div className="licensing-img-text">
                                            <img src={AssignToImage}></img>
                                            <p>Sugatha Maji</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div className="bulk-update-list-container">
                    <div className="bulkupdate-container d-flex justify-space-between">
                        <div className="select-ticket-drawer-status">
                            <div className='menu-container-status'>
                                <div className='status-drawer-container'
                                    onClick={this.showTicketStatusDropdown}>
                                    <div className='selected-item-container'>
                                        <p style={{ textTransform: 'capitalize' }}>
                                            {
                                                this.state.status == 1 ? 'New' : this.state.status == 2 ? 'Open' :
                                                    this.state.status == 3 ? 'Inprogress' : this.state.status == 4 ? 'Resolved' :
                                                        this.state.status == 5 ? 'Reopen' : this.state.status == 6 ? 'closed' : 'Status'
                                            }
                                        </p>
                                    </div>
                                    <div className="selected-drp-dwn-img">
                                        <img src={DrpDwnIcn}
                                            onClick={this.showTicketStatusDropdown}
                                        />
                                    </div>
                                </div>

                                <div className={`ticket-status-dropdown-menu-container ${this.state.isTicketStatusDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`} ref={this.setWrapperRef}>
                                    {this.state.statusApiData ? this.state.statusApiData.map((status, index) =>
                                        <StyledMenuItem className="customized-ticket-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-ticket-one-tckt-typ d-flex">
                                                <div className="create-ticket-tckt-img-text d-flex">
                                                    {/* <img src={icon.icon}></img> */}
                                                    <p>{status.statusName}</p>
                                                </div>

                                                <div className="create-ticket-src-radio">
                                                    <Radio
                                                        checked={status.id == this.state.status}
                                                        name="statusName"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        value={status.id}
                                                        onChange={this.handleChangeData}
                                                    />
                                                </div>
                                            </div>
                                        </StyledMenuItem>
                                    ) : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bulk-update-list-container">
                    <div className="bulkupdate-container d-flex justify-space-between">
                        <div className="select-ticket-drawer-priority">
                            <div className='menu-container-priority'>
                                <div className='priority-drawer-container'
                                    onClick={this.showTicketPriorityDropdown}>
                                    <div className='selected-item-container'>
                                        <p style={{ textTransform: 'capitalize' }}>
                                            {
                                                this.state.priorityOne == 1 ? 'Low' : this.state.priorityOne == 2 ? 'Medium' :
                                                    this.state.priorityOne == 3 ? 'High' : this.state.priorityOne == 4 ? 'Critical' : 'Priority'
                                            }
                                        </p>
                                    </div>
                                    <div className="selected-drp-dwn-img">
                                        <img src={DrpDwnIcn}
                                            onClick={this.showTicketPriorityDropdown}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={`ticket-priority-dropdown-menu-container ${this.state.isTicketPriorityDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
                                    ref={this.setWrapperRef}
                                >
                                    {this.state.priorityApiData ? this.state.priorityApiData.map((priority, index) =>
                                        <StyledMenuItem className="customized-ticket-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-ticket-one-tckt-typ d-flex">
                                                <div className="create-ticket-tckt-img-text d-flex">
                                                    {/* <img src={icon.icon}></img> */}
                                                    <p>{priority.priorityname}</p>
                                                </div>

                                                <div className="create-ticket-src-radio">
                                                    <Radio
                                                        checked={priority.id == this.state.priorityOne}
                                                        name="priorityName"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        value={priority.id}
                                                        onChange={this.handleChangePriorityData}
                                                    />
                                                </div>
                                            </div>
                                        </StyledMenuItem>
                                    ) : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bulk-update-list-container">
                    <div className="bulkupdate-container d-flex justify-space-between">
                        <div className="select-ticket-drawer-tags">
                            <div className='menu-container-tags'>
                                <div className='tags-drawer-container'
                                    onClick={this.showTicketTagsDropdown}>
                                    <div className='selected-item-container'>
                                        <p style={{ textTransform: 'capitalize' }}>
                                            {
                                                this.state.tagsSelect ? this.state.tagsSelect : "Tags"
                                            }
                                        </p>
                                    </div>
                                    <div className="selected-drp-dwn-img">
                                        <div className="selected-tags-drp-dwn-img">
                                            <img src={AddMultipleTag} onClick={this.showTicketTagsDropdown} />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`ticket-tags-dropdown-menu-container ${this.state.isTicketTagsDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
                                    ref={this.setWrapperRef}
                                >
                                    {this.state.tagsApiData ? this.state.tagsApiData.map((tags, index) =>
                                        <StyledMenuItem className="customized-ticket-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-ticket-one-tckt-typ d-flex">
                                                <div className="create-ticket-tckt-img-text d-flex">
                                                    <p>{tags.tagTitle}</p>
                                                </div>
                                                <div className="bulk-ticket-src-check">
                                                    <Checkbox
                                                        className="bulk-ticket-tags-chck"
                                                        name="checkedTagsArray"
                                                        value={this.state.checkedTagsArray}
                                                        color="primary"
                                                        onClick={() => this.checkedTags(tags)}
                                                    />
                                                </div>
                                            </div>
                                        </StyledMenuItem>
                                    ) : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bulk-update-list-container">
                    <div className="bulkupdate-container d-flex justify-space-between">
                        <div className="select-ticket-drawer-manager">
                            <div className='menu-container-manager'>
                                <div className='manager-drawer-container'
                                    onClick={this.showTicketManagerDropdown}>
                                    <div className='selected-item-container'>
                                        <p style={{ textTransform: 'capitalize' }}>
                                            {
                                                this.state.mName
                                            }
                                        </p>
                                    </div>
                                    <div className="selected-drp-dwn-img">
                                        <img src={DrpDwnIcn}
                                            onClick={this.showTicketManagerDropdown}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={`ticket-manager-dropdown-menu-container ${this.state.isTicketManagerDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
                                    ref={this.setWrapperRef}
                                >
                                    {this.state.userApiData ? this.state.userApiData.map((user, index) =>
                                        <StyledMenuItem className="customized-ticket-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-ticket-one-tckt-typ d-flex">
                                                <div className="create-ticket-tckt-img-text d-flex">
                                                    <p>{user.firstName}&nbsp;{user.lastName}</p>
                                                </div>

                                                <div className="create-ticket-src-radio">
                                                    <Radio
                                                        checked={user.id == this.state.manager}
                                                        name="mName"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        value={user.id}
                                                        onChange={(e) => this.handleChangeManagerData(e, user)}
                                                    />
                                                </div>
                                            </div>
                                        </StyledMenuItem>
                                    ) : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bulk-update-list-container">
                    <div className="bulkupdate-container d-flex justify-space-between">
                        <div className="select-ticket-drawer-assignto">
                            <div className='menu-container-assignto'>
                                <div className='assignto-drawer-container'
                                    onClick={this.showTicketAssignToDropdown}>
                                    <div className='selected-item-container'>
                                        <p style={{ textTransform: 'capitalize' }}>
                                            {
                                                this.state.assignName
                                            }
                                        </p>
                                    </div>
                                    <div className="selected-drp-dwn-img">
                                        <img src={DrpDwnIcn}
                                            onClick={this.showTicketAssignToDropdown}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={`ticket-assignto-dropdown-menu-container ${this.state.isTicketAssignToDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
                                    ref={this.setWrapperRef}
                                >
                                    {this.state.userApiData ? this.state.userApiData.map((user, index) =>
                                        <StyledMenuItem className="customized-ticket-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-ticket-one-tckt-typ d-flex">
                                                <div className="create-ticket-tckt-img-text d-flex">
                                                    <p>{user.firstName}&nbsp;{user.lastName}</p>
                                                </div>

                                                <div className="create-ticket-src-radio">
                                                    <Radio
                                                        checked={user.id == this.state.assignTo}
                                                        name="assignName"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        value={user.id}
                                                        onChange={(e) => this.handleChangeAssignToData(e, user)}
                                                    />
                                                </div>
                                            </div>
                                        </StyledMenuItem>
                                    ) : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bulk-update-list-container">
                    <div className="bulkupdate-container d-flex justify-space-between">
                        <div className="select-ticket-drawer-department">
                            <div className='menu-container-department'>
                                <div className='department-drawer-container'
                                    onClick={this.showTicketDepartmentDropdown}>
                                    <div className='selected-item-container'>
                                        <p style={{ textTransform: 'capitalize' }}>
                                            {
                                                this.state.dName
                                            }
                                        </p>
                                    </div>
                                    <div className="selected-drp-dwn-img">
                                        <img src={DrpDwnIcn}
                                            onClick={this.showTicketDepartmentDropdown}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={`ticket-department-dropdown-menu-container ${this.state.isTicketDepartmentDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
                                    ref={this.setWrapperRef}
                                >
                                    {this.state.departmentApiData ? this.state.departmentApiData.map((depData, index) =>
                                        <StyledMenuItem className="customized-ticket-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-ticket-one-tckt-typ d-flex">
                                                <div className="create-ticket-tckt-img-text d-flex">
                                                    <p>{depData.departmentName}</p>
                                                </div>

                                                <div className="create-ticket-src-radio">
                                                    <Radio
                                                        checked={depData.id == this.state.department}
                                                        name="assignName"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        value={depData.id}
                                                        onChange={(e) => this.handleChangeDepartmentData(e, depData)}
                                                    />
                                                </div>
                                            </div>
                                        </StyledMenuItem>
                                    ) : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bulk-update-list-container">
                    <div className="bulkupdate-container d-flex justify-space-between">
                        <div className="select-ticket-drawer-teams">
                            <div className='menu-container-teams'>
                                <div className='teams-drawer-container'
                                    onClick={this.showTicketTeamsDropdown}>
                                    <div className='selected-item-container'>
                                        <p style={{ textTransform: 'capitalize' }}>
                                            {
                                                this.state.tName
                                            }
                                        </p>
                                    </div>
                                    <div className="selected-drp-dwn-img">
                                        <img src={DrpDwnIcn}
                                            onClick={this.showTicketTeamsDropdown}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={`ticket-teams-dropdown-menu-container ${this.state.isTicketTeamsDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
                                    ref={this.setWrapperRef}
                                >
                                    {this.state.teamApiData ? this.state.teamApiData.map((team, index) =>
                                        <StyledMenuItem className="customized-ticket-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-ticket-one-tckt-typ d-flex">
                                                <div className="create-ticket-tckt-img-text d-flex">
                                                    <p>{team.teamName}</p>
                                                </div>

                                                <div className="create-ticket-src-radio">
                                                    <Radio
                                                        checked={team.id == this.state.team}
                                                        name="assignName"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        value={team.id}
                                                        onChange={(e) => this.handleChangeTeamsData(e, team)}
                                                    />
                                                </div>
                                            </div>
                                        </StyledMenuItem>
                                    ) : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bulk-update-list-container">
                    <div className="bulkupdate-container d-flex justify-space-between">
                        <div className="select-ticket-drawer-projects">
                            <div className='menu-container-projects'>
                                <div className='projects-drawer-container'
                                    onClick={this.showTicketProjectsDropdown}>
                                    <div className='selected-item-container'>
                                        <p style={{ textTransform: 'capitalize' }}>
                                            {
                                                this.state.pName
                                            }
                                        </p>
                                    </div>
                                    <div className="selected-drp-dwn-img">
                                        <img src={DrpDwnIcn}
                                            onClick={this.showTicketProjectsDropdown}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={`ticket-projects-dropdown-menu-container ${this.state.isTicketProjectsDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
                                    ref={this.setWrapperRef}
                                >
                                    {this.state.projectApiData ? this.state.projectApiData.map((project, index) =>
                                        <StyledMenuItem className="customized-ticket-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-ticket-one-tckt-typ d-flex">
                                                <div className="create-ticket-tckt-img-text d-flex">
                                                    <p>{project.projectName}</p>
                                                </div>

                                                <div className="create-ticket-src-radio">
                                                    <Radio
                                                        checked={project.id == this.state.project}
                                                        name="projectName"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        value={project.id}
                                                        onChange={(e) => this.handleChangeProjectsData(e, project)}
                                                    />
                                                </div>
                                            </div>
                                        </StyledMenuItem>
                                    ) : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bulk-break-for-submit-section"></div>
                <div className="merge-update-submit-section">
                    <div className="bulk-update-submit-section-button-one">
                        <Button variant="outlined" color="primary" className=""
                            onClick={this.closeBDrawerHandler}
                        >
                            Cancel
                        </Button>
                    </div>
                    <div className="bulk-update-submit-section-button-two">
                        <Button
                            variant="outlined" color="primary" className=""
                            onClick={this.bulkUpdateData}
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );

    render() {
        return (
            <Drawer anchor="right"
                open={this.props.isBulkDrawerOpen}
                onClose={this.toggleDrawer('right', false)} className='bulk-update-drawer'
            >
                <div className="d-flex">
                    <div className="drawer-full-width" onClick={this.closeBDrawerHandler}></div>
                    {this.sideList('right')}
                </div>
            </Drawer>
        )
    }

}

export default BulkUpdate;