


//import React, { Component } from 'react';

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       data:
//       [
//         {
//           "name": "Mokshitha"
//         },
//         {
//           "name": "Swetha"
//         },
//         {
//           "name": "Tabu"
//         }
//       ]
//     }
//   }

//   render() {
//     return (
//       <div>
//         <StudentName/>
//         <ul>
//           {this.state.data.map(item => <List data = {item}/>)}
//         </ul>
//       </div>
//     );
//   }
// }

// class StudentName extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Student Name Details</h1>
//       </div>
//     );
//   }
// }

// class List extends React.Component {
//   render() {
//     return (
//       <ul>
//         <li>{this.props.data.name}</li>
//       </ul>
//     );
//   }
// }

// export default App;


// import React, { Component } from 'react';
// import './App.css';

// /* ---------- Helper Functions ---------- */

// function formatMoney(amount) {
//   if (amount === 0 || amount === null || amount === undefined) {
//     return "Not estimated";
//   }
//   return "Rs " + amount.toLocaleString("en-IN");
// }


// /* ---------- App Component ---------- */

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       data: [
//         {
//           id: 1,
//           name: "Website Development",
//           client: "ABC Technologies",
//           status: "Completed",
//           owner: "Mokshitha",
//           startDate: "2026-09-01",
//           endDate: "2026-09-15",
//           hours: 120,
//           finalCost: 530332
//         },
//         {
//           id: 2,
//           name: "Mobile Application",
//           client: "XYZ Solutions",
//           status: "In Progress",
//           owner: "Swetha",
//           startDate: "2026-09-05",
//           endDate: "2026-09-20",
//           hours: 150,
//           finalCost: 750000
//         },
//         {
//           id: 3,
//           name: "Dashboard Project",
//           client: "Tech Company",
//           status: "Planning",
//           owner: "Tabu",
//           startDate: "2026-09-10",
//           endDate: "2026-09-25",
//           hours: 90,
//           finalCost: 0
//         }
//       ]
//     };
//   }

//   render() {
//     return (
//       <div>
//         <h1>Projects</h1>
//         <div className="cards">
//           {this.state.data.map(item => (
//             <ProjectCard key={item.id} project={item} />
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

// /* ---------- StatusBadge Component ---------- */

// class StatusBadge extends React.Component {
//   getStatusClass(status) {
//     switch (status) {
//       case "Completed":
//         return "completed";
//       case "In Progress":
//         return "in-progress";
//       case "Planning":
//         return "planning";
//       default:
//         return "";
//     }
//   }

//   render() {
//     const statusClass = this.getStatusClass(this.props.status);

//     return (
//       <p>
//         <b>Status:</b>{" "}
//         <span className={`status ${statusClass}`}>{this.props.status}</span>
//       </p>
//     );
//   }
// }

// /* ---------- InfoItem Component (Reusable Label + Value) ---------- */

// class InfoItem extends React.Component {
//   render() {
//     return (
//       <p>
//         <b>{this.props.label}:</b> {this.props.value}
//       </p>
//     );
//   }
// }

// /* ---------- ProjectCard Component ---------- */

// class ProjectCard extends React.Component {
//   render() {
//     const project = this.props.project;

//     return (
//       <div className="project-card">
//         <h2>{project.name}</h2>
//         <InfoItem label="Client" value={project.client} />
//         <StatusBadge status={project.status} />
//         <InfoItem label="Owner" value={project.owner} />
//         <InfoItem label="Start Date" value={project.startDate} />
//         <InfoItem label="End Date" value={project.endDate} />
//         <InfoItem label="Hours" value={project.hours} />
//         <InfoItem label="Cost" value={formatMoney(project.finalCost)} />
//       </div>
//     );
//   }
// }

// export default App;

import { useState } from "react";
import "./App.css";


// Roles dictionary
const ROLES = {
  dev: { label: "Developer", rate: 500 },
  design: { label: "Designer", rate: 450 },
  qa: { label: "QA Engineer", rate: 350 },
  pm: { label: "Project Manager", rate: 600 },
};

const DEFAULT_ROLE_ID = "dev";

// Factory function: unique instance and UUID per row
function createEmptyTask() {
  return {
    id: crypto.randomUUID(),
    name: "",
    roleId: DEFAULT_ROLE_ID,
    hours: "",
  };
}

export default function App() {
  // Only state: array of tasks
  const [tasks, setTasks] = useState([]);

  // Add empty row
  const handleAddTask = () => {
    setTasks((prev) => [...prev, createEmptyTask()]);
  };

  // Delete row
  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Single handler for all inputs using computed keys
  const handleTaskChange = (taskId, field, value) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, [field]: value } : t))
    );
  };

  // Helper for single row cost
  const getTaskCost = (task) => {
    const hoursNum = Number(task.hours);
    if (!hoursNum || isNaN(hoursNum) || hoursNum <= 0) return 0;  //isNaN means "is Not a Number" and it is used to check if the value is not a number or not
    const rate = ROLES[task.roleId]?.rate || 0;
    return hoursNum * rate;
  };

  // Derived state (no extra useState hooks)
  const isEmpty = tasks.length === 0;
  const totalTasks = tasks.length;
  const totalHours = tasks.reduce(
    (sum, t) => sum + (Number(t.hours) > 0 ? Number(t.hours) : 0),
    0
  );
  const totalCost = tasks.reduce((sum, t) => sum + getTaskCost(t), 0);

  return (
    <div className="estimator-card">
      <header className="estimator-header">
        <div>
          <h1 className="estimator-title">Estimation Table</h1>
          <p className="estimator-subtitle">Interactive module estimation & live cost</p>
        </div>
        <button onClick={handleAddTask} className="btn-add">
          + Add Task
        </button>
      </header>

      {/* Empty State vs Table */}
      {isEmpty ? (
        <div className="empty-state">
          <p className="empty-title">No tasks added yet</p>
          <p className="empty-desc">Click "+ Add Task" to begin your estimate.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="estimator-table">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Role</th>
                <th>Hours</th>
                <th>Cost</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                const cost = getTaskCost(task);
                return (
                  <tr key={task.id}>
                    <td>
                      <input
                        type="text"
                        placeholder="Task description"
                        value={task.name}
                        onChange={(e) =>
                          handleTaskChange(task.id, "name", e.target.value)
                        }
                        className="input-text"
                      />
                    </td>
                    <td>
                      <select
                        value={task.roleId}
                        onChange={(e) =>
                          handleTaskChange(task.id, "roleId", e.target.value)
                        }
                        className="select-role"
                      >
                        {Object.entries(ROLES).map(([id, role]) => (
                          <option key={id} value={id}>
                            {role.label} (Rs {role.rate}/hr)
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={task.hours}
                        onChange={(e) =>
                          handleTaskChange(task.id, "hours", e.target.value)
                        }
                        className="input-hours"
                      />
                    </td>
                    <td className="cost-cell">
                      {/* Zero or empty hours shows a dash instead of Rs 0 */}
                      {cost > 0 ? `Rs ${cost.toLocaleString()}` : "—"}
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Bar */}
      <footer className="summary-bar">
        <div className="stat-item">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-value">{totalTasks}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Hours</span>
          <span className="stat-value">{totalHours} hrs</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Cost</span>
          <span className="stat-value highlight">
            Rs {totalCost.toLocaleString()}
          </span>
        </div>
      </footer>
    </div>
  );
}