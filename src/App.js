import React, {useState, useEffect} from 'react';
import {createUseStyles} from 'react-jss';
import axios from 'axios';
import Todo from './Todo';
import TodoForm from './TodoForm';

const useStyles = createUseStyles({
    evenNumber: {
        borderColor: '#00008b',
        backgroundColor: '#00008b'
    },
    oddNumber: {
        borderColor: '#5d0404',
        backgroundColor: '#5d0404'
    }
})

const styles = {
    App: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    evenOddNumbers: {
        width: 270,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f5f5f5',
        fontSize: 20,
        fontWeight: 700,
        marginTop: 20,
        borderRadius: 7,
        borderStyle: 'solid',
        borderWidth: 3
    },
    h1: {
        fontSize: 50,
        fontFamily: 'Merienda One',
        margin: 0,
        marginTop: 20,
        marginBottom: 10
    }
}

const API_TODOS = 'https://jsonplaceholder.typicode.com/todos';

const useTodos = (name) => {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) ?? []);
    const [evenNumber, setEvenNumber] = useState(false);
    const [oddNumber, setOddNumber] = useState(false);

    useEffect(() => {
        if (todos.length === 0) {
            axios.get(API_TODOS).then((resp) => {
                const allTasks = resp.data.map(({title, id, completed}) => ({name: title, id, complete: completed}));
                setTodos(allTasks);
            });
        }
    }, [name, todos.length]);

    useEffect(() => {
        setEvenNumber(todos.length % 2 === 0)
    }, [todos.length]);

    useEffect(() => {
        setOddNumber(todos.length % 2 !== 0)
    }, [todos.length]);

    return {todos, setTodos, evenNumber, oddNumber};
}

function App() {
    const {todos, setTodos, evenNumber, oddNumber} = useTodos('');
    const evenOddNumbers = useStyles();

    const addTask = (userInput) => {
        if (userInput) {
            const newItem = {
                id: Math.random().toString(36).substring(2, 9),
                task: userInput,
                completed: false
            }
            const newTodos = [...todos, newItem]

            localStorage.setItem("todos", JSON.stringify(newTodos))
            setTodos(newTodos)
        }
    }

    const removeTask = (id) => {
        setTodos([...todos.filter((todo) => todo.id !== id)])
    }

    const handleToggle = (id) => {
        setTodos([...todos.map((todo) =>
            todo.id === id ? {...todo, complete: !todo.complete} : {...todo})
        ])
    }

    return (
        <div style={styles.App}>
            {evenNumber && (
                <div style={styles.evenOddNumbers} className={evenOddNumbers.evenNumber}>
                    Even number of tasks!
                </div>
            )}
            {oddNumber && (
                <div style={styles.evenOddNumbers} className={evenOddNumbers.oddNumber}>
                    Odd number of tasks!
                </div>
            )}
            <header>
                <h1 style={styles.h1}> Todo-list: {todos.length}</h1>
            </header>
            <TodoForm addTask={addTask}/>
            {todos.map((todo) => {
                return (
                    <Todo
                        todo={todo}
                        key={todo.id}
                        toggleTask={handleToggle}
                        removeTask={removeTask}
                    />
                )
            })}
        </div>
    );
}

export default App