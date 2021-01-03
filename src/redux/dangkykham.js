import {
    getAllTinh,
    getCosoyteByTinhId,
    getBacSiByKhoaId,
    getKhoaByCosoyteId,
    getQuanHeByBenhNhanId,
} from '../services/fetchGET'
import{ createDangkykham } from '../services/fetchPOST'
import { loaiKham } from '../services/mockedData';
import {
    dangkykhamActions,
    benhnhanActions,
    tinhActions,
    cosoyteActions,
    khoaActions,
    bacsiActions,
    noidungkhamActions,
    thoigiankhamActions,
    loaikhamActions
} from './actions'

// initialState
const initialState = {
    data: [],
    selected: {},
    loading: false,
    error: null,
};

const initialState2 = {
    selected: {},
}

const initialState3 = {
    data: [],
    selected: {},
    result: null,
    loading: false,
}


//dang ky kham
const postDangkykham = (tgdk,tgkham,noidungkham,loaikhamid,benhnhanid,bacsiid) => (dispatch) =>{
    dispatch({type: dangkykhamActions.PENDING})
    createDangkykham(tgdk,tgkham,noidungkham,loaikhamid,benhnhanid,bacsiid)
        .then(json => {
            if(json.status == 200){
                console.log("200",json)
                dispatch({type: dangkykhamActions.SUCCESSFUL})
            }else{
                console.log("404",json)
                dispatch({type: dangkykhamActions.FAILED})
            }
        })
}
const resetDangkykham = () => (dispatch) =>{
    dispatch({type:dangkykhamActions.RESETED})
}

const dangkykhamReducers = (state = initialState3, action) => {
    switch (action.type) {
        case dangkykhamActions.PENDING: {
            return { ...state, loading: true };
        }
        case dangkykhamActions.SUCCESSFUL: {
            return { ...state, loading :false, result: true};
        }
        case dangkykhamActions.FAILED: {
            return { ...state, loading :false, result: false};
        }
        case dangkykhamActions.RESETED: {
            return { ...state, loading :false, result: false};
        }
        default: {
            return state;
        }
    }
}


//benh nhan
const fetchBenhnhans = () => (dispatch) => {
    dispatch({ type: benhnhanActions.PENDING });
    return getQuanHeByBenhNhanId(1)
        .then(json => dispatch({ type: benhnhanActions.FULFILLED, payload: json }))
        .catch(error => dispatch({ type: benhnhanActions.REJECTED, payload: error }));
};

const selectBenhnhan = (selected_benhnhan) => (dispatch) => {
    dispatch({ type: benhnhanActions.SELECTED, payload: selected_benhnhan })
}

const benhnhanReducers = (state = initialState, action) => {
    switch (action.type) {
        case benhnhanActions.PENDING: {
            return { ...state, loading: true };
        }
        case benhnhanActions.FULFILLED: {
            return { ...state, loading: false, data: action.payload };
        }
        case benhnhanActions.REJECTED: {
            return { ...state, loading: false, error: action.payload };
        }
        case benhnhanActions.SELECTED: {
            return { ...state, selected: action.payload };
        }
        default: {
            return state;
        }
    }
}

// tinh
const fetchTinhs = () => (dispatch) => {
    dispatch({ type: tinhActions.PENDING })
    return getAllTinh()
        .then(json => [{ "id": 0, "ten": '-- Chọn tỉnh --' }, ...json])
        .then(json => dispatch({ type: tinhActions.FULFILLED, payload: json }))
        .catch(error => dispatch({ type: tinhActions.REJECTED, payload: error }))
}
const deleteTinh = () => (dispatch) =>{
    dispatch({type: tinhActions.RESETED})
}

const selectTinh = (selected_tinh) => (dispatch) => {
    dispatch({ type: tinhActions.SELECTED, payload: selected_tinh })
}

const tinhReducers = (state = initialState, action) => {
    switch (action.type) {
        case tinhActions.PENDING: {
            return { ...state, loading: true };
        }
        case tinhActions.FULFILLED: {
            return { ...state, loading: false, data: action.payload };
        }
        case tinhActions.RESETED: {
            return { ...state, loading: false, data: [], selected: {} };
        }
        case tinhActions.REJECTED: {
            return { ...state, loading: false, error: action.payload };
        }
        case tinhActions.SELECTED: {
            return { ...state, selected: action.payload }
        }
        default: {
            return state;
        }
    }
}

// cosoyte
const fetchCosoytes = (tinhid) => (dispatch) => {
    dispatch({ type: cosoyteActions.PENDING });
    return getCosoyteByTinhId(tinhid)
        .then((json) => [{ "id": 0, "ten": '-- Chọn bệnh viện--' }, ...json])
        .then(json => dispatch({ type: cosoyteActions.FULFILLED, payload: json }))
        .catch(error => dispatch({ type: cosoyteActions.REJECTED, payload: error }));
}
const deleteCosoyte = ()=> (dispatch) =>{
    dispatch({ type: cosoyteActions.RESETED})
}

const selectCosoyte = (selected_cosoyte) => (dispatch) => {
    dispatch({ type: cosoyteActions.SELECTED, payload: selected_cosoyte })
}


const cosoyteReducers = (state = initialState, action) => {
    switch (action.type) {
        case cosoyteActions.PENDING: {
            return { ...state, loading: true };
        }
        case cosoyteActions.FULFILLED: {
            return { ...state, loading: false, data: action.payload };
        }
        case cosoyteActions.RESETED: {
            return { ...state, loading: false, data: [], selected: {} };
        }
        case cosoyteActions.REJECTED: {
            return { ...state, loading: false, error: action.payload};
        }
        case cosoyteActions.SELECTED: {
            return { ...state, selected: action.payload }
        }
        default: {
            return state;
        }
    }
}

//khoa
const fetchKhoas = (cosoyteid) => (dispatch) => {
    dispatch({ type: khoaActions.PENDING });
    return getKhoaByCosoyteId(cosoyteid)
        .then((json) => [{ "id": 0, "ten": '-- Chọn khoa khám bệnh --' }, ...json])
        .then(json => dispatch({ type: khoaActions.FULFILLED, payload: json }))
        .catch(error => dispatch({ type: khoaActions.REJECTED, payload: error }));
}
const deleteKhoa = () => (dispatch) =>{
    dispatch({type: khoaActions.RESETED})
}
const selectKhoa = (selected_khoa) => (dispatch) => {
    dispatch({ type: khoaActions.SELECTED, payload: selected_khoa })
}

const khoaReducers = (state = initialState, action) => {
    switch (action.type) {
        case khoaActions.PENDING: {
            return { ...state, loading: true };
        }
        case khoaActions.FULFILLED: {
            return { ...state, loading: false, data: action.payload };
        }
        case khoaActions.RESETED: {
            return { ...state, loading: false, data: [], selected: {} };
        }
        case khoaActions.REJECTED: {
            return { ...state, loading: false, error: action.payload };
        }
        case khoaActions.SELECTED: {
            return { ...state, selected: action.payload }
        }
        default: {
            return state;
        }
    }
}

// bacsi
const fetchBacsis = (khoaid) => (dispatch) => {
    dispatch({ type: bacsiActions.PENDING });
    return getBacSiByKhoaId(khoaid)
        
        .then((json) => [{ "id": 0, "ten": '-- Chọn bác sĩ --' }, ...json])
        .then(json => dispatch({ type: bacsiActions.FULFILLED, payload: json }))
        .catch(error => dispatch({ type: bacsiActions.REJECTED, payload: error }));
};
const deleteBacsi = () => (dispatch) =>{
    dispatch({type: bacsiActions.RESETED})
}
const selectBacsi = (selected_bacsi) => (dispatch) => {
    dispatch({ type: bacsiActions.SELECTED, payload: selected_bacsi })
}


const bacsiReducers = (state = initialState, action) => {
    switch (action.type) {
        case bacsiActions.PENDING: {
            return { ...state, loading: true };
        }
        case bacsiActions.FULFILLED: {
            return { ...state, loading: false, data: action.payload };
        }
        case bacsiActions.RESETED: {
            return { ...state, loading: false, data: [], selected: {} };
        }
        case bacsiActions.REJECTED: {
            return { ...state, loading: false, error: action.payload };
        }
        case bacsiActions.SELECTED: {
            return { ...state, selected: action.payload }
        }
        default: {
            return state;
        }
    }
}


//noi dung kham
const selectNoidungkham = (noidung) => (dispatch) => {
    dispatch({ type: noidungkhamActions.SELECTED, payload: noidung })
}


const noidungkhamReducers = (state = initialState2, action) => {
    switch (action.type) {
        case noidungkhamActions.SELECTED: {
            return {...state, selected: action.payload }
        }
        default: {
            return state;
        }
    }
}

//ngay kham
const selectThoigiankham = (thoigiankham) => (dispatch) => {
    dispatch({ type: thoigiankhamActions.SELECTED, payload: thoigiankham })
}


const thoigiankhamReducers = (state = initialState2, action) => {
    switch (action.type) {
        case thoigiankhamActions.SELECTED: {
            return {...state, selected: action.payload }
        }
        default: {
            return state;
        }
    }
}

//loai kham
const selectLoaikham = (loaikham) => (dispatch) => {
    dispatch({ type: loaikhamActions.SELECTED, payload: loaikham })
}


const loaikhamReducers = (state = initialState2, action) => {
    switch (action.type) {
        case loaikhamActions.SELECTED: {
            return { selected: action.payload }
        }
        default: {
            return state;
        }
    }
}

export{
    benhnhanReducers,
    tinhReducers,
    cosoyteReducers,
    khoaReducers,
    bacsiReducers,
    thoigiankhamReducers,
    loaikhamReducers,
    noidungkhamReducers,
    dangkykhamReducers
};

export {
    postDangkykham,
    resetDangkykham,
    fetchBenhnhans,
    selectBenhnhan,
    fetchTinhs,
    selectTinh,
    deleteTinh,
    deleteCosoyte,
    fetchCosoytes,
    selectCosoyte,
    fetchKhoas,
    selectKhoa,
    deleteKhoa,
    fetchBacsis,
    selectBacsi,
    deleteBacsi,
    selectThoigiankham,
    selectLoaikham,
    selectNoidungkham,
};
