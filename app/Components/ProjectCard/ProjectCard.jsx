import React from 'react';
import "./ProjectCard.css";
import projectImg from "../../../public/project.png"
import Modal from "../Modal/Modal"

export default function ProjectCard({ projectName,deleteProject, handleModal, handleHideModal, modalVisible, todos,id,updateTodos,updationProjectName }) {

    return (
        <>
            <div onClick={handleModal} className='project-card'>
                <img src={projectImg} alt="" className='project-img' />
                <p className='project-name'>{projectName}</p>
            </div>
            {
                modalVisible && <Modal id={id} deleteProject={deleteProject} projectName={projectName } updateTodos={updateTodos} handleHideModal={handleHideModal} todos={todos} updationProjectName={updationProjectName} />
            }
        </>
    )
}
