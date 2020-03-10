import React from "react";
import "./HabitsCommentsDrawer.scss";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import hashIcon from '../../../../assets/icons/SVG/Icon-feather-hash.svg'
import atTheRateIcon from '../../../../assets/icons/SVG/Icon-awesome-at.svg'
import hyperLinkIcon from '../../../../assets/icons/SVG/Icon-link.svg'
import { getUserById, addComment, } from "./HabitCommentDrawerQuery"
let wrapperRef;

class TaskCommentsDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attachedFiles: [],
            id:this.props.selectedcomment,
            habitid:this.props.selectedcomment.id,
            users:[],
            logedUser: {},
            comments:[]
        }
        
    }
    componentDidMount(){
      const client = this.props.thisObj.props.client;
      getUserById(client,res=>{
        this.setState({ logedUser: res.data.getUserById.id })
            return res;
      })
    }
    handleUpdateTicket = async (e,userId) =>{
        e.preventDefault();
        const client = this.props.thisObj.props.client;
        let variables = {
            sourceFor:"habits",
            sourceId: 1,
            userId:userId,
            comments: this.state.comments,
            //userId: userId
          // user_id: this.state.user_id,
          // team_id: Number(this.state.team_id),
          // tags: this.state.tags,
          // ticket_supportive: this.state.attachment,
          // notify_others: notify_others
        }

        await addComment(client,variables,res=>{
            return res;
        })
          this.closeEditDrawerHandler();
        
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
      }
    closeEditDrawerHandler = () => {
        this.props.thisObj.setState({ isHabitsCommentsDrawerOpen: false })
    }
    selectPrimary=(data)=>{
        this.setState({primarySelect:data})
    }

    setWrapperRef = (node) => wrapperRef = node;

    listingAttachmentsSidePanel = (side, ticket, index) => (
        <div className="taskListingAttachmentContainer" role="presentation">
            <div className="edit-tkt-sidebar-container">
                <div className="edit-tkt-sidebar-header">
                    <div className="attchmentsHeading  edit-tkt-heading">COMMENTS FOR {"<"}<span>{this.state.id}</span>{">"}</div>
    
                    </div>
                <div className='uploadButtonAndPreviewWrapper'>
                    <div className='textAreaAndIconWrapper'>
                        <TextareaAutosize className='tasksCommentsTextArea' name="comments"  onChange={this.changeHandler} value={this.state.comments} rowsMax={3}  aria-label="minimum height" placeholder="Write your comment here!" />
                  
                        <div className='textAreaFooterIcons'>
                            <img src={hashIcon} alt='hashIcon' />
                            <img src={atTheRateIcon} alt='hashIcon' />
                            <img src={hyperLinkIcon} alt='hashIcon' />
                        </div>
                    </div>

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
                                onClick={(e) => this.handleUpdateTicket(e,this.state.logedUser)}
                            >
                                Send
                            </Button>
                        </div>
                    </div>
            </div>
        </div>
    );
    render() {
        return (
            <div className="taskListingAttachement">
                <Drawer className="tckt-lst-edit-drawer" anchor="right" open={this.props.isHabitsCommentsDrawerOpen} >
                    <div className="editdrawer d-flex">
                        <div className="drawer-full-width" onClick={this.closeEditDrawerHandler}></div>
                        {this.listingAttachmentsSidePanel("right")}
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default TaskCommentsDrawer;