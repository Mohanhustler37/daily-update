import gql from "graphql-tag";

const addCommentData = gql`
mutation searchTicketBasedOnCategory(
    $searchText: String,
    $category: String,
  ) {
  searchTicketBasedOnCategory(
      category: $category,
      categoryKeyWord:$searchText
  ) {
      id
      name,
      ticketDescription
  }
}
`;

export const addComment = async(client, data,callback) => {
    await client
        .mutate({
            mutation:
            addCommentData, variables: { 
                sourceFor:data.sourceFor,
                sourceId: data.sourceId,
                userId:data.userId,
                comments:data.comments,
             }
        })
        .then(async res => {
            callback(res);
        })
}