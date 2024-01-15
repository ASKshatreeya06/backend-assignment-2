import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'

import './style.css'

const Todo = () => {


    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const getTodo = async () => {
        try {
            const get = await axios.get("http://localhost:5000/task/");
            setTasks(get.data); //updata task state with fetch
            console.log(get.data)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        getTodo(); //fetch data when component mount 
    }, [])
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { task };
            console.log(body);
            axios.post("http://localhost:5000/task/", body)
            getTodo(); //fetch updated tesks after creating a data
            setTask(''); //clear the input field

            window.location = "/task";



        } catch (error) {
            console.log(error.message);
        }
    }

    return (

        <Fragment>
            <div className='container'>
                <h1>Todo task</h1>
                <form onSubmit={onSubmitForm}>
                    <label>Add Task</label>
                    <input type='text' value={task} onChange={e => setTask(e.target.value)} />
                    <input type='submit' value="Submit" />
                </form>
                <h1>Task List Here</h1>
                <ul>
                    {tasks.length > 0 && tasks.map((task, index) => (
                        <li key={index}>
                            {task}
                        </li>
                    ))}
                </ul>

            </div>
        </Fragment>

    )
}

export default Todo
