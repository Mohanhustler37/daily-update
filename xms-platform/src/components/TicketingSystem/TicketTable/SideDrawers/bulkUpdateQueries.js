import gql from "graphql-tag";
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from "apollo-boost";
import { baseUrl } from "../../../../constants";

const cache = new InMemoryCache();

const client = new ApolloClient({
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
    client
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
    client.query({
        query: GET_USERS
    }).then(res => {
        callback(res)
    })
}

// Get all priority
const GET_PRIORITY = gql`
    {
        priorities{
            id,
            priorityname
        }
    }
`;
function getAllPriority(client, callback) {
    client.query({
        query: GET_PRIORITY
    }).then(res => {
        callback(res)
    })
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
async function getAllTags() {
    let result;
    await client.query({
        query: GET_TAGS, variables: { companyId: 1 }
    }).then(res => {
        result = res.data.allTags;
    })
    return result;
}

// Get all Departments
const GET_DEPARTMENTS = gql`
    {
        getAllDepartments{
            id,
            departmentName
        }
    }
`;
function getAllDepartments(client, callback) {
    client.query({
        query: GET_DEPARTMENTS
    }).then(res => {
        callback(res)
    })
}

// Get all Teams
const GET_TEAMS = gql`
    {
        getAllTeams{
            id,
            teamName
        }
    }
`;
function getAllTeams(client, callback) {
    client.query({
        query: GET_TEAMS
    }).then(res => {
        callback(res)
    })
}

// Get all Projects
const GET_PROJECTS = gql`
    {
        getAllProjects{
            id,
            projectName
        }
    }
`;
function getAllProjects(client, callback) {
    client.query({
        query: GET_PROJECTS
    }).then(res => {
        callback(res)
    })
}

// Search Ticket Based On Category

const SEARCH_TICKET_BASEDON_CATEGORY = gql`
    mutation searchTicketBasedOnCategory($category: String,$searchText: String ) {
          searchTicketBasedOnCategory(
              category: $category,
              categoryKeyWord:$searchText
          ) {
              id
              name,
              ticketDescription,
              ticket_Id
          }
    }
`;

function searchTicketBasedOnCategory(client, data, callback) {
    client
        .mutate({
            mutation:
                SEARCH_TICKET_BASEDON_CATEGORY, variables: {
                    category: data.category,
                    searchText: data.searchText,
                }
        })
        .then(res => {
            callback(res.data.searchTicketBasedOnCategory != null &&
                res.data.searchTicketBasedOnCategory != undefined ?
                res.data.searchTicketBasedOnCategory : null);
        })
}

// Bulk update ticket
const BULK_UPDATE = gql`
mutation bulkTicketStatusUpdate(
    $bulkStatusChangeIds:JSON
    $status: Int,
    $priorityOne: Int,
    $tagsName: JSON,
    $manager: Int,
    $assignTo: Int,
    $department: Int,
    $team: Int,
    $project: Int,
  ) {
      bulkTicketStatusUpdate(
          bulkStatusChangeIds:$bulkStatusChangeIds
          statusId: $status,
          priorityId: $priorityOne,
          tags: $tagsName,
          managerId: $manager,
          assignedToAgentId: $assignTo,
          departmentId:$department,
          teamId: $team,
          projectId: $project,
  ) {
      id
      name,
      ticketDescription
  }
}
`;

async function bulkUpdate(client, data) {
    let result;
    await client
        .mutate({
            mutation:
                BULK_UPDATE, variables: {
                    status: Number(data.status),
                    priorityOne: Number(data.priorityOne),
                    tagsName: data.tagsName,
                    manager: Number(data.manager),
                    assignTo: Number(data.assignTo),
                    department: Number(data.department),
                    team: Number(data.team),
                    project: Number(data.project),
                    bulkStatusChangeIds: data.bulkStatusChangeIds
                }
        })
        .then(res => {
            result = res;
        })
    return result;
}

export {
    getAllStatus,
    getAllUsers,
    getAllPriority,
    getAllTags,
    getAllDepartments,
    getAllTeams,
    getAllProjects,
    searchTicketBasedOnCategory,
    bulkUpdate
}