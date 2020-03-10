import gql from "graphql-tag";

const sendMessageData = gql`
mutation sendMessage(
    $fromUserId: String!,
    $toUserId: String!
    $text: String!,
    $socketId: String!,
) {
    sendMessage(
        fromUserId: $fromUserId,
        toUserId: $toUserId,
        text: $text,
        socketId: $socketId
) {
    _id
    fromUserId
    toUserId
    text
    active
}
}
`;

export async function sendMessage1(client, data,callback) {
    let result;
    await client
        .mutate({
            mutation:
            sendMessageData, variables: {
                fromUserId:data.fromUserId,
                toUserId:data.toUserId,
                text:data.text,
                socketId:data.socketId,
                }
            }).then(res=>{
                callback(res);
            })
        }