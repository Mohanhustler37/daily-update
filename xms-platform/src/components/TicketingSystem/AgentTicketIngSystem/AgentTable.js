import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ThreeDots from "../../../assets/icons/SVG/Iconawesome-ellipsis-v.svg";
import "./AgentTable.scss";
// import "./agentTicketEdit.scss";
import axios from "axios";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { InMemoryCache } from 'apollo-cache-inmemory';
import TicketEditIcon from "../../../assets/icons/SVG/Iconfeather-edit-3.svg";
import AssignToImage from "../../../assets/images/profile.png";
import { baseUrl } from "../../../constants";
import useStyles from './agentStyles.js';
import Drawer from "@material-ui/core/Drawer";
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';
import more from "../../../assets/icons/SVG/Iconawesome-ellipsis-v.svg";
import FormControl from '@material-ui/core/FormControl';
import Appbar from "../../Appbar/Appbar";

const cache = new InMemoryCache();

const client = new ApolloClient({
    cache,
    uri: baseUrl.server,
});



function createData(name, TicketNO, CUSTOMER, SUBJECT, STATUS, TAGS, PRIORITY, TYPE, ASSIGNTO, RESPONSE) {
    return { name, TicketNO, CUSTOMER, SUBJECT, STATUS, TAGS, PRIORITY, TYPE, ASSIGNTO, RESPONSE };
}

// API CODE STARTS

const ASSIGN_TO_AGENT = gql`
mutation UpdateStatus($id:Int!,$agentId: Int!) {
    assignTicketByManager(id:$id,assigned_to_agent_id: $agentId) {
    id,
    name,
    ticket_description,
    status_id
    assigned_to_agent_id
  }
}
`;

// API CODE ENDS

const rows = [
    createData('', 'AL#082B190', 'Code Matrix', 'Need one more licensing', 'Open', '', 'Critical'),
    createData('', 'AL#082B191', 'Code Matrix', 'Need one more licensing', 'In Progress', '', 'High'),
    createData('', 'AL#082B192', 'Code Matrix', 'Need one more licensing', 'Open', '', 'Critical'),
    createData('', 'AL#082B193', 'Code Matrix', 'Need one more licensing', 'Open', '', 'Low'),
    createData('', 'AL#082B194', 'Code Matrix', 'Need one more licensing', 'Resolved', '', 'High'),
    createData('', 'AL#082B195', 'Code Matrix', 'Need one more licensing', 'Open', '', 'Low'),
    createData('', 'AL#082B196', 'Code Matrix', 'Need one more licensing', 'Open', '', 'Critical'),
    createData('', 'AL#082B197', 'Code Matrix', 'Need one more licensing', 'Open', '', 'Low'),
    createData('', 'AL#082B198', 'Code Matrix', 'Need one more licensing', 'Open', '', 'Critical'),
    createData('', 'AL#082B199', 'Code Matrix', 'Need one more licensing', 'Open', '', 'High'),
    createData('', 'AL#082B190', 'Code Matrix', 'Need one more licensing', 'Open', '', 'Low'),
    createData('', 'AL#082B190', 'Code Matrix', 'Need one more licensing', 'Open', '', 'Critical'),
    createData('', 'AL#082B190', 'Code Matrix', 'Need one more licensing', 'Open', '', 'Low'),
];

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead id="ticket-table-header">
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox />
                </TableCell>

                <TableCell align="right">
                    TICKET NO.
                                </TableCell>
                <TableCell align="right">
                    CUSTOMER
                                </TableCell>
                <TableCell align="right">
                    SUBJECT
                                </TableCell>
                <TableCell align="right">
                    STATUS
                </TableCell>
                <TableCell align="right">
                    TAGS
                </TableCell>
                <TableCell align="right">
                    PRIORITY
                </TableCell>
                <TableCell align="right">
                    TYPE
                </TableCell>
                <TableCell align="right">
                    ASSIGNTO
                </TableCell>
                <TableCell align="right">
                    RESPONSE
                </TableCell>
                <TableCell
                    style={{ textAlign: 'left' }}
                >
                    <div className="ticket-table-edit-icon">
                        <img src={TicketEditIcon} alt=""></img>
                    </div>

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
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
}));

export default function EnhancedTable(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('Ticket NO');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [state, setState] = React.useState({right: false });
    const [recordData, setRecordData] = React.useState();
    const [isShowPopup, setShowPopup] = React.useState(false)
    const [popupId, updatePopupId] = React.useState(null)

    const [mutate] = useMutation(
        ASSIGN_TO_AGENT,
        {
            variables: { agentId: 3, id: 24 },
        }
    )

    const inputLabel = React.useRef(null);

    const [name, setName] = React.useState();
    const [ticket_description, setTextArea] = React.useState();
    const [company, setCompanyState] = React.useState({ companyName: '' });
    const [status, setStatusState] = React.useState({ statusName: '' });
    const [priority, setPriorityState] = React.useState({ priorityName: '' });
    const [tags, setTagsState] = React.useState({ tagsName: [] });
    const [ticketType, setTicketTypeState] = React.useState({ ticketTypeName: '' });
    const [manager, setManagerState] = React.useState({ managerName: '' });
    const [assignedTo, setAssignedToState] = React.useState({ assignedToName: '' });
    const [department, setDepartmentState] = React.useState({ departmentName: '' });
    const [team, setTeamState] = React.useState({ teamName: '' });
    const [project, setProjectState] = React.useState({ projectName: '' });
    const [contact, setContactState] = React.useState({ contactName: '' });

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClickNew = () => {
        setOpen(prev => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const isSelected = name => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const statusChange = (statusId) => {
    }

    const [age, setAge] = React.useState('');
    const handleChange = event => {
        setAge(event.target.value);
    };

    const toggleDrawer = (side, open, ticket) => event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" && event.key === "Shift")
        ) {
            return;
        }
        setState({ ...state, [side]: open });
        setRecordData({ recordData: ticket })
    };
    const handleChangeCompany = companyName => event => {
        setCompanyState({ ...company, [companyName]: event.target.value, });
    }
    const handleChangeStatus = statusName => event => {
        setStatusState({ ...status, [statusName]: event.target.value, });
    }
    const handleChangePriority = priorityName => event => {
        setPriorityState({ ...priority, [priorityName]: event.target.value, });
    }
    const handleChangeTags = tagsName => event => {
        setTagsState({ ...tags, [tagsName]: event.target.value, });
    }
    const handleChangeTicketType = ticketTypeName => event => {
        setTicketTypeState({ ...ticketType, [ticketTypeName]: event.target.value, });
    }
    const handleChangeManager = managerName => event => {
        setManagerState({ ...manager, [managerName]: event.target.value, });
    }
    const handleChangeAssignedTo = assignedToName => event => {
        setAssignedToState({ ...assignedTo, [assignedToName]: event.target.value, });
    }
    const handleChangeDepartment = departmentName => event => {
        setDepartmentState({ ...department, [departmentName]: event.target.value, });
    }
    const handleChangeTeam = teamName => event => {
        setTeamState({ ...team, [teamName]: event.target.value, });
    }
    const handleChangeContact = contactName => event => {
        setContactState({ ...contact, [contactName]: event.target.value, });
    }
    const handleChangeProject = projectName => event => {
        setProjectState({ ...project, [projectName]: event.target.value, });
    }
    const handleChangeText = event => {
        setName({ name: event.target.value });
    };

    const handleChangeTextarea = event => {
        setTextArea({ ticket_description: event.target.value });
    };
    const updateTicket = async (e) => {
        let requestBody = {
            query: `
              mutation UpdateTicket(
                  $name: String, $ticket_description: String,$id:Int!,$company:Int!,$status:Int,$priority:Int,$tags:JSON,
                  $ticketType:String!,$manager:Int!,$assignedTo:Int!,$department:Int!,$team:Int!,$project:Int!,
                ) {
                updateTicket(
                    name: $name, ticket_description: $ticket_description,id:$id,company_id:$company,status_id:$status,priority_id:$priority,
                    tags:$tags,ticket_type:$ticketType,manager_id:$manager,assigned_to_agent_id:$assignedTo,department_id:$department,
                    team_id:$team,project_id:$project,
                ) {
                  id
                  name
                  ticket_description
                  user_id
                  ticket_type
                  priority_id
                  user_roll_id
                }
              }
            `,
            variables: {
                id: recordData.recordData.id,
                name: name && name.name ? name.name : recordData.recordData.name,
                ticket_description: ticket_description && ticket_description.ticket_description != null
                    && ticket_description.ticket_description == undefined ?
                    ticket_description.ticket_description : recordData.recordData.ticket_description,
                company: Number(company && company.companyName != null && company.companyName != undefined ?
                    company.companyName : recordData.recordData.company_id),
                status: Number(status && status.statusName != null && status.statusName != undefined ?
                    status.statusName : recordData.recordData.status_id),
                priority: Number(priority && priority.priorityName != null && priority.priorityName != undefined ?
                    priority.priorityName : recordData.recordData.priority_id),
                tags: tags && tags.tagsName != null && tags.tagsName != undefined ?
                    tags.tagsName : recordData.recordData.tags,
                ticketType: ticketType && ticketType.ticketTypeName != null && ticketType.ticketTypeName != undefined ?
                    ticketType.ticketTypeName : recordData.recordData.ticket_type,
                manager: Number(manager && manager.managerName != null && manager.managerName != undefined ?
                    manager.managerName : recordData.recordData.manager_id),
                assignedTo: Number(assignedTo && assignedTo.assignedToName != null && assignedTo.assignedToName != undefined ?
                    assignedTo.assignedToName : recordData.recordData.assigned_to_agent_id),
                department: Number(department && department.departmentName != null && department.departmentName != undefined ?
                    department.departmentName : recordData.recordData.department_id),
                team: Number(team && team.teamName != null && team.teamName != undefined ? team.teamName : recordData.recordData.team_id),
                project: Number(project && project.projectName != null && project.projectName != undefined ?
                    project.projectName : project.project_id),
                // contact: contact.contactName
            }
        };

        let resData = await axios({
            method: 'post',
            url: baseUrl.server,
            data: requestBody,
        }).then(res => {
            return res
        }).catch(err => {
            return err;
        });
        if (resData.status == 200) {
            setState({ ...state, ['right']: false });
            // window.location.href = '/ticketlisting';
        } else {
            // window.location.href = '/createticket';
        }
    }
    const showTicketListPopup = (index) => {
        setShowPopup(!isShowPopup)
        updatePopupId(index)
    }
    const editSidePanel = (side, ticket, index) => (
        <div
            className={classes.list}
            role="presentation"
        >
            <div className="edit-sidebar-container">
                <div className="edit-sidebar-header">
                    <div className="edit-heading">
                        EDIT TICKET <span>({recordData && recordData.recordData ? recordData.recordData.id : ''})</span>
                    </div>
                    <div
                        className="cancel-x"
                        onClick={toggleDrawer(side, false)}
                        onKeyDown={toggleDrawer(side, false)}
                    >X</div>
                </div>
                <div>
                    <div className="create-ticket-body-input-base-two">
                        <div className="ticket-type-container">
                            <FormControl>
                                <InputLabel htmlFor="demo-controlled-open-select">Company</InputLabel>
                                <div className="edit-ticket-menu-item">
                                    <Select
                                        // value={recordData && recordData.recordData? recordData.recordData.company:''}
                                        value={company.companyName}
                                        onChange={handleChangeCompany('companyName')}
                                        disableUnderline
                                        inputProps={{
                                            companyName: 'companyName',
                                            id: 'age-native-simple',
                                        }}
                                    >
                                        <MenuItem value="1">Code Matrix</MenuItem>
                                        <MenuItem value="2">Service Request</MenuItem>
                                        <MenuItem value="3">Incident</MenuItem>
                                        <MenuItem value="4">Problem</MenuItem>
                                    </Select>
                                </div>
                            </FormControl>
                        </div>
                        <div className="ticket-title-container">
                            <TextField
                                label="SUBJECT"
                                id="margin-none"
                                variant="outlined"
                                placeholder={recordData && recordData.recordData ? recordData.recordData.name : ''}
                                className={classes.textField}
                                // name=''
                                defaultValue={recordData && recordData.recordData ? recordData.recordData.name : ''}
                                onChange={(e) => handleChangeText(e)}
                            />

                        </div>
                    </div>
                    <div className="create-ticket-body-input-base-two">
                        <div className="ticket-type-container">
                            <FormControl>
                                <InputLabel htmlFor="demo-controlled-open-select">Status</InputLabel>
                                <div className="edit-ticket-menu-item">
                                    <Select
                                        // value={recordData && recordData.recordData? recordData.recordData.company:''}
                                        value={status.statusName}
                                        onChange={handleChangeStatus('statusName')}
                                        disableUnderline
                                        inputProps={{
                                            companyName: 'statusName',
                                            id: 'age-native-simple',
                                        }}
                                    >
                                        <MenuItem value="1">Open</MenuItem>
                                        <MenuItem value="2">New</MenuItem>
                                        <MenuItem value="3">Inprogress</MenuItem>
                                        <MenuItem value="4">Resolved</MenuItem>
                                        <MenuItem value="4">Reopen</MenuItem>
                                    </Select>
                                </div>
                            </FormControl>
                        </div>
                        <div className="ticket-type-container">
                            <FormControl>
                                <InputLabel htmlFor="demo-controlled-open-select">Priority</InputLabel>
                                <div className="edit-ticket-menu-item">
                                    <Select
                                        // value={recordData && recordData.recordData? recordData.recordData.company:''}
                                        value={priority.priorityName}
                                        onChange={handleChangePriority('priorityName')}
                                        disableUnderline
                                        inputProps={{
                                            companyName: 'priorityName',
                                            id: 'age-native-simple',
                                        }}
                                    >
                                        <MenuItem value="1">Critical</MenuItem>
                                        <MenuItem value="2">High</MenuItem>
                                        <MenuItem value="3">Low</MenuItem>
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
                            rows={3} placeholder="Ticket description"
                            onChange={(e) => handleChangeTextarea(e)}
                        >
                            {recordData && recordData.recordData ? recordData.recordData.ticket_description : ''}
                        </TextareaAutosize>
                    </div>
                    <div className="create-ticket-body-input-base-two">
                        <div className="ticket-type-container">
                            <FormControl>
                                <InputLabel htmlFor="demo-controlled-open-select">Tags</InputLabel>
                                <div className="edit-ticket-menu-item">
                                    <Select
                                        multiple
                                        // value={recordData && recordData.recordData? recordData.recordData.company:''}
                                        value={tags.tagsName}
                                        onChange={handleChangeTags('tagsName')}
                                        disableUnderline
                                        inputProps={{
                                            companyName: 'tagsName',
                                            id: 'age-native-simple',
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
                                <InputLabel htmlFor="demo-controlled-open-select">Type</InputLabel>
                                <div className="edit-ticket-menu-item">
                                    <Select
                                        // value={recordData && recordData.recordData? recordData.recordData.company:''}
                                        value={ticketType.ticketTypeName}
                                        onChange={handleChangeTicketType('ticketTypeName')}
                                        disableUnderline
                                        inputProps={{
                                            companyName: 'ticketTypeName',
                                            id: 'age-native-simple',
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
                                <InputLabel htmlFor="demo-controlled-open-select">Manager</InputLabel>
                                <div className="edit-ticket-menu-item">
                                    <Select
                                        // value={recordData && recordData.recordData? recordData.recordData.company:''}
                                        value={manager.managerName}
                                        onChange={handleChangeManager('managerName')}
                                        disableUnderline
                                        inputProps={{
                                            companyName: 'managerName',
                                            id: 'age-native-simple',
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
                                <InputLabel htmlFor="demo-controlled-open-select">Assigned To</InputLabel>
                                <div className="edit-ticket-menu-item">
                                    <Select
                                        // value={recordData && recordData.recordData? recordData.recordData.company:''}
                                        value={assignedTo.assignedToName}
                                        onChange={handleChangeAssignedTo('assignedToName')}
                                        disableUnderline
                                        inputProps={{
                                            companyName: 'assignedToName',
                                            id: 'age-native-simple',
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
                                <InputLabel htmlFor="demo-controlled-open-select">Department</InputLabel>
                                <div className="edit-ticket-menu-item">
                                    <Select
                                        // value={recordData && recordData.recordData? recordData.recordData.company:''}
                                        value={department.departmentName}
                                        onChange={handleChangeDepartment('departmentName')}
                                        disableUnderline
                                        inputProps={{
                                            companyName: 'departmentName',
                                            id: 'age-native-simple',
                                        }}
                                    >
                                        <MenuItem value="1">Product Development</MenuItem>
                                        <MenuItem value="2">Product</MenuItem>
                                    </Select>
                                </div>
                            </FormControl>
                        </div>
                        <div className="ticket-type-container">
                            <FormControl>
                                <InputLabel htmlFor="demo-controlled-open-select">Team</InputLabel>
                                <div className="edit-ticket-menu-item">
                                    <Select
                                        // value={recordData && recordData.recordData? recordData.recordData.company:''}
                                        value={team.teamName}
                                        onChange={handleChangeTeam('teamName')}
                                        disableUnderline
                                        inputProps={{
                                            companyName: 'teamName',
                                            id: 'age-native-simple',
                                        }}
                                    >
                                        <MenuItem value="1">Product Team</MenuItem>
                                        <MenuItem value="2">Product</MenuItem>
                                    </Select>
                                </div>
                            </FormControl>
                        </div>
                    </div>
                    <div className="create-ticket-body-input-base-two">
                        <div className="ticket-type-container">
                            <FormControl>
                                <InputLabel htmlFor="demo-controlled-open-select">Project</InputLabel>
                                <div className="edit-ticket-menu-item">
                                    <Select
                                        // value={recordData && recordData.recordData? recordData.recordData.company:''}
                                        value={project.projectName}
                                        onChange={handleChangeProject('projectName')}
                                        disableUnderline
                                        inputProps={{
                                            companyName: 'projectName',
                                            id: 'age-native-simple',
                                        }}
                                    >
                                        <MenuItem value="1">Matrix1</MenuItem>
                                        <MenuItem value="2">Matrix2</MenuItem>
                                    </Select>
                                </div>
                            </FormControl>
                        </div>
                        <div className="ticket-type-container">
                            <FormControl>
                                <InputLabel htmlFor="demo-controlled-open-select">Contact</InputLabel>
                                <div className="edit-ticket-menu-item">
                                    <Select
                                        // value={recordData && recordData.recordData? recordData.recordData.company:''}
                                        value={contact.contactName}
                                        onChange={handleChangeContact('contactName')}
                                        disableUnderline
                                        inputProps={{
                                            companyName: 'contactName',
                                            id: 'age-native-simple',
                                        }}
                                    >
                                        <MenuItem value="1">Ryan Pazos</MenuItem>
                                        <MenuItem value="2">Mohan Raj</MenuItem>
                                    </Select>
                                </div>
                            </FormControl>
                        </div>
                    </div>
                    <div style={{ border: '0.05rem solid #d6d5d5', margin: '2%' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <Button
                                variant="outlined"
                                className="cancel-button"
                                onClick={toggleDrawer(side, false)}
                                onKeyDown={toggleDrawer(side, false)}
                            >
                                cancel
                            </Button>
                        </div>
                        <div>
                            <Button
                                size="large"
                                className="update-button"
                                onClick={(e) => updateTicket(e)}
                            >
                                Update
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
    return (
        <div className={classes.root} id="table-header-text">
            <Paper className={classes.paper}>
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>

                            {/* Dynamic Table data starts */}

                            {/* {
                                stableSort(dataToTable, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        console.log(row);
                                    })
                            } */}

                            {/* {data && data.getTicketByAgent != null && data.getTicketByAgent != undefined ?
                                data.getTicketByAgent.map((ticket, index) => {

                                } */}

                            {props.tableData && props.tableData != null && props.tableData != undefined ?
                                props.tableData.map((ticket, index) => {

                                    return <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={index}
                                    >

                                        <TableCell padding="checkbox">
                                            <Checkbox />
                                        </TableCell>

                                        <TableCell align="right">
                                            {ticket.id}
                                        </TableCell>
                                        <TableCell align="right">
                                            Code Matrix
                                        </TableCell>
                                        <TableCell align="right" className="need-one-more-body">
                                            {ticket.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            <div className="dropdown-toggle" data-toggle="dropdown">
                                                {
                                                    ticket.status_id == 1 ? 'New' : '' ||
                                                        ticket.status_id == 2 ? 'Open' : '' ||
                                                            ticket.status_id == 3 ? 'In Progress' : '' ||
                                                                ticket.status_id == 4 ? 'Resolved' : '' ||
                                                                    ticket.status_id == 5 ? 'Reopen' : ''
                                                }
                                            </div>
                                            <div className="dropdown-menu">
                                                <span className="dropdown-item" onClick={() => statusChange(2)}>Open</span>
                                                <span className="dropdown-item" onClick={() => statusChange(3)}>Inprogress</span>
                                                <span className="dropdown-item " onClick={() => statusChange(4)}>Resolved</span>
                                                <span className="dropdown-item " onClick={() => statusChange(5)}>Reopen</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right" className="tags-body">
                                            <div className="tags-container">
                                                <div className="tags-container-value-one">
                                                    <div className="risk-container">Risk</div>
                                                    <div className="critical-customer-container">Critical Customer</div>
                                                </div>
                                                <div className="tags-container-value-two">
                                                    <div className="phase-container">Phase1</div>
                                                    <div className="technical-container">Technical</div>
                                                    <div className="add-container">
                                                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                                    </div>
                                                </div>

                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            <i className="fa fa-circle" style={{ color: '#EA5455' }}></i>&nbsp;
                                            Critical
                                        </TableCell>
                                        <TableCell align="right" className="button-in-ticket-table">
                                            <Button
                                                size="large"
                                                style={{
                                                    backgroundColor: '#7AC9FF',
                                                    fontSize: '8px',
                                                    color: '#fff'
                                                }}
                                                className={classes.btnClr}
                                            >
                                                Service Request
                                        </Button>
                                        </TableCell>
                                        <TableCell align="right">
                                            <img src={AssignToImage} className="assign-to-image-icon"></img>Sugata Maji
                                        </TableCell>
                                        <TableCell align="right" className="ticket-table-response-time">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                style={{
                                                    border: '1px solid #2DCD7A',
                                                }}
                                                className={classes.btnClr}
                                            >
                                                <i className="fa fa-clock-o" style={{ color: '#2DCD7A' }}></i>&nbsp; 15.59
                                        </Button>
                                        </TableCell>
                                        <TableCell
                                            style={{ textAlign: 'center', cursor: 'pointer' }}
                                        >

                                            <Fab className='ticket-list-click-menu' size="small"
                                                aria-label="add" onClick={() => showTicketListPopup(index)}
                                            >
                                                <img src={ThreeDots} alt=""
                                                    onClick={'mutate'}
                                                />
                                                {
                                                    popupId === index && isShowPopup ? (
                                                        <div className='ticket-list-popup'>
                                                            <ul>
                                                                <li>
                                                                    <i class="fa fa-eye" aria-hidden="true"></i>
                                                                    <span>View details</span>
                                                                </li>
                                                                <li onClick={toggleDrawer("right", true, ticket)}>
                                                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                    <span>Edit ticket</span>
                                                                </li>
                                                                <li>
                                                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                    <span>Assign / Transfer</span>
                                                                </li>
                                                                <li>
                                                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                    <span>Bulk update</span>
                                                                </li>
                                                                <li>
                                                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                    <span>Merge</span>
                                                                </li>
                                                                <li>
                                                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                    <span>Forward</span>
                                                                </li>
                                                                <li>
                                                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                    <span>Close</span>
                                                                </li>
                                                                <li>
                                                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                    <span>Duplicate</span>
                                                                </li>
                                                                <li>
                                                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                    <span>Delete</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    ) : null
                                                }
                                            </Fab>
                                        </TableCell>
                                    </TableRow>
                                }) : ''
                            }

                        </TableBody>
                    </Table>
                    <Drawer
                        anchor="right"
                        open={state.right}
                        onClose={toggleDrawer("right", false)}
                    >
                        {editSidePanel("right")}
                    </Drawer>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
