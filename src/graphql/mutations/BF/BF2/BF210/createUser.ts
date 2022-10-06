import gql from "graphql-tag";
const mutations = {
  createUser: gql`
  mutation createUser(
    $type: String!
    $username: String!
    $name: String!
    $managerGrade: Int
    $salesRepresentativeId: Int
    $screenRoleGroupIds: [String!]!
    $mobilePhone: String!
    $email: String!){
        createUser(input:{
            type: $type
            username:$username
            name: $name
            managerGrade: $managerGrade
            salesRepresentativeId: $salesRepresentativeId
            screenRoleGroupIds:$screenRoleGroupIds
            mobilePhone: $mobilePhone
            email: $email
        }){
            
        }
      
    }
    `,
};

export default mutations;
