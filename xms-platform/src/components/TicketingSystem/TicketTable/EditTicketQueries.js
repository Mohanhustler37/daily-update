import gql from "graphql-tag"

const GET_DEPARTMENTS = gql`
       {
            getAllDepartments{
                id,
                departmentName
            }
        }
`;

async function GetDepartments(client) {
    let result;
    await client
        .query({
            query:
                GET_DEPARTMENTS
        })
        .then(res => {
            // callback(res);
            result = res;
        })
    return result;
}


const GET_STATUS = gql`
       {
        getAllStatus{
                id,
                statusName
            }
        }
`;

async function GetStatus(client) {
    let result;
    await client
        .query({
            query:
                GET_STATUS
        })
        .then(res => {
            result = res;
        })
    return result;
}


const GET_TEAM = gql`
       {
        getAllTeams{
                id,
                teamName
            }
        }
`;

async function GetTeams(client) {
    let result;
    await client
        .query({
            query:
                GET_TEAM
        })
        .then(res => {
            result = res;
        })
    return result;
}



const GET_TICKET_TYPE = gql`
{
    getAllticket_type{
        id,
        title,
        description
    }
}
`;

async function GetTicketType(client) {
    let result;
    await client
        .query({
            query:
                GET_TICKET_TYPE
        })
        .then(res => {
            result = res.data.getAllticket_type;
        })
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
async function getAllUsers(client) {
    let result;
    await client.query({
        query: GET_USERS
    }).then(res => {
        result = res.data.getAllUsers;
    });
    return result;
}

const GET_COMPANIES = gql`
       {
        getAllCompany{
                id,
                companyName
            }
        }
`;

async function GetCompanies(client) {
    let result;
    await client
        .query({
            query:
                GET_COMPANIES
        })
        .then(res => {
            result = res;
        })
    return result;
}


const GET_PRIORITY = gql`
       {
        priorities{
                id,
                priorityname
            }
        }
`;
async function GetPriority(client) {
    let result;
    await client
        .query({
            query:
                GET_PRIORITY
        })
        .then(res => {
            result = res;
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
async function getAllTags(client) {
    let result;
    await client.query({
        query: GET_TAGS, variables: { companyId: 1 }
    }).then(res => {
        result = res.data.allTags;
    })
    return result;
}

const GET_PROJECTS = gql`
{
    getAllProjects{
        id,
        projectName
    }
}
`;
async function GetProjects(client) {
    let result;
    await client
        .query({
            query:
                GET_PROJECTS
        })
        .then(res => {
            result = res;
        })
    return result;
}



// Edit ticket
const EDIT_TICKET = gql`
mutation UpdateTicket(
    $id:Int!,$company:Int!,$name: String, $status:Int,
    $priority:Int,$tags:JSON,$ticket_description: String,
    $manager:Int!,$assignedTo:Int!,
    $department:Int!,$team:Int!,$project:Int!,
  ) {
  updateTicket(
      id:$id,
      companyId:$company,
      name: $name, 
      statusId:$status,
      priorityId:$priority,
      ticketDescription: $ticket_description,
      tags:$tags,
      managerId:$manager,
      assignedToAgentId:$assignedTo,
      departmentId:$department,
      teamId:$team,
      projectId:$project,
  ) {
    id
    name
    ticketDescription
    userId
    ticketType
    priorityId
  }
}
`;

async function updateTicket(client, data) {
    let result;
    await client
        .mutate({
            mutation:
                EDIT_TICKET, variables: {

                    id: Number(data.id),
                    company: Number(data.companyName),
                    name: data.name,
                    status: Number(data.statusId),
                    priority: Number(data.priorityId),
                    ticket_description: data.ticketDescription,
                    tags: data.tags,
                    // ticketType: Number(data.ticketTypeName),
                    manager: Number(data.managerId),
                    assignedTo: Number(data.assignedToAgentId),
                    department: Number(data.departmentId),
                    team: Number(data.teamId),
                    // tenantId: data.tenantId,
                    project: Number(data.projectId),
                    // userId: data.userId,
                }
        })
        .then(res => {
            result = res;
        })
    return result;
}

export {
    GetDepartments,
    GetCompanies,
    GetStatus,
    GetPriority,
    GetTeams,
    GetProjects,
    updateTicket,
    GetTicketType,
    getAllUsers,
    getAllTags
}
