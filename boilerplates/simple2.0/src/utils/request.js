import fetch from 'dva/fetch';
import { kRequestSuccess } from 'conf/app.conf';
import { stringifyParams, dataCompile } from './common';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function requestUrl(path) {
  return `${API_URL}${path}`; // eslint-disable-line
}
function checkApiCode(response) {
  // 返回业务判断
  const { code, msg, data } = response;
  if (code === kRequestSuccess) {
    return data;
  }
  const error = new Error(code);
  error.response = { code, msg };
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(requestUrl(url), options)
    .then(checkStatus)
    .then(parseJSON)
    .then(response => checkApiCode(response))
    .catch(err => ({ err }));
}
const createHeader = (headers) => {
  const header = new Headers({
    ...headers,
  });
  return header;
};
/**
 * get request
 *
 * @param {String}url requested source location
 * @param {Object}params request params key-value
 * @return response
 */
export function get(url, params) {
  let tempUrl = url;
  const paramsStr = stringifyParams(params);
  tempUrl = paramsStr ? (~tempUrl.indexOf('?') ? `${tempUrl}&${paramsStr}` : `${tempUrl}?${paramsStr}`) : tempUrl;  // eslint-disable-line
  return request(tempUrl, {
    method: 'GET',
    headers: createHeader(),
  });
}

/**
 * post request
 *
 * @param {String}url requested source location
 * @param {Object}data request data
 * @return response
 */
export function post(url, data) {
  return request(url, {
    method: 'POST',
    body: JSON.stringify(dataCompile(data)),
    headers: createHeader({
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    }),
  });
}

/**
 * post request
 *
 * @param {String}url requested source location
 * @param {Object}data request data
 * @return response
 */
export function put(url, data) {
  return request(url, {
    method: 'PUT',
    body: JSON.stringify(dataCompile(data)),
    headers: createHeader({
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    }),
  });
}
