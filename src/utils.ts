import axios, {AxiosInstance} from 'axios';
import {camelCase} from 'lodash';

export function getClient(): AxiosInstance {
  const defaultClient =
    axios.create({ baseURL : process.env.VUE_APP_BACKEND_URL + '/api/v0' });

  defaultClient.interceptors.response.use((response) => {
    if (typeof(response.data) === 'object') {
      response.data = objectToCamel(response.data);
    }
    return response;
  });
  return defaultClient;
}

/**
 * converts an object (such as one produced by an external api)
 * to have camelCase key names
 * @param obj object with lisp-case, snake_case
 * or PascalCase keys
 */
export function objectToCamel(obj: any): any {
  if (obj instanceof Array) {
    return obj.map((value) => {
      if (typeof(value) === 'object') {
        return objectToCamel(value);
      } else {
        return value;
      }
    });
  } else {

    const newObj = {};
    for (const k of Object.keys(obj)) {
      if (obj.hasOwnProperty(k)) {
        const newKey: string = camelCase(k);
        let value = obj[k];
        if (value instanceof Array ||
            (value !== null && value.constructor === Object)) {
          value = objectToCamel(value);
        }
        (newObj as any)[newKey] = value;
      }
    }
    return newObj;
  }
}
