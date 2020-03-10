import gql from "graphql-tag";

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
            taskHours
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
            taskHours
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
            taskHours
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
            taskHours
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
            taskHours
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
            taskHours
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