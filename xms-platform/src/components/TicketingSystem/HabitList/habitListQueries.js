import gql from "graphql-tag";

const getHabitBystatus = gql`
    query getHabitBystatus($goal:Int!)
    {
        getHabitBystatus(goal:$goal){
            id,
            habitTitle,
            habitDescription,
            startTime,
            progressPercent,
            statusId,
            goal
        }
    }
`;
export const getHabitBytatus = (client, goal, callback) => {
    client
        .query({
            query:
            getHabitBystatus, variables: { goal: 2 }
        })
        .then(res => {
            callback(res)
        })
}
const getHabitBygoal = gql`
    query getHabitBygoal($goal:Int!)
    {
        getHabitBygoal(goal:$goal){
            id,
            habitTitle,
            habitDescription,
            startTime,
            progressPercent,
            statusId,
            goal
        }
    }
`;
export const getHabitBygoalweekly = (client, goal, callback) => {
    client
        .query({
            query:
            getHabitBygoal, variables: { goal: 1 }
        })
        .then(res => {
            callback(res)
        })
}

const getBackLogData = gql`
    query GetBacklogHabit
    {
        getBacklogHabit{
            id
            habitId
            habitTitle
            habitDescription
            startTime
            progressPercent
            statusId
            progressEstimatedTime
            tags
            comments
            assignTo
            logTime
            reminder
            linkWithTask
            departmentId
            companyId
            teamId
            tenantId
            taskId
            projectId
            habitTemplate
            location
            goal
            frequency
            parentHabitId
            groupHabitId
            assignBy
            data
            habitCount
            setTime
            count
            subHabitId
            completedHabit
            totalSubHabit
            saveTemplate
            ticketId
            file
        }
    }
`;

export const getHabitsBacklogData = (client, callback) => {
    client
        .query({
            query:
                getBackLogData
        })
        .then(res => {
            callback(res)
        })
}
const getTodayData = gql`
    query getTodayHabit($pageNo:Int!)
    {
        getTodayHabit(pageNo:$pageNo){
            id,
            habitTitle,
            habitDescription,
            goal
        }
    }
`;



export const getHabitsTodayData = (client, pageNo, callback) => {
    client
        .query({
            query:
                getTodayData, variables: { pageNo: pageNo }
        })
        .then(res => {
            callback(res)
        })
}


const getTomorrowHabits = gql`
    query GetTomorrowHabits($pageNo:Int!)
    {
        getTomorrowHabit(pageNo:$pageNo){
            id,
            habitTitle,
            habitDescription
        }
    }
`;
const GET_PROJECTS = gql`
{
    getAllProjects{
        id,
        projectName
    }
}
`;

function GetProjects(client, callback) {
    client
        .query({
            query:
                GET_PROJECTS
        })
        .then(res => {
            callback(res);
        })
}

export const getHabitTomorrowData = (client, pageNo, callback) => {
    client
        .query({
            query:
                getTomorrowHabits, variables: { pageNo: pageNo }
        })
        .then(res => {
            callback(res)
        })
}

const getHabitDuration = gql`
    query getHabitsByDuration($goal:Int!)
    {
        getHabitsByDuration(goal:$goal){
            id
            habitId
            habitTitle
            habitDescription
            startTime
            progressPercent
            statusId
            progressEstimatedTime
            tags
            comments
            assignTo
            logTime
            reminder
            linkWithTask
            departmentId
            companyId
            teamId
            tenantId
            taskId
            projectId
            habitTemplate
            location
            goal
            frequency
            parentHabitId
            groupHabitId
            assignBy
            data
            habitCount
            setTime
            count
            subHabitId
            completedHabit
            totalSubHabit
            saveTemplate
            ticketId
            file
        }
    }
`;


export const getHabitsByDuration = (client, id, callback) => {
    client
        .query({
            query:
            getHabitDuration, variables: { goal: id }
        })
        .then(res => {
            callback(res)
        })
}


const getHabitByAssignTo = gql`
    query habitsByAssignee($assignTo:Int!)
    {
        habitsByAssignee(assignTo:$assignTo){
            id
            habitId
            habitTitle
            habitDescription
            startTime
            progressPercent
            statusId
            progressEstimatedTime
            tags
            comments
            assignTo
            logTime
            reminder
            linkWithTask
            departmentId
            companyId
            teamId
            tenantId
            taskId
            projectId
            habitTemplate
            location
            goal
            frequency
            parentHabitId
            groupHabitId
            assignBy
            data
            habitCount
            setTime
            count
            subHabitId
            completedHabit
            totalSubHabit
            saveTemplate
            ticketId
            file
        }
    }
`;


export const getHabitsByAssignee = (client, id, callback) => {
    client
        .query({
            query:
            getHabitByAssignTo, variables: { assignTo: id }
        })
        .then(res => {
            callback(res)
        })
}


const getAllHabit = gql`
    query habitsList
    {
        habitsList{
            id
            habitId
            habitTitle
            habitDescription
            startTime
            progressPercent
            statusId
            progressEstimatedTime
            tags
            comments
            assignTo
            logTime
            reminder
            linkWithTask
            departmentId
            companyId
            teamId
            tenantId
            taskId
            projectId
            habitTemplate
            location
            goal
            frequency
            parentHabitId
            groupHabitId
            assignBy
            data
            habitCount
            setTime
            count
            subHabitId
            completedHabit
            totalSubHabit
            saveTemplate
            ticketId
            file
        }
    }
`;


export const getAllHabits = (client, callback) => {
    client
        .query({
            query:
            getAllHabit
        })
        .then(res => {
            callback(res)
        })
}


const getAllPriorityData = gql`
query priorities{
    priorities {
        priorityname,
        description,
    }
  }
`;


export const getAllPriority = (client, callback) => {
    client
        .query({
            query:
            getAllPriorityData
        })
        .then(res => {
            callback(res)
        })
}


const getAllStatusData = gql`
query {
    getAllStatus {
        statusName,
        statusDescription,
    }
  }
`;


export const getAllStatus = (client, callback) => {
    client
        .query({
            query:
            getAllStatusData
        })
        .then(res => {
            callback(res)
        })
}



const assignUserHabitData = gql`
mutation assignUserHabit(
    $id: Int!,
    $assignTo: Int!,
    $assignBy: Int!
  ) 
  {
    assignUserHabit(
        id: $id,
        assignTo:$assignTo,
        assignBy:$assignBy
      )
      {
        id,
      }
  }
`;

export const assignUserHabit = async(client, data,callback) => {
    await client
        .mutate({
            mutation:
            assignUserHabitData, variables: { 
                id:data.id,
                assignBy:parseInt(localStorage.getItem("id")),
                assignTo:data.assignTo
             }
        })
        .then(async res => {
            callback(res);
            // result = res;
        })
    // return result;
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
                reminderTitle: data.reminderTitle,
                reminderDependecyId: data.reminderDependecyId,
                reminderType:data.reminderType,
                reminderTime:data.reminderTime,
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
    $reminderDependecyId: Int,
    $reminderType: String,
    $reminderTime: JSON,
  ) 
  {
    removereminder(
        id:$id
        reminderDependecyId: $reminderDependecyId,
        reminderType:$reminderType,
        reminderTime:$reminderTime,
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
                id:data.id,
                reminderDependecyId: data.reminderDependecyId,
                reminderType:data.reminderType,
                reminderTime:data.reminderTime,
             }
        })
        .then(async res => {
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
        })
}

export {
    GetProjects
}