
import {AxiosResponse} from 'axios';
import Joi from 'joi';
import _ from 'lodash';

export interface User {
  id?: number;
  username: string;
  firstName?: string;
  lastName?: string;
  isStaff?: boolean;
  isActive?: boolean;
  email?: string;
  lastLogin?: Date;

  dateJoined?: Date;
}

function undefinedIfEmpty(str: string): string | undefined {
  return _.isEmpty(str) ? undefined : str;
}
export class ApiUser implements User {

  constructor(responseData: any) {
    const {
      id,
      username,
      firstName,
      lastName,
      isStaff,
      isActive,
      email,
      lastLogin,
      dateJoined
    } = responseData;

    this.id = id;
    this.username = username;
    this.firstName = undefinedIfEmpty(firstName);
    this.lastName = undefinedIfEmpty(lastName);
    this.isActive = isActive || false;
    this.isStaff = isStaff || false;
    this.email = undefinedIfEmpty(email);
    this.lastLogin = new Date(lastLogin);
    this.dateJoined = new Date(dateJoined);
  }

  id?: number;
  username: string;
  firstName?: string;
  lastName?: string;
  isStaff?: boolean;
  isActive: boolean;
  email?: string;
  lastLogin?: Date;

  dateJoined?: Date;
}

export const userSchema = Joi.object().keys({
  id : Joi.number().optional(),
  username : Joi.string(),
  email : Joi.string().email().optional(),
  dateJoined : Joi.date().optional(),
  firstName : Joi.strict().optional(),
  lastName : Joi.string().optional(),
  isActive : Joi.boolean().optional(),
  isStaff : Joi.boolean().optional(),
  lastLogin : Joi.date().optional()
});

export interface Message {
  content: string;
  timestamp?: Date;
  user?: User;
  userId?: number;
}
