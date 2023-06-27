import { Project, ProjectStatus } from "../models(interfaces)/project"

type Listener<T> = (items: T[]) => void

export class State<T> {
	protected listeners: Listener<T>[] = []

	addListener(listenerFn: Listener<T>) {
		this.listeners.push(listenerFn)
	}
}

export class ProjectState extends State<Project> {
	private projects: Project[] = []
	private static instance: ProjectState

	private constructor() {
		super()
	}

	static getInstance() {
		if (this.instance) {
			return this.instance
		}
		this.instance = new ProjectState()
		return this.instance
	}

	addProject(title: string, description: string, numOfPeople: number) {
		const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active)
		// const newProject = {
		//     id:Math.random().toString(),
		//     title: title,
		//     description: description,
		//     people: numOfPeople
		// };
		this.projects.push(newProject)
		// console.log({newProject})
		this.updatelisteners()
	}

	moveProject(projectId: string, newStatus: ProjectStatus) {
		const project = this.projects.find((prj) => prj.id === projectId)
		if (project && project.status !== newStatus) {
			project.status = newStatus
			this.updatelisteners()
		}
	}

	private updatelisteners() {
		for (const listenerFn of this.listeners) {
			listenerFn(this.projects.slice()) // slice method to only return copy of the array.
		}
	}
}

// make ProjectState accessible
export const projectState = ProjectState.getInstance()
