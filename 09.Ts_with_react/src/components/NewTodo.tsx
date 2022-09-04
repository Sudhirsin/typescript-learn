import React, { useRef } from 'react';

type NewTodoProps = {
    onAddTodo: (text: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = (props) => {

    const textInputRef = useRef<HTMLInputElement>(null);

    const todoSubmitHandle = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = textInputRef.current!.value;
        props.onAddTodo(enteredText);

    }

    return <form onSubmit={todoSubmitHandle}>
        <div>
            <label htmlFor='todo-text'>Todo text</label>
            <input type='text' id='todo-text' ref={textInputRef} />
            <button type='submit'>Add Todo</button>
        </div>
    </form>
}

export default NewTodo;