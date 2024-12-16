import { ChangeEvent } from "react";

interface iTodoInput {
    onAddtodo: (text: string) => void;
}

function TodoInput({ onAddTodo }) : Element {
    const [input, setInput] = useState('');

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setInput(e.target.value);
    };

    const addTodo = () : void => {
        onAddTodo(input);
    }

    return (
        <>
            <input value={input} onChange={handleChangeInput} />
            <button onClick={addTodo}>추가</button>
        </>
    );
}

export default TodoInput;