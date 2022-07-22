import {combineReducers} from 'redux';
import errorsReducer from './errorsReducer';
import requestingReducer from './requestingReducer';
import sessionsReducer from './sessionsReducer';
import ordersReducer from './ordersReducer';
import inquiriesReducer from './inquiriesReducer';

export default combineReducers({
    errors: errorsReducer,
    requesting: requestingReducer,
    sessions: sessionsReducer,
    orders: ordersReducer,
    inquiries: inquiriesReducer
})