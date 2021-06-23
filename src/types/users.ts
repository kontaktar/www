/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable camelcase */

export type UserDB = {
  ssn: string;
  user_name: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  website: string;
  phone_number: string;
};

export type User = {
  id: number;
  ssn: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  website?: string;
  phoneNumber: string;
  firebaseId?: string;
  createdAt?: string;
  lastLogin?: string;
};

export type UserAddress = {
  country?: string;
  postalCode?: string;
  streetName?: string;
  city?: string;
};

// eslint-disable-next-line import/prefer-default-export
export enum UserData {
  PhoneNumber = "phoneNumber",
  LastName = "lastName",
  UserName = "userName",
  FirstName = "firstName",
  Kennitala = "ssn",
  Email = "email"
}
