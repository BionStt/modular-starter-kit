import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import { globalConfig as GlobalConfig } from 'configs';

const defaultHeaders = {
  //Authorization: "<put here in future>",
  'Content-Type': 'application/json'
};

const fullUri = `${GlobalConfig.apiServer}`;

export const get = (url, headers) =>
  Observable.ajax.get(`${fullUri}/${url}`, { ...defaultHeaders, ...headers });

export const post = (url, body, headers) =>
  Observable.ajax.post(`${fullUri}/${url}`, body, {
    ...defaultHeaders,
    ...headers
  });

export const put = (url, body, headers) =>
  Observable.ajax.put(`${fullUri}/${url}`, body, {
    ...defaultHeaders,
    ...headers
  });

export const del = (url, headers) =>
  Observable.ajax.delete(`${fullUri}/${url}`, {
    ...defaultHeaders,
    ...headers
  });
