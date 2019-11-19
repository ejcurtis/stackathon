import {
  Card,
  Page,
  DataTable
} from '@shopify/polaris';
import React from "react";
import axios from "axios"

class CarbonMetrics extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      items: [],
    };
  }

  async componentDidMount () {
    const { items } = this.props;

    const promises = items.map(async (item) => {
      const name = item.title;
      return await axios.get(`https://carbon-calculator-shopify.herokuapp.com/api/products/${name}/nutrition`);
    });

    Promise.all(promises).then((result) => {
      const newItems = result.map((newItem, index) => {
        return {  ...items[index], ...newItem.data };
      })

      this.setState({ items: newItems })
    })
  }

  render (){
    const { items } = this.state;
    console.log(items)
    const enrichedItems = items.map((item) => [
      item.title,
      item.nf_calories,
      item.nf_iron_dv,
      item.nf_calcium_dv,
      item.nf_vitamin_a_dv,
      item.nf_serving_size_qty
    ])

    return (
      <Page title="Nutrition Metrics">
        <Card>
          <DataTable
            columnContentTypes={[
              'text',
              'numeric',
              'numeric',
              'numeric',
              'numeric',
              'numeric'
            ]}
            headings={[
              'Product',
              'Calories',
              'Iron content (g)',
              'Calcium (g)',
              'Vitimin A (g)',
              'Serving Size (Cups)'
            ]}
            rows={enrichedItems}
          />
        </Card>
      </Page>
    );
  }
}
export default CarbonMetrics 