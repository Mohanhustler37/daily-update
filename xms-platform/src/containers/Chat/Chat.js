import React from 'react';

import SearchImg from '../../assets/icons/chat/feather-search.svg';
import FvImg from '../../assets/icons/chat/material-favorite-border.svg';
import ChatImg from '../../assets/icons/chat/metro-attachment.svg';
import ProfileImg from '../../assets/icons/chat/metro-profile.svg';
import KeyboardImg from '../../assets/icons/chat/material-keyboard.svg';
import GiftImg from '../../assets/icons/chat/feather-gift.svg';
import EyeImg from '../../assets/icons/chat/awesome-eye-slash.svg';
import ClearImg from '../../assets/icons/chat/material-clear-all.svg';
import CurvyImg from '../../assets/icons/15-10-2019/Path 184.svg';
import Profile from "../../assets/images/profile.png";
import ExitImg from "../../assets/icons/chat/material-exit-to-app.svg";
import DeleteImg from "../../assets/icons/chat/material-delete-sweep.svg";
import AwesomeLayer from "../../assets/icons/chat/Icon awesome-layer-group.svg";
import InviteIcon from "../../assets/icons/chat/Icon feather-plus.svg";
import ChatMoreEllipsis from "../../assets/icons/chat/awesome-ellipsis-h.svg";
import TextareaAttach from "../../assets/icons/chat/Icon metro-attachment-2.svg";
import TextareaSmileIcon from "../../assets/icons/chat/Icon material-tag-faces.svg";
import ClosePopup from "../../assets/icons/chat/ios-close.svg";
import Featherright from "../../assets/icons/chat/feather-chevron-right.svg";
import FeatherrightGrey from "../../assets/icons/chat/feather-chevron-right-grey.svg";
import FeatherCamera from "../../assets/icons/chat/feather-camera.svg";
import SendMessage from "../../assets/icons/chat/send.svg";
import moment from "moment";

import More1 from "../../assets/icons/chat/more-1.svg";
import More2 from "../../assets/icons/chat/more-2.svg";
import More3 from "../../assets/icons/chat/more-3.svg";
import More4 from "../../assets/icons/chat/more-4.svg";
import More5 from "../../assets/icons/chat/more-5.svg";
import More6 from "../../assets/icons/chat/more-6.svg";
import More7 from "../../assets/icons/chat/more-7.svg";
import More8 from "../../assets/icons/chat/more-8.svg";
import BottomLeft from "../../assets/icons/chat/bottom-left.svg";
import TopRight from "../../assets/icons/chat/top-right.svg";
import TopLeft from "../../assets/icons/chat/top-left.svg";
import MainLayout from '../MainLayout/MainLayout';
import Header from '../Header/Header';
import io from "socket.io-client";
import { baseUrl } from '../../constants';
import Checkbox from '@material-ui/core/Checkbox';
import history from "../../Routes/history";
import './Chat.scss';
import { GetAllCompanyUserContacts, GetUserMessages, SendUserMessage, GetAllGroupsBasedOnCompany, AddGroup, GetGroupMessages, GetAllConversation, SendGroupMessage, SearchUser } from './ChatQueries.js';


const getAllConversation = (client, id, callback) => {
  client
    .query({ query: GetAllConversation, variables: { id: id} })
    .then(res => {
      callback(res);
    })
}


const getUserConatcts = (client, id, callback) => {
  const userId = localStorage.getItem("id");
  client
    .query({ query: GetAllCompanyUserContacts, variables: { id: id, user: userId.toString() } })
    .then(res => {
      callback(res);
    })
}

const getMessages = (client, fromUserId, toUserId, callback) => {
  client
    .query({ query: GetUserMessages, variables: { toUserId: toUserId, fromUserId: fromUserId } })
    .then(res => {
      callback(res);
    })
}

const getAllGroupsBasedOnCompany = (client, companyId, callback) => {
  client
    .query({ query: GetAllGroupsBasedOnCompany, variables: { companyId: companyId } })
    .then(res => {
      callback(res);
    })
}

const getGroupMessages = (client, groupId, callback) => {
  client
    .query({ query: GetGroupMessages, variables: { groupId: groupId } })
    .then(res => {
      callback(res);
    })
}

const addNewGroup = async (client, variables, callback) => {
  await client
    .mutate({ mutation: AddGroup, variables: variables })
    .then(res => {
      callback(res);
    })
}

const sendUserMessage = async (client, variables, callback) => {
  await client
    .mutate({ mutation: SendUserMessage, variables: variables })
    .then(res => {
      callback(res);
    })
}

const sendGroupMessage = async (client, variables, callback) => {
  await client
    .mutate({ mutation: SendGroupMessage, variables: variables })
    .then(res => {
      callback(res);
    })
}

const searchUser = (client, variables, callback) => {
  client
    .mutate({ mutation: SearchUser, variables: variables })
    .then(res => {
      callback(res);
    })
}

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.messagesEnd = React.createRef();
    this.addNewGroupName = React.createRef();
    this.addNewGroupDescription = React.createRef();
    this.addNewGroupImage = "";
    this.state = {
      loginUserId: '',
      loginUserFName: '',
      loginUserLName: '',
      chatWithFName: '',
      chatWithLName: '',
      toUserId: '',
      activeUserToChat: null,
      toUserName: '',
      textMessage: '',
      usersList: [],
      messages: [],
      showAddGroupScreen: false,
      addGroupStage: 1,
      currentSideTab: "chats",
      filteringOption: "Recent Chat",
      people: [],
      groups: [],
      peopleSearchList : [],
      peopleSearchResult : [],
      selectedPeopleList : []
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('jwtToken');
    if (token === null || token === undefined || token === '') {
      history.push('/');
    }
    this.didMountHandler()
  }

  didMountHandler = async() => {
    let client = this.props.client;
    let loginUserDetails = JSON.parse(localStorage.getItem("loginUserDetails"));

    if (loginUserDetails) {

      await this.setState({
        loginUserId: loginUserDetails.userId,
        companyId: loginUserDetails.companyId,
        loginUserFName: loginUserDetails.firstName,
        loginUserLName: loginUserDetails.lastName,
      });

      this.fetchGroups();
      this.fetchUserConatcts();
      this.fetchAllUserChats();
      this.initSocket(parseInt(this.state.loginUserId));
      document.addEventListener('keypress', this.sendMessageHandler);

    } else {
      history.push('/');
    }

  }

  fetchGroups = () => {
    getAllGroupsBasedOnCompany(this.props.client, this.state.companyId, response => {
      if (response.data){
        this.setState({
          groups : response.data.getAllGroupsBasedOnCompany
        });
      }
    })
  }

  fetchGroupMessages = (group) => {
    getGroupMessages(this.props.client, group.id.toString(), response => {
      if (response.data){
        this.setState({
          messages : response.data.getGroupMessages,
          activeUserToChat : group,
          chatWithFName : group.name,
          chatWithLName : '',
          toUserId: group.id
        });
        this.messagesEnd.current.scrollTop = this.messagesEnd.current.scrollHeight;
      }
    })
  }

  fetchUserConatcts = () => {
    getUserConatcts(this.props.client, this.state.companyId, response => {
      if (response.data){
        this.setState({
          people: response.data.getAllCompanyUserMessages
        });
      }
    });
  }

  serachPeopleForAddingInGroup = (searchText) => {
    let variables = {
      username : searchText,
      emailIs : '',
      companyId : this.state.companyId
    }
    searchUser(this.props.client, variables, response => {
      if (response.data){
        let people = response.data.searchUser;
        people.map((person)=>{
          person["selected"] = false;
        })
        this.setState({
          peopleSearchResult: people
        });
      }
    });
  }

  fetchAllUserChats = () => {
    let client = this.props.client;
    getAllConversation(client, this.state.loginUserId, response => {
      if (response.data){
        this.setState({
          usersList: response.data.getAllConversation,
          activeUserToChat: response.data.getAllConversation[0]
        });
      }
      this.getUserMsgs(this.state.usersList[0]);
    });
  }

  initSocket = async (loginUserId) => {
    const socket = await io.connect(baseUrl.socket, {
      query: { id: loginUserId }
    });
    // await localStorage.setItem('socketId', socket.id);

    setTimeout(() => {
      if(socket.id) {
        localStorage.setItem('socketId', socket.id);
      } else {
        setTimeout(() => {
          if(socket.id) {
            localStorage.setItem('socketId', socket.id);
          } else {
            setTimeout(() => {
              localStorage.setItem('socketId', socket.id);
            }, 1000);
          }
        }, 500);
      }
    }, 500);

    //Events
    socket.on('message', (data) => {
      console.log('Message_EVENT_OCCURED', data)
      if (this.state.toUserId == data.message.fromUserId){
        this.setState({ messages: [...this.state.messages, data.message] });
        this.messagesEnd.current.scrollTop = this.messagesEnd.current.scrollHeight;
      }
    });
  }

  getUserMsgs = (user) => {
    let client = this.props.client
    if(user)
      getMessages(client, this.state.loginUserId.toString(), user.id.toString(), response => {
        this.setState({
          messages: response.data.getUserMessages,
          toUserId: user.id,
          chatWithFName: user.firstName,
          chatWithLName: user.lastName,
          activeUserToChat: user
        });
        this.messagesEnd.current.scrollTop = this.messagesEnd.current.scrollHeight;
      });
  }

  changeCurrentTab = (tab) => {
    this.setState({
      currentSideTab: tab
    });
    if(tab=="chats"){
      this.getUserMsgs(this.state.usersList[0]);
    } else if (tab=="groups") {
      if(this.state.groups.length)
        this.fetchGroupMessages(this.state.groups[0]);
    } else {
      if(this.state.people.length)
        this.getUserMsgs(this.state.people[0]);
    }
  }

  changeFilteringOption = (event) => {
    this.setState({
      filteringOption: event.target.value
    });
  }

  toggleAddGroupPopup = (value) => {
    this.setState({
      addGroupStage : 1,
      showAddGroupScreen : value,
      selectedPeopleList : [],
      peopleSearchList : [],
      peopleSearchResult : []
    });
    if(value==true){
      let peopleSearchList = this.state.peopleSearchList;
      this.addNewGroupName.current.value = "";
      this.addNewGroupDescription.current.value = "";
      this.state.people.map((person)=>{
          let  p = person;
          peopleSearchList.push({
            ...p,
            "selected" : false,
            "privileges" : {
              "read" : false,
              "write" : false,
              "delete" : false
            }
          });
      })

      this.setState({
        peopleSearchList : peopleSearchList
      });
    }
  }

  gotoNextStage = () => {
    if(this.state.addGroupStage==1){
        if(this.addNewGroupName.current.value==false){
          alert("Enter group name");
          return false;
        }
    } else if(this.state.addGroupStage==2) {
      this.state.selectedPeopleList = [];
      this.state.peopleSearchList.map((person)=>{
        if(person.selected==true){
          this.state.selectedPeopleList.push(person);
        }
      })
      if(this.state.selectedPeopleList.length==0){
        alert("At least one user is required to create a group");
        return false;
      }
    }

    if (this.state.addGroupStage < 3) {
      let stage = this.state.addGroupStage + 1;
      this.setState({
        addGroupStage: stage
      })
    } else {
      this.saveGroup();
    }
  }

  saveGroup = () => {
    let selectedUsers = [];
    this.state.peopleSearchList.map((person)=>{
      if(person.selected==true){
        selectedUsers.push({
          id : person.id, privileges : person.privileges
        });
      }
    });

    let variables = {
      name : this.addNewGroupName.current.value,
      type : "private",
      description : this.addNewGroupDescription.current.value,
      companyId : this.state.companyId,
      users : selectedUsers,
      icon : this.addNewGroupImage
    }

    addNewGroup(this.props.client, variables, response => {
      console.log("addNewGroup ",response);
      if (response.data){
        this.toggleAddGroupPopup(false);
        this.fetchGroups();
      }
    })

  }

  gotoPrevStage = () => {
    if (this.state.addGroupStage > 1) {
      let stage = this.state.addGroupStage - 1;
      this.setState({
        addGroupStage: stage
      })
    }
  }


  sendMessageHandler = async (event,onSendClick) => {
    let toUserId = this.state.toUserId;
    if ( (!!event && event.keyCode == 13) || onSendClick==true) {

      if (!this.state.textMessage) {
        console.log('Please type something before press enter');

      } else if (!toUserId) {
        alert('Select user to send message');

      } else {


        if(this.state.activeUserToChat.users){

          let variables = {
              groupId : this.state.activeUserToChat.id.toString(),
              fromUserId : this.state.loginUserId.toString(),
              text : this.state.textMessage
          }
          await sendGroupMessage(this.props.client, variables, response => {
            if (response){
              this.setState({
                messages: [...this.state.messages, response.data.sendGroupMessage],
                textMessage: ''
              });
              this.messagesEnd.current.scrollTop = this.messagesEnd.current.scrollHeight;
            }
          });

        } else {

          let variables = {
            fromUserId: this.state.loginUserId.toString(),
            toUserId: toUserId.toString(),
            text: this.state.textMessage,
            socketId: localStorage.getItem('socketId')
          }
          await sendUserMessage(this.props.client, variables, response => {
            if (response){
              this.setState({
                messages: [...this.state.messages, response.data.sendMessage],
                textMessage: ''
              });
              this.messagesEnd.current.scrollTop = this.messagesEnd.current.scrollHeight;
            }
          });

        }

      }
    }
  }


  updatePersonAsSelected = (event,person) => {
    let peopleList = [...this.state.peopleSearchList]
    peopleList.map( p => {
      if(p.id==person.id){
        p.selected = event.target.checked;
      }
    });
    this.setState({
      peopleSearchList: peopleList
    });
  }

  updatePersonAsSelectedFromResultList = (event,person) => {
    let peopleSearchList = [...this.state.peopleSearchList]
    peopleSearchList.map( p => {
      if(p.id==person.id){
        p.selected = event.target.checked;
      }
    });
    let peopleSearchResult = [...this.state.peopleSearchResult]
    peopleSearchResult.map( p => {
      if(p.id==person.id){
        p.selected = event.target.checked;
      }
    });
    this.setState({
      peopleSearchList: peopleSearchList,
      peopleSearchResult : peopleSearchResult
    });
  }

  updatePersonPrivilege = (event,person,privilege) => {
    let peopleList = [...this.state.peopleSearchList]
    peopleList.map( p => {
      if(p.id==person.id){
        p.privileges[privilege] = event.target.checked;
      }
    });
    this.setState({
      peopleSearchList: peopleList
    });
  }

  searchUserForAdding = (event) => {

    let searchText = event.target.value; // this is the search text
    if(this.timeout) clearTimeout(this.timeout);

    setTimeout(function(){
       if(!!searchText) {
         this.serachPeopleForAddingInGroup(searchText);
       } else {
         this.setState({
           peopleSearchResult : []
         })
       }
     }.bind(this),500);

  }

  converImageToBinaryString = (event) => {

    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function() {}
    reader.readAsDataURL(file);
    setTimeout(function(){
       this.setState({
         addNewGroupImage : reader
       })
     }.bind(this),500);

  }



  secondSidebar = () => {
    return (
      <div id="sideBarConatine">
        <div id="sideHeader">
          <h3>Chat</h3>
          <div id="userProfile">
            <img src={Profile} alt="" />
            <div>
              <label>{this.state.loginUserFName} {this.state.loginUserLName}</label>
              <label>Tester</label>
            </div>
            <span className="userStatus active"></span>
          </div>

          <div className="searchBox">
            <input type="text" name="searchChat" placeholder="Search people, chats & groups" />
            <img src={SearchImg} alt="" />
          </div>

          <div id="chatTabsGrid">
            <div id="chatTab"
              className={this.state.currentSideTab == "chats" ? "active" : ""}
              onClick={() => this.changeCurrentTab('chats')}>
              <span></span>
              <span>Chats</span>
            </div>
            <div id="contactTab"
              className={this.state.currentSideTab == "contacts" ? "active" : ""}
              onClick={() => this.changeCurrentTab('contacts')}>
              <span></span>
              <span>Contacts</span>
            </div>
            <div id="groupTab"
              className={this.state.currentSideTab == "groups" ? "active" : ""}
              onClick={() => this.changeCurrentTab('groups')}>
              <span></span>
              <span>Groups</span>
            </div>
          </div>

          <div id="chatFiltering">
            <label>{this.state.filteringOption}</label>
            <label><span>+ ADD</span>
              <div id="addOptionsDD">
                <img src={TopLeft} />
                <label onClick={() => this.toggleAddGroupPopup(true)}><img src={AwesomeLayer} alt="" />Create Group</label>
                <label><img src={InviteIcon} alt="" />Invite New</label>
              </div>
            </label>
          </div>
        </div>

        <div id="sideBottom">
          <div className={this.state.currentSideTab == "chats" ? "displayBlock" : "displayNone"} style={{"padding-bottom":"30px"}} >
            {
              (this.state.usersList.length>0) ? this.state.usersList.map(person => (
                <div className="userProfileTag" onClick={() => this.getUserMsgs(person)}
                  style={{ 'backgroundColor': (this.state.activeUserToChat ? this.state.activeUserToChat.id == person.id : '') ? 'rgba(78, 88, 169, 0.2)' : 'inherit' }} >
                  <div className='userPrifileAndStaus'>
                    <img src={Profile} alt="" />
                    <span className="userStatus active"></span>
                  </div>
                  <div>
                    <label> <span> {person.firstName} {person.lastName}</span> <span>{person.lastActive}</span> </label>
                    <label>{person.description}</label>
                  </div>
                </div>
              )) : null
            }
          </div>
          <div className={this.state.currentSideTab == "contacts" ? "displayBlock" : "displayNone"} style={{"padding-bottom":"30px"}} >
            {
              (this.state.usersList.length>0) ? this.state.people.map(contact => (
                <div className="userProfileTag" onClick={() => this.getUserMsgs(contact)}
                 style={{ 'backgroundColor': (this.state.activeUserToChat ? this.state.activeUserToChat.id == contact.id : '') ? 'rgba(78, 88, 169, 0.2)' : 'inherit' }}>
                  <div className='userPrifileAndStaus'>
                    <img src={Profile} alt="" />
                    <span className="userStatus active"></span>
                  </div>
                  <div>
                    <label> <span> {contact.firstName} {contact.lastName} </span> <span>{contact.lastActive}</span> </label>
                    <label>{contact.description}</label>
                  </div>
                </div>
              )) : null
            }
          </div>
          <div className={this.state.currentSideTab == "groups" ? "displayBlock" : "displayNone"} style={{"padding-bottom":"30px"}} >
            <div class="grpHdrs">FAVORITES</div>
            <div class="grpHdrs">CHATS</div>
            {
              (this.state.groups.length>0) ? this.state.groups.map(group => (
                <div className="userProfilechatsTag" onClick={() => this.fetchGroupMessages(group)}
                style={{ 'backgroundColor': (this.state.activeUserToChat ? this.state.activeUserToChat.id == group.id : '') ? 'rgba(78, 88, 169, 0.2)' : 'inherit' }} >
                  <img src={group.icon} alt={group.id} />
                  <div>
                    <label> <span> {group.name} </span> <span>{moment(group.lastLogin).format("LT")}</span> </label>
                    <label>{group.description}</label>
                  </div>
                  <span className="userStatus active"></span>
                </div>
              )) : null
            }
          </div>
        </div>
      </div>
    )
  }

  chatBodySection = () => {
    let { loginUserId, toUserId, chatWithFName, chatWithLName, messages, loginUserFName, textMessage, loginUserLName } = this.state;
    return (
      <>
        <Header />
        <div className="new-sub-header-section">
          {
            toUserId ? (
              <div className="left">
                <label className="m-0 chatEntity">{chatWithFName + ' ' + chatWithLName}</label>
                <label className="m-0 chatEntityDescr"><span className="userStatus active"></span>Online</label>
              </div>
            ) : null
          }

          <div className="right">
            <span id="search-i"></span>
            <span id="heart-i"></span>
            <span id="attach-i"></span>
            <span id="addu-i"></span>
            <span id="moreoptns-i">
              <div id="moreoptnsDropdown">
                <img src={TopRight} />
                <label className="m-0">
                  <span className="m-0"><img
                    src={FvImg} alt="" />Add to favorite</span>
                  <span className="m-0">shift+f</span>
                </label>
                <label className="m-0">
                  <span className="m-0"><img src={ProfileImg} alt="" />View profile</span>
                  <span className="m-0"></span>
                </label>
                <label className="m-0">
                  <span className="m-0"><img src={ChatImg} alt="" />Attachments</span>
                  <span className="m-0"></span>
                </label>
                <label className="m-0">
                  <span className="m-0"><img src={GiftImg} alt="" />What's new</span>
                  <span className="m-0 userStatus inactive">2</span>
                </label>
                <label className="m-0">
                  <span className="m-0"><img src={KeyboardImg} alt="" />Shortcuts</span>
                  <span className="m-0">ctrl+/</span>
                </label>
                <label className="m-0">
                  <span className="m-0"><img src={EyeImg} alt="" />Hide Chat</span>
                  <span className="m-0"></span>
                </label>
                <label className="m-0">
                  <span className="m-0"><img src={ClearImg} alt="" />Clear Chat</span>
                  <span className="m-0"></span>
                </label>
                <label className="m-0" style={{ display: this.state.currentSideTab == "groups" ? 'block' : 'none' }}>
                  <span className="m-0"><img src={ExitImg} alt="" />Exit Group</span>
                  <span className="m-0"></span>
                </label>
                <label className="m-0" style={{ display: this.state.currentSideTab == "groups" ? 'block' : 'none' }}>
                  <span className="m-0"><img src={DeleteImg} alt="" />Delete Group</span>
                  <span className="m-0"></span>
                </label>
              </div>
            </span>
          </div>
        </div>

        <div className="chat-area-section">
          <div ref={this.messagesEnd} >
            {
              messages.map(message => (
                <div className={`chat-area-body d-flex ${loginUserId == message.fromUserId ? 'row-reverse' : ''}`}>
                  <div className="chat-area-profile">
                    <img src={Profile} alt=""></img>
                    <label>{loginUserId == message.fromUserId ? loginUserFName + ' ' + loginUserLName : chatWithFName + ' ' + chatWithLName}</label>
                  </div>

                  <div className="chat-area-message">
                    {message.text}
                  </div>
                </div>
              ))
            }
          </div>
          <div className="textAreaSection">
            <div>
              <span className="more-icon d-flex align-items-center justify-content-center">
                <img src={ChatMoreEllipsis} alt="ChatMoreEllipsis"></img>
                <div id="moreOptions">
                  <img src={BottomLeft} />
                  <div className="block block-1">
                    <img src={More1} />
                    <span>Create<br />Ticket</span>
                  </div>
                  <div className="block block-2">
                    <img src={More2} />
                    <span>check ticket<br />status</span>
                  </div>
                  <div className="block block-3">
                    <img src={More3} />
                    <span>update<br />Ticket</span>
                  </div>
                  <div className="block block-4">
                    <img src={More4} />
                    <span>Create<br />task</span>
                  </div>

                  <div className="block block-5">
                    <img src={More5} />
                    <span>task<br />status</span>
                  </div>
                  <div className="block block-6">
                    <img src={More6} />
                    <span>send<br />sms</span>
                  </div>
                  <div className="block block-7">
                    <img src={More7} />
                    <span>Create<br />habbit</span>
                  </div>
                  <div className="block block-8">
                    <img src={More8} />
                    <span>apply<br />macro</span>
                  </div>
                </div>
              </span>
              <div>
                <img className="text-area-smile" src={TextareaSmileIcon} alt="TextareaAttach"></img>
                <input type="text" value={textMessage}
                onChange={event => this.setState({ textMessage: event.target.value })}
                placeholder='Type your message here' />
                <img className="text-area-attach" src={TextareaAttach} alt="TextareaAttach" ></img>
              </div>
              <span className="more-icon send-icon d-flex align-items-center justify-content-center">
                <img src={SendMessage} alt="SendMessage" onClick={() => this.sendMessageHandler(null,true)} ></img>
              </span>
            </div>
          </div>
        </div>

        <div id="addGroupScreen" className={this.state.showAddGroupScreen == true ? "displayBlock" : "displayNone"}>
          <div id="addNewGroupContainer">

            <div id="addNewgroupHeader">
              <label>
                <img className={this.state.addGroupStage>1 ? "displayBlock" : "displayNone"} src={FeatherrightGrey} onClick={()=>this.gotoPrevStage()} alt=""/>New Group Chat
              </label>
              <img src={ClosePopup} alt="" onClick={()=>this.toggleAddGroupPopup(false)} />
            </div>
            <div id="navHeader">
              <div className={`state stage1 ${this.state.addGroupStage==1 ? 'current' : '' } ${this.state.addGroupStage>1 ? 'completed' : '' }`}>
                <span className="img"></span>
                <span>Group Details</span>
              </div>
              <div className="divider"></div>
              <div className={`state stage2 ${this.state.addGroupStage==2 ? 'current' : '' } ${this.state.addGroupStage>2 ? 'completed' : '' }`}>
                <span className="img"></span>
                <span>Add People</span>
              </div>
              <div className="divider"></div>
              <div className={`state stage3 ${this.state.addGroupStage==3 ? 'current' : '' }`}>
                <span className="img"></span>
                <span>Permissions</span>
              </div>
            </div>
            <div className="content">
              <div className={this.state.addGroupStage==1 ? "displayBlock" : "displayNone"}>
                <div className="groupDetails">
                  <div>
                    <img src={FeatherCamera} alt=""/>
                    <span>ADD PICTURE</span>
                    <input type="file" onChange={(event)=>this.converImageToBinaryString(event)}/>
                  </div>
                  <div>
                    <input type="text" placeholder="Group name" ref={this.addNewGroupName} />
                    <textarea placeholder="Short description" ref={this.addNewGroupDescription} ></textarea>
                  </div>
                </div>
              </div>
              <div className={this.state.addGroupStage==2 ? "displayBlock" : "displayNone"}>
                    <div className="searchBox">
                      <input type="text" name="searchChat" placeholder="Search people"
                      onChange={(event)=>this.searchUserForAdding(event)}/>
                      <img src={SearchImg} alt="search" />
                    </div>
                    {
                      (this.state.peopleSearchResult.length==0) ? this.state.peopleSearchList.map((person)=>(
                        <div className="userRow">
                          <label><img src={Profile} alt=""/>{person.firstName} {person.lastName}</label>
                          <Checkbox color="primary" value={person.id+"s"} checked={person.selected}
                          onChange={(event)=>this.updatePersonAsSelected(event,person)}/>
                        </div>
                      ))
                      :
                      this.state.peopleSearchResult.map((person)=>(
                        <div className="userRow">
                          <label><img src={Profile} alt=""/>{person.firstName} {person.lastName}</label>
                          <Checkbox color="primary" value={person.id+"p"} checked={person.selected}
                          onChange={(event)=>this.updatePersonAsSelectedFromResultList(event,person)}/>
                        </div>
                      ))
                    }
              </div>
              <div className={this.state.addGroupStage==3 ? "displayBlock" : "displayNone"}>
                    <div className="userRow permissions">
                      <label>PEOPLE</label>
                      <label>ADD/DELETE</label>
                      <label>WRITE</label>
                      <label>READ</label>
                    </div>
                    {
                      (this.state.selectedPeopleList.length>0) ? this.state.selectedPeopleList.map((person)=>(
                          <div className="userRow">
                            <label><img src={Profile} alt=""/>{person.firstName} {person.lastName}</label>
                            <Checkbox color="primary" value={person.id+"p"} checked={person.privileges.delete}
                            onChange={(event)=>this.updatePersonPrivilege(event,person,"delete")}/>
                            <Checkbox color="primary" value={person.id+"p"} checked={person.privileges.write}
                            onChange={(event)=>this.updatePersonPrivilege(event,person,"write")}/>
                            <Checkbox color="primary" value={person.id+"p"} checked={person.privileges.read}
                            onChange={(event)=>this.updatePersonPrivilege(event,person,"read")}/>
                          </div>
                      )) : null
                    }
              </div>
            </div>
            <div id="addNewgroupFooter">
              <div onClick={()=>this.gotoNextStage()} >
                { this.state.addGroupStage == 3 ? 'Finish' : 'Next'}  <img src={Featherright} alt=""/>
              </div>
            </div>

          </div>
        </div>
      </>
    )
  }
  render() {
    return (
      <MainLayout secondSidebar={this.secondSidebar()} bodySection={this.chatBodySection()} />
    )
  }
}

export default Chat;
