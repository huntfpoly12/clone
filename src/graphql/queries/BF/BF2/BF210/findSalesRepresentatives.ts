import gql from "graphql-tag";
export default gql`
  query findSalesRepresentatives {
    findSalesRepresentatives {
      id
      code
      name
      address
      grade
      phone
      mobilePhone
      registerDate
      cancelDate
      companyCount
      status
    }
  }
`;
