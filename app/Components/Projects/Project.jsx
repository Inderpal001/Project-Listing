import React, { useState } from 'react';
import "./Project.css";
import { IoSearch } from "react-icons/io5";
import ProjectCard from "../ProjectCard/ProjectCard";
import { v4 as uuidv4 } from 'uuid';

export default function Project() {
    const [allProject, setAllProject] = useState([]);
    const [project, setProject] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const addProject = () => {
        if (project.trim() === "") {
            return;
        }
        const newProject = {
            title: project,
            id: uuidv4(),
            todos: []
        };
        setAllProject([...allProject, newProject]);
        setProject("");
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setProject(value);
    }

    const showModal = (id) => {
        setModalVisible(true);
        setSelectedProjectId(id);
    }

    const hideModal = () => {
        setModalVisible(false);
        setSelectedProjectId(null);
    }

    const updateTodos = (id, updatedTodos) => {
        const updatedProjects = allProject.map(project => {
            if (project.id === id) {
                return { ...project, todos: updatedTodos };
            }
            return project;
        });
        setAllProject(updatedProjects);
    }

    const updationProjectName = (id, updatedName) => {
        const updatedProjects = allProject.map(project => {
            if (project.id === id) {
                return { ...project, title: updatedName };
            }
            return project;
        });
        setAllProject(updatedProjects);
    }

    const deleteProject = (id) => {
        const updatedProjects = allProject.filter((item)=>{
            return item.id !== id
        })
        setAllProject(updatedProjects)
    }
    console.log(allProject);

    return (
        <div className='project-container'>
            <div className='inner-project-container'>
                <h1 className='welcome-heading'>Hi Aman</h1>
                <p className='welcome-para'>Welcome back to the workspace, we missed you !!</p>

                <div className='input-container'>
                    <div className="input-div">
                        <IoSearch className='search-icon' />
                        <input
                            value={project}
                            onChange={handleChange}
                            type="text"
                            placeholder='Add Project...'
                            className='project-input'
                        />
                    </div>
                    <button className='add-project-button' onClick={addProject}>Submit</button>
                </div>

                <h1 className='project-heading'>Projects</h1>
                <div className='project-card-container'>
                    {allProject.length === 0 ? <span className='no-projects'>No Projects to Display.</span> : null}
                    {allProject.map((item) => (
                        <ProjectCard
                            key={item.id}
                            id={item.id}
                            projectName={item.title}
                            handleModal={() => showModal(item.id)}
                            handleHideModal={hideModal}
                            modalVisible={modalVisible && selectedProjectId === item.id}
                            todos={item.todos}
                            updateTodos={(updatedTodos) => updateTodos(item.id, updatedTodos)}
                            updationProjectName={(updatedName) => updationProjectName(item.id, updatedName)}
                            deleteProject={() => deleteProject(item.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
