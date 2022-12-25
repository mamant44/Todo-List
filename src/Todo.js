import Delete from './icons/delete';

const styles = {
    todo: {
        width: 550,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Merienda One',
        color: '#000',
        backgroundColor: '#fff',
        margin: 0,
        marginTop: 25,
        borderWidth: 4,
        borderStyle: 'solid',
        borderColor: '#000',
        borderRadius: 7
    },
    todoText: {
        width: 470,
        color: '#000',
        fontSize: 20,
        fontWeight: 700,
        marginLeft: 12
    },
    todoDelete: {
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f5f5f5',
        cursor: 'pointer'
    }
}

function TodoForm({todo, toggleTask, removeTask}) {
    return (
        <div key={todo.id} style={styles.todo}>
            <div style={styles.todoText} onClick={() => toggleTask(todo.id)}>
                {todo.name}{todo.task}
            </div>
            <Delete style={styles.todoDelete} onClick={() => removeTask(todo.id)}></Delete>
        </div>
    )
}

export default TodoForm