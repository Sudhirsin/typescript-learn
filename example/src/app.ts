// decorators
// function Logger(constructor: Function) {
//     console.log('Logging ....')
//     console.log(constructor)
// }

// decorator factories
function Logger(logString: string) {
    console.log('Logger started')
    return (constructor: Function) => {
        console.log(logString)
        console.log(constructor)
    }
}

// 2nd
function WithTemplate(template: string, hookId: string) {
    console.log('Template started')
    return function<T extends { new(...args: any[]): { name: string }} >(originalConstructor: T) {
        // console.log('Rendering the template')
        // const hookeElement = document.getElementById(hookId);
        // const p = new originalConstructor();
        // if (hookeElement) {
        //     hookeElement.innerHTML = template
        //     hookeElement.querySelector('h1')!.textContent = p.name
        // }

        // returing with the new constructor
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log('Rendering the template')
                const hookeElement = document.getElementById(hookId);
                const p = new originalConstructor();
                if (hookeElement) {
                    hookeElement.innerHTML = template
                    hookeElement.querySelector('h1')!.textContent = this.name
                }
            }
        }
    }
}

// execution will run the bottom to top => first WithTemplate then Logger but function will run top to bottom
@Logger('Logging....- Person')
@WithTemplate('<h1>Person with template</h1>', 'app')
class Person {
    name = "max";

    constructor() {
        console.log('Creating person object..')
    }
}

const p1 = new Person();
console.log(p1)



// More decorators
function Log(target: any, propertyName: string | symbol) {
    console.log('property decorators');
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorators');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(target: any, name: string | symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorators');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string | symbol, position: number) {
    console.log('Params decorators');
    console.log(target);
    console.log(name);
    console.log(position);
}



class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price -  should be positive')
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax)
    }
}