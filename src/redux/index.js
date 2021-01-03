import { combineReducers } from 'redux';
import { benhnhanReducers, 
    tinhReducers, 
    cosoyteReducers, 
    khoaReducers, 
    bacsiReducers,
    noidungkhamReducers,
    loaikhamReducers,
    thoigiankhamReducers,
    dangkykhamReducers
} from './dangkykham'

import {
    hosoReducers,
    hoso2Reducers
} from './hoso'

import{ signinReducers } from './auth'

import { gvReducers } from './global_variables'

// Root Reducer
const rootReducer = combineReducers({
    benhnhans: benhnhanReducers,
    tinhs: tinhReducers,
    cosoytes: cosoyteReducers,
    khoas: khoaReducers,
    bacsis: bacsiReducers,
    noidungkham: noidungkhamReducers,
    thoigiankham: thoigiankhamReducers,
    loaikham: loaikhamReducers,
    dangkykham: dangkykhamReducers,
    hoso: hosoReducers,
    hoso2: hoso2Reducers,
    signin: signinReducers,
    global: gvReducers,
});

export default rootReducer;