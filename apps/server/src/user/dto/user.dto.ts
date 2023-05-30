export interface User {
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  location: string;
  age: number;
  roles: string[];
  idpService: string;
  idpId: string;
  timestamp: Date;
}
