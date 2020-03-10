import React from 'react';
import './TicketListBtmPopup.scss'
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TicketBottomPopupTicketBulkUpdate from "../../../assets/icons/01-10-2019/Icon material-update.svg";
import BottomPopupAvatar from "../../../assets/icons/01-10-2019/Rectangle 527.svg";
import TicketBottomPopupTicketBulkMerge from "../../../assets/icons/01-10-2019/Icon material-call-merge.svg";
import TicketBottomPopupTicketBulkClose from "../../../assets/icons/01-10-2019/Icon ionic-ios-close-circle-outline.svg";
import TicketBottomPopupTicketBulkDelete from "../../../assets/icons/01-10-2019/Icon material-delete-sweep.svg";
import TicketBottomPopupTicketClone from "../../../assets/icons/01-10-2019/Group 10943.svg";
import Drawer from "@material-ui/core/Drawer";
import MergerDrawer from "../TicketTable/SideDrawers/MergeDrawer/MergeDrawer";
import { Scrollbars } from 'react-custom-scrollbars';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import CreateTicketDrawer from "../TicketTable/SideDrawers/CreateTicketUpdated/CreateTicketDrawer";
import BulkUpdate from '../../TicketingSystem/TicketTable/SideDrawers/BulkUpdate';
import MergeTicket from "../TicketTable/SideDrawers/MergeDrawer/MergeDrawer";
import { baseUrl } from "../../../constants";
import EditTicket from "../TicketTable/EditTicket";
import axios from "axios";
import { closeTicket, removeMultipleTickets,isDuplicateTicket } from "./TicketListBtmPopupQueiries";

const usersList = [
    { id: 0, avatharImg: '', name: 'John doe' },
    { id: 1, avatharImg: '', name: 'Ryan pazos' },
    { id: 2, avatharImg: '', name: 'John doe' },
    { id: 3, avatharImg: '', name: 'Mark' },
    { id: 4, avatharImg: '', name: 'John doe' },
    { id: 5, avatharImg: '', name: 'Ryan pazos' },
    { id: 6, avatharImg: '', name: 'John doe' },
]
let checkedList = [];
class TicketListBtmPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPopupOne: false,
            isShowPopupTwo: false,
            isShowPopupTwoClose: true,
            open: false,
            isBulkUpdDrawerOpen: false,
            isMergeDrawerOpen: false,
            isShowPopupDelete: false,
            isShowPopupClone: false,
            propsTicketId: [],
            isBulkOpen: false,
            isMergeOpen: false,
            isEditDrawerOpen: false
        }
    }

    handleBulkUpdateToggle = () => {
        this.setState({ isBulkOpen: true });
    }

    handleMergeUpdateToggle = () => {
        this.setState({ isMergeOpen: true });
    }

    buttonOneOnCLick = () => {
        this.setState({
            // isShowPopupOne: !this.state.isShowPopupOne,
            isShowPopupTwo: false
        })
    }
    closeticket = async () => {
        this.props.ticketIds.map(ids => {
            checkedList.push(Number(ids));
        })
        const result = await closeTicket(this.props.client, checkedList);
        if (result) {
            this.setState({ isShowPopupTwo: false });
            this.props.thisObj.setState({ checkBoxValue: [] });
        }

    }


    cancelticket = () => {
        window.location.reload();
    }
    buttonCloseOnCLick = () => {
        this.setState({
            isShowPopupTwo: !this.state.isShowPopupTwo,
            isShowPopupOne: false,
            isShowPopupTwoClose: false,

            isShowPopupClone: false,
            isShowPopupDelete: false
        })

    };

    cloneButtonOnCLick = () => {
        this.setState({
            isShowPopupClone: !this.state.isShowPopupClone,
            isShowPopupOne: false,
            isShowPopupTwoClose: false,

            isShowPopupTwo: false,
            isShowPopupDelete: false
        })
    }
    deleteButtonOnCLick = () => {
        this.setState({
            isShowPopupDelete: !this.state.isShowPopupDelete,
            isShowPopupOne: false,
            isShowPopupTwoClose: false,

            isShowPopupClone: false,
            isShowPopupTwo: false,

        })
    };
    clickclone =async () => {
        const id = this.props.ticketIds
        // isDuplicateTicket(this.props.client,id,res=>{

        // })

        let isDup = await isDuplicateTicket(this.props.client,id)
        // alert( isDup );
        // var text = '42px';
        // var integer = parseInt(id, 10);
        window.location.reload();
    }
    deleteticket = async () => {
        const checkedList = this.props.ticketIds
        const result = await removeMultipleTickets(this.props.client, checkedList);
        if (result) {
            this.setState({ isShowPopupDelete: false });
            this.props.thisObj.setState({ checkBoxValue: [] });
        }
    }
    // ticketcancel = () => {
    //     window.location.reload();
    //     this.setState({isShowPopupDelete:!isShowPopupDelete});
    // }

    toggleDrawer = (side, open) => event => {
        this.setState({ ...this.state, [side]: open });
    };

    sideList = (side) => (
        <div
            className="list"
            role="presentation"
            onClick={this.toggleDrawer(side, true)}
            onKeyDown={this.toggleDrawer(side, true)}
        >
            <BulkUpdate />

        </div>
    );


    mergeDrawer = (side, open) => event => {

        this.setState({ ...this.state, [side]: open });
    };
    mergeList = (side) => (
        <div
            className="list"
            role="presentation"
            onClick={this.mergeDrawer(side, true)}
            onKeyDown={this.mergeDrawer(side, true)}
        >
            <MergerDrawer />
        </div>
    );

    isBulkTicketToggler = () => {
        this.setState({ isBulkDrawerOpen: !this.state.isBulkDrawerOpen })
    }
    isMergeTicketToggler = () => {
        this.setState({ isMergeDrawerOpen: !this.state.isMergeDrawerOpen })
    }
    render() {
        return (
            <div className='bottom-popup-section'>
                <BulkUpdate
                    isBulkDrawerOpen={this.state.isBulkDrawerOpen}
                    thisObj={this}
                    ticketIds={this.props.ticketIds}
                    client={this.props.client}
                />

                <MergeTicket isMergeDrawerOpen={this.state.isMergeDrawerOpen} thisObj={this} />



                <div className='bottom-popup-left-section'>

                    <p className='bottom-popup-section-heading'>Ticket Actions</p>
                    <p className='bottom-popup-section-tickets-selected'>3 tickets selected</p>
                </div>

                <div className='bottom-popup-right-section'>
                    {
                        this.state.isShowPopupOne ? (
                            <div className="button-popup-for-one">
                                <div className='button-popup-one'>
                                    <Scrollbars style={{ width: 180, height: 150 }}>
                                        {
                                            usersList.map(user => {
                                                return (
                                                    <div className='button-popup-content'>
                                                        <div>
                                                            <img className="button-popup-avathar" src={BottomPopupAvatar}></img>
                                                            <span>{user.name}</span>
                                                        </div>

                                                        <FormControlLabel
                                                            className='button-popup-radio-button'
                                                            value="male"
                                                            control={<Radio color="primary" />}
                                                            labelPlacement="start"
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </Scrollbars>
                                    <div className="ticket-list-btm-pop-search">

                                        <InputBase
                                            placeholder="Search tickets"
                                            className="search-input"
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                        <div className=".ticket-list-btm-pop-search-icon">
                                            <SearchIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ) : null
                    }
                    <Button
                        disabled={this.props.isTicketBtnActive}
                        className='bottom-popup-button' variant="contained"
                        onClick={this.buttonOneOnCLick}
                    >
                        <img src={TicketBottomPopupTicketBulkUpdate}></img>Assign
                    </Button>



                    <Button
                        disabled={this.props.isTicketBtnActive}
                        className='bottom-popup-button' variant="contained"
                        onClick={this.isBulkTicketToggler}
                    >
                        <img src={TicketBottomPopupTicketBulkUpdate}></img>Bulk Update
                    </Button>
                    {/* <Drawer
                                anchor="right"
                                open={this.state.isBulkUpdDrawerOpen}
                                onClose={this.toggleDrawer("isBulkUpdDrawerOpen", false)}
                            >
                                {this.sideList("right")}
                            </Drawer> */}

                    <Button
                        disabled={this.props.isTicketBtnActive}
                        className='bottom-popup-button' variant="contained"
                        onClick={this.isMergeTicketToggler}
                    >
                        <img src={TicketBottomPopupTicketBulkMerge}></img>Merge
                    </Button>


                    {/* Merge Drawer ends */}

                    {/* <Drawer
                        anchor="right"
                        open={this.state.isMergeDrawerOpen}
                        onClose={this.mergeDrawer("isMergeDrawerOpen", false)}
                    >
                        {this.mergeList("right")}
                    </Drawer> */}



                    {
                        this.state.isShowPopupTwo ? (
                            <div className="button-popup-two-container">
                                <div className='button-popup-two'>
                                    {
                                        <div className='button-popup-two-content'>
                                            <p className="button-popup-two-content-close-tickets">CLOSE TICKETS</p>
                                            <p className="button-popup-two-content-ask-question">Are you sure you want to close this ticket?</p>
                                            <div className="popup-close-button-section">
                                                <div className="popup-close-button">
                                                    <Button
                                                        onClick={this.closeticket}
                                                    >
                                                        Close
                                                    </Button>
                                                </div>
                                                <div className="popup-cancel-button">
                                                    <Button onClick={this.buttonOneOnCLick}>Cancel</Button>
                                                </div>

                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>

                        ) : null
                    }

                    <Button
                        disabled={this.props.isTicketBtnActive}
                        className='bottom-popup-button' variant="contained"
                        onClick={this.buttonCloseOnCLick}>
                        <img src={TicketBottomPopupTicketBulkClose}></img>Close
                    </Button>

                    {
                        this.state.isShowPopupClone ? (
                            <div className="button-popup-clone-container">
                                <div className='button-popup-clone'>
                                    {
                                        <div className='button-popup-clone-content'>
                                            <p className="button-popup-clone-content-close-tickets">DUPLICATES TICKETS</p>
                                            <p className="button-popup-clone-content-ask-question">Are you sure you want to duplicate these ticket?</p>
                                            <div className="popup-clone-button-section">
                                                <div className="popup-clone-button">
                                                    <Button
                                                    // onClick={this.clickclone} 
                                                    >Clone</Button>
                                                </div>
                                                <div className="popup-cancel-button">
                                                    <Button onClick={this.cloneButtonOnCLick}>Cancel</Button>
                                                </div>

                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>

                        ) : null
                    }


                    <Button
                        disabled={this.props.isTicketBtnActive}
                        className='bottom-popup-clone-button' variant="contained"
                        onClick={this.cloneButtonOnCLick}
                    >
                        <img className="clone-button" src={TicketBottomPopupTicketClone}></img>Clone
                    </Button>

                    {
                        this.state.isShowPopupDelete ? (
                            <div className="button-popup-two-container">
                                <div className='button-popup-two'>
                                    {
                                        <div className='button-popup-two-content'>
                                            <p className="button-popup-two-content-close-tickets">DELETE TICKETS</p>
                                            <p className="button-popup-two-content-ask-question">Are you sure you want to delete this ticket?</p>
                                            <div className="popup-close-button-section">
                                                <div className="popup-close-button">
                                                    <Button
                                                        onClick={this.deleteticket}
                                                    >Delete</Button>
                                                </div>
                                                <div className="popup-cancel-button">
                                                    <Button onClick={this.deleteButtonOnCLick}>Cancel</Button>
                                                </div>

                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        ) : null
                    }


                    <Button
                        disabled={this.props.isTicketBtnActive}
                        className='bottom-popup-button' variant="contained"
                        onClick={this.deleteButtonOnCLick}
                    >
                        <img src={TicketBottomPopupTicketBulkDelete}></img>Delete
                    </Button>


                </div>
            </div>
        )

    }
}

export default TicketListBtmPopup;
