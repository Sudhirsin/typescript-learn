type Admin = {
    name: string;
    privilege: string[]
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'max',
    privilege: ['create'],
    startDate: new Date()
}

type Combinable = string | number;
type Numeric =  number | boolean;
type Universal = Combinable & Numeric; // these are intersect types


// type gaurds

function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString()
    }

    return a + b
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo (emp: UnknownEmployee) {
    console.log('Name: ' + emp.name);

    if ('privilege' in emp) {
        console.log('Privileage: '+ emp.privilege)

    }
    // throw erro
    // if (typeof emp === 'object') {
    //     console.log('Privileage: '+ emp.privilege)
    // }
}

printEmployeeInfo(e1)

class Car {
    drive() {
        console.log('Driving ....')
    }
}

class Truck {
    drive() {
        console.log('Driving truck ....')
    }

    loadCargro(load: number) {
        console.log('Loading cargo ....', load)
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();

    if (vehicle instanceof Truck) {
        vehicle.loadCargro(1000);
    }
}

useVehicle(v1)
useVehicle(v2)

// Discriminated

interface Bird {
    // discriminating
    type: 'bird';

    flyingSpeed: number;
}

interface Horse {
    type: 'horse';

    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal (animal: Animal) {
    let speed;
    switch(animal.type) {
        case 'bird':
            speed = animal.flyingSpeed
             break;
        case 'horse':
            speed = animal.runningSpeed
            break;
    }

    console.log('Moving wiht speed' + speed)
}


moveAnimal({ type: 'bird', flyingSpeed: 20 })
moveAnimal({ type: 'horse', runningSpeed: 50 })

// type casting
// <p id='message-output'></p> in DOM
// <input id='user-input' type='text' />

const para = document.querySelector('p');
const paraById = document.getElementById('message-output');

// type casting 1st way => <HTMLInputElement>
// const userInput = <HTMLInputElement>document.getElementById('user-input')

// 2nd way => ! as HTMLInputElement;
// ! tells this will be never null;
const userInput = document.getElementById('user-input')! as HTMLInputElement;

userInput.value = 'Hi There'

// Index Properties -> we can use with [key: type]: value:type
interface ErrorContainer { // { email: 'Not a valid email', username: 'Must start with character' }
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email',
    username: 'Must start with character'
}

// function overloads
// function sum(a: number) : number
function sum(a: number, b: number) : number;
function sum(a: string, b: string) : string;
function sum(a: string, b: number) : string;
function sum(a: number, b: string) : string;
function sum(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString()
    }

    return a + b
}

const result = sum(1, 5)
const result1 = sum('Max', "Max")
const result2 = sum(2, "Max")

// Optional Chaning
const fetchedUserData = {
    id: 'ui',
    name: 'Max',
    job: { title: 'CEO', description: 'My own company' }
}

// console.log(fetchedUserData.job.title)
console.log(fetchedUserData?.job?.title)

// Nullish coalescing ?? (null and undefined only) // not 0 or ''
// const userInputNew = null;
const userInputNew = undefined;
const storedData = userInputNew ?? 'DEFAULT';
console.log(storedData);
