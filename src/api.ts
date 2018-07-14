
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client';
import axios from 'axios';

export const app = feathers();
const baseUrl = 'http://localhost:3030';
export const client = rest(baseUrl);

app.configure(client.axios(axios));
app.configure(auth({}));

export const messages = app.service('messages');
export const users = app.service('users');
