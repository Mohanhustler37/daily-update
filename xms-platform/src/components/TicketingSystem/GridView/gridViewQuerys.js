import gql from "graphql-tag";

const getTicketUnderManager = gql`
    query
        GetTicketUnderManager($managerId:Int,$pageNo:Int){
            getTicketUnderManager(
                managerId:$managerId,
                pageNo:$pageNo
            ){
                id,
                name,
                ticketDescription,
                userId,
                statusId,
                tenantId,
                companyId
            }
        }
`;

export const getGridData = (client, managerId, pageNo, callback) => {
    client
        .query({
            query:
                getTicketUnderManager, variables: { managerId: managerId, pageNo: pageNo }
        })
        .then(res => {
            callback(res)
        })
}