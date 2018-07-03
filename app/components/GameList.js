import React from 'react';

import GameItem from './GameItem';
import {Page, List, Card, ResourceList} from '@shopify/polaris';

export default function GameList({games = [], onAddGame}) {
  const gameItems = games.map((game) => (
    <div>
            
    <Page>
    <List>
      <GameItem key={game.name} game={game} onAddGame={onAddGame} />
    </List>
    </Page> 
    </div>
  ));

  return <ul>{gameItems}</ul>;
}
