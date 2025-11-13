const express = require('express');
const router = express.Router();
const {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
  getSkillStats
} = require('../controllers/skillsController');
const { protect } = require('../middleware/auth');

// Protect all routes
router.use(protect);

// Stats route must come BEFORE the '/:id' route
router.get('/stats', getSkillStats);

// CRUD routes
router.route('/')
  .get(getSkills)
  .post(createSkill);

router.route('/:id')
  .get(getSkill)
  .put(updateSkill)
  .delete(deleteSkill);

module.exports = router;