import { Module } from 'vuex/types';
import { AppState } from '../index';

export interface ConversationsState {
  conversations: any[];
}

export default function createConversations(): Module<
  ConversationsState,
  AppState
> {
  return {};
}
