import React from 'react';
import {Product} from '../components';
import {VariantForm} from '../components';
import {
  Page,
  Card,
  Layout
} from '@shopify/polaris';


class EditProducts extends React.Component{
  
  constructor(props){
    super(props);

  }
  

  

  render(){
    

    return(
      <div>  
        <Product {...this.props}/>
     </div>
    );
  }
}

export default EditProducts;