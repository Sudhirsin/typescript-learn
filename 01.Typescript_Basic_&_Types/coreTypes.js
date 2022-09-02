// 1. number - 1, 5.3, -10 - there is no difference b/w integers and floats
// 2. String - 'Hi'
// 3. boolean - true or false
// 4. object - {}
// 5 array - [1,2,3]
// 6. Tuples - [1,2] -> it will fixed length and fixed type array
// 7. Enums - enum { NEW, OLD }
function add(n1, n2, showResult, phrase) {
    // console.log(typeof n1) // number
    var result = n1 + n2;
    console.log(phrase + result);
    return n1 + n2;
}
var num1 = 5;
var num2 = 10;
var printResult = true;
var resultPhrase = 'Result is: ';
var result = add(num1, num2, printResult, resultPhrase);
console.log(result);
// String
var userName = 'Sudhir';
// Type assignment and inerfence
var num3 = 5;
// num3 = 'Hi' // will throw error
var num4;
num4 = 'Hi';
// Object
var person = {
    name: 'Sudhir',
    age: 25
};
// console.log(person.nickname) // throw an error nickname not exist
console.log(person.name);
// nested object
var product = {
    id: 'abc1',
    price: 12.99,
    tags: ['a', 'b', 'c'],
    details: {
        title: 'Red carpet',
        description: 'A great carpet'
    }
};
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
var hobbies = ["sports", 'cooking']; // type would be string[]
var favoriteActivities;
// favoriteActivities = 'Sport' // will get error here 
// favoriteActivities = ['sport', 1] // will get error here
favoriteActivities = ['cricket'];
// Tuple
var role = [2, 'author']; // first will always number and 2 will string
// role.push('admin') 
// role[1] = 10 // get an error
// ENUMS
// global JS way
var ADMIN = 0;
var READE_ONLY = 1;
var AUTHOR = 2;
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READE_ONLY"] = 1] = "READE_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
var person1 = {
    name: 'Sudhir',
    age: 24,
    role: ADMIN,
    roleWithEnum: Role.READE_ONLY
};
