<template>
  <div v-if="!userExists">
    <h1>Log In</h1>
    <form @submit.prevent="onSubmit">

      <div class="errors">
        <p v-for="(val, index) in errors" :key="index">
          {{val}}
        </p>
      </div>
      <div class="field">
        <label for="in-email">Email</label>
        <input type="text" id="in-username" v-model="username" />
      </div>

      <div class="field">
        <label for="in-password">Password</label>
        <input type="password" id="in-password" v-model="password" />
      </div>

      <input type="submit" value="Log in">

    </form>
  </div>
  <div v-else>
    Hello, {{user.username}}
    <a href="#" @click="onLogOut">Log out</a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { LoginCredentials } from '@/store';
import { State } from 'vuex-class';
import { User } from '@/types';
@Component({})
export default class Login extends Vue {
  @State user!: User;
  errors: string[] = [];
  username: string = '';
  password: string = '';

  onSubmit(event: any) {
    this.errors = [];
    let disp;
    disp = this.$store
      .dispatch('logIn', {
        username: this.username,
        password: this.password
      })
      .catch((err: any) => {
        this.errors.push(err.details);
        console.error(err);
      })
      .then((user) => {
        this.$router.push('/');
      });
  }

  onLogOut() {
    this.$store.dispatch('logOut');
  }

  get userExists() {
    return !!this.user;
  }
}
</script>

