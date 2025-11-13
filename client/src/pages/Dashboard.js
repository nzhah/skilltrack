import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSkills } from '../context/SkillsContext';
import { useTheme } from '../context/ThemeContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BarChart2, Award, Target, LogOut, SkipForward, Moon, Sun } from 'react-feather';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { stats, skills, fetchStats, fetchSkills, loading } = useSkills();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchSkills();
  }, [fetchStats, fetchSkills]);

  // Calculate average proficiency from skills
  const calculateAverageProficiency = () => {
    if (!skills || skills.length === 0) return 0;
    const sum = skills.reduce((acc, skill) => acc + (skill.proficiencyLevel || 0), 0);
    return (sum / skills.length).toFixed(1);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const COLORS = {
    frontend: '#667eea',
    backend: '#764ba2',
    database: '#f093fb',
    devops: '#4facfe',
    testing: '#43e97b',
    other: '#fa709a'
  };

  const chartData = stats?.categoryBreakdown 
    ? Object.entries(stats.categoryBreakdown).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value
      }))
    : [];

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-content">
          <h2><BarChart2 size={28} /> SkillTrack</h2>
          <div className="navbar-right">
            <span>Welcome, {user?.name}!</span>
            <button onClick={toggleTheme} className="btn btn-theme" title="Toggle dark mode">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/skills" className="btn btn-secondary"><SkipForward size={16} /> Manage Skills</Link>
            <button onClick={handleLogout} className="btn btn-outline"><LogOut size={16} /> Logout</button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        <h1>Dashboard</h1>
        
        {loading ? (
          <div className="loading">Loading your stats...</div>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon primary">
                  <Award size={28} />
                </div>
                <div className="stat-info">
                  <h3>{stats?.totalSkills || 0}</h3>
                  <p>Total Skills</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon success">
                  <Target size={28} />
                </div>
                <div className="stat-info">
                  <h3>{calculateAverageProficiency()}</h3>
                  <p>Avg Proficiency</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon accent">
                  <BarChart2 size={28} />
                </div>
                <div className="stat-info">
                  <h3>{Object.keys(stats?.categoryBreakdown || {}).length}</h3>
                  <p>Categories</p>
                </div>
              </div>
            </div>

            {stats?.totalSkills > 0 ? (
              <>
                <div className="chart-section">
                  <h2>Skills by Category</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase()] || COLORS.other} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="recent-section">
                  <h2>Recently Updated</h2>
                  <div className="recent-list">
                    {stats?.recentUpdates?.map((skill) => (
                      <div key={skill.id} className="recent-item">
                        <span className="recent-name">{skill.name}</span>
                        <span className="recent-date">
                          {new Date(skill.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <h3>No skills yet!</h3>
                <p>Start tracking your development skills to see your progress</p>
                <Link to="/skills" className="btn btn-primary">Add Your First Skill</Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;