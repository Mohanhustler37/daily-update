import gql from "graphql-tag";
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from "apollo-boost";
import { baseUrl } from "../../../../../constants";

const cache = new InMemoryCache();

const client1 = new ApolloClient({
    cache,
    uri: baseUrl.server,
});

// Get all ticket templates under tenant
const GET_TICKET_TEMPLATES = gql`
    query GetTicketTemplate($tenantId:Int!){
        ticketTemplate(tenantId:$tenantId){
            id,templateName,
            ticketDescription,
            ticketPrefix,tenantId
        }
    }
`;

async function getTicketTemplatesData(data) {
    let result;
    await client1
        .query({
            query: GET_TICKET_TEMPLATES, variables: { tenantId: data.tenantId }
        }).then(res => {
            result = res.data.ticketTemplate;
        });
    return result;
};

// Get Useremails
const GET_USER_EMAILS = gql`
   {
        getAllUsers{
            id,firstName,emailIs
        }
    }
`;

async function getUserEmails(callback) {
    let result;
    await client1
        .query({
            query: GET_USER_EMAILS
        }).then(res => {
            result = res.data.getAllUsers;
            if(callback){
                callback(res);
            }
            
        });
    return result;
};


// Get all priority
const GET_PRIORITY = gql`
    {
        priorities{
            id,
            priorityname
        }
    }
`;
async function getAllPriority() {
    let result;
    await client1.query({
        query: GET_PRIORITY
    }).then(res => {
        result = res.data.priorities;
    })
    return result;
}

// Get all ticket types
const GET_TICKET_TYPES = gql`
    {
        getAllTicketType{
            id,
            ticketType
        }
    }
`;
async function getAllTicketTypes() {
    let result;
    await client1.query({
        query: GET_TICKET_TYPES
    }).then(res => {
        result = res.data.getAllTicketType;
    })
    return result;
}

// Get all Tags
const GET_TAGS = gql`
    query 
    GetAllTags($companyId:Int){
        allTags(
            companyId:$companyId
        ){
            id,
            tagTitle
        }
    }
`;
async function getAllTags(client, cmpId) {
    let result;
    await client1.query({
        query: GET_TAGS, variables: { companyId: cmpId }
    }).then(res => {
        result = res.data.allTags;
    })
    return result;
}


const SEARCH_TICKET_TEMPLATE = gql`
    mutation searchTicketTemplate($templateName:String!,$tenantId:Int){
        searchTicketTemplate(templateName:$templateName,tenantId:$tenantId){
            id,templateName,
            ticketDescription,
            ticketPrefix,tenantId
        }
    }
`;

async function searchTicketTemplatesData(data,tenant,callback) {
    let result;
    await client1
        .mutate({
            mutation: SEARCH_TICKET_TEMPLATE, variables: { templateName: data,tenantId:tenant}
        }).then(res => {
            result = res.data.searchTicketTemplate;
            callback(res.data.searchTicketTemplate)
        });
};

const getAllTeamsData = gql`
query getAllTeamsUnderTenant($tenantId:Int!) 
{
  getAllTeamsUnderTenant(tenantId:$tenantId){
    id,
    teamName
    }
}
`;

async function getAllTeams(data,callback) {
    let result;
    await client1
        .query({
            query: getAllTeamsData, variables: { tenantId: data }
        }).then(res => {
            result = res.data.ticketTemplate;
            callback(res);
        });
    return result;
};


const ADD_TICKET_DATA = gql`
mutation addTicket(
    $name: String!, $ticketDescription: String,$ticketType:String,$priorityId:Int,
    $tenantId:Int,$userId:Int,$managerId:Int,$assignedToAgentId:Int,
    $ticketSource:String,
    $tags1:[String],
  ) 
  {
    addTicket(
      name:$name, ticketDescription:$ticketDescription,ticketType:$ticketType,priorityId:$priorityId,
     tenantId:$tenantId,userId:$userId,managerId:$managerId,assignedToAgentId:$assignedToAgentId,
      tags1:$tags1,ticketSource:$ticketSource
      )
      {
        id,
        name
      }
  }
`;

async function addTicket(data,callback) {
    let result;
    await client1
        .mutate({
            mutation: ADD_TICKET_DATA, variables: { 
                name:data.name,
                ticketDescription:data.ticketDescription,
                ticketType:data.ticketType,
                priorityId:data.priorityId,
                tenantId:data.tenantId,
                userId:data.userId,
                managerId:data.managerId,
                assignedToAgentId:data.assignedToAgentId,
                tags1:data.tags1,
                ticketSource:data.ticketSource,
            }
        }).then(res => {
            result = res.data.addTicket;
            callback(res.data.addTicket)
        });
};


const getTeamsData = gql`
query getTeamByCompanyIdAndDepartmentId($companyId:Int,$departmentId:Int,$tenantId:Int)
             {
              getTeamByCompanyIdAndDepartmentId(companyId:$companyId,departmentId:$departmentId,tenantId:$tenantId){
              id,
              teamName
              }
            }
`;
export const getTeams = (a,b,c,callback)=> {
    client1
        .query({
            query: getTeamsData,variables: {
                companyId: a,
                departmentId: b,
                tenantId: c
              }
        })
        .then(res => {
            callback(res);
        })
}


const getAllTicketSourceData = gql`
query {
    getAllticket_source{
        id,
        name
    }
  }
`;

async function getAllTicketSource() {
    let result;
    await client1
        .query({
            query: getAllTicketSourceData
        }).then(res => {
            result = res.data.getAllticket_source;
            // callback(res);
        });
    return result;
};


const getAllTicketTypeData = gql`
query {
    getAllticket_type{
        id,
        title
    }
  }
`;

async function getAllTicketType() {
    let result;
    await client1
        .query({
            query: getAllTicketTypeData
        }).then(res => {
            result = res.data.getAllticket_type;
            // callback(res);
        });
    return result;
};


const getAllCompaniesData = gql`
query {
    getAllCompany {
      id,
      companyName,
      companyDescription
    }
  }
`;

async function getAllCompanies() {
    let result;
    await client1
        .query({
            query: getAllCompaniesData
        }).then(res => {
            result = res.data.getAllCompany;
            // callback(res);
        });
    return result;
};


const getAlldepartmentsData = gql`
query {
    getAllDepartments {
      id,
      departmentName
    }
  }
`;

async function getAlldepartments() {
    let result;
    await client1
        .query({
            query: getAlldepartmentsData
        }).then(res => {
            result = res.data.getAllDepartments;
            // callback(res);
        });
    return result;
};



export {
    getTicketTemplatesData,
    getUserEmails,
    getAllPriority,
    getAllTicketTypes,
    getAllTags,
    searchTicketTemplatesData,
    getAllTeams,
    addTicket,
    getAllTicketSource,
    getAllTicketType,
    getAllCompanies,
    getAlldepartments
}

