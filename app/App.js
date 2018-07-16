import React from 'react';
import ApolloClient, {gql} from 'apollo-boost';
import {Switch, Route, withRouter} from 'react-router';
import RoutePropagator from '@shopify/react-shopify-app-route-propagator';
import {ApolloProvider} from 'react-apollo';

import {Link, AppProvider, Page, Icon} from '@shopify/polaris';

import Dashboard from './routes/Dashboard';
//import NotFound from './NotFound';
import Home from './routes/Home';
import AddProduct from './routes/AddProduct';
import Instructions from './routes/Instructions';
import EditProducts from './routes/EditProducts';
import NotFound from './routes/NotFound';

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
    <AppProvider>
      <ApolloProvider client={client}>
      <div>
      <link rel="stylesheet" href="https://sdks.shopifycdn.com/polaris/2.2.0/polaris.min.css" />
         <Page
          primaryAction={{content: "Instructions", url: '/instructions'}}
          secondaryActions={[{ content: 'Dashboard', url: "/dashboard"}, {content: 'Add Product', url: "/addProduct"}]}
        > 
    <React.Fragment>
     <Propagator />
    <Switch>
      <Route exact path="/" component={Home} />          
      <Route path="/dashboard" component={Dashboard} />
      <Route exact path="/editProducts/:id" component={EditProducts}>
      </Route>
      <Route exact path="/addProduct" component={AddProduct} />  
      <Route exact path="/instructions" component={Instructions} />  
      <Route exact path="/404" component={NotFound} /> 
    </Switch>
    </React.Fragment>
    </Page>
      </div>
      </ApolloProvider>  
    </AppProvider>

  );
}
