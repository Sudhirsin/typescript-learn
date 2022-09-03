// generics not available in js.
// Generic function and classes
// constraints
// special types
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Build generic
// string[]
// const names: Array<string> = []; // Generic type 'Array<T>' requires 1 type argument(s).
// names[0].split(' ')
// const promise: Promise<string> = new Promise((res, rej) => {
//     setTimeout(() => {
//         res('This is done')
//         // res(10)
//     }, 2000);
// })
// promise.then(data => {
//     data.split(' ');
// })
// Creating own generic `<T: >`
// function merge<T, U>(objA: T, objB: U) {
//     return Object.assign(objA, objB);
// }
// const mergedObj = merge({ name: 'Max'}, { id: 123 })
// console.log(mergedObj.id)
// console.log(mergedObj.name)
// constraints by using extends
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
var mergedObj = merge({ name: 'Max' }, { id: 123 });
console.log(mergedObj.id);
console.log(mergedObj.name);
function countAndDescribe(element) {
    var desc = "Got no value";
    if (element.length > 0) {
        desc = 'Got 1 elelment';
    }
    else if (element.length > 1) {
        desc = 'Got ' + element.length + ' elements';
    }
    return [element, desc];
}
console.log(countAndDescribe('Hi there'));
console.log(countAndDescribe(["Max", 'Cooking']));
// use keyof => accessing the property which does exist
function extraAndConvert(obj, key) {
    return obj[key];
}
console.log(extraAndConvert({ name: 'Sudhir' }, 'name'));
// Generic classes
var DataStorage = /** @class */ (function () {
    function DataStorage() {
        this.data = [];
    }
    DataStorage.prototype.addIntem = function (item) {
        this.data.push(item);
    };
    DataStorage.prototype.removeItem = function (item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    };
    DataStorage.prototype.getItem = function () {
        return __spreadArray([], this.data, true);
    };
    return DataStorage;
}());
var textStorage = new DataStorage();
textStorage.addIntem('Sudhir');
textStorage.addIntem('Singh');
textStorage.removeItem('Singh');
console.log(textStorage);
var numStorage = new DataStorage();
numStorage.addIntem(1);
numStorage.addIntem(2);
numStorage.removeItem(1);
console.log(textStorage);
function createCourseGoal(title, description, completeUntil) {
    var courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = completeUntil;
    // partial
    return courseGoal;
}
// Generic vs union types
