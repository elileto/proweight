import{gql} from 'apollo-boost';

const ProductsQuery = gql`
query {
        collections(first: 1, query: "title:'weighted'") {
          edges {
            node {
              title
              productsCount
              products(first: 20) {
                edges {
                  node {
                    handle
                    title
                    id
                    description
                    images(first: 1) {
                      edges {
                        node {
                          transformedSrc
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      
`;

export default ProductsQuery;