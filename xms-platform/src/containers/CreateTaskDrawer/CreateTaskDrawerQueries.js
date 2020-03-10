import gql from "graphql-tag";

const addTaskData = gql`
mutation addTask(
    $taskTitle:String!
    $assignTo:Int!
    $startTime:Date!
    $dueTime:Date
    $companyId:Int
    $departmentId:Int
    $teamId:Int
    $sendCopyTo:Int
    $taskDescription:String
    $priority:Int
    $relatedTo:Int,
    $linkWithTicket:Int
    $linkWithProject:Int
    $linkWithTask:Int
    $linkWithObjective:Int
    $tags:JSON,
    $taskHours:String
    $createdBy:Int!
    $saveTemplate:Boolean
    $billable:Boolean
    )
    {
      addTask(
        taskTitle:$taskTitle
        assignTo:$assignTo
        startTime:$startTime
        dueTime:$dueTime
        companyId:$companyId
        departmentId:$departmentId
        teamId:$teamId
        sendCopyTo:$sendCopyTo
        taskDescription:$taskDescription,
        priority:$priority,
        relatedTo:$relatedTo,
        linkWithTicket:$linkWithTicket,
        linkWithProject:$linkWithProject,
        linkWithTask:$linkWithTask,
        linkWithObjective:$linkWithObjective,
        tags:$tags,
        taskHours:$taskHours
        createdBy:$createdBy
        saveTemplate:$saveTemplate,
        billable:$billable
        )
        {
          id
          taskTitle
          assignTo
          startTime
          dueTime
          companyId
          departmentId
          teamId
          sendCopyTo
          taskHours
          taskDescription
          priority
          relatedTo
          linkWithTicket
          linkWithProject
          linkWithTask
          linkWithObjective
          tags,
          statusId
        }
    }
`;

export const addTask = async(client, data,callback) => {
    await client
        .mutate({
            mutation:
            addTaskData, variables: { 
                taskTitle:data.taskTitle,
                assignTo:data.assignTo,
                startTime:data.startTime,
                dueTime:data.dueTime,
                companyId:data.companyId,
                departmentId:data.departmentId,
                teamId:data.teamId,
                sendCopyTo:data.sendCopyTo,
                taskDescription:data.taskDescription,
                priority:data.priority,
                relatedTo:data.relatedTo,
                linkWithTicket:data.linkWithTicket,
                linkWithProject:data.linkWithProject,
                linkWithTask:data.linkWithTask,
                linkWithObjective:data.linkWithObjective,
                tags:data.tags,
                taskHours:data.taskHours,
                createdBy:data.createdBy,
                saveTemplate:data.saveTemplate,
                billable:data.billable,
             }
        })
        .then(async res => {
            callback(res);
        })
}

const getAllTaskTemplatesData = gql`
query taskTemplate($tenantId:Int!){
    taskTemplate(tenantId:$tenantId){
        id,
        templateName,
        taskDescription,
        taskPrefix,
        tenantId
    }
}
`;


export const getAllTaskTemplates = (client, tenantId, callback) => {
    client
        .query({
            query:
            getAllTaskTemplatesData,variables:{tenantId:tenantId}
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



const getAllTasksData = gql`
query tasksList 
        {
            tasksList{
            id
            taskTitle,
          }
        }
`;


export const getAllTasks = (client, callback) => {
    client
        .query({
            query:
            getAllTasksData
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



const searchTemplateData = gql`
mutation searchTaskTemplate($templateName:String!,$tenantId:Int){
    searchTaskTemplate(templateName:$templateName,tenantId:$tenantId){
        id,templateName,
        taskDescription,
        taskPrefix,tenantId
    }
}
`;

export const searchTemplateMutation = async(client, data,callback) => {
    await client
        .mutate({
            mutation:
            searchTemplateData, variables: {
                templateName:data.templateName,
                tenantId:data.tenantId,
             }
        })
        .then(async res => {
            callback(res);
        })
}