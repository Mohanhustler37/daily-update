import gql from "graphql-tag";


// Validate Domain
const VALIDATE_DOMAIN = gql`
    mutation ValidateDomain($domain:String!){
        validateDomain(
            domain:$domain
        ){
            domain
        }
    }
`;

async function validateDomain(client, data) {
    let result;
    await client
        .mutate({
            mutation:
                VALIDATE_DOMAIN, variables: { domain: data }
        })
        .then(res => {
            result = res;
        }).catch(err => {
            result = err
        })
    console.log("RESULT", result);
    return result;
}

export {
    validateDomain
}