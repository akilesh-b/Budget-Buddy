import React, { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { DataContext } from "../context/DataContext";

export default function ProjectItem({ project }) {
  const { selectedProjectId, setSelectedProjectId, deleteProject } = useContext(DataContext);

  return (
    <div className={`project-item ${selectedProjectId === project.id ? 'active' : ''}`} onClick={() => setSelectedProjectId(project.id)}>
      <div className="pr-left">
        <div className="dot" style={{ background: project.color }} />
        <span className="pr-name">{project.name}</span>
      </div>
      <div className="pr-right">
        <span className="muted small">{project.tasks.length}</span>
        <button className="icon-btn" onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }}><FiTrash2 /></button>
      </div>
    </div>
  );
}
