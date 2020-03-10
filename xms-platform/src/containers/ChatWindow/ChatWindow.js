
import React from 'react';
import './ChatWindow.scss';
import { baseUrl } from '../../constants'

import gql from 'graphql-tag';
import io from "socket.io-client";
import history from "../../Routes/history";
import {sendMessage1} from "./chatWindowQueries" 
let profileIcon = 'data:image/jpeg;base64,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';
let msgSendIcon = 'data:image/png;base64,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';

const getAllCompanyUserMessages = gql`
    query getAllCompanyUserMessages($id: Int!, $user: String!) {
        getAllCompanyUserMessages(id: $id, user: $user) {
            id
            firstName
            lastName
        }
    }
`

const getUsersList = (client, id, callback) => {
    const userId = localStorage.getItem("id");
    client
        .query({ query: getAllCompanyUserMessages, variables: { id: id, user: userId.toString() } })
        .then(res => {
            callback(res)
        })
}

const queryMsg = gql`
    query getUserMessages($fromUserId: String!, $toUserId: String!) {
        getUserMessages(fromUserId: $fromUserId, toUserId: $toUserId) {
            _id
            text
            fromUserId
            toUserId
            active
        }
    }
`

const getMessages = (client, fromUserId, toUserId, callback) => {

    client
        .query({ query: queryMsg, variables: { toUserId: toUserId, fromUserId: fromUserId } })
        .then(res => {
            callback(res)
        })
}


class ChatWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginUserId: '',
            toUserId: '',
            activeUserToChat: null,
            toUserName: '',
            textMessage: '',
            usersList: [],
            messages: []
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('jwtToken');
        if (token === null || token === undefined || token === '') {
            history.push('/');
        }
        let client = this.props.client
        let loginUserId = parseInt(localStorage.getItem("id"));
        let loginCompanyId = parseInt(localStorage.getItem("companyId"))
        this.setState({ loginUserId: loginUserId });
        this.setState({ loginCompanyId: loginCompanyId });
        getUsersList(client, loginCompanyId, response => {
            if (response.data)
                this.setState({ usersList: response.data.getAllCompanyUserMessages })
        })
        this.initSocket(loginUserId)
    }

    initSocket = async (loginUserId) => {
        const socket = await io.connect(baseUrl.socket, {
            query: { id: loginUserId }
        });

        setTimeout(() => {
            if (socket.id) {
                localStorage.setItem('socketId', socket.id);
            } else {
                setTimeout(() => {
                    if (socket.id) {
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
            console.log(data);
            if (this.state.toUserId == data.message.fromUserId)
                this.setState({ messages: [...this.state.messages, data.message] })
        });
        console.log('socket_socket', socket);
    }

    onChange = event => {
        this.setState({ textMessage: event.target.value })
    }
    getUserMsgs = (user) => {
        let client = this.props.client

        getMessages(client, this.state.loginUserId.toString(), user.id.toString(), response => {
            this.setState({
                messages: response.data.getUserMessages,
                toUserId: user.id != this.state.loginUserId ? user.id : null,
                toUserName: user.firstName
            })
        })
    }

    sendMessageHandler = async (toUserId) => {
        if (toUserId) {
            let variables = {
                fromUserId: this.state.loginUserId.toString(),
                toUserId: toUserId.toString(),
                text: this.state.textMessage,
                socketId: localStorage.getItem('socketId')
            }
            let client = this.props.client
            sendMessage1(client,variables,res=>{
                this.setState({
                    messages: [...this.state.messages, res.data.sendMessage],
                    textMessage: ''
                })
            })

        } else alert('Select user to send message')
    }

    render() {
        let { usersList, messages, textMessage, toUserId, toUserName, loginUserId } = this.state
        console.log('this.state', this.state)
        return (
            <div className='chat-container'>
                <div className='chat-users-list'>
                    {
                        usersList.map(user => (
                            <div className={`chat-contact-avathar ${toUserId === user.id ? 'selected-user' : null}`} onClick={() => this.getUserMsgs(user)}>
                                <div className="userInfo">
                                    <img src={profileIcon} alt='avathar' />
                                    {/* <span className={'msg.isActive' ? ('userActive') : 'userInactive'}></span> */}
                                </div>
                                <div className="chatDetails">
                                    <div><span>{user.firstName}</span> <span className="">{''}</span></div>
                                    <span>{''}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>



                <div className='chat-area'>
                    {
                        messages.map(msg => (
                            <div className={`message-container ${msg.fromUserId == loginUserId ? 'rightSide' : null}`}>
                                <div className='message-profile-icon'>
                                    <img src={profileIcon} alt='profileIcon' />
                                    <span>{msg.fromUserId != loginUserId ? toUserName : 'Sender'}</span>
                                </div>
                                <div className='message-content'>
                                    <p>{msg.text}</p>
                                    {/* <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). </p>
                                    <p>of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text</p> */}
                                </div>
                            </div>
                        ))
                    }

                    {/* <div className='message-container rightSide'>
                        <div className='message-profile-icon'>
                            <img src={profileIcon} alt='profileIcon' />
                            <span>JOHN</span>
                        </div>
                        <div className='message-content'>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting </p>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). </p>
                            <p>of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text</p>
                        </div>
                    </div> */}
                    <div className='text-container'>
                        <textarea value={textMessage} placeholder='Type here...' onChange={this.onChange}></textarea><img src={msgSendIcon} alt='msgSendIcon' onClick={() => this.sendMessageHandler(toUserId)} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatWindow;
