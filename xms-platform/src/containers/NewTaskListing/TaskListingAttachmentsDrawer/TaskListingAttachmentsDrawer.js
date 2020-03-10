import React from "react";
import "./TaskListingAttachmentsDrawer.scss";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import removeAttachedFile from '../../../assets/icons/create-ticket/Group 11407.svg'
import dpfIcon from '../../../assets/icons/SVG/337946.png'
import axios from "axios";
import { baseUrl } from "../../../constants";
let wrapperRef;

const fileIcons = [{pdf: dpfIcon}]
const imageFormats = ['jpg', 'jpeg', 'jpg', 'bmp', 'png', 'svg','csv'];
const fileFormats = ['doc', 'docx', 'odt', 'txt', 'pdf', 'ppt', 'pptx','csv'];
class TaskListingAttachmentsDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.onChangehandler= this.onChangehandler.bind(this);
        this.state = {
            attachedFiles: [],
            id:this.props.selectedattachment.taskTitle,
            selectedfile:''
          
        }
    }

    componentDidMount() {

    }
    onChangehandler(selectedfile) {
    }
    handleUpdateTicket=async(e) =>{
        e.preventDefault();
        const requestBody = {
                query: `
                  mutation uploadTasks(
                     $file:GraphQLUpload,
                    ) 
                    {
                        uploadTasks(
                            file:$file,
                        )
                        {
                          id,
                          file
                        }
                    }
                `,
                variables: {
                    file:this.state.attachedFiles
                    //userId: userId
                  // user_id: this.state.user_id,
                  // team_id: Number(this.state.team_id),
                  // tags: this.state.tags,
                  // ticket_supportive: this.state.attachment,
                  // notify_others: notify_others
                }
            }
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
    }

    toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({ ...this.state, [side]: open });
    };

    closeEditDrawerHandler = () => {
        this.props.thisObj.setState({ isTaskAttachmentDrawerOpen: false })
    }

    // setWrapperRef = (node) => wrapperRef = node;



    removeAttachedFileHandler=(id)=> {
        let removeAttachedFile = this.state.attachedFiles;
        removeAttachedFile.splice(id, 1)
        this.setState({ attachedFiles: removeAttachedFile })
      }
    // removeAttachedFileHandler=(id)=> {
    //     let removeAttachedFile = this.state.attachedFiles;
    //     removeAttachedFile.splice(id, 1)
    //     this.setState({ attachedFiles: removeAttachedFile })
    // }
    fileAttachmentHandler =event=> {
        let imageList = [];
        let extension = null;
        for(let i = 0; i < event.target.files.length; i++){
          extension = event.target.files[i].name.split('.')[1];
          if( imageFormats.includes(extension) ){
            this.imageToBase64Converter(event.target.files[i], result => {
              imageList = [...imageList, result]
              this.setState({
                attachedFiles: [...this.state.attachedFiles, ]
              })
            })
          } else {
            this.setState({
              attachedFiles: [...this.state.attachedFiles, event.target.files[i]]
            })
          }
        }
      }
      imageToBase64Converter =(image, callback) =>{
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = ()=> {
          callback(reader.result)
        }
      }
    listingAttachmentsSidePanel = (side, ticket, index) => (
        <div className="taskListingAttachmentContainer" role="presentation">
            <div className="edit-tkt-sidebar-container">
                <div className="edit-tkt-sidebar-header">
                    <div className="attchmentsHeading  edit-tkt-heading">FILES FOR {"<"}<span>{this.state.id}</span>{">"}</div>
                </div>
                <span className='AttachmentsCaption'>Attachments</span>
                <div className='uploadButtonAndPreviewWrapper'>
                    <div className='attachementFilesContainer'>
                    {this.state.attachedFiles!=null || this.state.attachedFiles!=undefined ?
                        this.state.attachedFiles.map((file, index) => {
                        return (
                        <div className='attached-file-template'>
                            <img className='attached-file-remove' src={removeAttachedFile} alt=''onClick={()=> this.removeAttachedFileHandler(index)}/>
                            {
                            file.base64 ? 
                            <img src={file.base64} alt='file'/> 
                            : 
                            file ? 
                                <img src={ fileIcons.map(icon=> icon[file.name.split('.')[1]]) } alt=''/>
                            : null
                            }
                            
                        </div>
                        )
                        }): null
                    }
                    </div>
                    <div className='fielAttachementButton'>
                    <Button className='create-ticket-file-attach-button'>
                        <input
                          type='file'
                          className="custom-attach-file-input "
                          id="inputGroupFile01"
                          //onChange={this.fileAttachmentHandler}
                          onChange={(e)=>this.onChangehandler(e.target.files)}

                          multiple={true}

                        />
                        <p className="drag-attach-text">Drag & drop to attach a file, <br />or <span>click + to choose</span></p>
                      </Button>     
                    </div>
                </div>


                <div>
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
            <div className="taskListingAttachement">
                <Drawer anchor="right" open={this.props.isTaskAttachmentDrawerOpen} onClose={this.toggleDrawer('right', false)} className="tckt-lst-edit-drawer" >
                    <div className="editdrawer d-flex">
                        <div className="drawer-full-width" onClick={this.closeEditDrawerHandler}></div>
                        {this.listingAttachmentsSidePanel("right")}
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default TaskListingAttachmentsDrawer;