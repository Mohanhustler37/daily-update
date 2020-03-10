import gql from "graphql-tag";
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from "apollo-boost";
import { baseUrl } from "../../../constants";

const cache = new InMemoryCache();

const client1 = new ApolloClient({
    cache,
    uri: baseUrl.server,
});


const googleLoginData = gql`
mutation ($emailIs:String){
    googleLogin(emailIs: $emailIs) {
        id,
        emailIs,
        token
    }
  }
`;

export async function googleLogin(client, data,callback) {
    let result;
    await client1
        .mutate({
            mutation:
            googleLoginData, variables: {
                    emailIs:data
                }
            }).then(res=>{
                callback(res);
            })
        }




        const loginUserData = gql`
        mutation ($emailIs:String!,$password:String!){
            loginUser(emailIs: $emailIs, password: $password) {
                id,
                emailIs,
                token,
                companyId,
                firstName,
                lastName

          }
        }
        `;
        
        export async function loginUser(client, data,callback) {
            let result;
            await client1
                .mutate({
                    mutation:
                    loginUserData, variables: {
                            emailIs:data.emailIs,
                            password:data.password
                        }
                    }).then(res=>{
                        callback(res);
                    })
                }