import * as React from 'react';
import {graphql, Mutation } from 'react-apollo';
import {gql} from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import ApolloClient  from 'apollo-boost';


import {
    Form,
    TextField,
    FormLayout,
    Button,
    Card,
    RangeSlider,
    Select, 
    Stack,
    Banner 
} 
    from '@shopify/polaris';

    const client = new ApolloClient({
        fetchOptions: {
          credentials: 'include',
        },
      });

      const CREATE_VARIANT = gql`
      mutation productVariantCreate($input: ProductVariantInput!) {
        productVariantCreate(input: $input) {
          userErrors {
            field
            message
          }
          product {
            id
            title
          }
          productVariant {
            id
          }
        }
      }
        
`;




   class VariantForm extends React.Component {
    constructor(props) {
      super(props);
 
    }
    
    state = {
        range: 3,
        minRange: 1,
        maxRange: 3,
        price: 3,
        selected: 'lbs'
    
      };
    
    
      handleToggleChange = (range) => {
        this.setState({range});
      };
    
      handleSelectedChange = (newValue) => {
        this.setState({selected: newValue});
      };


      handlePriceChange = (price) => {
        this.setState({price});
      };

      handleMinChange = (minRange) => {
        this.setState({minRange});
      };

      handleMaxChange = (maxRange) => {
        this.setState({maxRange});
      };


     
    
      render() {


        console.log(this.props);
    
        const options = [
          {label: 'lbs', value: 'lbs'},
          {label: 'grams', value: 'grams'},
          {label: 'inches', value: 'inches'},
          {label: 'centimeters', value: 'centimeters'},
        ];

        return (
          <ApolloProvider client={client}> 
          <Mutation mutation={CREATE_VARIANT}>
          {
            (createVariant, mutationResults) => {

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
          <Form onSubmit={event => {
            event.preventDefault();
             const {range, minRange, maxRange, price, selected} = this.state;
            
             let weight = (maxRange-minRange)/range;
      
            let initialPrice = price;
            console.log("InitialPrice " + typeof initialPrice );
    
            let variantArray = [];
            let newPrice = price;
            weight = weight;
            
                for (let i=0; i<range; i++) {
                    let tempWeight = (weight * (i+1));
                    let fixedWeight = tempWeight.toFixed(2);

                    variantArray[i] = {
                        variantPrice: (parseFloat(newPrice) * (i+1)),
                        variantWeight: (parseFloat(minRange) + (i * fixedWeight)),
                        variantName:   fixedWeight.toString() + selected
                        
                    };
                }
              
          for (let i = 0; i < range; i++){
            const variantInput = {
              productId: "gid://shopify/Product/" + this.props.match.params.id, 
              options: [variantArray[i].variantName],
              price: variantArray[i].variantPrice,
              weight: variantArray[i].variantWeight
            }

            createVariant({
              variables: {
                input: variantInput
              }
            });
            }  
          }}>
            <Card.Section
                title="Edit Your Product"
                secondaryFooterAction={{content: 'Cancel Changes'}}
                primaryFooterAction={{content: 'Update Product'}}
            >
          {loading}
          {error}
          {success}
            <FormLayout>
              <TextField
                 label="Unit Price"
                 type="number"
                 value={this.state.price}
                 onChange={this.handlePriceChange}
               />
               <Stack distribution="fill">
                <TextField
                 label="Minimum Measurement"
                 type="number"
                 value={this.state.minRange}
                 onChange={this.handleMinChange}
               />
               <TextField
                 label="Maximum Measurement"
                 type="number"
                 value={this.state.maxRange}
                 onChange={this.handleMaxChange}
               />
               </Stack>
              <RangeSlider
                  label= {"Number of Variations: " + this.state.range} 
                  min={1}
                  max={100}
                  value={this.state.range}
                  onChange={this.handleToggleChange}
                />
                <p>  </p>
              <Select
                label="Unit"
                options={options}
                onChange={this.handleSelectedChange}
                value={this.state.selected}
              />
              <Button submit>Submit</Button>
            
              </FormLayout>
            </Card.Section>
          </Form>
          
          )
        }
      }
      </Mutation>
       </ApolloProvider> 
        );
      }

     // handleSubmit 
    }
    
      export default VariantForm;

      