import React, { createContext, useState, useContext, useCallback } from 'react';
import { skillsService } from '../services/api';

const SkillsContext = createContext();

export const useSkills = () => {
  const context = useContext(SkillsContext);
  if (!context) {
    throw new Error('useSkills must be used within SkillsProvider');
  }
  return context;
};

export const SkillsProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category: null });

  // Fetch all skills
  const fetchSkills = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await skillsService.getAll({
        ...filters,
        ...params
      });
      
      setSkills(response.data.data);
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to fetch skills';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch skill statistics
  const fetchStats = useCallback(async () => {
    try {
      const response = await skillsService.getStats();
      setStats(response.data.data);
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to fetch stats';
      return { success: false, message };
    }
  }, []);

  // Create new skill
  const createSkill = async (skillData) => {
    try {
      setError(null);
      const response = await skillsService.create(skillData);
      
      setSkills(prevSkills => [response.data.data, ...prevSkills]);
      await fetchStats();
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to create skill';
      setError(message);
      return { success: false, message };
    }
  };

  // Update skill
  const updateSkill = async (id, skillData) => {
    try {
      setError(null);
      const response = await skillsService.update(id, skillData);
      
      setSkills(prevSkills =>
        prevSkills.map(skill =>
          skill._id === id ? response.data.data : skill
        )
      );
      await fetchStats();
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to update skill';
      setError(message);
      return { success: false, message };
    }
  };

  // Delete skill
  const deleteSkill = async (id) => {
    try {
      setError(null);
      await skillsService.delete(id);
      
      setSkills(prevSkills => prevSkills.filter(skill => skill._id !== id));
      await fetchStats();
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to delete skill';
      setError(message);
      return { success: false, message };
    }
  };

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({ category: null });
  }, []);

  const value = {
    skills,
    stats,
    loading,
    error,
    filters,
    fetchSkills,
    fetchStats,
    createSkill,
    updateSkill,
    deleteSkill,
    updateFilters,
    clearFilters
  };

  return (
    <SkillsContext.Provider value={value}>
      {children}
    </SkillsContext.Provider>
  );
};