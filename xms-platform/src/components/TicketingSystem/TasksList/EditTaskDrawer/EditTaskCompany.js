import React from 'react';
import './EditTaskCompany.scss';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import axios from "axios";
import { baseUrl } from "../../../../constants";

import companyIcon from '../../../../assets/editCompanyDrawer/fav-icon-white.svg'
import departmentIcon from '../../../../assets/editCompanyDrawer/Icon awesome-user-circle.svg';
import teamIcon from '../../../../assets/editCompanyDrawer/Icon material-group-add.svg';
import projectIcon from '../../../../assets/editCompanyDrawer/Icon awesome-product-hunt.svg';
import { getAllTeams } from "./editTaskQueries";

import DrpDwnIcn from "../../../../assets/icons/create-ticket/Icon ionic-md-arrow-dropdown.svg";
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';

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
class EditTaskCompany extends React.Component {
    constructor(props) {
        super(props);
        this.companyNameField = React.createRef();
        this.state = {
            startDate: new Date(),
            dueDate: new Date(),
            //componyName: 'Xcelpros LLC',
            department: [],
            team: [],
            projects: [],
            taskProjectid: '',
            teamId: [],
            tasks: [],
            company: [],
            habits: [], users: [],
            selectedDept: {},
            selectedcmp: {},
            selectedTm: {},
            selectedPrj: {},

            isCompanyDropdown: false,
            cNameData: false,
            cName: 'Company Name',
            isDepartmentDropdown: false,
            dNameData: false,
            dName: 'Department Name',
            isTeamDropdown: false,
            tNameData: false,
            tName: 'Team Name',
            isProjectDropdown: false,
            pNameData: false,
            pName: 'Project Name',
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.setState({
            department: this.props.allState.departments,
            team: this.props.allState.teamsData,
            company: this.props.allState.company,
            selectedDept: this.props.allState.selectedDepartment,
            selectedcmp: this.props.allState.selectedCompany,
            selectedTm: this.props.allState.selectedTeam,
        })
        // this.fetchdepartment();
        this.fetchproject();
        // this.fetchteam();
        this.getAllTeamsData();
        this.fetchtasks();
        this.fetchHabits();
        // this.fetchcompany();
        this.fetchUsers();
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
      }
    fetchdepartment = () => {
        const requestBody = {
            query: `
          query {
            getAllDepartments {
              departmentName,
            }
          }
        `
        };

        fetch(baseUrl.server, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {

                let department = resData.data.getAllDepartments;
                this.setState({ department: department });
            })

            .catch(err => {
                console.log(err);
            });


    };

    fetchcompany = () => {
        const requestBody = {
            query: `
        query {
          getAllCompany {
            id,
            companyName
          }
        }
      `
        };

        fetch(baseUrl.server, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                let company = resData.data.getAllCompany;
                this.setState({ company: company });
            })
            .catch(err => {
                console.log(err);
            });
    };
    fetchtasks = () => {
        const requestBody = {
            query: `
        query {
          tasksList {
            id,
            departmentId,
            companyId,
            teamId
          }
        }
      `
        };

        fetch(baseUrl.server, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {

                let tasks = resData.data.tasksList;
                this.setState({ tasks: tasks });
            })

            .catch(err => {
                console.log(err);
            });
    };
    fetchHabits = () => {
        const requestBody = {
            query: `
        query {
          habitsList {
              habitTitle,
              habitDescription,
              startTime
          }
        }
      `
        };

        fetch(baseUrl.server, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                //console.log(resData);
                let habits = resData.data.habitsList;
                this.setState({ habits: habits });
            })
            .catch(err => {
                console.log(err);
            });
    };
    fetchUsers = () => {
        const requestBody = {
            query: `
        query {
          getAllUsers {
            id,
            firstName,
            lastName,
            emailIs,
            password,
            userRollId,
            companyId,
            departmentId
          }
        }
      `
        };

        fetch(baseUrl.server, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                //console.log(resData);
                let users = resData.data.getAllUsers;
                this.setState({ users: users });
            })
            .catch(err => {
                console.log(err);
            });
    };

    fetchproject = () => {
        const requestBody = {
            query: `
        query {
        getAllProjects {
            id
            projectName,
          }
        }
      `
        };

        fetch(baseUrl.server, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                //console.log(resData);

                let project = resData.data.getAllProjects;
                this.setState({ projects: project });
            })

            .catch(err => {
                console.log(err);
            });
    };

    getAllTeamsData = async () => {
        const client = this.props.client;
        const result = await getAllTeams(client);
        if (result) {
            this.setState({ team: result })
        }
    }

    handleClickOutside = (event) => {
        console.log('wrapperRef_wrapperRef', wrapperRef.contains(event.target))
        if (wrapperRef && !wrapperRef.contains(event.target)) {
            this.setState({
                isCompanyDropdown: false, 
                isDepartmentDropdown: false,
                isProjectDropdown: false, 
                isTeamDropdown: false,
            })
        }
    }
    setWrapperRef = (node) => wrapperRef = node;


    // Company
    handleChangeCompany = (event, cdata) => {
        this.setState({
            selectedcmp: event.target.value,
            cName: cdata.companyName,
            cNameData: true,
            isCompanyDropdown: false, 
            isDepartmentDropdown: false, 
            isTeamDropdown: false,
            isProjectDropdown: false

        });
        this.props.thisObj.setState({ companyDataId: event.target.value });
    }
    showCompanyDropdown = () => {
        this.setState({
            isCompanyDropdown: !this.state.isCompanyDropdown,
            isDepartmentDropdown: false, 
            isTeamDropdown: false,
            isProjectDropdown: false
        })
    }
    // Company ends

    // Department
    handleChangeDepartment = (event, cdata) => {
        this.setState({
            selectedDept: event.target.value,
            dName: cdata.departmentName,
            dNameData: true,
            isDepartmentDropdown: false, isCompanyDropdown: false, isTeamDropdown: false,
            isProjectDropdown: false
        });
        this.props.thisObj.setState({ departmentDataId: event.target.value });
    }
    showDepartmentDropdown = () => {
        this.setState({
            isDepartmentDropdown: !this.state.isDepartmentDropdown,
            isCompanyDropdown: false, isTeamDropdown: false,
            isProjectDropdown: false
        })
    }
    // Department ends

    // Team
    handleChangeTeam = (event, cdata) => {
        this.setState({
            selectedTm: event.target.value,
            tName: cdata.teamName,
            tNameData: true,
            isDepartmentDropdown: false, isCompanyDropdown: false,
            isTeamDropdown: false, isProjectDropdown: false
        });
        this.props.thisObj.setState({ teamDataId: event.target.value });
    }
    showTeamDropdown = () => {
        this.setState({
            isTeamDropdown: !this.state.isTeamDropdown,
            isCompanyDropdown: false, isDepartmentDropdown: false,
            isProjectDropdown: false
        })
    }
    // Team ends

    // Project
    handleChangeProject = (event, cdata) => {
        this.setState({
            selectedPrj: event.target.value,
            pName: cdata.projectName,
            pNameData: true,
            isDepartmentDropdown: false, isCompanyDropdown: false,
            isTeamDropdown: false, isProjectDropdown: false
        });
        this.props.thisObj.setState({ projectDataId: cdata.id });
    }
    showProjectDropdown = () => {
        this.setState({
            isProjectDropdown: !this.state.isProjectDropdown,
            isCompanyDropdown: false, isDepartmentDropdown: false,
            isTeamDropdown: false
        })
    }
    // Project ends

    saveCreateCompanyDrawerDetails = async (companyId) => {

        this.props.thisObj.setState({
            selectedCompany: this.state.selectedcmp,
            selectedDepartment: this.state.selectedDept,
            selectedProject: this.state.selectedPrj,
            selectedTeam: this.state.selectedTm

        })
        this.closeEditCompanyDrawer()
        //this.props.thisObj.setState({isEditCompDtlsOpen: false})
    };
    closeEditCompanyDrawer = () => {
        this.props.thisObj.setState({ isEditCompDtlsOpen: false })
    }

    toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({ ...this.state, [side]: open });
    };



    sideList = side => (
        <div className="side-task-list">
            <div onClick={this.props.onClick} className={'EdtCmpTask-drawer-bodySection'} role="presentation">
                <div className='EdtCmpTask-drawer-heading-section'>
                    <p className='filter-drawer-heading'>EDIT COMPANY DETAILS</p>
                </div>
                {/* Company Section  */}
                <div className="edit-task-drawer-task-comp d-flex justify-space-between">
                    <div className="edit-task-drawer-task-company">
                        <div className='menu-comp-container' ref={this.setWrapperRef}>
                            <div className='edit-drawer-container-comp d-flex'
                                onClick={this.showCompanyDropdown}  
                            >
                                <div className='selected-item-container'>
                                    {
                                        this.props.allState.companyDataId == '' &&
                                            this.state.cNameData == false && this.props.taskCompanyData.companyId != null ?
                                            this.state.company ?
                                                this.state.company.map((cData, index) => {
                                                    if (this.props.taskCompanyData.companyId == cData.id)
                                                        return <p> <img src={companyIcon} alt='' /> &nbsp; {cData.companyName}</p>
                                                })
                                                : <p><img src={companyIcon} alt='' /> &nbsp; {this.state.cName}</p>
                                            : this.props.allState.companyDataId != '' ?
                                                this.state.company.map(data => {
                                                    if (this.props.allState.companyDataId == data.id) {
                                                        return <p><img src={companyIcon} alt='' /> &nbsp;{data.companyName}</p>
                                                    }
                                                }) : <p><img src={companyIcon} alt='' /> &nbsp; {this.state.cName}</p>
                                    }
                                </div>
                                <div className="task-drp-dwn-img">
                                    <img src={DrpDwnIcn}
                                        onClick={this.showCompanyDropdown}
                                    />
                                </div>

                            </div>

                            <div className={`task-type-dropdown-menu-container 
                                    ${this.state.isCompanyDropdown ? 'task-type-open-dropdown' : 'close-dropdown'}`}
                               
                            >
                                <div style={{ height: "150px", overflow: "auto" }}>
                                    {this.state.company ? this.state.company.map((cData, index) =>
                                        <StyledMenuItem className="customized-task-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-task-one-tckt-typ d-flex">
                                                <div className="create-task-tckt-img-text d-flex">
                                                    <p>{cData.companyName}</p>
                                                </div>

                                                <div className="create-task-src-radio">
                                                    <Radio
                                                        checked={cData.id == this.state.selectedcmp}
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
                    </div>
                </div>
                {/* Company Section ends */}


                {/* Department Section */}
                <div className="edit-task-drawer-task-dept d-flex justify-space-between">
                    <div className="edit-task-drawer-task-department">
                        <div className='menu-dept-container'>
                            <div className='edit-drawer-container-dept d-flex'
                                onClick={this.showDepartmentDropdown}
                            >
                                <div className='selected-item-container'>
                                    {
                                        this.state.dNameData == false && this.props.taskCompanyData.departmentId != null ?
                                            this.state.department ? this.state.department.map((cData, index) => {
                                                if (this.props.taskCompanyData.departmentId == cData.id)
                                                    return <p><img src={departmentIcon} alt='' />&nbsp; {cData.departmentName}</p>
                                            }) : <p><img src={departmentIcon} alt='' />&nbsp; {this.state.dName}</p>
                                            : <p><img src={departmentIcon} alt='' />&nbsp;{this.state.dName}</p>
                                    }
                                </div>
                                <div className="task-drp-dwn-img">
                                    <img src={DrpDwnIcn}
                                        onClick={this.showDepartmentDropdown}
                                    />
                                </div>

                            </div>

                            <div className={`task-dept-dropdown-menu-container 
                                    ${this.state.isDepartmentDropdown ? 'task-type-open-dropdown' : 'close-dropdown'}`}
                                ref={this.setWrapperRef}
                            >
                                <div style={{ height: "150px", overflow: "auto" }}>
                                    {this.state.department ? this.state.department.map((cData, index) =>
                                        <StyledMenuItem className="customized-task-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-task-one-tckt-typ d-flex">
                                                <div className="create-task-tckt-img-text d-flex">
                                                    <p>{cData.departmentName}</p>
                                                </div>

                                                <div className="create-task-src-radio">
                                                    <Radio
                                                        checked={cData.id == this.state.selectedDept}
                                                        value={cData.id}
                                                        name="ticketTypeId"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        onChange={(e) => this.handleChangeDepartment(e, cData)}
                                                    />
                                                </div>
                                            </div>

                                        </StyledMenuItem>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Department Section ends */}

                {/* Team section */}

                <div className="edit-task-drawer-task-team d-flex justify-space-between">
                    <div className="edit-task-drawer-team">
                        <div className='menu-team-container'>
                            <div className='edit-drawer-container-team d-flex'
                                onClick={this.showTeamDropdown}
                            >
                                <div className='selected-item-container'>
                                    {
                                        this.props.allState.teamDataId == '' &&
                                            this.state.tNameData == false && this.props.taskCompanyData.teamId != null ?
                                            this.state.team ?
                                                this.state.team.map((cData, index) => {
                                                    if (this.props.taskCompanyData.teamId == cData.id)
                                                        return <p> <img src={teamIcon} alt='' /> &nbsp; {cData.teamName}</p>
                                                })
                                                : <p><img src={teamIcon} alt='' /> &nbsp; {this.state.tName}</p>
                                            : this.props.allState.teamDataId != '' ?
                                                this.state.team.map(data => {
                                                    if (this.props.allState.teamDataId == data.id) {
                                                        return <p><img src={teamIcon} alt='' /> &nbsp;{data.teamName}</p>
                                                    }
                                                }) : <p><img src={teamIcon} alt='' /> &nbsp; {this.state.tName}</p>
                                    }
                                </div>
                                <div className="task-drp-dwn-img">
                                    <img src={DrpDwnIcn}
                                        onClick={this.showTeamDropdown}
                                    />
                                </div>

                            </div>

                            <div className={`task-team-dropdown-menu-container 
                                    ${this.state.isTeamDropdown ? 'task-type-open-dropdown' : 'close-dropdown'}`}
                                ref={this.setWrapperRef}
                            >
                                <div style={{ height: "150px", overflow: "auto" }}>
                                    {this.state.team ? this.state.team.map((cData, index) =>
                                        <StyledMenuItem className="customized-task-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-task-one-tckt-typ d-flex">
                                                <div className="create-task-tckt-img-text d-flex">
                                                    <p>{cData.teamName}</p>
                                                </div>

                                                <div className="create-task-src-radio">
                                                    <Radio
                                                        checked={cData.id == this.state.selectedTm}
                                                        value={cData.id}
                                                        name="ticketTypeId"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        onChange={(e) => this.handleChangeTeam(e, cData)}
                                                    />
                                                </div>
                                            </div>

                                        </StyledMenuItem>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Team Section ends */}

                {/* Project section */}

                <div className="edit-task-drawer-task-pro d-flex justify-space-between">
                    <div className="edit-task-drawer-pro">
                        <div className='menu-pro-container'>
                            <div className='edit-drawer-container-pro d-flex'
                                onClick={this.showProjectDropdown}
                            >
                                <div className='selected-item-container'>
                                    {
                                        this.state.pNameData == false && this.props.taskCompanyData.projectId != null ?
                                            this.state.projects ? this.state.projects.map((cData, index) => {
                                                if (this.props.taskCompanyData.projectId == cData.id)
                                                    return <p><img src={projectIcon} alt='' />&nbsp; {cData.projectName}</p>
                                            }) : <p><img src={projectIcon} alt='' />&nbsp;{this.state.pName}</p>
                                            : <p><img src={projectIcon} alt='' />&nbsp;{this.state.pName}</p>
                                    }
                                </div>
                                <div className="task-drp-dwn-img">
                                    <img src={DrpDwnIcn}
                                        onClick={this.showProjectDropdown}
                                    />
                                </div>

                            </div>

                            <div className={`task-pro-dropdown-menu-container 
                                    ${this.state.isProjectDropdown ? 'task-type-open-dropdown' : 'close-dropdown'}`}
                                ref={this.setWrapperRef}
                            >
                                <div style={{ height: "150px", overflow: "auto" }}>
                                    {this.state.projects ? this.state.projects.map((cData, index) =>
                                        <StyledMenuItem className="customized-task-source"
                                            onClose={this.handleClose}
                                        >
                                            <div className="create-task-one-tckt-typ d-flex">
                                                <div className="create-task-tckt-img-text d-flex">
                                                    <p>{cData.projectName}</p>
                                                </div>

                                                <div className="create-task-src-radio">
                                                    <Radio
                                                        checked={cData.id == this.state.selectedPrj}
                                                        value={cData.id}
                                                        name="ticketTypeId"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': '' }}
                                                        onChange={(e) => this.handleChangeProject(e, cData)}
                                                    />
                                                </div>
                                            </div>

                                        </StyledMenuItem>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Project Section ends */}

                <div className='edt-tsk-cmpny-bottom-buttons'>
                    <Button variant="contained" className="ed-tsk-save-button" onClick={this.closeEditCompanyDrawer}>
                        Cancel
                    </Button>

                    <Button variant="contained" className="edt-tsk-submit-button" onClick={this.saveCreateCompanyDrawerDetails}>
                        Update
                    </Button>
                </div>
            </div>
        </div>
    );

    render() {
        return (
            <Drawer
                anchor="right"
                open={this.props.isEditCompDtlsOpen}
                onClose={this.toggleDrawer('right', false)}
                className='EdtCmpTask-drawer'
            >
                <div className="edit-task-drawer d-flex">
                    <div className="drawer-full-width" onClick={this.closeEditCompanyDrawer}></div>
                    {this.sideList('right')}
                </div>
            </Drawer>
        )
    }

}

export default EditTaskCompany;
