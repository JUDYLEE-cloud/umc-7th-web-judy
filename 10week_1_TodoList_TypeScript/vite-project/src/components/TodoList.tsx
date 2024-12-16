import { TTodo } from "../types/todo";

interface ITodoList {
    todos: TTodo[];
}

function TodoList({ todos }: ITodoList): void {
    <div>Todos</div>
}
export default TodoList;

/*     return (
        {todos.map((todo) => {
            return <div key={todo.id}>{todo.text}</div>;
        })}
    );
*/