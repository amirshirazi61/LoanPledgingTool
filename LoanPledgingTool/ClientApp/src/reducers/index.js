import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { pledging } from './pledging.reducer';

const rootReducer = combineReducers({
  authentication,
    alert,
    pledging
});

export default rootReducer;