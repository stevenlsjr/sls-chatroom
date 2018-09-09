import {AxiosInstance, AxiosResponse} from 'axios';

import * as vuex from 'vuex';
import { AppState } from './index';
import { ApiUser } from '../types';

export function createActions(client: AxiosInstance): vuex.ActionTree<AppState, AppState> {
  return {
    async logIn(context, credentials: any) {
      const data = {
        username : credentials.username,
        password : credentials.password,
      };
      let response: AxiosResponse;
      response = await client.post('/api-token-auth/', data);
      const token = response.data.token;
      if (!token && typeof(token) === 'string') {
        return Promise.reject(
          { details : `could not retrieve token`, data : response.data });
      }

      client.defaults.headers.common['Authorization'] = 'TOKEN ' + token;
      const userResponse = await client.get('/users/identity');

      const user  = new ApiUser(userResponse.data);

      context.commit('setUser', user);
      context.commit('setToken', token);
      return userResponse.data;
    },
    logOut(context) {
      context.commit('setUser', undefined);
      context.commit('setToken', undefined);
    },
  };
}
