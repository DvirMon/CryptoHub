import {createStore} from 'redux' 
import { reducers } from './reducers/app-reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
 
export const store = createStore( reducers, composeWithDevTools())    