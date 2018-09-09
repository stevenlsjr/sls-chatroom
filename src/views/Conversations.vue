<template>
  <div>
    <h1>Current Discussions</h1>
    <div class="content">
      <ul v-if="conversations.count > 0">
        <li v-for="(c, index) in conversations.results" :key="index">
          Convo: {{c.title}}
        </li>
      </ul>
      <p v-else>No Conversations</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { State } from 'vuex-class';
import { User } from '@/types';
import AxiosMixin from '@/mixins/AxiosMixin';

@Component
export default class Conversations extends mixins(AxiosMixin) {
  @State user!: User;
  @State apiToken!: string;

  conversations: any = {};

  mounted() {
    this.updateConversations().catch(e => {
      this.conversations = [];
      console.log(e);
    });
  }

  async updateConversations() {
    let res;
    const headers = {
      Authorization: `Token ${this.apiToken}`
    };

    res = await this.$client.get('/conversations', {
      headers
    });

    this.conversations = res.data;
  }
}
</script>
