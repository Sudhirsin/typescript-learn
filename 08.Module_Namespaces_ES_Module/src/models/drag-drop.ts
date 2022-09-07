// Drag and drop interfaces
export interface Dragable { // export will exporse outside of this namesapce also
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

export interface DragTraget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(evet: DragEvent): void;
}