import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectCard = ({ project }) => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [project._id]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`https://task-manager-pro-production-5eb7.up.railway.app/api/tasks/project/${project._id}`, { withCredentials: true });
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks');
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://task-manager-pro-production-5eb7.up.railway.app/api/tasks',
        { title: taskTitle, project: project._id },
        { withCredentials: true }
      );
      setTaskTitle('');
      fetchTasks(); // instantly refresh the task list
    } catch (error) {
      console.error('Error creating task');
    }
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`https://task-manager-pro-production-5eb7.up.railway.app/api/tasks/${taskId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      fetchTasks(); // instantly refresh the UI
    } catch (error) {
      console.error('Error updating task');
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '20px', background: 'white' }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>{project.name}</h4>
      <p style={{ margin: '0 0 15px 0', color: '#555' }}>{project.description}</p>
      <small style={{ color: '#888', display: 'block', marginBottom: '15px' }}>Created by: {project.admin?.name || 'Unknown'}</small>

      {/* THE TASK MANAGER SECTION */}
      <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '6px', border: '1px solid #eee' }}>
        <h5 style={{ margin: '0 0 10px 0', color: '#333' }}>Project Tasks</h5>

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
            style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '8px 15px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Add Task
          </button>
        </form>

        {/* Task List */}
        {tasks.length === 0 ? <p style={{ fontSize: '14px', color: '#888' }}>No tasks assigned yet.</p> : null}

        {tasks.map(task => (
          <div key={task._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '8px', border: '1px solid #e1e1e1' }}>

            {/* Strike-through text if the task is completed */}
            <span style={{
              textDecoration: task.status === 'Completed' ? 'line-through' : 'none',
              color: task.status === 'Completed' ? '#999' : '#000',
              fontWeight: '500'
            }}>
              {task.title}
            </span>

            {/* Dropdown to change status */}
            <select
              value={task.status}
              onChange={(e) => handleUpdateStatus(task._id, e.target.value)}
              style={{ padding: '5px 10px', borderRadius: '4px', border: '1px solid #ccc', background: task.status === 'Completed' ? '#e8f5e9' : 'white', cursor: 'pointer' }}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};


// --- MAIN DASHBOARD COMPONENT ---
export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchProjects();
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://task-manager-pro-production-5eb7.up.railway.app/api/projects', {
        withCredentials: true
      });
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects');
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://task-manager-pro-production-5eb7.up.railway.app/api/projects',
        { name, description },
        { withCredentials: true }
      );
      setName('');
      setDescription('');
      fetchProjects();
    } catch (error) {
      console.error('Failed to create project');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('https://task-manager-pro-production-5eb7.up.railway.app/api/auth/logout', {}, { withCredentials: true });
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error('Logout failed');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', background: '#fbfbfb', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '20px' }}>
        <h2 style={{ color: '#333' }}>Welcome, {user?.name} ({user?.role})</h2>
        <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          Logout
        </button>
      </div>

      {/* Create Project Form */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '40px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #ddd' }}>
        <h3 style={{ marginTop: 0, color: '#444' }}>Create New Project</h3>
        <form onSubmit={handleCreateProject} style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          <input
            type="text" placeholder="Project Name" value={name} onChange={(e) => setName(e.target.value)} required
            style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required
            style={{ flex: 2, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Create
          </button>
        </form>
      </div>

      {/* Project List */}
      <h3 style={{ color: '#444' }}>Active Projects</h3>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>
        {projects.length === 0 ? <p>No projects yet.</p> : null}

        {/* Here we map through the projects and use the new ProjectCard component! */}
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}