import React, { useCallback, useState, useEffect } from 'react';
import { DataTable, Page, Button, Card, Collapsible } from '@shopify/polaris';
import axios from "axios"

function SingleItemCarbonMetrics(props) {
  const [active, setActive] = useState(false);
  const [item, setItem] = useState({});
  const handleToggle = useCallback(() => setActive((active) => !active), []);

  useEffect(() => {
    const fetchData = async () => {
      const name = props.item.title;
      const result = await axios.get(`https://carbon-calculator-shopify.herokuapp.com/api/products/${name}/nutrition`);

      setItem({ ...props.item, ...result.data })
    }

    fetchData();
  }, [])

  return (
    <Page>
      <Card>
      <Button
        onClick={handleToggle}
        ariaExpanded={active}
        ariaControls="basic-collapsible"
      >{!active ? 'See Metrics' : 'Close'}</Button>
        <Collapsible open={active} id="basic-collapsible">
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
            rows={[[
              item.title,
              item.nf_calories,
              item.nf_iron_dv,
              item.nf_calcium_dv,
              item.nf_vitamin_a_dv,
              item.nf_serving_size_qty
            ]]}
          />
        </Collapsible>
      </Card>
    </Page>
  );
}

export default SingleItemCarbonMetrics 