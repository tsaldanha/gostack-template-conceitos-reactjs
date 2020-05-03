import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: `Novo Repo ${Date.now()}`,
      url: `url`,
      techs: ["react", "javascript"]
    })
    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    // TODO
    api.delete(`repositories/${id}`)
    .then(response => {
      const newList = repositories.filter( repository => repository.id !== id );
      setRepositories(newList);
      
    });
  }

  useEffect(()=>{
    api.get('repositories')
      .then(response => {
        setRepositories(response.data);
      });
  },[])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo=>(
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
