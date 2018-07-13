import React from 'react';
import {renderToString} from 'react-dom/server';
import HTML, {DOCTYPE} from '@shopify/react-html';
import {Style, Script} from '@shopify/react-html';
import {StaticRouter} from 'react-router';
import App from '../app/App';



export default (ctx) => {
  const markup = renderToString(
    <HTML
      deferedScripts={[{path: '/bundle.js'}]}
    >
    <StaticRouter location={ctx.url} context={{}}>

      <App />

    </StaticRouter>

    </HTML>,
  );

  ctx.body = markup;
};
