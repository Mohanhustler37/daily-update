import gql from "graphql-tag";

// Edit Task

const EDIT_TASK = gql`
    mutation EditTicket(
        $id:Int,
        $taskTitle:String!
        $assignTo:Int!
        $taskHours:String
        $startTime:Date!
        $dueTime:Date
        $sendCopyTo:Int
        $taskDescription:String
        $priority:Int
        $tags:JSON
        $linkWithTicket:Int,
        $linkWithProject:Int,
        $linkWithTask:Int,
        $linkWithObjective:Int,
        
        $companyId: Int
        $departmentId: Int
        $teamId: Int
        $projectId: Int
    ){
        updateTask(
            id:$id
            taskTitle:$taskTitle
            assignTo:$assignTo
            taskHours:$taskHours
            startTime:$startTime
            dueTime:$dueTime
            sendCopyTo:$sendCopyTo
            taskDescription:$taskDescription
            priority:$priority
            tags:$tags
            linkWithTicket:$linkWithTicket,
            linkWithProject:$linkWithProject,
            linkWithTask:$linkWithTask,
            linkWithObjective:$linkWithObjective,

            companyId: $companyId,
            departmentId: $departmentId,
            teamId: $teamId,
            projectId:$projectId,
        )
        {
            id,
            taskTitle
        }
    }
`;

async function updateTaskData(client, data) {
    let result;
    await client
        .mutate({
            mutation:
                EDIT_TASK, variables: {
                    id: Number(data.id),
                    taskTitle: data.taskTitle,
                    assignTo: data.assignTo,
                    taskHours: data.estimateTime,
                    startTime: data.fromDate,
                    dueTime: data.toDate,
                    sendCopyTo: data.sendCopyTo,
                    taskDescription: data.taskDescription,
                    priority: data.priorityId,
                    tags: data.tags,
                    linkWithTicket: data.linkWithTicket,
                    linkWithProject: data.linkWithProject,
                    linkWithTask: data.linkWithTask,
                    linkWithObjective: data.linkWithObjective,

                    companyId: Number(data.companyDataId),
                    departmentId: Number(data.departmentDataId),
                    teamId: Number(data.teamDataId),
                    projectId: Number(data.projectDataId)
                }
        })
        .then(res => {
            result = res;
            console.log('updateTaskData_updateTaskData', result)
        })
    return result;
}

// Get Teams
const GET_TEAMS = gql`
    {
        getAllTeams {
            id,
            teamName,
        }
    }
`;
async function getAllTeams(client) {
    let result;
    await client
        .query({
            query: GET_TEAMS
        }).then(res => {
            result = res.data.getAllTeams;
        })
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


export const getUserById = (client, callback) => {
    client
        .query({
            query:
            getUserByIdData,variables:{id:parseInt(localStorage.getItem('id'))}
        })
        .then(res => {
            callback(res)
        })
}


const getAllTaskData = gql`
query tasksList 
        {
            tasksList{
            id
            taskTitle,
          }
        }
`;


export const getAllTask = (client, callback) => {
    client
        .query({
            query:
            getAllTaskData
        })
        .then(res => {
            callback(res)
        })
}


const getAllProjectsData = gql`
query getAllProjects 
        {
          getAllProjects{
            id
            projectName,
          }
        }
`;


export const getAllProjects = (client, callback) => {
    client
        .query({
            query:
            getAllProjectsData
        })
        .then(res => {
            callback(res)
        })
}


const getAllTicketsData = gql`
query ticketsList 
        {
          ticketsList{
            id
            name,
          }
        }
`;


export const getAllTickets = (client, callback) => {
    client
        .query({
            query:
            getAllTicketsData
        })
        .then(res => {
            callback(res)
        })
}

const getAllObjectivesData = gql`
query getAllObjectives 
        {
          getAllObjectives{
            id
            objectiveTitle,
          }
        }
`;


export const getAllObjectives = (client, callback) => {
    client
        .query({
            query:
            getAllObjectivesData
        })
        .then(res => {
            callback(res)
        })
}


const getAllPrioritiesData = gql`
query {
    priorities {
      id,
      priorityname,
    }
  }
`;


export const getAllPriorities = (client, callback) => {
    client
        .query({
            query:
            getAllPrioritiesData
        })
        .then(res => {
            callback(res)
        })
}

const getAllUsersData = gql`
query {
    getAllUsers {
      id,
      username,
      emailIs
      firstName
      lastName
    }
  }
`;


export const getAllUsers = (client, callback) => {
    client
        .query({
            query:
            getAllUsersData
        })
        .then(res => {
            callback(res)
        })
}


export {
    updateTaskData,
    getAllTeams,
    getAllCompanies
}