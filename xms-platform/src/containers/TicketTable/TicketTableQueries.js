import gql from "graphql-tag";
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from "apollo-boost";
import { baseUrl } from "../../constants";

const cache = new InMemoryCache();

const client1 = new ApolloClient({
    cache,
    uri: baseUrl.server,
});


// Get All Status
const GET_STATUS = gql`
       {
        getAllStatus{
                id,
                statusName
            }
        }
`;
function getAllStatus(client, callback) {
    client1
        .query({
            query: GET_STATUS
        })
        .then(res => {
            callback(res);
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
function getAllUsers(client, callback) {
    client1.query({
        query: GET_USERS
    }).then(res => {
        callback(res)
    })
}
const GET_PRIORITY = gql`
    {
        priorities{
            id,
            priorityname,
        }
    }
`;
function priorities(client, callback) {
    client1
        .query({
            query: GET_PRIORITY
        })
        .then(res => {
            callback(res);
        })
}

// Update Status
const UPDATE_STATUS = gql`
    mutation UpdateStatus($id:Int!,$managerId:Int!,$statusId:Int!){
        managerUpdateStatus(
            id:$id,
            managerId:$managerId,
            statusId:$statusId
        ){
            id,
            statusId
        }
    }
`;

async function updateStatus(client, data) {
    let result;
    await client1
        .mutate({
            mutation:
                UPDATE_STATUS, variables: { id: data.id, managerId: data.managerId, statusId: data.statusId }
        })
        .then(async res => {
            // callback(res);
            result = res;
        })
    return result;
}

// Update Priority

const UPDATE_PRIORITY = gql`
    mutation UpdatePriority($id:Int!,$managerId:Int!,$priorityId:Int!){
        ticketpriorityupdate(
            id:$id,
            managerId:$managerId,
            priorityId:$priorityId
        ){
            id,
            priorityId
        }
    }
`;

async function updatePriority(client, data, callback) {
    let result;
    await client1
        .mutate({
            mutation:
                UPDATE_PRIORITY, variables: { id: data.id, managerId: data.managerId, priorityId: data.priorityId }
        })
        .then(res => {
            result = res
        })
    return result;
}

// Assign Ticket
const ASSIGN_TICKET = gql`
    mutation AssignTicket($id:Int!,$managerId:Int!,$statusId:Int!,$assignedToAgentId:Int){
        assignTicketByManager(
            id:$id,
            managerId:$managerId,
            statusId:$statusId,
            assignedToAgentId:$assignedToAgentId
        ){
            id,
            statusId,
            assignedToAgentId
        }
    }
`;

async function assignTicket(client, data) {
    let result;
    await client1
        .mutate({
            mutation:
                ASSIGN_TICKET, variables: {
                    id: data.id, managerId: data.managerId, statusId: data.statusId,
                    assignedToAgentId: data.assignedToAgentId
                }
        })
        .then(res => {
            result = res;
        })
    return result;
}

// Edit ticket
const EDIT_TICKET = gql`
    mutation EditTicket(
            $id:Int!,$name:String!,$ticketDescription:String!,$tenantId:Int!
            $userId:Int!,$managerId:Int!,$statusId:Int!, $assignedToAgentId:Int!,$priorityId:Int!
        ){
        updateTicket(
            id:$id,
            name:$name,
            ticketDescription:$ticketDescription,
            tenantId:$tenantId,
            userId:$userId,
            managerId:$managerId,
            statusId:$statusId,
            assignedToAgentId:$assignedToAgentId,
            priorityId:$priorityId
        ){
            id,
            name,
            ticketDescription
            statusId,
            assignedToAgentId
        }
    }
`;

function editTicket(client, data, callback) {
    client1
        .mutate({
            mutation:
                EDIT_TICKET, variables: {
                    id: data.id, name: data.name, ticketDescription: data.ticketDescription, tenantId: data.tenantId,
                    userId: data.userId, managerId: data.managerId, statusId: data.statusId,
                    assignedToAgentId: data.assignedToAgentId, priorityId: data.priorityId
                }
        })
        .then(res => {
            console.log("EDIT TICKET RESULT", res);
            // callback(res);
        })
}

// Listing of ticket under manager
const GET_TICKETS_UNDER_MANAGER = gql`
    query
        GetTicketUnderManager($managerId:Int,$pageNo:Int){
            getTicketUnderManager(
                managerId:$managerId,
                pageNo:$pageNo
            ){
                id,
                name,
                ticketDescription,
                tenantId,
                userId,
                deadline
                timeConsumed,
                statusId,
                timeLog,
                queueId,
                ticketSupportive,
                ifOldticket,
                templateId,
                ticketSource,
                ticketSourceChannel,
                auditJson,
                managerId,
                assignedToAgentId,
                ticketType,
                priorityId,
                tags,
                isTagged,
                tagAgents,
                departmentId,
                companyId,
                teamId,
                projectId,
                createdBy,
                lastUpdatedBy,
                parentTicketId,
                mergeTicketId,
                parentTicketType,
                childTicketId,
                isDuplicate,
                duplicateTicketId,
                sortOrder,
                active,
                createdAt,
                updatedAt,
                ticket_Id,
                customer_Id,
                customer_Name
            }
        }
`;


async function getTicketUnderManager(client, data) {
    let result;
    await client1
        .query({
            query: GET_TICKETS_UNDER_MANAGER, variables: { managerId: data.managerId, pageNo: data.pageNo }
        }).then(res => {
            result = res;
        });
    return result;
};

// Get all Tags
const GET_TAGS = gql`
    query 
    GetAllTags($companyId:Int){
        allTags(
            companyId:$companyId
        ){
            id,
            tagTitle,
            color,
        }
    }
`;
// async function getAllTags(client, callback) {
//     let result;
//     await client.query({
//         query: GET_TAGS, variables: { companyId: 1 }
//     }).then(res => {
//         result = res;
//         callback(res)
//     })
//     return result;
// }

async function getAllTags(client) {
    let result;
    await client1.query({
        query: GET_TAGS, variables: { companyId: 1 }
    }).then(res => {
        result = res.data.allTags;
    })
    return result;
}

// Get all Tickets
const GET_ALL_TICKETS = gql`
    query 
    GetTodaysTickets(
        $ticketDay:String!
    ){
        getTodaysTickets(ticketDay:$ticketDay){
            id,
            name,
            ticketDescription,
            statusId,
            tags,
            priorityId,
            ticketType,
            assignedToAgentId,
            userId,
            tenantId,
            companyId,
            managerId,
            ticket_Id,
            customer_Name
        }
    }
`;
async function getAllTickets(ticketDay) {
    let result;
    await client1.query({
        query: GET_ALL_TICKETS, variables: { ticketDay: ticketDay }
    }).then(res => {
        result = res.data.getTodaysTickets;
    })
    return result;
}



// ASSIGN Tag
const ADD_Tag = gql`
    mutation updateTicket($id:Int!,$tags:JSON!){
        updateTicket(
            id:$id,
            tags:$tags
        ){
            id,
            tags
        }
    }
`;

async function ticketTagsUpdate(client, data) {
    let result;
    await client1
        .mutate({
            mutation:
                ADD_Tag, variables: {
                    id: data.id, tags: data.tags
                }
        })
        .then(res => {
            result = res;
        })
    return result;
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

async function addTagFromTicket(client, data, callback) {
    let result;
    await client1
        .mutate({
            mutation:
                SUBMIT_NEW_TAG, variables: {
                    tagTitle: data.tagTitle,
                    companyId: data.companyId,
                    tenantId: data.tenantId,
                    color: data.color
                }
        })
        .then(res => {
            result = res;
            callback(res)
        })
    return result;
}


const GET_LOGGED_USER = gql`
    query 
    getUserById(
        $id:Int!
    ){
        getUserById(id:$id){
            id,
            firstName,
            lastName
            emailIs
            tenantId
            departmentId
            companyId
        }
    }
`;
async function getLogedUser(client, userId, callback) {
    let result;
    await client1.query({
        query: GET_LOGGED_USER, variables: { id: userId }
    }).then(res => {
        result = res.data.getUserById;
        callback(result)
    })
    return result;
}


const getAllTKT = gql`
    query ticketsList
    {
        ticketsList{
            id,
            name,
            ticketDescription,
            tenantId,
            userId,
            deadline
            timeConsumed,
            statusId,
            timeLog,
            queueId,
            ticketSupportive,
            ifOldticket,
            templateId,
            ticketSource,
            ticketSourceChannel,
            auditJson,
            managerId,
            assignedToAgentId,
            ticketType,
            priorityId,
            tags,
            isTagged,
            tagAgents,
            departmentId,
            companyId,
            teamId,
            projectId,
            createdBy,
            lastUpdatedBy,
            parentTicketId,
            mergeTicketId,
            parentTicketType,
            childTicketId,
            isDuplicate,
            duplicateTicketId,
            sortOrder,
            active,
            createdAt,
            updatedAt,
            ticket_Id,
            customer_Id,
            customer_Name
        }
    }
`;

const getAllTkts = (client, callback) => {
    client1
        .query({
            query:
                getAllTKT
        })
        .then(res => {
            callback(res)
        })
}


const getTicketsBystatusName = gql`
    query getTicketsByStatus($statusName:String!)
    {
        getTicketsByStatus(statusName:$statusName){
            id,
            name,
            ticketDescription,
            tenantId,
            userId,
            deadline
            timeConsumed,
            statusId,
            timeLog,
            queueId,
            ticketSupportive,
            ifOldticket,
            templateId,
            ticketSource,
            ticketSourceChannel,
            auditJson,
            managerId,
            assignedToAgentId,
            ticketType,
            priorityId,
            tags,
            isTagged,
            tagAgents,
            departmentId,
            companyId,
            teamId,
            projectId,
            createdBy,
            lastUpdatedBy,
            parentTicketId,
            mergeTicketId,
            parentTicketType,
            childTicketId,
            isDuplicate,
            duplicateTicketId,
            sortOrder,
            active,
            createdAt,
            updatedAt,
            ticket_Id,
            customer_Id,
            customer_Name
        }
    }
`;

const getTicketByStatus = (client,name, callback) => {
    client1
        .query({
            query:
            getTicketsBystatusName,variables:{statusName:name}
        })
        .then(res => {
            callback(res)
        })
}


const getTicketByAgent = gql`
query getTicketByAgent($assignedToAgentId:Int!)
{
    getTicketByAgent(assignedToAgentId:$assignedToAgentId){
        id,
        name,
        ticketDescription,
        tenantId,
        userId,
        deadline
        timeConsumed,
        statusId,
        timeLog,
        queueId,
        ticketSupportive,
        ifOldticket,
        templateId,
        ticketSource,
        ticketSourceChannel,
        auditJson,
        managerId,
        assignedToAgentId,
        ticketType,
        priorityId,
        tags,
        isTagged,
        tagAgents,
        departmentId,
        companyId,
        teamId,
        projectId,
        createdBy,
        lastUpdatedBy,
        parentTicketId,
        mergeTicketId,
        parentTicketType,
        childTicketId,
        isDuplicate,
        duplicateTicketId,
        sortOrder,
        active,
        createdAt,
        updatedAt,
        ticket_Id,
        customer_Id,
        customer_Name
    }
}
`;

const getAllTicketByAgent = (client,id, callback) => {
client1
    .query({
        query:
        getTicketByAgent,variables:{assignedToAgentId:id}
    })
    .then(res => {
        callback(res)
    })
}

const getTicketByHighPriority = gql`
query highPriorityTickets
{
    highPriorityTickets{
        id,
        name,
        ticketDescription,
        tenantId,
        userId,
        deadline
        timeConsumed,
        statusId,
        timeLog,
        queueId,
        ticketSupportive,
        ifOldticket,
        templateId,
        ticketSource,
        ticketSourceChannel,
        auditJson,
        managerId,
        assignedToAgentId,
        ticketType,
        priorityId,
        tags,
        isTagged,
        tagAgents,
        departmentId,
        companyId,
        teamId,
        projectId,
        createdBy,
        lastUpdatedBy,
        parentTicketId,
        mergeTicketId,
        parentTicketType,
        childTicketId,
        isDuplicate,
        duplicateTicketId,
        sortOrder,
        active,
        createdAt,
        updatedAt,
        ticket_Id,
        customer_Id,
        customer_Name
    }
}
`;

const getAllTicketByHighPriority = (client, callback) => {
client1
    .query({
        query:
        getTicketByHighPriority
    })
    .then(res => {
        callback(res)
    })
}

const getTicketByDue = gql`
query DueTickets
{
    DueTickets{
        id,
        name,
        ticketDescription,
        tenantId,
        userId,
        deadline
        timeConsumed,
        statusId,
        timeLog,
        queueId,
        ticketSupportive,
        ifOldticket,
        templateId,
        ticketSource,
        ticketSourceChannel,
        auditJson,
        managerId,
        assignedToAgentId,
        ticketType,
        priorityId,
        tags,
        isTagged,
        tagAgents,
        departmentId,
        companyId,
        teamId,
        projectId,
        createdBy,
        lastUpdatedBy,
        parentTicketId,
        mergeTicketId,
        parentTicketType,
        childTicketId,
        isDuplicate,
        duplicateTicketId,
        sortOrder,
        active,
        createdAt,
        updatedAt,
        ticket_Id,
        customer_Id,
        customer_Name
    }
}
`;

const getAllTicketByDue = (client, callback) => {
client1
    .query({
        query:
        getTicketByDue
    })
    .then(res => {
        callback(res)
    })
}



const duplicate = gql`
mutation isDuplicate(
    $id:Int
  ) 
  {
    isDuplicate(
        id:$id
      )
      {
        id,
      }
  }
`;

const duplicateTicket = (client,id, callback) => {
client1
    .mutate({
        mutation:duplicate,variables: {id:id}
    })
    .then(res => {
        callback(res)
    })
}

const deleteTicket = gql`
mutation removeTicket(
    $id:Int
  ) 
  {
    removeTicket(
        id:$id
      )
      {
        id,
      }
  }
`;

const deleteThisTicket = (client,id, callback) => {
client1
    .mutate({
        mutation:deleteTicket,variables: {id:id}
    })
    .then(res => {
        callback(res)
    })
}


const closeTicket = gql`
mutation closeTicket(
    $id:Int
  ) 
  {
    closeTicket(
        id:$id
      )
      {
        id,
      }
  }
`;

const ticketClose = (client,id, callback) => {
client1
    .mutate({
        mutation:closeTicket,variables: {id:id}
    })
    .then(res => {
        callback(res)
    })
}




const getTicketsBystatusId = gql`
    query getTicketByStatus($statusId:Int!)
    {
        getTicketByStatus(statusId:$statusId){
            id,
            name,
            ticketDescription,
            tenantId,
            userId,
            deadline
            timeConsumed,
            statusId,
            timeLog,
            queueId,
            ticketSupportive,
            ifOldticket,
            templateId,
            ticketSource,
            ticketSourceChannel,
            auditJson,
            managerId,
            assignedToAgentId,
            ticketType,
            priorityId,
            tags,
            isTagged,
            tagAgents,
            departmentId,
            companyId,
            teamId,
            projectId,
            createdBy,
            lastUpdatedBy,
            parentTicketId,
            mergeTicketId,
            parentTicketType,
            childTicketId,
            isDuplicate,
            duplicateTicketId,
            sortOrder,
            active,
            createdAt,
            updatedAt,
            ticket_Id,
            customer_Id,
            customer_Name
        }
    }
`;

const getTicketByStatusById = (client,id, callback) => {
    client1
        .query({
            query:
            getTicketsBystatusId,variables:{statusId:id}
        })
        .then(res => {
            callback(res)
        })
}


const searchData = gql`
mutation searchTicket($searchOption:String,$managerId:Int,$tenantId:Int,$companyId:Int) 
          {
            searchTicket(searchOption:$searchOption,managerId:$managerId,tenantId:$tenantId,companyId:$companyId){
              id,
              name,
              ticketDescription,
              statusId,
              tags,
              priorityId,
              ticketType,
              assignedToAgentId,
              userId,
              tenantId,
              companyId,
              managerId,
              ticket_Id,
              customer_Name
            }
          }
`;

const searchTicketMutation = (client,data, callback) => {
client1
    .mutate({
        mutation:searchData,variables: {
            searchOption:data.searchOption,
            // managerId:data.managerId,
            tenantId:1,
            companyId:1
        }
    })
    .then(res => {
        callback(res)
    })
}





export {
    getAllStatus,
    updateStatus,
    assignTicket,
    getAllUsers,
    editTicket,
    updatePriority,
    priorities,
    getTicketUnderManager,
    getAllTags,
    getAllTickets,
    ticketTagsUpdate,
    addTagFromTicket,
    getLogedUser,
    getAllTkts,
    getTicketByStatus,
    getAllTicketByAgent,
    getAllTicketByHighPriority,
    getAllTicketByDue,
    duplicateTicket,
    deleteThisTicket,
    ticketClose,
    getTicketByStatusById,
    searchTicketMutation
}
