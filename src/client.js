import React from "react";
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import AppComponent from './application/components/app';
import createStoreWrapper from  './store.js';

const store = createStoreWrapper(window.REDUX_DATA);

const jsx = (
    <Provider store={store}>
        <BrowserRouter>
            <AppComponent />
        </BrowserRouter>
    </Provider>
)
const app = document.getElementById("mount-point")
hydrate(jsx, app)