import './App.css';
import React, { useState } from 'react';

function Task(props) {
  return (
    <div style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
      <p>Titre : {props.title}</p>
      <p>Status : {props.completed ? 'Terminée' : 'En cours'}</p>
      <button onClick={props.onComplete}>Terminer</button>
    </div>
  );
}

function AddList() {
  // État pour la liste des tâches
  const [tasks, setTasks] = useState([]);

  // État pour les champs d'entrée
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCompleted, setNewTaskCompleted] = useState(false);

  // Fonction pour ajouter une nouvelle tâche
  const addNewTask = () => {
    if (newTaskTitle.trim() === '') {
      alert('Le titre de la tâche ne peut pas être vide.');
      return;
    }

    const newTask = {
      title: newTaskTitle,
      completed: newTaskCompleted,
    };

    setTasks([...tasks, newTask]); // Ajoute la nouvelle tâche au tableau
    setNewTaskTitle(''); // Réinitialise le champ titre
    setNewTaskCompleted(false); // Réinitialise le statut
  };

  // Fonction pour supprimer une tâche (en la marquant comme terminée)
  const completeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className='box'>
      <TaskList tasks={tasks} onCompleteTask={completeTask} />

      <h3>Ajouter une nouvelle tâche</h3>
      <input style={{ width: '300px', height: '30px' }}
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Titre de la tâche"
      />
      <br></br><br></br>
      <button style={{ width: '300px', height: '30px' }} onClick={addNewTask}>Ajouter</button>
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
          onComplete={() => onCompleteTask(index)}
        />
      ))}
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
