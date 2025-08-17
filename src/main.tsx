import React from 'react';
import ReactDOM from 'react-dom/client';
import 'reflect-metadata';
import App from './app/App';
import './styles/main.scss';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import './shared/ui/charts/chartSetup';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
