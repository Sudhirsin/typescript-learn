// Decorators ==> check class-validator npm for decorators; 
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

// const p1 = new Person();
// console.log(p1)



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

const p1 = new Product('Book1', 19)
const p2 = new Product('Book2', 29)


function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this)
            return boundFn;
        }
    }
    return adjDescriptor;
}

class Printer {
    message = 'This works';

    @AutoBind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button')!;
// button.addEventListener('click', p.showMessage.bind(p));
button.addEventListener('click', p.showMessage);

// ex- validation with decorators
interface ValidatorConfig {
    [property: string]: {
        [valitableProp: string]: string[] // ['required', 'positive']
    }
}

const registeredValidators : ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['required']
    }
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive']
    }
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop]
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0
                   break;
            }
        }
    }

    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }


}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleEle = document.getElementById('title') as HTMLInputElement;
    const priceEle = document.getElementById('price') as HTMLInputElement;

    const title = titleEle.value
    const price = +priceEle.value

    const course = new Course(title, price);

    if (!validate(course)) {
        alert('Invalid input, please try again!')
        return
    }
    console.log(course);
})