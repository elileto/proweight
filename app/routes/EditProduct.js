import * as React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {
    Form,
    TextField,
    FormLayout,
    Button,
    Card,
    RangeSlider,
    Select,  
} 
    from '@shopify/polaris';

    const client = new ApolloClient({
      fetchOptions: {
        credentials: 'include',
      },
    });

   class EditProduct extends React.Component {
        state = {
          newsletter: false,
          email: '',
          value: 100,
          minRange: 0,
          maxRange: 100,
          price: 0.00,
          selected: 'today'

        };
      
        handleToggleChange = (value) => {
          this.setState({value});
        };

        handleSelectedChange = (newValue) => {
          this.setState({selected: newValue});
        };

        render() {
          const {newsletter, email, value} = this.state;
          
          const suffixStyles = {
            minWidth: '24px',
            textAlign: 'right',
          };

          const options = [
            {label: 'Today', value: 'today'},
            {label: 'Yesterday', value: 'yesterday'},
            {label: 'Last 7 days', value: 'lastWeek'},
          ];

 


          return (
            <Card
            title="Edit Your Product"
            secondaryFooterAction={{content: 'Cancel Changes'}}
            primaryFooterAction={{content: 'Update Product'}}
            >
            <ApolloProvider client={client}> 
            <Form onSubmit={this.handleSubmit}>
              <Card.Section>
              <FormLayout>
                  <TextField
                   label="Variant Name"
                   type="number"
                   value={this.state.price}
                   onChange={this.handleChange}
                 />
                <TextField
                   label="Unit Price"
                   type="number"
                   value={this.state.minRange}
                   onChange={this.handleChange}
                 />
                 <TextField
                   label="Weight"
                   type="number"
                   value={this.state.maxRange}
                   onChange={this.handleChange}
                 />

                
                  <RangeSlider
                    label="Hue color mix"
                    min={0}
                    max={360}
                    prefix={<p>Hue</p>}
                    suffix={<p style={suffixStyles}>{this.state.value}</p>}
                    value={this.state.value}
                    onChange={this.handleToggleChange}
                  />
                
                <Select
                  label="Date range"
                  options={options}
                  onChange={this.handleSelectedChange}
                  value={this.state.selected}
                />
                <Button submit>Submit</Button>
                </FormLayout>
              </Card.Section>
            </Form>
            </ApolloProvider> 
            </Card>
          );
        }
      
        handleSubmit = (event) => {
          this.setState({newsletter: false, email: ''});
        };
      
        handleChange = (field) => {
          return (value) => this.setState({[field]: value});
        };
      }
      export default EditProduct;