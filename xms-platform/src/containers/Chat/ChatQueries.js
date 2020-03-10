import gql from "graphql-tag";

const GetAllCompanyUserContacts = gql`
    query getAllCompanyUserMessages($id: Int!, $user: String!) {
        getAllCompanyUserMessages(id: $id, user: $user) {
            id,
            firstName,
            lastName,
            lastLogin
        }
    }
`;

const GetUserMessages = gql`
    query getUserMessages($fromUserId: String!, $toUserId: String!) {
        getUserMessages(fromUserId: $fromUserId, toUserId: $toUserId) {
            _id,
            text,
            fromUserId,
            toUserId,
            active
        }
    }
`;


const SendUserMessage = gql`
    mutation sendMessage($fromUserId: String!, $toUserId: String!, $text: String!, $socketId: String!) {
      sendMessage(fromUserId: $fromUserId, toUserId: $toUserId, text: $text, socketId: $socketId) {
          _id,
          fromUserId,
          toUserId,
          text,
          active
      }
    }
`;

const GetAllGroupsBasedOnCompany = gql`
    query getAllGroupsBasedOnCompany($companyId: Int!) {
      getAllGroupsBasedOnCompany(companyId: $companyId) {
        id,
        name,
        description,
        type,
        users,
        icon,
        lastLogin
      }
    }
`;

const AddGroup = gql`
  mutation addGroup($name: String!, $type: String!, $description: String!, $companyId: Int!, $users:[JSONObject]!, $icon: String!) {
    addGroup(name:$name, type:$type, description:$description, companyId: $companyId, users:$users, icon:$icon) {
      id
    }
  }
`;

const GetGroupMessages = gql`
  query getGroupMessages($groupId: String!) {
    getGroupMessages(groupId: $groupId) {
      _id,
      groupId,
      active,
      text
    }
  }
`;

const SendGroupMessage = gql`
  mutation SendGroupMessage($groupId: String!, $fromUserId: String!, $text: String!) {
    sendGroupMessage(groupId:$groupId, fromUserId:$fromUserId, text:$text) {
      _id,
      active,
      text,
      groupId
    }
  }
`;

const GetAllConversation = gql`
  query getAllConversation($id: Int!) {
    getAllConversation(id: $id) {
      id,
      firstName,
      lastName,
      lastLogin
    }
  }
`;

const SearchUser = gql`
  query searchUser($username: String!, $emailIs: String!, $companyId : Int!) {
    searchUser(username: $username, emailIs: $emailIs, companyId: $companyId) {
      id,
      firstName,
      lastName
    }
  }
`;


export {
  GetAllCompanyUserContacts,
  GetUserMessages,
  SendUserMessage,
  GetAllGroupsBasedOnCompany,
  AddGroup,
  GetGroupMessages,
  SendGroupMessage,
  GetAllConversation,
  SearchUser
}
