import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import {Products} from '../components';
import {
    Page, 
    Heading,
    Card,
} 
    from '@shopify/polaris';

    const client = new ApolloClient({
      fetchOptions: {
        credentials: 'include',
      },
    });

    export default function Dashboard() {
    

      return (
        <Page
        title="Instructions"
      >
      <Card>
        <Heading> 
            ProWeight allows you to create up to 100 variations of your product all varying by your choice of unit measurement.
        </Heading>
        </Card>
        </Page>
      );
    }


  

