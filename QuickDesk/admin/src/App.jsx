import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Components
import MainLayout from './components/MainLayout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import TicketManagement from './components/TicketManagement';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import ProtectedRoute from './components/ProtectedRoute';

// Mock Database (will be replaced with actual API calls in production)
export const DB = {
  users: [
    { id: 1, username: 'admin', password: 'admin123', name: 'Admin User', email: 'admin@quickdesk.com', role: 'admin', createdAt: '2023-01-01' },
    { id: 2, username: 'john', password: 'john123', name: 'John Doe', email: 'john@example.com', role: 'user', createdAt: '2023-01-15' },
    { id: 3, username: 'jane', password: 'jane123', name: 'Jane Smith', email: 'jane@example.com', role: 'user', createdAt: '2023-02-01' },
    { id: 4, username: 'support', password: 'support123', name: 'Support Team', email: 'support@quickdesk.com', role: 'support', createdAt: '2023-01-05' },
  ],
  tickets: [
    { id: 1, title: 'Login issue', description: 'Cannot login to the application', status: 'open', priority: 'high', category: 'authentication', createdBy: 2, assignedTo: 4, createdAt: '2023-03-01', updatedAt: '2023-03-01', votes: 5 },
    { id: 2, title: 'Dashboard not loading', description: 'Dashboard shows blank screen', status: 'in-progress', priority: 'medium', category: 'ui', createdBy: 3, assignedTo: 4, createdAt: '2023-03-05', updatedAt: '2023-03-06', votes: 3 },
    { id: 3, title: 'Feature request: Dark mode', description: 'Would like to have dark mode option', status: 'open', priority: 'low', category: 'feature', createdBy: 2, assignedTo: null, createdAt: '2023-03-10', updatedAt: '2023-03-10', votes: 8 },
    { id: 4, title: 'Cannot upload files', description: 'File upload fails with error', status: 'closed', priority: 'high', category: 'functionality', createdBy: 3, assignedTo: 4, createdAt: '2023-02-20', updatedAt: '2023-02-25', votes: 2 },
    { id: 5, title: 'Notification not working', description: 'Not receiving email notifications', status: 'open', priority: 'medium', category: 'notification', createdBy: 2, assignedTo: null, createdAt: '2023-03-15', updatedAt: '2023-03-15', votes: 1 },
  ],
  categories: [
    { id: 1, name: 'authentication', description: 'Login, registration, and account issues' },
    { id: 2, name: 'ui', description: 'User interface issues and improvements' },
    { id: 3, name: 'feature', description: 'New feature requests' },
    { id: 4, name: 'functionality', description: 'Issues with existing functionality' },
    { id: 5, name: 'notification', description: 'Issues related to notifications' },
  ],
  comments: [
    { id: 1, ticketId: 1, userId: 4, content: 'We are looking into this issue', createdAt: '2023-03-01T10:30:00' },
    { id: 2, ticketId: 1, userId: 2, content: 'Thank you for the quick response', createdAt: '2023-03-01T11:15:00' },
    { id: 3, ticketId: 2, userId: 4, content: 'This is being worked on currently', createdAt: '2023-03-06T09:00:00' },
    { id: 4, ticketId: 3, userId: 1, content: 'We will consider this for the next release', createdAt: '2023-03-11T14:20:00' },
  ],
};

// Make DB available globally for components to access
window.DB = DB;

// Mock API functions (will be replaced with actual API calls in production)
window.API = {
  login: (username, password) => {
    const user = DB.users.find(u => u.username === username && u.password === password);
    return Promise.resolve(user || null);
  },
  getUsers: () => Promise.resolve(DB.users),
  getUserById: (id) => Promise.resolve(DB.users.find(u => u.id === id) || null),
  createUser: (user) => {
    const newUser = { ...user, id: DB.users.length + 1, createdAt: new Date().toISOString().split('T')[0] };
    DB.users.push(newUser);
    return Promise.resolve(newUser);
  },
  updateUser: (id, userData) => {
    const index = DB.users.findIndex(u => u.id === id);
    if (index !== -1) {
      DB.users[index] = { ...DB.users[index], ...userData };
      return Promise.resolve(DB.users[index]);
    }
    return Promise.reject(new Error('User not found'));
  },
  deleteUser: (id) => {
    const index = DB.users.findIndex(u => u.id === id);
    if (index !== -1) {
      DB.users.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.reject(new Error('User not found'));
  },
  getTickets: () => Promise.resolve(DB.tickets),
  getTicketById: (id) => Promise.resolve(DB.tickets.find(t => t.id === id) || null),
  createTicket: (ticket) => {
    const newTicket = { 
      ...ticket, 
      id: DB.tickets.length + 1, 
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      votes: 0
    };
    DB.tickets.push(newTicket);
    return Promise.resolve(newTicket);
  },
  updateTicket: (id, ticketData) => {
    const index = DB.tickets.findIndex(t => t.id === id);
    if (index !== -1) {
      DB.tickets[index] = { 
        ...DB.tickets[index], 
        ...ticketData,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      return Promise.resolve(mockDB.tickets[index]);
    }
    return Promise.reject(new Error('Ticket not found'));
  },
  deleteTicket: (id) => {
    const index = DB.tickets.findIndex(t => t.id === id);
    if (index !== -1) {
      DB.tickets.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.reject(new Error('Ticket not found'));
  },
  getCategories: () => Promise.resolve(DB.categories),
  createCategory: (category) => {
    const newCategory = { ...category, id: DB.categories.length + 1 };
    DB.categories.push(newCategory);
    return Promise.resolve(newCategory);
  },
  updateCategory: (id, categoryData) => {
    const index = DB.categories.findIndex(c => c.id === id);
    if (index !== -1) {
      DB.categories[index] = { ...DB.categories[index], ...categoryData };
      return Promise.resolve(DB.categories[index]);
    }
    return Promise.reject(new Error('Category not found'));
  },
  deleteCategory: (id) => {
    const index = DB.categories.findIndex(c => c.id === id);
    if (index !== -1) {
      DB.categories.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.reject(new Error('Category not found'));
  },
  getComments: (ticketId) => Promise.resolve(DB.comments.filter(c => c.ticketId === ticketId)),
  createComment: (comment) => {
    const newComment = { 
      ...comment, 
      id: DB.comments.length + 1, 
      createdAt: new Date().toISOString() 
    };
    DB.comments.push(newComment);
    return Promise.resolve(newComment);
  },
};

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    setUser(null);
    navigate('/login');
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout onLogout={handleLogout} />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="tickets" element={<TicketManagement />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;