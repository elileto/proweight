import React from 'react';
import ApolloClient, {gql} from 'apollo-boost';
import {Switch, Route, withRouter} from 'react-router';
import RoutePropagator from '@shopify/react-shopify-app-route-propagator';


import {Link, AppProvider, Page} from '@shopify/polaris';

import Dashboard from './routes/Dashboard';
//import NotFound from './NotFound';
import Home from './routes/Home';
import Settings from './routes/Settings';
import EditProduct from './routes/EditProduct';

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

/*const CustomLinkComponent = ({children, url, ...rest}) => {
  return (
    <Link to={url} {...rest}>
      {children}
    </Link>
  );
};
*/
//linkComponent={CustomLinkComponent} in AppProvider

export default function() {
  return (
    <AppProvider >
      <div>
      <link rel="stylesheet" href="https://sdks.shopifycdn.com/polaris/2.2.0/polaris.min.css" />
         <Page
          primaryAction={{content: 'Create Product', url: 'https://support.shopify.com'}}
          secondaryActions={[{ content: 'Dashboard', url: "/dashboard"}, {content: 'Settings', url: "/settings"}]}
        > 
    <React.Fragment>
     <Propagator />
    <Switch>
      <Route exact path="/" component={Home} />          
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/editProduct" component={EditProduct}>
      </Route>
      <Route exact path="/settings" component={Settings} />    
    </Switch>
    </React.Fragment>
    </Page>
      </div>  
    </AppProvider>

  );
}
