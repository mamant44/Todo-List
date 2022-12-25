import {useState} from "react";

const styles = {
    form: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    input: {
        width: 470,
        height: 55,
        fontWeight: 700,
        fontSize: 24,
        paddingLeft: 10,
        borderWidth: 4,
        borderStyle: 'solid',
        borderColor: '#000',
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7
    },
    saveButton: {
        width: 115,
        height: 65,
        margin: 0,
        padding: 0,
        fontSize: 21,
        fontWeight: 700,
        color: '#f5f5f5',
        background: '#000',
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#000',
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
        cursor: 'pointer'
    }
}

function TodoForm({addTask}) {
    const [userInput, setUserInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        addTask(userInput)
        setUserInput('')
    }
    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e)
        }
    }

    return (
        <form style={styles.form} onSubmit={handleSubmit}>
            <input style={styles.input}
                   value={userInput}
                   type="text"
                   onChange={handleChange}
                   onKeyDown={handleKeyPress}
                   placeholder="Enter value..."
            />
            <button style={styles.saveButton}>Save</button>
        </form>
    )
}

export default TodoForm