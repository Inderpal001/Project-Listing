import React, { useState, useEffect } from 'react';
import "./Project.css";
import { IoSearch } from "react-icons/io5";
import ProjectCard from "../ProjectCard/ProjectCard";
import { v4 as uuidv4 } from 'uuid';

export default function Project() {
    const [allProject, setAllProject] = useState([]);
    const [project, setProject] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    useEffect(() => {
        const savedProjects = localStorage.getItem('project');
        if (savedProjects) {
            setAllProject(JSON.parse(savedProjects));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('project', JSON.stringify(allProject));
    }, [allProject]);

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
    };

    const handleChange = (e) => {
        setProject(e.target.value);
    };

    const showModal = (id) => {
        setModalVisible(true);
        setSelectedProjectId(id);
    };

    const hideModal = () => {
        setModalVisible(false);
        setSelectedProjectId(null);
    };

    const updateTodos = (id, updatedTodos) => {
        const updatedProjects = allProject.map(project => {
            if (project.id === id) {
                return { ...project, todos: updatedTodos };
            }
            return project;
        });
        setAllProject(updatedProjects);
    };

    const deleteProject = (id) => {
        const updatedProjects = allProject.filter(item => item.id !== id);
        setAllProject(updatedProjects);
    };

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
                    {allProject.length === 0 ? (
                        <span className='no-projects'>No Projects to Display.</span>
                    ) : (
                        allProject.map(item => (
                            <ProjectCard
                                key={item.id}
                                id={item.id}
                                projectName={item.title}
                                handleModal={() => showModal(item.id)}
                                handleHideModal={hideModal}
                                modalVisible={modalVisible && selectedProjectId === item.id}
                                todos={item.todos}
                                updateTodos={updatedTodos => updateTodos(item.id, updatedTodos)}
                                deleteProject={() => deleteProject(item.id)}
                                allProject={allProject}
                                setAllProject={setAllProject}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
