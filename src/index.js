// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import messages from './reducers/messages'
// import thunk from 'redux-thunk';
// import orderReducer from './store/reducers/orderReducer';
// import loginReducer from './store/reducers/loginReducer';
// import { Amplify } from 'aws-amplify';
// import config from './config';


const store = createStore(messages)


ReactDOM.render(
  <React.StrictMode>
    
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();