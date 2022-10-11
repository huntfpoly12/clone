import gql from "graphql-tag";
export default  gql`
query isUserRegistableUsername($username: String! ) {
    isUserRegistableUsername (username:$ username)        
  }

`