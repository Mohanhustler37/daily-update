import gql from "graphql-tag";
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from "apollo-boost";
import { baseUrl } from "../constants";

// const cache = new InMemoryCache();

// const client = new ApolloClient({
//     cache,
//     uri: baseUrl.server,
// });

const GET_COMPANIES = gql`
    {
        getAllCompany{
            id
            tenantId
            companyName
            companyDescription
            companyPrimaryContact
            companyPrifix
            industry
            noOFEmployees
            website
            email
            phone
            fax
            relationShipType
            parentCompanyId
            createdAt
            updatedAt
            createdBy
            lastUpdatedBy
        }
    }
`;

async function getAllCompanies(client) {
    let result;
    await client
        .query({
            query: GET_COMPANIES
        }).then(res => {
            result = res.data.getAllCompany
        });
    return result;
}

const GET_COMPANY_BYID = gql`
    query GetAllCompany($companyId:Int){
        getCompanyById(
            id:$companyId
        ){
            id
            tenantId
            companyName
            companyDescription
            companyPrimaryContact
            companyPrifix
            industry
            noOFEmployees
            website
            email
            phone
            fax
            relationShipType
            parentCompanyId
            createdAt
            updatedAt
            createdBy
            lastUpdatedBy
        }
    }
`;

async function getCompanyById(client, compId) {
    let result;
    await client.query({
        query: GET_COMPANY_BYID, variables: { companyId: compId }
    }).then(res => {
        result = res.data.getCompanyById;
    })
    return result;
}

const GET_PRIORITY_BYID = gql`
query GetPriorityById($pid:Int){
    getpriorityById(
        id:$pid
    ){
        id
        priorityname
    }
}
`;

async function getPriorityById(client, priorityId) {
    let result;
    await client.query({
        query: GET_PRIORITY_BYID, variables: { pid: priorityId }
    }).then(res => {
        result = res.data.getpriorityById
    });
    return result;
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
async function getAllUsersData(client, callback) {
    let result;
    await client.query({
        query: GET_USERS
    }).then(res => {
        result = res.data.getAllUsers
    })
    return result;
}


// GET Status by ID
const GET_STATUS_BYID = gql`
query GetStatuusById($sid:Int){
    getStatusById(
        id:$sid
    ){
        id
        statusName
    }
}
`;

async function getStatusById(client, statusId) {
    let result;
    await client.query({
        query: GET_STATUS_BYID, variables: { sid: statusId }
    }).then(res => {
        result = res.data.getStatusById
    });
    return result;
}
export {
    getAllCompanies,
    getCompanyById,
    getPriorityById,
    getAllUsersData,
    getStatusById
}