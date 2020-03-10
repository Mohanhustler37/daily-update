import gql from "graphql-tag";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { baseUrl } from "../../../../constants";

const cache = new InMemoryCache();



const client = new ApolloClient({
    cache,
    link: new HttpLink({
      uri: baseUrl.server,
      headers: {
        'client-name': 'Space Explorer [web]',
        'client-version': '1.0.0',
      },
    }),
  });

const UpdateTaskData = gql`
mutation updateTaskTimeLog(
    $id:Int!
    $taskHours:String,
  ) 
  {
    updateTaskTimeLog(id:$id,taskHours:$taskHours)
      {
        id,
        taskTitle
        taskHours
      }
  }
`;

export const UpdateTask = async(data,callback) => {
    await client
        .mutate({
            mutation:
            UpdateTaskData, variables: {
                id:data.id,
                taskHours:data.taskHours
             }
        })
        .then(async res => {
            callback(res);
        })
}
