<template>
    <section class="message-input">
        <form @submit.prevent="handleFormSubmit" class="chat-form">
          <div class="field">
            <aside v-if="user">Hello, "{{user.username}}"</aside>
            <label for="message-content">Your message</label>
            <input type="text" class="text" id="message-content" :value="value" @input="onInput">
          </div>

            <input type="button" value="Submit">

        </form>

    </section>
</template>


<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { User } from '@/types';

@Component({})
export default class MessageInput extends Vue {
  @Prop({ default: '' })
  value!: string;

  @Prop({default: ()=>({username: 'unknown'})})
  user!: User

  onInput(event: any) {
    this.$emit('input', event.target.value);
  }

  handleFormSubmit(event: any) {
    this.$emit('submit', { ...event, message: { content: this.value } });
  }
}
</script>


<style lang="scss" scoped>
* {
  margin: 0.5rem;
  padding: 0.1rem;
}

.text {
  padding: 0.5rem;
  border-radius: 5px;
  border: solid 1px black;
  font-size: 1rem;
}
.chat-form {
  display: flex;
  background-color: hsl(255, 10, 80);
  padding: 0.75rem;
  padding-left: 1rem;
  margin: 0.25rem;
  border-radius: 4px;
  flex-flow: column;
  align-items: start;
}

.field {
  display: flex;
  align-items: stretch;
}
</style>
