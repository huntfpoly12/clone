import gql from "graphql-tag";

const mutations = {
  GET_PRODUCTS: gql`
    mutation getProducts($page: Int!, $limit: Int!) {
      getProducts(page: $page, limit: $limit) {
        products {
          _id
          name
          price
          image
          description
          creator
        }
        paginationInfo {
          prevPage
          nextPage
          totalPages
        }
      }
    }
  `, 
};

export default mutations;
