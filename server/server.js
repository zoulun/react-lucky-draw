// import fs from "fs";
// var babelConfig = JSON.parse(fs.readFileSync('../.babelrc'));
// require('@babel/register')(babelConfig);
require.extensions['.less'] = () => null;

// import hook from "css-modules-require-hook";
// hook({
//   extensions: ['.less']
// })
import csshook from 'css-modules-require-hook/preset';

import express from "express";
import path from "path";

import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from "react-router-dom";
import RouteConfig from "../src/routes/index";
import reducer from '../src/reducer'
import staticPath from '../build/asset-manifest.json'

const app = express();

function appElement() {
  return (
    <div>test render react</div>
  )
}
console.log(renderToString(appElement()))
app.use((req, res, next) => {
  // console.log(req)
  // console.log(res)
  // console.log(next)
  // return res.sendFile(path.resolve('build/index.html'))
  // const context = {}
  // const store = createStore(reducer);

  // const reactEle = renderToString(
  //   <Provider store={store}>
  //     <StaticRouter
  //       location={req.url}
  //       context={context}
  //     >
  //       <RouteConfig />
  //     </StaticRouter>
  //   </Provider>
  // )

  // const page = `<!DOCTYPE html>
  // <html lang="en">
  // <head>
  //   <meta charset="UTF-8">
  //   <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  //   <meta name="description" content="react demo">
  //   <meta http-equiv="X-UA-Compatible" content="ie=edge">
  //   <title>lucky</title>
  //   <link rel="shortcut icon" href="favicon.ico">
  //   <link href="${staticPath['vendor.css']}" rel="stylesheet">
  //   <link href="${staticPath['main.css']}" rel="stylesheet">
  // </head>

  // <body>
  //   <div id="root">${reactEle}</div>
  //   <script type="text/javascript" src="${staticPath['vendor.js']}"></script>
  //   <script type="text/javascript" src="${staticPath['main.js']}"></script>
  // </body>
  // </html>`
  return res.send(renderToString(appElement()))
  // return res.send(page)
})

app.use('/', express.static(path.resolve('build')))

app.listen(9090, function () {
  console.log('node app  port 9090');
})

