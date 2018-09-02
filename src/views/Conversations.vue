<template>
  <div>
    hello
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

  mounted() {
    this.$client
      .get('/src/')
      .then(v => {
        console.log('hello');
      })
      .catch(e => {
        console.log('error');
      });
  }
}
</script>
