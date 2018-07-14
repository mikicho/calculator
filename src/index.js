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

axios.get("/buttons" + window.location.search).then((buttons) => {
  ReactDOM.render(
    <Provider store={store}>
      <App buttons={buttons.data} />
    </Provider>,
    document.getElementById('root')
  );
});
