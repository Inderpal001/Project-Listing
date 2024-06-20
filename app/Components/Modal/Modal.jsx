import React, { useState, useEffect } from 'react';
import "./Modal.css";
import { MdEditSquare, MdDelete } from "react-icons/md";

export default function Modal({
    allProject,
    setAllProject,
    deleteProject,
    handleHideModal,
    todos,
    updateTodos,
    projectName: initialProjectName,
    id
}) {
    const [todo, setTodo] = useState("");
    const [updateName, setUpdateName] = useState(false);
    const [projectName, setProjectName] = useState(initialProjectName);
    const [updateProjectName, setUpdateProjectName] = useState(initialProjectName);

    useEffect(() => {
        setProjectName(initialProjectName);
        setUpdateProjectName(initialProjectName);
    }, [initialProjectName]);

    const addTodo = () => {
        if (todo.trim() === "") return;
        updateTodos([...todos, { text: todo, isChecked: false }]);
        setTodo("");
    };

    const handleDeleteAll = () => {
        updateTodos([]);
    };

    const handleEditTodo = (index) => {
        const filteredTodos = todos.filter((_, i) => i !== index);
        const selectedTodo = todos.find((_, i) => i === index);
        setTodo(selectedTodo.text);
        updateTodos(filteredTodos);
    };

    const handleDelete = (index) => {
        const filteredTodos = todos.filter((_, i) => i !== index);
        updateTodos(filteredTodos);
    };

    const handleCheckChange = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].isChecked = !updatedTodos[index].isChecked;
        updateTodos(updatedTodos);
    };

    const selectAllTodos = () => {
        const updatedTodos = todos.map(item => ({ ...item, isChecked: true }));
        updateTodos(updatedTodos);
    };

    const handleUpdateName = () => {
        setUpdateName(true);
    };

    const handleSubmitUpdateName = () => {
        const updatedProjects = allProject.map(project => {
            if (project.id === id) {
                return { ...project, title: updateProjectName };
            }
            return project;
        });
        setAllProject(updatedProjects);
        setUpdateName(false);
    };

    const changeUpdateName = (e) => {
        setUpdateProjectName(e.target.value);
    };

    return (
        <div onClick={handleHideModal} className='modal-container'>
            <div className="inner-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-heading">
                    {updateName ? (
                        <input
                            value={updateProjectName}
                            onChange={changeUpdateName}
                            type="text"
                            className='update-input'
                        />
                    ) : (
                        <h1 className='modal-project-name'>{projectName}</h1>
                    )}
                    <div className='icon-container'>
                        {updateName ? (
                            <button onClick={handleSubmitUpdateName} className='todo-heading-button'>Update Name</button>
                        ) : (
                            <MdEditSquare onClick={handleUpdateName} className='modal-heading-icon' />
                        )}
                        <MdDelete className='modal-heading-icon' onClick={deleteProject} />
                    </div>
                </div>

                <hr />

                <div className="todos-container">
                    <div className="todo-input-container">
                        <input
                            type="text"
                            value={todo}
                            onChange={(e) => setTodo(e.target.value)}
                            className='todo-input'
                            placeholder='Add Tasks...'
                        />
                        <button onClick={addTodo} className='todo-heading-button'>Submit</button>
                    </div>

                    <div className="todo-heading-container">
                        <h1 className='todo-heading'>Tasks</h1>
                        <div className="todo-heading-buttons">
                            <button onClick={selectAllTodos} className='todo-heading-button'>Select All</button>
                            <button onClick={handleDeleteAll} className='todo-heading-button'>Delete All</button>
                        </div>
                    </div>

                    <div className="todos">
                        {todos.map((item, index) => (
                            <div className="todo" key={index}>
                                <div className='todo-item'>
                                    <input
                                        type="checkbox"
                                        checked={item.isChecked}
                                        onChange={() => handleCheckChange(index)}
                                    />
                                    <p className={item.isChecked ? "line-through" : ""}>{item.text}</p>
                                </div>
                                <div>
                                    <button onClick={() => handleEditTodo(index)} className='todo-button'>Edit</button>
                                    <button onClick={() => handleDelete(index)} className='todo-button'>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
