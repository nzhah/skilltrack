const mongoose = require('mongoose');

const skillHistorySchema = new mongoose.Schema({
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    enum: ['created', 'updated', 'proficiency_increased', 'progress_updated', 'deleted'],
    required: true
  },
  changes: {
    before: {
      proficiencyLevel: Number,
      progressPercentage: Number,
      description: String,
      learningGoal: String
    },
    after: {
      proficiencyLevel: Number,
      progressPercentage: Number,
      description: String,
      learningGoal: String
    }
  },
  message: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: false
});

// Index for faster queries
skillHistorySchema.index({ user: 1, skill: 1, createdAt: -1 });
skillHistorySchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('SkillHistory', skillHistorySchema);
