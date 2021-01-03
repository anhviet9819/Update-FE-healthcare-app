import {
    getAllHoso
} from '../services/fetchGET'

import{
    hosoActions,
    hoso2Actions
} from './actions'

function handlerData(json,success,fail){
    if(Array.isArray(json)){
        if(json[0].status === 200){
            success()
        }else{
            fail()
        }
    }else{
        if(json.status === 200){
            success()
        }else{
            fail()
        }
    }
}

const initialState = {
    data: [],
    selected: {},
    loading: false,
    error: null,
};

//ho so
// const fetchHosos = (thoigiandkbegin,thoigiandkend,thoigiankhambegin,thoigiankhamend,trangthaikham,benhnhanid) => (dispatch) => {
//     dispatch({ type: hosoActions.PENDING })
//     console.log("46213132")
//     let sum= [];
//     benhnhanid.forEach(element => {
//         getAllHoso(thoigiandkbegin,thoigiandkend,thoigiankhambegin,thoigiankhamend,trangthaikham,benhnhanid)
//         .then(json => handlerData(json, sum.concat(json), () => dispatch({ type: hosoActions.REJECTED, payload: json })))
//     });
//     dispatch({ type: hosoActions.FULFILLED, payload: sum })
// }

const fetchHosos = (thoigiandkbegin,thoigiandkend,thoigiankhambegin,thoigiankhamend,trangthaikham,benhnhanid) => (dispatch) => {
    dispatch({ type: hosoActions.PENDING })
    return getAllHoso(thoigiandkbegin,thoigiandkend,thoigiankhambegin,thoigiankhamend,trangthaikham,benhnhanid)
        .then(json => handlerData(json,() => dispatch({ type: hosoActions.FULFILLED, payload: json }), () => dispatch({ type: hosoActions.REJECTED, payload: json })))
}
const deleteHoso = () => (dispatch) =>{
    dispatch({type: hosoActions.RESETED})
}

const selectHoso = (selected_hoso) => (dispatch) => {
    dispatch({ type: hosoActions.SELECTED, payload: selected_hoso })
}

const hosoReducers = (state = initialState, action) => {
    switch (action.type) {
        case hosoActions.PENDING: {
            return { ...state, loading: true };
        }
        case hosoActions.FULFILLED: {
            return { ...state, loading: false, data: state.data.concat(action.payload) };
        }
        case hosoActions.RESETED: {
            return { ...state, loading: false, data: [], selected: {} };
        }
        case hosoActions.REJECTED: {
            return { ...state, loading: false, error: action.payload };
        }
        case hosoActions.SELECTED: {
            return { ...state, selected: action.payload }
        }
        default: {
            return state;
        }
    }
}

const fetchHosos2 = (thoigiandkbegin,thoigiandkend,thoigiankhambegin,thoigiankhamend,trangthaikham,benhnhanid) => (dispatch) => {
    dispatch({ type: hoso2Actions.PENDING })
    return getAllHoso(thoigiandkbegin,thoigiandkend,thoigiankhambegin,thoigiankhamend,trangthaikham,benhnhanid)
        .then(json => handlerData(json,() => dispatch({ type: hoso2Actions.FULFILLED, payload: json }), () => dispatch({ type: hoso2Actions.REJECTED, payload: json })))
}
const deleteHoso2 = () => (dispatch) =>{
    dispatch({type: hoso2Actions.RESETED})
}

const selectHoso2 = (selected_hoso) => (dispatch) => {
    dispatch({ type: hoso2Actions.SELECTED, payload: selected_hoso })
}

const hoso2Reducers = (state = initialState, action) => {
    switch (action.type) {
        case hoso2Actions.PENDING: {
            return { ...state, loading: true };
        }
        case hoso2Actions.FULFILLED: {
            return { ...state, loading: false, data: state.data.concat(action.payload) };
        }
        case hoso2Actions.RESETED: {
            return { ...state, loading: false, data: [], selected: {} };
        }
        case hoso2Actions.REJECTED: {
            return { ...state, loading: false, error: action.payload };
        }
        case hoso2Actions.SELECTED: {
            return { ...state, selected: action.payload }
        }
        default: {
            return state;
        }
    }
}

export{
    hosoReducers,
    hoso2Reducers,
};

export{
    fetchHosos,
    selectHoso,
    deleteHoso,
    fetchHosos2,
    selectHoso2,
    deleteHoso2,
};
