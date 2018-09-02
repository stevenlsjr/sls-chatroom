import {Message, User} from '@/types';
import {objectToCamel} from '@/utils';
import axios, {AxiosInstance, AxiosResponse, AxiosStatic} from 'axios';
import Axios from 'axios';
import * as Joi from 'joi';
import Vue from 'vue';
import Vuex, {Store} from 'vuex';

import {ApiUser, userSchema} from '../types';

import {createActions} from './actions';
import { getClient } from '../utils';

Vue.use(Vuex);
const defaultClient = getClient();

export interface AppState {
  messages: Message[];
  user?: User;
  apiToken?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export function createStore(client: AxiosInstance =
                              defaultClient): Store<AppState> {
  const actions = createActions(client);
  return new Vuex.Store<AppState>({
    state : {
      messages : [],
      user : undefined,
    },
    mutations : {
      initialize(state) {
        state.messages = [];
        state.user = undefined;
      },
      pushMessage(state, message: Message) {
        message = {...message, timestamp : message.timestamp || new Date() };
        state.messages.push(message);
      },

      swapMessages(state, xform: (messages: Message[]) => Message[]) {
        state.messages = xform(state.messages);
      },

      setUser(state, user?: User) { state.user = user; },
      setToken(state, token: string) { state.apiToken = token; },
    },
    actions,

  });
}

export default createStore();
