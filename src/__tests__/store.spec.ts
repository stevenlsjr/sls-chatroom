
import _ from 'lodash';
import * as Vuex from 'vuex';

import {AppState, createStore, } from '../store';
import { User , Message} from "@/types";

describe('Mutations', () => {
  let store: Vuex.Store<AppState>;
  beforeEach(() => {
    store = createStore();
    store.commit('initialize');
  });
  test('pushMessage', () => {
    const msg: Message = { content : 'hello' };
    store.commit('pushMessage', msg);
    const result = _.find(store.state.messages);
    expect(result).toBeTruthy();
    expect(result).toMatchObject(msg);
  });
  test('setUser', () => {
    const user: User = { username : 'bob' };
    store.commit('setUser', user);
    expect(store.state.user).toMatchObject(user);
  });
  test('setToken', () => {
    store.commit('setToken', 'foo');
    expect(store.state.apiToken).toEqual('foo');
  });

  test('swapMessages', () => {
    const messages = [ { content : 'hello' }, { content : 'world' } ];
    store.commit('swapMessages', (__: Message[]) => messages);
    expect(store.state.messages).toMatchObject(messages);
    store.commit('swapMessages', (m: Message[]) => {
      return m.map(x => ({...x, content : _.upperCase(x.content) }));
    });
    expect(store.state.messages).toMatchObject([{content: 'HELLO'}, {content: 'WORLD'}]);
  });
});
