<template>
  <div class="home">
    <div>
      <h2>Chat History</h2>
      <ul v-if="errors.length > 0">
        <li v-for="(val, key) in errors" :key="key" class="error">{{val}}</li>
      </ul>
      <ul>
        <li class="show-message"
          v-for="(message) in messagesByDate"
          :key="message.timestamp.toString()"
        >
          <show-message class="show-message-cmp" :message="message"></show-message>
        </li>
    </ul>
    </div>

    <message-input
      v-model="messageContent"
      @submit="onMessageSubmit"
    ></message-input>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MessageInput from '@/components/MessageInput.vue'; // @ is an alias to /src
import ShowMessage from '@/components/ShowMessage.vue';

import { State, Mutation } from 'vuex-class';
import { Message, User } from '@/store';

@Component({
  components: {
    MessageInput,
    ShowMessage,
  },
})
export default class Home extends Vue {
  @State messages!: Message[];

  @Mutation pushMessage!: (message: Message) => void;
  @Mutation filterMessages!: (predicate: (message: Message) => boolean) => void;

  messageContent: string = '';
  errors: string[] = [];

  onMessageSubmit(event: any) {
    if (this.messageContent === '') {
      this.errors = ['Input is empty'];
    } else {
      this.pushMessage({ content: this.messageContent });
      this.messageContent = '';
      this.errors = [];
    }
  }

  onRemoveMessage(message: Message) {
    this.filterMessages((other) => {
      const hasTimestamp = other.timestamp && message.timestamp;
      if (hasTimestamp && message.timestamp === other.timestamp) {
        return false;
      }
      return true;
    });
  }

  get messagesByDate() {
    return this.messages.sort((a, b) => {
      if (a.timestamp && b.timestamp) {
        return a.timestamp.getTime() - b.timestamp.getTime();
      } else {
        return 0;
      }
    });
  }
}
</script>


<style lang="scss" scoped>
.error {
  color: rgb(255, 0, 0);
}

li.show-message > .show-message-cmp{
  background-color: white;
}
li.show-message:nth-child(odd) > .show-message-cmp{
  background-color: whitesmoke;
}
</style>
