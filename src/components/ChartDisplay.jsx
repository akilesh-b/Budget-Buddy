import React, { useContext, useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { DataContext } from "../context/DataContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartDisplay() {
  const { selectedProject } = useContext(DataContext);

  const data = useMemo(() => {
    if (!selectedProject) return { labels: [], datasets: [] };
    const totals = {};
    selectedProject.tasks.forEach(t => {
      const c = t.category || "General";
      totals[c] = (totals[c] || 0) + (t.amount || 0);
    });
    const labels = Object.keys(totals);
    const values = labels.map(l => totals[l]);
    return {
      labels,
      datasets: [{
        data: values,
        backgroundColor: labels.map((_, i) => `hsl(${(i*50)%360}deg 80% 60%)`),
        hoverOffset: 6
      }]
    };
  }, [selectedProject]);

  return (
    <div style={{ maxWidth: 320 }}>
      <Pie data={data} />
    </div>
  );
}
