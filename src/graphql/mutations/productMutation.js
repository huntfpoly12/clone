import gql from "graphql-tag";
const productMutation = {
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

  createProduct: gql`
    mutation createProduct(
      $name: String!
      $price: Int!
      $image: String!
      $description: String!
    ) {
      addProduct(
        name: $name
        price: $price
        image: $image
        description: $description
      ) {
        _id
      }
    }
  `,

  updateProduct: gql`
    mutation updateProduct(
      $id: ID!
      $name: String!
      $price: Int!
      $image: String!
      $description: String!
    ) {
      updateProduct(
        id: $id
        name: $name
        price: $price
        image: $image
        description: $description
      ) {
        name
      }
    }
  `,

  deleteProduct: gql`
    mutation deleteProduct($id: ID!) {
      deleteProduct(id: $id)
    }
  `,
}
export default productMutation