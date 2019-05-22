import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider} from "react-redux";
import Helmet from "react-helmet";
import createStoreWrapper from  './store.js';
import htmlTemplate from './template.html.js';
import AppComponent from './application/components/app';
import routes from './application/routes';
import { port } from './application/etc/config.json';
//import { port } from './application/etc/config/development.json';
//const { port } = require("./application/etc/config/"+process.env.NODE_ENV+".json")
const HTTP_PORT = port,
      HTTP_OK = 200,
      app = express()

app.use( express.static( path.resolve( __dirname, "../public" ) ) )
app.get( "/*", (req, res) => {
    
    const context = {}
    const store = createStoreWrapper({}, false)
    
    const serverDataRequirements =
        routes.filter(route => matchPath(req.url, route)) // filter only route that match the Request URL
            .map(route => route.component) // Map found route to its component
            .filter(component => component.serverPrefetch) // Check if component has `serverPrefetch` method
            .map(component => store.dispatch(component.serverPrefetch())); // call `serverPrefetch` method and dispatch result to store

    
    Promise.all(serverDataRequirements).then( () => {
        const jsx = (
            <Provider store={store}>
                <StaticRouter context={context} location={req.url}>
                    <AppComponent />
                </StaticRouter>
            </Provider>
        );
        const reactDom = renderToString(jsx)
        const reduxState = store.getState()
        const helmetData = Helmet.renderStatic()

        res.writeHead(HTTP_OK, { "Content-Type": "text/html" })
        res.end(htmlTemplate(reactDom, reduxState, helmetData))
    });
});

app.listen(HTTP_PORT)