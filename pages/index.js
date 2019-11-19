import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {  EmptyState, Layout, Page, TextStyle } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import store from 'store-js';
import ResourceListWithProducts from '../componenets/ResourceList';
import CarbonMetrics from '../componenets/carbon-metrics'
//TextStyle has a variation prop that can give your text more visual meaning and add hierarchy to a page
//Page replaces the div tags to make a polaris styled page
//Layout

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';
// state is the state of resource picker
const GET_PRODUCTS_BY_ID = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        id
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants (first: 1){
          edges {
            node {
              weight
            }
          }
        }
      }
    }
  }
`;

class Index extends React.Component {
  constructor(){
    super()
    this.state = { 
      open: false,
      showMetrics: false
    };
    this.showMetrics.bind(this)
  }
  showMetrics() {
    const metricsToggle = !this.state.showMetric
    return this.setState({ showMetrics: metricsToggle })
  }
  render() {
    const emptyState = !store.get('ids');

    return (
        <Query query={GET_PRODUCTS_BY_ID} variables={{ ids: store.get('ids') || [] }}>
          {({ data = {}, loading, error }) => {
            if (loading) return <div>Loading…</div>;
            if (error) return <div>{error.message}</div>;

        return(
          <Page>
            <TitleBar
              primaryAction={{
                content: 'Select products',
                onAction: () => this.setState({ open: true })
              }}
            />
            <ResourcePicker
              resourceType="Product"
              showVariants={false}
              open={this.state.open}
              onSelection={(resources) => this.handleSelection(resources)}
              onCancel={() => this.setState({ open: false })}
            />
            {emptyState ? (
            <Layout> 
              <EmptyState
                heading="Select products to start"
                action={{
                  content: 'Select products',
                  onAction: () => this.setState({ open: true }),
                }}
                image={img}
              >
            <p>Select products to change their price temporarily.</p>
          </EmptyState>
        </Layout>
        ) : (
        <ResourceListWithProducts items={data.nodes}/>
      )}
      <CarbonMetrics items={data.nodes}/>
    </Page>
    );
    }}
  </Query>
  );
}
  handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    this.setState({ open: false })
    store.set('ids', idsFromResources);
  };
}

export default Index