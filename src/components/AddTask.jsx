import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";

export default function AddTask() {
  const { selectedProject, addTask } = useContext(DataContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");
  const [date, setDate] = useState("");

  if (!selectedProject) return <div className="muted">Select a project to add tasks</div>;

  function submit(e) {
    e.preventDefault();
    if (!title || !amount) return;
    addTask(selectedProject.id, {
      title,
      amount: Number(amount),
      category,
      date: date || new Date().toISOString().slice(0, 10),
      done: false
    });
    setTitle("");
    setAmount("");
    setCategory("General");
    setDate("");
  }

  return (
    <form className="add-task" onSubmit={submit}>
      <input placeholder="Task / Item (e.g., 'Grocery')" value={title} onChange={e => setTitle(e.target.value)} />
      <div className="row">
        <input placeholder="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Rent</option>
          <option>Salary</option>
          <option>General</option>
        </select>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <button className="btn small">Add</button>
      </div>
    </form>
  );
}
