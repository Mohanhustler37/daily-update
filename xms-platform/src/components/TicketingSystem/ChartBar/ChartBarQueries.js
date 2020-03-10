import gql from "graphql-tag";

const GetoverviewchartTicket = gql`
    query GetoverviewchartTicket($companyId:Int!){
        getoverviewchartTicket(companyId:$companyId){
            values
        }
    }
`;

const Gettheallticketsdata = gql`
    query Gettheallticketsdata($companyId:Int!,$category:String){
        gettheallticketsdata(companyId:$companyId,category:$category){
            id
        }
    }
`;

export {
  GetoverviewchartTicket,
  Gettheallticketsdata
}
