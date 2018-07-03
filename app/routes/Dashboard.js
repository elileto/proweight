import React from 'react';
import {Mutation} from 'react-apollo';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import GameList from '../components/GameList';
import {Products} from '../components';
import {Thumbnail, 
    DisplayText, 
    Card, 
    ResourceList, 
    TextStyle, 
    Heading, 
    Page, 
    TextContainer,
    SkeletonBodyText,
    Layout,
    EmptyState} 
    from '@shopify/polaris';

    const client = new ApolloClient({
      fetchOptions: {
        credentials: 'include',
      },
    });

    //{data: {loading, products}}

    export default function Dashboard() {
    

      return (
        <Page
        title="Dashboard"
      >
      <ApolloProvider client={client}> 
      <Products/>
      </ApolloProvider>
        </Page>
      );
    }


  

