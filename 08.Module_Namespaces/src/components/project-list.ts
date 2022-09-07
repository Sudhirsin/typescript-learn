/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />


namespace App {
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTraget {
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

        @autoBind
        dragOverHandler(event: DragEvent) {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const listEl = this.element.querySelector('ul')!;
                listEl.classList.add('dropable');
            }
        }

        @autoBind
        dropHandler(event: DragEvent){
            // console.log(event.dataTransfer!.getData('text/plain'));
            const prjId = event.dataTransfer!.getData('text/plain');
            projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);

        }

        @autoBind
        dragLeaveHandler(evet: DragEvent){
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.remove('dropable');
        }

        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            this.element.addEventListener('drop', this.dropHandler);

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
}