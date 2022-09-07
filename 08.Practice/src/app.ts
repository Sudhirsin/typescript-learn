enum ProjectStatus { Active, Finished }

class Project {
    constructor(
        public id: string, 
        public title: string, 
        public description: string, 
        public people: number, 
        public status: ProjectStatus
    ) {}
}

type Listener<T> = (items: T[]) => void;

// Global state
class State<T> {
    protected listener: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listener.push(listenerFn)
    }
    
}

class ProjectState extends State<Project> {
    // private listener: Listener[] = [];
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    // addListener(listenerFn: Listener) {
    //     this.listener.push(listenerFn)
    // }

    addProject(title: string, description: string, people: number) {
        const newProject = new Project(Math.random().toString(),title, description, people, ProjectStatus.Active)
        this.projects.push(newProject);
        for (const listenerFn of this.listener) {
            listenerFn(this.projects.slice());
        }
    }
}

// const projectState = new ProjectState();
const projectState = ProjectState.getInstance();

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


// component base class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;
    
    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId
        }

        this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {
        this.hostElement.insertAdjacentElement(insertAtStart === true ? 'afterbegin': 'beforeend', this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
    private project: Project; 

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project

        this.configure();
        this.renderContent();
    }

    configure() {}

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.project.people.toString();
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
    // templateElement: HTMLTemplateElement;
    // hostElement: HTMLDivElement;
    // element: HTMLElement;
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false,`${type}-projects`);
        // this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        // this.hostElement = document.getElementById('app')! as HTMLDivElement;
        this.assignedProjects = []

        // const importedNode = document.importNode(this.templateElement.content, true);
        // this.element = importedNode.firstElementChild as HTMLElement;
        // this.element.id = `${this.type}-projects`

        // this.attach();
        this.configure();
        this.renderContent();
    }

    configure() {
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(project => {
                if (this.type == 'active') {
                    return project.status === ProjectStatus.Active
                }
                return project.status === ProjectStatus.Finished
            });
            this.assignedProjects = relevantProjects
            this.renderProjects();
        })
    }

    // private renderContent() {
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toLocaleUpperCase() + ' PROJECTS';
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for(const project of this.assignedProjects) {
            // const listItem = document.createElement('li');
            // listItem.textContent = project.title;
            // listEl.appendChild(listItem)
            new ProjectItem(this.element.querySelector('ul')!.id, project)
        }
    }

    // private attach() {
    //     this.hostElement.insertAdjacentElement('beforeend', this.element);
    // }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finisherProjectList = new ProjectList('finished');