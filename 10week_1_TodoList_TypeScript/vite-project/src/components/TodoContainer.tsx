import { useState } from "react"
import { TTodo } from "../types/todo";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

// Todo => { id: number, text: string, checked: boolean }

function TodoContainer() : Element {
    // todo 배열
    const [todos, setTodos] = useState<TTodo[]>([
        {
            id: 1,
            text: '할 일 1',
            checked: false,
        },
    ]); 

    // input에 입력한 텍스트 input에 전달 
    const onAddTodo = (text: string) : void => {
        setTodos((prevTodos): TTodo[] =>[
            ...prevTodos,
            {
                id: prevTodos.length +10,
                text: text,
                checked: false,
            },
        ])
    };

    return ( 
    <>
        <TodoInput onAddTodo={onAddTodo}/>
        <TodoList todos={todos}/>
    </>
    );
}

export default TodoContainer;