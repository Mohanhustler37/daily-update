import gql from "graphql-tag";

const CLOSE_TICKETS = gql`
    mutation CloseTicket($ticketIds:JSON,$status: Int){
        closeTicket(
            ticketIds:$ticketIds
            statusId:$status
        ){
            id,
            statusId
        }
    }
`;

async function closeTicket(client, data) {
    let result;
    await client
        .mutate({
            mutation:
                CLOSE_TICKETS, variables: { ticketIds: data, status: 6 }
        })
        .then(res => {
            result = res
        })
    return result;
}

const DELETE_TICKETS = gql`
    mutation RemoveMultipleTickets($ticketIds:JSON){
        removeMultipleTickets(
            ticketIds:$ticketIds
        ){
            id,
            active
        }
    }
`;

async function removeMultipleTickets(client, data) {
    let result;
    await client
        .mutate({
            mutation:
                DELETE_TICKETS, variables: { ticketIds: data }
        })
        .then(res => {
            result = res
        })
    return result;
}



const isDuplicateTicketData = gql`
mutation ($id:Int!) {
    isDuplicate(id: $id) {
          id
    }
  }
`;

async function isDuplicateTicket(client, data) {
    let result;
    await client
        .mutate({
            mutation:
            isDuplicateTicketData, variables: { ticketIds: data }
        })
        .then(res => {
            result = res
        })
    return result;
}

export {
    closeTicket,
    removeMultipleTickets,
    isDuplicateTicket,
}