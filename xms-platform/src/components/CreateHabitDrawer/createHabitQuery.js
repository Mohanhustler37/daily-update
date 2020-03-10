import gql from "graphql-tag";
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from "apollo-boost";
import { baseUrl } from "../../constants";

const cache = new InMemoryCache();

const client = new ApolloClient({
    cache,
    uri: baseUrl.server,
});


// Get User By ID
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
export const getUserById = (client, callback)=> {
    client
        .query({
            query: getUserByIdData,variables: {
                id: parseInt(localStorage.getItem("id"))
              }
        })
        .then(res => {
            callback(res);
        })
}

const getAllUsersData = gql`
query getAllUsers 
{
  getAllUsers{
    id,
    firstName,
    lastName,
    emailIs,
    password,
    userRollId,
    companyId,
    departmentId,
    status,
    phoneNumber,
    }
}
`;
export const getAllUsers = (client, callback)=> {
    client
        .query({
            query: getAllUsersData
        })
        .then(res => {
            callback(res);
        })
}


const getAllTemplatesData = gql`
query getAllHabitTemplates{
    getAllHabitTemplates {
      id,
      templateName,
      habitDescription
    }
  }
`;
export const getAllTemplates = (client, callback)=> {
    client
        .query({
            query: getAllTemplatesData
        })
        .then(res => {
            callback(res);
        })
}


const getCompanyByIdData = gql`
query getAllCompany{
    getAllCompany {
      id,
      companyName,
      companyDescription
    }
  }
`;
export const getCompanyById = (client, callback)=> {
    client
        .query({
            query: getCompanyByIdData
        })
        .then(res => {
            callback(res);
        })
}

const getDepartmentsData = gql`
query {
    getAllDepartments {
      id,
      departmentName
    }
  }
`;
export const getDepartments = (client, callback)=> {
    client
        .query({
            query: getDepartmentsData
        })
        .then(res => {
            callback(res);
        })
}


const getTagsData = gql`
query allTags($companyId:Int!) 
    {
      allTags(companyId:$companyId){
        id,
         tagTitle
        }
    }
`;
export const getTags = (client,id, callback)=> {
    client
        .query({
            query: getTagsData,variables:{companyId:id}
        })
        .then(res => {
            callback(res);
        })
}


const getTeamsData = gql`
query getTeamByCompanyIdAndDepartmentId($companyId:Int,$departmentId:Int,$tenantId:Int)
             {
              getTeamByCompanyIdAndDepartmentId(companyId:$companyId,departmentId:$departmentId,tenantId:$tenantId){
              id,
              teamName
              }
            }
`;
export const getTeams = (client,a,b,c,callback)=> {
    client
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

const createHabitData = gql`
    mutation addHabit(
              $habitTitle: String, $count: Int!,$setTime:[String],$assignBy:Int,
              $tenantId:Int,$location:String,$goal:Int,$shareMail:String,
              $isShareThroughEmail:Boolean,
              $saveTemplate:Boolean,$frequency:JSON,
              $responsibleUsers:[Int],
              $tags1:[String],
              $companyId:Int,
              $departmentId:Int,
              $teamId:Int,
              $projectId:Int,
            ) 
            {
              addHabit(
                habitTitle: $habitTitle, count: $count,
                setTime:$setTime,tenantId:$tenantId,
                assignBy:$assignBy,
                location:$location,
                goal:$goal,
                shareMail:$shareMail,
                isShareThroughEmail:$isShareThroughEmail,
                saveTemplate:$saveTemplate,
                frequency:$frequency,responsibleUsers:$responsibleUsers,
                tags1:$tags1,
                companyId:$companyId
                departmentId:$departmentId
                teamId:$teamId
                projectId:$projectId
                )
                {
                  id,
                  habitTitle,
                  habitCount,
                  progressPercent,
                }
            }
`;

export const createHabit = async(client, data,callback) => {
    await client
        .mutate({
            mutation:
            createHabitData, variables: { 
                habitTitle:data.habitTitle,
                tenantId:data.tenantId,
                count:data.count,
                setTime:data.setTime,
                location:data.location,
                assignBy:data.assignBy,
                goal:data.goal,
                shareMail:data.shareMail,
                isShareThroughEmail:data.isShareThroughEmail,
                saveTemplate:data.saveTemplate,
                frequency:data.frequency,
                responsibleUsers:data.responsibleUsers,
                tags1:data.tags1,
                companyId:data.companyId,
                departmentId:data.departmentId,
                teamId:data.teamId,
                projectId:data.projectId,
             }
        })
        .then(async res => {
            callback(res);
            // result = res;
        })
    // return result;
}
