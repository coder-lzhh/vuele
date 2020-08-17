import axios from 'axios'

function required(config) {

  const axios1 = axios.create()

  axios1.interceptors.request.use(config => {
    // Do something before request is sent
    return config;
  }, error => {
    // Do something with request error
    return Promise.reject(error);
  });


  axios1.interceptors.response.use(response => {
    // Do something before response is sent
    return response;
  }, error => {
    // Do something with response error
    return Promise.reject(error);
  });

  return axios1(config)
}


export function getdata(url) {
  return required({
    url: `/api/data`
  })
}