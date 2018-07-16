import * as React from 'react';
import {ResourceList,  
    Thumbnail, 
    TextContainer,
    DisplayText, 
    Card, 
    TextStyle, 
    Heading, 
    Page, 
    SkeletonBodyText,
    Layout,
    EmptyState 
    } from '@shopify/polaris';
import {graphql} from 'react-apollo';
import ProductsQuery from './ProductsQuery.js';
import { Query } from "react-apollo";

function renderResourceListItem(product){
    
    const idNum = product.node.id.slice(22, 35);

    const shortcutActions = product.node.handle
      ? [{content: 'Edit Product', url: `/editProducts/${idNum}`}]
      : null;
    let productImage = "";
      product.node.images.edges.length > 0
        ?  productImage = product.node.images.edges[0].node.transformedSrc :
        null;

    return(
            <ResourceList.Item
                
                id={`${idNum}`}
                url={`/editProducts/${idNum}`}
                title={product.node.title}
                media={
              <Thumbnail customer size="medium" source={productImage} />
                }
                shortcutActions={shortcutActions}
                accessibilityLabel={`View details for ${name}`}
                persistActions
                >
                <h3>
                    <TextStyle variation="strong">{product.node.title}</TextStyle>
                </h3>
            </ResourceList.Item>
    );
}


function Products({data: {loading, collections}}){

 



  const loadingStateContent = loading ? (
    <Card sectioned>
      <TextContainer>
        <SkeletonBodyText />
      </TextContainer>
      
    </Card>
    
  ):null;

 const emptyStateContent =
     !loading  && collections.edges[0].node.productsCount === 0 ? (
    <EmptyState
    heading="You haven't added any products to a 'weighted' collection yet."
    action={{content: 'Review Steps', url: '/settings'}}
    >
      
    <p>Once you have added products to a collection called 'weighted' they will display on this page.</p>
    </EmptyState>
    ) : null;
    
   

    const reviewsIndex =
    !loading  && collections.edges[0].node.productsCount > 0 ? (
      <Card>
        
        <ResourceList 
            showHeader
            resourceName={{singular: 'product', plural: 'products'}}
            items={collections.edges[0].node.products.edges} 
            renderItem={renderResourceListItem} />
      </Card>
    ) : null;

    if (!loading) {
      console.log(collections.edges);
    }
    

    return (
        <Card>     
        
        {loadingStateContent}
        {emptyStateContent}  
        {reviewsIndex}  
        
        </Card>
    );
}

export default graphql(ProductsQuery)(Products);


/*function Products({data: {loading, products}}){
  
  const loadingStateContent = data.loading ? (
    <Card sectioned>
      <TextContainer>
        <SkeletonBodyText />
      </TextContainer>
    </Card>
  ) :<ResourceList items={data.collections.edges[0].node.products.edges} renderItem={renderResourceListItem} />;

  const 
 
    return (
        <Card>
          {loadingStateContent}      
        </Card>
    );
}

export default graphql(ProductsQuery)(Products); */