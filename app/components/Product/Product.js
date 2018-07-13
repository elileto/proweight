import React from 'react';
import {graphql} from 'react-apollo';
import {gql} from 'apollo-boost';
import {VariantForm} from '../../components';
import {ApolloProvider, Query} from 'react-apollo';
import ApolloClient  from 'apollo-boost';

import {
  Avatar,
  Card,
  Page,
  Layout,   
  Heading,  
  SkeletonPage,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
  Stack,
  Thumbnail

} from '@shopify/polaris';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
});

const GET_PRODUCT = gql`
  query ProductQuery($id: ID!) {
    product(id: $id) {
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
`;

export default function Product(props) {


  
  return (
      
    <Page
      breadcrumbs={[{content: 'All products', url: '/dashboard'}]}
    >
      <Layout>
        <Layout.Section>
        <ApolloProvider client={client}> 
        
        <Query query={GET_PRODUCT} variables={ {id: "gid://shopify/Product/" + props.match.params.id} }>
        {({ loading, error, data }) => {
          
          if (loading) {
            return (
              <SkeletonPage>
                    <Card title="Product" sectioned>
                      <TextContainer>
                        <SkeletonDisplayText size="small" />
                        <SkeletonBodyText />
                      </TextContainer>

                      <TextContainer>
                        <SkeletonDisplayText size="small" />
                        <SkeletonBodyText />
                      </TextContainer>
                      </Card>
              </SkeletonPage>
            );
          }

          return(
            <Page
            title={data.product.title}
            secondaryFooterAction={{content: 'Cancel Changes'}}
            primaryFooterAction={{content: 'Update Product'}}
            
            >

            <Card>
                <Card.Section>
                <TextContainer>
                <Stack>
                <Thumbnail
                source={data.product.images.edges[0].node.transformedSrc} 
                alt="Black choker necklace"
                size="large" 
                />
                <Stack vertical={true}  spacing="extraTight">
                  <Heading>{data.product.title}</Heading>
                  <p>
                    {data.product.description}
                  </p>
                  </Stack>
                  </Stack>
                </TextContainer>
                </Card.Section>
                <Card.Section>
                <VariantForm {...props}/>
                </Card.Section>
            </Card>
            </Page>
            )
        }}

            </Query>
          </ApolloProvider> 
        </Layout.Section>
      </Layout>
    </Page>
  );
}
