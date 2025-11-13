import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSkills } from '../context/SkillsContext';
import { useTheme } from '../context/ThemeContext';
import { Plus, Edit2, Trash2, X, SkipForward, LogOut, Star, Moon, Sun } from 'react-feather';
import './Skills.css';

const Skills = () => {
  const { logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { skills, fetchSkills, createSkill, updateSkill, deleteSkill, loading } = useSkills();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'frontend',
    proficiencyLevel: 1,
    progressPercentage: 0,
    learningGoal: ''
  });
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.category) {
      setError('Name and category are required');
      return;
    }

    const result = editingSkill
      ? await updateSkill(editingSkill._id, formData)
      : await createSkill(formData);

    if (result.success) {
      setShowModal(false);
      setEditingSkill(null);
      setFormData({
        name: '',
        description: '',
        category: 'frontend',
        proficiencyLevel: 1,
        progressPercentage: 0,
        learningGoal: ''
      });
      fetchSkills();
    } else {
      setError(result.message);
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      description: skill.description || '',
      category: skill.category,
      proficiencyLevel: skill.proficiencyLevel,
      progressPercentage: skill.progressPercentage || 0,
      learningGoal: skill.learningGoal || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      await deleteSkill(id);
      fetchSkills();
    }
  };

  const handleAddNew = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      description: '',
      category: 'frontend',
      proficiencyLevel: 1,
      progressPercentage: 0,
      learningGoal: ''
    });
    setShowModal(true);
  };

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(filter.toLowerCase()) ||
    skill.category.toLowerCase().includes(filter.toLowerCase())
  );

  const getProficiencyLabel = (level) => {
    const labels = ['', 'Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'];
    return labels[level];
  };

  const getCategoryColor = (category) => {
    const colors = {
      frontend: '#667eea',
      backend: '#764ba2',
      database: '#f093fb',
      devops: '#4facfe',
      testing: '#43e97b',
      other: '#fa709a'
    };
    return colors[category] || colors.other;
  };

  return (
    <div className="skills-container">
      <nav className="navbar">
        <div className="navbar-content">
          <h2><SkipForward size={26} /> SkillTrack</h2>
          <div className="navbar-right">
            <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>
            <button onClick={toggleTheme} className="btn btn-theme" title="Toggle dark mode">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={handleLogout} className="btn btn-outline"><LogOut size={16} /> Logout</button>
          </div>
        </div>
      </nav>

      <div className="skills-content">
        <div className="skills-header">
          <h1>My Skills</h1>
          <button onClick={handleAddNew} className="btn-add-skill"><Plus size={18} /> Add New Skill</button>
        </div>

        <div className="skills-filters">
          <input
            type="text"
            placeholder="Search skills..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-input"
          />
        </div>

        {loading ? (
          <div className="loading">Loading skills...</div>
        ) : filteredSkills.length === 0 ? (
          <div className="empty-state">
            <p>No skills found. Add your first skill to get started!</p>
          </div>
        ) : (
          <div className="skills-grid">
            {filteredSkills.map((skill) => (
              <div key={skill._id} className="skill-card">
                <div className="skill-card-header">
                  <h3>{skill.name}</h3>
                  <span 
                    className="skill-category"
                    style={{ backgroundColor: getCategoryColor(skill.category) }}
                  >
                    {skill.category}
                  </span>
                </div>

                {skill.description && (
                  <p className="skill-description">{skill.description}</p>
                )}

                <div className="skill-level">
                  <span className="level-label">Proficiency:</span>
                  <div className="level-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} className={star <= skill.proficiencyLevel ? 'star-filled' : 'star-empty'} />
                    ))}
                  </div>
                  <span className="level-text">{getProficiencyLabel(skill.proficiencyLevel)}</span>
                </div>

                <div className="skill-progress">
                  <div className="progress-label">
                    <span>Progress</span>
                    <span>{skill.progressPercentage}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${skill.progressPercentage}%`,
                        backgroundColor: getCategoryColor(skill.category)
                      }}
                    ></div>
                  </div>
                </div>

                {skill.learningGoal && (
                  <div className="skill-goal">
                    <strong>Goal:</strong> {skill.learningGoal}
                  </div>
                )}

                <div className="skill-actions">
                  <button onClick={() => handleEdit(skill)} className="btn-edit"><Edit2 size={16} /> Edit</button>
                  <button onClick={() => handleDelete(skill._id)} className="btn-delete"><Trash2 size={16} /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h2>
            <button onClick={() => setShowModal(false)} className="modal-close"><X size={24} /></button>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="skill-form">
              <div className="form-group">
                <label>Skill Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., React, Node.js, MongoDB"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} required>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="database">Database</option>
                  <option value="devops">DevOps</option>
                  <option value="testing">Testing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe what you're learning..."
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Proficiency Level (1-5)</label>
                  <input
                    type="number"
                    name="proficiencyLevel"
                    value={formData.proficiencyLevel}
                    onChange={handleChange}
                    min="1"
                    max="5"
                  />
                </div>

                <div className="form-group">
                  <label>Progress (%)</label>
                  <input
                    type="number"
                    name="progressPercentage"
                    value={formData.progressPercentage}
                    onChange={handleChange}
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Learning Goal</label>
                <input
                  type="text"
                  name="learningGoal"
                  value={formData.learningGoal}
                  onChange={handleChange}
                  placeholder="What do you want to achieve?"
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingSkill ? 'Update Skill' : 'Add Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;