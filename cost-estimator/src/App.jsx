import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";

import ProjectCard from "./Components/ProjectCard";
import ProjectSkeleton from "./Components/ProjectSkeleton";
import ProjectDetails from "./Components/ProjectDetails";

import { getProjects, getUsers } from "./Utils/api";

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stores the project selected by clicking "View Data"
  const [selectedProject, setSelectedProject] = useState(null);

  const abortControllerRef = useRef(null);

  const loadData = useCallback(async () => {
    abortControllerRef.current?.abort();

    abortControllerRef.current = new AbortController();

    const signal = abortControllerRef.current.signal;

    setIsLoading(true);
    setError(null);

    try {
      const [projects, users] = await Promise.all([
        getProjects({ signal }),
        getUsers({ signal }),
      ]);

      // Create owner lookup
      const nameById = Object.fromEntries(
        users.map((user) => [user.id, user.name])
      );

      // Add owner name to each project
      const mergedProjects = projects.map((project) => ({
        ...project,
        owner: nameById[project.ownerId] || "Unassigned",
      }));

      setData(mergedProjects);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(
          err.message || "Something went wrong while fetching data."
        );
      }
    } finally {
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [loadData]);

  // =========================
  // PROJECT DETAILS PAGE
  // =========================

  if (selectedProject) {
    return (
      <ProjectDetails
        project={selectedProject}
        onBack={() => setSelectedProject(null)}
      />
    );
  }

  // =========================
  // PROJECT LIST PAGE
  // =========================

  return (
    <div className="container">
      <h1>Projects</h1>

      {/* Loading */}
      {isLoading && (
        <div className="cards">
          {[1, 2, 3].map((id) => (
            <ProjectSkeleton key={id} />
          ))}
        </div>
      )}

      {/* Error */}
      {!isLoading && error && (
        <div className="error-panel">
          <p className="error-message">⚠️ {error}</p>

          <button className="retry-btn" onClick={loadData}>
            Try again
          </button>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !error && data.length === 0 && (
        <div className="empty-panel">
          <p>
            No projects yet. Create your first project to start estimating.
          </p>
        </div>
      )}

      {/* Projects */}
      {!isLoading && !error && data.length > 0 && (
        <div className="cards">
          {data.map((item) => (
            <ProjectCard
              key={item.id}
              project={item}
              onView={(project) => setSelectedProject(project)}
            />
          ))}
        </div>
      )}
    </div>
  );
}