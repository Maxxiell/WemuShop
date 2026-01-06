import { createStore } from 'redux';
import reducers from './reducers';

// Enable Redux DevTools if available
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducers, composeEnhancers);

export default store;