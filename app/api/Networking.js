
/**
 * Created by tai on 3/21/17.
 */

export default class Network {
  static baseURL = 'http://appchallenge.singaporeair.com';
  static path = '/api/v2.0';
  static apiURL = `${Network.baseURL}${Network.path}`;

  static get(baseURL = Network.apiURL, endpoint, headers, body) {
    return Network.callAPI(baseURL, endpoint, 'GET', headers, body);
  }

  static post(baseURL = Network.apiURL, endpoint, headers, body, stringify = true) {
    return Network.callAPI(baseURL, endpoint, 'POST', headers, body, stringify);
  }

  static callAPI(baseURL, endpoint, method, headers, body, stringify = true) {
    if (headers === undefined || headers === null) {
      headers = {};
    }

    headers['Accept'] = 'application/json';
    headers['Content-Type'] = stringify ? 'application/json' : 'multipart/form-data';

    let queryStringObj = {};
    if (method === 'GET') {
      queryStringObj = {
        ...body,
      };
      body = undefined;
    }

    let queryString = Object.keys(queryStringObj).map(key => {
      const value = queryStringObj[key];
      return `${key}=${value}`;
    }).join('&');

    const url = `${baseURL}${endpoint}/?${queryString}`;
    // console.log('url', url);
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: method,
        headers: headers,
        body: ((body === undefined || body === null) ? null : (stringify ? JSON.stringify(body) : body))
      }).then(response => {
        return response.json();
      }).then(json => {
        // console.log('FETCH JSON: ', json);
        if (json.err && json.err !== 0) {
          return reject({ msg: json.errMsg });
        } else if (json.result) {
          return resolve(json.result);
        }
        reject({msg: 'Wrong data from server'});
      }).catch(error => {
        if (error.message) {
          if (error.message.toLowerCase().indexOf('network request failed') > -1) {
            reject({
              msg: error.message,
              networkError: true,
            });
          } else {
            reject({
              msg: error.message,
              networkError: false,
            });
          }
        } else {
          reject(error);
        }
      });
    });
  }
}
