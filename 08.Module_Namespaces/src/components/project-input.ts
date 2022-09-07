/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../state/project-state.ts" />


namespace App {
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
        // templateElement: HTMLTemplateElement;
        // hostElement: HTMLDivElement;
        // element: HTMLFormElement;
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;

        constructor() {
            super('project-input', 'app', true, 'user-input')
            // this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
            // this.hostElement = document.getElementById('app')! as HTMLDivElement;

            // const importedNode = document.importNode(this.templateElement.content, true);
            // this.element = importedNode.firstElementChild as HTMLFormElement;
            // this.element.id = 'user-input'

            this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

            this.configure();
            // this.attach();
        }


        configure() {
            // this.element.addEventListener('submit', this.submitHandler.bind(this))
            this.element.addEventListener('submit', this.submitHandler.bind)
        }

        renderContent() {};

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
                // console.log(title, desc, people)
                
                projectState.addProject(title, desc, people);
                this.clearInputs();
            }
        }

        // private attach() {
        //     this.hostElement.insertAdjacentElement('afterbegin', this.element);
        // }
    }
}