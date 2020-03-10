import gql from "graphql-tag";
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from "apollo-boost";
import { baseUrl } from "../../constants";

const cache = new InMemoryCache();

const client1 = new ApolloClient({
    cache,
    uri: baseUrl.server,
});
const getBackLogs = gql`
    query GetBacklogTasks($pageNo:Int!)
    {
        getBacklogTasks(pageNo:$pageNo){
            id,
            taskTitle,
            taskDescription,
            priority
            relatedTo
            billable
            sendCopyTo
            followers
            startTime
            dueTime
            statusId
            progressPercent
            progressEstimatedTime
            tags
            comments
            assignTo
            attachment
            privacy
            logTime
            dependencies
            remainder
            linkWithTicket
            linkWithProject
            linkWithTask
            linkWithObjective
            linkWithKeyResult
            departmentId
            companyId
            teamId
            taskWeightage
            parentTaskId
            childTaskId
            createdAt
            active,
            taskHours,
            projectId
        }
    }
`;

export const getBacklogData = (client, pageNo, callback) => {
    client
        .query({
            query:
                getBackLogs, variables: { pageNo: pageNo }
        })
        .then(res => {
            callback(res)
        })
}
const getTodayTasks = gql`
    query GetTodayTasks($pageNo:Int!)
    {
        getTodayTasks(pageNo:$pageNo){
            id,
            taskTitle,
            taskDescription,
            priority,
            billable
            sendCopyTo
            followers
            startTime
            dueTime
            statusId
            progressPercent
            progressEstimatedTime
            tags
            comments
            assignTo
            attachment
            privacy
            logTime
            dependencies
            remainder
            linkWithTicket
            linkWithProject
            linkWithTask
            linkWithObjective
            linkWithKeyResult
            departmentId
            companyId
            teamId
            taskWeightage
            parentTaskId
            childTaskId
            createdAt
            active,
            taskHours,
            projectId
        }
    }
`;

export const getTodayData = (client, pageNo, callback) => {
    client
        .query({
            query:
                getTodayTasks, variables: { pageNo: pageNo }
        })
        .then(res => {
            callback(res)
        })
}

const getTomorrowTasks = gql`
    query GetTomorrowTasks($pageNo:Int!)
    {
        getTomorrowTasks(pageNo:$pageNo){
            id,
            taskTitle,
            taskDescription,
            priority,
            billable
            sendCopyTo
            followers
            startTime
            dueTime
            statusId
            progressPercent
            progressEstimatedTime
            tags
            comments
            assignTo
            attachment
            privacy
            logTime
            dependencies
            remainder
            linkWithTicket
            linkWithProject
            linkWithTask
            linkWithObjective
            linkWithKeyResult
            departmentId
            companyId
            teamId
            taskWeightage
            parentTaskId
            childTaskId
            createdAt
            active,
            taskHours,
            projectId
        }
    }
`;
export const getTomorrowData = (client, pageNo, callback) => {
    client
        .query({
            query:
                getTomorrowTasks, variables: { pageNo: pageNo }
        })
        .then(res => {
            callback(res)
        })
}
const getTaskBystatus = gql`
    query getTaskBystatus($statusId:Int!)
    {
        getTaskBystatus(statusId:$statusId){
            id,
            taskTitle,
            taskDescription,
            priority,
            relatedTo
            billable
            sendCopyTo
            followers
            startTime
            dueTime
            statusId
            progressPercent
            progressEstimatedTime
            tags
            comments
            assignTo
            attachment
            privacy
            logTime
            dependencies
            remainder
            linkWithTicket
            linkWithProject
            linkWithTask
            linkWithObjective
            linkWithKeyResult
            departmentId
            companyId
            teamId
            taskWeightage
            parentTaskId
            childTaskId
            createdAt
            active,
            taskHours,
            projectId
        }
    }
`;
export const getTaskBytatus = (client, statusId, callback) => {
    client
        .query({
            query:
                getTaskBystatus, variables: { statusId: statusId }
        })
        .then(res => {
            callback(res)
        })
}




const getTaskByAssignTo = gql`
    query getTaskByAssignedId($assignTo:Int!)
    {
        getTaskByAssignedId(assignTo:$assignTo){
            id,
            taskTitle,
            taskDescription,
            priority,
            billable
            sendCopyTo
            followers
            startTime
            dueTime
            statusId
            progressPercent
            progressEstimatedTime
            tags
            comments
            assignTo
            attachment
            privacy
            logTime
            dependencies
            remainder
            linkWithTicket
            linkWithProject
            linkWithTask
            linkWithObjective
            linkWithKeyResult
            departmentId
            companyId
            teamId
            taskWeightage
            parentTaskId
            childTaskId
            createdAt
            active,
            taskHours,
            projectId
        }
    }
`;
export const getTaskByAssignUser = (client, assignTo, callback) => {
    client
        .query({
            query:
                getTaskByAssignTo, variables: { assignTo: assignTo }
        })
        .then(res => {
            callback(res)
        })
}



const getTaskByPriorityHigh = gql`
    query getTaskByPriorityHigh
    {
        getTaskByPriorityHigh{
            id,
            taskTitle,
            taskDescription,
            priority,
            billable
            sendCopyTo
            followers
            startTime
            dueTime
            statusId
            progressPercent
            progressEstimatedTime
            tags
            comments
            assignTo
            attachment
            privacy
            logTime
            dependencies
            remainder
            linkWithTicket
            linkWithProject
            linkWithTask
            linkWithObjective
            linkWithKeyResult
            departmentId
            companyId
            teamId
            taskWeightage
            parentTaskId
            childTaskId
            createdAt
            active
            taskHours,
            projectId
        }
    }
`;
export const getTaskByPriority = (client, assignTo, callback) => {
    client
        .query({
            query:
                getTaskByPriorityHigh
        })
        .then(res => {
            callback(res)
        })
}

const getAllStatus = gql`
    query getAllStatus
    {
        getAllStatus{
            id
            statusName
            statusDescription
            statusFor
        }
    }
`;
export const getAllStatus1 = (client, callback) => {
    client
        .query({
            query:
                getAllStatus
        })
        .then(res => {
            callback(res)
        })
}

// Get all users 
const GET_USERS = gql`
    {
        getAllUsers{
            id,
            emailIs,
            firstName,
            lastName
        }
    }
`;
export function getAllUsers(client, callback) {
    client.query({
        query: GET_USERS
    }).then(res => {
        callback(res.data.getAllUsers)
    })
}

const getAlltag = gql`
    query allTags($companyId:Int!)
    {
        allTags(companyId:$companyId){
            id
            tagTitle
            color
            tenantId
            companyId,
            color
        }
    }
`;
export const getAllTags = (client, cmpId, callback) => {
    let result;
    client
        .query({
            query:
                getAlltag, variables: { companyId: cmpId }
        })
        .then(res => {
            result = res;
        })
    return result;
}
const ADD_Tag = gql`
    mutation updateTask($id:Int!,$tags:JSON!){
        updateTask(
            id:$id,
            tags:$tags
        ){
            id,
            tags
        }
    }
`;

async function taskTagsUpdate(client, data) {
    let result;
    await client
        .mutate({
            mutation:
            ADD_Tag, variables: {
                    id: data.id, tags:data.tags
                }
            })
        }
const SUBMIT_NEW_TAG = gql`
    mutation addTag($tagTitle:String!,$companyId:Int!,$tenantId:Int!,$color:String){
        addTag(
            tagTitle:$tagTitle,
            companyId:$companyId,
            tenantId:$tenantId,color:$color
        ){
            id,
            tagTitle,
            color,
        }
    }
`;

async function addTagFromTask(client, data, callback) {
    let result;
    await client
        .mutate({
            mutation:
            SUBMIT_NEW_TAG, variables: {
                    tagTitle:data.tagTitle,
                    companyId:data.companyId,
                    tenantId:data.tenantId,
                    color:data.color
                }
        })
        .then(res => {
            result = res;
            callback(res)
        })
        return result;
    }



const getTasks = gql`
    query tasksList
    {
        tasksList{
            id,
            taskTitle,
            taskDescription,
            priority
            relatedTo
            billable
            sendCopyTo
            followers
            startTime
            dueTime
            statusId
            progressPercent
            progressEstimatedTime
            tags
            comments
            assignTo
            attachment
            privacy
            logTime
            dependencies
            remainder
            linkWithTicket
            linkWithProject
            linkWithTask
            linkWithObjective
            linkWithKeyResult
            departmentId
            companyId
            teamId
            taskWeightage
            parentTaskId
            childTaskId
            createdBy
            active,
            taskHours,
            projectId
        }
    }
`;

export const getAllTasks = (client, callback) => {
    client
        .query({
            query:
                getTasks
        })
        .then(res => {
            callback(res)
        })
}


const getAllPRJCT = gql`
    query getAllProjects
    {
            getAllProjects{
                id
                tenantId
                departmentId
                projectName
                projectStatus
                projectDescription
                companyId
                teamId
                projectPrefix
                createdBy
        }
    }
`;

export const getAllProj = (client, callback) => {
    client
        .query({
            query:
                getAllPRJCT
        })
        .then(res => {
            callback(res)
        })
}


const getAllTKT = gql`
    query ticketsList
    {
        ticketsList{
            id
            name
            ticketDescription
            ticketType
            tenantId
            userId
            deadline
            timeLog
            statusId
            queueId
            templateId
            managerId
            departmentId
            companyId
            projectId
            teamId
            createdBy
        }
    }
`;

export const getAllTickets = (client, callback) => {
    client
        .query({
            query:
                getAllTKT
        })
        .then(res => {
            callback(res)
        })
}

const getAllCmp = gql`
    query getAllCompany
    {
        getAllCompany{
            id
            companyName
        }
    }
`;

export const getAllCompanies = (client, callback) => {
    client
        .query({
            query:
                getAllCmp
        })
        .then(res => {
            callback(res)
        })
}

// getAllObjectives


const getAllObj = gql`
    query getAllObjectives
    {
        getAllObjectives{
            id
            objectiveTitle
            objectiveDescription
            companyID
            assignedBy
        }
    }
`;

export const getAllObjectives = (client, callback) => {
    client
        .query({
            query:
                getAllObj
        })
        .then(res => {
            callback(res)
        })
}

const searchProjects = gql`
    query searchProject($projectName:String,$comapnyId:Int!,$tenantId:Int!)
    {
        searchProject(projectName:$projectName,companyId:$companyId,tenantId:$tenantId){
            id
            tenantId
            departmentId
            projectName
            projectStatus
            projectDescription
            companyId
            teamId
            projectPrefix
            createdBy
        }
    }
`;

export const getsearchedProjects = (client,name,cmpId,tenantId, callback) => {
    client
        .query({
            query:
            searchProjects,variables:{projectName:name,companyId:cmpId,tenantId:tenantId}
        })
        .then(res => {
            callback(res)
        })
}

const searchObjectives = gql`
    query searchObjective($objectiveTitle:String,$companyID:Int!)
    {
        searchObjective(objectiveTitle:$objectiveTitle,companyID:$companyID){
            id
            objectiveTitle
            objectiveDescription
            companyID
            assignedBy
        }
    }
`;

export const getSearchedObjectives = (client,name,cmpId, callback) => {
    client
        .query({
            query:
            searchObjectives, variables:{objectiveTitle:name,companyID:cmpId}
        })
        .then(res => {
            callback(res)
        })
}


const searchTickets = gql`
    mutation searchTicket($searchOption:String,$tenantId:Int,$companyId:Int)
    {
        searchTicket(searchOption:$searchOption,tenantId:$tenantId,companyId:$companyId){
            id
            name
            ticketDescription
            ticketType
            tenantId
            userId
            deadline
            timeLog
            statusId
            queueId
            templateId
            managerId
            departmentId
            companyId
            projectId
            teamId
            createdBy
        }
    }
`;

export const getSearchedTickets = (client,name1,tenant,cmpId, callback) => {
    client
        .mutate({
            mutation:
            searchTickets, variables:{searchOption:name1,tenantId:tenant,companyId:cmpId}
        })
        .then(res => {
            callback(res)
        })
}


const searchTasks = gql`
    mutation searchTask($taskTitle:String,$companyId:Int)
    {
        searchTask(taskTitle:$taskTitle,companyId:$companyId){
            id,
            taskTitle,
            taskDescription,
            priority
            relatedTo
            billable
            sendCopyTo
            followers
            startTime
            dueTime
            statusId
            progressPercent
            progressEstimatedTime
            tags
            comments
            assignTo
            attachment
            privacy
            logTime
            dependencies
            remainder
            linkWithTicket
            linkWithProject
            linkWithTask
            linkWithObjective
            linkWithKeyResult
            departmentId
            companyId
            teamId
            taskWeightage
            parentTaskId
            childTaskId
            createdBy
            active,
            taskHours,
            projectId
        }
    }
`;

export const getSearchedTasks = (client,name,cmpId,callback) => {
    client
        .mutate({
            mutation:
            searchTasks, variables:{taskTitle:name,companyId:cmpId}
        })
        .then(res => {
            callback(res)
        })
}

const getUserByIdData = gql`
query getUserById($id:Int!) 
{
  getUserById(id:$id){
    id
    username,
    emailIs,
    firstName,
    lastName,
    tenantId,
    departmentId,
    companyId,
  }
}
`;
export const getUserById = (callback)=> {
    client1
        .query({
            query: getUserByIdData,variables: {
                id: parseInt(localStorage.getItem("id"))
              }
        })
        .then(res => {
            callback(res);
        })
}

const getAllReminderData = gql`
query remonderList
             {
                remonderList{
              id,
              reminderType,
              reminderTitle,
              reminderTime,
              reminderDependecyId
              }
            }
`;


export const getAllReminder = (client, callback) => {
    client
        .query({
            query:
            getAllReminderData
        })
        .then(res => {
            callback(res)
        }).catch(err=>console.log("erro123==",err))
}



const addReminderData = gql`
mutation addReminder(
    $reminderTitle:String,
    $reminderDependecyId: Int,
    $reminderType: String,
    $reminderTime: JSON,
    $reminderFor: String
  ) 
  {
    addReminder(
        reminderTitle:$reminderTitle
        reminderDependecyId: $reminderDependecyId,
        reminderType:$reminderType,
        reminderTime:$reminderTime,
        reminderFor:$reminderFor
      )
      {
        id,
        reminderTitle
        reminderDependecyId,
        reminderType,
        reminderTime,
        reminderFor
      }
  }
`;

export const addReminderMutation = async(client, data,callback) => {
    await client
        .mutate({
            mutation:
            addReminderData, variables: { 
                reminderDependecyId: data.reminderDependecyId,
                reminderType:data.reminderType,
                reminderTime:data.reminderTime,
                reminderTitle:data.reminderTitle,
                reminderFor:data.reminderFor
             }
        })
        .then(async res => {
            callback(res);
        })
}

const deleteReminderData = gql`
mutation removereminder(
    $id:Int
  ) 
  {
    removereminder(
        id:$id
      )
      {
        id,
        reminderDependecyId,
        reminderType,
        reminderTime,
      }
  }
`;

export const deleteReminderMutation = async(client, data,callback) => {
    await client
        .mutate({
            mutation:
            deleteReminderData, variables: { 
                id:data
             }
        })
        .then(async res => {
            callback(res);
        })
}



const updateReminderData = gql`
mutation updateReminder(
    $reminderDependecyId: Int,
    $reminderType: String,
    $reminderTime: JSON,
    $reminderTitle: String,
  ) 
  {
    updateReminder(
        reminderDependecyId: $reminderDependecyId,
        reminderType:$reminderType,
        reminderTime:$reminderTime,
        reminderTitle: $reminderTitle,
      )
      {
        id,
        reminderDependecyId,
        reminderType,
        reminderTime,
        reminderTitle,
      }
  }
`;

export const updateReminder = async(client, data,callback) => {
    await client
        .mutate({
            mutation:
            updateReminderData, variables: {
                reminderTitle:data.reminderTitle,
                reminderDependecyId: data.reminderDependecyId,
                reminderType:data.reminderType,
                reminderTime:data.reminderTime,
             }
        })
        .then(async res => {
            callback(res);
        })
}




const assignTaskToUserData = gql`
mutation assignTaskToUser(
    $id: Int!,
    $assignTo: Int!,
  ) 
  {
    assignTaskToUser(
        id: $id,
        assignTo:$assignTo,
      )
      {
        id,
      }
  }
`;

export const assignTaskToUser = async(client, data,callback) => {
    await client
        .mutate({
            mutation:
            assignTaskToUserData, variables: {
                id:data.id,
                assignTo:data.assignTo
             }
        })
        .then(async res => {
            callback(res);
        })
}


const duplicateTaskData = gql`
mutation duplicateTask(
    $id:Int
  ) 
  {
    duplicateTask(
        id:$id
      )
      {
        id,
      }
  }
`;

export const duplicateTask = async(client, data,callback) => {
    await client
        .mutate({
            mutation:
            duplicateTaskData, variables: {
                id:data
             }
        })
        .then(async res => {
            callback(res);
        })
}


const deleteTasksData = gql`
mutation removeTasks(
    $id:Int
  ) 
  {
      removeTasks(
        id:$id
      )
      {
        id,
      }
  }
`;

export const deleteTasks = async(client, data,callback) => {
    await client
        .mutate({
            mutation:
            deleteTasksData, variables: { 
                id:data
             }
        })
        .then(async res => {
            callback(res);
        })
}

export {
    taskTagsUpdate,addTagFromTask}