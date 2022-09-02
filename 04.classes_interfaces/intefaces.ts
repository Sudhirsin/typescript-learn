// descibe the structure of object -- it will availble in only ts.
// used for type check
// type and interface is not same but we can use them interchangebly
// major defference in interface is used describe the structure of object
// but with type we can add more flexible like use union etc

interface Person {
    name: string; // name: string = 'Max' -> it will threw an error interfaces can't be initailise or can't have defaults.
    age: number;

    greet(phrase: string): void;
}

let user1: Person;

user1 = {
    name: 'sudhir',
    age: 34,
    greet(phrase: string ) { 
        console.log(phrase + ' ' + this.name)
    }
}

user1.greet('Hi')

// ex-2
class PersonNew implements Greetable {
    name: string;
    // now we can extend the class also
    constructor(n: string) {

    }
    greet(phrase: string ) { 
        console.log(phrase + ' ' + this.name)
    }
}

interface Greetable {
    name: string;

    greet(phrase: string): void;
}

let user2: Greetable;

user2 = {
    name: 'Sudhir',
    greet(phrase: string ) { 
        console.log(phrase + ' ' + this.name)
    }
}