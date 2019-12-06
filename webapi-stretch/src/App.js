import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/projects")
      .then(response => {
        console.log(response.data);
        setProjects(response.data);
        console.log(projects);
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  }, []);
  return (
    <div className="App">
      {projects.map(project => (
        <div>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
