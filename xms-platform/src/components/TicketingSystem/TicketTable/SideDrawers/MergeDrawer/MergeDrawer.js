// import React, { Component } from "react";
// import "./MergeDrawer.scss";
// import SearchIcon from '@material-ui/icons/Search';
// import InputBase from '@material-ui/core/InputBase';
// import AssignToImage from "../../../../../assets/images/profile.png";
// import LicensingIcon from "../../../../../assets/icons/01-10-2019/Subtraction-7.svg";
// import PrimaryIcon from "../../../../../assets/icons/01-10-2019/Icon-awesome-star-of-life.svg";
// import Button from '@material-ui/core/Button';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import Input from '@material-ui/core/Input';
// import Checkbox from '@material-ui/core/Checkbox';
// import axios from "axios";
// import { baseUrl } from "../../../../../constants";

// let checkedList = [];

// class MergerDrawer extends Component {
//     constructor(props) {
//         super()
//         this.state = {
//             open: false,
//             category: "",
//             searchText: "",
//             responseData: "",
//             checkBoxValues: [],
//         }
//     }

//     handleChange = event => {
//         this.setState({ priority: event.target.value });
//     };

//     handleOpenClose = () => {
//         this.setState({ open: !this.state.open });
//     };

//     setCategory = (event) => {
//         this.setState({ category: event.target.value });
//     }
//     handleSearchText = event => {
//         this.setState({ searchText: event.target.value });
//     };
//     handleCheckBoxValue = (e) => {
//         if (e.target.checked) {
//             checkedList.push(Number(e.target.value));
//         } else if (!e.target.checked) {
//             checkedList.pop();
//         }
//     }
//     submitSearchText = async (e) => {
//         let requestBody = {
//             query: `
//               mutation searchTicketBasedOnCategory(
//                   $searchText: String,
//                   $category: String,
//                 ) {
//                 searchTicketBasedOnCategory(
//                     category: $category,
//                     categoryKeyWord:$searchText
//                 ) {
//                     id
//                     name,
//                     ticketDescription
//                 }
//               }
//             `,
//             variables: {
//                 searchText: this.state.searchText &&
//                     this.state.searchText != '' ?
//                     this.state.searchText : '',
//                 category: this.state.category
//             }
//         };

//         let resData = await axios({
//             method: 'post',
//             url: baseUrl.server,
//             data: requestBody,
//         }).then(res => {
//             return res
//         }).catch(err => {
//             this.setState({ responseData: '' });
//             return err;
//         });
//         this.setState({
//             responseData: resData.data != null ?
//                 resData.data.data.searchTicketBasedOnCategory : ''
//         });
//         console.log("SEARCH RESPONSE", resData);
//     }

//     render() {
//         console.log("CATEGORY IN MERGE DRAWER", this.props.ticketIds);
//         return (
//             <div className="merge-ticket">
//                 <div className="merge-ticket-header-text"><p>MERGE</p></div>
//                 <div className="merge-ticket-drop-down-search">
//                     <FormControl>
//                         <InputLabel htmlFor="demo-controlled-open-select">Ticket</InputLabel>
//                         <div className="merge-ticket-menu-item">
//                             <Select
//                                 open={this.state.open}
//                                 onClose={this.handleOpenClose}
//                                 onOpen={this.handleOpenClose}
//                                 value={this.state.category}
//                                 onChange={this.setCategory}
//                             >
//                                 <MenuItem value="ticketNo">Ticket no</MenuItem>
//                                 <MenuItem value="status">Status</MenuItem>
//                                 <MenuItem value="tags">Tag</MenuItem>
//                                 <MenuItem value="priority">Priority</MenuItem>
//                             </Select>
//                         </div>
//                     </FormControl>

//                     <div className="header-search">
//                         <div className="search-bar d-flex">

//                             <InputBase
//                                 placeholder="Search tickets"
//                                 className="search-input"
//                                 inputProps={{ 'aria-label': 'search' }}
//                                 onChange={this.handleSearchText}
//                                 onKeyPress={this.submitSearchText}
//                             />

//                             <div className="search-icon">
//                                 <SearchIcon />
//                             </div>
//                         </div>
//                     </div>

//                 </div>

//                 <div className="button1-popup-for-one">
//                     <div className='button1-popup-one'>
//                         <div className='button1-popup-content'>
//                             {this.state.responseData && this.state.responseData != null &&
//                                 this.state.responseData.length != 0 ?
//                                 this.state.responseData.map(data => {
//                                     return <div className="bulk-update-licensing">
//                                         <Checkbox
//                                             value={data.id}
//                                             color="primary"
//                                             onClick={this.handleCheckBoxValue}
//                                         />
//                                         <div className="phone-number-text">
//                                             <p className="phone-number-text-one">{data.id}</p>
//                                             <p className="phone-number-text-two">{data.name}</p>
//                                         </div>
//                                         <div className="licensing-text">
//                                             <p>{data.ticketDescription}</p>
//                                             <div className="licensing-img-text">
//                                                 <img src={AssignToImage}></img>
//                                                 <p>Sugatha Maji</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 }) : 
//                                 <div className="bulk-update-licensing2">
//                                     <Checkbox
//                                         value="checkedB"
//                                         color="primary"
//                                     />
//                                     <div className="phone-number-text">
//                                         <p className="phone-number-text-one">#0828190</p>
//                                         <p className="phone-number-text-two">Code Matrix</p>
//                                     </div>
//                                     <div className="licensing-text">
//                                         <p>Need one more licensing</p>
//                                         <div className="licensing-img-text">
//                                             <img src={AssignToImage}></img>
//                                             <p>Sugatha Maji</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             }
//                         </div>
//                     </div>
//                 </div>

//                 <div className="merge-ticket-licensing-container">
//                     <div className="merge-ticket-licensing">
//                         <Checkbox
//                             value="checkedB"
//                             color="primary"
//                         />
//                         <div className="merge-ticket-phone-number-text">
//                             <p className="merge-ticket-phone-number-text-one">#0828190</p>
//                             <p className="merge-ticket-phone-number-text-two">Code Matrix</p>
//                         </div>
//                         <div className="merge-ticket-licensing-text">
//                             <p>Need one more licensing</p>
//                             <div className="merge-ticket-licensing-img-text">
//                                 <img src={AssignToImage}></img>
//                                 <p>Sugatha Maji</p>
//                             </div>
//                         </div>


//                         <div className="merge-ticket-primary">
//                             <img src={PrimaryIcon}></img>
//                             <p>PRIMARY</p>
//                         </div>
//                     </div>
//                     <div className="merge-ticket-licensing-one">
//                         <Checkbox
//                             value="checkedB"
//                             color="primary"
//                         />
//                         <div className="merge-ticket-phone-number-text">
//                             <p className="merge-ticket-phone-number-text-one">#0828190</p>
//                             <p className="merge-ticket-phone-number-text-two">Code Matrix</p>
//                         </div>
//                         <div className="merge-ticket-licensing-text">
//                             <p>Need one more licensing</p>
//                             <div className="merge-ticket-licensing-img-text">
//                                 <img src={AssignToImage}></img>
//                                 <p>Sugatha Maji</p>
//                             </div>
//                         </div>
//                         <div className="merge-ticket-primary-one">
//                             <img src={PrimaryIcon}></img>
//                             <p>PRIMARY</p>
//                         </div>
//                     </div>
//                     <div className="merge-ticket-licensing-two">
//                         <Checkbox
//                             value="checkedB"
//                             color="primary"
//                         />
//                         <div className="merge-ticket-phone-number-text">
//                             <p className="merge-ticket-phone-number-text-one">#0828190</p>
//                             <p className="merge-ticket-phone-number-text-two">Code Matrix</p>
//                         </div>
//                         <div className="merge-ticket-licensing-text">
//                             <p>Need one more licensing</p>
//                             <div className="merge-ticket-licensing-img-text">
//                                 <img src={AssignToImage}></img>
//                                 <p>Sugatha Maji</p>
//                             </div>
//                         </div>
//                         <div className="merge-ticket-primary-two">
//                             <img src={PrimaryIcon}></img>
//                             <p>PRIMARY</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="merge-break-for-submit-section"></div>
//                 <div className="bulk-update-submit-section">
//                     <div className="bulk-update-submit-section-button-one">
//                         <Button variant="outlined" color="primary" className="">
//                             Cancel
//                         </Button>
//                     </div>
//                     <div className="bulk-update-submit-section-button-two">
//                         <Button variant="outlined" color="primary" className="">
//                             Update
//                         </Button>
//                     </div>

//                 </div>
//             </div>
//         )
//     }
// }
// export default MergerDrawer;






import React from 'react';
import "./MergeDrawer.scss";
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
// import AssignToImage from "../../../../assets/images/profile.png";
import AssignToImage from "../../../../../assets/images/profile.png";
import LicensingIcon from "../../../../../assets/icons/01-10-2019/Subtraction-7.svg";
import PrimaryIcon from "../../../../../assets/icons/01-10-2019/Icon-awesome-star-of-life.svg";
import axios from "axios";
import { baseUrl } from "../../../../../constants";
import {
    searchTicketBasedOnCategory,
} from "../bulkUpdateQueries";
import DrpDwnIcn from "../../../../../assets/icons/create-ticket/Icon ionic-md-arrow-dropdown.svg";
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';

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
class MergeTicket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            category: "",
            searchText: "",
            responseData: "",
            checkBoxValues: [],

            isTicketCategoryDropdown: false,
            selected: '',
            anchorEl: null,

        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutsideBody);
    }
    handleChange = event => {
        this.setState({ priority: event.target.value });
    };
    setCategory = (event) => {
        this.setState({ category: event.target.value });
    }

    handleCheckBoxValue = (e) => {
        if (e.target.checked) {
            checkedList.push(Number(e.target.value));
        } else if (!e.target.checked) {
            checkedList.pop();
        }
    }
    // submitSearchText = async (e) => {
    //     const data = {
    //         searchText: this.state.searchText && this.state.searchText != '' && this.state.searchText != undefined ? this.state.searchText : '',
    //         category: this.state.category
    //     }
    //     let client = this.props.client;
    //     searchTicketBasedOnCategory(client, data, searchData => {
    //         if (this.state.responseData == '' || this.state.responseData === undefined || this.state.responseData == null) {
    //             this.setState({
    //                 responseData: searchData != undefined &&
    //                     searchData != null
    //                     && searchData != '' ?
    //                     searchData : ''
    //             })
    //         }
    //     })
    // }

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

    handleOpenClose = () => {
        this.setState({ open: !this.state.open });
    };

    priorityHandleChange = event => {
        this.setState({ priority: event.target.value })
    };

    multipleHandleChange = event => {
        this.setState({ tagsName: event.target.value });
    };


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
    showTicketCategoryDropdown = async () => {
        console.log("AGAIN");
        await this.setState({ isTicketCategoryDropdown: !this.state.isTicketCategoryDropdown })
    }
    ticketCategoryHandleClick = (selectedObject) => {
        this.setState({ selected: selectedObject });
    }
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    // Added on Nov 18th ends
    sideList = side => (
        <div className={'merge-ticket-drawer-bodySection'} role="presentation"  >
            <div className="merge-ticket">
                <div className="merge-ticket-header-text"><p>MERGE</p></div>
                {/* <div className="merge-ticket-drop-down-search">
                    <FormControl>
                        <InputLabel htmlFor="demo-controlled-open-select">Ticket</InputLabel>
                        <div className="merge-ticket-menu-item">
                            <Select
                                open={this.state.open}
                                onClose={this.handleOpenClose}
                                onOpen={this.handleOpenClose}
                                value={this.state.category}
                                onChange={this.setCategory}
                            >
                                <MenuItem value="ticketNo">Ticket no</MenuItem>
                                <MenuItem value="status">Status</MenuItem>
                                <MenuItem value="tags">Tag</MenuItem>
                                <MenuItem value="priority">Priority</MenuItem>
                            </Select>
                        </div>
                    </FormControl>

                    <div className="header-search">
                        <div className="search-bar d-flex">

                            <InputBase
                                placeholder="Search tickets"
                                className="search-input"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={this.handleSearchText}
                                onKeyPress={this.submitSearchText}
                            />

                            <div className="search-icon">
                                <SearchIcon />
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Added on Nov 18th starts */}
                <div className="merge-container d-flex justify-space-between">
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
                                                    name="category"
                                                    inputProps={{ 'aria-label': '' }}
                                                    onChange={this.handleSearchText}
                                                />
                                            </div>
                                        </div>
                                    </StyledMenuItem>
                                )}

                            </div>
                        </div>
                    </div>
                    <div className="merge-header-search">
                        <div className="merge-search-bar">
                            <InputBase
                                placeholder="Search tickets"
                                className="search-input"
                                name="searchText"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={this.handleSearchText}
                                onKeyPress={this.submitSearchText}
                            />
                            <div className="search-icon">
                                <SearchIcon />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Added on Nov 18th ends */}

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
                                            <p className="phone-number-text-one">{data.id}</p>
                                            <p className="phone-number-text-two">{data.name}</p>
                                        </div>
                                        <div className="licensing-text">
                                            <p>{data.ticketDescription}</p>
                                            <div className="licensing-img-text">
                                                <img src={AssignToImage}></img>
                                                <p>Sugatha Maji</p>
                                            </div>
                                        </div>
                                    </div>
                                }) :
                                <div className="bulk-update-licensing2">
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

                <div className="merge-ticket-licensing-container">
                    <div className="merge-ticket-licensing">
                        <Checkbox
                            value="checkedB"
                            color="primary"
                        />
                        <div className="merge-ticket-phone-number-text">
                            <p className="merge-ticket-phone-number-text-one">#0828190</p>
                            <p className="merge-ticket-phone-number-text-two">Code Matrix</p>
                        </div>
                        <div className="merge-ticket-licensing-text">
                            <p>Need one more licensing</p>
                            <div className="merge-ticket-licensing-img-text">
                                <img src={AssignToImage}></img>
                                <p>Sugatha Maji</p>
                            </div>
                        </div>


                        <div className="merge-ticket-primary">
                            <img src={PrimaryIcon}></img>
                            <p>PRIMARY</p>
                        </div>
                    </div>
                    <div className="merge-ticket-licensing-one">
                        <Checkbox
                            value="checkedB"
                            color="primary"
                        />
                        <div className="merge-ticket-phone-number-text">
                            <p className="merge-ticket-phone-number-text-one">#0828190</p>
                            <p className="merge-ticket-phone-number-text-two">Code Matrix</p>
                        </div>
                        <div className="merge-ticket-licensing-text">
                            <p>Need one more licensing</p>
                            <div className="merge-ticket-licensing-img-text">
                                <img src={AssignToImage}></img>
                                <p>Sugatha Maji</p>
                            </div>
                        </div>
                        <div className="merge-ticket-primary-one">
                            <img src={PrimaryIcon}></img>
                            <p>PRIMARY</p>
                        </div>
                    </div>
                    <div className="merge-ticket-licensing-two">
                        <Checkbox
                            value="checkedB"
                            color="primary"
                        />
                        <div className="merge-ticket-phone-number-text">
                            <p className="merge-ticket-phone-number-text-one">#0828190</p>
                            <p className="merge-ticket-phone-number-text-two">Code Matrix</p>
                        </div>
                        <div className="merge-ticket-licensing-text">
                            <p>Need one more licensing</p>
                            <div className="merge-ticket-licensing-img-text">
                                <img src={AssignToImage}></img>
                                <p>Sugatha Maji</p>
                            </div>
                        </div>
                        <div className="merge-ticket-primary-two">
                            <img src={PrimaryIcon}></img>
                            <p>PRIMARY</p>
                        </div>
                    </div>
                </div>

                <div className="merge-break-for-submit-section"></div>
                <div className="bulk-update-submit-section">
                    <div className="bulk-update-submit-section-button-one">
                        <Button variant="outlined" color="primary" className=""
                            onClick={this.closeMDrawerHandler}
                        >
                            Cancel
                        </Button>
                    </div>
                    <div className="bulk-update-submit-section-button-two">
                        <Button variant="outlined" color="primary" className="">
                            Update
                        </Button>
                    </div>

                </div>
            </div>

        </div>
    );

    render() {
        return (
            <Drawer anchor="right" open={this.props.isMergeDrawerOpen} 
                onClose={this.toggleDrawer('right', false)} 
                className='mergeone-ticket-drawer'
            >
                <div className="d-flex">
                    <div className="drawer-full-width" 
                        onClick={this.closeMDrawerHandler}
                    ></div>
                    {this.sideList('right')}
                </div>
            </Drawer>
        )
    }

}

export default MergeTicket;
