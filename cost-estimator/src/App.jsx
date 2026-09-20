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


import React, { Component } from 'react';
import './App.css';

/* ---------- Helper Functions ---------- */

function formatMoney(amount) {
  if (amount === 0 || amount === null || amount === undefined) {
    return "Not estimated";
  }
  return "Rs " + amount.toLocaleString("en-IN");
}


/* ---------- App Component ---------- */

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          id: 1,
          name: "Website Development",
          client: "ABC Technologies",
          status: "Completed",
          owner: "Mokshitha",
          startDate: "2026-09-01",
          endDate: "2026-09-15",
          hours: 120,
          finalCost: 530332
        },
        {
          id: 2,
          name: "Mobile Application",
          client: "XYZ Solutions",
          status: "In Progress",
          owner: "Swetha",
          startDate: "2026-09-05",
          endDate: "2026-09-20",
          hours: 150,
          finalCost: 750000
        },
        {
          id: 3,
          name: "Dashboard Project",
          client: "Tech Company",
          status: "Planning",
          owner: "Tabu",
          startDate: "2026-09-10",
          endDate: "2026-09-25",
          hours: 90,
          finalCost: 0
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>Projects</h1>
        <div className="cards">
          {this.state.data.map(item => (
            <ProjectCard key={item.id} project={item} />
          ))}
        </div>
      </div>
    );
  }
}

/* ---------- StatusBadge Component ---------- */

class StatusBadge extends React.Component {
  getStatusClass(status) {
    switch (status) {
      case "Completed":
        return "completed";
      case "In Progress":
        return "in-progress";
      case "Planning":
        return "planning";
      default:
        return "";
    }
  }

  render() {
    const statusClass = this.getStatusClass(this.props.status);

    return (
      <p>
        <b>Status:</b>{" "}
        <span className={`status ${statusClass}`}>{this.props.status}</span>
      </p>
    );
  }
}

/* ---------- InfoItem Component (Reusable Label + Value) ---------- */

class InfoItem extends React.Component {
  render() {
    return (
      <p>
        <b>{this.props.label}:</b> {this.props.value}
      </p>
    );
  }
}

/* ---------- ProjectCard Component ---------- */

class ProjectCard extends React.Component {
  render() {
    const project = this.props.project;

    return (
      <div className="project-card">
        <h2>{project.name}</h2>
        <InfoItem label="Client" value={project.client} />
        <StatusBadge status={project.status} />
        <InfoItem label="Owner" value={project.owner} />
        <InfoItem label="Start Date" value={project.startDate} />
        <InfoItem label="End Date" value={project.endDate} />
        <InfoItem label="Hours" value={project.hours} />
        <InfoItem label="Cost" value={formatMoney(project.finalCost)} />
      </div>
    );
  }
}

export default App;