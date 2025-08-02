import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, TicketCheck, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Import DB from App.jsx
import { DB } from '../App';

// Utility function to format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Dashboard Components
const StatCard = ({ icon, title, value, change, changeType }) => {
  return (
    <div className="bg-[rgb(var(--color-background))] rounded-xl shadow-md hover:shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:translate-y-[-2px]">
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-full bg-[rgba(var(--color-primary),0.1)] text-[rgb(var(--color-primary))]">
          {icon}
        </div>
        <div className={`flex items-center ${changeType === 'increase' ? 'text-[rgb(var(--color-success))]' : 'text-[rgb(var(--color-danger))]'}`}>
          {changeType === 'increase' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span className="text-sm font-medium ml-1">{change}%</span>
        </div>
      </div>
      <h3 className="mt-4 text-2xl font-bold text-[rgb(var(--color-foreground))]">{value}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{title}</p>
    </div>
  );
};

const RecentTickets = ({ tickets }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Tickets</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
            </tr>
          </thead>
          <tbody className="bg-[rgb(var(--color-background))] divide-y divide-gray-200 dark:divide-gray-700">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[rgb(var(--color-foreground))]">{ticket.subject}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    ticket.status === 'Open' ? 'bg-[rgba(var(--color-success),0.1)] text-[rgb(var(--color-success))]' :
                    ticket.status === 'In Progress' ? 'bg-[rgba(var(--color-warning),0.1)] text-[rgb(var(--color-warning))]' :
                    ticket.status === 'Resolved' ? 'bg-[rgba(var(--color-primary),0.1)] text-[rgb(var(--color-primary))]' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatDate(ticket.createdAt)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{ticket.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RecentActivity = () => {
  // Mock activity data
  const activities = [
    { id: 1, user: 'admin@example.com', action: 'updated ticket status to "In Progress"', target: 'Login button not working on Safari', time: '2 hours ago' },
    { id: 2, user: 'agent@example.com', action: 'added a comment to', target: 'Feature Request: Dark Mode', time: '5 hours ago' },
    { id: 3, user: 'admin@example.com', action: 'created a new category', target: 'Billing Inquiry', time: '1 day ago' },
    { id: 4, user: 'user@example.com', action: 'created a new ticket', target: 'Login button not working on Safari', time: '1 day ago' },
  ];

  return (
    <div className="bg-[rgb(var(--color-background))] rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-lg font-bold text-[rgb(var(--color-foreground))] mb-5">Recent Activity</h2>
      <div className="space-y-5">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-150 -mx-2">
            <div className="flex-shrink-0">
              <div className="h-9 w-9 rounded-full bg-[rgba(var(--color-primary),0.1)] flex items-center justify-center text-[rgb(var(--color-primary))]">
                <Clock size={18} />
              </div>
            </div>
            <div>
              <p className="text-sm text-[rgb(var(--color-foreground))]">
                <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TicketStatusChart = ({ tickets }) => {
  // Process data for the chart
  const statusCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status]
  }));

  // Use our custom color variables for the chart
  const COLORS = ['rgb(var(--color-success))', 'rgb(var(--color-warning))', 'rgb(var(--color-primary))', 'rgb(var(--color-secondary))'];

  return (
    <div className="bg-[rgb(var(--color-background))] rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-lg font-bold text-[rgb(var(--color-foreground))] mb-5">Ticket Status Distribution</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CategoryDistributionChart = ({ tickets }) => {
  // Process data for the chart
  const categoryCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.category] = (acc[ticket.category] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(categoryCounts).map(category => ({
    name: category,
    tickets: categoryCounts[category]
  }));

  return (
    <div className="bg-[rgb(var(--color-background))] rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-lg font-bold text-[rgb(var(--color-foreground))] mb-5">Tickets by Category</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tickets" fill="rgb(var(--color-primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ticketsData, usersData] = await Promise.all([
          DB.getTickets(),
          DB.getUsers()
        ]);
        setTickets(ticketsData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--color-primary))] shadow-md"></div>
      </div>
    );
  }

  // Sort tickets by creation date (newest first)
  const sortedTickets = [...tickets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const recentTickets = sortedTickets.slice(0, 5);

  return (
    <div className="px-1 py-2">
      <h1 className="text-2xl font-bold text-[rgb(var(--color-foreground))] mb-8">Dashboard Overview</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<TicketCheck size={24} />} 
          title="Total Tickets" 
          value={tickets.length} 
          change="12" 
          changeType="increase" 
        />
        <StatCard 
          icon={<Users size={24} />} 
          title="Total Users" 
          value={users.length} 
          change="5" 
          changeType="increase" 
        />
        <StatCard 
          icon={<TicketCheck size={24} />} 
          title="Open Tickets" 
          value={tickets.filter(t => t.status === 'Open').length} 
          change="8" 
          changeType="increase" 
        />
        <StatCard 
          icon={<TicketCheck size={24} />} 
          title="Resolved Tickets" 
          value={tickets.filter(t => t.status === 'Resolved').length} 
          change="3" 
          changeType="decrease" 
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <TicketStatusChart tickets={tickets} />
        <CategoryDistributionChart tickets={tickets} />
      </div>
      
      {/* Recent Activity and Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
        <RecentTickets tickets={recentTickets} />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;