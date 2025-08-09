import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { FiCheck, FiTrash2 } from "react-icons/fi";

export default function TaskItem({ task, projectId }) {
  const { updateTask, deleteTask } = useContext(DataContext);

  const toggleDone = () => updateTask(projectId, task.id, { done: !task.done });
  const remove = () => deleteTask(projectId, task.id);

  return (
    <div className={`task-item ${task.done ? 'done' : ''}`}>
      <div className="task-left">
        <button className="icon-btn" onClick={toggleDone}><FiCheck /></button>
        <div>
          <div className="task-title">{task.title}</div>
          <div className="muted small">{task.category} • {task.date}</div>
        </div>
      </div>
      <div className="task-right">
        <div className="amount">₹{task.amount}</div>
        <button className="icon-btn" onClick={remove}><FiTrash2 /></button>
      </div>
    </div>
  );
}
