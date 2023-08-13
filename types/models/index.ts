export interface IGeoLocation {
  lat: string;
  long: string;
}

export interface IAddress {
  geolocation: IGeoLocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

export interface IName {
  firstname: string;
  lastname: string;
}

export interface IUser {
  address: IAddress;
  id: number;
  email: string;
  username: string;
  password: string;
  name: IName;
  phone: string;
  __v: number;
}
