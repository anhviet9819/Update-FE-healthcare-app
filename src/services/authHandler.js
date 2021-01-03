import config from './config.js'
import { 
    AsyncStorage,
} from 'react-native';

const { globalUrl } = config

async function signInHandler(username,password) {
    let details = {
        'username': username,
        'password': password,
        'grant_type': 'password',
    };
    console.log("details", details)

    let formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    let response = await fetch(`${globalUrl}/oauth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Basic dm5jYXJlLWNsaWVudDp2bmNhcmUtc2VjcmV0',
        },
        body: formBody
    })
        .then(res => {
            return res.json();
        })
        .catch(error => {
            console.log(error)
            throw error;
        })
    console.log("ac",response)

    if (typeof response.error != "undefined") {
        console.log('Error', response.error_description);
    }
    else {
        await AsyncStorage.setItem('userToken', response.access_token);
    }

    return response;
}

export { signInHandler }; 