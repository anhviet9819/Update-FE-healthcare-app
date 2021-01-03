import {
    gvActions
} from './actions'

const initialVariables = {
    userToken: null,
}

const gvReducers = (state = initialVariables, action) =>{
    switch (action.type) {
        case gvActions.PENDING: {
            return { ...state, loading: true };
        }
        case gvActions.SUCCESSFUL_USERTOKEN: {
            return { ...state, loading :false, userToken: action.payload };
        }
        case gvActions.REJECTED_USERTOKEN: {
            return { ...state, userToken: null };
        }
        default: {
            return state;
        }
    }
}

export{
    gvReducers
};

export{
    gvActions
};