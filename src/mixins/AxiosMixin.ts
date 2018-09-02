import { AxiosInstance } from 'axios';
import { getClient } from '../utils';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';


let sharedClient: AxiosInstance | null = null;

@Component
export default class AxiosMixin extends Vue {
  $client!: AxiosInstance;
  created() {
    if (!sharedClient){
      sharedClient = getClient();
    }
    this.$client = sharedClient;
  }
}
