import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");


    const addToDo = async (e) => {
        e.preventDefault()
        const res = await axios.post('http://localhost:8000/todos/', { description: task })
        if (res && res.status === 201) {
            console.log('posted!');
        }
        await getToDo();
    }


    const getToDo = async () => {
        try {
            const response = await axios.get('http://localhost:8000/todos/');
            setTodos(response.data);
        } catch (err) {
            console.log('Error fetching todos:', err);
        }
    }

    useEffect(() => {
        getToDo();
    }, [])

    return (
        <div className='TodoPage'>
            <div className='TodoList'>
                <h1>List of TODOs</h1>
                {todos.map((task, ind) => {
                    return <li key={ind}>{task.description}</li>;
                })}
            </div>
            <div className='TodoForm'>
                <h1>Create a ToDo</h1>
                <form>
                    <div>
                        <label htmlFor="todo">ToDo: </label>
                        <input type="text" onChange={(e) => { setTask(e.target.value) }} />
                    </div>
                    <div style={{ "marginTop": "5px" }}>
                        <button onClick={addToDo}>Add ToDo!</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Todo
