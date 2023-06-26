
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
	templateElement: HTMLTemplateElement; //HTML DomElments available due to DOM in the lib tsConfig options being available
	hostElement: T;
	element: U;

	constructor(
		templateId: string,
		hostElementId: string,
		insertAtStart: boolean,
		newElementId?: string //optional params should always be last
	) {
		this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
		this.hostElement = document.getElementById(hostElementId)! as T;
		const importedNode = document.importNode(this.templateElement.content, true);
		this.element = importedNode.firstElementChild as U;
		if (newElementId) {
			this.element.id = newElementId
		}

		this.attach(insertAtStart)
	}

	private attach(insertAtBeginning: boolean) {
		this.hostElement.insertAdjacentElement(
            insertAtBeginning ? "afterbegin" : "beforeend", 
            this.element
        );
	}

	abstract configure(): void
	abstract renderContent(): void
}