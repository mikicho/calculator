import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import './index.css';
import rootReducer from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import axios from 'axios';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const buttonsConfig = JSON.parse(window.localStorage.getItem("buttonsConfig"));

if (buttonsConfig) {
  renderCalculator(buttonsConfig);
} else {
  axios.get("/buttons" + window.location.search).then((buttons) => {
    renderCalculator(buttons.data);

    window.localStorage.setItem("buttonsConfig", JSON.stringify(buttons.data));
  });
}

function renderCalculator(buttonsConfig) {
  ReactDOM.render(
    <Provider store={store}>
      <App buttons={buttonsConfig} />
    </Provider>,
    document.getElementById('root')
  );
}
