export interface DatabaseUser {
  id: number;
  userName: string;
  lastName: string;
  firstName: string;
  ssn: string;
  userMetaData?: UserMetaData;
  userFirebaseMap: UserFirebaseMap;
  userPhoneNumber: UserPhoneNumber;
  userStatistics?: any;
  userAddress?: UserAddress;
}

interface UserAddress {
  id: number;
  postalCode?: string;
  streetName?: string;
  city?: string;
  country?: string;
  userId: number;
}

interface UserPhoneNumber {
  phoneCountryExtension?: string;
  phoneNumber: string;
  userId: number;
}

interface UserFirebaseMap {
  firebaseId: string;
  userId: number;
}
interface UserMetaData {
  id: number;
  website?: string;
  email?: string;
  userId: number;
}
