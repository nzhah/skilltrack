const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    match: [/^https?:\/\/.+/, 'Please provide a valid URL']
  },
  type: {
    type: String,
    enum: ['documentation', 'tutorial', 'video', 'article', 'course', 'other'],
    default: 'other'
  }
}, { _id: true });

const skillSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a skill name'],
    trim: true,
    maxlength: [100, 'Skill name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['frontend', 'backend', 'database', 'devops', 'testing', 'other'],
    lowercase: true
  },
  proficiencyLevel: {
    type: Number,
    required: true,
    min: [1, 'Proficiency level must be at least 1'],
    max: [5, 'Proficiency level cannot exceed 5'],
    default: 1
  },
  progressPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  learningGoal: {
    type: String,
    trim: true,
    maxlength: [300, 'Learning goal cannot exceed 300 characters']
  },
  resources: [resourceSchema],
  startedAt: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update lastUpdated on any modification
skillSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

// Index for faster queries
skillSchema.index({ user: 1, category: 1 });
skillSchema.index({ user: 1, proficiencyLevel: 1 });

module.exports = mongoose.model('Skill', skillSchema);