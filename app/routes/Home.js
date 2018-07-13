import React from 'react';
import {Page, TextContainer, EmptyState} from '@shopify/polaris';

    export default function Dashboard() { 



      return (
        <Page>

        <EmptyState
          heading="Sell Your Products by Weight"
          action={{content: 'Create Product', url: '/Dashboard'}}
          //secondaryAction={{content: 'Learn more', href: 'https://help.shopify.com'}}
          image="https://screenshot.click/28-47-fdw75-0yrx9.png"
>
          <TextContainer>
              <p>
                Set up your products to sell easily by weight.
              </p>
              
          </TextContainer>
        </EmptyState>

        </Page>
      );
    }


  
  