import React from 'react';
import {List, Card, Button, ResourceList} from '@shopify/polaris';

export default function GameItem({onAddGame, game: {name}}) {
  return (

<List.Item>
      <p>{name}</p>

      
      <Button
        onClick={() => {
          onAddGame(name);
        }}
      >
        Create product
      </Button>
      </List.Item>


  );
}
