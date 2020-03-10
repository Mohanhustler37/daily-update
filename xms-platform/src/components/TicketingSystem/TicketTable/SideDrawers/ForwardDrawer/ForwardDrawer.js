import React, { Component } from "react";
import "./ForwardDrawer.scss";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItemImage from "../../../../../assets/images/profile.png";
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import { Editor, EditorState } from 'draft-js';
import AttachmentIcon from "../../../../../assets/icons/01-10-2019/Icon metro-attachment.svg";
import FontIcon from "../../../../../assets/icons/01-10-2019/Icon awesome-font.svg";
import DeleteSweepIcon from "../../../../../assets/icons/01-10-2019/Icon material-delete-sweep.svg";
import { baseUrl } from "../../../../../constants";
class ForwardDrawer extends Component {
    constructor(props) {
        super()
        this.state = {
            ticket_type: '',
            name: '',
            ticket_description: '',
            priority: '',
            forward: '',
            tags: '',
            attachment: '',
            notify_others: '',
            user_id: 1,
            team_id: 1,
            open: false,
            forwardOpen: false,
            editorState: EditorState.createEmpty()
        }
        this.onChange = (editorState) => this.setState({ editorState });
    }


    handleChange = event => {
        this.setState({ priority: event.target.value });
    };

    handleOpenClose = () => {
        this.setState({ open: !this.state.open });
    };

    TicketHandleChange = event => {
        this.setState({ forward: event.target.value });
    };

    TicketHandleOpenClose = () => {
        this.setState({ forwardOpen: !this.state.forwardOpen });
    };
    submit = event => {
        event.preventDefault();
        const id = this.state.id;
        const userId = this.state.userId;

        // if (email.trim().length === 0 || password.trim().length === 0) {
        //   return;
        // }

        let requestBody = {
            query: `
          mutation {
            forwardticket(id: ${id}, userId: ${id}) {
                id
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
                JSON.stringify(resData)
                console.log(resData);
            })
            .catch(err => {
                console.log(err);
            });
    };


    render() {
        return (
            <div className="forward-ticket-container">
                <div className="forward-ticket-header-text">
                    <p>FORWARD TICKET</p><span>{this.props.value}</span>
                </div>
                <div className="forward-ticket-text-editor-container">
                    <p>From</p>
                    <div className="forward-ticket-from-field">
                        <FormControl>
                            <InputLabel htmlFor="demo-controlled-open-select">Choose</InputLabel>
                            <div className="forward-ticket-menu-item">
                                <Select
                                    open={this.state.open}
                                    onClose={this.handleOpenClose}
                                    onOpen={this.handleOpenClose}
                                    value={this.state.priority}
                                    onChange={e => this.setState({ priority: e.target.value })}
                                >


                                    <MenuItem value="1" className="forward-ticket-menu-list">
                                        <img src={MenuItemImage}></img>
                                        <div className="forward-ticket-menu-list-name">
                                            <p className="first-text">Assign To</p>
                                            <p className="second-text">Anil</p>
                                        </div>
                                    </MenuItem>

                                </Select>
                            </div>
                        </FormControl>
                    </div>
                    <p className="forward-ticket-to">To</p>
                    <div className="forward-ticket-editor-section">
                        <div className="forward-ticket-editor-input-field">
                            <div className="create-task-title-img">
                                {/* <SearchIcon /> */}
                                {/* <img src={TaskTitleImage}></img> */}
                            </div>
                            <InputBase
                                placeholder="Task title"
                                className="search-input"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            <div className="forward-ticket-button">
                                <Button className="forward-ticket-cc-button">CC</Button>
                                <Button className="forward-ticket-bcc-button">BCC</Button>
                            </div>



                            {/* <img src={TaskTitleColorIcon}></img> */}
                        </div>
                        <div className="forward-ticket-text-editor-field">
                            <Editor editorState={this.state.editorState} onChange={this.onChange} />
                        </div>
                        <div className="forward-ticket-text-editor-footer">
                            <Button><img src={AttachmentIcon}></img></Button>
                            <Button><img src={FontIcon}></img></Button>

                            <div className="forward-ticket-footer-drop-down">
                                <FormControl>
                                    <InputLabel htmlFor="demo-controlled-open-select">Ticket Type</InputLabel>
                                    <div className="forward-ticket-footer-menu-item">
                                        <Select
                                            open={this.state.forwardOpen}
                                            onClose={this.TicketHandleOpenClose}
                                            onOpen={this.TicketHandleOpenClose}
                                            value={this.state.forward}
                                            onChange={e => this.setState({ forward: e.target.value })}
                                        >


                                            <MenuItem value="1">service Request</MenuItem>
                                        </Select>
                                    </div>
                                </FormControl>
                            </div>

                            <Button className="forward-ticket-save-button">saved</Button>
                            <Button><img src={DeleteSweepIcon}></img></Button>
                        </div>
                    </div>
                </div>

                <div className="forward-ticket-break-section"></div>
                <div className="forward-ticket-cancel-sent-button">
                    <Button className="forward-ticket-cancel-button">Cancel</Button>
                    <Button className="forward-ticket-sent-button" onClick={this.submit}>Sent</Button>
                </div>
            </div>
        )
    }
}
export default ForwardDrawer;
