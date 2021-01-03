import { get } from 'react-native/Libraries/Utilities/PixelRatio'
import config from './config.js'

const { globalUrl } = config

async function fetchGET(URL) {
    var details = {
        'username': 'user10',
        'password': 'password',
        'grant_type': 'password'
    };
    
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    let url = `${globalUrl}/oauth/token`
    console.log(url)
    let response2 = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Basic dm5jYXJlLWNsaWVudDp2bmNhcmUtc2VjcmV0',
        },
        body: formBody
    })
    .then(resp => {
        return resp.json();
    })
    .catch(error => {
        console.log(error)
        throw error;
    })
    console.log(response2)
    if (response2) {
        console.log("test",URL)

        let response = await fetch(`${URL}&access_token=${response2.access_token}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        return response.json()
            .then(json => {
                if (Array.isArray(json)) {
                    json[0]["status"] = response.status
                    json[0]["statusText"] = response.statusText
                } else {
                    json["status"] = response.status
                    json["statusText"] = response.statusText
                }
                return json
            })

    }

}
export const getQuanHeByBenhNhanId = (benhnhanid) => {
    const URL = `${globalUrl}/api/quanhe/search?idchinh=${benhnhanid}`;
    console.log(URL)
    return fetchGET(URL)
}

export const getBenhNhanByBenhnhanId = (benhnhanid) => {
    const URL = `${globalUrl}/api/benhnhan/details/${benhnhanid}`;
    return fetchGET(URL)
}

export const getAllTinh = () => {
    const URL = `${globalUrl}/api/tinh/search?`
    return fetchGET(URL)
}

export const getCosoyteByTinhId = (tinhid) => {
    const URL = `${globalUrl}/api/cosoyte/search?tinhid=${tinhid}`
    return fetchGET(URL)
}

export const getKhoaByCosoyteId = (cosoyteid) => {
    const URL = `${globalUrl}/api/khoa/search?cosoyteid=${cosoyteid}`
    return fetchGET(URL)
}

export const getBacSiByKhoaId = (khoaid) => {
    const URL = `${globalUrl}/api/bacsi/search?khoaid=${khoaid}`
    return fetchGET(URL)
}

export const getAllHoso = (thoigiandkbegin, thoigiandkend, thoigiankhambegin, thoigiankhamend, trangthaikham, benhnhanid) => {
    const URL = `${globalUrl}/api/dangkykham/search?thoigiandkbegin=${thoigiandkbegin}&thoigiandkend=${thoigiandkend}&thoigiankhambegin=${thoigiankhambegin}&thoigiankhamend=${thoigiankhamend}&trangthaikham=${trangthaikham}&benhnhanid=${benhnhanid}`
    return fetchGET(URL)
}