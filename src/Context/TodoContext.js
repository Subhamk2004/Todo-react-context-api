import {createContext, useContext} from 'react'

export let TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo:'Todo message',
            completed: false
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})

// in contexts we pass an object, and here in this we have passed an object
// which contains array containing data snd some function which are not
// defined here but will be defined later in some other file

// the above is a basic structure of the todos array, in which each todoItem
// will be stored in an array, and each todoItem will be an object, which
// will have the above basic properties

// the above array of todos is a property

export let useTodo = () => {
    return useContext(TodoContext);
}

// the benefit of the above hook is that whenever we will be using the hook we
// don't have to pass the TodoContext in the useContext,

// we will directly
// use useTodo and by that we can use all contexts of the TodoContext

export let TodoContextProvider = TodoContext.Provider