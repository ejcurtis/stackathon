import React, { useCallback, useState } from 'react';
import { 
  Card, 
  ResourceList,
  Stack,
  TextStyle,
  Thumbnail,} from '@shopify/polaris';
import store from 'store-js';
import SingleItemMetrics from './single-item-carbon-metrics'


function ResourceListWithProducts (props) {
  const {items} = props
    return (
      <Card items={items}>
        <ResourceList
          showHeader
          resourceName={{ singular: 'Product', plural: 'Products' }}
          items={items}
          renderItem={item => {
            const media = (
              <Thumbnail
                source={
                  item.images.edges[0]
                    ? item.images.edges[0].node.originalSrc
                    : ''
                }
                alt={
                  item.images.edges[0]
                    ? item.images.edges[0].node.altText
                    : ''
                }
              >
              </Thumbnail>
            );
            return (
              <div>
              <ResourceList.Item
                id={item.id}
                media={media}
                accessibilityLabel={`View details for ${item.title}`}
              >
                <Stack onClick={store.set('item', item)}>
                  <Stack.Item fill>
                    <h3>
                      <TextStyle variation="strong">
                      </TextStyle>
                    </h3>
                   </Stack.Item>
                  <Stack.Item>
                    <SingleItemMetrics item={item} />
                  </Stack.Item>
                </Stack>
              </ResourceList.Item>
              </div>
            );
          }}
        />
      </Card>
    );
  }

export default ResourceListWithProducts;