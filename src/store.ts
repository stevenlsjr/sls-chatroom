import Vue from 'vue';
import Vuex from 'vuex';
import {app, users} from '@/api';
import { FeathersAuthCredentials } from '../node_modules/@types/feathersjs__authentication-client';
import { Paginated } from '../node_modules/@types/feathersjs__feathers';

Vue.use(Vuex);
export interface User {
  username: string;
  email: string;
  createdAt: Date;
}
export interface Message {
  content: string;
  timestamp?: Date;
  user?: User;
}

export interface AppState {
  messages: Message[];
  user?: User;
}

export interface LoginCredentials {
  strategy?: string;
  email: string;
  password: string;
}

export default new Vuex.Store<AppState>({
  state: {
    messages: [],
    user: undefined,
  },
  mutations: {
    pushMessage(state, message: Message) {
      message = { ...message, timestamp: new Date() };
      state.messages.push(message);
    },

    filterMessages(state, predicate: (message: Message) => boolean) {
      state.messages = state.messages.filter(predicate);
    },

    setUser(state, user?: User) {
      state.user = user;
    },
  },
  actions: {
    async logIn(context, credentials: LoginCredentials) {
      const feathersCredentials: FeathersAuthCredentials = {...credentials, strategy: 'local'};
      try {
        const authToken = await app.authenticate(feathersCredentials);

        return user;
      } catch (err) {
        throw new Error(`failed to log in ${credentials.email}`);
      }
    },
  },
});
