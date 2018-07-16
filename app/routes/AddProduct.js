import React from 'react';
import {Page, Card, Form, TextField, FormLayout, Button, Banner, Stack, Thumbnail, DropZone, Caption } from '@shopify/polaris';
import {ApolloProvider, Mutation, Query} from 'react-apollo';
import ApolloClient, {gql} from 'apollo-boost';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
});

const FIND_COLLECTION = gql`
{
  collections(first: 1, query: "title:'weighted'") {
    edges {
      node {
        title
        id
      }
    }
  }
}
`;

const CREATE_PRODUCT = gql`
  mutation CreateProduct($product: ProductInput!) {
    productCreate(input: $product) {
      product {
        id
        title
      }
    }
  }
`;



class AddProduct extends React.Component
    { 

      state = {
        title: '',
        description: '',
      };

      
      
      render(){

      const {title, description} = this.state;

      

      function mutate(createProduct) {
        let images;

        {files.map((file) => (
          images = window.URL.createObjectURL(file)
          ))} 
        const productInput = {
          title: title,
          bodyHtml: description,
          collectionsToJoin: ["gid://shopify/Collection/57963610168"]

        };

      createProduct({
        variables: {
          product: productInput
        }
      });
  
      }
      

      return (
          <Page
            title=" Add  a Product to your Weighted Collection">
              <ApolloProvider client={client}>

              <Query query={FIND_COLLECTION} >
                {({ loading, error, data }) => {
                 if (loading) return null;
                if (error) return `Error!: ${error}`;

                    return (<Mutation mutation={CREATE_PRODUCT}>
                      {(createProduct, mutationResults) => {
                          const loading = mutationResults.loading && <Banner title="Loading...">
                          <p>Creating product</p>
                          </Banner>;

                          const error = mutationResults.error && <Banner title="Error" status="warning">
                          <p>Product could not be created</p>
                          </Banner>;

                          const success = mutationResults.data && (<Banner title="Success" status="success">
                          <p>Successfully created</p>
                          
                          </Banner>);

                        return (
                          <Card>
                            
                            <Form onSubmit= {(event) => {
                              this.setState({title: {title}}, {description: {description}, });
                              mutate(createProduct);
                              }}>
                              <Card.Section>
                              {loading}
                              {error}
                              {success}
                                <FormLayout>
                                
                                  <TextField
                                      value={title}
                                      onChange={this.handleChange('title')}
                                      label="Title"
                                      type="text"
                                      helpText={
                                        <span>
                                          This will be the name of your product.
                                        </span>
                                      }
                                  />
                                  <TextField
                                    value={description}
                                    onChange={this.handleChange('description')}
                                    label="Description"
                                    type="text"
                                    helpText={
                                      <span>
                                        This will be the description of your product.
                                      </span>
                                    }
                                  />
                                
                                  <Button submit>Submit</Button>
                                </FormLayout>
                              </Card.Section>
                            </Form>
                          </Card>      
                          )
                      }}
                    </Mutation>)
                  }}
                </Query>
              </ApolloProvider>
          </Page>    
      );
    }

    handleChange = (field) => {
      return (value) => this.setState({[field]: value});
    };

  }
  
  export default  AddProduct;
  
  
