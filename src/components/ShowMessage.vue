<template>
  <div class="show-message">

    <div class="message-user">
      {{username}} says:
    </div>
    <div class="message-body">
      <p class="message-content">{{message.content}}</p>
        <time class="message-time">
          on: {{timestamp}}
        </time>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Message } from '@/store';

import * as moment from 'moment';

@Component
export default class ShowMessage extends Vue {
  @Prop({ default: null })
  message!: Message;

  get username(): string {
    if (this.message.user) {
      return this.message.user.username;
    } else {
      return 'unknown user';
    }
  }
  get timestamp(): string {
    return this.message.timestamp
      ? moment(this.message.timestamp).format()
      : '???';
  }
}
</script>

<style lang="scss" scoped>

.show-message {
  border: 2px solid;
  border-radius: 5px;
  margin: 0.25rem;
}


* {
  padding: 0.5rem;
}
.show-message {
  display: flex;
  justify-content: space-around;
}
.message-body {
  flex: 3 0 0;
  .message-time {
    font-size: 10px;
  }
}

.message-user {
  flex: 1 0 0;
  background-color: lightblue;
  padding: 2rem 1rem;
}
</style>
