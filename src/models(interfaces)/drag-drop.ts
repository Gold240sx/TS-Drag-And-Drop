export interface Draggable {
	//two event listeners: drag start and dragEnd handlers
	dragStartHandler(event: DragEvent): void
	dragEndHandler(event: DragEvent): void
}

export interface DragTarget {
	dragOverHandler(event: DragEvent): void // tells JS the target is a valid dragTarget - permit the drop
	dropHandler(event: DragEvent): void // handle the functionality of the drop (data + UI)
	dragLeaveHandler(event: DragEvent): void // visual feedback or revert changes
}
