import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import AddTask from "../components/AddTask";
import TaskItem from "../components/TaskItem";
import ChartDisplay from "../components/ChartDisplay";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { selectedProject } = useContext(DataContext);

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Navbar />
        <div className="content">
          <div className="left-col">
            <div className="card">
              <h2>{selectedProject ? selectedProject.name : "Select a project"}</h2>
              <AddTask />
              <div className="task-list">
                {selectedProject && selectedProject.tasks.length === 0 && <p className="muted">No tasks yet. Add one!</p>}
                {selectedProject && selectedProject.tasks.map(task => (
                  <TaskItem key={task.id} task={task} projectId={selectedProject.id} />
                ))}
              </div>
            </div>
          </div>

          <div className="right-col">
            <div className="card">
              <h3>Summary</h3>
              <ChartDisplay />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
