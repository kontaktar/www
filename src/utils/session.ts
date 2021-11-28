import { DatabaseUser, User } from "types";

// this can not be stored in lib/session, then withSession is triggered on dev build - I have nooo idea why
export const mapDatabaseUser = (dbUser: DatabaseUser): User => {
  console.log("dbUser", dbUser);
  return {
    id: dbUser.id,
    phoneNumber: dbUser.userPhoneNumber.phoneNumber,
    ssn: dbUser.ssn,
    userName: dbUser.userName,
    firstName: dbUser.firstName,
    email: dbUser.userMetaData.email,
    createdAt: dbUser.userStatistics.createdAt,
    lastLogin: dbUser.userStatistics.lastLogin
  };
};
