import gql from "graphql-tag";

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


const addCommentsToTaskData = gql`
mutation addComment(
    $sourceFor:String,$userId:Int,
     $comments:String,$sourceId:Int
   ) 
   {
       addComment(
       userId:$userId, comments:$comments,sourceFor:$sourceFor,sourceId:$sourceId
       )
       {
         id,
         comments
       }
   }
`;

export const addCommentsToTask = async(client,data,callback) => {
    await client
        .mutate({
            mutation:
            addCommentsToTaskData, variables: {
                sourceFor: data.sourceFor,
                sourceId: data.sourceId,
                userId: data.userId,
                comments: data.comments
             }
        })
        .then(async res => {
            callback(res);
        })
}