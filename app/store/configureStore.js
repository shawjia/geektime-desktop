import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { init } from "@rematch/core";
import rootReducer from '../reducers';
import setting from '../models/setting';
import products from '../models/products';


const history = createHashHistory();
const router = routerMiddleware(history);

function configureStore() {
  return init({
    models: {
      setting,
      products,
    },
    redux: {
      reducers: rootReducer,
      middlewares: [thunk, router]
    },
  });
}

export default { configureStore, history };
