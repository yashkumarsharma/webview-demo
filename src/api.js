import axios from 'axios';
import querystring from 'query-string';
// import {userOperations} from '../State/Ducks/User';

const API_ENDPOINT = 'https://stage.zonocloud.zonoapp.com/';

function buildHeaders(headers, token = '') {

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    // 'Access-Control-Allow-Origin': '*',
    ...headers,
  };
}

function request(props) {
  const {url, init, query, option} = props;

  const strQuery = query ? `?${querystring.stringify(query)}` : '';
  const fetchUrl = `${API_ENDPOINT}${url}${strQuery}`;
  console.log('fetchUrl', fetchUrl, option);
  const headers = buildHeaders(init.headers, option?.token);
  return axios({
    url: fetchUrl,
    method: init.method,
    data: option,
    headers: option?.token
      ? {...headers, Authorization: `Bearer ${option.token}`}
      : headers,
    timeout: option && option.timeout ? option.timeout : 0,
  })
    .then((response) => response)
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 403) {
          // const user = User.get()[0];
          // User.create({_id: user._id, token: ''}, true);
          // NavigationService.navigate('AuthLoading');
        } else {
          // BugsnagNotify({
          //   error: 'Error in Api.js',
          //   metadata: {
          //     error,
          //     url,
          //     params: option,
          //   },
          // });
          throw new Error(error);
        }
      } else {
        // BugsnagNotify({
        //   error: 'Error in Api.js',
        //   metadata: {
        //     error,
        //     url,
        //     params: option,
        //   },
        // });
        throw new Error(error);
      }
    });
}

const Api = {
  get: (url, option) =>
    request({
      url,
      init: {
        method: 'GET',
      },
      option,
    }),
  post: (url, option) =>
    request({
      url,
      init: {
        method: 'POST',
      },
      option,
    }),
  put: (url, option) =>
    request({
      url,
      init: {
        method: 'PUT',
      },
      option,
    }),
  delete: (url, option) =>
    request({
      url,
      init: {
        method: 'DELETE',
      },
      option,
    }),
};

export default Api;
