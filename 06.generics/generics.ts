// generics not available in js.
// Generic function and classes
// constraints
// special types

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
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Max'}, { id: 123 })
console.log(mergedObj.id)
console.log(mergedObj.name)

// Another Generic
interface Lenghty {
    length: number
}

function countAndDescribe<T extends Lenghty>(element: T): [T, string] {
    let desc = "Got no value"
    if (element.length > 0) {
        desc = 'Got 1 elelment'
    } else if (element.length > 1) {
        desc = 'Got ' + element.length + ' elements'
    }
    return [element, desc]
}

console.log(countAndDescribe('Hi there'));
console.log(countAndDescribe(["Max", 'Cooking']));


// use keyof => accessing the property which does exist
function extraAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key]
}

console.log(extraAndConvert({ name: 'Sudhir'}, 'name'))

// Generic classes
class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addIntem(item: T){
        this.data.push(item)
    }

    removeItem(item: T){
        if (this.data.indexOf(item) === -1) {
            return
        }
        this.data.splice(this.data.indexOf(item), 1)
    }

    getItem() {
        return [...this.data]
    }
    
}

const textStorage = new DataStorage<string>();
textStorage.addIntem('Sudhir')
textStorage.addIntem('Singh')
textStorage.removeItem('Singh')
console.log(textStorage)

const numStorage = new DataStorage<number>();
numStorage.addIntem(1)
numStorage.addIntem(2)
numStorage.removeItem(1)
console.log(textStorage)

// const objStorage = new DataStorage<object>();
// const maxObj = { name: 'Max' }
// objStorage.addIntem(maxObj)
// objStorage.addIntem({ name: 'Manu' })
// objStorage.removeItem(maxObj)

// Partial Generic
interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, completeUntil: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {}
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = completeUntil;

    // partial
    return courseGoal as CourseGoal;
}

// Generic vs union types






