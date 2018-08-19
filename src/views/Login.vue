<template>
  <div>
    <h1>Log In</h1>
    <form @submit.prevent="onSubmit">

      <div class="errors">
        <p v-for="(val, index) in errors" :key="index">
          {{val}}
        </p>
      </div>
      <div class="field">
        <label for="in-email">Email</label>
        <input type="email" id="in-email" v-model="email" />
      </div>

      <div class="field">
        <label for="in-password">Password</label>
        <input type="password" id="in-password" v-model="password" />
      </div>

      <input type="submit" value="Log in">

    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { LoginCredentials } from '@/store';

@Component({})
export default class Login extends Vue {
  errors: string[] = [];
  email: string = '';
  password: string = '';
  onSubmit(event: any) {
    this.errors = [];
    let disp;
    disp = this.$store
      .dispatch('logIn', {
        email: this.email,
        password: this.password,
      })
      .catch((err: Error) => this.errors.push(err.message));
  }
}
</script>

