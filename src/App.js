import './App.css';
import React, { useState, } from 'react';

function AddList() {
  // État pour la liste des tâches
  const [tasks, setTasks] = useState([]);
  // État pour les champs d'entrée
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCompleted, setNewTaskCompleted] = useState(false);
  const [newCategory, setCategory] = useState('Travail');
  const [newTaskImportant, setNewTaskImportant] = useState(false); // Gère l'état de l'importance
  const [filter, setFilter] = useState('Tous'); // Filtre pour les tâches ("Tous" ou "Important")

  // Fonction pour ajouter une nouvelle tâche
  const addNewTask = () => {
    if (newTaskTitle.trim() === '') {
      alert('Le titre de la tâche ne peut pas être vide.');
      return;
    }

    const newTask = {
      title: newTaskTitle,
      completed: newTaskCompleted,
      category: newCategory,
      important: newTaskImportant, // Ajoute l'importance à la tâche
    };

    setTasks([...tasks, newTask]); // Ajoute la nouvelle tâche au tableau
    setNewTaskTitle(''); // Réinitialise le champ titre
    setNewTaskCompleted(false); // Réinitialise le statut
    setNewTaskImportant(false); // Réinitialise l'importance
  };

  // Fonction pour supprimer une tâche (en la marquant comme terminée)
  const completeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Filtrer les tâches en fonction de l'importance
  const filteredTasks =
    filter === 'Tous' ? tasks : tasks.filter((task) => task.important);

  return (
    <div className="box">
      

      {/* Liste des tâches */}
      <TaskList tasks={filteredTasks} onCompleteTask={completeTask} />

      {/* Boutons de filtre */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setFilter('Tous')} style={{ marginRight: '10px' }}>Tous</button>
        <button onClick={() => setFilter('Important')}>Important</button>
      </div>

      <h3>Ajouter une nouvelle tâche</h3>

      {/* Sélecteur de catégorie */}
      <select
        value={newCategory}
        onChange={(e) => setCategory(e.target.value)}
        style={{ width: '300px', height: '30px', marginBottom: '10px' }}
      >
        <option value="Travail">Travail</option>
        <option value="Perso">Personnel</option>
      </select>
      <br />

      {/* Champ de texte pour le titre */}
      <input
        style={{ width: '300px', height: '30px', marginBottom: '10px' }}
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Titre de la tâche"
      />
      <br />

      {/* Case à cocher pour l'importance */}
      <label>
        <input
          type="checkbox"
          checked={newTaskImportant}
          onChange={(e) => setNewTaskImportant(e.target.checked)} // Gère l'importance
        />
        Important
      </label>
      <br />

      {/* Bouton pour ajouter */}
      <button style={{ width: '300px', height: '30px', marginTop: '10px' }} onClick={addNewTask}>
        Ajouter
      </button>
    </div>
  );
}

function TaskList({ tasks, onCompleteTask }) {
  return (
    <div>
      {tasks.map((task, index) => (
        <Task
          key={index}
          title={task.title}
          completed={task.completed}
          category={task.category}
          important={task.important}
          onComplete={() => onCompleteTask(index)}
        />
      ))}
    </div>
  );
}

function Task({ title, completed, category, important, onComplete }) {
  return (
    <div
      style={{
        margin: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        backgroundColor: '#d4edda'
      }}
    >
      <p>
        <strong>{title}</strong> ({category}) {important && <span style={{ color: 'red' }}>(Important)</span>}
      </p>
      <p>Status : {completed ? 'Terminée' : 'En cours'}</p>
      {!completed && (
        <button onClick={onComplete} style={{ padding: '5px 10px' }}>
          Terminer
        </button>
      )}
    </div>
  );
}




function App() {
  return (
    <div className="App">
      <h1>To-Do-List</h1>
      <AddList />
    </div>
  );
}

export default App;
