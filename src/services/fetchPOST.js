import config from './config.js'
import mime from "mime";

const { globalUrl } = config

function getIMGName (str){
  return str.slice(str.indexOf('/',str.indexOf('ImagePicker'))+1,str.length)
}

const createFormData = (photo) => {
  console.log("456", photo)
  console.log(getIMGName(photo.uri))
  const data = new FormData();

  data.append("file", {
    name: getIMGName(photo.uri),
    type: mime.getType(photo.uri),
    uri:
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  });

  // Object.keys(body).forEach(key => {
  //   data.append(key, body[key]);
  // });

  return data;
};

async function fetchPOST(URL, requestBody) {
  let response = await fetch(URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: requestBody
  })
  return response.json()
    .then(json =>{
      json["status"] = response.status
      json["statusText"] = response.statusText
      return json
    })
}

async function fetchPOST2(URL, requestBody) {
  console.log('start2')
  let response = await fetch(URL, {
    method: 'POST',
    body: requestBody
  })
  return response.json()
    .then(json =>{
      json["status"] = response.status
      json["statusText"] = response.statusText
      return json
    })
}


export const createDangkykham = (tgdk, tgkham, noidungkham, loaikhamid, benhnhanid, bacsiid) => {
  const URL = `${globalUrl}/dangkykham/create`;
  const requestBody = JSON.stringify({
    thoigiandk: tgdk,
    thoigiankham: tgkham,
    noidungkham: noidungkham,
    trangthaikham: false,
    loaikham: loaikhamid,
    benhnhan: {
      id: benhnhanid
    },
    bacsi: {
      id: bacsiid
    }
  })
  return fetchPOST(URL, requestBody)
}

export const handleUploadPhoto = (photo) =>{
  const URL = `${globalUrl}/uploadFile`
  return fetchPOST2(URL,createFormData(photo))
}