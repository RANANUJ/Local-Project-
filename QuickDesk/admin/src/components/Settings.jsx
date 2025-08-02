import React, { useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'QuickDesk',
    siteDescription: 'Help desk and ticket management system',
    allowUserRegistration: true,
    defaultUserRole: 'user',
    ticketsPerPage: 10,
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.example.com',
    smtpPort: 587,
    smtpUsername: 'notifications@example.com',
    smtpPassword: '',
    senderEmail: 'support@quickdesk.com',
    senderName: 'QuickDesk Support',
    enableEmailNotifications: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    notifyOnNewTicket: true,
    notifyOnTicketUpdate: true,
    notifyOnTicketAssignment: true,
    notifyOnTicketResolution: true,
    digestFrequency: 'daily',
  });

  const [isGeneralSaved, setIsGeneralSaved] = useState(false);
  const [isEmailSaved, setIsEmailSaved] = useState(false);
  const [isNotificationSaved, setIsNotificationSaved] = useState(false);

  const handleGeneralChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setIsGeneralSaved(false);
  };

  const handleEmailChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmailSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setIsEmailSaved(false);
  };

  const handleNotificationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setIsNotificationSaved(false);
  };

  const saveGeneralSettings = (e) => {
    e.preventDefault();
    // In a real app, you would save these settings to your backend
    console.log('Saving general settings:', generalSettings);
    setIsGeneralSaved(true);
    setTimeout(() => setIsGeneralSaved(false), 3000);
  };

  const saveEmailSettings = (e) => {
    e.preventDefault();
    // In a real app, you would save these settings to your backend
    console.log('Saving email settings:', emailSettings);
    setIsEmailSaved(true);
    setTimeout(() => setIsEmailSaved(false), 3000);
  };

  const saveNotificationSettings = (e) => {
    e.preventDefault();
    // In a real app, you would save these settings to your backend
    console.log('Saving notification settings:', notificationSettings);
    setIsNotificationSaved(true);
    setTimeout(() => setIsNotificationSaved(false), 3000);
  };

  const testEmailConnection = () => {
    // In a real app, you would test the email connection
    alert('Email connection test initiated. Check console for results.');
    console.log('Testing email connection with settings:', emailSettings);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">System Settings</h1>

      <div className="grid grid-cols-1 gap-8">
        {/* General Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">General Settings</h2>
          <form onSubmit={saveGeneralSettings}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site Name</label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  value={generalSettings.siteName}
                  onChange={handleGeneralChange}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site Description</label>
                <input
                  type="text"
                  id="siteDescription"
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralChange}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="ticketsPerPage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tickets Per Page</label>
                <input
                  type="number"
                  id="ticketsPerPage"
                  name="ticketsPerPage"
                  value={generalSettings.ticketsPerPage}
                  onChange={handleGeneralChange}
                  min="5"
                  max="100"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="defaultUserRole" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Default User Role</label>
                <select
                  id="defaultUserRole"
                  name="defaultUserRole"
                  value={generalSettings.defaultUserRole}
                  onChange={handleGeneralChange}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="user">User</option>
                  <option value="agent">Agent</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allowUserRegistration"
                  name="allowUserRegistration"
                  checked={generalSettings.allowUserRegistration}
                  onChange={handleGeneralChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="allowUserRegistration" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Allow User Registration</label>
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="-ml-1 mr-2 h-5 w-5" />
                Save Settings
              </button>
              {isGeneralSaved && (
                <span className="ml-3 text-sm text-green-600 dark:text-green-400">Settings saved successfully!</span>
              )}
            </div>
          </form>
        </div>

        {/* Email Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Email Settings</h2>
          <form onSubmit={saveEmailSettings}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="smtpServer" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SMTP Server</label>
                <input
                  type="text"
                  id="smtpServer"
                  name="smtpServer"
                  value={emailSettings.smtpServer}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="smtpPort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SMTP Port</label>
                <input
                  type="number"
                  id="smtpPort"
                  name="smtpPort"
                  value={emailSettings.smtpPort}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="smtpUsername" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SMTP Username</label>
                <input
                  type="text"
                  id="smtpUsername"
                  name="smtpUsername"
                  value={emailSettings.smtpUsername}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="smtpPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SMTP Password</label>
                <input
                  type="password"
                  id="smtpPassword"
                  name="smtpPassword"
                  value={emailSettings.smtpPassword}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sender Email</label>
                <input
                  type="email"
                  id="senderEmail"
                  name="senderEmail"
                  value={emailSettings.senderEmail}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sender Name</label>
                <input
                  type="text"
                  id="senderName"
                  name="senderName"
                  value={emailSettings.senderName}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableEmailNotifications"
                  name="enableEmailNotifications"
                  checked={emailSettings.enableEmailNotifications}
                  onChange={handleEmailChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enableEmailNotifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Enable Email Notifications</label>
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="-ml-1 mr-2 h-5 w-5" />
                Save Settings
              </button>
              <button
                type="button"
                onClick={testEmailConnection}
                className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                <RefreshCw className="-ml-1 mr-2 h-5 w-5" />
                Test Connection
              </button>
              {isEmailSaved && (
                <span className="ml-3 text-sm text-green-600 dark:text-green-400">Settings saved successfully!</span>
              )}
            </div>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Settings</h2>
          <form onSubmit={saveNotificationSettings}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifyOnNewTicket"
                  name="notifyOnNewTicket"
                  checked={notificationSettings.notifyOnNewTicket}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="notifyOnNewTicket" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Notify on New Ticket</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifyOnTicketUpdate"
                  name="notifyOnTicketUpdate"
                  checked={notificationSettings.notifyOnTicketUpdate}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="notifyOnTicketUpdate" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Notify on Ticket Update</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifyOnTicketAssignment"
                  name="notifyOnTicketAssignment"
                  checked={notificationSettings.notifyOnTicketAssignment}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="notifyOnTicketAssignment" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Notify on Ticket Assignment</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifyOnTicketResolution"
                  name="notifyOnTicketResolution"
                  checked={notificationSettings.notifyOnTicketResolution}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="notifyOnTicketResolution" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Notify on Ticket Resolution</label>
              </div>
              <div>
                <label htmlFor="digestFrequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Digest Frequency</label>
                <select
                  id="digestFrequency"
                  name="digestFrequency"
                  value={notificationSettings.digestFrequency}
                  onChange={handleNotificationChange}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="realtime">Real-time</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="-ml-1 mr-2 h-5 w-5" />
                Save Settings
              </button>
              {isNotificationSaved && (
                <span className="ml-3 text-sm text-green-600 dark:text-green-400">Settings saved successfully!</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;