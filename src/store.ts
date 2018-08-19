import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export interface User {
  id?: number;
  username: string;
  email?: string;
  dateJoined?: Date;
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

  },
});
