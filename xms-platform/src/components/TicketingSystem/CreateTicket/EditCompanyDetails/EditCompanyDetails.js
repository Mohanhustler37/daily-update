import React from 'react';
import './EditCompanyDetails.scss';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import axios from "axios";
import { baseUrl } from "../../../../constants";

import companyIcon from '../../../../assets/editCompanyDrawer/fav-icon-white.svg'
import departmentIcon from '../../../../assets/editCompanyDrawer/Icon awesome-user-circle.svg'
import teamIcon from '../../../../assets/editCompanyDrawer/Icon material-group-add.svg'
import projectIcon from '../../../../assets/editCompanyDrawer/Icon awesome-product-hunt.svg'
import DropDwnIcon from "../../../../assets/icons/create-ticket/Icon ionic-md-arrow-dropdown.svg";
import { Scrollbars } from 'react-custom-scrollbars';
import { withStyles } from '@material-ui/core/styles';
import { getAllUsers,
  getAllTasks,
  getAllProj,
} from "../../../../containers/NewTaskListing/NewTaskListingQuery"
  import { getDepartments, getCompanyById,getTeams} from "../../../CreateHabitDrawer/createHabitQuery"
const StyledMenuItem = withStyles(theme => ({
  root: {
  },
}))(MenuItem);

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

class FiltersDrawer extends React.Component {
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
      companyDropdown: false,
      isDepartmentDropdown: false,
      isTeamDropDown: false,
      isProjectDropdown: false
    }
  }
  componentDidMount() {
    let Client = this.props.thisObj.props.thisObj.props.client;
    document.addEventListener('mousedown', this.handleClickOutside);
    console.log("ALL STATES",this);
    console.log("PROPS IN EDIT COMPANY DETAILS",this.props.allState);
    this.setState({
      department: this.props.allState.departments,
      team: this.props.allState.teamsData,
      company: this.props.allState.company,
      selectedDept: this.props.allState.selectedDepartment,
      selectedcmp: this.props.allState.selectedCompany,
      selectedTm: this.props.allState.selectedTeam,
    })
    this.fetchproject(Client);
    // this.fetchtasks(Client);
    // this.fetchHabits(Client);
    this.fetchUsers(Client);
  }
  // fetchdepartment = (client) => {
  //   getDepartments(client,res=>{
  //     let department = res.data.getAllDepartments;
  //     this.setState({ department: department });
  //   })
  // };

  // fetchcompany = (client) => {
  //   getCompanyById(client,res=>{
  //     let company = res.data.getAllCompany;
  //     this.setState({ company: company });
  //     alert(JSON.stringify(company))
  //   })
  // };
  // fetchtasks = () => {
  //   const requestBody = {
  //     query: `
  //       query {
  //         tasksList {
  //           id,
  //           departmentId,
  //           companyId,
  //           teamId
  //         }
  //       }
  //     `
  //   };

  //   fetch(baseUrl.server, {
  //     method: 'POST',
  //     body: JSON.stringify(requestBody),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(res => {
  //       if (res.status !== 200 && res.status !== 201) {
  //         throw new Error('Failed!');
  //       }
  //       return res.json();
  //     })
  //     .then(resData => {

  //       let tasks = resData.data.tasksList;
  //       this.setState({ tasks: tasks });
  //     })

  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  // fetchHabits = () => {
  //   const requestBody = {
  //     query: `
  //       query {
  //         habitsList {
  //             habitTitle,
  //             habitDescription,
  //             startTime
  //         }
  //       }
  //     `
  //   };

  //   fetch(baseUrl.server, {
  //     method: 'POST',
  //     body: JSON.stringify(requestBody),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(res => {
  //       if (res.status !== 200 && res.status !== 201) {
  //         throw new Error('Failed!');
  //       }
  //       return res.json();
  //     })
  //     .then(resData => {
  //       //console.log(resData);
  //       let habits = resData.data.habitsList;
  //       this.setState({ habits: habits });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  fetchUsers = (client) => {
    getAllUsers(client,res=>{
      let users = res;
      this.setState({ users: users });
    })
  };

  fetchproject = (client) => {
    getAllProj(client,res=>{
      let project = res.data.getAllProjects;
      this.setState({ projects: project });
    })
  };

  // fetchteam = (client) => {
  //   getTeams(client,res=>{
  //     let team = res.data.getAllTeams;
  //     this.setState({ team: team });    
  //     alert(JSON.stringify(team))
  //   })
  // };
  // handledepartmentChange=async(e)=>{
  //   e.preventDefault();
  //   var data=e.target.value;

  //   this.setState({ data: e.target.value})


  // }
  handleChangeCmp = (e) => {
    this.setState({ selectedcmp: e.target.value })
  }

  handleChangeDept = (e) => {
    this.setState({ selectedDept: e.target.value })
  }
  handleChangeTm = (e) => {
    this.setState({ selectedTm: e.target.value })
  }

  handleChangePrj = (e) => {
    this.setState({ selectedPrj: e.target.value })
  }


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

  quickHandleClick = (selectedObject) => {
    this.setState({
      quickTemplate: selectedObject.companyName
    })
  }
  dprtHndleClick = (selectedObject) => {
    this.setState({
      quickDprt: selectedObject.departmentName
    })
  }

  teamHndleClick = (selectedObject) => {
    this.setState({
      quickteam: selectedObject.teamName
    })
  }

  projectHndleClick = (selectedObject) => {
    this.setState({
      quickProject: selectedObject.teamName
    })
  }

  dropdownToggleHandler =(event, dropdownToggle)=> {
    event.stopPropagation();
    if(dropdownToggle) {
      this.setState({ 
        companyDropdown: false,
        isDepartmentDropdown:false,
        isTeamDropDown:false,
        isProjectDropdown:false,
        [dropdownToggle[Object.keys(dropdownToggle)[0]]]: !this.state[dropdownToggle[Object.keys(dropdownToggle)[0]]]
       })
    }
    else {
      this.setState({
        companyDropdown: false,
        isDepartmentDropdown:false,
        isTeamDropDown:false,
        isProjectDropdown:false
      })
    }
  }


  sideList = side => (
    <div>
      <div onClick={this.props.onClick} className={'EdtCmp-drawer-bodySection'} role="presentation">
        <div className='EdtCmp-drawer-heading-section'>
          <p className='filter-drawer-heading'>Edit company details</p>
        </div>
          <div className='edit-tsk-cmpny-drpdwn'>
                  <div className='cmpny-dtls-dropdwn' onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'companyDropdown' })} 
                  onClick={(e) => {
                    e.stopPropagation();
                    this.setState({
                      companyDropdown: !this.state.companyDropdown
                    })
                  }
                  }>
                    <div className='edt-cmpny-selected-item-container'>
                      <img className="edt-tsk-cmpny-icn" src={companyIcon} alt="" onClick={(e)=> this.dropdownToggleHandler(e,{ dropdownToggle: 'CompanyDropdown' })}></img>
                      <p>{this.state.quickTemplate ? this.state.quickTemplate : 'Xcelpros LLC'}</p>
                    </div>
                    <div className="edt-cmpny-drp-dwn-img">
                      <img alt="" src={DropDwnIcon} />
                    </div>
                  </div>
                  <div className={`edt-cmpny-dropdown-menu-container ${this.state.companyDropdown ? 'open-dropdown' : 'close-dropdown'}`} ref={this.setWrapperRef}>
                    <Scrollbars className="edit-custom-scroll" style={{ height: 160 }}>
                      {this.state.company != null || this.state.company != undefined ?
                        this.state.company.map(company =>
                          <StyledMenuItem className="customized-ticket-list" onClick={() => this.quickHandleClick(company)} onClose={this.handleClose}>
                            <div className="edt-tsk-cmpny-one d-flex">
                              <p>{company.companyName}</p>
                            </div>

                          </StyledMenuItem>
                        ) : null
                      }
                    </Scrollbars>
                  </div>
                </div>

                  <div className='edit-tsk-dprt-drpdwn'>
                    <div className='dprt-dtls-dropdwn' onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isDepartmentDropdown' })} 
                    onClick={(e) => {
                      e.stopPropagation();
                      this.setState({
                        isDepartmentDropdown: !this.state.isDepartmentDropdown
                      })
                    }
                    }>
                      <div className='edt-tsk-dprt-selected-item-container'>
                        <img className="edt-tsk-dprt-icn" src={departmentIcon} alt=""></img>
                        <p>{this.state.quickDprt ? this.state.quickDprt : 'Department'}</p>
                      </div>
                      <div className="edt-dprt-drp-dwn-img">
                        <img alt="" src={DropDwnIcon} />
                      </div>
                    </div>
                    <div className={`edt-dprt-dropdown-menu-container ${this.state.isDepartmentDropdown ? 'dprt-open-dropdown' : 'dprt-close-dropdown'}`} ref={this.setWrapperRef}>
                      <Scrollbars className="edit-dprt-custom-scroll" style={{ height: 160 }}>
                        {this.state.department != null || this.state.department != undefined ?
                          this.state.department.map(dprtmnt =>
                            <StyledMenuItem className="customized-ticket-list" onClick={() => this.dprtHndleClick(dprtmnt)} onClose={this.handleClose}>
                              <div className="edt-tsk-cmpny-one d-flex">
                                {/* <img src={icon.icon} alt='icon'/> */}
                                <p>{dprtmnt.departmentName}</p>
                              </div>

                            </StyledMenuItem>
                          ) : null
                        }
                      </Scrollbars>
                    </div>
                </div>

                  <div className='edit-tsk-tm-drpdwn'>
                    <div className='tm-dtls-dropdwn' onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isTeamDropDown' })} 
                    onClick={(e) => {
                      e.stopPropagation();
                      this.setState({
                        isTeamDropDown: !this.state.isTeamDropDown
                      })
                    }
                    }>
                      <div className='edt-tsk-tm-selected-item-container'>
                        <img className="edt-tsk-tm-icn" src={teamIcon} alt=""></img>
                        <p>{this.state.quickteam ? this.state.quickteam : 'Team'}</p>
                      </div>
                      <div className="edt-dprt-tm-dwn-img">
                        <img alt="" src={DropDwnIcon} />
                      </div>
                    </div>
                    <div className={`edt-tm-dropdown-menu-container ${this.state.isTeamDropDown ? 'tm-open-dropdown' : 'tm-close-dropdown'}`} ref={this.setWrapperRef}>
                      <Scrollbars className="edit-tm-custom-scroll" style={{ height: 160 }}>
                        {this.state.team != null || this.state.team != undefined ?
                          this.state.team.map(team =>
                            <StyledMenuItem className="customized-ticket-list" onClick={() => this.teamHndleClick(team)} onClose={this.handleClose}>
                              <div className="edt-tsk-tm-one d-flex">
                                {/* <img src={icon.icon} alt='icon'/> */}
                                <p>{team.teamName}</p>
                              </div>

                            </StyledMenuItem>
                          ) : null
                        }
                      </Scrollbars>
                    </div>
                </div>

                  <div className='edit-tsk-prjt-drpdwn'>
                    <div className='prjt-dtls-dropdwn' onClick={(e)=> this.dropdownToggleHandler(e, { dropdownToggle: 'isProjectDropdown' })} 
                    onClick={(e) => {
                      e.stopPropagation();
                      this.setState({
                        isProjectDropdown: !this.state.isProjectDropdown
                      })
                    }
                    }>
                      <div className='edt-tsk-prjt-selected-item-container'>
                        <img className="edt-tsk-prjt-icn" src={projectIcon} alt=""></img>
                        <p>{this.state.quickProject ? this.state.quickProject : 'Projects'}</p>
                      </div>
                      <div className="edt-prjt-dwn-img">
                        <img alt="" src={DropDwnIcon} />
                      </div>
                    </div>
                    <div className={`edt-prjt-dropdown-menu-container ${this.state.isProjectDropdown ? 'prjt-open-dropdown' : 'prjt-close-dropdown '}`} ref={this.setWrapperRef}>
                      <Scrollbars className="edit-prjt-custom-scroll" style={{ height: 160 }}>
                        {this.state.projects != null || this.state.projects!= undefined ?
                          this.state.projects.map(team =>{
                            if(team.projectId==team.id){
                              return <StyledMenuItem className="customized-ticket-list" onClick={() => this.projectHndleClick(team)} onClose={this.handleClose}>
                                    <div className="edt-tsk-prjt-one d-flex">
                                      
                                      <p>{team.projectName}</p>
                                    </div>

                                  </StyledMenuItem>}
                            }) : null
                        }
                      </Scrollbars>
                    </div>
                </div>


        <div className='edit-task-bottom-buttons'>
          <Button variant="contained" className="ch-cancel-button" onClick={this.closeEditCompanyDrawer}>
            Cancel
          </Button>

          <Button variant="contained" className="ch-submit-button" onClick={this.saveCreateCompanyDrawerDetails}>
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
        className='EdtCmp-drawer'
        onClick={this.dropdownToggleHandler}
      >
        {this.sideList('right')}
      </Drawer>
    )
  }

}

export default FiltersDrawer;
