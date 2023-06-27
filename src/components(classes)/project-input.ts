import { Component } from "./base-component"
import { autobind } from "../decorators/autobind"
import { projectState } from "../state/project-state"
import { validate, Validatable } from "../util/validation"

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
	titleInputElement: HTMLInputElement
	descriptionInputElement: HTMLInputElement
	peopleInputElement: HTMLInputElement

	// get access to the template and form and to the app div
	constructor() {
		super("project-input", "app", true, "user-input")
		//      // gives access to the template that holds the host element
		// this.templateElement = document.querySelector("#project-input")! as HTMLTemplateElement
		//      //reference to the element in which to render content
		// this.hostElement = document.querySelector("#app")! as HTMLDivElement

		//      //render the form to the dom
		// const importedNode = document.importNode(this.templateElement.content, true)
		// this.element = importedNode.firstElementChild as HTMLFormElement
		// this.element.id = "user-input"

		//get access to diff inputs
		this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement
		this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement
		this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement

		this.configure()
	}

	//  generally you wanna include the public methods before any private methods
	configure() {
		//this.element.addEventListener("submit", this.submitHandler.bind(this)) // non-decorator variation
		this.element.addEventListener("submit", this.submitHandler) // decorator w/autobind variation
	}

	renderContent() {}

	private gatherUserInput(): [string, string, number] | void {
		const enteredTitle = this.titleInputElement.value
		const enteredDescription = this.descriptionInputElement.value
		const enteredPeople = this.peopleInputElement.value

		const titleValidatable: Validatable = {
			value: enteredTitle,
			required: true,
		}

		const descriptionValidatable: Validatable = {
			value: enteredDescription,
			required: true,
			minLength: 5,
			maxLength: 150,
		}

		const peopleValidatable: Validatable = {
			value: +enteredPeople,
			required: true,
			min: 1,
			max: 10,
		}

		if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
			alert("Invalid inputs, please try again!")
			return
		} else {
			return [enteredTitle, enteredDescription, +enteredPeople]
		}
	}

	//add listeners for the inputs
	@autobind
	private submitHandler(event: Event) {
		event.preventDefault()
		// validate inputs

		const userInput = this.gatherUserInput()
		if (Array.isArray(userInput)) {
			const [title, description, people] = userInput
			projectState.addProject(title, description, people)
			// console.log(title, description, people)
			this.clearInputs()
			// console.log(projectState)
		}
	}

	private clearInputs() {
		this.titleInputElement.value = ""
		this.descriptionInputElement.value = ""
		this.peopleInputElement.value = ""
	}
}
