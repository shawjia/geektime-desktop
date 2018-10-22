// @flow
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';

const rootReducer = {
  counter,
  router
};

export default rootReducer;
