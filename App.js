import React from 'react';

//redux
import store from "./src/redux/store/configureStore"
import { Provider } from 'react-redux'
import RootComp from './src/RootComp'

function App() {
    return (
        <Provider store={store}>
            <RootComp/>
        </Provider>
    )
}

export default App;