import { Project , ProjectStatus} from '../models/project'

type Listener<T> = (items: T[]) => void;

// Global state
class State<T> {
    protected listener: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listener.push(listenerFn)
    }
    
}

export class ProjectState extends State<Project> {
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
        for (const listenerFn of this.listener) {
            listenerFn(this.projects.slice());
        }
        this.projects.push(newProject);
        this.updateListener();
    }

    moveProject(id: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === id)
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListener();
        }
    }

    private updateListener() {
        for (const listenerFn of this.listener) {
            listenerFn(this.projects.slice());
        }
    }
}

// const projectState = new ProjectState();
export const projectState = ProjectState.getInstance();