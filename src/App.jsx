import './App.css'
import {useEffect, useState} from "react";
import {TodoContextProvider} from "./Context/Index.js";
import {TodoForm, TodoItem} from "./Components/index.js";

function App() {
    let [todos, setTodos] = useState([]);
    // the above todos is an array of todos and not any single todoItem

    // now we will define here all the function or methods that we have used
    // or passed in the context as below

    let addTodo = (todo) => {
        // the todoItem that we passed in the above is from the form element

        // setTodos((prevTodos) => {
        //     // Create a new todo object
        //     const newTodo = {
        //         id: Date.now(),
        //         text: todo,
        //         completed: false
        //     };
        //
        //     // Create a new array with the new todo at the beginning
        //     const updatedTodos = [newTodo, ...prevTodos];
        //
        //     // Return the new array to update the state
        //     return updatedTodos;
        // });

        setTodos((prev) => [{id:Date.now(), ...todo, completed:false},  ...prev])
        // console.log(todos)
    }

    let updateTodo = (id, todo) => {
        // setTodos((prevTodos) => {
        //     // Create a new array to store the updated todos
        //     const newTodos = [];
        //
        //     // Loop through each todo in the previous state
        //     for (let i = 0; i < prevTodos.length; i++) {
        //         const currentTodo = prevTodos[i];
        //
        //         // If the current todo's id matches the id we want to update
        //         if (currentTodo.id === id) {
        //             // Add the updated todo to the new array
        //             newTodos.push(updatedTodo);
        //         } else {
        //             // Otherwise, add the original todo to the new array
        //             newTodos.push(currentTodo);
        //         }
        //     }
        //
        //     // Return the new array to update the state
        //     return newTodos;
        // });
        //above setTodos can also be written as:
        setTodos((prev) => prev.map((prevTodo) =>
            (prevTodo.id === id ? todo : prevTodo)))
    }

    let deleteTodo = (id) => {
        setTodos((prev) =>
            prev.filter((todo) => todo.id !== id))
        // setTodos((prevTodos) => {
        //     const newTodos = [];
        //     for (let i = 0; i < prevTodos.length; i++) {
        //         const currentTodo = prevTodos[i];
        //         if (currentTodo.id !== id) {
        //             newTodos.push(currentTodo);
        //         }
        //     }
        //     return newTodos;
        // });

        // this filter will only return the true condition and if condition
        // is false then it will not be returned so that id is deleted
        // automatically
    }

    let toggleComplete = (id) => {

        // setTodos((prevTodos) => {
        //     const newTodos = [];
        //     for (let i = 0; i < prevTodos.length; i++) {
        //         const currentTodo = prevTodos[i];
        //         if (currentTodo.id === id) {
        //             newTodos.push({
        //                 ...currentTodo,
        //                 completed: !currentTodo.completed
        //             });
        //         } else {
        //             newTodos.push(currentTodo);
        //         }
        //     }
        //     return newTodos;
        // });

        setTodos((prev) => prev.map((prevTodo) =>
        prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo
        ))
    }

    // now below we are studying localStorage
    useEffect(() => {
        try {
            const storedTodos = localStorage.getItem('todos')
            if (storedTodos) {
                const parsedTodos = JSON.parse(storedTodos)
                if (Array.isArray(parsedTodos) && parsedTodos.length > 0) {
                    setTodos(parsedTodos)
                }
            }
        } catch (error) {
            console.error("Error parsing todos from localStorage:", error)
            // If there's an error, we'll just use an empty array
            setTodos([])
            // Optionally, clear the corrupted data from localStorage
            localStorage.removeItem('todos')
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])


    return (
        <TodoContextProvider
            value={{todos, addTodo, deleteTodo, updateTodo, toggleComplete}}
        >
            <div className="bg-[#172842] min-h-screen py-8">
                <div
                    className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage
                        Your Todos
                    </h1>
                    <div className="mb-4">
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                            <div key={todo.id}

                            className='w-full'>
                                <TodoItem todo={todo}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </TodoContextProvider>
    )
}

export default App
