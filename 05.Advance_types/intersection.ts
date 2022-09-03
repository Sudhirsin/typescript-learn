// With Types
// type Admin = {
//     name: string;
//     privilege: string[]
// }

// type Employee = {
//     name: string;
//     startDate: Date;
// }

// type ElevatedEmployee = Admin & Employee;

// const e1: ElevatedEmployee = {
//     name: 'max',
//     privilege: ['create'],
//     startDate: new Date()
// }


// With interfaces
interface Admin {
    name: string;
    privilege: string[]
}

interface Employee {
    name: string;
    startDate: Date;
}

interface ElevatedEmployee extends Employee, Admin {}

// type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'max',
    privilege: ['create'],
    startDate: new Date()
}

type Combinable = string | number;
type Numeric =  number | boolean;
type Universal = Combinable & Numeric; // these are intersect types
