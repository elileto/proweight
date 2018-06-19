import React from 'react';
import {Button} from '@shopify/polaris';

export default function GameItem({onAddGame, game: {name}}) {
  return (
    <li>
      <p>{name}</p>
      <Button> 
        Thar she blows
      </Button>
      <button
        onClick={() => {
          onAddGame(name);
        }}
      >
        Create product
      </button>
    </li>
  );
}
