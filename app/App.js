import React from 'react';
import GameList from './components/GameList';
import Fetch from 'react-fetch-component';
import ApolloClient, {gql} from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {Mutation} from 'react-apollo';
import {Switch, Route, withRouter} from 'react-router';
import RoutePropagator from '@shopify/react-shopify-app-route-propagator';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
});

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
const Propagator = withRouter(RoutePropagator);


export default function() {
  return (
    <Switch>
      <Route exact path="/">
        <div>
        <h1>Board game loader</h1>
        <ApolloProvider client={client}>
        <Fetch url="https://boardgameslist.herokuapp.com" as="json">
            {(fetchResults) => {
              if (fetchResults.loading) {
                return <p>Loading</p>
              }

              if (fetchResults.error) {
                return <p>failed to fetch games</p>
              }

              return (<Mutation mutation={CREATE_PRODUCT}>
                {(createProduct, mutationResults) => {
                  const loading = mutationResults.loading && <p>loading... </p>;

                  const error = mutationResults.error && <p>error creating product</p>;

                  const success = mutationResults.data && (
                    <p>
                      successfully created &nbsp;
                      {mutationResults.data.productCreate.product.title}
                    </p>
                  );

                  return (
                    <React.Fragment>
                      <Propagator />
                      <GameList
                        games={fetchResults.data}
                        onAddGame={(title) => {
                          const productInput = {
                            title: title,
                            productType: 'board game',
                          };

                          createProduct({
                            variables: {product: productInput},
                          });
                        }}
                      />
                      {loading}
                      {error}
                      {success}
                    </React.Fragment>
                  );
                }}
              </Mutation>)
            }}

          </Fetch>
        </ApolloProvider>
        </div>
      </Route>
      <Route exact path="/settings">
        <div>
          <h1>Settings</h1>
        </div>
      </Route>
    </Switch>
  );
}
