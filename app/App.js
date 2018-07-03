import React from 'react';
import Fetch from 'react-fetch-component';
import ApolloClient, {gql} from 'apollo-boost';
import {ApolloProvider, graphql} from 'react-apollo';
import {Mutation} from 'react-apollo';
import {Switch, Route, withRouter} from 'react-router';
import RoutePropagator from '@shopify/react-shopify-app-route-propagator';


import {Link, Thumbnail, DisplayText, Avatar, Card, ResourceList, TextStyle, AppProvider, Heading, Page, TextContainer, EmptyState} from '@shopify/polaris';
import GameList from './components/GameList';
import Dashboard from './routes/Dashboard';
//import NotFound from './NotFound';
import Home from './routes/Home';
import Settings from './routes/Settings';


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

const CustomLinkComponent = ({children, url, ...rest}) => {
  return (
    <Link to={url} {...rest}>
      {children}
    </Link>
  );
};


export default function() {
  return (
    <AppProvider linkComponent={CustomLinkComponent}>
      <div>
      <link rel="stylesheet" href="https://sdks.shopifycdn.com/polaris/2.2.0/polaris.min.css" />
         <Page
          primaryAction={{content: 'Create Product', url: 'https://support.shopify.com', onAction: () => console.log('rate enabled')}}
          secondaryActions={[{ content: 'Dashboard', url: "/dashboard"}]}
        >      
    <React.Fragment>
     <Propagator />
    <Switch>
      <Route exact path="/" component={Home} />          
      <Route path="/dashboard" component={Dashboard} />
      <Route exact path="/addProduct">
      </Route>
      <Route exact path="/settings" component={Settings} />    
    </Switch>
    </React.Fragment>
    </Page>
      </div>  
    </AppProvider>

  );
}
