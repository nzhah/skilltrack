const Skill = require('../models/Skill');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Get all skills for logged in user
// @route   GET /api/skills
// @access  Private
exports.getSkills = asyncHandler(async (req, res) => {
  const { category, sort } = req.query;

  // Build query
  const query = { user: req.user.id };
  
  if (category) {
    query.category = category;
  }

  // Execute query with sorting
  let skills = Skill.find(query);

  if (sort) {
    const sortBy = sort.split(',').join(' ');
    skills = skills.sort(sortBy);
  } else {
    skills = skills.sort('-lastUpdated'); // Default: newest first
  }

  const result = await skills;

  res.status(200).json({
    success: true,
    count: result.length,
    data: result
  });
});

// @desc    Get single skill
// @route   GET /api/skills/:id
// @access  Private
exports.getSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({
      success: false,
      message: 'Skill not found'
    });
  }

  // Make sure user owns skill
  if (skill.user.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this skill'
    });
  }

  res.status(200).json({
    success: true,
    data: skill
  });
});

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private
exports.createSkill = asyncHandler(async (req, res) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const skill = await Skill.create(req.body);

  res.status(201).json({
    success: true,
    data: skill
  });
});

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
exports.updateSkill = asyncHandler(async (req, res) => {
  let skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({
      success: false,
      message: 'Skill not found'
    });
  }

  // Make sure user owns skill
  if (skill.user.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to update this skill'
    });
  }

  skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: skill
  });
});

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
exports.deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({
      success: false,
      message: 'Skill not found'
    });
  }

  // Make sure user owns skill
  if (skill.user.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to delete this skill'
    });
  }

  await skill.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get skill statistics for dashboard
// @route   GET /api/skills/stats
// @access  Private
exports.getSkillStats = asyncHandler(async (req, res) => {
  const skills = await Skill.find({ user: req.user.id });

  const stats = {
    totalSkills: skills.length,
    averageProficiency: 0,
    categoryBreakdown: {},
    recentUpdates: []
  };

  if (skills.length > 0) {
    // Calculate average proficiency
    const totalProficiency = skills.reduce((sum, skill) => sum + skill.proficiencyLevel, 0);
    stats.averageProficiency = (totalProficiency / skills.length).toFixed(2);

    // Category breakdown
    skills.forEach(skill => {
      stats.categoryBreakdown[skill.category] = 
        (stats.categoryBreakdown[skill.category] || 0) + 1;
    });

    // Recent updates (last 5)
    stats.recentUpdates = skills
      .sort((a, b) => b.lastUpdated - a.lastUpdated)
      .slice(0, 5)
      .map(skill => ({
        id: skill._id,
        name: skill.name,
        lastUpdated: skill.lastUpdated
      }));
  }

  res.status(200).json({
    success: true,
    data: stats
  });
});