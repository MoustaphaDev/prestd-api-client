type TableNames = 'users' | 'receivers' | 'buses' | 'drivers';
type ApiResources = {
  users: User[];
  receivers: Receiver[];
  buses: Bus[];
  drivers: Driver[];
};

type User = {
  id: number;
  firstname: string;
  lastname: string;
  phonenumber: number;
  email: string;
  login: string;
  password: string;
};

type Receiver = {
  id: number;
  firstname: string;
  lastname: string;
  phonenumber: number;
  age: number;
};

type Driver = {
  id: number;
  firstname: string;
  lastname: string;
  phonenumber: number;
  age: number;
  driverlicensetype: 'Permis A' | 'Permis B';
};

type Bus = {
  id: number;
  brand: string;
  color: string;
  busnumber: BusNumber;
  driverid: number;
};

type BusNumber = 80 | 90 | 10 | 63 | 5 | 7;

export {
  TableNames,
  ApiResources,
  // User,
  // Receiver,
  // Driver,
  // Bus,
  // BusNumber,
};
