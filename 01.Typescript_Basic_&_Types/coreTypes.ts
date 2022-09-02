// 1. number - 1, 5.3, -10 - there is no difference b/w integers and floats
// 2. String - 'Hi'
// 3. boolean - true or false
// 4. object - {}
// 5 array - [1,2,3]
// 6. Tuples - [1,2] -> it will fixed length and fixed type array
// 7. Enums - enum { NEW, OLD }
// 8. Any - * any kind of value can store
// 9. union types - 
// 10. Literal - 
// 11. Aliases
// 12. Functions

function add(n1: number, n2: number, showResult: boolean, phrase: string) {
    // console.log(typeof n1) // number
    let result = n1 + n2
    console.log(phrase + result)
    return n1+ n2
}

const num1 = 5
const num2 = 10
const printResult = true
const resultPhrase = 'Result is: '

const result = add(num1, num2, printResult, resultPhrase)
console.log(result)

// String
const userName = 'Sudhir';

// Type assignment and inerfence
let num3 = 5
// num3 = 'Hi' // will throw error
let num4: string;
num4 = 'Hi'

// Object
const person: {
    name: string;
    age: number;
} = {
    name: 'Sudhir',
    age: 25
}

// console.log(person.nickname) // throw an error nickname not exist
console.log(person.name)

// nested object
const product: {
    id: string;
    price: number;
    tags: string[];
    details: {
        title: string;
        description: string;
    }
} = {
    id: 'abc1',
    price:12.99,
    tags: ['a', 'b', 'c'],
    details: {
        title: 'Red carpet',
        description: 'A great carpet'
    }
}

// type would be
// {
//     id: string;
//     price: number;
//     tags: string[];
//     details: {
//         title: string;
//         description: string;
//     }
// }

// Arrays - will be flexible or fixed length

const hobbies = ["sports", 'cooking'] // type would be string[]
let favoriteActivities: string[]
// favoriteActivities = 'Sport' // will get error here 
// favoriteActivities = ['sport', 1] // will get error here
favoriteActivities = ['cricket']

// Tuple
const role: [number, string] = [2, 'author'] // first will always number and 2 will string
// role.push('admin') 
// role[1] = 10 // get an error


// ENUMS

// global JS way
const ADMIN = 0;
const READE_ONLY= 1;
const AUTHOR = 2;

enum Role {
    ADMIN = 5, READE_ONLY = 100, AUTHOR = 'AUTHOR'
}

const person1 = {
    name: 'Sudhir',
    age: 24,
    role: ADMIN,
    roleWithEnum: Role.READE_ONLY
}

// ANY - try to avoid
let next: any;
next = 2
next = 'next'

// Union
function combine(input1: number | string, input2: number | string) {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2
    } else {
        result = input1.toString() + input2.toString()
    }
    return result
}

const res1 = combine(30, 100)
const res2 = combine('Max', 'max')

// Literal
let check: 'as-number' | 'as-string' = 'as-number'

// Aliases
type Combinable = number | string;
type CoversionDescription = 'as-number' | 'as-string'
type User = { name: string; age: number }

function combiner(input1: Combinable, input2: Combinable) {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2
    } else {
        result = input1.toString() + input2.toString()
    }
    return result
}

// Functions
function sum(n1: number, n2: number) {
    return n1 + n2
}

function printResultMethod(num: number): void { // return type void
    console.log('Result: ' + num)
    // result 'something' // thruw error if return anything because it is void return type.
}

// let combineValue: Function;
let combineValue: (a: number, b: number) => number;
combineValue = sum;
// combineValue = printResultMethod // get an error here
// combineValue = 5 // get an error here
console.log(combineValue(4, 5))

// Callbacks
function addAndHandle(n1: number, n2: number, cb:(num: number) => void) {
    const result = n1 + n2
    cb(result)
}

addAndHandle(4, 5, (result) => console.log(result))

// Unknown types
let userInut: unknown; // we don't know yet
let userEmail: string;
userInut = 5
userInut = 'Sid'

// userEmail = userInut // not assignable unknown and string both are different. 
// but if userInput: any then it not complain 

// Never types
function generateError (message: string, code: number): never {
    throw { message: message, errorCode: code}
}

generateError('Error code', 500) // it will never return anything -> we don't get undefind also
// it carsh the script