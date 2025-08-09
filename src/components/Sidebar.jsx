import React, { useContext, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { DataContext } from "../context/DataContext";
import ProjectItem from "./ProjectItem";
import AddProject from "./AddProject";

export default function Sidebar() {
  const { projects } = useContext(DataContext);
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="profile small">
          <div className="avatar">A</div>
          <div>
            <div className="name">Akilesh</div>
            <div className="small muted">Free plan</div>
          </div>
        </div>
        <div className="search">
          <FiSearch />
          <input placeholder="Search projects" />
        </div>
        <div className="section-header">
          <span>My Projects</span>
          <button className="add-btn" onClick={() => setOpenAdd(v => !v)}><FiPlus /></button>
        </div>
        {openAdd && <AddProject onClose={() => setOpenAdd(false)} />}
        <div className="projects-list">
          {projects.map(p => <ProjectItem key={p.id} project={p} />)}
        </div>
      </div>
      <div className="sidebar-bottom">
        <div className="muted small">Help & resources</div>
      </div>
    </aside>
  );
}
