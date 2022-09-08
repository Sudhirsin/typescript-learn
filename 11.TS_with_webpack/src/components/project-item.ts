import { Dragable }  from '../models/drag-drop';
import { Component } from './base-component';
import { Project } from '../models/project';
import { autoBind } from '../decorators/autobind';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Dragable {
    private project: Project; 

    get persons() {
        if (this.project.people === 1) {
            return '1 person'
        } else {
            return `${this.project.people} persons assigned`
        }
    }
    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project

        this.configure();
        this.renderContent();
    }

    @autoBind
    dragStartHandler(event: DragEvent) {
        // console.log('Dragstart')
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    @autoBind
    dragEndHandler(event: DragEvent) {
        console.log('Dragend')
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        // this.element.querySelector('h3')!.textContent = this.project.people.toString() + ' assigned';
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}