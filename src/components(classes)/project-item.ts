import { Draggable } from "../models(interfaces)/drag-drop"
import { Component } from "./base-component"
import { autobind } from "../decorators/autobind"
import { Project } from "../models(interfaces)/project"

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
	//store the project that belongs to the projectItem in the projectItem class
	private project: Project

	get persons() {
		if (this.project.people === 1) {
			return "1 person"
		} else {
			return ` ${this.project.people} people`
		}
	}

	constructor(hostId: string, project: Project) {
		// single project is the template id. Host Id we want to forward.
		super("single-project", hostId, false, project.id)
		this.project = project

		this.configure()
		this.renderContent()
	}

	@autobind
	dragStartHandler(event: DragEvent) {
		// tell JS which item is being transfered
		event.dataTransfer!.setData("text/plain", this.project.id)
		event.dataTransfer!.effectAllowed = "move" //makes a move (holding cursor)
		// we reattach the data based upon the id, because remember, we are rerendering all the content on dragend.
	}

	dragEndHandler(_: DragEvent) {
		// console.log("dragEnd")
	}

	configure() {
		this.element.addEventListener("dragstart", this.dragStartHandler)
		this.element.addEventListener("dragend", this.dragEndHandler)
	}
	renderContent() {
		this.element.querySelector("h2")!.textContent = this.project.title
		this.element.querySelector("h3")!.textContent = this.persons + " assigned."
		this.element.querySelector("p")!.textContent = this.project.description
	}
}
