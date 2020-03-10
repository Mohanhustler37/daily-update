import React from "react";
import Drawer from '@material-ui/core/Drawer';
import {
    GetDepartments, GetStatus, GetPriority,
    GetTeams, GetProjects, updateTicket, GetTicketType, getAllUsers, getAllTags
} from "./EditTicketQueries";
import { getAllCompanies } from "../../../graphQl/companyDetailQueries";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Dragula from 'react-dragula';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import "./TicketTable.scss";
import "./editTicket.scss";
import DrpDwnIcn from "../../../assets/icons/create-ticket/Icon ionic-md-arrow-dropdown.svg";
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

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

let wrapperRef;
let abcd;
class EditTicket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            ticketid: '',
            name: '',
            ticket_description: '',
            ticketTypeName: '',
            managerId: '',
            assignedToName: '',
            departmentName: '',
            teamName: '',
            projectName: '',
            contactName: '',
            userId: '',
            tenantId: '',

            companyName: '',
            statusName: '',
            priorityName: '',
            tagsName: [],

            departMentApiData: [],
            companyApiData: [],
            statusApiData: [],
            priorityApiData: [],
            teamApiData: [],
            projectApiData: [],
            typeApiData: [],
            userApiData: [],
            tagsApiData: [],

            cmpName: '',

            // Added on 21st Nov
            isCompanyDropdown: false,
            cName: "Company Name",
            cNameData: false,
            isStatusDropdown: false,
            sName: "Status",
            sNameData: false,
            isPriorityDropdown: false,
            pName: "Priority",
            pNameData: false,
            isTagsDropdown: false,
            tName: "Tags",
            tNameData: false,
            checkedTagsArray: [],
            tagsSelect: "",
            isTypeDropdown: false,
            tyName: "Type",
            tyNameData: false,
            isManagerDropdown: false,
            mName: "Manager",
            mNameData: false,
            isAssignDropdown: false,
            aName: "Assign to",
            aNameData: false,
            isDepartmentDropdown: false,
            depName: "Department",
            depNameData: false,
            isTeamDropdown: false,
            teName: "Team",
            teNameData: false,
            isProjectDropdown: false,
            proName: "Project",
            proNameData: false,
            isContactDropdown: false,
            conName: "Contact",
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutsideBody);
        this.getDepartmentsData();
        this.getCompaniesData();
        this.getStatusData();
        this.getPriorityData();
        this.getTeamsData();
        this.getProjectsData();
        this.getAllUsersData();
        this.getTicketTypeData();
        this.getAllTagsData();
    }

    handleUpdateTicket = async () => {
        const data = {
            id: this.props.ticketEData.id,
            companyName: this.state.companyName ? this.state.companyName : this.props.ticketEData.companyId,
            name: this.state.name ? this.state.name : this.props.ticketEData.name,
            statusId: this.state.statusName ? this.state.statusName : this.props.ticketEData.statusId,
            priorityId: this.state.priorityName ? this.state.priorityName : this.props.ticketEData.priorityId,
            ticketDescription: this.state.ticket_description ? this.state.ticket_description : this.props.ticketEData.ticketDescription,
            // Tags missing
            tags: this.state.tagsName ? this.state.tagsName : this.props.ticketEData.tags,
            ticketTypeName: this.state.ticketTypeName ? this.state.ticketTypeName : this.props.ticketEData.ticketType,
            managerId: this.state.managerName ? this.state.managerName : this.props.ticketEData.managerId,
            assignedToAgentId: this.state.assignedToName ? this.state.assignedToName : this.props.ticketEData.assignedToAgentId,
            departmentId: this.state.departmentName ? this.state.departmentName : this.props.ticketEData.departmentId,
            teamId: this.state.teamName ? this.state.teamName : this.props.ticketEData.teamId,
            tenantId: this.state.tenantId ? this.state.tenantId : this.props.ticketEData.tenantId,
            projectId: this.state.projectName ? this.state.projectName : this.props.ticketEData.projectId,
            userId: this.state.userId ? this.state.userId : this.props.ticketEData.userId,
        }
        const result = await updateTicket(this.props.client, data)
        if (result) {
            this.props.thisObj.setState({ isEditDrawerOpen: false })
        }
    }

    getDepartmentsData = async () => {
        const result = await GetDepartments(this.props.client);
        if (result) {
            if (this.state.departMentApiData == '' || this.state.departMentApiData == undefined
                || this.state.departMentApiData == null) {
                this.setState({
                    departMentApiData: result.data.getAllDepartments
                });
            }
        }
    }
    getCompaniesData = async () => {
        const result = await getAllCompanies(this.props.client);
        if (result) {
            if (this.state.companyApiData == '' || this.state.companyApiData == undefined
                || this.state.companyApiData == null) {
                this.setState({
                    companyApiData: result
                });
            }
        }
    }
    getStatusData = async () => {
        const result = await GetStatus(this.props.client);
        if (result) {
            if (this.state.statusApiData == '' || this.state.statusApiData == undefined || this.state.statusApiData == null) {
                this.setState({
                    statusApiData: result.data.getAllStatus
                });
            }
        }
    }
    getPriorityData = async () => {
        const result = await GetPriority(this.props.client);
        if (result) {
            if (this.state.priorityApiData == '' || this.state.priorityApiData == undefined
                || this.state.priorityApiData == null) {
                this.setState({
                    priorityApiData: result.data.priorities
                });
            }
        }
    }

    getTeamsData = async () => {
        const result = await GetTeams(this.props.client);
        if (result) {
            if (this.state.teamApiData == '' || this.state.teamApiData == undefined || this.state.teamApiData == null) {
                this.setState({
                    teamApiData: result.data.getAllTeams
                });
            }
        }
    }

    getProjectsData = async () => {
        const result = await GetProjects(this.props.client);
        if (result) {
            if (this.state.projectApiData == '' || this.state.projectApiData == undefined
                || this.state.projectApiData == null) {
                this.setState({
                    projectApiData: result.data.getAllProjects
                })
            }
        }
    }

    getTicketTypeData = async () => {
        const result = await GetTicketType(this.props.client);
        if (result) {
            if (this.state.typeApiData == '' || this.state.typeApiData == undefined
                || this.state.typeApiData == null) {
                this.setState({
                    typeApiData: result
                })
            }
        }
    }

    getAllTagsData = async () => {
        const result = await getAllTags(this.props.client);
        if (result) {
            if (this.state.tagsApiData == '' || this.state.tagsApiData == undefined
                || this.state.tagsApiData == null) {
                this.setState({ tagsApiData: result });
            }
        }
    }
    getAllUsersData = async () => {
        let client = this.props.client;
        const result = await getAllUsers(client);
        if (result) {
            if (this.state.userApiData == '' || this.state.userApiData == undefined
                || this.state.userApiData == null) {
                this.setState({ userApiData: result });
            }
        }
    }

    toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({ ...this.state, [side]: open });
    };

    closeEditDrawerHandler = () => {
        this.props.thisObj.setState({ isEditDrawerOpen: false })
    }

    handleChangeText = event => {
        this.setState({ name: event.target.value });
    };

    handleChangeTextarea = event => {
        this.setState({ ticket_description: event.target.value });
    };



    // Added on 21st Nov

    handleClickOutsideBody = async (event) => {
        if (wrapperRef && !wrapperRef.contains(event.target)) {
            await this.setState({
                isCompanyDropdown: false,
                isStatusDropdown: false, isPriorityDropdown: false,
                isTagsDropdown: false, isTypeDropdown: false,
                isManagerDropdown: false, isAssignDropdown: false,
                isDepartmentDropdown: false, isTeamDropdown: false,
                isProjectDropdown: false, isContactDropdown: false
            })
        }
    }

    setWrapperRef = (node) => wrapperRef = node;

    //Company 
    handleChangeCompany = (event, cdata) => {
        this.setState({
            companyName: event.target.value,
            cName: cdata.companyName,
            cNameData: true,
            isCompanyDropdown: false, isStatusDropdown: false,
            isPriorityDropdown: false, isTagsDropdown: false,
            isTypeDropdown: false, isManagerDropdown: false,
            isAssignDropdown: false, isDepartmentDropdown: false,
            isTeamDropdown: false, isProjectDropdown: false,
            isContactDropdown: false
        });
    }
    showCompanyDropdown = () => {
        this.setState({
            isCompanyDropdown: !this.state.isCompanyDropdown,
            isStatusDropdown: false, isPriorityDropdown: false,
            isTagsDropdown: false, isTypeDropdown: false,
            isManagerDropdown: false, isAssignDropdown: false,
            isDepartmentDropdown: false, isTeamDropdown: false,
            isProjectDropdown: false, isContactDropdown: false
        })
    }
    // Status
    handleChangeStatus = (event, sdata) => {
        this.setState({
            statusName: event.target.value,
            sName: sdata.statusName,
            sNameData: true,
            isStatusDropdown: false, isCompanyDropdown: false,
            isPriorityDropdown: false, isTagsDropdown: false,
            isTypeDropdown: false, isManagerDropdown: false,
            isAssignDropdown: false, isDepartmentDropdown: false,
            isTeamDropdown: false, isProjectDropdown: false,
            isContactDropdown: false
        });
    }
    showStatusDropdown = () => {
        this.setState({
            isStatusDropdown: !this.state.isStatusDropdown,
            isCompanyDropdown: false, isPriorityDropdown: false,
            isTagsDropdown: false, isTypeDropdown: false,
            isManagerDropdown: false, isAssignDropdown: false,
            isDepartmentDropdown: false, isTeamDropdown: false,
            isProjectDropdown: false, isContactDropdown: false
        })
    }

    // Priority
    handleChangePriority = (event, pdata) => {
        this.setState({
            priorityName: event.target.value,
            pName: pdata.priorityname,
            pNameData: true,
            isStatusDropdown: false, isCompanyDropdown: false,
            isPriorityDropdown: false, isTagsDropdown: false,
            isTypeDropdown: false, isManagerDropdown: false,
            isAssignDropdown: false, isDepartmentDropdown: false,
            isTeamDropdown: false, isProjectDropdown: false,
            isContactDropdown: false
        });
    }
    showPriorityDropdown = () => {
        this.setState({
            isPriorityDropdown: !this.state.isPriorityDropdown,
            isStatusDropdown: false, isCompanyDropdown: false,
            isTagsDropdown: false, isTypeDropdown: false,
            isManagerDropdown: false, isAssignDropdown: false,
            isDepartmentDropdown: false, isTeamDropdown: false,
            isProjectDropdown: false, isContactDropdown: false
        })
    }

    // Tags
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
        this.setState({ checkedTagsArray: this.array, tagsSelect: tagString, tagsName: tagData, tNameData: true });
        this.setState({
            isStatusDropdown: false, isCompanyDropdown: false,
            isPriorityDropdown: false, isTagsDropdown: false,
            isTypeDropdown: false, isManagerDropdown: false,
            isAssignDropdown: false, isDepartmentDropdown: false,
            isTeamDropdown: false, isProjectDropdown: false,
            isContactDropdown: false
        })

    }

    showTagsDropdown = () => {
        this.setState({
            isTagsDropdown: !this.state.isTagsDropdown,
            isPriorityDropdown: false, isStatusDropdown: false,
            isCompanyDropdown: false, isTypeDropdown: false,
            isManagerDropdown: false, isAssignDropdown: false,
            isDepartmentDropdown: false, isTeamDropdown: false,
            isProjectDropdown: false, isContactDropdown: false
        })
    }

    // Type
    handleChangeTicketType = (event, tydata) => {
        this.setState({
            ticketTypeName: event.target.value,
            tyName: tydata.title,
            tyNameData: true,
            isStatusDropdown: false, isCompanyDropdown: false,
            isPriorityDropdown: false, isTagsDropdown: false,
            isTypeDropdown: false, isManagerDropdown: false,
            isAssignDropdown: false, isDepartmentDropdown: false,
            isTeamDropdown: false, isProjectDropdown: false,
            isContactDropdown: false
        });
    }
    showTypeDropdown = () => {
        this.setState({
            isTypeDropdown: !this.state.isTypeDropdown,
            isTagsDropdown: false, isPriorityDropdown: false,
            isStatusDropdown: false, isCompanyDropdown: false,
            isManagerDropdown: false, isAssignDropdown: false,
            isDepartmentDropdown: false, isTeamDropdown: false,
            isProjectDropdown: false, isContactDropdown: false
        })
    }

    // manager
    handleChangeManager = (event, mdata) => {
        this.setState({
            managerName: event.target.value,
            mName: mdata.firstName,
            mNameData: true,
            isStatusDropdown: false, isCompanyDropdown: false,
            isPriorityDropdown: false, isTagsDropdown: false,
            isTypeDropdown: false, isManagerDropdown: false,
            isAssignDropdown: false, isDepartmentDropdown: false,
            isTeamDropdown: false, isProjectDropdown: false,
            isContactDropdown: false
        });
    }
    showManagerDropdown = () => {
        this.setState({
            isManagerDropdown: !this.state.isManagerDropdown,
            isTypeDropdown: false, isTagsDropdown: false,
            isPriorityDropdown: false, isStatusDropdown: false,
            isCompanyDropdown: false, isAssignDropdown: false,
            isDepartmentDropdown: false, isTeamDropdown: false,
            isProjectDropdown: false, isContactDropdown: false
        })
    }

    // Assign to
    handleChangeAssignedTo = (event, adata) => {
        this.setState({
            assignedToName: event.target.value,
            aName: adata.firstName,
            aNameData: true,
            isStatusDropdown: false, isCompanyDropdown: false,
            isPriorityDropdown: false, isTagsDropdown: false,
            isTypeDropdown: false, isManagerDropdown: false,
            isAssignDropdown: false, isDepartmentDropdown: false,
            isTeamDropdown: false, isProjectDropdown: false,
            isContactDropdown: false
        });
    }
    showAssignDropdown = () => {
        this.setState({
            isAssignDropdown: !this.state.isAssignDropdown,
            isManagerDropdown: false, isTypeDropdown: false,
            isTagsDropdown: false, isPriorityDropdown: false,
            isStatusDropdown: false, isCompanyDropdown: false,
            isDepartmentDropdown: false, isTeamDropdown: false,
            isProjectDropdown: false, isContactDropdown: false
        })
    }

    // Departments
    handleChangeDepartment = (event, adata) => {
        this.setState({
            departmentName: event.target.value,
            depName: adata.departmentName,
            depNameData: true,
            isStatusDropdown: false, isCompanyDropdown: false,
            isPriorityDropdown: false, isTagsDropdown: false,
            isTypeDropdown: false, isManagerDropdown: false,
            isAssignDropdown: false, isDepartmentDropdown: false,
            isTeamDropdown: false, isProjectDropdown: false,
            isContactDropdown: false
        });
    }
    showDepartmentDropdown = () => {
        this.setState({
            isDepartmentDropdown: !this.state.isDepartmentDropdown,
            isAssignDropdown: false, isManagerDropdown: false,
            isTypeDropdown: false, isTagsDropdown: false,
            isPriorityDropdown: false, isStatusDropdown: false,
            isCompanyDropdown: false, isTeamDropdown: false,
            isProjectDropdown: false, isContactDropdown: false
        })
    }

    // Teams
    handleChangeTeam = (event, adata) => {
        this.setState({
            teamName: event.target.value,
            teName: adata.teamName,
            teNameData: true,
            isStatusDropdown: false, isCompanyDropdown: false,
            isPriorityDropdown: false, isTagsDropdown: false,
            isTypeDropdown: false, isManagerDropdown: false,
            isAssignDropdown: false, isDepartmentDropdown: false,
            isTeamDropdown: false, isProjectDropdown: false,
            isContactDropdown: false
        });
    }
    showTeamDropdown = () => {
        this.setState({
            isTeamDropdown: !this.state.isTeamDropdown,
            isAssignDropdown: false, isManagerDropdown: false,
            isTypeDropdown: false, isTagsDropdown: false,
            isPriorityDropdown: false, isStatusDropdown: false,
            isCompanyDropdown: false, isDepartmentDropdown: false,
            isProjectDropdown: false, isContactDropdown: false
        })
    }
    // Added on 21st ends

    // Project
    handleChangeProject = (event, adata) => {
        this.setState({
            projectName: event.target.value,
            proName: adata.projectName,
            proNameData: true,
            isStatusDropdown: false, isCompanyDropdown: false,
            isPriorityDropdown: false, isTagsDropdown: false,
            isTypeDropdown: false, isManagerDropdown: false,
            isAssignDropdown: false, isDepartmentDropdown: false,
            isTeamDropdown: false, isProjectDropdown: false,
            isContactDropdown: false
        });
    }
    showProjectDropdown = () => {
        this.setState({
            isProjectDropdown: !this.state.isProjectDropdown,
            isAssignDropdown: false, isManagerDropdown: false,
            isTypeDropdown: false, isTagsDropdown: false,
            isPriorityDropdown: false, isStatusDropdown: false,
            isCompanyDropdown: false, isTeamDropdown: false,
            isContactDropdown: false, isDepartmentDropdown: false,
        })
    }

    // Team
    handleChangeContact = (event, adata) => {
        this.setState({
            contactName: event.target.value,
            conName: adata.firstName,
            isStatusDropdown: false, isCompanyDropdown: false,
            isPriorityDropdown: false, isTagsDropdown: false,
            isTypeDropdown: false, isManagerDropdown: false,
            isAssignDropdown: false, isDepartmentDropdown: false,
            isTeamDropdown: false, isProjectDropdown: false,
            isContactDropdown: false
        });
    }
    showContactDropdown = () => {
        this.setState({
            isContactDropdown: !this.state.isContactDropdown,
            isAssignDropdown: false, isManagerDropdown: false,
            isTypeDropdown: false, isTagsDropdown: false,
            isPriorityDropdown: false, isStatusDropdown: false,
            isCompanyDropdown: false, isTeamDropdown: false,
            isProjectDropdown: false, isDepartmentDropdown: false,
        })
    }

    editSidePanel = (side, ticket, index) => (
        <div
            className="edit-container"
            role="presentation"
        >
            <div className="edit-tkt-sidebar-container">
                <div style={{ height: "100%", background: '#fff' }}>
                    <div className="edit-tkt-sidebar-header">
                        <div className="edit-tkt-heading">
                            EDIT TICKET &nbsp;&nbsp;
                        <span>
                                ({this.props.ticketEData ? this.props.ticketEData.ticket_Id : ''})
                        </span>
                        </div>
                    </div>
                    <div className="edit-ticket-drawer-ticket-comp-description d-flex justify-space-between">
                        <div className="edit-ticket-drawer-ticket-company">
                            <div className='menu-comp-container'>
                                <div className='edit-drawer-container-comp d-flex'
                                    onClick={this.showCompanyDropdown}
                                >
                                    <div className='selected-item-container'>
                                        {
                                            this.state.cNameData == false && this.props.ticketEData.companyId != null ?
                                                this.state.companyApiData ? this.state.companyApiData.map((cData, index) => {
                                                    if (this.props.ticketEData.companyId == cData.id)
                                                        return <p>{cData.companyName}</p>
                                                }) : <p>{this.state.cName}</p> : <p>{this.state.cName}</p>
                                        }
                                    </div>
                                    <div className="ticket-drp-dwn-img">
                                        <img src={DrpDwnIcn}
                                            onClick={this.showCompanyDropdown}
                                        />
                                    </div>

                                </div>

                                <div className={`ticket-type-dropdown-menu-container 
                                    ${this.state.isCompanyDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
                                    ref={this.setWrapperRef}
                                >
                                    {this.state.companyApiData ? this.state.companyApiData.map((cData, index) =>
                                        <StyledMenuItem className="customized-ticket-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-ticket-one-tckt-typ d-flex">
                                                <div className="create-ticket-tckt-img-text d-flex">
                                                    {/* <img src={cData.icon}></img> */}
                                                    <p>{cData.companyName}</p>
                                                </div>

                                                <div className="create-ticket-src-radio">
                                                    <Radio
                                                        checked={cData.id == this.state.companyName}
                                                        value={cData.id}
                                                        name="ticketTypeId"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        onChange={(e) => this.handleChangeCompany(e, cData)}
                                                    />
                                                </div>
                                            </div>

                                        </StyledMenuItem>
                                    ) : null}

                                </div>
                            </div>
                        </div>
                        <div className="ticket-title-container">
                            <TextField
                                label="SUBJECT"
                                id="margin-none"
                                variant="outlined"
                                name='name'
                                defaultValue={this.props.ticketEData ? this.props.ticketEData.name : ''}
                                onChange={(e) => this.handleChangeText(e)}
                            />
                        </div>
                    </div>
                    <div className="edit-ticket-drawer-ticket-status-priority d-flex justify-space-between">
                        <div className="edit-ticket-drawer-ticket-status">
                            <div className='menu-status-container'>
                                <div className='edit-drawer-container-status d-flex'
                                    onClick={this.showStatusDropdown}
                                >
                                    <div className='selected-item-container'>

                                        {
                                            this.state.sNameData == false && this.props.ticketEData.statusId != null ?
                                                this.state.statusApiData ? this.state.statusApiData.map((data, index) => {
                                                    if (this.props.ticketEData.statusId == data.id)
                                                        return <p>{data.statusName}</p>
                                                }) : <p>{this.state.sName}</p> : <p>{this.state.sName}</p>
                                        }
                                    </div>
                                    <div className="ticket-drp-dwn-img">
                                        <img src={DrpDwnIcn}
                                            onClick={this.showStatusDropdown}
                                        />
                                    </div>

                                </div>

                                <div className={`ticket-type-dropdown-menu-container 
                                    ${this.state.isStatusDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
                                    ref={this.setWrapperRef}
                                >
                                    {this.state.statusApiData ? this.state.statusApiData.map((sData, index) =>
                                        <StyledMenuItem className="customized-ticket-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-ticket-one-tckt-typ d-flex">
                                                <div className="create-ticket-tckt-img-text d-flex">
                                                    {/* <img src={cData.icon}></img> */}
                                                    <p>{sData.statusName}</p>
                                                </div>

                                                <div className="create-ticket-src-radio">
                                                    <Radio
                                                        checked={sData.id == this.state.statusName}
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
                            </div>
                        </div>
                        <div className="edit-ticket-drawer-ticket-priority">
                            <div className='menu-priority-container'>
                                <div className='priority-container'
                                    onClick={this.showPriorityDropdown}
                                >
                                    <div className='selected-item-container'>
                                        {
                                            this.state.pNameData == false && this.props.ticketEData.priorityId != null ?
                                                this.state.priorityApiData ? this.state.priorityApiData.map((data, index) => {
                                                    if (this.props.ticketEData.priorityId == data.id)
                                                        return <p>{data.priorityname}</p>
                                                }) : <p>{this.state.pName}</p> : <p>{this.state.pName}</p>
                                        }
                                    </div>
                                    <div className="ticket-drp-dwn-img">
                                        <img src={DrpDwnIcn}
                                            onClick={this.showPriorityDropdown}
                                        />
                                    </div>

                                </div>

                                <div className={`priority-dropdown-menu-container 
                                    ${this.state.isPriorityDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
                                    ref={this.setWrapperRef}
                                >
                                    {this.state.priorityApiData ? this.state.priorityApiData.map((pData, index) =>
                                        <StyledMenuItem className="customized-ticket-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-ticket-one-tckt-typ d-flex">
                                                <div className="create-ticket-tckt-img-text d-flex">
                                                    {/* <img src={cData.icon}></img> */}
                                                    <p>{pData.priorityname}</p>
                                                </div>

                                                <div className="create-ticket-src-radio">
                                                    <Radio
                                                        checked={pData.id == this.state.priorityName}
                                                        value={pData.id}
                                                        name="ticketTypeId"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        onChange={(e) => this.handleChangePriority(e, pData)}
                                                    />
                                                </div>
                                            </div>
                                        </StyledMenuItem>
                                    ) : null}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="edit-ticket-text-area">
                        <TextareaAutosize
                            label="DESCRIPTION"
                            id="margin-none"
                            variant="outlined"
                            aria-label="minimum height"
                            name="ticket_description"
                            rows={3} placeholder="Ticket description"
                            onChange={(e) => this.handleChangeTextarea(e)}
                        >
                            {this.props.ticketEData ? this.props.ticketEData.ticketDescription : ''}
                        </TextareaAutosize>
                    </div>

                    <div className="edit-ticket-drawer-ticket-tags-type d-flex justify-space-between">
                        <div className="edit-ticket-drawer-ticket-tags">
                            <div className='menu-tags-container'>
                                <div className='edit-drawer-container-tags d-flex'
                                    onClick={this.showTagsDropdown}
                                >
                                    <div className='selected-item-container'>
                                        {
                                            this.state.tNameData == false && this.props.ticketEData.tags != null ?
                                                <p>{this.props.ticketEData.tags}</p>
                                                : <p>{this.state.tagsSelect}</p>
                                        }
                                    </div>
                                    <div className="ticket-drp-dwn-img">
                                        <img src={DrpDwnIcn}
                                            onClick={this.showTagsDropdown}
                                        />
                                    </div>

                                </div>

                                <div className={`ticket-type-dropdown-menu-container 
                                    ${this.state.isTagsDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
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
                        <div className="edit-ticket-drawer-ticket-type">
                            <div className='menu-type-container'>
                                <div className='type-container'
                                    onClick={this.showTypeDropdown}
                                >
                                    <div className='selected-item-container'>

                                        {
                                            this.state.tyNameData == false && this.props.ticketEData.ticketType != null ?
                                                this.state.typeApiData ? this.state.typeApiData.map((data, index) => {
                                                    if (this.props.ticketEData.ticketType == data.id)
                                                        return <p>{data.title}</p>
                                                }) : this.state.tyName : this.state.tyName
                                        }

                                    </div>
                                    <div className="ticket-drp-dwn-img">
                                        <img src={DrpDwnIcn}
                                            onClick={this.showTypeDropdown}
                                        />
                                    </div>

                                </div>

                                <div className={`type-dropdown-menu-container 
                                    ${this.state.isTypeDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
                                    ref={this.setWrapperRef}
                                >
                                    {this.state.typeApiData ? this.state.typeApiData.map((tData, index) =>
                                        <StyledMenuItem className="customized-ticket-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-ticket-one-tckt-typ d-flex">
                                                <div className="create-ticket-tckt-img-text d-flex">
                                                    <p>{tData.title}</p>
                                                </div>

                                                <div className="create-ticket-src-radio">
                                                    <Radio
                                                        checked={tData.id == this.state.ticketTypeName}
                                                        value={tData.id}
                                                        name="ticketTypeId"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        onChange={(e) => this.handleChangeTicketType(e, tData)}
                                                    />
                                                </div>
                                            </div>

                                        </StyledMenuItem>
                                    ) : null}

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="edit-ticket-drawer-ticket-manager-assign d-flex justify-space-between">
                        <div className="edit-ticket-drawer-ticket-manager">
                            <div className='menu-manager-container'>
                                <div className='edit-drawer-container-manager d-flex'
                                    onClick={this.showManagerDropdown}
                                >
                                    <div className='selected-item-container'>
                                        {
                                            this.state.mNameData == false && this.props.ticketEData.managerId != null ?
                                                this.state.userApiData ? this.state.userApiData.map((data, index) => {
                                                    if (this.props.ticketEData.managerId == data.id)
                                                        return <p>{data.firstName}</p>
                                                }) : <p>{this.state.mName}</p> : <p>{this.state.mName}</p>
                                        }
                                    </div>
                                    <div className="ticket-drp-dwn-img">
                                        <img src={DrpDwnIcn}
                                            onClick={this.showManagerDropdown}
                                        />
                                    </div>

                                </div>

                                <div className={`ticket-manager-dropdown-menu-container 
                                    ${this.state.isManagerDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
                                    ref={this.setWrapperRef}
                                >
                                    {this.state.userApiData ? this.state.userApiData.map((uData, index) =>
                                        <StyledMenuItem className="customized-ticket-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-ticket-one-tckt-typ d-flex">
                                                <div className="create-ticket-tckt-img-text d-flex">
                                                    <p>{uData.firstName}</p>
                                                </div>

                                                <div className="create-ticket-src-radio">
                                                    <Radio
                                                        checked={uData.id == this.state.managerName}
                                                        value={uData.id}
                                                        name="ticketTypeId"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        onChange={(e) => this.handleChangeManager(e, uData)}
                                                    />
                                                </div>
                                            </div>

                                        </StyledMenuItem>
                                    ) : null}

                                </div>
                            </div>
                        </div>
                        <div className="edit-ticket-drawer-ticket-assign">
                            <div className='menu-assign-container'>
                                <div className='assign-container'
                                    onClick={this.showAssignDropdown}
                                >
                                    <div className='selected-item-container'>
                                        {
                                            this.state.aNameData == false && this.props.ticketEData.assignedToAgentId != null ?
                                                this.state.userApiData ? this.state.userApiData.map((data, index) => {
                                                    if (this.props.ticketEData.assignedToAgentId == data.id)
                                                        return <p>{data.firstName}</p>
                                                }) : <p>{this.state.aName}</p> : <p>{this.state.aName}</p>
                                        }
                                    </div>
                                    <div className="ticket-drp-dwn-img">
                                        <img src={DrpDwnIcn}
                                            onClick={this.showAssignDropdown}
                                        />
                                    </div>

                                </div>

                                <div className={`assign-dropdown-menu-container 
                                    ${this.state.isAssignDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
                                    ref={this.setWrapperRef}
                                >
                                    {this.state.userApiData ? this.state.userApiData.map((uData, index) =>
                                        <StyledMenuItem className="customized-ticket-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-ticket-one-tckt-typ d-flex">
                                                <div className="create-ticket-tckt-img-text d-flex">
                                                    <p>{uData.firstName}</p>
                                                </div>

                                                <div className="create-ticket-src-radio">
                                                    <Radio
                                                        checked={uData.id == this.state.assignedToName}
                                                        value={uData.id}
                                                        name="ticketTypeId"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        onChange={(e) => this.handleChangeAssignedTo(e, uData)}
                                                    />
                                                </div>
                                            </div>
                                        </StyledMenuItem>
                                    ) : null}

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="edit-ticket-drawer-ticket-dept-team d-flex justify-space-between">
                        <div className="edit-ticket-drawer-ticket-dept">
                            <div className='menu-dept-container'>
                                <div className='edit-drawer-container-dept d-flex'
                                    onClick={this.showDepartmentDropdown}
                                >
                                    <div className='selected-item-container'>
                                        {
                                            this.state.depNameData == false && this.props.ticketEData.departmentId != null ?
                                                this.state.departMentApiData ? this.state.departMentApiData.map((data, index) => {
                                                    if (this.props.ticketEData.departmentId == data.id)
                                                        return <p>{data.departmentName}</p>
                                                }) : <p>{this.state.depName}</p> : <p>{this.state.depName}</p>
                                        }
                                    </div>
                                    <div className="ticket-drp-dwn-img">
                                        <img src={DrpDwnIcn}
                                            onClick={this.showDepartmentDropdown}
                                        />
                                    </div>

                                </div>

                                <div className={`ticket-dept-dropdown-menu-container 
                                    ${this.state.isDepartmentDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
                                    ref={this.setWrapperRef}
                                >
                                    {this.state.departMentApiData ? this.state.departMentApiData.map((dData, index) =>
                                        <StyledMenuItem className="customized-ticket-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-ticket-one-tckt-typ d-flex">
                                                <div className="create-ticket-tckt-img-text d-flex">
                                                    <p>{dData.departmentName}</p>
                                                </div>

                                                <div className="create-ticket-src-radio">
                                                    <Radio
                                                        checked={dData.id == this.state.departmentName}
                                                        value={dData.id}
                                                        name="ticketTypeId"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        onChange={(e) => this.handleChangeDepartment(e, dData)}
                                                    />
                                                </div>
                                            </div>

                                        </StyledMenuItem>
                                    ) : null}

                                </div>
                            </div>
                        </div>
                        <div className="edit-ticket-drawer-ticket-team">
                            <div className='menu-team-container'>
                                <div className='team-container'
                                    onClick={this.showTeamDropdown}
                                >
                                    <div className='selected-item-container'>
                                        {
                                            this.state.teNameData == false && this.props.ticketEData.teamId != null ?
                                                this.state.teamApiData ? this.state.teamApiData.map((data, index) => {
                                                    if (this.props.ticketEData.teamId == data.id)
                                                        return <p>{data.teamName}</p>
                                                }) : <p>{this.state.teName}</p> : <p>{this.state.teName}</p>
                                        }
                                    </div>
                                    <div className="ticket-drp-dwn-img">
                                        <img src={DrpDwnIcn}
                                            onClick={this.showTeamDropdown}
                                        />
                                    </div>

                                </div>

                                <div className={`team-dropdown-menu-container 
                                    ${this.state.isTeamDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
                                    ref={this.setWrapperRef}
                                >
                                    {this.state.teamApiData ? this.state.teamApiData.map((tData, index) =>
                                        <StyledMenuItem className="customized-ticket-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-ticket-one-tckt-typ d-flex">
                                                <div className="create-ticket-tckt-img-text d-flex">
                                                    <p>{tData.teamName}</p>
                                                </div>

                                                <div className="create-ticket-src-radio">
                                                    <Radio
                                                        checked={tData.id == this.state.teamName}
                                                        value={tData.id}
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        onChange={(e) => this.handleChangeTeam(e, tData)}
                                                    />
                                                </div>
                                            </div>

                                        </StyledMenuItem>
                                    ) : null}

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="edit-ticket-drawer-ticket-pro-con d-flex justify-space-between">
                        <div className="edit-ticket-drawer-ticket-pro">
                            <div className='menu-pro-container'>
                                <div className='edit-drawer-container-pro d-flex'
                                    onClick={this.showProjectDropdown}
                                >
                                    <div className='selected-item-container'>

                                        {
                                            this.state.proNameData == false && this.props.ticketEData.projectId != null ?
                                                this.state.projectApiData ? this.state.projectApiData.map((data, index) => {
                                                    if (this.props.ticketEData.projectId == data.id)
                                                        return <p>{data.projectName}</p>
                                                }) : <p>{this.state.proName}</p> : <p>{this.state.proName}</p>
                                        }
                                    </div>
                                    <div className="ticket-drp-dwn-img">
                                        <img src={DrpDwnIcn}
                                            onClick={this.showProjectDropdown}
                                        />
                                    </div>

                                </div>

                                <div className={`ticket-pro-dropdown-menu-container 
                                    ${this.state.isProjectDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
                                    ref={this.setWrapperRef}
                                >
                                    {this.state.projectApiData ? this.state.projectApiData.map((pData, index) =>
                                        <StyledMenuItem className="customized-ticket-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-ticket-one-tckt-typ d-flex">
                                                <div className="create-ticket-tckt-img-text d-flex">
                                                    <p>{pData.projectName}</p>
                                                </div>

                                                <div className="create-ticket-src-radio">
                                                    <Radio
                                                        checked={pData.id == this.state.projectName}
                                                        value={pData.id}
                                                        name="ticketTypeId"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        onChange={(e) => this.handleChangeProject(e, pData)}
                                                    />
                                                </div>
                                            </div>

                                        </StyledMenuItem>
                                    ) : null}

                                </div>
                            </div>
                        </div>
                        <div className="edit-ticket-drawer-ticket-con">
                            <div className='menu-con-container'>
                                <div className='con-container'
                                    onClick={this.showContactDropdown}
                                >
                                    <div className='selected-item-container'>
                                        <p>
                                            {
                                                this.state.conName
                                            }
                                        </p>
                                    </div>
                                    <div className="ticket-drp-dwn-img">
                                        <img src={DrpDwnIcn}
                                            onClick={this.showContactDropdown}
                                        />
                                    </div>

                                </div>

                                <div className={`con-dropdown-menu-container 
                                    ${this.state.isContactDropdown ? 'ticket-type-open-dropdown' : 'close-dropdown'}`}
                                    ref={this.setWrapperRef}
                                >
                                    {this.state.userApiData ? this.state.userApiData.map((uData, index) =>
                                        <StyledMenuItem className="customized-ticket-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-ticket-one-tckt-typ d-flex">
                                                <div className="create-ticket-tckt-img-text d-flex">
                                                    <p>{uData.firstName}</p>
                                                </div>

                                                <div className="create-ticket-src-radio">
                                                    <Radio
                                                        checked={uData.id == this.state.contactName}
                                                        value={uData.id}
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        onChange={(e) => this.handleChangeContact(e, uData)}
                                                    />
                                                </div>
                                            </div>

                                        </StyledMenuItem>
                                    ) : null}

                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ border: '0.05rem solid #d6d5d5', margin: '5% 4% 1%' }}></div>
                    <div className="edit-tkt-footer">
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
                                onClick={(e) => this.handleUpdateTicket(e)}
                            >
                                Update
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    render() {
        return (
            <div className="edit-main-container">
                <Drawer
                    anchor="right"
                    open={this.props.isEditDrawerOpen}
                    onClose={this.toggleDrawer('right', false)}
                    className="tckt-lst-edit-drawer"
                >
                    <div className="editdrawer d-flex">
                        <div className="drawer-full-width" onClick={this.closeEditDrawerHandler}></div>
                        {this.editSidePanel("right")}
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default EditTicket;