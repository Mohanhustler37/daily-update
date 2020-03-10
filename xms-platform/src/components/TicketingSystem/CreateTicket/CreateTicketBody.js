import React, { Component } from "react";
import "./CreateTicketBody.scss";
import InputBase from '@material-ui/core/InputBase';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import BookIcon from "../../../assets/icons/LoginAndRegistration_icons/Icon feather-bookmark.svg";
import DisabledDropdown from "../../../assets/icons/LoginAndRegistration_icons/Icon-ionic-md-arrow-dropdown.svg";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Checkbox from '@material-ui/core/Checkbox';
import CompanyLogo from "../../../assets/icons/01-10-2019/company-logo.svg";
import CompanyEditIcon from "../../../assets/icons/SVG/Iconfeather-edit-3.svg";
import RequestorProfile from "../../../assets/images/profile.png";
import RequestorDropDown from "../../../assets/icons/LoginAndRegistration_icons/Icon-ionic-md-arrow-dropdown.svg";
import KnowledgeIcon from "../../../assets/icons/SVG/Iconfeather-calendar.svg";
import Button from '@material-ui/core/Button';
import AttachmentAddIcon from "../../../assets/icons/01-10-2019/Icon feather-plus-circle.svg";
import AntSwitch from "./AntSwitch";
import Input from '@material-ui/core/Input';
import axios from "axios";
import { baseUrl } from "../../../constants";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import gql from "graphql-tag";
import EditCompanyDetails from '../CreateTicket/EditCompanyDetails/EditCompanyDetails';

const getProjects = gql`
    query GetProjectByUserId($userId:Int!)
    {
        getProjectByUserId(tenantId:$userId){
            id,
            projectName
        }
    }
`;

const getProjectsData = (client, userId, callback) => {
    client
        .query({
            query:
                getProjects, variables: { userId: userId }
        })
        .then(res => {
            callback(res)
        })
}

class CreateTicketBody extends Component {
    constructor(props) {
        super()
        this.state = {
            switchOnOff: false,
            chooseTemplate: '',
            name: '',
            ticket_type: '',
            ticket_description: '',
            priority: '',
            tags: [],
            attachment: '',
            notify_others: '',
            user_id: 1,
            team_id: 1,
            email: '',
            popen: false,
            eopen: false,
            topen: false,
            taopen: false,
            email: '',
            projects: [],
            projectData: '',
            isEditCompDtlsOpen: false,
            dummYData: [
                {
                    id: 1,
                    projectName: "xms1"
                },
                {
                    id: 2,
                    projectName: "xms2"
                },
                {
                    id: 3,
                    projectName: "xms3"
                }
            ]
        }
    }

    componentDidMount() {
        let client = this.props.client;
        getProjectsData(
            client, 1, projectData => {
                this.setState({ projectData: projectData });
            }
        );
    }
    openEditCompDtlsOpen=()=> this.setState({ isEditCompDtlsOpen: true })
    submitHandler = async (e) => {
        e.preventDefault();

        let requestBody = {
            query: `
              mutation AddTicket(
                  $name: String!,$ticket_type:String!, $ticket_description: String!,$user_id:Int!,
                  $priority_id:Int!,$team_id:Int!,$tags:JSON!
                ) 
                {
                    addTicket(
                        name: $name, ticketDescription: $ticket_description,
                        ticketType:$ticket_type,userId:$user_id,
                        priorityId:$priority_id,teamId:$team_id,
                        tags:$tags
                    ) 
                    {
                        id
                        name
                        ticketDescription
                        userId
                        ticketType
                        priorityId
                        teamId
                    }
                }
            `,
            variables: {
                name: this.state.name,
                ticket_type: this.state.ticket_type,
                ticket_description: this.state.ticket_description,
                priority_id: Number(this.state.priority),
                user_id: this.state.user_id,
                team_id: Number(this.state.team_id),
                tags: this.state.tags,
                // ticket_supportive: this.state.attachment,
                // notify_others: notify_others
            }
        };

        let resData = await axios({
            method: 'post',
            url: baseUrl.server,
            data: requestBody,
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => {
            return res
        }).catch(err => {
            return err;
        });

        if (resData.status == 200) {
            window.location.href = '/ticketlisting';
        } else {
            window.location.href = '/createticket';
        }
    }

    handleSwitchChange = () => {
        this.setState({ switchOnOff: !this.state.switchOnOff })
    }

    handleChange = event => {
        this.setState({ priority: event.target.value });
    };

    handlePriority = () => {
        this.setState({ popen: !this.state.popen });
    };

    handleEmail = () => {
        this.setState({ eopen: !this.state.eopen });
    };

    handleTicketType = () => {
        this.setState({ topen: !this.state.topen });
    };

    handleTags = () => {
        this.setState({ taopen: !this.state.taopen });
    };

    handleMultiChange = event => {
        this.setState({ tags: event.target.value });
    };
    handleMultiChangeProject = event => {
        this.setState({ projects: event.target.value });
    };

    render() {
        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        };
        console.log("PROJECT DATA",this.state.projectData);
        return (
            <div className="create-ticket-body-container" >
                {<EditCompanyDetails isEditCompDtlsOpen={this.state.isEditCompDtlsOpen} thisObj={this}/>}
                <div className="create-ticket-body-left">
                    <div className="create-ticket-body-input-base">
                        <div className="create-ticket-using-template">
                            <img src={BookIcon}></img>
                            <p>Create ticket using template</p>
                            <AntSwitch
                                onClick={this.handleSwitchChange}
                                value="checkedC"
                            />
                        </div>
                        <div className="choose-template">
                            <FormControl>
                                <InputLabel htmlFor="demo-controlled-open-select">Choose Template</InputLabel>
                                <div className="create-ticket-menu-item">
                                    <Select
                                        open={this.state.open}
                                        onClose={this.handleOpenClose}
                                        onOpen={this.handleOpenClose}
                                        value={this.state.chooseTemplate}
                                        onChange={e => this.setState({ chooseTemplate: e.target.value })}
                                        disabled={!this.state.switchOnOff}
                                    >
                                        <MenuItem value="1">Low</MenuItem>
                                        <MenuItem value="2">Medium</MenuItem>
                                        <MenuItem value="3">High</MenuItem>
                                    </Select>
                                </div>
                            </FormControl>
                        </div>
                    </div>
                    <div className="break-in-create-ticket">
                        <div className="create-ticket-bottom-line"></div>Create new from scratch<div className="create-ticket-bottom-line1"></div>
                    </div>
                    <div className="create-ticket-body-input-base-two">
                        <div className="ticket-title-container">
                            <InputBase
                                placeholder="Ticket Title"
                                className="ticket-title"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={e => this.setState({ name: e.target.value })}
                            />
                        </div>
                        <div className="ticket-type-container">
                            <FormControl>
                                <InputLabel htmlFor="demo-controlled-open-select">Ticket Type</InputLabel>
                                <div className="create-ticket-menu-item">
                                    <Select
                                        open={this.state.topen}
                                        onClose={this.handleTicketType}
                                        onOpen={this.handleTicketType}
                                        value={this.state.ticket_type}
                                        onChange={e => this.setState({ ticket_type: e.target.value })}
                                    >
                                        <MenuItem value="1">Service Request</MenuItem>
                                        <MenuItem value="2">Incident</MenuItem>
                                        <MenuItem value="3">Problem</MenuItem>
                                    </Select>
                                </div>
                            </FormControl>

                        </div>
                    </div>

                    <div className="create-ticket-text-area">
                        <TextareaAutosize
                            aria-label="minimum height"
                            rows={3} placeholder="Ticket description"
                            onChange={e => this.setState({ ticket_description: e.target.value })}
                        />
                    </div>

                    <div className="create-ticket-body-input-base-three">
                        <div className="priority-container">

                            <FormControl>
                                <InputLabel htmlFor="demo-controlled-open-select">Priority</InputLabel>
                                <div className="create-ticket-menu-item">
                                    <Select
                                        open={this.state.open}
                                        onClose={this.handleOpenClose}
                                        onOpen={this.handleOpenClose}
                                        value={this.state.priority}
                                        onChange={e => this.setState({ priority: e.target.value })}
                                    >
                                        <MenuItem value="1">Low</MenuItem>
                                        <MenuItem value="2">Medium</MenuItem>
                                        <MenuItem value="3">High</MenuItem>
                                    </Select>
                                </div>
                            </FormControl>

                        </div>
                        <div className="priority-container">
                            <FormControl>
                                <InputLabel htmlFor="select-multiple">Tags</InputLabel>
                                <div className="create-ticket-menu-item">
                                    <Select
                                        multiple
                                        value={this.state.tags}
                                        onChange={this.handleMultiChange}
                                        input={<Input id="select-multiple" />}
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem value="1">Risk</MenuItem>
                                        <MenuItem value="2">Critical Customer</MenuItem>
                                        <MenuItem value="3">Phase1</MenuItem>
                                        <MenuItem value="4">Technical</MenuItem>
                                    </Select>
                                </div>
                            </FormControl>
                        </div>
                    </div>

                    <div className="attachment-container">
                        <p>ATTACHMENTS</p>
                        <div className="custom-file-upload">
                            <Button>
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    id="inputGroupFile01"
                                />
                            </Button>
                            <div className="custom-file-label-upload-image-icon">
                                <img src={AttachmentAddIcon}></img>
                                <p className="custom-file-label-upload-text-one">Drag attach file.</p>
                                <p className="custom-file-label-upload-text-two">or <span>browse</span></p>
                            </div>

                            <label className="custom-file-label-upload" htmlFor="inputGroupFile01">

                            </label>
                        </div>
                    </div>
                    <div className="create-ticket-email-section">
                        <div className="email-section-check-box">
                            <Checkbox
                                value="checkedB"
                                color="primary"
                            />
                            <span>Send a copy</span>
                        </div>

                        <InputBase
                            placeholder="Enter email"
                            className="email-section"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className="break-for-submit-section"></div>
                    <div className="save-template-submit-section">
                        <div className="save-template-submit-section-button-one">
                            <Button variant="outlined"
                                color="primary" className=""
                                
                            >
                                Save Template
                            </Button>
                        </div>
                        <div className="save-template-submit-section-button-two">
                            <Button variant="outlined" color="primary" className=""
                                onClick={this.submitHandler}
                            >
                                Submit
                            </Button>
                        </div>

                    </div>
                </div>

                <div className="create-ticket-body-right">
                    <div className="create-ticket-company-details">
                        <div className="create-ticket-company-description">
                            <img src={CompanyLogo}></img>
                            <div className="create-ticket-company-text">
                                <p className="create-ticket-company-text-one" >Company name</p>
                                <p className="create-ticket-company-text-two">short description</p>
                            </div>
                            <div className="create-ticket-company-details-edit">
                                <img src={CompanyEditIcon} onClick={this.openEditCompDtlsOpen}></img>
                            </div>
                        </div>
                        <div className="department-and-team-name">
                            <p>Department Name</p>
                            <p className="team-name">Team Name</p>
                        </div>
                        <p className="project-name">Project name</p>
                        {/* <div className="requestor-container">
                            <img src={RequestorProfile}></img>
                            <div className="requestor-text">
                                <p className="requestor-text-one">Requestor</p>
                                <p>Sugatha Maji</p>
                            </div>
                            <div className="requestor-drop-down">
                                <img src={RequestorDropDown}></img>
                            </div>
                        </div> */}
                        <div className="priority-container" style={{ width: '100%' }}>
                            <FormControl>
                                <InputLabel htmlFor="select-multiple">Projects</InputLabel>
                                <div className="create-ticket-menu-item">
                                    <Select
                                        multiple
                                        value={this.state.projects}
                                        onChange={this.handleMultiChangeProject}
                                        input={<Input id="select-multiple" />}
                                        MenuProps={MenuProps}
                                    >
                                        {
                                           this.state.projectData &&
                                            this.state.projectData != '' &&
                                             this.state.projectData != null &&
                                                this.state.projectData != undefined ?
                                                this.state.projectData.data.getProjectByUserId.map(data => {
                                                    return <MenuItem value={data.id}>
                                                        {data.projectName}
                                                    </MenuItem>
                                                }) : ''
                                        }
                                    </Select>
                                </div>
                            </FormControl>
                        </div>
                    </div>
                    <div className="assign-to-container">
                        <img src={RequestorProfile}></img>
                        <div className="assign-text">
                            <p className="assign-text-one">Assign To</p>
                            <p>John Doe</p>
                        </div>
                        <div className="assign-drop-down">
                            <img src={RequestorDropDown}></img>
                        </div>
                    </div>
                    <div className="web-container">
                        <img src={RequestorProfile}></img>
                        <div className="web-text">
                            <p className="web-text-one">Source</p>
                            <p>Web App</p>
                        </div>
                        <div className="web-drop-down">
                            <img src={RequestorDropDown}></img>
                        </div>
                    </div>
                    <div className="knowledge-container">
                        <div className="knowledge-base">
                            <img src={KnowledgeIcon} alt="knowledge"></img>
                            <p>KNOWLEDGE BASE</p>
                        </div>
                        <div className="knowledge-questions">
                            <div className="knowledge-value"><p>01</p></div>
                            <div className="knowledge-text">
                                <p>How to create a new project for </p>
                                <p className="knowledge-text-next">implementation?</p>
                            </div>
                        </div>
                        <div className="knowledge-questions">
                            <div className="knowledge-value"><p>02</p></div>
                            <div className="knowledge-text">
                                <p>How to invite a new user for support</p>
                                <p className="knowledge-text-next">management tool?</p>
                            </div>
                        </div>
                        <div className="knowledge-questions">
                            <div className="knowledge-value"><p>03</p></div>
                            <div className="knowledge-text">
                                <p>How to create a new project for </p>
                                <p className="knowledge-text-next">implementation?</p>
                            </div>
                        </div>
                        <div className="knowledge-questions">
                            <div className="knowledge-value"><p>04</p></div>
                            <div className="knowledge-text">
                                <p>How to invite a new user for support </p>
                                <p className="knowledge-text-next">management tool?</p>
                            </div>
                        </div>
                        <div className="knowledge-questions">
                            <div className="knowledge-value"><p>03</p></div>
                            <div className="knowledge-text">
                                <p>How to create a new project for </p>
                                <p className="knowledge-text-next">implementation?</p>
                            </div>
                        </div>
                        <div className="sell-All">
                            <p>See All</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CreateTicketBody;
