import React from 'react';
import "./MergeTaskDrawer.scss";
import Drawer from '@material-ui/core/Drawer';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import AssignToImage from "../../../../assets/images/profile.png";
import PrimaryIcon from "../../../../assets/icons/01-10-2019/Icon-awesome-star-of-life.svg";
import searchIcon from '../../../../assets/Sidenavbar-icons/Icon feather-search-small.svg';
import SubtractIcon from "../../../../assets/icons/18-11-2019/Subtraction 7.svg";
import PrimaryIconBlue from "../../../../assets/icons/18-11-2019/PrimaryIconBlue.svg";
import PrimaryIconGray from "../../../../assets/icons/18-11-2019/PrimaryIconGray.svg";
import DrpDwnIcn from "../../../../assets/icons/create-ticket/Icon ionic-md-arrow-dropdown.svg";
import { Scrollbars } from 'react-custom-scrollbars';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import axios from "axios";
import { baseUrl } from "../../../../constants";


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

const itemType = [
        {id: 0, title: 'Task Id'},
        {id: 1, title: 'Status'},
        {id: 2, title: 'Tag'},
        {id: 3, title: 'Priority'},
    ]

let checkedList = [];
class MergeTicket extends React.Component {
    constructor(props) {
        super(props);
        this.wrapperRef = null;
        this.state = {
            open: false,
            category: "",
            searchText: "",
            responseData: "",
            checkBoxValues: [],
            primarySelect:this.props.selectedMergeTask.id,
            isShowTaskType: false,
        }
    }

    componentDidMount (){
        document.addEventListener('mouseClick', this.handleOutsideClick);
    }
    handleOutsideClick =(event)=> {
        if(this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                isShowTaskType: false
            })
        }        
    }
    closeEditDrawerHandler = () => {
        this.props.thisObj.setState({ isMergeDrawerOpen: false })
    }
    selectPrimary=(data)=>{
        this.setState({primarySelect:data})
    }

    handleChange = event => {
        this.setState({ priority: event.target.value });
    };
    setCategory = (event) => {
        console.log('setCategory_setCategory')
        this.setState({ category: event.target.value });
    }

    handleSearchText = event => {
        this.setState({ searchText: event.target.value });
    };

    handleCheckBoxValue = (e) => {
        if (e.target.checked) {
            checkedList.push(Number(e.target.value));
        } else if (!e.target.checked) {
            checkedList.pop();
        }
    }
    removeTaskMerge=(data)=>{
        let array = this.props.selectedTask
        let index = array.indexOf(data);
        array.splice(index,1);
        this.props.thisObj.setState({selectedTask:array})
    }



    showIndustryDropdown = () => {
        this.setState({
            isShowTaskType: !this.state.isShowTaskType
        })
    }
    setWrapperRef = (node) => {
        this.wrapperRef = node;
    } 
    
    radioHandleChangeIndustry = event => {
        // setRadioIndustry(event.target.value);
    };

    submitSearchText = async (e) => {
        let requestBody = {
            query: `
              mutation searchTicketBasedOnCategory(
                  $searchText: String,
                  $category: String,
                ) {
                searchTicketBasedOnCategory(
                    category: $category,
                    categoryKeyWord:$searchText
                ) {
                    id
                    name,
                    ticketDescription
                }
              }
            `,
            variables: {
                searchText: this.state.searchText &&
                    this.state.searchText != '' ?
                    this.state.searchText : '',
                category: this.state.category
            }
        };

        let resData = await axios({
            method: 'post',
            url: baseUrl.server,
            data: requestBody,
        }).then(res => {
            return res
        }).catch(err => {
            this.setState({ responseData: '' });
            return err;
        });
        this.setState({
            responseData: resData.data != null ?
                resData.data.data.searchTicketBasedOnCategory : ''
        });
        console.log("SEARCH RESPONSE", resData);
    }



    closeMDrawerHandler = () => {
        this.props.thisObj.setState({ isMergeDrawerOpen: false })
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



    priorityHandleChange = event => {
        console.log('value', event.target.value)
        this.setState({ priority: event.target.value })
    };

    multipleHandleChange = event => {
        this.setState({ tagsName: event.target.value });
    };

    industryHandleClick=(selectedObject) => {
        this.setState({
            selectedObject: selectedObject,
            isShowTaskType: false
        })
    }
    handleClose = () => {
        // setanchorEl({ anchorEl: null });
    };

    sideList = side => {
       return <div className={'taskListMergeDrawer'} role="presentation"  >
            <div className="taskListingMergeDrawer merge-ticket">
                <div className="taskMergeDrawerHeading">MERGE</div>
                <div className="tarkMergeDropdownAndSearchWrapper">

                    <div className="company-details-button-one">
                        <div className='menu-container'>
                            <div className='industry-container' onClick={this.showIndustryDropdown}>
                                <div className='selected-item-container'>
                                    <p htmlFor="industry" name="industry">{ this.state.selectedObject ? this.state.selectedObject : 'Ticket No' }</p>
                                </div>
                                <div className="industry-drp-dwn-img">
                                    <img src={DrpDwnIcn}  />
                                </div>

                            </div>

                                <div className={`industry-dropdown-menu-container 
                                    ${this.state.isShowTaskType ? 'industry-open-dropdown' : 'close-dropdown'}`} ref={this.setWrapperRef}>
                                    <Scrollbars className="custom-scroll" >
                                    {
                                    itemType.map((icon, index) =>
                                        <StyledMenuItem className="customized-ticket-source" onClick={() => this.industryHandleClick(icon.title)} >
                                        <div className="create-ticket-one-industry d-flex">
                                            <div className="create-ticket-prio-img-text d-flex">
                                                <p>{icon.title}</p>
                                            </div>

                                            <div className="create-ticket-src-radio">
                                                <Radio
                                                    checked={'selecteIdTwo' === index}
                                                    onChange={(e) => this.radioHandleChangeIndustry(e, index)}
                                                    value=""
                                                    name="radio-button-demo"
                                                    color="primary"
                                                    inputProps={{ 'aria-label': '' }}
                                                />
                                            </div>
                                        </div>


                                    {/* </div> */}

                                    </StyledMenuItem>
                                ) 
                                }
                                </Scrollbars>
                            </div>
                        </div>
                    </div>



                    <div className='linkWithSearchBar'>
                        <TextField value={this.state.searchOption} name="searchOption" onChange={this.changeHandler}
                        className='sidebar-search-field' placeholder='Search for Projects' variant="outlined"
                        />
                        <img src={searchIcon} alt='searchIcon' onClick={this.searchTicketHere} />
                    </div>
                </div>

                <div className="merge-ticket-licensing-container">
{this.props.selectedTask !=null || this.props.selectedTask != undefined ? 
    this.props.selectedTask.map(task=> {
        if(this.state.primarySelect == task.id){
                // return <div className={ this.state.primarySelect == task.id ? "merge-ticket-licensing" : "merge-ticket-licensing-one"}>
                    return <div className={ 'mergeItemContainer' }>
                            <Checkbox value="checkedB" color="primary" />
                            <div className='taskListingItemDescription'>
                                <div className="taskListingItemLeftSection">
                                    <p className="merge-ticket-phone-number-text-one">#0828190</p>
                                    <p className="merge-ticket-phone-number-text-two">Code Matrix</p>
                                </div>
                                <div className="taskTitleAndAssignTo">
                                    <p>Need one more licensing</p>
                                    <div className="merge-ticket-licensing-img-text">
                                        <img src={AssignToImage}></img>
                                        <p>Sugatha Maji</p>
                                    </div>
                                </div>
                            </div>

                                <img onClick={()=>this.selectPrimary(task.id)} src={PrimaryIconBlue}></img>
                        </div>
                }
                })
                : null
}
{this.props.selectedTask !=null || this.props.selectedTask != undefined ? 
    this.props.selectedTask.map(task=> {
        if(this.state.primarySelect != task.id){
                return <div className={this.state.primarySelect == task.id ? "merge-ticket-licensing" : "merge-ticket-licensing-one"}>
                        {/* <Checkbox
                            value="checkedB"
                            color="primary"
                            onClick={()=>this.removeTaskMerge(task)}
                        /> */}
                        <img src={SubtractIcon} onClick={()=>this.removeTaskMerge(task)}></img>
                        <div className="merge-ticket-phone-number-text">
                            <p className="merge-ticket-phone-number-text-one">#{task.id}</p>
                            <p className="merge-ticket-phone-number-text-two">Code Matrix</p>
                        </div>
                        <div className="merge-ticket-licensing-text">
                            <p>{task.taskTitle}</p>
                            <div className="merge-ticket-licensing-img-text">
                                <img src={AssignToImage}></img>
                                <p>Sugatha Maji</p>
                            </div>
                        </div>


                        {/* <div  className={this.state.primarySelect == task.id ?"merge-ticket-primary":"merge-ticket-primary-one"}> */}
                            <img onClick={()=>this.selectPrimary(task.id)} src={PrimaryIconGray}></img>
                            {/* <p>PRIMARY</p> */}
                        {/* </div> */}
                    </div>
    }  
            })
                : null
}
                </div>


                







                <div className="sideDrawerFooter">
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
                            Send
                        </Button>
                    </div>
                </div>                
            </div>

        </div>
    };

    render() {
        return (
            <Drawer anchor="right" open={this.props.isMergeDrawerOpen} onClose={this.toggleDrawer('right', false)} className='merge-ticket-drawer'>
                {this.sideList('right')}
            </Drawer>
        )
    }

}

export default MergeTicket;
