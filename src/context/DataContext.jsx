import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { v4 as uuidv4 } from "uuid";
import { saveToLocal, loadFromLocal } from "../utils/localStorageHelper";
import { DataContext } from "./DataContextContext";

/* Firestore utilities (optional sync) */
import { db } from "../firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

export function DataProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const LOCAL_KEY = user ? `bb_projects_${user.uid}` : "bb_projects_guest";

  // Load from localStorage on start or when user changes
  useEffect(() => {
    const saved = loadFromLocal(LOCAL_KEY);
    if (saved) {
      setProjects(saved);
      if (saved.length > 0) setSelectedProjectId(saved[0].id);
    } else {
      // default demo projects
      const demo = [
        {
          id: uuidv4(),
          name: "Personal",
          color: "#8b5cf6",
          tasks: []
        },
        {
          id: uuidv4(),
          name: "Work",
          color: "#06b6d4",
          tasks: []
        },
        {
          id: uuidv4(),
          name: "Education",
          color: "#f97316",
          tasks: []
        }
      ];
      setProjects(demo);
      setSelectedProjectId(demo[0].id);
      saveToLocal(LOCAL_KEY, demo);
    }
    // eslint-disable-next-line
  }, [user]);

  // Save local on projects change
  useEffect(() => {
    saveToLocal(LOCAL_KEY, projects);
    // also optionally sync to Firestore
    if (user) {
      // write each project as doc under users/{uid}/projects/{projectId}
      projects.forEach(async (p) => {
        try {
          const pRef = doc(db, "users", user.uid, "projects", p.id);
          await setDoc(pRef, p);
        } catch {
          // console.warn("Firestore write failed");
        }
      });
    }
  }, [projects, user]);

  // Helper operations
  function addProject(name, color = "#64748b") {
    const p = { id: uuidv4(), name, color, tasks: [] };
    setProjects((s) => [p, ...s]);
    setSelectedProjectId(p.id);
  }

  function deleteProject(id) {
    setProjects((s) => s.filter((p) => p.id !== id));
    if (selectedProjectId === id && projects.length > 1) {
      setSelectedProjectId(projects[0].id);
    }
    // also delete Firestore doc
    if (user) {
      const pRef = doc(db, "users", user.uid, "projects", id);
      deleteDoc(pRef).catch(() => {});
    }
  }

  function addTask(projectId, task) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, tasks: [{ id: uuidv4(), ...task }, ...p.tasks] } : p
      )
    );
  }

  function updateTask(projectId, taskId, patch) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, ...patch } : t)) }
          : p
      )
    );
  }

  function deleteTask(projectId, taskId) {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, tasks: p.tasks.filter(t => t.id !== taskId) } : p)));
  }

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || null;

  return (
    <DataContext.Provider value={{
      projects,
      selectedProject,
      selectedProjectId,
      setSelectedProjectId,
      addProject,
      deleteProject,
      addTask,
      updateTask,
      deleteTask,
      setProjects
    }}>
      {children}
    </DataContext.Provider>
  );
}
