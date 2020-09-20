import { combineReducers } from "redux";
import { chartsReducer } from './charts-reducer';
import { coinsReducer} from './coins-reducer'

export const reducers = combineReducers({
  coins : coinsReducer,
  charts : chartsReducer
})  