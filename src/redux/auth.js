import { signInHandler } from '../services/authHandler'
import {
    signinActions,
    gvActions
} from './actions'

const initialState = {
    loading: false,
};

const signinHandler = (username,password) => async (dispatch) => {
    dispatch({type: signinActions.PENDING});
    await signInHandler(username,password)
        .then( json => {
            if (typeof json.error != "undefined") {
                console.log('Error', json.error_description);
            } else {
                dispatch({type: signinActions.SUCCESSFUL})
                dispatch({type: gvActions.SUCCESSFUL_USERTOKEN, payload: json.access_token })
            }
        })
}

const signinReducers = (state = initialState, action) => {
    switch (action.type) {
        case signinActions.PENDING: {
            return { ...state, loading: true };
        }
        case signinActions.SUCCESSFUL: {
            return { ...state, loading: false};
        }
        default: {
            return state;
        }
    }
}

export {
    signinReducers
};

export{
    signinHandler
};