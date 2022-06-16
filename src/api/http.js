import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const LOCALSTORAGE = {
  TOKEN: 'access_token',
  USER: 'user',
};
const axiosClient =  axios.create();
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error.response)
    const { config, status, data } = error.response;
    const URLS = ['/customer/customer/create'];
    if (URLS.includes(config.url) && status === 400) {
      const errorList = data.data || [];
      const firstError = errorList.length > 0 ? errorList[0] : {};
      const messageList = firstError.messages || [];
      const firstMessage = messageList.length > 0 ? messageList[0] : {};
      console.log('object', firstMessage);
      throw new Error(firstMessage.message);
    }
    return Promise.reject(error);
  }
);
export class Http {
  // constructor() { }

  static _getHeader() {
    return {
      Authorization: `Bearer ${localStorage.getItem(LOCALSTORAGE.TOKEN) || ''}`,
    };
  }
  static get = (endPoint, params) => {
    const options = {
      headers: this._getHeader(),
    };
    if (params && Object.keys(params).length) {
      options.params = params;
    }
    return axiosClient.get(BASE_URL + endPoint, options);
  };
  static post = (endPoint, payload) => {
    return axiosClient.post(BASE_URL + endPoint, payload, {
      headers: this._getHeader(),
    });
  };

  static put = (endPoint, payload) => {
    return axiosClient.put(BASE_URL + endPoint, payload, {
      headers: this._getHeader(),
    });
  };

  static patch = (endPoint, payload) => {
    return axiosClient.patch(BASE_URL + endPoint, payload, {
      headers: this._getHeader(),
    });
  };

  static delete = (endPoint, id) => {
    return axiosClient.delete(BASE_URL + endPoint + '/' + id, {
      headers: this._getHeader(),
    });
  };
}
