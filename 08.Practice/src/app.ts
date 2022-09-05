// decorator to bind with this(context)
function autoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this)
            return boundFn
        }
    }
    return adjDescriptor;
}

// Validation
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableObj: Validatable) {
    let isValid = true;
    if (validatableObj.required) {
        isValid = isValid && validatableObj.value.toString().trim().length !== 0;
    } 
    if (validatableObj.minLength != null && typeof validatableObj.value === 'string') {
        isValid = isValid && validatableObj.value.length >= validatableObj.minLength;
    }

    if (validatableObj.maxLength != null && typeof validatableObj.value === 'string') {
        isValid = isValid && validatableObj.value.length <= validatableObj.maxLength;
    }

    if(validatableObj.min != null && typeof validatableObj.value === 'number') {
        isValid = isValid && validatableObj.value >= validatableObj.min;
    }

    if(validatableObj.max != null && typeof validatableObj.value === 'number') {
        isValid = isValid && validatableObj.value <= validatableObj.max;
    }

    return isValid;
}

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input'

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
        this.attach();
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const enteredDesc = this.descriptionInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        }

        const descriptionValidatable: Validatable = {
            value: enteredDesc,
            required: true,
            minLength: 5
        }

        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 10
        }

        if (!validate(titleValidatable) ||
            (!validate(descriptionValidatable)) ||
            (!validate(peopleValidatable))
        )
            // if (enteredTitle.trim().length === 0 || 
            //     enteredPeople.trim().length === 0 ||
            //     enteredDesc.trim().length === 0
            // ) 
        {
            alert('Invalid input, please try again!')
            return;
        }
        return [enteredTitle, enteredDesc, +enteredPeople]
    }

    private clearInputs() {
        this.titleInputElement.value = "";
        this.peopleInputElement.value = "";
        this.descriptionInputElement.value = "";

    }

    @autoBind
    private submitHandler(event: Event) {
        event.preventDefault();
        // console.log(this.titleInputElement.value)
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people)
            this.clearInputs();
        }
    }

    private configure() {
        // this.element.addEventListener('submit', this.submitHandler.bind(this))
        this.element.addEventListener('submit', this.submitHandler.bind)
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const projectInput = new ProjectInput();