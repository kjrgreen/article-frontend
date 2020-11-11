import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import combinedReducers from "./state-management/combinedReducers";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {fetchStarted, fetchFailed, fetchFinished, fetchFallback} from "./state-management/actions/contentActions";

const store = createStore(
    combinedReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function handleFailedFetch(cachedArticles){
    store.dispatch(fetchFailed());
    //Optionally: call fetchLatestArticles() again? Add some counter so we don't keep requesting infinitely if the server just won't respond? Use something other than fetch() with built-in functionality for retrying? all valid options IMO
    //Also, there's still the edge case of this being the users first visit and the CMS does not respond. That's not currently catered to.
    store.dispatch(fetchFallback(cachedArticles)); //Fall back on cached articles
}

function fetchLatestArticles(cachedArticles) {
    store.dispatch(fetchStarted());
    fetch("https://localhost:44356/api/Articles", //Break out into a config.json file...
    {
        method: 'GET',
        headers: {
        Accept: 'application/json'
    }
    }).then(response => {
        if (response.ok) {
            response.json().then(latestArticles => {
                //Here is where the "caching" comes in. In a real application, I believe you would first request a separate webservice resource that responds only with the last time the articles were modified (including deletions - info which is not present in this response!)
                //The current CMS does not have such a resource. As such, it's best to go off of the latest items.
                //Once the CMS does have such a resource, compare the information in cachedArticles to the results of the previously mentioned first request.
                store.dispatch(fetchFinished(latestArticles))
            });
        } else {
            handleFailedFetch(cachedArticles)
        }
    }, () => {handleFailedFetch(cachedArticles)});
}

fetchLatestArticles(JSON.parse(localStorage.getItem('articles')));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your state-management to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
